  // Create floating particles
    function createParticles() {
      const particlesContainer = document.getElementById('particles');
      for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.width = Math.random() * 10 + 5 + 'px';
        particle.style.height = particle.style.width;
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 4) + 's';
        particlesContainer.appendChild(particle);
      }
    }

    // Page navigation
    function showPage(pageId) {
      // Hide all pages
      document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
      });
      
      // Remove active class from all nav links
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
      });
      
      // Show selected page
      document.getElementById(pageId).classList.add('active');
      
      // Add active class to clicked nav link
      event.target.classList.add('active');
      
      // Close mobile menu if open
      closeMobileMenu();
      
      // Scroll to top
      window.scrollTo(0, 0);
    }

    // Mobile menu toggle
    function toggleMobileMenu() {
      const nav = document.querySelector('.main-nav');
      const toggle = document.querySelector('.mobile-menu-toggle');
      
      nav.classList.toggle('active');
      toggle.classList.toggle('active');
    }

    function closeMobileMenu() {
      const nav = document.querySelector('.main-nav');
      const toggle = document.querySelector('.mobile-menu-toggle');
      
      nav.classList.remove('active');
      toggle.classList.remove('active');
    }

    // Enhanced greeting with real-time updates
    function updateGreeting() {
      const now = new Date();
      const hours = now.getHours();
      let greeting, emoji;

      if (hours < 12) {
        greeting = "Good Morning";
        emoji = "🌞";
      } else if (hours < 17) {
        greeting = "Good Afternoon";
        emoji = "🌤️";
      } else {
        greeting = "Good Evening";
        emoji = "🌙";
      }

      const timeString = now.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
      });

      const greetingElement = document.getElementById("clock-greeting");
      if (greetingElement) {
        greetingElement.innerHTML = `
          <h3>${emoji} ${greeting}</h3>
          <div class="time-display">${timeString}</div>
          <p>Take a moment to breathe and center yourself</p>
        `;
      }
    }

    // Enhanced quotes with more variety
    const quotes = [
      "You are enough just as you are.",
      "Peace begins with a deep breath.",
      "Healing is not linear, but it's worth it.",
      "Let today be a fresh start.",
      "Inhale confidence, exhale doubt.",
      "This too shall pass.",
      "Your mental health is a priority, not a luxury.",
      "Progress, not perfection.",
      "You have survived 100% of your worst days.",
      "Mindfulness is about being fully awake in our lives.",
      "Self-care is not selfish, it's essential.",
      "Every breath is a chance to reset."
    ];

    function showQuoteOfTheDay() {
      const index = new Date().getDate() % quotes.length;
      const quoteElement = document.getElementById("quote-of-the-day");
      if (quoteElement) {
        quoteElement.innerHTML = `
          <h3>💭 Quote of the Day</h3>
          <blockquote style="font-size: 1.2em; font-style: italic; margin: 20px 0; color: #667eea;">
            "${quotes[index]}"
          </blockquote>
          <p>Let this wisdom guide your day</p>
        `;
      }
    }

    // Enhanced affirmations with smooth transitions
    const affirmations = [
      "I am calm, centered, and in control of my emotions.",
      "I choose peace over perfection in all that I do.",
      "I am proud of how far I've come on my journey.",
      "I radiate positivity and attract good energy.",
      "My emotions are valid and deserve respect.",
      "I am worthy of love, happiness, and inner peace.",
      "I release what no longer serves my highest good.",
      "I trust in my ability to navigate life's challenges.",
      "I am resilient, strong, and capable of growth.",
      "I choose to focus on what I can control today.",
      "I am creating a life filled with joy and purpose.",
      "I honor my feelings without being controlled by them.",
      "I deserve compassion, especially from myself.",
      "Every day I am becoming more aligned with my true self.",
      "I have the power to create positive change in my life.",
      "I am grateful for my journey and excited for my future.",
      "I trust the process of my healing and growth.",
      "I am surrounded by love and support, even when I can't see it.",
      "My past does not define me; I am writing my future.",
      "I am learning to be patient and gentle with myself."
    ];

    function generateAffirmation() {
      const textElement = document.getElementById("affirmation-text");
      if (!textElement) return;
      
      const rand = Math.floor(Math.random() * affirmations.length);
      
      // Fade out
      textElement.style.opacity = '0';
      textElement.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        textElement.textContent = affirmations[rand];
        // Fade in
        textElement.style.opacity = '1';
        textElement.style.transform = 'translateY(0)';
      }, 250);
    }

    // Affirmation for affirmations page
    function generateAffirmationPage() {
      const textElement = document.getElementById("affirmation-text-page");
      if (!textElement) return;
      
      const rand = Math.floor(Math.random() * affirmations.length);
      
      // Fade out
      textElement.style.opacity = '0';
      textElement.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        textElement.textContent = affirmations[rand];
        // Fade in
        textElement.style.opacity = '1';
        textElement.style.transform = 'translateY(0)';
      }, 250);
    }

    // Breathing exercise
    let breathingTimer = null;
    let breathingTimeLeft = 0;

    function startBreathingExercise() {
      breathingTimeLeft = 300; // 5 minutes in seconds
      const timerElement = document.getElementById('breathing-timer');
      
      if (breathingTimer) {
        clearInterval(breathingTimer);
      }
      
      breathingTimer = setInterval(() => {
        breathingTimeLeft--;
        const minutes = Math.floor(breathingTimeLeft / 60);
        const seconds = breathingTimeLeft % 60;
        timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')} remaining`;
        
        if (breathingTimeLeft <= 0) {
          clearInterval(breathingTimer);
          timerElement.textContent = "Great job! You completed your breathing session. 🌟";
        }
      }, 1000);
      
      timerElement.textContent = "5:00 remaining";
    }

    // Contact form submission with Firebase Firestore
    async function submitContactForm(event) {
      event.preventDefault();
      
      // Get form data
      const formData = new FormData(event.target);
      const data = Object.fromEntries(formData);
      
      // Add timestamp
      data.timestamp = new Date();
      data.status = 'new';
      
      const submitButton = event.target.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      
      submitButton.textContent = 'Sending...';
      submitButton.disabled = true;
      
      try {
        // Save to Firestore
        const docRef = await addDoc(collection(window.db, 'contacts'), data);
        console.log('Document written with ID: ', docRef.id);
        
        alert(`Thank you, ${data.name}! Your message has been received. We'll get back to you within 24 hours at ${data.email}.`);
        event.target.reset();
        
      } catch (error) {
        console.error('Error adding document: ', error);
        alert('Sorry, there was an error sending your message. Please try again or contact us directly.');
      } finally {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
      }
    }

    // Initialize everything
    window.onload = () => {
      createParticles();
      updateGreeting();
      showQuoteOfTheDay();
      
      // Update time every second
      setInterval(updateGreeting, 1000);
      
      // Update quote daily
      setInterval(showQuoteOfTheDay, 24 * 60 * 60 * 1000);
    };

    // Add click animations to cards
    document.addEventListener('DOMContentLoaded', () => {
      document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', () => {
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.transform = '';
          }, 150);
        });
      });
    });