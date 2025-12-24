// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');

mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuBtn.innerHTML = navMenu.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.1)';
        header.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        header.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.06)';
        header.style.background = 'rgba(255, 255, 255, 0.98)';
    }
});

// Animated counters
function animateCounter(id, start, end, duration) {
    let obj = document.getElementById(id);
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        let timeElapsed = currentTime - startTime;
        let progress = Math.min(timeElapsed / duration, 1);
        
        // Easing function for smooth animation
        progress = 1 - Math.pow(1 - progress, 3);
        
        let value = Math.floor(progress * (end - start) + start);
        obj.innerHTML = value.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(animation);
        }
    }
    
    requestAnimationFrame(animation);
}

// Trigger counters when in view
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animate counters with different durations
            animateCounter('clientCount', 0, 187, 2500);
            animateCounter('automationCount', 0, 2450, 3000);
            
            // Add animation classes to step cards
            document.querySelectorAll('.step-card').forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('animate__animated', 'animate__fadeInUp');
                }, index * 300);
            });
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

observer.observe(document.querySelector('.hero'));

// Service plan buttons
document.querySelectorAll('.service-btn').forEach(button => {
    button.addEventListener('click', function() {
        const plan = this.getAttribute('data-plan');
        const monthly = this.getAttribute('data-monthly');
        const setup = this.getAttribute('data-setup');
        
        // Scroll to contact form
        document.getElementById('contact').scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
        
        // Auto-fill the plan selection after a delay
        setTimeout(() => {
            const planSelect = document.getElementById('plan');
            if (plan === 'AI Chatbot') {
                planSelect.value = 'chatbot';
            } else if (plan === 'AI Voice Calls') {
                planSelect.value = 'voice';
            }
            
            // Highlight the button with animation
            this.style.animation = 'successPulse 1s';
            setTimeout(() => {
                this.style.animation = '';
            }, 1000);
            
            // Show a tooltip
            const tooltip = document.createElement('div');
            tooltip.textContent = `✓ ${plan} selected!`;
            tooltip.style.cssText = `
                position: absolute;
                background: var(--success);
                color: white;
                padding: 10px 20px;
                border-radius: 10px;
                font-weight: 600;
                top: -50px;
                left: 50%;
                transform: translateX(-50%);
                z-index: 100;
                box-shadow: 0 10px 25px rgba(0, 214, 143, 0.3);
                animation: fadeIn 0.3s, fadeOut 0.3s 1.7s;
            `;
            
            this.style.position = 'relative';
            this.appendChild(tooltip);
            
            setTimeout(() => {
                tooltip.remove();
            }, 2000);
            
        }, 800);
    });
});

// Modal functionality
const notificationModal = document.getElementById('notificationModal');
const modalClose = document.getElementById('modalClose');
const modalMessage = document.getElementById('modalMessage');

modalClose.addEventListener('click', () => {
    notificationModal.style.display = 'none';
});

// Close modal when clicking outside
notificationModal.addEventListener('click', (e) => {
    if (e.target === notificationModal) {
        notificationModal.style.display = 'none';
    }
});

// Form submission with Gmail notification
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const gmail = document.getElementById('gmail').value;
    const phone = document.getElementById('phone').value;
    const business = document.getElementById('business').value;
    const plan = document.getElementById('plan').value;
    const message = document.getElementById('message').value;
    
    // Plan details mapping
    const planDetails = {
        'chatbot': { name: 'AI Chatbot Plan', monthly: '₹1000', setup: '₹500' },
        'voice': { name: 'AI Voice Calls Plan', monthly: '₹4000', setup: '₹2000' },
        'both': { name: 'Both AI Plans', monthly: '₹4500 (Special Price)', setup: '₹2000' },
        'demo': { name: 'Free Demo Request', monthly: 'N/A', setup: 'N/A' }
    };
    
    const selectedPlan = planDetails[plan] || { name: 'Not specified', monthly: 'N/A', setup: 'N/A' };
    
    // Create email body for jsrinivas638@gmail.com (Business Owner)
    const businessEmailSubject = `NEW CLIENT: ${name} selected ${selectedPlan.name}`;
    const businessEmailBody = `
New Client Plan Selection:
=================================
Client Name: ${name}
Client Gmail: ${gmail}
Client Phone: ${phone}
Business Type: ${business}
Selected Plan: ${selectedPlan.name}
Monthly Price: ${selectedPlan.monthly}
Setup Fee: ${selectedPlan.setup}
Additional Message: ${message || 'No additional message'}
=================================
Contact this client immediately to proceed with setup.
    `;
    
    // Create email for client (auto-response)
    const clientEmailSubject = `Thank you for choosing SmartFlow.ai ${selectedPlan.name}`;
    const clientEmailBody = `
Dear ${name},

Thank you for selecting our ${selectedPlan.name}!

Here's a summary of your selection:
- Plan: ${selectedPlan.name}
- Monthly: ${selectedPlan.monthly}
- Setup: ${selectedPlan.setup}

Our team will contact you at ${phone} within 24 hours to:
1. Confirm your requirements
2. Schedule setup (usually done within 24 hours)
3. Provide free training

If you have any immediate questions, call us at 98492 35004.

Best regards,
SmartFlow.ai Team
Hanamakonda, Kazipet - 506003
98492 35004
    `;
    
    // YOUR GMAIL NOTIFICATION SYSTEM
    // This is where the notification gets sent to your Gmail
    const ownerGmail = 'jsrinivas638@gmail.com';
    
    // Method 1: Open Gmail compose window (works for you and client)
    const ownerGmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(ownerGmail)}&su=${encodeURIComponent(businessEmailSubject)}&body=${encodeURIComponent(businessEmailBody)}`;
    const clientGmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(gmail)}&su=${encodeURIComponent(clientEmailSubject)}&body=${encodeURIComponent(clientEmailBody)}`;
    
    // Open Gmail for business owner (you)
    window.open(ownerGmailUrl, '_blank');
    
    // Also open WhatsApp for quick notification
    const whatsappMessage = `*NEW CLIENT PLAN SELECTION*%0A%0A*Name:* ${name}%0A*Phone:* ${phone}%0A*Plan:* ${selectedPlan.name}%0A*Monthly:* ${selectedPlan.monthly}%0A*Setup:* ${selectedPlan.setup}%0A%0AContact immediately!`;
    
    setTimeout(() => {
        // Open Gmail for client (auto-response)
        window.open(clientGmailUrl, '_blank');
        
        // Ask if they want to send WhatsApp too
        setTimeout(() => {
            const sendWhatsApp = confirm(`We've prepared emails for you and ${name}. Would you also like to send a WhatsApp notification to yourself?`);
            if (sendWhatsApp) {
                window.open(`https://wa.me/919849235004?text=${whatsappMessage}`, '_blank');
            }
        }, 1000);
    }, 500);
    
    // Show success modal
    modalMessage.innerHTML = `
        <strong>Thank you ${name}!</strong><br><br>
        You've selected: <strong>${selectedPlan.name}</strong><br>
        Monthly: <strong>${selectedPlan.monthly}</strong> | Setup: <strong>${selectedPlan.setup}</strong><br><br>
        We've sent a notification to <strong>${ownerGmail}</strong> and an auto-response to <strong>${gmail}</strong>.<br>
        Our team will contact you at <strong>${phone}</strong> within 24 hours.
    `;
    
    notificationModal.style.display = 'flex';
    
    // Reset form
    contactForm.reset();
});

// Newsletter form
const newsletterForm = document.getElementById('newsletterForm');
newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('.newsletter-input').value;
    
    if (email.includes('@') && email.includes('.')) {
        // Send newsletter notification to your Gmail
        const newsletterSubject = `New Newsletter Subscription: ${email}`;
        const newsletterBody = `New newsletter subscriber: ${email}\n\nAdd to your mailing list.`;
        const newsletterUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=jsrinivas638@gmail.com&su=${encodeURIComponent(newsletterSubject)}&body=${encodeURIComponent(newsletterBody)}`;
        
        window.open(newsletterUrl, '_blank');
        
        alert(`Thank you for subscribing with ${email}! You'll receive AI tips and business growth strategies in your inbox.`);
        this.reset();
    } else {
        alert('Please enter a valid Gmail address.');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 90,
                behavior: 'smooth'
            });
        }
    });
});

// Animate elements on scroll
const scrollObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            entry.target.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        }
    });
}, scrollObserverOptions);

// Observe elements for scroll animation
document.querySelectorAll('.service-card, .testimonial-card, .contact-form, .contact-info').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    scrollObserver.observe(el);
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Add a welcome message in console
    console.log('%c🚀 SmartFlow.ai Website Loaded!', 'color: #6a11cb; font-size: 18px; font-weight: bold;');
    console.log('%c📧 Owner Gmail: jsrinivas638@gmail.com', 'color: #2575fc; font-size: 14px;');
    console.log('%c📞 Contact: 98492 35004', 'color: #ff4b2b; font-size: 14px;');
    
    // Auto-fill demo button with plan info when coming from service cards
    const urlParams = new URLSearchParams(window.location.search);
    const planParam = urlParams.get('plan');
    
    if (planParam) {
        setTimeout(() => {
            const planSelect = document.getElementById('plan');
            if (planParam === 'chatbot') {
                planSelect.value = 'chatbot';
            } else if (planParam === 'voice') {
                planSelect.value = 'voice';
            }
        }, 1000);
    }
});