/**
 * Ali - RTL detection script for Persian text
 * Automatically detects Persian text and applies RTL styling
 */
(function() {
    // Detect Persian or Arabic text
    function hasPersianArabicText(text) {
        return /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/.test(text);
    }
    
    // Apply rtl-content class to elements with Persian text
    function applyRTLClass() {
        console.log("RTL Detector: Starting Persian text detection");
        
        // List of elements to check
        var elementsToCheck = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, .post-card-title, .post-card-excerpt, .article-title, .article-excerpt, .gh-content, blockquote, li, .article, .post-card');
        
        elementsToCheck.forEach(function(el) {
            if (el.textContent && hasPersianArabicText(el.textContent)) {
                el.classList.add('rtl-content');
                console.log("RTL Detector: rtl-content class added to element", el);
                
                // If this Persian content is in a card or article, add class to that too
                var parent = el.closest('.post-card, .article');
                if (parent && !parent.classList.contains('rtl-content')) {
                    parent.classList.add('rtl-content');
                    console.log("RTL Detector: rtl-content class added to parent", parent);
                }
            }
        });
        
        // Detect Persian tag
        var primaryTags = document.querySelectorAll('.post-card-primary-tag, .article-tag .post-card-primary-tag');
        primaryTags.forEach(function(tag) {
            if (tag.textContent.trim() === 'فارسی') {
                // Find the related card or article
                var container = tag.closest('.post-card, .article');
                if (container) {
                    container.classList.add('rtl-content');
                    console.log("RTL Detector: rtl-content class added based on Persian tag", container);
                    
                    // Add class to inner elements too
                    var innerElements = container.querySelectorAll('.post-card-title, .post-card-excerpt, .article-title, .article-excerpt, .gh-content');
                    innerElements.forEach(function(inner) {
                        inner.classList.add('rtl-content');
                    });
                }
            }
        });
    }
    
    // Run as soon as DOM is ready
    function initialize() {
        console.log("RTL Detector: Starting");
        if (document.readyState !== 'loading') {
            applyRTLClass();
        } else {
            document.addEventListener('DOMContentLoaded', applyRTLClass);
        }
        
        // Watch for DOM changes
        if ('MutationObserver' in window) {
            var observer = new MutationObserver(function(mutations) {
                var shouldCheck = false;
                
                mutations.forEach(function(mutation) {
                    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                        shouldCheck = true;
                    }
                });
                
                if (shouldCheck) {
                    console.log("RTL Detector: DOM changes detected, checking again");
                    applyRTLClass();
                }
            });
            
            // Start observing after DOM is loaded
            document.addEventListener('DOMContentLoaded', function() {
                observer.observe(document.body, { childList: true, subtree: true });
            });
        }
    }
    
    initialize();
})();