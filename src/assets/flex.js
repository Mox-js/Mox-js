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
  columned() {
    this._style["flex-flow"] = "column nowrap";
    return this;
  }
  centered() {
    this._style["justify-content"] = "center";
    this._style["align-items"] = "center";
    return this;
  }
}
function Flex(...args) {
  return new _Flex(...args);
}
export default Flex;
