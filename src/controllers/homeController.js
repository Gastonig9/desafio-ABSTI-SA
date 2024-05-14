import viewHome from "../pages/Home/home.html";
import "../pages/Home/home.css";
import { getJobs } from "../apiServices/JobService";

export default function homeController() {
  const divElement = document.createElement("div");
  divElement.innerHTML = viewHome;

  const jobContainer = divElement.querySelector("#jobs-home-contain");
  const loader = divElement.querySelector("#loader");
  loader.style.display = "block";
  getJobs()
    .then((jobs) => {
      const simplifyJobs = jobs.latestJobs.slice(0, 3);
      // Renderizar los trabajos una vez que se obtengan los datos
      renderJobs(simplifyJobs, jobContainer);
    })
    .catch((error) => {
      console.error("Error al obtener los trabajos:", error);
    })
    .finally(() => {
      // Ocultar el loader después de que se complete la solicitud (independientemente del resultado)
      loader.style.display = "none";
    });

  return divElement;
}

function renderJobs(jobs, container) {
  jobs.forEach((job) => {
    const jobCard = document.createElement("div");
    jobCard.classList.add("job-item");
    jobCard.innerHTML = `
      <h3>${job.jobTitle}</h3>
      <h5>${job.company}</h5>
      <p>${job.description}</p>
      <a href='/#/view/${job.jobTitle}'>
        <button class="btn btn-danger">Apply</button>
      </a>
    `;
    container.appendChild(jobCard);
  });
}
