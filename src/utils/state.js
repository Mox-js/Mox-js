import { reRender } from "./render.js";

// let index = 0;
// const resetStateIndex = function () {
//   index = 0;
// };
class _State {
  constructor(v, onChange) {
    this._value = v;
    this.onChange = onChange;
  }
  set value(v) {
    this._value = v;
    this.onChange(v);
    //resetStateIndex();
    reRender();
  }
  get value() {
    return this._value;
  }
}

// const values = [];
// const state = function (init) {
//   let _index = index;
//   index++;
//   return (function () {
//     if (values[_index] === undefined) {
//       values[_index] = init;
//       console.log("undi");
//     }
//     return new _State(values[_index], (v) => {
//       values[_index] = v;
//       console.log(v);
//     });
//   })();
// };

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
  return fn(_state);
};

export default State;
