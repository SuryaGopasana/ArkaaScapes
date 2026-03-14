// ===== Configuration =====
// UPDATE THESE VALUES:
const GOOGLE_SHEET_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
const WHATSAPP_NUMBER = '919999999999'; // Your WhatsApp number with country code

// ===== Initialize Lucide Icons =====
document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();
    initHeader();
    initMobileMenu();
    initPackageExpand();
    initFAQs();
    initContactForm();
    initBackToTop();
    initSmoothScroll();
});

// ===== Header Scroll Effect =====
function initHeader() {
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ===== Mobile Menu =====
function initMobileMenu() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuIcon = menuBtn.querySelector('.menu-icon');
    const closeIcon = menuBtn.querySelector('.close-icon');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-nav .btn');
    
    menuBtn.addEventListener('click', function() {
        const isOpen = !mobileMenu.classList.contains('hidden');
        
        if (isOpen) {
            mobileMenu.classList.add('hidden');
            menuIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
        } else {
            mobileMenu.classList.remove('hidden');
            menuIcon.classList.add('hidden');
            closeIcon.classList.remove('hidden');
        }
    });
    
    // Close menu when link is clicked
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
            menuIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
        });
    });
}

// ===== Package Specifications Expand =====
function initPackageExpand() {
    const expandBtns = document.querySelectorAll('.package-expand-btn');
    
    expandBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const packageName = this.dataset.package;
            const specsDiv = document.getElementById(`specs-${packageName}`);
            
            if (specsDiv.classList.contains('hidden')) {
                specsDiv.classList.remove('hidden');
                this.classList.add('expanded');
                this.querySelector('span').textContent = 'Hide Details';
            } else {
                specsDiv.classList.add('hidden');
                this.classList.remove('expanded');
                this.querySelector('span').textContent = 'View Full Specifications';
            }
            
            // Re-initialize icons after DOM change
            lucide.createIcons();
        });
    });
}

// ===== FAQs Accordion =====
function initFAQs() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            const isOpen = item.classList.contains('open');
            
            // Close all FAQs
            faqItems.forEach(faq => faq.classList.remove('open'));
            
            // Open clicked one if it was closed
            if (!isOpen) {
                item.classList.add('open');
            }
        });
    });
}

// ===== Contact Form =====
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Submitting...</span>';
        submitBtn.disabled = true;
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            budget: document.getElementById('budget').value,
            package_interest: document.getElementById('package').value,
            message: document.getElementById('message').value,
            timestamp: new Date().toISOString()
        };
        
        try {
            // Submit to Google Sheets
            if (GOOGLE_SHEET_URL !== 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
                await fetch(GOOGLE_SHEET_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });
            }
            
            // Show success toast
            showToast('Success!', 'Your enquiry has been submitted.');
            
            // Generate WhatsApp message
            const whatsappMessage = `Hi! I'm interested in Arkaa Scapes.%0A%0AName: ${formData.name}%0AEmail: ${formData.email}%0APhone: ${formData.phone}%0ABudget: ${formData.budget || 'Not specified'}%0APackage: ${formData.package_interest || 'Not specified'}%0A%0AMessage: ${formData.message || 'No message'}`;
            
            // Open WhatsApp
            window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`, '_blank');
            
            // Reset form
            form.reset();
            
        } catch (error) {
            console.error('Form submission error:', error);
            showToast('Error', 'Please try WhatsApp or call us directly.');
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            lucide.createIcons();
        }
    });
}

// ===== Toast Notification =====
function showToast(title, message) {
    const toast = document.getElementById('toast');
    const toastTitle = toast.querySelector('.toast-title');
    const toastMessage = toast.querySelector('.toast-message');
    
    toastTitle.textContent = title;
    toastMessage.textContent = message;
    
    toast.classList.remove('hidden');
    
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 5000);
}

// ===== Back to Top =====
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== Smooth Scroll for Anchor Links =====
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}
