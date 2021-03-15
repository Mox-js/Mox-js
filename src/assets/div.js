import Node from "../utils/node.js";
import generateClassName from "../utils/generateClassName";
class _Div {
  constructor(...args) {
    const node = new Node("div");
    args.forEach((e) => {
      if (typeof e === "string" || typeof e === "number") {
        node.append(new Node("text", [e]));
      } else {
        node.append(e.node);
      }
    });
    this.node = node;
    this.style = {};
    this.class = "";
    this.events = [];
  }
  Pseudo(style) {
    if (!this.class) this.class = generateClassName();
  }
  styles(style) {
    Object.entries(style).forEach(([k, v]) => {
      this.style[k] = v;
    });
    return this;
  }
  class(c) {
    this.class = c;
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
