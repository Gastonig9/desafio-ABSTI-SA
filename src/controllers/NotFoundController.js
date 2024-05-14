import viewNotFound from "../pages/NotFound/notfound.html";
import "../pages/NotFound/notfound.css";
export default function NotFoundController() {
  const divElement = document.createElement("div");
  divElement.innerHTML = viewNotFound;
  return divElement;
};