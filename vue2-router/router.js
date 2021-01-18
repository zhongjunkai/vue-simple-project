import Vue from "./lib/vue/vue.esm.browser.min.js";
import Router from "./lib/vue-router/vue-router.esm.browser.min.js";
import Home from "./home/index.js";
import About from "./about/index.js";

Vue.use(Router);

export const routes = [
    {
        path: "/",
        name: "home",
        title: "主页",
        component: Home
    },
    {
        path: "/about",
        name: "about",
        title: "关于",
        component: About
    }
];
export default new Router({
    routes: routes
});