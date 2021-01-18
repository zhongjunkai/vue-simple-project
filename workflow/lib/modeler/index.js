// import Modeler from "../bpmn/bpmn-modeler.development.js";
import CustomModule from "./custom/index.js";
// import BaseRenderer from "../diagram-js/BaseRenderer";

export default class CustomModeler extends BpmnJS {
    constructor(options) {
        super(options);
        this._customElements = [];
        this._modules = [ CustomModule ]
    }

    _modules = [ CustomModule ];
}