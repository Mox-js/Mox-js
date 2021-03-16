import Node from "../utils/node.js";
class _Input extends Node {
  constructor(value) {
    super("input");
    this._value = value;
  }
  // Pseudo(style) {
  //   if (!this.class) this.class = generateClassName();
  // }
  onChange(fn) {
    this.selfEvents.onchange = function (event) {
      fn(event.target.value);
    };
    return this;
  }
  onInput(fn) {
    this.selfEvents.oninput = function (event) {
      fn(event.target.value);
    };
    return this;
  }
}
function Input(...args) {
  return new _Input(...args);
}
export default Input;
