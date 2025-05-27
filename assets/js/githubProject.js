document.addEventListener("DOMContentLoaded", () => {
  const githubUsername = "alyazidt";
  const container = document.getElementById("projects-container");
  const filterContainer = document.getElementById("languageFilter");

  let allProjects = [];
  let currentFilter = "all";

  async function fetchGitHubRepos() {
    try {
      const response = await fetch(
        `https://api.github.com/users/${githubUsername}/repos`
      );
      const repos = await response.json();

      if (!Array.isArray(repos)) throw new Error("Invalid response");

      allProjects = repos.map((repo) => ({
        name: repo.name,
        url: repo.html_url,
        language: repo.language || "Other",
      }));

      renderLanguageFilters();
      renderProjects();
    } catch (error) {
      container.innerHTML = `<p class="text-danger text-center">Failed to load projects. Try again later.</p>`;
    }
  }

  function renderLanguageFilters() {
    const languages = ["all", ...new Set(allProjects.map((p) => p.language))];
    filterContainer.innerHTML = "";

    languages.forEach((lang) => {
      const btn = document.createElement("button");
      btn.className = `filter-btn ${lang === "all" ? "active" : ""}`;
      btn.textContent = lang;
      btn.setAttribute("data-lang", lang);

      btn.addEventListener("click", () => {
        currentFilter = lang;
        document
          .querySelectorAll(".filter-btn")
          .forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        renderProjects();
      });

      filterContainer.appendChild(btn);
    });
  }

  function renderProjects() {
    container.innerHTML = "";

    const filtered =
      currentFilter === "all"
        ? allProjects
        : allProjects.filter((p) => p.language === currentFilter);

    if (filtered.length === 0) {
      container.innerHTML =
        "<p class='text-center'>No projects found for this language.</p>";
      return;
    }

    let displayedProjects = filtered;
    let showMoreNeeded = false;

    // عرض فقط أول ٤ مشاريع عند اختيار "all"
    if (currentFilter === "all" && filtered.length > 4) {
      displayedProjects = filtered.slice(0, 4);
      showMoreNeeded = true;
    }

    displayedProjects.forEach((project) => {
      const col = document.createElement("div");
      col.className = "col-md-3 col-sm-6 mb-4 d-flex align-items-stretch";

      col.innerHTML = `
        <div class="project-card bg-light p-4 w-100">
          <h5 class="mb-2">${project.name}</h5>
          <p class="text-muted small mb-1">Language: <strong>${project.language}</strong></p>
          <a href="${project.url}" target="_blank">
            <button class="btn-rounded btn btn-outline-primary mt-4">
              Open on GitHub
            </button>
          </a>
        </div>
      `;

      container.appendChild(col);
    });

    // زر "Show More" و "Show Less"
    if (showMoreNeeded) {
      const showMoreBtn = document.createElement("button");
      showMoreBtn.className = "btn-rounded btn btn-outline-primary mt-4";
      showMoreBtn.textContent = "Show All Projects";

      const showLessBtn = document.createElement("button");
      showLessBtn.className =
        "btn-rounded btn btn-outline-secondary mt-4 d-none";
      showLessBtn.textContent = "Show Less";

      showMoreBtn.addEventListener("click", () => {
        renderAllProjects(filtered);
        showMoreBtn.classList.add("d-none");
        showLessBtn.classList.remove("d-none");
      });

      showLessBtn.addEventListener("click", () => {
        renderInitialProjects(filtered);
        showLessBtn.classList.add("d-none");
        showMoreBtn.classList.remove("d-none");
      });

      const wrapper = document.createElement("div");
      wrapper.className = "col-12 text-center";
      wrapper.appendChild(showMoreBtn);
      wrapper.appendChild(showLessBtn);
      container.appendChild(wrapper);
    }
  }

  function renderAllProjects(projects) {
    container.innerHTML = "";

    projects.forEach((project) => {
      const col = document.createElement("div");
      col.className = "col-md-3 col-sm-6 mb-4 d-flex align-items-stretch";

      col.innerHTML = `
        <div class="project-card bg-light p-4 w-100">
          <h5 class="mb-2">${project.name}</h5>
          <p class="text-muted small mb-1">Language: <strong>${project.language}</strong></p>
          <a href="${project.url}" target="_blank">
            <button class="btn-rounded btn btn-outline-primary mt-4">
              Open on GitHub
            </button>
          </a>
        </div>
      `;

      container.appendChild(col);
    });

    // إعادة عرض زر "Show Less"
    const showLessBtn = document.createElement("button");
    showLessBtn.className = "btn-rounded btn btn-outline-primary mt-4";
    showLessBtn.textContent = "Show Less";

    showLessBtn.addEventListener("click", () => {
      renderInitialProjects(projects);
    });

    const wrapper = document.createElement("div");
    wrapper.className = "col-12 text-center";
    wrapper.appendChild(showLessBtn);
    container.appendChild(wrapper);
  }

  function renderInitialProjects(projects) {
    container.innerHTML = "";

    const initialProjects = projects.slice(0, 4);

    initialProjects.forEach((project) => {
      const col = document.createElement("div");
      col.className = "col-md-3 col-sm-6 mb-4 d-flex align-items-stretch";

      col.innerHTML = `
        <div class="project-card bg-light p-4 w-100">
          <h5 class="mb-2">${project.name}</h5>
          <p class="text-muted small mb-1">Language: <strong>${project.language}</strong></p>
          <a href="${project.url}" target="_blank">
            <button class="btn-rounded btn btn-outline-primary mt-4">
              Open on GitHub
            </button>
          </a>
        </div>
      `;

      container.appendChild(col);
    });

    // إعادة زر "Show All Projects"
    const showMoreBtn = document.createElement("button");
    showMoreBtn.className = "btn-rounded btn btn-outline-primary mt-4";
    showMoreBtn.textContent = "Show All Projects";

    const showLessBtn = document.createElement("button");
    showLessBtn.className = "btn-rounded btn btn-outline-secondary mt-4 d-none";
    showLessBtn.textContent = "Show Less";

    showMoreBtn.addEventListener("click", () => {
      renderAllProjects(projects);
      showMoreBtn.classList.add("d-none");
      showLessBtn.classList.remove("d-none");
    });

    showLessBtn.addEventListener("click", () => {
      renderInitialProjects(projects);
      showLessBtn.classList.add("d-none");
      showMoreBtn.classList.remove("d-none");
    });

    const wrapper = document.createElement("div");
    wrapper.className = "col-12 text-center";
    wrapper.appendChild(showMoreBtn);
    wrapper.appendChild(showLessBtn);
    container.appendChild(wrapper);
  }

  fetchGitHubRepos();
});
