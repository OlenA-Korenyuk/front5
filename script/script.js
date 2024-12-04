document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("registrationForm");
  const modal = document.getElementById("resultModal");
  const closeBtn = document.getElementsByClassName("close")[0];

  const patterns = {
    fullName: /^[А-ЯІЇЄ][а-яіїє']+\s[А-ЯІЇЄ]\.\s[А-ЯІЇЄ]\.$/,
    phone: /^\(\d{3}\)-\d{3}-\d{2}-\d{2}$/,
    faculty: /^[А-ЯІЇЄ]{4}$/,
    birthDate: /^(0[1-9]|[12]\d|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/,
    address: /^м\.\s[А-ЯІЇЄ][А-ЯІЇЄа-яіїє']+$/,
  };

  function validateField(field, pattern) {
    const value = field.value;
    const isValid = pattern.test(value);
    const errorElement = document.getElementById(`${field.id}Error`);

    if (!isValid) {
      field.classList.add("error");
      errorElement.textContent = "Неправильний формат";
      return false;
    } else {
      field.classList.remove("error");
      errorElement.textContent = "";
      return true;
    }
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let isValid = true;
    const formData = {};

    for (let fieldName in patterns) {
      const field = document.getElementById(fieldName);
      const isFieldValid = validateField(field, patterns[fieldName]);
      isValid = isValid && isFieldValid;
      formData[fieldName] = field.value;
    }

    if (isValid) {
      const resultContent = document.getElementById("resultContent");
      resultContent.innerHTML = `
              <p><strong>ПІБ:</strong> ${formData.fullName}</p>
              <p><strong>Телефон:</strong> ${formData.phone}</p>
              <p><strong>Факультет:</strong> ${formData.faculty}</p>
              <p><strong>Дата народження:</strong> ${formData.birthDate}</p>
              <p><strong>Адреса:</strong> ${formData.address}</p>
          `;
      modal.style.display = "block";
    }
  });

  closeBtn.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  for (let fieldName in patterns) {
    const field = document.getElementById(fieldName);
    field.addEventListener("blur", function () {
      validateField(this, patterns[fieldName]);
    });
  }

  const table = document.getElementById("interactiveTable");
  const colorPalette = document.getElementById("colorPalette");
  let selectedCell = null;

  function createTable() {
    let counter = 1;
    for (let i = 0; i < 6; i++) {
      const row = table.insertRow();
      for (let j = 0; j < 6; j++) {
        const cell = row.insertCell();
        cell.textContent = counter;
        cell.dataset.number = counter;
        counter++;
      }
    }
  }

  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function colorRectangle(startCell) {
    const startRow = startCell.parentElement.rowIndex;
    const startCol = startCell.cellIndex;

    for (let i = 0; i <= startRow; i++) {
      for (let j = 0; j <= startCol; j++) {
        table.rows[i].cells[j].style.backgroundColor =
          startCell.style.backgroundColor;
      }
    }
  }

  createTable();

  table.addEventListener("mouseover", function (e) {
    if (e.target.tagName === "TD" && e.target.dataset.number === "26") {
      e.target.style.backgroundColor = getRandomColor();
    }
  });

  table.addEventListener("click", function (e) {
    if (e.target.tagName === "TD" && e.target.dataset.number === "26") {
      selectedCell = e.target;
      const rect = e.target.getBoundingClientRect();
      colorPalette.style.display = "block";
      colorPalette.style.left = rect.left + "px";
      colorPalette.style.top = rect.bottom + 5 + "px";
    } else {
      colorPalette.style.display = "none";
    }
  });

  table.addEventListener("dblclick", function (e) {
    if (e.target.tagName === "TD" && e.target.dataset.number === "26") {
      colorRectangle(e.target);
    }
  });

  document.querySelectorAll(".color-option").forEach((option) => {
    option.addEventListener("click", function () {
      if (selectedCell) {
        selectedCell.style.backgroundColor = this.style.backgroundColor;
        colorPalette.style.display = "none";
      }
    });
  });

  document.addEventListener("click", function (e) {
    if (!colorPalette.contains(e.target) && e.target.dataset.number !== "26") {
      colorPalette.style.display = "none";
    }
  });
});
