import viewJobs from "../pages/Jobs/jobs.html";
import "../pages/Jobs/jobs.css";
import { getJobs, searchJobsByKey } from "../apiServices/JobService";

export default () => {
  const divElement = document.createElement("div");
  divElement.innerHTML = viewJobs;
  const jobContainer = divElement.querySelector("#jobsPage-contain");
  const loader = divElement.querySelector("#loader-jobsPage");
  const searchInput = divElement.querySelector("#search-input");
  const searchButton = divElement.querySelector("#search-button");

  loader.style.display = "block";

  getJobs()
    .then((jobs) => {
      renderJobs(jobs.latestJobs, jobContainer);
    })
    .catch((error) => {
      console.error("Error al obtener los trabajos:", error);
    })
    .finally(() => {
      loader.style.display = "none";
    });

    searchButton.addEventListener("click", () => {
      const searchTerm = searchInput.value.trim();
      if (searchTerm !== "") {
        loader.style.display = "block";
  
        searchJobsByKey(searchTerm)
          .then((data) => {
            renderJobs(data.searchResults, jobContainer);
          })
          .catch((error) => {
            console.error("Error al realizar la búsqueda de trabajos:", error);
          })
          .finally(() => {
            loader.style.display = "none";
          });
      }
    });

  return divElement;
};

function renderJobs(jobs, container) {
  container.innerHTML = "";

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
