// Function to load the header from header.html
export function loadHeader(containerId) {
  fetch("./public/partials/header.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById(containerId).innerHTML = data;
    })
    .catch(error => {
      console.error("Error loading header:", error);
    });
}

// Function to load the footer from footer.html
export function loadFooter(containerId) {
  fetch("./public/partials/footer.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById(containerId).innerHTML = data;
    })
    .catch(error => {
      console.error("Error loading footer:", error);
    });
}