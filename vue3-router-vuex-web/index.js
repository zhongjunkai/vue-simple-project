import { defineComponent } from "./lib/vue/vue.esm-browser.js";

export default defineComponent({
    template: `
        <div>
            <router-view></router-view>
        </div>
    `,
    setup() {
        return {};
    }
});