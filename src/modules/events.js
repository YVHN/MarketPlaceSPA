class Events {
    eventsHandlers = {};

    promiseId = 0;
    promisesFunctions = {};
    constructor() {
        if (!global.mp) {
            global.mp = {
                trigger(eventName, ...args) {
                    console.log(`[mp.trigger] ${eventName}, args:${args}`);
                },
                events: {
                    add(eventName, callback) {
                        console.log(`[mp.events.add] ${eventName}, callback:${typeof callback}`);
                    },
                    remove(eventName, callback) {
                        console.log(`[mp.events.remove] ${eventName}, callback:${typeof callback}`);
                    },
                },
                dev: true,
            };
        }
        mp.events.add('vue:callCef', (eventName, args) => {
            if (args == null) return;
            args = args.toString();
            if (!this.eventsHandlers[eventName]) {
                throw new Error('[Events.callCef] Event ' + eventName + ' does not exist');
            }
            args = JSON.parse(args);
            this.eventsHandlers[eventName](...args);
        });
        mp.events.add('vue:backPromise', (promiseId, data) => {
            const id = parseInt(promiseId);
            const args = JSON.parse(data);
            if (typeof this.promisesFunctions[id].func != 'function') {
                throw new Error('[Events.backPromise] Promise with id:' + id + ' does not exist');
            }
            this.promisesFunctions[id].func(...args);
            clearTimeout(this.promisesFunctions[id].timeoutId);
            delete this.promisesFunctions[id];
        });
    }

    add(eventName, callback) {
        if (this.eventsHandlers[eventName]) {
            throw new Error('[Events.add] Event ' + eventName + ' already exists');
        }
        this.eventsHandlers[eventName] = callback;
    }
    remove(eventName) {
        if (!this.eventsHandlers[eventName]) {
            throw new Error('[Events.remove] Event ' + eventName + ' does not exist');
        }
        delete this.eventsHandlers[eventName];
    }
    callClientPromise(eventName, args, callback) {
        const promiseId = this.promiseId;
        this.promiseId++;
        const timeoutId = setTimeout(() => {
            if (typeof this.promisesFunctions[promiseId].func == 'function') {
                delete this.promisesFunctions[promiseId];
                throw new Error(`[AFK callClientPromise] eventName:${eventName}; args:${JSON.stringify(args)}`);
            }
        }, 3000);
        this.promisesFunctions[promiseId] = { func: callback, timeoutId };
        mp.trigger('client:browserEvent:Promise', JSON.stringify({ promiseId, eventName, args }));
    }
    callClient(eventName, ...args) {
        mp.trigger('client:browserEvent', JSON.stringify({ eventName: eventName, args: args }));
    }
    callServer(eventName, ...args) {
        this.callClient('browserEvent:callServerFromBrowser', eventName, ...args);
    }
}
const events = new Events();
export default events;
