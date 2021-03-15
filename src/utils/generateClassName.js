const words = [];
for (var i = 65; i < 90; i++) {
  wordArr.push(String.fromCharCode(i));
}
function generateClassName() {
  return new Array(5).fill(words[parseInt(Math.random() * 25)]);
}
