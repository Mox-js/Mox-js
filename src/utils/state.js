import { reRender } from "./render.js";
class _State {
  constructor(v, onChange) {
    this._value = v;
    this.onChange = onChange;
  }
  set value(v) {
    console.log("set", v);
    this._value = v;
    this.onChange(v);
    reRender();
  }
  get value() {
    return this._value;
  }
}
const State = function (fn) {
  const values = [];
  const state = function (...args) {
    if (args.length === 1)
      return new _State(values[0] === undefined ? args[0] : values[0], (v) => {
        values[0] = v;
      });
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
  return fn(state);
};
export default State;
