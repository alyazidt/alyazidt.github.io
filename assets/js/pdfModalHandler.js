// بيانات الشهادات
const certifications = [
  // Git and GitHub
  {
    date: "17 May 2025",
    pdfSrc: "/assets/pdf/Certifications/GitandGitHub.pdf",
  },

  // Database Fundamentals
  {
    date: "16 May 2025",
    pdfSrc:
      "/assets/pdf/Certifications/Database Fundamentals_Course_Certificate_En.pdf",
  },

  //   Mahatta Program
  {
    date: "28 February 2025",
    pdfSrc: "/assets/pdf/Certifications/Mahatta.pdf",
  },

  //   Create your own voice assistant VoiceMate
  {
    date: "19 April 2025",
    pdfSrc:
      "/assets/pdf/Certifications/Create your own voice assistant VoiceMate.pdf",
  },

  //   HowToBuildChatBotusingFlutter & Gemini
  {
    date: "14 April 2025",
    pdfSrc:
      "/assets/pdf/Certifications/HowToBuildChatBotusingFlutter & Gemini.pdf",
  },

  //   Building an app using Fluter in an hour
  {
    date: "18 February 2025",
    pdfSrc:
      "/assets/pdf/Certifications/Building an app using Fluter in an hour.pdf",
  },

  //   Mustaed
  {
    date: "01 August 2024",
    pdfSrc: "/assets/pdf/Certifications/Mustaed.pdf",
  },

  //   Turtle Commandos
  {
    date: "22 July 2023",
    pdfSrc: "/assets/pdf/Certifications/Turtle Commandos.pdf",
  },

  //   alamnalsybrany
  {
    date: "11 July 2024",
    pdfSrc: "/assets/pdf/Certifications/alamnalsybrany.pdf",
  },

  //   alamnalsybrany
  {
    date: "29 July 2023",
    pdfSrc: "/assets/pdf/Certifications/tknyatgogl.pdf",
  },

  //    Fintech Eco-system
  {
    date: "07 December 2023",
    pdfSrc: "/assets/pdf/Certifications/Fintech Eco-system.pdf",
  },

  //   Sfety awareness
  {
    date: "14 June 2022",
    pdfSrc: "/assets/pdf/Certifications/Sfety awareness.pdf",
  },

  //   UseChatgpt
  {
    date: "16 July 2023",
    pdfSrc: "/assets/pdf/Certifications/UseChatgpt.pdf",
  },


  //   Cybersecurity and Information Security
  {
    date: "14 August 2023",
    pdfSrc: "/assets/pdf/Certifications/Cybersecurity and Information Security.pdf",
  },

  //   Java
  {
    date: "25 July 2023",
    pdfSrc: "/assets/pdf/Certifications/Java.pdf",
  },
];

// ترتيب الشهادات حسب التاريخ (الأحدث أولاً)
certifications.sort((a, b) => new Date(b.date) - new Date(a.date));

const container = document.getElementById("certifications-container");
const itemsPerPage = 3;
let currentPage = 1;

// توليد صورة من أول صفحة في ملف PDF
async function getPDFThumbnail(pdfUrl) {
  const loadingTask = pdfjsLib.getDocument(pdfUrl);
  const pdf = await loadingTask.promise;
  const page = await pdf.getPage(1);
  const scale = 1.5;
  const viewport = page.getViewport({ scale });

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  canvas.width = viewport.width;
  canvas.height = viewport.height;

  await page.render({ canvasContext: context, viewport }).promise;
  return canvas.toDataURL();
}

// عرض الشهادات في الصفحة
async function renderCertificationsPage(page) {
  container.innerHTML = "";
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedCerts = certifications.slice(start, end);

  for (const cert of paginatedCerts) {
    const col = document.createElement("div");
    col.className = "col-md-4 mb-4 d-flex";

    const thumbnail = await getPDFThumbnail(cert.pdfSrc);

    col.innerHTML = `
      <a href="#" class="cert-card d-block" data-bs-toggle="modal" data-bs-target="#pdfModal"
         data-pdf="${cert.pdfSrc}" data-title="${cert.title}">
        <img src="${thumbnail}" class="cert-card-img img-fluid" alt="${cert.title}">
        <span class="cert-overlay d-flex align-items-center justify-content-center">
          <span class="cert-caption text-center" style="display:none">
            <p class="font-weight-normal">${cert.date}</p>
          </span>
        </span>
      </a>
    `;

    container.appendChild(col);
    col.classList.add("fade-in");
  }

  renderPagination();
}

// عرض أزرار الصفحات
function renderPagination() {
  const pageNumbersContainer = document.getElementById("pageNumbers");
  pageNumbersContainer.innerHTML = "";

  const totalPages = Math.ceil(certifications.length / itemsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.className = "btn btn-outline-primary";
    if (i === currentPage) btn.classList.add("active");

    btn.addEventListener("click", () => {
      currentPage = i;
      renderCertificationsPage(currentPage);
    });

    pageNumbersContainer.appendChild(btn);
  }

  document.getElementById("prevBtn").disabled = currentPage === 1;
  document.getElementById("nextBtn").disabled = currentPage === totalPages;
}

// إعداد عرض المودال
const pdfModal = document.getElementById("pdfModal");
pdfModal.addEventListener("show.bs.modal", (event) => {
  const trigger = event.relatedTarget;
  const pdfSrc = trigger.getAttribute("data-pdf");
  const title = trigger.getAttribute("data-title");

  document.getElementById("pdfIframe").src = pdfSrc;
  document.getElementById("pdfModalLabel").textContent = title;
});

pdfModal.addEventListener("hidden.bs.modal", () => {
  document.getElementById("pdfIframe").src = "";
});

// أزرار التنقل

document.getElementById("prevBtn").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    renderCertificationsPage(currentPage);
  }
});

document.getElementById("nextBtn").addEventListener("click", () => {
  const totalPages = Math.ceil(certifications.length / itemsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    renderCertificationsPage(currentPage);
  }
});

// بدء التحميل بالصفحة الأولى
renderCertificationsPage(currentPage);
