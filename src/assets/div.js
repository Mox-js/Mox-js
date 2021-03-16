import Node from "../utils/node.js";
class _Div extends Node {
  constructor(...args) {
    super("div");
    args.forEach((e) => {
      if (typeof e === "string" || typeof e === "number") {
        this.append(new Node("text", [e]));
      } else {
        this.append(e.node);
      }
    });
  }
  // Pseudo(style) {
  //   if (!this.class) this.class = generateClassName();
  // }
  style(style) {
    Object.entries(style).forEach(([k, v]) => {
      this._style[k] = v;
    });
    return this;
  }
  class(c) {
    this._class = c;
    return this;
  }
  on(event, callback) {
    this.events.push({ event, callback });
    return this;
  }
}
function Div(...args) {
  return new _Div(...args);
}
export default Div;
