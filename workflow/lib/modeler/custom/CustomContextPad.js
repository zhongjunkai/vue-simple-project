export default class CustomContextPad {
    constructor(eventBus, contextPad, config, injector, translate,
                bpmnFactory, elementFactory, create, modeling, connect) {
        this.create = create;
        this.elementFactory = elementFactory;
        this.translate = translate;
        this.bpmnFactory = bpmnFactory;
        this.modeling = modeling;
        this.connect = connect;

        config = config || {};
        this.eventBus = eventBus;
        if (config.autoPlace !== false) {
            this.autoPlace = injector.get("autoPlace", false);
        }
        contextPad.registerProvider(this);
    }

    getContextPadEntries(element) {
        const {
            autoPlace,
            create,
            elementFactory,
            translate,
            modeling,
            connect
        } = this;

        function removeElement(e) {
            modeling.removeElements([ element ]);
        }

        function deleteElement() {
            return {
                group: "edit",
                className: "entry bpmn-icon-trash",
                title: this.translate("删除"),
                action: {
                    click: removeElement
                }
            };
        }

        function startConnect(event, element) {
            connect.start(event, element);
        }

        function appendAction(type, className, title, options) {
            if (typeof title !== "string") {
                options = title;
                title = translate("Append {type}", { type: type.replace(/^bpmn:/, "") });
            }

            function appendStart(event, element) {

                let shape = elementFactory.createShape(Object.assign({ type: type }, options));
                create.start(event, shape, {
                    source: element
                });
            }

            let append = autoPlace ? function (event, element) {
                let shape = elementFactory.createShape(Object.assign({ type: type }, options));
                autoPlace.append(element, shape);
            } : appendStart;
            return {
                group: "model",
                className: className,
                title: title,
                action: {
                    dragstart: appendStart,
                    click: append
                }
            };
        }

        return {
            "delete": deleteElement(),
            "connect": {
                group: "connect",
                className: "bpmn-icon-connection-multi",
                title: "连接",
                action: {
                    click: startConnect,
                    dragstart: startConnect
                }
            },
            "append.text-annotation": appendAction("bpmn:TextAnnotation", "bpmn-icon-text-annotation", "注释说明", {})
        };
    }
}

CustomContextPad.$inject = [
    "eventBus",
    "contextPad",
    "config",
    "injector",
    "translate",
    "bpmnFactory",
    "elementFactory",
    "create",
    "modeling",
    "connect"
];