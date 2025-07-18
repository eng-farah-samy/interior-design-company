// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }
})

// Portfolio filter functionality
document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filter-btn")
  const portfolioItems = document.querySelectorAll(".portfolio-item")

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"))
      // Add active class to clicked button
      this.classList.add("active")

      const filterValue = this.getAttribute("data-filter")

      portfolioItems.forEach((item) => {
        if (filterValue === "all" || item.classList.contains(filterValue)) {
          item.style.display = "block"
          setTimeout(() => {
            item.style.opacity = "1"
            item.style.transform = "scale(1)"
          }, 100)
        } else {
          item.style.opacity = "0"
          item.style.transform = "scale(0.8)"
          setTimeout(() => {
            item.style.display = "none"
          }, 300)
        }
      })
    })
  })
})

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Contact form handling
document.querySelector(".contact-form").addEventListener("submit", function (e) {
  e.preventDefault()

  // Get form data
  const formData = new FormData(this)

  // Show loading state
  const submitBtn = this.querySelector('button[type="submit"]')
  const originalText = submitBtn.innerHTML
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...'
  submitBtn.disabled = true

  // Simulate form submission (replace with actual PHP handling)
  setTimeout(() => {
    alert("Thank you for your message! We will get back to you soon.")
    this.reset()
    submitBtn.innerHTML = originalText
    submitBtn.disabled = false
  }, 2000)
})

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in-up")
    }
  })
}, observerOptions)

// Observe elements for animation
document.querySelectorAll(".service-card, .portfolio-card, .feature-card").forEach((el) => {
  observer.observe(el)
})

// Gallery lightbox effect (simple implementation)
document.querySelectorAll(".gallery-item").forEach((item) => {
  item.addEventListener("click", function () {
    const img = this.querySelector("img")
    const modal = document.createElement("div")
    modal.className = "modal fade show"
    modal.style.display = "block"
    modal.style.backgroundColor = "rgba(0,0,0,0.8)"
    modal.innerHTML = `
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content bg-transparent border-0">
                    <div class="modal-body p-0">
                        <img src="${img.src}" class="img-fluid w-100" alt="${img.alt}">
                        <button type="button" class="btn-close btn-close-white position-absolute top-0 end-0 m-3" onclick="this.closest('.modal').remove()"></button>
                    </div>
                </div>
            </div>
        `
    document.body.appendChild(modal)

    // Close modal when clicking outside
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.remove()
      }
    })
  })
})

// Counter animation
function animateCounters() {
  const counters = document.querySelectorAll(".hero-content h3")
  counters.forEach((counter) => {
    const target = Number.parseInt(counter.textContent)
    const increment = target / 100
    let current = 0

    const updateCounter = () => {
      if (current < target) {
        current += increment
        counter.textContent = Math.ceil(current) + (counter.textContent.includes("+") ? "+" : "%")
        requestAnimationFrame(updateCounter)
      } else {
        counter.textContent = target + (counter.textContent.includes("+") ? "+" : "%")
      }
    }

    updateCounter()
  })
}

// Trigger counter animation when hero section is visible
const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animateCounters()
      heroObserver.unobserve(entry.target)
    }
  })
})

const heroSection = document.querySelector(".hero-section")
if (heroSection) {
  heroObserver.observe(heroSection)
}
