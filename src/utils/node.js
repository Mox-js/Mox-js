class Node {
  constructor(tag, children) {
    this.tag = tag ?? "div";
    this.children = children ?? [];
  }
  append(node) {
    this.children.push(node);
  }
}
export default Node;
