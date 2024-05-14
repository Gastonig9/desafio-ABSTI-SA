// router.js
import { pages } from "../controllers/indexController";

export const router = async (path) => {
  let content = document.getElementById("root");
  content.innerHTML = "";

  if (path === "#/") {
    try {
      const homeContent = await pages.home();
      content.appendChild(homeContent);
    } catch (error) {
      console.error("Error al cargar la página de inicio:", error);
    }
  } else if (path === "#/jobs") {
    content.appendChild(pages.jobs());
  } else if (path.match(/^#\/view\/(\S+)$/)) {
    const jobTitle = path.split("/")[2];
    try {
      const jobDetailContent = await pages.jobDetail(jobTitle);
      content.appendChild(jobDetailContent);
    } catch (error) {
      console.error("Error al cargar los detalles del trabajo:", error);
    }
  } else {
    try {
      const notFoundContent = await pages.notFound();
      content.appendChild(notFoundContent);
    } catch (error) {
      console.error("Error al cargar esta página:", error);
    }
  }
};
