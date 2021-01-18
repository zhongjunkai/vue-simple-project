import { onMounted, defineComponent } from "./lib/vue/vue.js";
import { _get } from "./common/tools.js";
import CustomModeler from "./lib/modeler/index.js";

export default defineComponent({
    template: `<div id="canvas"></div>`,
    setup(prop, context) {
        let bpmnModeler = null;
        let canvas = null;
        /**
         * 初始化
         */
        const init = () => {
            canvas = document.getElementById("canvas");
            bpmnModeler = new BpmnJS({
                container: canvas
            });
            const url = "./lib/diagram.bpmn";
            const callback = async (xml) => {
                const result = await bpmnModeler.importXML(xml);
                console.log(result);
            };
            _get(url, callback);
        }
        onMounted(() => {
            init();
        });
        return {};
    }
});
