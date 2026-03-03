/* ================= PAGINATION ================= */

const cards = document.querySelectorAll(".blog-card");
const paginationContainer = document.querySelector(".pagination");

const cardsPerPage = 6;
const totalCards = cards.length;
const totalPages = Math.ceil(totalCards / cardsPerPage);
let currentPage = 1;

function showPage(page) {
  currentPage = page;

  const start = (page - 1) * cardsPerPage;
  const end = start + cardsPerPage;

  cards.forEach((card, index) => {
    card.style.display = (index >= start && index < end) ? "block" : "none";
  });

  updatePagination();
}

function createPagination() {
  if (!paginationContainer) return;

  paginationContainer.innerHTML = "";
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.innerText = i;
    btn.addEventListener("click", () => showPage(i));
    paginationContainer.appendChild(btn);
  }
}

function updatePagination() {
  if (!paginationContainer) return;

  const buttons = paginationContainer.querySelectorAll("button");
  buttons.forEach(btn => btn.classList.remove("active"));
  if (buttons[currentPage - 1]) {
    buttons[currentPage - 1].classList.add("active");
  }
}

createPagination();
showPage(1);


/* ================= REDIRECT FUNCTION ================= */

function openBlogPage(id) {
  window.location.href = "blog-detail.html?id=" + id;
}


/* ================= BLOG DATA ================= */

const blogs = {
  1: {
    title: "HR Salary in India 2026",
    image: "https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=1200",
    body: `
<p><strong>Published:</strong> February 10, 2026<br>
<strong>Updated:</strong> December 20, 2026<br>
<strong>Read Time:</strong> 12 Minutes<br>
<strong>Author:</strong> MineHR Research Team</p>

<h3>Summary</h3>
<p>The HR salary landscape in India is evolving rapidly. With digital transformation, AI adoption, and growing competition for skilled professionals, HR compensation has seen structured growth across industries. This guide explores salary trends, role-based compensation, city-wise comparison, and future outlook.</p>

<h3>Introduction</h3>
<p>Human Resources is no longer just an administrative function. Modern HR teams drive talent strategy, culture building, compliance management, and workforce analytics. As responsibilities expand, so does compensation.</p>

<h3>Average HR Salaries in 2026</h3>
<ul>
<li>HR Executive: ₹3 – 6 LPA</li>
<li>HR Manager: ₹8 – 18 LPA</li>
<li>Talent Acquisition Lead: ₹10 – 22 LPA</li>
<li>HR Business Partner: ₹12 – 25 LPA</li>
<li>Chief HR Officer: ₹35+ LPA</li>
</ul>

<h3>Metro vs Tier-2 Cities</h3>
<p>Metro cities like Mumbai, Bangalore, and Delhi NCR offer 20–35% higher salaries compared to tier-2 cities due to cost of living and talent demand.</p>

<h3>High Paying HR Specializations</h3>
<ul>
<li>HR Analytics</li>
<li>Compensation & Benefits</li>
<li>Talent Strategy</li>
<li>Organizational Development</li>
<li>HR Technology & Systems</li>
</ul>

<h3>Impact of Digital HR</h3>
<p>Organizations adopting SaaS HR platforms are investing heavily in digital HR roles. Analytics-driven HR professionals command premium pay.</p>

<h3>Future Outlook</h3>
<p>With hybrid work models and global hiring trends, HR roles are expected to grow steadily. Professionals skilled in AI tools, workforce planning, and compliance management will see the highest salary growth.</p>

<h3>Conclusion</h3>
<p>HR compensation in India reflects the strategic importance of people management. As organizations continue prioritizing employee experience and digital transformation, HR salaries will remain competitive and growth-oriented.</p>
`
  },
  2: {
    title: "India’s Labour Codes 2025",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1200",
    body: `
<p><strong>Published:</strong> March 12, 2025<br>
<strong>Updated:</strong> January 5, 2026<br>
<strong>Read Time:</strong> 10 Minutes<br>
<strong>Author:</strong> MineHR Compliance Desk</p>

<h3>Summary</h3>
<p>India consolidated 29 labour laws into four major labour codes covering wages, social security, industrial relations, and occupational safety. Employers must restructure payroll systems and compliance reporting to align with the updated regulations.</p>

<h3>The Four Labour Codes</h3>
<ul>
<li>Code on Wages</li>
<li>Code on Social Security</li>
<li>Industrial Relations Code</li>
<li>Occupational Safety, Health & Working Conditions Code</li>
</ul>

<h3>Key Changes</h3>
<p>The definition of “wages” has been standardized, affecting provident fund, gratuity, and bonus calculations.</p>

<h3>Impact on Payroll</h3>
<p>Employers may need to restructure salary components to ensure compliance with the 50% wage rule.</p>

<h3>Employer Responsibilities</h3>
<ul>
<li>Maintain digital records</li>
<li>Update payroll software</li>
<li>Ensure statutory reporting</li>
<li>Comply with inspection frameworks</li>
</ul>

<h3>Why Compliance Matters</h3>
<p>Non-compliance may lead to financial penalties, reputational risk, and legal exposure. Automated payroll systems reduce compliance errors.</p>

<h3>Conclusion</h3>
<p>The new labour codes aim to simplify regulations while improving worker protection. Employers must proactively adapt systems and processes to remain compliant and competitive.</p>
`
  },
  3: {
    title: "Modern Hiring Strategies",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200",
    body: `<p>Data-driven recruitment methods improving hiring efficiency.</p>`
  },

  4: {
    title: "AI in HR Tools",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200",
    body: `<p>How AI automates HR operations and workforce analytics.</p>`
  },

  5: {
    title: "OKRs & Employee Growth",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200",
    body: `<p>Performance framework aligning goals and measurable results.</p>`
  },

  6: {
    title: "GPS Attendance Systems",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1200",
    body: `<p>Real-time workforce tracking solutions.</p>`
  },

  7: {
    title: "The Evolution of HRM",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200",
    body: `<p>Transformation of HR from payroll to strategy.</p>`
  },

  8: {
    title: "Payroll Compliance Checklist",
    image: "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?q=80&w=1200",
    body: `<p>Essential compliance steps for employers.</p>`
  },

  9: {
    title: "Boosting Employee Engagement",
    image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=1200",
    body: `<p>Retention and engagement strategies.</p>`
  },

  10: {
    title: "Interview Techniques 2026",
    image: "https://images.unsplash.com/photo-1551836022-4c4c79ecde51?q=80&w=1200",
    body: `<p>Structured hiring methods.</p>`
  },

  11: {
    title: "Digital HR Transformation",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200",
    body: `<p>Cloud-based HR systems.</p>`
  },

  12: {
    title: "Managing Remote Teams",
    image: "https://images.unsplash.com/photo-1521790797524-b2497295b8a0?q=80&w=1200",
    body: `<p>Best practices for remote work.</p>`
  },

  13: {
    title: "TDS & Tax Guide",
    image: "https://images.unsplash.com/photo-1554224154-22dec7ec8818?q=80&w=1200",
    body: `<p>Salary tax compliance explained.</p>`
  },

  14: {
    title: "Corporate Learning Systems",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200",
    body: `<p>LMS platforms for employee upskilling.</p>`
  },

  15: {
    title: "HR Analytics",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200",
    body: `<p>Data-driven HR insights.</p>`
  },

  16: {
    title: "Workplace Culture Trends",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200",
    body: `<p>Culture impact on performance.</p>`
  },

  17: {
    title: "Project Resource Planning",
    image: "https://images.unsplash.com/photo-1551836022-4c4c79ecde51?q=80&w=1200",
    body: `<p>Efficient team allocation.</p>`
  },

  18: {
    title: "Salary Structure Breakdown",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1200",
    body: `<p>CTC components explained.</p>`
  },

  19: {
    title: "Leadership Development",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200",
    body: `<p>Building future-ready leaders.</p>`
  },

  20: {
    title: "Mobile Attendance Apps",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1200",
    body: `<p>Flexible attendance tracking.</p>`
  },

  21: {
    title: "Employee Lifecycle",
    image: "https://images.unsplash.com/photo-1521790797524-b2497295b8a0?q=80&w=1200",
    body: `<p>Onboarding to exit management.</p>`
  },

  22: {
    title: "Offer Letter Best Practices",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200",
    body: `<p>Clear job offers.</p>`
  },

  23: {
    title: "Timesheet Automation",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200",
    body: `<p>Accurate time tracking.</p>`
  },

  24: {
    title: "People Analytics Trends",
    image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=1200",
    body: `<p>Predictive workforce insights.</p>`
  },

  25: {
    title: "Annual Payroll Audits",
    image: "https://images.unsplash.com/photo-1554224154-22dec7ec8818?q=80&w=1200",
    body: `<p>Audit compliance strategies.</p>`
  },

  26: {
    title: "Future of Work 2030",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200",
    body: `<p>Hybrid workforce trends.</p>`
  },

  27: {
    title: "Continuous Feedback Systems",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200",
    body: `<p>Real-time performance reviews.</p>`
  },

  28: {
    title: "Cloud HR Software",
    image: "https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=1200",
    body: `<p>SaaS HR platforms.</p>`
  },

  29: {
    title: "Recruitment Funnel Optimization",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200",
    body: `<p>Improve hiring efficiency.</p>`
  },

  30: {
    title: "Building High Performance Teams",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200",
    body: `<p>Growth and productivity strategies.</p>`
  }
};


/* ================= LOAD DETAIL PAGE ================= */

function loadBlogDetail() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (id && blogs[id]) {
    document.getElementById("detailImage").src = blogs[id].image;
    document.getElementById("detailTitle").innerText = blogs[id].title;
    document.getElementById("detailBody").innerHTML = blogs[id].body;
  }
}
/* ================= DEMO POPUP ================= */

document.addEventListener("DOMContentLoaded", function () {

  const openDemo = document.getElementById("openDemo");
  const closeDemo = document.getElementById("closeDemo");
  const demoModal = document.getElementById("demoModal");

  if (openDemo) {
    openDemo.addEventListener("click", function () {
      demoModal.style.display = "flex";
    });
  }

  if (closeDemo) {
    closeDemo.addEventListener("click", function () {
      demoModal.style.display = "none";
    });
  }

  window.addEventListener("click", function (e) {
    if (e.target.classList.contains("demo-overlay")) {
      demoModal.style.display = "none";
    }
  });

  const demoForm = document.querySelector('.demo-form');
  if (demoForm) {
    demoForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      const submitBtn = demoForm.querySelector('.submit-btn');
      const originalBtnText = submitBtn.innerText;
      submitBtn.innerText = 'Sending...';
      submitBtn.disabled = true;

      const formData = new FormData(demoForm);
      const data = {};
      formData.forEach((value, key) => { data[key] = value; });

      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        const result = await res.json();
        if (result.success) {
          alert('Demo request sent successfully!');
          demoForm.reset();
          demoModal.style.display = 'none';
        } else {
          alert('Error: ' + (result.error || 'Failed to send request'));
        }
      } catch (err) {
        alert('Error: Could not connect to server');
      } finally {
        submitBtn.innerText = originalBtnText;
        submitBtn.disabled = false;
      }
    });
  }
});
/* ================= SCROLL TO BLOGS ================= */

document.addEventListener("DOMContentLoaded", function () {

  const exploreBtn = document.getElementById("exploreBtn");
  const blogSection = document.getElementById("blogWrapper");

  if (exploreBtn) {
    exploreBtn.addEventListener("click", function () {
      blogSection.scrollIntoView({
        behavior: "smooth"
      });
    });
  }

});
exploreBtn.addEventListener("click", function () {
  const offset = 80; // adjust if needed
  const topPosition = blogSection.offsetTop - offset;

  window.scrollTo({
    top: topPosition,
    behavior: "smooth"
  });
});
