// DOM Elements
const menuToggle = document.getElementById('menuToggle');
const navbarLinks = document.getElementById('navbarLinks');
const currentYearEl = document.getElementById('currentYear');
const toast = document.getElementById('toast');

// Set current year in footer
currentYearEl.textContent = new Date().getFullYear();

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
const contactForm = document.getElementById("contact-form");

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

      const result = await response.json();

      if (result.success) {
        // Hide the form after successful submission
        contactForm.reset();
        contactForm.classList.add("hidden");

        // Create and show the Thank You message
        const thankYouMessage = document.createElement('div');
        thankYouMessage.classList.add('thank-you-message', 'text-center', 'p-4', 'bg-green-100', 'rounded-md', 'border', 'border-green-300', 'shadow-md');
        thankYouMessage.innerHTML = `
          <h3 class="font-bold text-xl">Thank You for Your Message!</h3>
          <p>We’ll get back to you soon.</p>
        `;
        document.body.appendChild(thankYouMessage);

        // Optionally, you can add an auto-close functionality for the Thank You message
        setTimeout(() => {
          thankYouMessage.remove();
        }, 5000);
      } else {
        throw new Error("Failed to send message");
      }
    } catch (err) {
      showToast("Error", "Failed to send your message. Please try again later.", true);
      console.error(err);
    } finally {
      submitButton.disabled = false;
      submitText.textContent = "Send Message";
    }
  });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
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
