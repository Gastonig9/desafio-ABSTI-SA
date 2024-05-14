import viewJobDetail from "../pages/JobDetail/jobDetail.html";
import "../pages/JobDetail/jobDetail.css";
import { getJobByTitle } from "../apiServices/JobService";

export default function jobDetailController(jobTitle) {
  const divElement = document.createElement("div");
  divElement.innerHTML = viewJobDetail;

  const jobDetailContainer = divElement.querySelector("#job-detail-container");
  const loader = divElement.querySelector("#loader");

  // Mostrar loader mientras se realiza la solicitud a la API
  loader.style.display = "block";

  getJobByTitle(jobTitle)
    .then(jobDetail => {
      // Renderizar los detalles del trabajo una vez que se obtengan los datos
      renderJobDetail(jobDetail, jobDetailContainer);
    })
    .catch(error => {
      console.error("Error al obtener el empleo:", error);
    })
    .finally(() => {
      // Ocultar el loader después de que se complete la solicitud (independientemente del resultado)
      loader.style.display = "none";
    });

  return divElement;
}

function renderJobDetail(job, container) {
  const jobDetailCard = document.createElement("div");
  jobDetailCard.classList.add("job-detail-item");
  jobDetailCard.innerHTML = `
        <div class="divider-jobTitle-contain">
            <h1>${job.jobTitle}</h1>
            <div class="line"></div>
            <div class="line2"></div>
        </div> 
        <div class="jobDetail-contain">
            <div class="img-job">
                <img src="${job.jobImage}"/>
            </div> 
            <div class="jobDetail-info">
                <div>
                    <p><i class="fas fa-calendar-alt"></i> Posted: ${new Date(
                      job.posted
                    ).toLocaleDateString()}</p>
                </div>
                <div>
                    <p><i class="fas fa-building"></i> Company: ${
                      job.company
                    }</p>
                </div>
                <div>
                    <p><i class="fas fa-dollar-sign"></i> Salary: $${
                      job.salary
                    }</p>
                </div>
                <div>
                    <p><i class="fas fa-user-clock"></i> Modality: ${
                      job.modality
                    }</p>
                </div>
            </div>
            <div class="jobDetail-description">
                <p>${job.description}</p>
            </div>
            <div class="jobDetail-apply">
                <a href="${
                  job.linkedin
                }" target="_blank" class="a-linkedin">Apply with linkedin</a>
                <a href="mailto:${
                  job.companyMail
                }" class="a-mail">Apply with email</a>
            </div>
        </div>
    `;

  container.appendChild(jobDetailCard);
}
