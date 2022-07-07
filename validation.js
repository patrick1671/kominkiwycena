const formWrapper = document.querySelector("#form-wrapper");
const form = document.querySelector("#valuation-form");
const fields = form.querySelectorAll("[required]");
const submit = form.querySelector(".submit-btn");

function createFieldError(field, error) {
  removeFieldError(field);
  const errorDiv = document.createElement("div");
  errorDiv.classList.add("error-div");
  errorDiv.innerHTML = error;
  let inputField = field.nextElementSibling;
  if (field.type == "checkbox") {
    inputField = field.nextElementSibling.nextElementSibling;
  }

  if (inputField !== null) {
    field.appendChild(errorDiv);
  } else {
    field.parentElement.appendChild(errorDiv);
  }
}

function removeFieldError(field) {
  if (field.nextElementSibling !== null) {
    if (field.nextElementSibling.classList.contains("error-div")) {
      field.nextElementSibling.remove();
    }
  }
}

function markFieldError(el, validationResult) {
  if (validationResult) {
    if (el.type == "checkbox") {
      el.value = "checked";
    }
    el.classList.remove("error");
    toggleErrorField(el, false);
  } else {
    if (el.type == "checkbox") {
      el.value = "";
    }
    el.classList.add("error");
    toggleErrorField(el, true);
  }
}

function toggleErrorField(field, flag) {
  if (field.type == "checkbox") {
    errorMessageDiv = field.nextElementSibling.nextElementSibling;
  } else {
    errorMessageDiv = field.nextElementSibling;
  }

  if (errorMessageDiv !== null) {
    if (errorMessageDiv.classList.contains("error-div")) {
      errorMessageDiv.style.display = flag ? "block" : "none";
      errorMessageDiv.setAttribute("aria-hidden", flag);
    }
  }
}
function sendForm() {
  const formData = new FormData();
  for (const el of fields) {
    formData.append(el.name, el.value);
  }
  const formAction = form.getAttribute("action");

  fetch(formAction, {
    method: "POST",
    body: formData,
  })
    .then((res) => {
      res.json();
    })

    .finally(() => {
      submit.disabled = false;
      formWrapper.classList.add("fadeOut");
      alert(
        "Dziękujemy za kontakt, wkrótce odezwiemy się na email podany w formularzu"
      );
    });
}
form.setAttribute("novalidate", true);

for (field of fields) {
  field.addEventListener("input", (e) =>
    markFieldError(e.target, e.target.checkValidity())
  );
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let errors = false;

  for (field of fields) {
    if (!field.checkValidity()) {
      createFieldError(field, field.dataset.errorText);
      toggleErrorField(field, true);
      errors = true;
    } else {
      toggleErrorField(field, false);
    }
  }
  if (errors == false) {
    submit.disabled = true;
    sendForm();
  }
});
