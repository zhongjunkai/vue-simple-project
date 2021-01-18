export default class CustomPalette {
    constructor(bpmnFactory, create, elementFactory, palette, translate, globalConnect) {
        this.bpmnFactory = bpmnFactory;
        this.create = create;
        this.elementFactory = elementFactory;
        this.translate = translate;
        this.globalConnect = globalConnect;

        palette.registerProvider(this);
    }

    getPaletteEntries(element) {
        let that = this;
        return {
            "create.start-event": {
                group: "event",
                className: "entry custom-bpmn-icon-start",
                title: "创建开始节点",
                action: {
                    dragstart: that.createStartEvent(),
                    click: that.createStartEvent()
                }
            },
            "create.end-event": {
                group: "event",
                className: "entry custom-bpmn-icon-end",
                title: "创建结束节点",
                action: {
                    dragstart: that.createEndEvent(),
                    click: that.createEndEvent()
                }
            },
            "create.person-task": {
                group: "model",
                className: "entry custom-bpmn-icon-person",
                title: "创建一个类型为person-task的任务节点",
                action: {
                    dragstart: that.createUserTask(),
                    click: that.createUserTask()
                }
            },
            "create.auto-task": {
                group: "model",
                className: "entry custom-bpmn-icon-auto",
                title: "创建一个类型为auto-task的任务节点",
                action: {
                    dragstart: that.createAutoTask(),
                    click: that.createAutoTask()
                }
            },
            "create.devide-gateway": {
                group: "gateway",
                className: "entry custom-bpmn-icon-devide",
                title: "创建一个分支网关",
                action: {
                    dragstart: that.createGateway(),
                    click: that.createGateway()
                }
            },
            "create.combine-gateway": {
                group: "gateway",
                className: "entry custom-bpmn-icon-combine",
                title: "创建一个聚合网关",
                action: {
                    dragstart: that.createCombineGateway(),
                    click: that.createCombineGateway()
                }
            },
            "create.subprocess-expanded": {
                group: "activity",
                className: "bpmn-icon-subprocess-expanded",
                title: "创建子流程",
                action: {
                    dragstart: that.createSubprocess(),
                    click: that.createSubprocess()
                }
            },
            "global-connect-tool": {
                group: "tools",
                className: "bpmn-icon-connection-multi",
                title: "连线",
                action: {
                    click: function (event) {
                        that.globalConnect.toggle(event);
                    }
                }
            }
        };
    };

    createTask() {
        let that = this;
        return function (event) {
            const businessObject = that.bpmnFactory.create("bpmn:Task", { custom: 2 });
            const shape = that.elementFactory.createShape({
                type: "bpmn:Task",
                businessObject
            });
            const label = that.elementFactory.createLabel();
            // console.log(shape); // 只在拖动或者点击时触发
            // console.log(label); // 只在拖动或者点击时触发
            that.create.start(event, shape);
        };
    }

    createStartEvent() {
        let that = this;
        return function (event) {
            const shape = that.elementFactory.createShape({
                type: "bpmn:StartEvent"
            });
            that.create.start(event, shape);
        };
    }

    createEndEvent() {
        let that = this;
        return function (event) {
            const shape = that.elementFactory.createShape({
                type: "bpmn:EndEvent"
            });
            that.create.start(event, shape);
        };
    }

    createUserTask() {
        let that = this;
        return function (event) {
            const shape = that.elementFactory.createShape({
                type: "bpmn:UserTask",
                width: 130,
                height: 40
            });
            that.create.start(event, shape);
        };
    }

    createAutoTask() {
        let that = this;
        return function (event) {
            // const businessObject = elementFactory.create("bpmn:Task");
            const shape = that.elementFactory.createShape({
                type: "bpmn:ServiceTask",
                width: 130,
                height: 40
            });
            that.create.start(event, shape);
        };
    }

    createGateway() {
        let that = this;
        return function (event) { // ComplexGateway
            const shape = that.elementFactory.createShape({
                type: "bpmn:InclusiveGateway",
                value: "start"
            });
            that.create.start(event, shape);
        };
    }

    createCombineGateway() {
        // ExclusiveGateway
        let that = this;
        return function (event) {
            const shape = that.elementFactory.createShape({
                type: "bpmn:InclusiveGateway",
                value: "end"
            });
            that.create.start(event, shape);
        };
    }

    createSubprocess() {
        let that = this;
        return function (event) {
            let subProcess = that.elementFactory.createShape({
                type: "bpmn:SubProcess",
                x: 0,
                y: 0,
                isExpanded: true
            });

            let startEvent = that.elementFactory.createShape({
                type: "bpmn:StartEvent",
                x: 40,
                y: 82,
                parent: subProcess
            });
            that.create.start(event, [ subProcess, startEvent ], {
                hints: {
                    autoSelect: [ startEvent ]
                }
            });
        };
    }

}

CustomPalette.$inject = [
    "bpmnFactory",
    "create",
    "elementFactory",
    "palette",
    "translate",
    "globalConnect"
];

