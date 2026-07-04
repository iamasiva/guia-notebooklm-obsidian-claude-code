document.addEventListener("DOMContentLoaded", function () {
  const copyButtons = document.querySelectorAll("[data-copy-target]");

  copyButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const targetId = button.getAttribute("data-copy-target");
      const target = document.getElementById(targetId);
      if (!target) return;

      const text = target.innerText;

      navigator.clipboard
        .writeText(text)
        .then(function () {
          showCopied(button);
        })
        .catch(function () {
          fallbackCopy(text, button);
        });
    });
  });

  function fallbackCopy(text, button) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand("copy");
      showCopied(button);
    } catch (err) {
      /* silencioso: si falla, el usuario puede seleccionar manualmente */
    }
    document.body.removeChild(textarea);
  }

  function showCopied(button) {
    const originalText = button.getAttribute("data-original-text") || button.textContent;
    button.setAttribute("data-original-text", originalText);
    button.textContent = "Copiado";
    button.classList.add("copied");
    setTimeout(function () {
      button.textContent = originalText;
      button.classList.remove("copied");
    }, 2000);
  }
});
