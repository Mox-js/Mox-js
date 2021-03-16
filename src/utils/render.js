import { getKey } from "./generate.js";
let rootC;
let oldTree;
let newTree;
function Render(id, c) {
  rootC = c;
  oldTree = render(document.getElementById(id), getCompTree(c));
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
  const isCloseTag = function (tag) {
    return ["input", "img", "text"].includes(tag);
  };
  const travel = function (nt, ot) {
    if (nt.tag !== ot.tag) {
      const nx = render(ot.$el, nt);
      (ot.$parent.$el ?? ot.$parent).replaceChild(nx.$el, ot.$el);
      ot = nt;
    }
    if (ot.tag === "text" && ot.$el.textContent !== nt.children[0]) {
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
    if (isCloseTag(ot.tag)) {
      if (ot.tag === "input") {
        if (ot.$el.value !== nt._value) {
          ot.$el.value = nt._value;
          ot._value = nt._value;
        }
      }
      return;
    }
    const otChildLength = ot.children.length;
    for (let i = 0; i < nt.children.length && i < otChildLength; i++) {
      travel(nt.children[i], ot.children[i]);
    }
    if (nt.children.length > otChildLength) {
      for (let i = otChildLength; i < nt.children.length; i++) {
        render(ot, nt.children[i]);
        ot.children.push(nt.children[i]);
      }
    } else if (nt.children.length < otChildLength) {
      for (let i = otChildLength - 1; i >= nt.children.length; i--) {
        if (ot.events.length > 0)
          ot.events.forEach(({ event, callback }) => {
            ot.children[i].$el.removeEventListener(event, callback);
            console.log(ot.events);
          });
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
  const root = id.$el ?? id;
  const comp = getCompTree(c);
  const node = comp;
  let child_root;
  comp.$parent = root;
  comp.$key = getKey();
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
    if (Object.keys(comp.selfEvents).length > 0) {
      for (let event in comp.selfEvents) {
        child_root[event] = comp.selfEvents[event]; //.bind(this, comp.$el.value);
        //console.log(comp);
      }
    }
    if (comp._style && Object.keys(comp._style).length > 0) {
      Object.entries(comp._style).forEach(([k, v]) => {
        setStyle(child_root, k, v);
      });
    }
    if (comp._class) {
      child_root.setAttribute("class", comp._class);
    }
    if (comp._id) {
      child_root.setAttribute("id", comp._class);
    }
    if (node.tag === "input") {
      child_root.value = node._value;
      //return;
    }
    console.log(id);
    console.log(root, node, "root");
    if (!root.$el) root.appendChild(child_root);
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
