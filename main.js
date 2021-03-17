import { Mox, State, Flex, Div, Input } from "./src/mox.js";

const CustomInput = (v) => Input(v);
const Main = State((state) => () => {
  let [val, todos] = state("", []);
  return Flex(
    CustomInput(val.value).onChange((e) => {
      todos.value.push({ name: e, checked: false });
      val.value = "";
    }),
    Flex(
      ...todos.value.map((e, index) =>
        Flex(
          Div(e.name).style({ color: e.checked ? "red" : "gray" }),
          Div("x").onClick(() => {
            todos.value = todos.value.filter((e, i) => i !== index);
          })
        )
          .onClick(() => {
            todos.value = todos.value.map((e, i) => {
              if (i === index) {
                e.checked = !e.checked;
                return e;
              }
              return e;
            });
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
