import CustomPalette from "./CustomPalette.js";
import CustomRender from "./CustomRender.js";
import CustomContextPad from "./CustomContextPad.js";

export default {
    __init__: [ "paletteProvider", "customRenderer", "contextPadProvider" ],
    paletteProvider: [ "type", CustomPalette ],
    customRenderer: [ "type", CustomRender ],
    contextPadProvider: [ "type", CustomContextPad ]
};