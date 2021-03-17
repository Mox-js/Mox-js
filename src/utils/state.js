import { reRender } from "./render.js";

class _State {
  constructor(v, onChange) {
    this._value = v;
    this.onChange = onChange;
  }
  set value(v) {
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
  let states = null;

  const _state = function (...args) {
    if (states) return states;
    if (args.length === 1) {
      states = new _State(
        values[0] === undefined ? args[0] : values[0],
        (v) => {
          values[0] = v;
        }
      );
      return states;
    }
    states = args.map(
      (initValue, index) =>
        new _State(
          values[index] === undefined ? initValue : values[index],
          (v) => {
            values[index] = v;
          }
        )
    );
    return states;
  };
  const res = fn(_state);
  return res;
};

export default State;
