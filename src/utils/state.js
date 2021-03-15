import { reRender } from "./render.js";
class _State {
  constructor(v, onChange) {
    this.value = v;
    this.onChange = onChange;
  }
  setValue(fn) {
    this.value = fn(this.value);
    this.onChange(this.value);
    reRender();
  }
}
const State = function (fn) {
  return (function () {
    let values = [];
    const state = function (...args) {
      if (args.length === 1)
        return new _State(
          values[0] === undefined ? args[0] : values[0],
          (v) => {
            values[0] = v;
          }
        );
      return args.map(
        (initValue, index) =>
          new _State(
            values[index] === undefined ? initValue : values[index],
            (v) => {
              values[index] = v;
            }
          )
      );
    };
    return fn.call(this, state);
  })();
};
export default State;
