import Vue from "./lib/vue/vue.esm.browser.min.js";
import Vuex from "./lib/vuex/vuex.esm.browser.min.js";

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        count: 0
    },
    mutations: { // commit
        increment(state) {
            state.count++;
        }
    }
});
