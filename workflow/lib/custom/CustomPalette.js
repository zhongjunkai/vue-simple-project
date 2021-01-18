export default class CustomPalette {
    constructor(bpmnFactory, create, elementFactory, palette, translate) {
        this.bpmnFactory = bpmnFactory;
        this.create = create;
        this.elementFactory = elementFactory;
        this.translate = translate;

        palette.registerProvider(this);
    }

    getPaletteEntries(element) {
        return {
            "create.zhongjunkai": {
                group: "model", // 分组名
                className: "bpmn-icon-task red",
                title: this.translate("zhongjunkai"),
                action: {
                    dragstart: this.createTask(),
                    click: this.createTask()
                }
            }
        };
    };

    createTask() {
        let that = this;
        return function (event) {
            const businessObject = that.bpmnFactory.create("bpmn:Task");
            const shape = that.elementFactory.createShape({
                type: "bpmn:Task",
                businessObject
            });
            that.create.start(event, shape);
        }
    }
}

CustomPalette.$inject = [
    "bpmnFactory",
    "create",
    "elementFactory",
    "palette",
    "translate"
];

