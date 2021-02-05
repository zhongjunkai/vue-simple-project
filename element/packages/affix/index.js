import { defineComponent } from "../../lib/vue/vue.esm-browser.js";
import Alert from "./alert.js";
import Test from "./test.js";
export default defineComponent({
    template: `
        <div>123
            <z-test></z-test>
            <z-alert title="223234" type="success"></z-alert>
            <z-alert>
                <template #title>
                    <span>哈哈哈</span>
                </template>     
            </z-alert>
        </div>
    `,
    components: {
        "z-test":Test,
        "z-alert": Alert
    },
    setup(props, ctx) {
        debugger;
        return {};
    }
});
