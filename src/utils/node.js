class Node {
  constructor(tag, children) {
    this.tag = tag ?? "div";
    this.children = children ?? [];
    this._id = "";
    this._class = "";
    this._style = "";
    this.events = [];
  }
  append(node) {
    this.children.push(node);
  }
}
export default Node;
