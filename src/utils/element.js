// TO_DO
class _Element {
  constructor(fn) {
    this.fn = fn;
  }
}
function Element(...args) {
  return new _Element(...args);
}
export default Element;
