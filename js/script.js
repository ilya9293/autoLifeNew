import dataForTg from "./config.js";

const mobBackDrop = document.querySelector("[data-modal]");
const mobBtn = document.querySelector("[data-modal-open]");
const mobBtnClose = document.querySelector("[data-modal-close]");

const toggleModal = (e) => {
  mobBackDrop.classList.toggle("is-open");
};

const closeModal = (e) => {
  if (e.currentTarget === e.target) {
    mobBackDrop.classList.remove("is-open");
  }
};

mobBtn.addEventListener("click", toggleModal);
mobBtnClose.addEventListener("click", toggleModal);
mobBackDrop.addEventListener("click", closeModal);

// Languages
const btnLngs = document.querySelectorAll(".languages__btn");
const listLngs = document.querySelectorAll(".languages-list");

const showLngHandle = () => {
  btnLngs.forEach((btn) => {
    btn.classList.toggle("active-lng");
  });

  listLngs.forEach((list) => {
    list.classList.toggle("show-lngs");
  });

  if (listLngs[0].classList.contains("show-lngs")) {
    addDocumentClickHandler();
  } else {
    removeDocumentClickHandler();
  }
};

const documentClickHandle = (event) => {
  const target = event.target;
  const isButton = Array.from(btnLngs).some((btn) => btn.contains(target));
  const isList = Array.from(listLngs).some((list) => list.contains(target));

  if (!isButton && !isList) {
    btnLngs.forEach((btn) => {
      btn.classList.remove("active-lng");
    });

    listLngs.forEach((list) => {
      list.classList.remove("show-lngs");
    });

    removeDocumentClickHandler();
  }
};

const addDocumentClickHandler = () => {
  document.addEventListener("click", documentClickHandle);
};

const removeDocumentClickHandler = () => {
  document.removeEventListener("click", documentClickHandle);
};

btnLngs.forEach((btn) => {
  btn.addEventListener("click", showLngHandle);
});



// -----------------

document.addEventListener("DOMContentLoaded", async function () {
  await changeLanguage(isCurentLng);

  const container = document.querySelector(".accordion-container");
  const button = document.querySelector(".questions__btn");

  if (!button) return;

  const paragraphsData = [
    {
      titleKey: "questions.two.title",
      textKey: "questions.two.answer",
    },
    {
      titleKey: "questions.three.title",
      textKey: "questions.three.answer",
    },
    {
      titleKey: "questions.four.title",
      textKey: "questions.four.answer",
    },
    {
      titleKey: "questions.five.title",
      textKey: "questions.five.answer",
    },
    {
      titleKey: "questions.six.title",
      textKey: "questions.six.answer",
    },
    {
      titleKey: "questions.seven.title",
      textKey: "questions.seven.answer",
    },
    {
      titleKey: "questions.eight.title",
      textKey: "questions.eight.answer",
    },
    {
      titleKey: "questions.nine.title",
      textKey: "questions.nine.answer",
    },
    {
      titleKey: "questions.ten.title",
      textKey: "questions.ten.answer",
    },
    {
      titleKey: "questions.eleven.title",
      textKey: "questions.eleven.answer",
    },
    {
      titleKey: "questions.twelve.title",
      textKey: "questions.twelve.answer",
    },
    {
      titleKey: "questions.threeteen.title",
      textKey: "questions.threeteen.answer",
    },
    {
      titleKey: "questions.fourteen.title",
      textKey: "questions.fourteen.answer",
    },
    {
      titleKey: "questions.fifteen.title",
      textKey: "questions.fifteen.answer",
    },
    {
      titleKey: "questions.seexteen.title",
      textKey: "questions.seexteen.answer",
    },
    {
      titleKey: "questions.seventeen.title",
      textKey: "questions.seventeen.answer",
    },
  ];
  const visibleParagraphsCount = 6;
  let hiddenParagraphs = [...paragraphsData];

  const makeMarkup = (data) => {
    const title = i18next.t(data.titleKey);
    const text = i18next.t(data.textKey);
    const markup = `<div class="ac">
                      <h2 class="ac-header">
                      <button type="button" class="ac-trigger">
                         ${title}
                      </button>
                      </h2>
                      <div class="ac-panel">
                         <p class="ac-text">
                            ${text}
                         </p>
                      </div>
                   </div>`;

    container.insertAdjacentHTML("beforeend", markup);
  };

  const showFirstParagraphs = () => {
    const visibleParagraphs = hiddenParagraphs.splice(
      0,
      visibleParagraphsCount
    );
    visibleParagraphs.forEach((paragraphData) => {
      makeMarkup(paragraphData);
    });
    new Accordion(".accordion-container");
  };

  const handleShowMore = () => {
    new Accordion(".accordion-container");
    for (let i = 0; i < hiddenParagraphs.length; i++) {
      makeMarkup(hiddenParagraphs[i]);
    }
    new Accordion(".accordion-container");
    button.style.display = "none";
  };

  button.addEventListener("click", handleShowMore);
  showFirstParagraphs();
  //   This function in marquee.js
  start();
});

const inputs = document.querySelectorAll(".form-feedback__input[type=tel]");
const dropDownContainer = document.querySelectorAll(
  ".form-feedback__wraper_phone"
);
let iti = [];

if (inputs && dropDownContainer) {
  iti = [...inputs].map((el, idx) => {
    return window.intlTelInput(el, {
      utilsScript: "./js/utils.js",
      preferredCountries: ["ua", "pl"],
      separateDialCode: true,
      dropdownContainer: dropDownContainer[idx],
    });
  });
}

// Steps
const stepBtn = document.querySelectorAll("[data-switch]");
const listParcel = document.querySelector(".steps-list.parcel");
const listPassenger = document.querySelector(".steps-list.passenger");
stepBtn.forEach((btn) => {
  const handleStepBtn = () => {
    stepBtn.forEach((btn) => btn.classList.remove("active"));
    btn.classList.add("active");
    const valueDataSwitch = btn.dataset.switch;
    if (valueDataSwitch === "parcel") {
      listParcel.classList.remove("hide");
      listPassenger.classList.add("hide");
    } else if (valueDataSwitch === "passenger") {
      listPassenger.classList.remove("hide");
      listParcel.classList.add("hide");
    }
  };
  btn.addEventListener("click", handleStepBtn);
});

const steps = document.querySelectorAll(".steps-list__item");

const svgPaths = document.querySelectorAll(".steps__svg path");

// Объект с исходными атрибутами путей
const originalSvgAttributes = [];

// Сохраняем исходные атрибуты путей
svgPaths.forEach((path) => {
  const originalAttributes = {
    d: path.getAttribute("d"),
    fill: path.getAttribute("fill"),
    stroke: path.getAttribute("stroke"),
    strokeDasharray: path.getAttribute("stroke-dasharray"),
  };
  originalSvgAttributes.push(originalAttributes);
});

// Функция для изменения атрибутов <svg>
function updateSvgAttributes(indexes, options = {}) {
  svgPaths.forEach((path, index) => {
    if (indexes.includes(index)) {
      path.style.transition = "stroke-dasharray 0.25s, stroke 0.25s";
      if (options.d) {
        path.setAttribute("d", options.d);
      }
      if (options.fill) {
        path.setAttribute("fill", options.fill);
      }
      if (options.stroke) {
        path.setAttribute("stroke", options.stroke);
      }
      path.setAttribute("stroke-dasharray", "0 0");
    }
  });
}

// Функция для сброса атрибутов <svg> в исходное состояние
function resetSvgAttributes() {
  svgPaths.forEach((path, index) => {
    const originalAttributes = originalSvgAttributes[index];
    path.style.transition = "";
    path.setAttribute("d", originalAttributes.d);
    path.setAttribute("fill", originalAttributes.fill);
    path.setAttribute("stroke", originalAttributes.stroke);
    path.setAttribute("stroke-dasharray", originalAttributes.strokeDasharray);
  });
}

steps.forEach((step, index) => {
  step.addEventListener("click", () => {
    // Сбрасываем атрибуты всех путей в исходное состояние
    resetSvgAttributes();

    steps.forEach((s) => {
      s.classList.remove("accent");
    });
    step.classList.add("accent");

    if (index === 0 || index === 5) {
      updateSvgAttributes([0], {
        d: "M96.7345 120.287C97.4452 120.712 98.3664 120.482 98.7922 119.771C99.218 119.06 98.9871 118.139 98.2765 117.713L96.7345 120.287ZM0.637216 1.62675C18.5177 40.5054 53.3167 94.2705 96.7345 120.287L98.2765 117.713C55.6315 92.1602 21.1523 39.0541 3.36278 0.373248L0.637216 1.62675Z",
        fill: "#E8A83C",
      });
      updateSvgAttributes([1], { stroke: "#E8A83C" });
    } else if (index === 1 || index === 6) {
      updateSvgAttributes([2], { stroke: "#E8A83C" });
    } else if (index === 2 || index === 7) {
      updateSvgAttributes([3], { stroke: "#E8A83C" });
    } else if (index === 3 || index === 8) {
      updateSvgAttributes([4], { stroke: "#E8A83C" });
    } else if (index === 4 || index === 9) {
      updateSvgAttributes([5], {
        d: "M2.93198 177.6C2.28286 177.085 1.33938 177.194 0.824665 177.843C0.309946 178.492 0.4189 179.436 1.06802 179.95L2.93198 177.6ZM1.06802 179.95C20.3017 195.202 47.7285 202.918 78.927 203.171C110.144 203.425 145.256 196.211 180.003 181.462C249.501 151.962 317.694 92.2522 350.411 1.50876L347.589 0.491241C315.192 90.3475 247.665 149.483 178.831 178.7C144.413 193.309 109.707 200.421 78.9513 200.172C48.1777 199.922 21.4786 192.306 2.93198 177.6L1.06802 179.95Z",
        fill: "#E8A83C",
      });
    }

    // Проверяем, есть ли следующий элемент списка
    if (index < steps.length - 1) {
      steps[index + 1].classList.add("accent");
    }
  });
});

const anchors = document.querySelectorAll(".anchor");
anchors.forEach(function (anchor) {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");

    const targetElement = document.querySelector(targetId);
    //  const scrollTime = parseInt(this.getAttribute("data-scroll-time")) || 1000;

    const targetOffset = targetElement.offsetTop;
    const startOffset = window.pageYOffset;
    const distance = targetOffset - startOffset;

    const startTime = performance.now();

    function scrollAnimation(currentTime) {
      const elapsedTime = currentTime - startTime;
      const scrollProgress = Math.min(elapsedTime / 1000, 1);
      const scrollPosition = startOffset + distance * scrollProgress;

      window.scrollTo(0, scrollPosition);

      if (scrollProgress < 1) {
        requestAnimationFrame(scrollAnimation);
      }
    }

    requestAnimationFrame(scrollAnimation);
  });
});

// Calc Form
const calcForm = document.querySelector(".calc__form");
const costValue = document.querySelector("#cost-value");

const handleCost = (e) => {
  e.preventDefault();
  const { width, length, height } = e.currentTarget;

  const invalidFields = [];

  // Проверяем каждое поле на заполнение и наличие числового формата данных
  if (width.value.trim() === "") {
    invalidFields.push({
      field: width,
      errorMessage: getErrorMessage(
        "Введіть дані",
        "Wprowadź dane",
        "Enter data"
      ),
    });
  } else if (isNaN(Number(width.value))) {
    invalidFields.push({
      field: width,
      errorMessage: getErrorMessage(
        "Введіть дані в числовому форматі",
        "Wprowadź dane w formacie liczbowym",
        "Enter data in numeric format"
      ),
    });
  }

  if (length.value.trim() === "") {
    invalidFields.push({
      field: length,
      errorMessage: getErrorMessage(
        "Введіть дані",
        "Wprowadź dane",
        "Enter data"
      ),
    });
  } else if (isNaN(Number(length.value))) {
    invalidFields.push({
      field: length,
      errorMessage: getErrorMessage(
        "Введіть дані в числовому форматі",
        "Wprowadź dane w formacie liczbowym",
        "Enter data in numeric format"
      ),
    });
  }

  if (height.value.trim() === "") {
    invalidFields.push({
      field: height,
      errorMessage: getErrorMessage(
        "Введіть дані",
        "Wprowadź dane",
        "Enter data"
      ),
    });
  } else if (isNaN(Number(height.value))) {
    invalidFields.push({
      field: height,
      errorMessage: getErrorMessage(
        "Введіть дані в числовому форматі",
        "Wprowadź dane w formacie liczbowym",
        "Enter data in numeric format"
      ),
    });
  }

  // Скрываем ошибки только для заполненных и верно заполненных полей
  hideError(invalidFields);

  if (invalidFields.length > 0) {
    invalidFields.forEach((field) => {
      showError(field.field, field.errorMessage[curentLng || "ua"]);
    });
  } else {
    const result =
      (Number(width.value) * Number(length.value) * Number(height.value) * 60) /
      (50 * 40 * 25);
    if (result >= 20) {
      costValue.textContent = Math.round(result);
    } else {
      costValue.textContent = 20;
    }
  }
};

const showError = (input, errorMessage) => {
  const errorContainer = input.parentElement.nextElementSibling;
  errorContainer.textContent = errorMessage;
  errorContainer.classList.add("show-error");
  input.parentElement.classList.add("reset-margin");

  if (curentLng === "pl") {
    errorContainer.classList.add("error-pl");
  }
};

const hideError = (fields) => {
  const errorContainers = document.querySelectorAll(".calc__container-error");
  const labels = document.querySelectorAll(".calc__label");
  errorContainers.forEach((container) => {
    container.textContent = "";
    container.classList.remove("show-error");
  });
  labels.forEach((label) => {
    if (
      !fields.some(
        (field) => field.field === label.querySelector(".calc__input")
      )
    ) {
      label.classList.remove("reset-margin");
    }
  });
};

const getErrorMessage = (ua, pl, en) => {
  return {
    ua,
    pl,
    en,
  };
};

calcForm.addEventListener("submit", handleCost);

const calcInputs = document.querySelectorAll(".calc__input");
const setWidthInput = () => {
  calcInputs.forEach((input) => {
    if (curentLng === "pl" && window.innerWidth > 687) {
      input.style.maxWidth = "54%";
    } else {
      input.style.maxWidth = "";
    }
  });
};

window.addEventListener("resize", setWidthInput);
setWidthInput();

// Политика конфединциальности
const policyLink = document.querySelector(".policy__link");

switch (curentLng) {
  case "ua":
    policyLink.setAttribute("href", "./policy.htm");
    break;
  case "pl":
    policyLink.setAttribute("href", "./policy.htm");
    break;
  case "en":
    policyLink.setAttribute("href", "./policy.htm");
    break;
  default:
    break;
}

// Form Feedback
const formFeedback = document.querySelector(".form-feedback");
const successModal = document.getElementById("successModal");
const errorModal = document.getElementById("errorModal");
const closeButtons = document.querySelectorAll(".modal__close");

closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    successModal.style.display = "none";
    errorModal.style.display = "none";
  });
});

function getModalMessage(messageKey, language) {
  const translations = {
    ua: {
      success: "Дані успішно відправлені!",
      error: "Помилка відправки даних!",
    },
    en: {
      success: "Data sent successfully!",
      error: "Error sending data!",
    },
    pl: {
      success: "Dane wysłane pomyślnie!",
      error: "Błąd wysyłania danych!",
    },
  };

  if (language) {
    return translations[language][messageKey];
  } else {
    return translations.ua[messageKey];
  }
}

function showSuccessModal() {
  const modalMessage = successModal.querySelector(".modal__message");
  modalMessage.textContent = getModalMessage("success", curentLng);

  successModal.style.display = "flex";
  successModal.classList.add("fade-in");
}

function showErrorModal() {
  const modalMessage = errorModal.querySelector(".modal__message");
  modalMessage.textContent = getModalMessage("error", curentLng);

  errorModal.style.display = "flex";
  errorModal.classList.add("fade-in");
}

function hideModalAfterDelay(modal) {
  setTimeout(() => {
    modal.style.display = "none";
  }, 3000);
}

successModal.addEventListener("click", (e) => {
  if (e.target === successModal) {
    successModal.style.display = "none";
  }
});

errorModal.addEventListener("click", (e) => {
  if (e.target === errorModal) {
    errorModal.style.display = "none";
  }
});

function getPhoneErrorMessage(language) {
  const translations = {
    uk: "Введіть телефон",
    pl: "Wprowadź numer telefonu",
    en: "Enter your phone number",
  };

  return translations[language] || "Введіть телефон";
}

function getNameErrorMessage(language) {
  const translations = {
    uk: "Введіть ім'я",
    pl: "Wprowadź imię",
    en: "Enter your name",
  };

  return translations[language] || "Введіть ім'я";
}

const handleFeedback = async (e) => {
  e.preventDefault();
  const formData = new FormData(formFeedback);
  const name = formData.get("name");
  const phoneNumber = iti[0].getNumber();
  let hasError = false;

  const nameError = document.getElementById("nameError");
  if (name.trim() === "") {
    nameError.textContent = getNameErrorMessage(curentLng);
    nameError.classList.add("show-error");
    hasError = true;
  } else {
    nameError.classList.remove("show-error");
  }

  const phoneError = document.getElementById("phoneError");
  if (
    phoneNumber === "" ||
    !/^[+\d]+$/.test(phoneNumber) ||
    phoneNumber.length < 12 ||
    phoneNumber.length > 14
  ) {
    phoneError.textContent = getPhoneErrorMessage(curentLng);
    phoneError.classList.add("show-error");
    hasError = true;
  } else {
    phoneError.classList.remove("show-error");
  }

  if (hasError) {
    return;
  }

  let message = "Данные формы:\n\n";
  message += `phone: ${phoneNumber}\n`;

  for (let pair of formData.entries()) {
    const [name, value] = pair;
    if (name !== "phone") {
      message += `${name}: ${value}\n`;
    }
  }

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${dataForTg.botToken}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `chat_id=${dataForTg.chatId}&text=${encodeURIComponent(message)}`,
      }
    );

    if (response.ok) {
      showSuccessModal();
      hideModalAfterDelay(successModal);
    } else {
      showErrorModal();
      hideModalAfterDelay(errorModal);
    }
  } catch (error) {
    showErrorModal();
    hideModalAfterDelay(errorModal);
  }
};

formFeedback.addEventListener("submit", handleFeedback);
