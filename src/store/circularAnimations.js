import events from "@/modules/events";

const circularAnimations = {
	state: {
		list: {},
		exclusiveAnimations: [],
		favorite: [
            { KeyAnim: "donate_chicken_taunt", KeyCattegory: "donate" }
        ],
	},
	getters: {
		getCircularAnimations(state) {
			return state.list;
		},
		getCircularExclusiveAnimations(state) {
			return state.exclusiveAnimations;
		},
		getFavoriteAnimations(state) {
			return state.favorite;
		},
	},
};

events.add("circularAnimations:setList", (list) => {
	circularAnimations.state.list = list;
});

events.add("circularAnimations:setExclusiveList", (list) => {
	circularAnimations.state.exclusiveAnimations = JSON.parse(list);
});

events.add('favoriteAnimations:setList', (list) => {
	while(circularAnimations.state.favorite.length > 0){
		circularAnimations.state.favorite.pop();
	}
	for (let i = 0; i < list.length; i++) {
		const element = list[i];
		circularAnimations.state.favorite.push(element);
	}
    
})

export default circularAnimations;
