import { defineComponent } from "../../lib/vue/vue.esm-browser";

export default defineComponent({
    name: "ElContainer",
    props: {
        direction: {
            type: String,
            default: ""
        }
    },
    setup(props, ctx) {
        return {};
    }
})