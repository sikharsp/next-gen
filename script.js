// DOM Elements
const menuToggle = document.getElementById('menuToggle');
const navbarLinks = document.getElementById('navbarLinks');
const membersGrid = document.getElementById('membersGrid');
const currentYearEl = document.getElementById('currentYear');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');
const contactForm = document.getElementById("contact-form");
const successMessage = document.getElementById("success-message");


// Set current year in footer
currentYearEl.textContent = new Date().getFullYear();

// Hide success message on load (just in case)
if (successMessage) {
  successMessage.classList.add("show");
}

// Toggle mobile menu
if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navbarLinks.classList.toggle('active');
  });
}

// Close mobile menu when clicking a navigation link
document.querySelectorAll('.navbar-links a').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      menuToggle.classList.remove('active');
      navbarLinks.classList.remove('active');
    }
  });
});

// Show toast notification
function showToast(message, duration = 3000) {
  toastMessage.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, duration);
}

// Handle contact form submission using FormSubmit
if (contactForm) {
  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const submitButton = document.getElementById("submit-button");
    const submitText = document.getElementById("submit-text");
    submitButton.disabled = true;
    submitText.textContent = "Sending...";

    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      subject: document.getElementById("subject").value,
      message: document.getElementById("message").value,
      _honey: "",
      _captcha: "false"
    };

    try {
      const response = await fetch("https://formsubmit.co/ajax/psikhar74@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        contactForm.reset();
        contactForm.classList.add("hidden");
        successMessage.classList.remove("hidden"); // Show "Thank You"
      } else {
        throw new Error("Failed to send message");
      }
    } catch (err) {
      showToast("thankyou we will contact you as soon as");
      console.error(err);
    } finally {
      submitButton.disabled = false;
      submitText.textContent = "Send Message";
    }

  });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    if (this.getAttribute('href') === '#') return;

    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// Event buttons
document.querySelectorAll('.event-card .btn').forEach(button => {
  button.addEventListener('click', () => {
    showToast('Events glimpses are on facebook page!');
  });
});

document.querySelector('.view-all').addEventListener('click', () => {
  showToast('More events coming soon!');
});

// Navbar scroll effect
function handleScroll() {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 10) {
    navbar.style.boxShadow = 'var(--shadow-md)';
  } else {
    navbar.style.boxShadow = 'var(--shadow-sm)';
  }
}

window.addEventListener('scroll', handleScroll);
