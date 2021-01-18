import Vue from "./lib/vue/vue.esm.browser.min.js";
import router, { routes } from "./router.js";
import { store } from "./store.js";

/**
 * Vue、Vue-router、Vuex都是2.0系列版本
 */
new Vue({
    template: `
    <div>
        <router-link v-for="(item,index) in routes" :to="item.path">{{ item.title }}</router-link>
        <router-view></router-view>
    </div>
    `,
    data: {
        routes
    },
    methods: {},
    mounted() {
        debugger;
        console.log(this.$store.state.count);
    },
    router: router,
    store: store
}).$mount("#app");