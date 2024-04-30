import Vue from 'vue'
import store from '@/store'
import clientLanguageData from '@/views/MarketPlace/Assets/Localization/ClientSPA.json'


const LanguagesMode = [ "rus", "eng" ]

function formatString() {
    var args = Array.prototype.slice.call(arguments);
    var formatString = args.shift();
    try {
        return formatString.replace(/{(\d+)}/g, function (match, index) {
            return typeof args[index] !== 'undefined' ? args[index] : match;
        });
    }
    catch (e) {
        console.log("ERROR.formatString: ", e, "Text: ", formatString);
        return formatString;
    }
}

Vue.prototype.$getLanguageText = (text, ...args) => {
    try {
        const currentLanguge = store.getters.getCurrentLanguage;
        if (currentLanguge == LanguagesMode[0] || !clientLanguageData[text]) {
            return formatString(text, args);
        }
        return formatString(clientLanguageData[text][currentLanguge], args);
    }
    catch (e) {
        console.log("ERROR.getLanguageText: ", e, "TEXT: ", text, "ARGS: ", args);
        return formatString(text, args);
    }
}