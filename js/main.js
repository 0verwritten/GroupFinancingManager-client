window.onload = () => {
  const sidebar = document.querySelector(".sidebar-container");
  const toggleButton = document.querySelector(".toggle-button");

  toggleButton.addEventListener("click", () => {
    sidebar.classList.toggle("open");
  });
};
