// ── Data ─────────────────────────────────────────────────────────────────────
// Sample seed jobs. In production, these would come from a backend API or
// localStorage / Firebase. We also load any user-saved jobs from localStorage.

const NOW = new Date();

const SEED_JOBS = [
  {
    id: 1,
    title: "Accounts Executive",
    company: "Laxmi Traders",
    type: "Full-time",
    loc: "Ameerpet",
    salary: "₹22,000",
    desc: "Manage daily accounts, GST filing, and vendor payments. Tally knowledge required. 1+ year experience preferred.",
    contact: "9876500001",
    date: new Date(NOW - 2 * 86400000).toISOString()
  },
  {
    id: 2,
    title: "Delivery Rider",
    company: "QuickEats",
    type: "Part-time",
    loc: "Kukatpally",
    salary: "₹15,000",
    desc: "Deliver food orders across Kukatpally and KPHB. Own bike mandatory. Flexible shifts available.",
    contact: "9876500002",
    date: new Date(NOW - 1 * 86400000).toISOString()
  },
  {
    id: 3,
    title: "Receptionist",
    company: "Sunrise Clinic",
    type: "Full-time",
    loc: "Miyapur",
    salary: "₹18,000",
    desc: "Handle front desk, patient appointments, and billing. Fluency in Telugu and Hindi required.",
    contact: "9876500003",
    date: new Date(NOW - 4 * 86400000).toISOString()
  },
  {
    id: 4,
    title: "React Developer",
    company: "TechMindz Solutions",
    type: "Contract",
    loc: "Madhapur",
    salary: "₹60,000",
    desc: "Build responsive web apps using React and Tailwind. 2+ years experience. Remote-friendly with weekly check-ins.",
    contact: "9876500004",
    date: new Date().toISOString()
  },
  {
    id: 5,
    title: "Telecaller",
    company: "VisionEdge BPO",
    type: "Full-time",
    loc: "SR Nagar",
    salary: "₹14,000",
    desc: "Outbound sales calls for insurance products. Good communication skills. Freshers welcome.",
    contact: "9876500005",
    date: new Date(NOW - 3 * 86400000).toISOString()
  },
  {
    id: 6,
    title: "Machine Operator",
    company: "Srinivas Industries",
    type: "Full-time",
    loc: "Balanagar",
    salary: "₹20,000",
    desc: "Operate CNC machines for metal fabrication. ITI certification preferred. Day shift only.",
    contact: "9876500006",
    date: new Date(NOW - 5 * 86400000).toISOString()
  },
  {
    id: 7,
    title: "Graphic Design Intern",
    company: "Pixel Studio",
    type: "Internship",
    loc: "Banjara Hills",
    salary: "₹8,000",
    desc: "3-month internship. Work on branding, social media creatives, and video thumbnails. Adobe suite knowledge required.",
    contact: "9876500007",
    date: new Date().toISOString()
  }
];

// ── State ─────────────────────────────────────────────────────────────────────
// Load user-posted jobs from localStorage, merge with seed data
let savedJobs = [];
try {
  savedJobs = JSON.parse(localStorage.getItem("localjobs_jobs") || "[]");
} catch (e) {
  savedJobs = [];
}

// Combine seed + saved; saved jobs go first (most recent)
let jobs = [...savedJobs, ...SEED_JOBS];
let nextId = jobs.reduce((m, j) => Math.max(m, j.id), 0) + 1;

// ── Helpers ───────────────────────────────────────────────────────────────────
function isNew(dateStr) {
  return (Date.now() - new Date(dateStr).getTime()) < 1.5 * 86400000;
}

function allLocations() {
  return [...new Set(jobs.map(j => j.loc))].sort();
}

function saveTolocalStorage() {
  // Only save user-posted jobs (ids above seed range or not in SEED_JOBS)
  const seedIds = new Set(SEED_JOBS.map(j => j.id));
  const userJobs = jobs.filter(j => !seedIds.has(j.id));
  localStorage.setItem("localjobs_jobs", JSON.stringify(userJobs));
}

// ── Filter & Render ───────────────────────────────────────────────────────────
function getFiltered() {
  const q   = document.getElementById("search").value.toLowerCase().trim();
  const typ = document.getElementById("filter-type").value;
  const loc = document.getElementById("filter-loc").value;

  return jobs
    .filter(j =>
      (!q   || j.title.toLowerCase().includes(q) || j.company.toLowerCase().includes(q)) &&
      (!typ || j.type === typ) &&
      (!loc || j.loc  === loc)
    )
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

function updateLocDropdown() {
  const sel = document.getElementById("filter-loc");
  const cur = sel.value;
  const locs = allLocations();
  sel.innerHTML =
    '<option value="">All areas</option>' +
    locs.map(l => `<option${l === cur ? " selected" : ""}>${l}</option>`).join("");
}

function render() {
  updateLocDropdown();
  const list = getFiltered();

  // Update stats
  document.getElementById("stat-total").textContent = list.length;
  document.getElementById("stat-ft").textContent    = list.filter(j => j.type === "Full-time").length;
  document.getElementById("stat-loc").textContent   = new Set(list.map(j => j.loc)).size;

  // Render cards
  const el = document.getElementById("job-list");
  if (!list.length) {
    el.innerHTML = '<div class="empty">No jobs found. Try adjusting your search or filters.</div>';
    return;
  }

  el.innerHTML = list.map(j => `
    <div class="job-card" onclick="openModal(${j.id})">
      <div class="job-header">
        <div>
          <div class="job-title">${escHtml(j.title)}</div>
          <div class="job-company">${escHtml(j.company)}</div>
        </div>
        ${isNew(j.date) ? '<span class="badge badge-new">New</span>' : ""}
      </div>
      <div class="job-meta">
        <span class="badge badge-type">${escHtml(j.type)}</span>
        <span class="badge badge-loc">${escHtml(j.loc)}</span>
        <span class="badge badge-salary">${escHtml(j.salary)}/mo</span>
      </div>
      <div class="job-desc">${escHtml(j.desc)}</div>
    </div>
  `).join("");
}

// ── Modal ─────────────────────────────────────────────────────────────────────
function openModal(id) {
  const j = jobs.find(x => x.id === id);
  if (!j) return;

  document.getElementById("m-title").textContent   = j.title;
  document.getElementById("m-company").textContent = j.company;
  document.getElementById("m-meta").innerHTML = `
    <span class="badge badge-type">${escHtml(j.type)}</span>
    <span class="badge badge-loc">${escHtml(j.loc)}</span>
    <span class="badge badge-salary">${escHtml(j.salary)}/mo</span>
  `;
  document.getElementById("m-desc").textContent    = j.desc;
  document.getElementById("m-contact").textContent = j.contact;

  const waLink = `https://wa.me/91${j.contact}?text=${encodeURIComponent("Hi, I saw your job listing for " + j.title + " on LocalJobs. I'd like to apply.")}`;
  document.getElementById("m-apply").onclick = () => window.open(waLink, "_blank");

  document.getElementById("modal-bg").classList.add("open");
}

function closeModal(e) {
  if (!e || e.target === document.getElementById("modal-bg")) {
    document.getElementById("modal-bg").classList.remove("open");
  }
}

// Close modal on Escape key
document.addEventListener("keydown", e => {
  if (e.key === "Escape") document.getElementById("modal-bg").classList.remove("open");
});

// ── Tab Switching ─────────────────────────────────────────────────────────────
function switchTab(tab, btn) {
  document.querySelectorAll(".tab").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  document.getElementById("browse-view").style.display = tab === "browse" ? "block" : "none";
  document.getElementById("post-view").style.display   = tab === "post"   ? "block" : "none";
}

// ── Post a Job ────────────────────────────────────────────────────────────────
function postJob() {
  const title   = document.getElementById("f-title").value.trim();
  const company = document.getElementById("f-company").value.trim();
  const loc     = document.getElementById("f-loc").value.trim();
  const salary  = document.getElementById("f-salary").value.trim();
  const contact = document.getElementById("f-contact").value.trim();
  const desc    = document.getElementById("f-desc").value.trim();
  const type    = document.getElementById("f-type").value;

  if (!title || !company || !loc) {
    alert("Please fill in job title, company name, and area.");
    return;
  }

  const newJob = {
    id: nextId++,
    title,
    company,
    type,
    loc,
    salary: salary || "Negotiable",
    desc: desc || "No description provided.",
    contact: contact || "N/A",
    date: new Date().toISOString()
  };

  jobs.unshift(newJob);
  saveTolocalStorage();

  // Clear form
  ["f-title", "f-company", "f-loc", "f-salary", "f-contact", "f-desc"]
    .forEach(id => document.getElementById(id).value = "");

  // Show toast
  const toast = document.getElementById("toast");
  toast.style.display = "block";
  setTimeout(() => toast.style.display = "none", 2500);

  // Switch to browse tab
  const browsTab = document.querySelector(".tab");
  switchTab("browse", browsTab);
  render();
}

// ── XSS Safety ───────────────────────────────────────────────────────────────
function escHtml(str) {
  const d = document.createElement("div");
  d.appendChild(document.createTextNode(String(str)));
  return d.innerHTML;
}

// ── Init ──────────────────────────────────────────────────────────────────────
document.getElementById("date-out").textContent = NOW.toLocaleDateString("en-IN", {
  day: "numeric", month: "short", year: "numeric"
});

render();
