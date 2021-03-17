import { Mox, State, Flex, Div, Input } from "./src/mox.js";

const CustomInput = (v) => Input(v);
const Main = State((state) => () => {
  let [val, todos] = state("", []);

  return Flex(
    CustomInput(val.value).onChange((e) => {
      const todosValue = JSON.parse(JSON.stringify(todos.value));
      todosValue.push(e);
      todos.value = todosValue;
      val.value = "";
    }),
    Flex(
      ...todos.value.map((e, index) =>
        Flex(
          Div(e),
          Div("x").onClick(() => {
            todos.value = todos.value.filter((e, i) => i !== index);
          })
        ).style({
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
const inputme = State((state) => (init) => {
  const t = state(init);
  return Div(t.value).onClick(() => (t.value += 1));
});
const inputme2 = State((state) => (init) => {
  const t = state(init);
  return Input(t.value).onClick(() => (t.value += 1));
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
  //       b.value = !b.value;
  //     })
  //   : Input("");
  // const b = state(false);
  // return Flex(
  //   b.value ? inputme(100) : inputme2("0"),
  //   Div("xxxxx").onClick(() => {
  //     b.value = !b.value;
  //   })
  // );
});

new Mox().Render("app", app);
