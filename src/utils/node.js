class Node {
  constructor(tag, $children) {
    this.tag = tag ?? "div";
    this.$children = $children ?? [];
    this._id = "";
    this._class = "";
    this._style = "";
    this.events = [];
    this.selfEvents = {};
  }
  append(node) {
    this.$children.push(node);
  }
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
  onClick(callback) {
    this.events.push({ event: "click", callback });
    return this;
  }
}
export default Node;
