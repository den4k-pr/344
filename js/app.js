const videoContainer = document.getElementById('videoContainer');
    const playBtn = document.getElementById('playBtn');
    const video = document.getElementById('mainVideo');

    playBtn.addEventListener('click', function() {
        videoContainer.classList.add('is-playing');
        video.play();
    });

    // Якщо користувач натисне на паузу в самому плеєрі, можна повернути кнопку (опціонально)
    video.addEventListener('pause', function() {
        if (video.ended) {
            videoContainer.classList.remove('is-playing');
        }
    });



document.addEventListener("DOMContentLoaded", () => {
    const faqHeaders = document.querySelectorAll('.faq-header');

    faqHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const currentItem = header.parentElement;
            const isOpen = currentItem.classList.contains('is-open');

            // РОЗКОМЕНТУЙ НАСТУПНИЙ РЯДОК, якщо хочеш, щоб при відкритті одного питання, всі інші закривалися автоматично:
            // document.querySelectorAll('.faq-item').forEach(item => item.classList.remove('is-open'));

            if (!isOpen) {
                currentItem.classList.add('is-open');
            } else {
                currentItem.classList.remove('is-open');
            }
        });
    });
});


 document.addEventListener("DOMContentLoaded", () => {
  function startConcrete24hTimer(timerSelector, valueSelector, storageKey) {
    const timer = document.querySelector(timerSelector);
    if (!timer) return;
    const values = timer.querySelectorAll(valueSelector);
    const TOTAL_TIME = 24 * 60 * 60 * 1000;

    let startTime = localStorage.getItem(storageKey);

    // Перевіряємо реальне значення з кешу
    const hoursFromCache = values[0].textContent || "";
    if (!startTime || hoursFromCache.startsWith("+")) {
      // Якщо в кеші є + або немає значення — очищаємо і стартуємо заново
      localStorage.removeItem(storageKey);
      startTime = Date.now();
      localStorage.setItem(storageKey, startTime);
    } else {
      startTime = parseInt(startTime, 10);
    }

    function updateTimer() {
      const now = Date.now();
      let elapsed = now - startTime;

      if (elapsed >= TOTAL_TIME || elapsed < 0) {
        startTime = now;
        localStorage.setItem(storageKey, startTime);
        elapsed = 0;
      }

      const remaining = TOTAL_TIME - elapsed;
      const hours = Math.floor(remaining / 3600000);
      const minutes = Math.floor((remaining % 3600000) / 60000);
      const seconds = Math.floor((remaining % 60000) / 1000);

      // Примусово переписуємо значення, щоб ніякого + не було
      values[0].textContent = String(hours).padStart(2, "0");
      values[1].textContent = String(minutes).padStart(2, "0");
      values[2].textContent = String(seconds).padStart(2, "0");
    }

    updateTimer();
    setInterval(updateTimer, 1000);
  }

  startConcrete24hTimer(".footer-timer", ".footer-timer-value", "timerStartTime");
  startConcrete24hTimer(".what-content-time", ".what-content-time-item-title", "whatContentTimerStartTime");
});
