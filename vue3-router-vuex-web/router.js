import { createRouter } from "./lib/vue-router/vue-router.esm-browser.js";
import Home from "./views/home/index.js";

export const routes = [
    {
        path: "/",
        name: "home",
        component: Home
    }
];
export default createRouter({
    history: "",
    routes: routes
})