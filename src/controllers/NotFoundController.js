import viewNotFound from "../pages/notFound.html";
export default () => {
  const divElement = document.createElement("div");
  divElement.innerHTML = viewNotFound;

  return divElement;
};