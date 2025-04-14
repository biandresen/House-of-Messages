const MAX_LENGTH = 200;

document.querySelectorAll(".post-card__text").forEach((textEl) => {
  const fullText = textEl.innerHTML.trim();

  if (fullText.length <= MAX_LENGTH) return;

  const truncated = fullText.slice(0, MAX_LENGTH) + "... ";

  // Create the "Read more" button
  const button = document.createElement("button");
  button.textContent = "Read more";
  button.classList.add("read-more-btn");

  // Initial content
  textEl.innerHTML = truncated;
  textEl.appendChild(button);

  // Toggle logic
  let expanded = false;
  button.addEventListener("click", () => {
    expanded = !expanded;
    textEl.innerHTML = expanded ? fullText + " " : truncated;
    button.textContent = expanded ? "Show less" : "Read more";
    textEl.appendChild(button); // re-add button after changing content
  });
});
