// Enhanced Portfolio JavaScript with Teal-Coral Theme
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');

    // Toggle mobile menu
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Enhanced Typing Animation with Updated Roles
    const typingText = document.querySelector('.typing-text');
    const titles = [
        'AI Engineer',
        'Data Analyst', 
        'Business Analyst',
        'Full-Stack Developer'
    ];
    
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 120;

    function typeWriter() {
        const currentTitle = titles[titleIndex];
        
        if (isDeleting) {
            typingText.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 60;
        } else {
            typingText.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 120;
        }

        if (!isDeleting && charIndex === currentTitle.length) {
            setTimeout(() => {
                isDeleting = true;
            }, 2500);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
        }

        setTimeout(typeWriter, typingSpeed);
    }

    typeWriter();

    // Enhanced Particle Animation
    function createParticles() {
        const particlesContainer = document.getElementById('particles');
        const particleCount = 60;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            const size = Math.random() * 6 + 2;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 8 + 's';
            particle.style.animationDuration = (Math.random() * 4 + 6) + 's';
            
            // Add some variety to particle colors
            const opacity = Math.random() * 0.3 + 0.1;
            particle.style.background = `rgba(255, 111, 97, ${opacity})`;
            
            particlesContainer.appendChild(particle);
        }
    }

    createParticles();

    // Smooth Scrolling for Navigation Links with Offset
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active Navigation Link Highlighting
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const scrollPos = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Enhanced Skill Bar Animation with Proper Percentages
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        const skillsSection = document.getElementById('skills');
        
        if (!skillsSection) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    skillBars.forEach((bar, index) => {
                        const percentage = bar.getAttribute('data-width');
                        if (percentage && bar.style.width === '0%') {
                            // Add staggered animation delay
                            setTimeout(() => {
                                bar.style.width = percentage + '%';
                                
                                // Add counter animation
                                const percentageElement = bar.parentElement.nextElementSibling;
                                if (percentageElement && percentageElement.classList.contains('skill-percentage')) {
                                    animateCounter(percentageElement, 0, parseInt(percentage), 2000);
                                }
                            }, index * 100);
                        }
                    });
                }
            });
        }, { 
            threshold: 0.3,
            rootMargin: '0px 0px -100px 0px'
        });

        observer.observe(skillsSection);
    }

    // Counter Animation for Skill Percentages
    function animateCounter(element, start, end, duration) {
        const startTime = performance.now();
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const current = Math.floor(start + (end - start) * progress);
            element.textContent = current + '%';
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = end + '%';
            }
        }
        
        requestAnimationFrame(updateCounter);
    }

    // Scroll Animations with Enhanced Performance
    function animateOnScroll() {
        const elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        elements.forEach(element => {
            observer.observe(element);
        });
    }

    // Navbar Background on Scroll with Enhanced Effect
    function updateNavbarBackground() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // Add animation classes to elements
    function addAnimationClasses() {
        // Add fade-in to stat cards
        document.querySelectorAll('.stat-card').forEach(card => {
            card.classList.add('fade-in');
        });

        // Add slide animations to project cards alternating
        document.querySelectorAll('.project-card').forEach((card, index) => {
            if (index % 2 === 0) {
                card.classList.add('slide-in-left');
            } else {
                card.classList.add('slide-in-right');
            }
        });

        // Add fade-in to skill categories
        document.querySelectorAll('.skill-category').forEach(category => {
            category.classList.add('fade-in');
        });

        // Add fade-in to education and hobby items
        document.querySelectorAll('.education-item, .hobby-item, .certification-item').forEach(item => {
            item.classList.add('fade-in');
        });
    }

    addAnimationClasses();

    // Enhanced Contact Form Handling
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');

        // Create enhanced mailto link
        const mailtoLink = `mailto:ubaithsherif22@gmail.com?subject=${encodeURIComponent(`Portfolio Contact: ${subject}`)}&body=${encodeURIComponent(`From: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\n---\nSent from Ubaith Sherif's Portfolio Website`)}`;
        
        // Open email client
        window.open(mailtoLink);
        
        // Enhanced success feedback
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        const originalBackground = submitButton.style.background;
        
        submitButton.textContent = '✓ Message Sent!';
        submitButton.style.background = 'linear-gradient(135deg, #00D4AA, #00B38F)';
        submitButton.style.transform = 'scale(1.05)';
        
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.style.background = originalBackground;
            submitButton.style.transform = 'scale(1)';
            this.reset();
        }, 3500);
    });

    // Copy Email Functionality
    window.copyEmail = function() {
        const email = 'ubaithsherif22@gmail.com';
        
        // Modern clipboard API
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(email).then(() => {
                showCopyFeedback();
            }).catch(() => {
                fallbackCopyTextToClipboard(email);
            });
        } else {
            fallbackCopyTextToClipboard(email);
        }
    };

    function fallbackCopyTextToClipboard(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            showCopyFeedback();
        } catch (err) {
            console.error('Fallback: Oops, unable to copy', err);
        }
        
        document.body.removeChild(textArea);
    }

    function showCopyFeedback() {
        const copyBtn = document.getElementById('copy-email');
        const originalText = copyBtn.textContent;
        
        copyBtn.textContent = '✓ Copied!';
        copyBtn.style.background = '#00D4AA';
        copyBtn.style.color = '#FFFFFF';
        copyBtn.style.transform = 'scale(1.1)';
        
        setTimeout(() => {
            copyBtn.textContent = originalText;
            copyBtn.style.background = '';
            copyBtn.style.color = '';
            copyBtn.style.transform = 'scale(1)';
        }, 2500);
    }

    // Enhanced Download Resume Functionality
    const downloadCvButton = document.getElementById('download-cv');
    downloadCvButton.addEventListener('click', function() {
        // Enhanced resume content with all projects and details
        const resumeContent = `
UBAITH SHERIF
AI Engineer | Data Analyst | Business Analyst
Coimbatore, Tamil Nadu

CONTACT INFORMATION
Email: ubaithsherif22@gmail.com
Phone: +91-63859 46906
LinkedIn: linkedin.com/in/ubaith-sherif-4235a5256
GitHub: github.com/ubaith444
Location: Coimbatore, Tamil Nadu

PROFESSIONAL SUMMARY
AI Engineer and Data Analyst with 2+ years of experience in machine learning, deep learning, and data analytics. 
Specialized in developing intelligent solutions through data-driven insights. Proven track record in building 
AI-powered applications, conducting comprehensive data analysis, and implementing business intelligence 
solutions. Currently pursuing B.Tech in AI & Data Science with strong foundation in Python, TensorFlow, 
and statistical analysis.

EDUCATION
Bachelor of Technology - Artificial Intelligence and Data Science
United Institute of Technology (2022-2026)
CGPA: 7.8

Higher Secondary Certificate (HSC)
Mahajana Higher Secondary School (2020-2022)

Secondary School Leaving Certificate (SSLC)
Mahajana Higher Secondary School (2020)

PROFESSIONAL EXPERIENCE
Artificial Intelligence Intern
Web Epic Technologies Private Limited, Coimbatore
June 2025 – July 2025
• Completed intensive 30-day internship focused on AI concepts and real-world applications
• Developed machine learning models for practical business solutions
• Worked on deep learning projects using TensorFlow and Keras
• Implemented NLP solutions using Hugging Face transformers
• Collaborated with cross-functional teams on AI-driven solutions
• Gained hands-on experience with modern AI tools and deployment techniques

FEATURED PROJECTS

1. Fake News Detection using Machine Learning (July 2025)
   Technologies: Python, NLP, Scikit-learn, TF-IDF, Logistic Regression, SVM, Naive Bayes
   • Developed supervised learning model to classify news articles as FAKE or REAL
   • Achieved 95.1% accuracy with Logistic Regression, 94.5% with SVM, 92.4% with Naive Bayes
   • Implemented TF-IDF vectorization for feature extraction
   • Created complete ML pipeline with comprehensive evaluation metrics
   GitHub: github.com/ubaith444/Fake-News-Detection-using-Machine-Learning

2. AI-Powered Blood Donation & Emergency Help System (DonarBots) (January 2025)
   Technologies: React Native, JavaScript, AI Algorithms, Python
   • Built comprehensive mobile and web application for blood donation services
   • Implemented smart donor-recipient matching algorithms
   • Developed blood stock prediction using machine learning
   • Integrated fraud detection mechanisms and emergency prioritization
   • Created real-time notifications and location-based search features
   GitHub: github.com/ubaith444/Autobots_AB2_07

3. ASL Recognition using Deep Learning (June-July 2025)
   Technologies: Python, TensorFlow, Keras, OpenCV, CNN
   • Designed CNN architecture for American Sign Language gesture recognition
   • Implemented real-time recognition across 24 ASL classes
   • Applied computer vision preprocessing and data augmentation techniques
   • Developed accessibility solutions for speech/hearing-impaired communities

4. Cartify AI – Sentiment Analysis System (July 2025)
   Technologies: Python, Hugging Face, RoBERTa, NLP, MongoDB, Flask
   • Built AI-powered system for sentiment analysis and language detection
   • Implemented RoBERTa model for advanced sentiment classification
   • Developed multilingual review processing capabilities
   • Generated actionable business insights from customer feedback

5. Real-Time Tweet Scraper & Sentiment Analysis (July 2025)
   Technologies: Python, Twitter API, Jupyter Notebook
   • Created real-time social media sentiment analysis system
   • Implemented live Twitter data scraping using API
   • Developed sentiment classification for social media trends
   GitHub: github.com/ubaith444/real-time-tweet-scraper-project-using-API

6. Retail Sales EDA & Forecasting (July 2025)
   Technologies: Python, Pandas, NumPy, Matplotlib, Seaborn
   • Conducted comprehensive retail sales analysis with EDA
   • Created interactive data visualizations and statistical insights
   • Implemented predictive modeling for sales forecasting
   GitHub: github.com/ubaith444/Retail-Sales-EDA

7. Customer Segmentation for Targeted Marketing (July 2025)
   Technologies: Python, K-Means Clustering, PCA, Scikit-learn
   • Applied unsupervised ML for customer segmentation
   • Used elbow method for optimal cluster selection
   • Implemented PCA for dimensionality reduction and visualization
   • Provided marketing strategy recommendations based on segments
   GitHub: github.com/ubaith444/Customer-Segmentation-for-Targeted-Marketing

8. Quantium Data Analytics Case Study (June 2025)
   Technologies: Python, Data Analytics, Statistical Analysis, Business Intelligence
   • Conducted end-to-end analytics on customer purchasing behavior
   • Performed chips category market research and retail store trial evaluation
   • Applied statistical modeling for business recommendations
   GitHub: github.com/ubaith444/Quantium-Data-Analytics

TECHNICAL SKILLS

AI & Machine Learning (90%):
Python, TensorFlow, Scikit-learn, Predictive Modeling, Neural Networks, Model Evaluation

Deep Learning & NLP (85%):
Keras, Hugging Face Transformers, RoBERTa, Computer Vision, OpenCV, TF-IDF

Data Analytics & Visualization (90%):
Pandas, NumPy, Matplotlib, Seaborn, Power BI, Statistical Analysis, EDA

Machine Learning Techniques (88%):
K-Means Clustering, PCA, Logistic Regression, SVM, Naive Bayes, Feature Engineering

Web Development (75%):
React Native, JavaScript, Flask, MongoDB, Git, GitHub, HTML/CSS

Tools & Platforms (80%):
Jupyter Notebook, Git/GitHub, Docker, AWS Basics, API Development

CERTIFICATIONS
• IBM SkillsBuild Data Analytics Certificate
• WordPress Development (Coursera)
• Data Science Foundation (Great Learning)
• Data Science Job Simulation (June 2025)

LANGUAGES
Tamil (Native), English (Fluent), Malayalam (Conversational)

HOBBIES & INTERESTS
• Data Science & AI Research - Exploring latest trends in AI and machine learning
• Open Source Contributing - Active GitHub contributor with 8+ public repositories
• Tech Blogging & Writing - Writing about AI, ML, and data science topics
• Machine Learning Competitions - Participating in ML challenges and hackathons
• Football & Sports Analytics - Analyzing sports data and player statistics
• Reading Tech Articles & Papers - Staying updated with technology trends

ACHIEVEMENTS & METRICS
• 8+ completed projects with real-world applications
• 95.1% accuracy achieved in Fake News Detection project
• 25+ technical skills across AI, ML, and web development
• 4+ professional certifications in data science and analytics
• 2+ years of hands-on experience in AI and data analytics

---
Generated from Ubaith Sherif's Portfolio Website
        `;

        // Create and download file
        const blob = new Blob([resumeContent], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Ubaith_Sherif_Resume_2025.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);

        // Enhanced download feedback
        const originalText = this.textContent;
        const originalBackground = this.style.background;
        
        this.textContent = '✓ Downloaded!';
        this.style.background = 'linear-gradient(135deg, #00D4AA, #00B38F)';
        this.style.transform = 'scale(1.05)';
        
        setTimeout(() => {
            this.textContent = originalText;
            this.style.background = originalBackground;
            this.style.transform = 'scale(1)';
        }, 3000);
    });

    // Enhanced Scroll Event Listeners with Throttling
    let ticking = false;
    
    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateActiveNavLink();
                updateNavbarBackground();
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll);

    // Initialize functions
    animateOnScroll();
    animateSkillBars();
    updateNavbarBackground();

    // Enhanced Project Card Hover Effects
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Enhanced Button Glow Effects
    document.querySelectorAll('.btn--primary, .btn--outline').forEach(button => {
        button.addEventListener('mouseenter', function() {
            if (this.classList.contains('btn--primary')) {
                this.style.boxShadow = '0 10px 30px rgba(255, 111, 97, 0.6)';
                this.style.transform = 'translateY(-4px) scale(1.05)';
            } else {
                this.style.boxShadow = '0 8px 25px rgba(255, 111, 97, 0.4)';
                this.style.transform = 'translateY(-3px) scale(1.02)';
            }
        });

        button.addEventListener('mouseleave', function() {
            if (this.classList.contains('btn--primary')) {
                this.style.boxShadow = '0 6px 20px rgba(255, 111, 97, 0.4)';
                this.style.transform = 'translateY(0) scale(1)';
            } else {
                this.style.boxShadow = '';
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });

    // Page Loading Animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.8s ease';
    
    window.addEventListener('load', function() {
        document.body.style.opacity = '1';
    });

    // Enhanced Parallax Effect for Hero Section
    let heroContent = document.querySelector('.hero-content');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.2;
        
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${rate}px)`;
        }
    });

    // Smooth Hover Effects for Stat Cards
    document.querySelectorAll('.stat-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Enhanced Ripple Effect for Interactive Elements
    function createRipple(event) {
        const button = event.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.4);
            transform: scale(0);
            animation: ripple 0.8s ease-out;
            pointer-events: none;
            z-index: 10;
        `;

        // Ensure button has relative positioning
        if (getComputedStyle(button).position !== 'relative') {
            button.style.position = 'relative';
        }
        button.style.overflow = 'hidden';
        
        button.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 800);
    }

    // Apply ripple effect to buttons
    document.querySelectorAll('.btn, .project-link').forEach(button => {
        button.addEventListener('click', createRipple);
    });

    // Add ripple animation keyframes if not exists
    if (!document.getElementById('ripple-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-style';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2.5);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Initialize skill bar widths to 0 for animation
    document.querySelectorAll('.skill-progress').forEach(bar => {
        bar.style.width = '0%';
    });

    console.log('🎉 Enhanced Portfolio loaded successfully with teal-coral theme!');
    console.log('🚀 Features: Working skill bars, enhanced animations, copy email, and more!');
});