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
}
function Div(...args) {
  return new _Div(...args);
}
export default Div;
