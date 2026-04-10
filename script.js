// Celestial Insights - Professional Astrology Website
// JavaScript for interactive features

document.addEventListener('DOMContentLoaded', function() {
    // ========== Mobile Menu Toggle ==========
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close menu when clicking on a nav link
        const navLinkElements = document.querySelectorAll('.nav-link');
        navLinkElements.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                menuToggle.querySelector('i').classList.remove('fa-times');
                menuToggle.querySelector('i').classList.add('fa-bars');
            });
        });
    }
    
    // ========== Smooth Scrolling for Navigation Links ==========
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ========== Create Twinkling Stars in Hero Section ==========
    function createStars() {
        const starsContainer = document.getElementById('stars');
        if (!starsContainer) return;
        
        // Clear any existing stars
        starsContainer.innerHTML = '';
        
        // Create 100 stars
        for (let i = 0; i < 100; i++) {
            const star = document.createElement('div');
            star.classList.add('star');
            
            // Random position
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            
            // Random size (1-3px)
            const size = Math.random() * 2 + 1;
            
            // Random opacity and animation delay
            const opacity = Math.random() * 0.7 + 0.3;
            const delay = Math.random() * 5;
            
            // Apply styles
            star.style.left = `${x}%`;
            star.style.top = `${y}%`;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.opacity = opacity;
            star.style.animationDelay = `${delay}s`;
            
            starsContainer.appendChild(star);
        }
    }
    
    // Initialize stars
    createStars();
    
    // ========== Testimonials Slider ==========
    const testimonials = [
        {
            text: "Divya's birth chart analysis was incredibly accurate and insightful. She helped me understand aspects of my personality I've struggled with for years. Her guidance has been transformative.",
            name: "Jessica M.",
            role: "Marketing Director"
        },
        {
            text: "The yearly forecast gave me clarity on career opportunities I hadn't considered. Divya's reading was not only accurate but also practical. I've recommended her to all my friends.",
            name: "Michael T.",
            role: "Software Engineer"
        },
        {
            text: "Our compatibility reading helped my partner and I understand our relationship dynamics better. Divya has a gift for explaining complex astrological concepts in simple terms.",
            name: "Sarah & David L.",
            role: "Couple"
        },
        {
            text: "The birth chart analysis provided profound insights into my career path. Divya's guidance helped me make a confident career transition that has been incredibly fulfilling.",
            name: "Robert K.",
            role: "Teacher"
        },
        {
            text: "Divya's astrological insights have been incredibly valuable. Her predictions have helped me time important decisions in both my personal and professional life.",
            name: "Amanda P.",
            role: "Entrepreneur"
        }
    ];
    
    function initializeTestimonialSlider() {
        const sliderContainer = document.getElementById('testimonialSlider');
        const sliderDots = document.getElementById('sliderDots');
        const prevBtn = document.getElementById('prevTestimonial');
        const nextBtn = document.getElementById('nextTestimonial');
        
        if (!sliderContainer || !sliderDots) return;
        
        // Clear existing content
        sliderContainer.innerHTML = '';
        sliderDots.innerHTML = '';
        
        let currentSlide = 0;
        
        // Create testimonial slides
        testimonials.forEach((testimonial, index) => {
            // Create slide
            const slide = document.createElement('div');
            slide.classList.add('testimonial');
            if (index === 0) slide.classList.add('active');
            
            // Generate random avatar color
            const colors = ['#6a11cb', '#d4af37', '#1a1f4b', '#8a2be2', '#0a0e2a'];
            const color = colors[index % colors.length];
            
            slide.innerHTML = `
                <div class="testimonial-text">${testimonial.text}</div>
                <div class="testimonial-author">
                    <div class="author-avatar" style="background-color: ${color};">
                        ${testimonial.name.charAt(0)}
                    </div>
                    <div class="author-info">
                        <h4>${testimonial.name}</h4>
                        <p>${testimonial.role}</p>
                    </div>
                </div>
            `;
            
            sliderContainer.appendChild(slide);
            
            // Create dot
            const dot = document.createElement('div');
            dot.classList.add('slider-dot');
            if (index === 0) dot.classList.add('active');
            dot.dataset.index = index;
            
            dot.addEventListener('click', function() {
                goToSlide(parseInt(this.dataset.index));
            });
            
            sliderDots.appendChild(dot);
        });
        
        // Function to go to specific slide
        function goToSlide(index) {
            const slides = document.querySelectorAll('.testimonial');
            const dots = document.querySelectorAll('.slider-dot');
            
            // Remove active class from all slides and dots
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            // Add active class to current slide and dot
            slides[index].classList.add('active');
            dots[index].classList.add('active');
            
            currentSlide = index;
        }
        
        // Next slide function
        function nextSlide() {
            currentSlide = (currentSlide + 1) % testimonials.length;
            goToSlide(currentSlide);
        }
        
        // Previous slide function
        function prevSlide() {
            currentSlide = (currentSlide - 1 + testimonials.length) % testimonials.length;
            goToSlide(currentSlide);
        }
        
        // Add event listeners to buttons
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        
        // Auto-advance slides every 5 seconds
        setInterval(nextSlide, 5000);
    }
    
    // Initialize testimonial slider
    initializeTestimonialSlider();
    
    // ========== Navbar Background on Scroll ==========
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(10, 14, 42, 0.98)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.backgroundColor = 'rgba(10, 14, 42, 0.95)';
            navbar.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.15)';
        }
    });
    
    // ========== Current Date Display ==========
    function updateCurrentDate() {
        const dateElements = document.querySelectorAll('.current-date');
        if (dateElements.length > 0) {
            const now = new Date();
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            const formattedDate = now.toLocaleDateString('en-US', options);
            
            dateElements.forEach(element => {
                element.textContent = formattedDate;
            });
        }
    }
    
    updateCurrentDate();
    
    // ========== Add subtle animation to service cards on scroll ==========
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
    
    // Observe about section
    const aboutContent = document.querySelector('.about-content');
    if (aboutContent) {
        aboutContent.style.opacity = '0';
        aboutContent.style.transform = 'translateY(20px)';
        aboutContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(aboutContent);
    }
    
    // ========== Initialize everything ==========
    console.log('Celestial Insights website initialized successfully!');
});