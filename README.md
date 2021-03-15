# Mox.js

一个极简的声明式JavaScript UI框架。

引入src文件后，简单几行代码即可创建响应式、声明式的UI

```javascript
const app = State((state) => () => {
  const times = state(0);
  return Flex(
    Div(times.value), 
    Div("click me")
       .on("click"),times.setValue(o=>o+1))
    .flexFlow("column")
});

new Mox().Render("app", app);
```

