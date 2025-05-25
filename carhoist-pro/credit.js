<script>
  document.addEventListener('DOMContentLoaded', function() {
    // Protection against removal
    const checkCredits = function() {
      const credits = document.querySelectorAll('.theme-credit');
      const themeName = 'carhoist-pro';
      
      credits.forEach(credit => {
        // Restore if removed
        if (!credit.isConnected) {
          const footerText = document.querySelector('.footer__copyright');
          if (footerText) {
            footerText.innerHTML = footerText.innerHTML.replace(
              /Powered by.*?Design and manage by.*?\./,
              `Powered by <span class="theme-credit" data-theme="${themeName}">Ynor</span>. Design and manage by <span class="theme-credit" data-theme="${themeName}">Ronyman</span>.`
            );
          }
        }
        
        // Verify data-theme attribute
        if (credit.getAttribute('data-theme') !== themeName) {
          credit.setAttribute('data-theme', themeName);
        }
      });
    };
    
    // Run immediately
    checkCredits();
    
    // Check periodically
    setInterval(checkCredits, 5000);
    
    // Also check on mutations
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type === 'childList') {
          checkCredits();
        }
      });
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    // Self-healing if entire footer section is removed
    const checkFooterSection = function() {
      const footerSection = document.querySelector('.footer__copyright');
      if (!footerSection) {
        const footer = document.querySelector('.site-footer');
        if (footer) {
          footer.insertAdjacentHTML('beforeend', `
            <div class="footer__bottom grid grid--table small--text-center">
              <div class="grid__item medium-up--one-half">
                <small class="footer__copyright">
                  {{- 'layout.footer.copyright' | t }} &copy; {{ 'now' | date: '%Y' }},
                  {{ shop.name | link_to: routes.root_url }}. Powered by
                  <span class="theme-credit" data-theme="carhoist-pro">Ynor</span>. Design and manage by
                  <span class="theme-credit" data-theme="carhoist-pro">Ronyman</span>.
                </small>
              </div>
            </div>
          `);
        }
      }
    };
    
    setInterval(checkFooterSection, 10000);
  });
</script>
