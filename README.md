# Mox.js

一个极简的声明式 JavaScript UI 框架。

引入 src 文件后，简单几行代码即可创建响应式、声明式的 UI

```javascript
const app = State((state) => () => {
  const times = state(0);
  return Flex(
    Div(times.value),
    Div("click me").on("click", (times.value = times.value - 1))
  ).flexFlow("column");
});

new Mox().Render("app", app);
```
