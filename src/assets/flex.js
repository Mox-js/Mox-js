import Node from "../utils/node.js";
class _Flex extends Node {
  constructor(...args) {
    const map = args.map((e) => {
      if (typeof e === "string" || typeof e === "number") {
        return new Node("text", [e]);
      } else {
        return e;
      }
    });
    super("div", map);
    this._style = { display: "flex" };
  }
  flexFlow(...style) {
    this._style["flex-flow"] = style.join(" ");
    return this;
  }
  class(c) {
    this._class = c;
    return this;
  }
  style(style) {
    Object.entries(style).forEach(([k, v]) => {
      this._style[k] = v;
    });
    return this;
  }
  on(event, fn) {}
}
function Flex(...args) {
  return new _Flex(...args);
}
export default Flex;
