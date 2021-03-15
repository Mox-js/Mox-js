let rootId;
let rootC;
function Render(id, c) {
  rootId = id;
  rootC = c;
  render(id, c);
}
function reRender() {
  document.body.removeChild(document.getElementById(rootId));
  const app = document.createElement("div");
  app.setAttribute("id", rootId);
  document.body.append(app);
  render(rootId, rootC);
}
function render(id, c) {
  const root = typeof id === "string" ? document.getElementById(id) : id;
  const comp = typeof c === "function" ? c() : c;
  const node = comp.node ?? comp;
  let child_root;
  if (node.tag === "text") {
    child_root = document.createTextNode(node.children[0]);
    root.appendChild(child_root);
  } else {
    child_root = document.createElement(node.tag);
    if (comp.events?.length > 0) {
      comp.events.forEach(({ event, callback }) => {
        child_root.addEventListener(event, callback);
      });
    }
    if (comp.style && Object.keys(comp.style).length > 0) {
      Object.entries(comp.style).forEach(([k, v]) => {
        setStyle(child_root, k, v);
      });
    }
    if (comp.class) {
      child_root.setAttribute("class", comp.class);
    }
    root.appendChild(child_root);
    const children = node.children;
    if (!children || children.length === 0) {
    } else {
      children.forEach((e) => render(child_root, e));
    }
  }
}
function setStyle(el, styleName, styleValue) {
  el.style[styleName] = styleValue;
}
export { Render, reRender };
