const words = [];
for (let i = 65; i < 90; i++) {
  words.push(String.fromCharCode(i));
}
function generateClassName() {
  return new Array(5).fill(words[parseInt(Math.random() * 25)]);
}
let i = 0;
function getKey() {
  return i++;
}
export { generateClassName, getKey };
