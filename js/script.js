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

// Якоря

const anchors = document.querySelectorAll(".anchor");
anchors.forEach(function (anchor) {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

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

function updateActiveNav() {
  const sections = document.querySelectorAll(".section--anchor");

  sections.forEach((section) => {
    const navLink = document.querySelector(
      `.nav-menu__link[href="#${section.id}"]`
    );
    if (navLink) {
      const rect = section.getBoundingClientRect();
      if (rect.bottom >= 0 && rect.bottom <= window.innerHeight * 0.8) {
        navLink.parentElement.classList.add("active");
      } else {
        navLink.parentElement.classList.remove("active");
      }
    }
  });
}

window.addEventListener("scroll", updateActiveNav);
window.addEventListener("resize", updateActiveNav);
updateActiveNav();

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
    if (
      curentLng === "pl" &&
      window.innerWidth >= 1280 &&
      window.innerWidth <= 1680
    ) {
      input.style.maxWidth = "335px";
    } else if (curentLng === "pl" && window.innerWidth >= 1680) {
      input.style.maxWidth = "508px";
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
    policyLink.setAttribute("href", "./policyPl.htm");
    break;
  case "en":
    policyLink.setAttribute("href", "./policy.htm");
    break;
  default:
    break;
}

// Forms send messages
const formFeedback = document.querySelector(".form-feedback");
const successModal = document.getElementById("successModal");
const errorModal = document.getElementById("errorModal");
const closeButtons = document.querySelectorAll(".modal__close");
const refFormPhone = document.querySelectorAll(".form-phone");

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

const resetForm = (form) => {
  form.reset();
};

const handleFeedback = async (e) => {
  e.preventDefault();
  const currentForm = e.target;
  const formData = new FormData(currentForm);
  const name = formData.get("name");
  const valueFormPhone = formData.get("phone");
  const phoneNumber = iti[0].getNumber() || valueFormPhone;
  let hasError = false;

  const nameError = document.getElementById("nameError");
  if (name !== null && name.trim() === "") {
    nameError.textContent = getNameErrorMessage(curentLng);
    nameError.classList.add("show-error");
    hasError = true;
  } else {
    nameError.classList.remove("show-error");
  }

  const phoneError = document.getElementById("phoneError");
  const formsPhoneError = document.querySelectorAll(".form-phone__error");
  const isCorrectPhone =
    phoneNumber === "" ||
    !/^[+\d]+$/.test(phoneNumber) ||
    phoneNumber.length < 12 ||
    phoneNumber.length > 14;

  if (currentForm === formFeedback) {
    if (isCorrectPhone) {
      phoneError.textContent = getPhoneErrorMessage(curentLng);
      phoneError.classList.add("show-error");
      hasError = true;
    } else {
      phoneError.classList.remove("show-error");
    }
  } else {
    if (isCorrectPhone) {
      formsPhoneError.forEach((el) => {
        el.textContent = getPhoneErrorMessage(curentLng);
        el.classList.add("show-error");
        hasError = true;
      });
    } else {
      formsPhoneError.forEach((el) => el.classList.remove("show-error"));
    }
  }

  if (hasError) {
    return;
  }

  let message = "Контакти з сайту:\n\n";
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
      resetForm(currentForm);
    } else {
      showErrorModal();
      hideModalAfterDelay(errorModal);
      resetForm(currentForm);
    }
  } catch (error) {
    showErrorModal();
    hideModalAfterDelay(errorModal);
    resetForm(currentForm);
  }
};

formFeedback.addEventListener("submit", handleFeedback);
refFormPhone.forEach((form) => form.addEventListener("submit", handleFeedback));

// Footer
const titleFooterPolicy = document.querySelector(".footer__title_policy");
if (curentLng === "en") {
  titleFooterPolicy.classList.add("policy-en");
}
