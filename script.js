import { type, manufacturer } from "./data.js";

class DynamicList {
  constructor(container) {
    this.elemSelector = container;
    this.type = type;
    this.manufacturer = manufacturer;
    this.generateFirstList();
  }

  generateHTML() {
    const row = document.createElement("div");
    row.classList.add("row", "first-dropdown");

    const dropdown = document.createElement("div");
    dropdown.classList.add("dropdown");

    const dropdownValue = document.createElement("span");

    dropdownValue.classList.add("dropdown-value");
    const arrowImg = document.createElement("img");
    arrowImg.src = "img/arrow.png";
    arrowImg.alt = "arrow icon";
    arrowImg.classList.add("dropdown-arrow");
    const menu = document.createElement("div");
    menu.classList.add("menu");

    const cnt = document.createElement("div");
    cnt.classList.add("dropdown-options-menu", "closed", "border-options");
    return { row, dropdown, dropdownValue, menu, cnt, arrowImg };
  }
  generateFirstList() {
    const htmlStructure = this.generateHTML();

    const { row, dropdown, dropdownValue, menu, cnt, arrowImg } = htmlStructure;

    dropdownValue.innerHTML = "Wybierz typ";

    this.handleOutsideClick(dropdown, cnt);
    this.generateListOptions(cnt, Object.getOwnPropertyNames(this.type));

    dropdown.appendChild(dropdownValue);
    dropdown.appendChild(arrowImg);
    row.appendChild(dropdown);
    row.appendChild(menu);
    menu.appendChild(cnt);

    cnt.addEventListener(
      "click",
      function (e) {
        if (e.target.nodeName == "LI") {
          cnt.classList.add("closed");

          this.showSelectedOption(dropdownValue, e.target);

          if (document.querySelector(".third-dropdown")) {
            document.querySelector(".third-dropdown").remove(0);
          }
          if (document.getElementById("confirmBtn")) {
            document.getElementById("confirmBtn").remove(0);
          }
          this.generateSecondList(e, dropdownValue.innerHTML);
        }
      }.bind(this)
    );

    this.elemSelector.appendChild(row);
  }

  generateListOptions(cnt, objValue) {
    if (objValue != undefined) {
      objValue.forEach((element) => {
        const li = document.createElement("li");
        li.classList.add("dropdown-option");
        if (element.includes("-")) {
          var word = element.split("-");
          li.innerHTML = word[0];
        } else {
          li.innerHTML = element;
        }
        li.dataset.value = element;

        cnt.appendChild(li);
      });
    }
  }

  generateSecondList(e) {
    const htmlStructure = this.generateHTML();
    const { row, dropdown, dropdownValue, menu, cnt, arrowImg } = htmlStructure;

    if (document.querySelector(".second-dropdown")) {
      document.querySelector(".second-dropdown").remove(0);
    }
    dropdownValue.innerHTML = "Wybierz producenta";
    row.classList.add("row", "second-dropdown");
    dropdown.dataset.type = event.target.innerHTML;

    this.handleOutsideClick(dropdown, cnt);
    this.generateListOptions(cnt, this.type[dropdown.dataset.type]);

    dropdown.appendChild(dropdownValue);
    dropdown.appendChild(arrowImg);
    row.appendChild(dropdown);
    row.appendChild(menu);
    menu.appendChild(cnt);

    cnt.addEventListener(
      "click",
      function (e) {
        if (e.target.nodeName == "LI") {
          cnt.classList.add("closed");

          this.showSelectedOption(dropdownValue, e.target);

          if (document.querySelector(".third-dropdown")) {
            document.querySelector(".third-dropdown").remove(0);
          }
          if (document.getElementById("confirmBtn")) {
            document.getElementById("confirmBtn").remove(0);
          }
          this.generateThirdList(e);
        }
      }.bind(this)
    );

    this.elemSelector.appendChild(row);
  }

  generateThirdList(e) {
    const htmlStructure = this.generateHTML();
    const { row, dropdown, dropdownValue, menu, cnt, arrowImg } = htmlStructure;

    dropdownValue.innerHTML = "Wybierz model";
    row.classList.add("row", "third-dropdown");

    dropdown.dataset.type = event.target.dataset.value;
    this.handleOutsideClick(dropdown, cnt);
    this.generateListOptions(cnt, this.manufacturer[dropdown.dataset.type]);

    dropdown.appendChild(dropdownValue);
    dropdown.appendChild(arrowImg);
    row.appendChild(dropdown);
    row.appendChild(menu);
    menu.appendChild(cnt);
    cnt.addEventListener(
      "click",
      function (e) {
        if (e.target.nodeName == "LI") {
          cnt.classList.add("closed");

          this.showSelectedOption(dropdownValue, e.target);

          if (document.getElementById("confirmBtn")) {
            document.getElementById("confirmBtn").remove(0);
          }
          this.confirmSelection(dropdown);
        }
      }.bind(this)
    );
    this.elemSelector.appendChild(row);
  }
  handleOutsideClick(dropdownSelector, optionWrapper) {
    document.querySelector("html").addEventListener(
      "click",
      function (e) {
        if (
          e.target == dropdownSelector.children[1] ||
          e.target == dropdownSelector.children[0] ||
          e.target == dropdownSelector
        ) {
          optionWrapper.classList.toggle("closed");
        } else {
          optionWrapper.classList.add("closed");
        }
      }.bind(this)
    );
  }

  confirmSelection(thirdContainer) {
    const button = document.createElement("button");
    button.id = "confirmBtn";
    button.classList.add("row");

    button.dataset.choice =
      thirdContainer.dataset.type + "," + thirdContainer.children[0].innerHTML;

    button.innerHTML = "Potwierdz swoj wybor";

    button.addEventListener(
      "click",
      function () {
        const form = document.querySelector("#form-wrapper");
        form.classList.remove("fadeOut");
        form.classList.add("fadeInUp");
        form.classList.remove("form-hidden");

        this.editChoice(button, form);
      }.bind(this)
    );
    this.elemSelector.appendChild(button);
  }

  showSelectedOption(dropdown, selectedOption) {
    let selectedText = selectedOption.innerHTML;

    if (selectedText.length <= 25) {
      dropdown.innerHTML = selectedText;
    } else {
      selectedText = selectedText.substring(0, 26);
      selectedText += "...";
      dropdown.innerHTML = selectedText;
    }
  }

  editChoice(btn, formSelector) {
    if (this.elemSelector.childElementCount > 1) {
      this.elemSelector.childNodes[0].remove(0); // Usuwanie
      this.elemSelector.childNodes[1].remove(0); // elementów row po kliknięciu
      this.elemSelector.childNodes[0].remove(0); // na przycisk
      btn.classList.add("edit-choice");
      btn.innerHTML = "Edytuj wybór";
      this.createFormMessage(btn.dataset.choice);
    } else {
      formSelector.classList.add("fadeOut");
      formSelector.classList.remove("fadeInUp");

      btn.remove(0);
      this.generateFirstList();
    }
  }
  createFormMessage(choice) {
    const message = choice.split(",");
    const producer = message[0].split("-");
    $("#message").val(
      "Proszę o wycenę kominka: " + producer[0] + " " + message[1]
    );
  }
}

const obj = new DynamicList(document.querySelector("#container"));
