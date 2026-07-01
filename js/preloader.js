// ⏳ LOGIQUE DU PRÉCHARGEUR (PRELOADER) TECHNIQUE
function initPreloader() {
  const progressBar = document.querySelector('.preloader-progress-bar');
  const percentText = document.querySelector('.status-percent');
  const preloader = document.getElementById('preloader');
  
  if (!progressBar || !percentText || !preloader) return;
  
  let progress = 0;
  const interval = setInterval(() => {
    // Progression irrégulière pour simuler une initialisation système
    progress += Math.floor(Math.random() * 12) + 3;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      
      // Disparition en douceur après finalisation
      setTimeout(() => {
        preloader.classList.add('loaded');
      }, 200);
    }
    progressBar.style.width = `${progress}%`;
    percentText.textContent = `${progress}%`;
  }, 40);
}

// Lancement immédiat
initPreloader();
