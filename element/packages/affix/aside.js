import { defineComponent } from "../../lib/vue/vue.esm-browser";

export default defineComponent({
    name: "ElAside",
    template: `<aside class="el-aside" :style="{width}"><slot></slot></aside>`,
    props: {
        width: {
            width: String,
            default: "300px"
        }
    }
});