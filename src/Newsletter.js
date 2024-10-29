document.addEventListener("DOMContentLoaded", function () {
    // Create form elements
    const container = document.getElementById("newsletter-container");
  
    const newsletterSection = document.createElement("section");
    newsletterSection.classList.add("newsletter");
  
    const title = document.createElement("h2");
    title.textContent = "Subscribe to Our Newsletter";
  
    const description = document.createElement("p");
    description.textContent =
      "Stay updated with our latest information. Sign up now!";
  
    const form = document.createElement("form");
    form.setAttribute("id", "newsletter-form");
  
    const input = document.createElement("input");
    input.type = "email";
    input.id = "email";
    input.name = "email";
    input.placeholder = "Enter your email address";
    input.required = true;
  
    const button = document.createElement("button");
    button.type = "submit";
    button.textContent = "Subscribe";
  
    // Append elements to the form
    form.appendChild(input);
    form.appendChild(button);
  
    // Append everything to the newsletter section
    newsletterSection.appendChild(title);
    newsletterSection.appendChild(description);
    newsletterSection.appendChild(form);
  
    // Append the newsletter section to the container
    container.appendChild(newsletterSection);
  
    // Add submit event listener to the form
    form.addEventListener("submit", function (event) {
      event.preventDefault();
  
      const emailValue = input.value;
  
      if (emailValue) {
        alert(`Thank you for subscribing, ${emailValue}!`);
        input.value = ""; // Clear input after submission
      }
    });
  });