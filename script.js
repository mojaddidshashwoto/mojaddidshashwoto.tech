/**
 * Neo-Brutalist Portfolio - Interaction Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Preloader & Logo Animation Sequence ---
    const preloader = document.getElementById('preloader');
    const animatedLogo = document.getElementById('animated-logo');
    const targetLogo = document.getElementById('header-logo-target');
    const header = document.getElementById('header');
    const mainContent = document.getElementById('main-content');
    const body = document.body;

    // Start Intro Sequence
    setTimeout(() => {
        // Step 1: Fade in and scale down slightly
        animatedLogo.style.transition = 'opacity 1s ease, transform 1s cubic-bezier(0.19, 1, 0.22, 1)';
        animatedLogo.style.opacity = '1';
        animatedLogo.style.transform = 'scale(1)';

        setTimeout(() => {
            // Step 2: Fade Out Logo
            animatedLogo.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            animatedLogo.style.opacity = '0';
            animatedLogo.style.transform = 'scale(0.9)';
            
            setTimeout(() => {
                // Step 3: Fade in main site elements and rise up
                targetLogo.style.opacity = '1';
                header.classList.add('visible');
                mainContent.classList.add('visible');
                preloader.classList.add('fade-bg');
                body.classList.remove('no-scroll');

                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 1000);
            }, 600); // Wait for logo to fade out
        }, 1500); // Hold time for reading the logo in the center
    }, 100);


    // --- 2. IntersectionObserver (Scroll Reveals) ---
    const revealElements = document.querySelectorAll('.reveal');
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px"
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Trigger only once
            }
        });
    }, revealOptions);

    revealElements.forEach(el => scrollObserver.observe(el));


    // --- 3. Magnetic Button Hover Effect ---
    const magneticElements = document.querySelectorAll('.magnetic');

    magneticElements.forEach(elem => {
        elem.addEventListener('mousemove', (e) => {
            const rect = elem.getBoundingClientRect();
            // Calculate distance from center of element
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            // Apply magnetic pull (0.3 intensity multiplier)
            elem.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        elem.addEventListener('mouseleave', () => {
            // Snap back smoothly
            elem.style.transform = `translate(0px, 0px)`;
            elem.style.transition = `transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)`;
        });

        elem.addEventListener('mouseenter', () => {
            // Remove transition for instant drag tracking
            elem.style.transition = `none`;
        });
    });


    // --- 4. Subtle Parallax on Case Study Titles ---
    const parallaxTitles = document.querySelectorAll('.parallax-title');
    let isTicking = false;
    
    window.addEventListener('scroll', () => {
        // Run only on larger screens to preserve mobile performance
        if (window.innerWidth > 768) {
            if (!isTicking) {
                window.requestAnimationFrame(() => {
                    parallaxTitles.forEach(title => {
                        const speed = 0.08;
                        // Calculate position relative to viewport
                        const rect = title.getBoundingClientRect();
                        const yPos = (window.innerHeight - rect.top) * speed;
                        
                        // Clamp the transform to keep it subtle
                        if (rect.top < window.innerHeight && rect.bottom > 0) {
                            title.style.transform = `translateY(${-yPos}px)`;
                        }
                    });
                    isTicking = false;
                });
                isTicking = true;
            }
        }
    }, { passive: true }); // passive flag optimizes scroll performance


    // --- 5. Mobile Navigation Toggle ---
    const hamburger = document.querySelector('.header__hamburger');
    const navList = document.querySelector('.header__nav-list');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navList.classList.toggle('nav-open');
            
            // Prevent scrolling when menu is open
            if (navList.classList.contains('nav-open')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });

        // Close menu on link click
        document.querySelectorAll('.header__nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navList.classList.remove('nav-open');
                body.style.overflow = '';
            });
        });
    }

    // --- 6. Deep-Dive Modal Logic ---
    const caseStudiesData = [
        {
            title: "AuraWealth: AI-Driven Portfolio",
            hero: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
            challenge: "Retail investors lack access to predictive, institution-grade asset management models within a unified, intuitive interface.",
            solution: "Architected a high-fidelity dark-mode dashboard that integrates the Gemini Pro API. The system processes real-time market sentiment to deliver personalized, actionable investment strategies.",
            deliverables: ["Figma Interactive Prototypes", "API Integration Architecture", "User Journey Modeling"],
            tech: ["Gemini Pro API", "Next.js Framework", "Supabase PostgreSQL"]
        },
        {
            title: "NexusFlow: B2B Enterprise ERP",
            hero: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?auto=format&fit=crop&w=1200&q=80",
            challenge: "A mid-sized logistics firm was losing hundreds of hours a week due to fragmented software and high-friction data entry workflows.",
            solution: "Developed comprehensive user journey maps and an interactive Figma prototype for a centralized ERP system, reducing expected onboarding time by 40%.",
            deliverables: ["Wireframing & UI/UX Design", "Process Optimization", "Go-To-Market Strategy"],
            tech: ["Figma", "Notion (Doc Structuring)", "Vercel Deployment Plan"]
        },
        {
            title: "OmniMarket: Global Expansion",
            hero: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&q=80",
            challenge: "An e-commerce aggregator needed to determine the commercial viability of expanding into three new emerging markets simultaneously.",
            solution: "Conducted rigorous competitive benchmarking and modeled financial viability scenarios. Built a scaffolding backend on Supabase to simulate multi-region data ingestion.",
            deliverables: ["Financial Market Modeling", "Competitive Benchmarking", "Data Scaffolding"],
            tech: ["Supabase", "Trello (Agile Management)", "Python Data Analysis"]
        }
    ];

    const modal = document.getElementById('project-modal');
    const modalCloseBtn = document.getElementById('modal-close');
    const modalOverlay = document.getElementById('modal-overlay');
    const caseStudyBtns = document.querySelectorAll('.case-study__btn');
    const modalCtaBtn = document.getElementById('modal-cta-btn');
    
    // Elements to populate
    const modalTitle = document.querySelector('.modal__title');
    const modalHeroImg = document.querySelector('.modal__hero-img');
    const modalChallenge = document.getElementById('modal-challenge');
    const modalSolution = document.getElementById('modal-solution');
    const modalDeliverables = document.getElementById('modal-deliverables');
    const modalTech = document.getElementById('modal-tech');

    function populateModal(index) {
        if(!caseStudiesData[index]) return;
        const data = caseStudiesData[index];
        modalTitle.textContent = data.title;
        modalHeroImg.src = data.hero;
        modalChallenge.textContent = data.challenge;
        modalSolution.textContent = data.solution;
        
        modalDeliverables.innerHTML = '';
        data.deliverables.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            modalDeliverables.appendChild(li);
        });

        modalTech.innerHTML = '';
        data.tech.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            modalTech.appendChild(li);
        });
    }

    function openModal() {
        if(modal) {
            modal.classList.add('modal--open');
            document.body.style.overflow = 'hidden'; // Scroll lock
        }
    }

    function closeModal() {
        if(modal) {
            modal.classList.remove('modal--open');
            document.body.style.overflow = ''; // Release scroll lock
        }
    }

    // Open modal on any "Read Full Case Study" button click
    caseStudyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const index = btn.getAttribute('data-index');
            populateModal(index);
            openModal();
        });
    });

    // Close modal on 'X' or overlay click
    if(modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
    if(modalOverlay) modalOverlay.addEventListener('click', closeModal);
    
    // Also close modal when clicking the CTA to navigate to contact section
    if(modalCtaBtn) {
        modalCtaBtn.addEventListener('click', () => {
            closeModal();
            // Smooth scroll to #connect will happen automatically because of the href
        });
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('modal--open')) {
            closeModal();
        }
    });

    // --- 7. Interactive Project Discovery Questionnaire ---
    const discoveryForm = document.getElementById('discovery-form');
    if (discoveryForm) {
        const steps = document.querySelectorAll('.discovery-step');
        const nextBtns = document.querySelectorAll('.discovery-next');
        const prevBtns = document.querySelectorAll('.discovery-prev');
        const progressFill = document.getElementById('progress-fill');
        const stepIndicator = document.getElementById('step-indicator');
        
        let currentStep = 1;
        const totalSteps = steps.length;

        function updateUI() {
            // Update progress bar
            const percentage = (currentStep / totalSteps) * 100;
            progressFill.style.width = `${percentage}%`;
            
            // Update indicator
            stepIndicator.textContent = `Step ${currentStep} of ${totalSteps}`;

            // Update steps classes for smooth transition
            steps.forEach((step, index) => {
                const stepNum = index + 1;
                step.classList.remove('active', 'exit-left');
                
                if (stepNum === currentStep) {
                    step.classList.add('active');
                } else if (stepNum < currentStep) {
                    step.classList.add('exit-left');
                }
            });
        }

        function validateStep() {
            const currentStepEl = document.querySelector(`.discovery-step[data-step="${currentStep}"]`);
            const errorEl = document.getElementById(`error-step-${currentStep}`);
            let isValid = false;

            if (currentStep === 1) {
                const checked = currentStepEl.querySelector('input[name="focus"]:checked');
                isValid = !!checked;
            } else if (currentStep === 2) {
                const checked = currentStepEl.querySelector('input[name="stage"]:checked');
                isValid = !!checked;
            } else if (currentStep === 3) {
                const inputs = currentStepEl.querySelectorAll('input[required], textarea[required]');
                isValid = Array.from(inputs).every(input => input.value.trim() !== '');
            }

            if (!isValid && errorEl) {
                errorEl.classList.add('visible');
            } else if (errorEl) {
                errorEl.classList.remove('visible');
            }

            return isValid;
        }

        nextBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                if (validateStep()) {
                    currentStep++;
                    updateUI();
                }
            });
        });

        prevBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                currentStep--;
                updateUI();
            });
        });

        // Hide error message as soon as user makes a selection or types
        const formInputs = discoveryForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('input', () => {
                const errorEl = document.getElementById(`error-step-${currentStep}`);
                if (errorEl) errorEl.classList.remove('visible');
            });
        });
        
        // Final form submission handling
        discoveryForm.addEventListener('submit', (e) => {
            if (!validateStep()) {
                e.preventDefault();
            }
            // Let the Web3Forms submission proceed if valid.
        });
    }

});
