function bind(selector, event, callback) {
  document
    .querySelector(selector)
    .addEventListener(event, callback);
}

function generatePoem(data, paragraphs, author = "", book = "") {
  
  return ;
}

const data = getData("Lorca", "ny");

bind("generator", "click", () => generatePoem(data, 2, "Lorca", "ny"));