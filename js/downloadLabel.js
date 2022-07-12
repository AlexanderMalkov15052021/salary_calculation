let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  resultBtn.insertAdjacentHTML(
    "afterEnd", `<button class="appDownload">
      <span>Установить приложение</span>
      <img src="images/salaryCalculation-64x64.png" alt="калькулятор" />
    </button>`
  );
  resultBtn.nextSibling.addEventListener('click', appSet);
});

const appSet =  async (elem) => {
  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  document.querySelector(".appDownload").parentNode.removeChild(document.querySelector(".appDownload"));
  deferredPrompt = null;
};
