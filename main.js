import { Mox, State, Flex, Div } from "./src/mox.js";

const Title = (num) => Div(`you click ${num} times`);
const Options = (state) =>
  Flex(
    Div("-").on("click", () => {
      state.setValue((o) => o - 1);
    }),
    Div("+").on("click", () => {
      state.setValue((o) => o + 1);
    })
  )
    .styles({ "justify-content": "space-between" })
    .flexFlow("row nowrap");
const app = State((state) => () => {
  const times = state(0);
  return Flex(Title(times.value), Options(times))
    .styles({ width: "100%", "justify-content": "center" })
    .flexFlow("column")
    .class("box");
});

new Mox().Render("app", app);
