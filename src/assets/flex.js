import Node from "../utils/node.js";
class _Flex {
  constructor(...args) {
    const map = args.map((e) => {
      if (typeof e === "string" || typeof e === "number") {
        return new Node("text", [e]);
      } else {
        return e;
      }
    });
    const node = new Node("div", map);
    this.node = node;
    this.style = { display: "flex" };
  }
  flexFlow(...style) {
    this.style["flex-flow"] = style.join(" ");
    return this;
  }
  class(c) {
    this.class = c;
    return this;
  }
  styles(style) {
    Object.entries(style).forEach(([k, v]) => {
      this.style[k] = v;
    });
    return this;
  }
  on(event, fn) {}
}
function Flex(...args) {
  return new _Flex(...args);
}
export default Flex;
