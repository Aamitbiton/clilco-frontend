const fontSize = "16px";
export const errorLog = (message) => {
  if (typeof message !== "string") message = JSON.stringify(message);
  console.log(`%c${message}`, `font-size: ${fontSize}; color: red`);
};
export const successLog = (message) => {
  if (typeof message !== "string") message = JSON.stringify(message);
  console.log(`%c${message}`, `font-size: ${fontSize}; color: green`);
};
export const infoLog = (message) => {
  if (typeof message !== "string") message = JSON.stringify(message);
  console.log(`%c${message}`, `font-size: ${fontSize}; color: blue`);
};
