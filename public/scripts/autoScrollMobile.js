document.addEventListener("DOMContentLoaded", () => {
  const isMobile = window.innerWidth < 768; // Mobile threshhold

  if (isMobile) {
    const inputs = document.querySelectorAll("input, textarea, select");

    inputs.forEach((input) => {
      input.addEventListener("focus", () => {
        // Scroll with an offset for sticky header
        const yOffset = -120;
        const y = input.getBoundingClientRect().top + window.scrollY + yOffset;

        window.scrollTo({ top: y, behavior: "smooth" });
      });
    });
  }
});
