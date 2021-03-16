import { Mox, State, Flex, Div, Input } from "./src/mox.js";

const CustomInput = (v) => Input(v);
const Main = State((state) => () => {
  let [val, todos] = state("", []);

  return Flex(
    CustomInput(val.value).onChange((e) => {
      const todosValue = JSON.parse(JSON.stringify(todos.value));
      todosValue.unshift(e);
      todos.value = todosValue;
      val.value = "";
    }),
    Flex(
      ...todos.value.map((e, index) =>
        Flex(
          Div(e),
          Div("x").on("click", () => {
            todos.value = [];
          })
        ).style({
          width: "100%",
          "justify-content": "space-between",
        })
      )
    )
      .style({ width: "100%" })
      .flexFlow("column"),
    Div("x").on("click", () => {})
  )
    .columned()
    .centered();
});
const app = State((state) => () => {
  const times = state(0);
  return Flex(Div("Todos"), Main(), Div("Powered by Mox.js"))
    .centered()
    .flexFlow("column");
  // const b = state(true);
  // return b.value
  //   ? Div("123").on("click", () => {
  //       console.log("s");
  //       b.setValue(false);
  //     })
  //   : Input("");
});

new Mox().Render("app", app);
