let rootId;
let rootC;
let oldTree;
let newTree;
function Render(id, c) {
  rootId = id;
  rootC = c;
  oldTree = render(id, getCompTree(c));
}
function reRender() {
  newTree = getCompTree(rootC);
  const stringifyStyle = function (s) {
    if (typeof s === "object") {
      const str = Object.entries(s)
        .map(([k, v]) => `${k}:${v}`)
        .join(";");
      return str;
    }
    return s;
  };
  const travel = function (nt, ot) {
    if (ot.tag === "text") {
      ot.$el.textContent = nt.children[0];
      ot.children[0] = nt.children[0];
      return;
    }
    ["class", "id", "style"].forEach((k) => {
      const _k = `_${k}`;
      const v = nt[_k];
      if (ot[_k] !== v) {
        ot[_k] = v;
        ot.$el.setAttribute(k, stringifyStyle(v));
      }
    });
    for (let i = 0; i < nt.children.length && i < ot.children.length; i++) {
      travel(nt.children[i], ot.children[i]);
    }
    if (nt.children.length > ot.children.length) {
      for (let i = ot.children.length; i < nt.children.length; i++) {
        render(ot, nt.children[i]);
        ot.children.push(nt.children[i]);
      }
    } else if (nt.children.length < ot.children.length) {
      for (let i = ot.children.length - 1; i >= nt.children.length; i--) {
        ot.$el.removeChild(ot.children[i].$el);
        ot.children.pop();
      }
    }
  };
  travel(newTree, oldTree);
}
function getCompTree(c) {
  return typeof c === "function" ? c() : c;
}
function render(id, c) {
  const root =
    typeof id === "string" ? document.getElementById(id) : id.$el ?? id;
  const comp = getCompTree(c);
  const node = comp;
  let child_root;
  if (node.tag === "text") {
    child_root = document.createTextNode(node.children[0]);
    root.appendChild(child_root);
    comp.$el = child_root;
  } else {
    child_root = document.createElement(node.tag);
    comp.$el = child_root;
    if (comp.events?.length > 0) {
      comp.events.forEach(({ event, callback }) => {
        child_root.addEventListener(event, callback);
      });
    }
    if (comp._style && Object.keys(comp._style).length > 0) {
      Object.entries(comp._style).forEach(([k, v]) => {
        setStyle(child_root, k, v);
      });
    }
    if (comp._class) {
      child_root.setAttribute("class", comp._class);
    }
    root.appendChild(child_root);
    const children = node.children;
    if (!children || children.length === 0) {
    } else {
      children.map((e) => render(child_root, e));
    }
  }
  return comp;
}
function setStyle(el, styleName, styleValue) {
  el.style[styleName] = styleValue;
}
export { Render, reRender };
