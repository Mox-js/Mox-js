import { Mox, State, Flex, Div, Input } from "./src/mox.js";

const CustomInput = (v) => Input(v);
const Main = State((state) => () => {
  let [val, todos, id] = state("", [], 0);
  return Flex(
    CustomInput(val.value).onChange((e) => {
      todos.value.push({ name: e, checked: false, id: id.value });
      id.value += 1;
      val.value = "";
    }),
    Flex(
      ...todos.value.map((e, index) =>
        Flex(
          Div(e.name).style({ color: e.checked ? "red" : "gray" }),
          Div("x").onClick(() => {
            todos.value = todos.value.filter((v, i) => i !== index);
            console.log(todos.value);
          })
        )
          .onClick(() => {
            todos.value = todos.value.map((v, i) => {
              let vv = v;
              if (v.id === e.id) {
                vv.checked = !vv.checked;
                return vv;
              }
              return v;
            });
            console.log(e, todos.value);
          })
          .style({
            width: "100%",
            "justify-content": "space-between",
          })
      )
    )
      .style({ width: "100%" })
      .flexFlow("column"),
    Div("clearAll").onClick(() => {
      todos.value = [];
    })
  )
    .columned()
    .centered();
});
const app = () =>
  Flex(Div("Todos"), Main(), Div("Powered by Mox.js"))
    .centered()
    .flexFlow("column");

new Mox().Render("app", app);
