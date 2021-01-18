import BaseRenderer from "../../diagram-js/BaseRenderer.js";
// import { append, create, classes } from "../../tiny-svg/tiny-svg.js";
import append from "../../tiny-svg/append.js";
import create from "../../tiny-svg/create.js";
import classes from "../../tiny-svg/classes.js";
import attr from "../../tiny-svg/attr.js";
import { isObject, assign, isString } from "../../../common/tools.js";

const customElements = [ "bpmn:StartEvent", "bpmn:EndEvent" ]; // 自定义元素的类型
const customConfig = { // 自定义元素的配置
    "bpmn:StartEvent": {
        "url": "../../../images/start.png",
        "attr": { x: 0, y: 0, width: 40, height: 40 }
    },
    "bpmn:EndEvent": {
        "url": "../../../images/end.png",
        "attr": { x: 0, y: 0, width: 40, height: 40 }
    }
};
const hasLabelElements = [ "bpmn:StartEvent", "bpmn:EndEvent" ];

const DEFAULT_FILL_OPACITY = 1;

function getDi(element) {
    return element.businessObject.di;
}

function getSemantic(element) {
    return element.businessObject;
}

function getFillColor(element, defaultColor) {
    return getDi(element).get("bioc:fill") || defaultColor || "white";
}

function getStrokeColor(element, defaultColor) {
    return getDi(element).get("bioc:stroke") || defaultColor || "black";
}

export default class CustomRender extends BaseRenderer {
    constructor(eventBus, styles, textRenderer, pathMap) {
        super(eventBus, 2000);
        this.computeStyle = styles.computeStyle;
        this.eventBus = eventBus;
        this.styles = styles;
        this.textRenderer = textRenderer;
        this.pathMap = pathMap;
    }

    renderLabel(parentGfx, label, options) {
        options = assign({
            size: {
                width: 100
            }
        }, options);
        // let text = textRenderer.createText(label || "", options);

        let text = this.textRenderer.createText(isString(label) ? label : "", options);
        classes(text).add("djs-label");
        append(parentGfx, text);
        return text;
    }

    drawPath(parentGfx, d, attrs) {

        attrs = this.computeStyle(attrs, [ "no-fill" ], {
            strokeWidth: 2,
            stroke: "black"
        });
        let path = create("path");
        attr(path, { d: d });
        attr(path, attrs);
        append(parentGfx, path);
        return path;
    }

    drawRect(parentGfx, width, height, r, offset, attrs) {

        if (isObject(offset)) {
            attrs = offset;
            offset = 0;
        }
        offset = offset || 0;
        attrs = this.computeStyle(attrs, {
            stroke: "black",
            strokeWidth: 2,
            fill: "white"
        });
        let rect = create("rect");
        attr(rect, {
            x: offset,
            y: offset,
            width: width - offset * 2,
            height: height - offset * 2,
            rx: r,
            ry: r
        });
        attr(rect, attrs);
        append(parentGfx, rect);
        return rect;
    }

    drawCircle(parentGfx, width, height, offset, attrs) {
        if (isObject(offset)) {
            attrs = offset;
            offset = 0;
        }
        offset = offset || 0;
        attrs = this.computeStyle(attrs, {
            stroke: "black",
            strokeWidth: 2,
            fill: "white"
        });
        if (attrs.fill === "none") {
            delete attrs.fillOpacity;
        }
        let cx = width / 2,
            cy = height / 2,
            offsetX = attrs?.offsetX || 0,
            offsetY = attrs?.offsetY || 0;
        let circle = create("circle");
        attr(circle, {
            cx: cx - offsetX,
            cy: cy - offsetY,
            r: Math.round((width + height) / 4 - offset)
        });
        attr(circle, attrs);
        append(parentGfx, circle);
        return circle;
    }

    renderEmbeddedLabel(parentGfx, element, align) {
        let semantic = getSemantic(element);

        return this.renderLabel(parentGfx, semantic.name, {
            box: element,
            align: align,
            padding: 5,
            style: {
                fill: getStrokeColor(element, "#000")
            }
        });
    }

    drawDiamond(parentGfx, width, height, attrs) {
        let x2 = width / 2;
        let y2 = height / 2;

        let points = [ { x: x2, y: 0 }, { x: width, y: y2 }, { x: x2, y: height }, { x: 0, y: y2 } ];

        let pointsString = points.map(function (point) {
            return point.x + "," + point.y;
        }).join(" ");

        attrs = this.computeStyle(attrs, {
            stroke: "black",
            strokeWidth: 2,
            fill: "white"
        });

        let polygon = create("polygon");
        attr(polygon, {
            points: pointsString
        });
        attr(polygon, attrs);

        append(parentGfx, polygon);

        return polygon;
    }

    drawCustomShape(parentNode, element) {
        let attrs = {
            fill: getFillColor(element, "#ffffff"),
            stroke: getStrokeColor(element, "#5FAFF3")
        };
        attrs = attrs || {};

        // if (!("fillOpacity" in attrs)) {
        //     attrs.fillOpacity = 1;
        // }
        let rect = this.drawRect(parentNode, element.width, element.height, 2, 0, attrs);
        this.renderEmbeddedLabel(parentNode, element, "center-middle");
        return rect;
    }

    drawEventElement(parentNode, element, attrs) {
        if (!("fillOpacity" in attrs)) {
            attrs.fillOpacity = 1;
        }
        return this.drawCircle(parentNode, element.width, element.height, undefined, attrs);
    }

    drawStartEventElement(parentNode, element) {
        let attrs = {
            strokeWidth: 9,
            fill: getFillColor(element, "#377FFC"),
            stroke: getStrokeColor(element, "#9BBFFD"),
            width: 40,
            height: 40
        };
        let semantic = getSemantic(element);
        let circle = this.drawEventElement(parentNode, element, attrs);

        // let attrs1: any = {
        //     stroke: getStrokeColor(element, "#377FFC"),
        //     fill: getFillColor(element, "#377FFC"),
        //     fillOpacity: 1,
        //     offsetX: -9,
        //     offsetY: -9
        // };
        // drawCircle(parentNode, element.width - 18, element.height - 18, 0, attrs1);
        return circle;
    }

    drawEndEventElement(parentNode, element) {
        let attrs = {
            strokeWidth: 7,
            fill: getFillColor(element, "#fff"),
            stroke: getStrokeColor(element, "#D4237A")
        };
        // element["width"] = 40;
        // element["height"] = 40;
        let circle = this.drawEventElement(parentNode, element, attrs);
        return circle;
    }

    drawCustomElements(parentNode, element) {
        // console.log(element);
        const type = element.type; // 获取到类型
        if (type !== "label") {
            if (customElements.includes(type)) { // or customConfig[type]
                let { x, y } = element;
                const { url } = customConfig[type];
                const attrs = (customConfig[type] || {})["attr"];
                const customIcon = create("image", {
                    ...attrs,
                    href: url
                });
                element["width"] = attrs.width;// 这里我是取了巧, 直接修改了元素的宽高
                element["height"] = attrs.height;
                append(parentNode, customIcon);
                // console.log(element.labels.length);
                // console.log(element.label);
                // 判断是否有name属性来决定是否要渲染出label
                if (!hasLabelElements.includes(type) && element.businessObject.name) {
                    const text = create("text", {
                        x: attrs.x,
                        y: attrs.y + attrs.height / 2,
                        "font-size": "14",
                        "fill": "#000"
                    });
                    text.innerHTML = element.businessObject.name;
                    append(parentNode, text);
                }
                this.renderLabel(parentNode, element.label, {});

                return customIcon;
            }
            const shape = this.bpmnRenderer.drawShape(parentNode, element);
            return shape;
        } else {
            return element;
        }
    }

    drawUserTaskElement(parentNode, element) {
        let task = this.drawCustomShape(parentNode, element);
        let x = 19;
        let y = 18;
        let pathData = this.pathMap.getScaledPath("TASK_TYPE_USER_1", {
            abspos: {
                x: x,
                y: y
            }
        });
        this.drawPath(parentNode, pathData, {
            strokeWidth: 0.5,
            fill: getFillColor(element, "#ffffff"),
            stroke: getStrokeColor(element, "#000000")
        });
        let pathData2 = this.pathMap.getScaledPath("TASK_TYPE_USER_2", {
            abspos: {
                x: x,
                y: y
            }
        });
        this.drawPath(parentNode, pathData2, { // 身体
            strokeWidth: 0.5,
            fill: getFillColor(element, "#ffffff"),
            stroke: getStrokeColor(element, "#000000")
        });
        let pathData3 = this.pathMap.getScaledPath("TASK_TYPE_USER_3", {
            abspos: {
                x: x,
                y: y
            }
        });
        this.drawPath(parentNode, pathData3, { // 头
            strokeWidth: 0.5,
            fill: getStrokeColor(element, "#000000"),
            stroke: getStrokeColor(element, "#000000")
        });
        return task;
    }

    drawAutoTaskElement(parentNode, element) {
        let task = this.drawCustomShape(parentNode, element);
        let pathDataBG = this.pathMap.getScaledPath("TASK_TYPE_SERVICE", {
            abspos: {
                x: 16,
                y: 26
            }
        });
        this.drawPath(parentNode, pathDataBG, {
            strokeWidth: 1,
            fill: getFillColor(element, "#fff"),
            stroke: getStrokeColor(element, "#000")
        });
        let fillPathData = this.pathMap.getScaledPath("TASK_TYPE_SERVICE_FILL", {
            abspos: {
                x: 21.2,
                y: 26
            }
        });
        this.drawPath(parentNode, fillPathData, {
            strokeWidth: 0,
            fill: getFillColor(element, "#fff")
        });
        let pathData = this.pathMap.getScaledPath("TASK_TYPE_SERVICE", {
            abspos: {
                x: 21,
                y: 30
            }
        });
        this.drawPath(parentNode, pathData, {
            strokeWidth: 1,
            fill: getFillColor(element, "#fff"),
            stroke: getStrokeColor(element, "#000")
        });
        return task;
    }

    drawCustomGateway(parentNode, element) {
        let attrs = {
            fill: getFillColor(element, "fff"),
            fillOpacity: 0,
            stroke: getStrokeColor(element, "#000")
        };
        return this.drawDiamond(parentNode, element.width, element.height, attrs);
    }

    drawStartGatewayElement(parentNode, element) {
        let diamond = this.drawCustomGateway(parentNode, element);

        let pathData = this.pathMap.getScaledPath("GATEWAY_COMPLEX", {
            xScaleFactor: 0.5,
            yScaleFactor: 0.5,
            containerWidth: element.width,
            containerHeight: element.height,
            position: {
                mx: 0.46,
                my: 0.26
            }
        });

        this.drawPath(parentNode, pathData, {
            strokeWidth: 1,
            fill: getStrokeColor(element, "#000"),
            stroke: getStrokeColor(element, "#000")
        });
        return diamond;
    }

    drawEndGatewayElement(parentNode, element) {
        let diamond = this.drawCustomGateway(parentNode, element);

        let pathData = this.pathMap.getScaledPath("GATEWAY_EXCLUSIVE", {
            xScaleFactor: 0.4,
            yScaleFactor: 0.4,
            containerWidth: element.width,
            containerHeight: element.height,
            position: {
                mx: 0.32,
                my: 0.3
            }
        });

        if ((getDi(element).isMarkerVisible) || true) {
            this.drawPath(parentNode, pathData, {
                strokeWidth: 1,
                fill: getStrokeColor(element, "#000"),
                stroke: getStrokeColor(element, "#000")
            });
        }

        return diamond;
    }

    canRender(element) {
        return true;
    }

    drawShape(p, element) {
        if (element.type === "bpmn:StartEvent") {
            return this.drawStartEventElement(p, element);
        }
        if (element.type === "bpmn:EndEvent") {
            return this.drawEndEventElement(p, element);
        }
        if (element.type === "bpmn:UserTask") {
            return this.drawUserTaskElement(p, element);
        }
        if (element.type === "bpmn:ServiceTask") {
            return this.drawAutoTaskElement(p, element);
        }
        if (element.type === "bpmn:InclusiveGateway") {
            let { value, businessObject } = element;
            let type = businessObject?.$attrs?.type || "";
            if (value === "start" || type === "start") {
                return this.drawStartGatewayElement(p, element);
            } else if (value === "end" || type === "end") {
                return this.drawEndGatewayElement(p, element);
            }
        }
    }

    getShapePath(shape) {
        console.log(shape);
    }
}

CustomRender.$inject = [
    "eventBus", "styles", "textRenderer", "pathMap"
];
