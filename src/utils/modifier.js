class _Modifier {
  constructor(fn) {
    this.fn = fn;
  }
  modifier(name, fn) {
    this.fn.prototype[name] = fn;
    return this.fn;
  }
}
function Modifier(...args) {
  return new _Modifier(...args);
}
export default Modifier;
