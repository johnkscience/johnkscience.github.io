window.MathJax = {
  tex: {
    inlineMath: [["\\(", "\\)"], ["$", "$"]],
    displayMath: [["\\[", "\\]"], ["$$", "$$"]]
    processEscapes: true,
    processEnvironments: true
  },
  options: {
    ignoreHtmlClass: ".*|",
    processHtmlClass: "arithmatex"
  },
  startup: {
    ready: () => {
      // Αρχικοποίηση του MathJax
      MathJax.startup.defaultReady();
      
      // Προσθήκη φίλτρου πριν το rendering
      MathJax.startup.document.inputJax.forEach(jax => {
        if (jax.name === 'TeX') {
          jax.preFilters.add((args) => {
            // Αντικαθιστά κάθε σχήμα "ψηφίο,ψηφίο" (π.χ. 2,3) με "ψηφίο{,}ψηφίο" (2{,}3)
            args.math.math = args.math.math.replace(/(\d),(\d)/g, '$1{,}$2');
          });
        }
      });
    }
  }
};