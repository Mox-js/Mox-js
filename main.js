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
    .style({ "justify-content": "space-between" })
    .flexFlow("row nowrap");
const app = State((state) => () => {
  const times = state(0);
  return Flex(
    Title(times.value),
    Options(times),
    ...new Array(times.value + 1).fill(0).map(() => Div("hhh"))
  )
    .style({ width: "100%", "font-size": `${times.value * 10 + 10}px` })
    .flexFlow("column")
    .class(`class-${times.value}`);
});

new Mox().Render("app", app);
