import Node from "../utils/node.js";
class _Div extends Node {
  constructor(...args) {
    const map = args.map((e) => {
      if (typeof e === "string" || typeof e === "number") {
        return new Node("text", [e]);
      } else {
        return e;
      }
    });
    super("div", map);
  }
  // Pseudo(style) {
  //   if (!this.class) this.class = generateClassName();
  // }
}
function Div(...args) {
  return new _Div(...args);
}
export default Div;
