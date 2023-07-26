const curentLng = localStorage.getItem("currentLang");
const isCurentLng = curentLng ? curentLng : "ua";

async function loadTranslation(lang) {
  const response = await fetch(`translations/${lang}.json`);
  if (!response.ok) {
    throw new Error(`Failed to load translation for ${lang}`);
  }
  return await response.json();
}

async function initI18next(lang) {
  const translation = await loadTranslation(lang);

  i18next.init(
    {
      lng: lang,
      debug: false,
      resources: {
        [lang]: {
          translation: translation,
        },
      },
    },
    () => {
      const preloader = document.querySelector(".preloader");
      const body = document.querySelector("body");
      preloader.style.display = "none";
      body.classList.remove("fixed");
      createSelects();
    }
  );
}

async function updateTranslations() {
  const elements = document.querySelectorAll("[data-i18n]");
  const inputs = document.querySelectorAll("[data-i18nph]");
  elements.forEach((element) => {
    const key = element.dataset.i18n;
    element.textContent = i18next.t(key);
  });
  inputs.forEach((input) => {
    const key = input.dataset.i18nph;
    const translatedValue = i18next.t(key);
    input.setAttribute("placeholder", translatedValue);
  });
  btnLngs.forEach((btn) => (btn.textContent = isCurentLng));
}

async function changeLanguage(lang) {
  try {
    await initI18next(lang);
    updateTranslations();
  } catch (err) {
    console.error("Ошибка при изменении языка:", err);
  }
}

const langSwitchers = document.querySelectorAll("[data-lang]");
const btnLngs = document.querySelectorAll(".languages__btn");
langSwitchers.forEach((switcher) => {
  switcher.addEventListener("click", () => {
    const valueLng = switcher.dataset.lang;
    localStorage.setItem("currentLang", valueLng);
  });
});


// select
const createSelects = () => {
   document.querySelectorAll(".select").forEach((select) => {
     const selectOption = select.querySelectorAll("option");
     const selectOptionLength = selectOption.length;
     const selectedOption = Array.from(selectOption).find(
       (option) => option.selected
     );
     const duration = 450;
   
     const wrapper = document.createElement("div");
     wrapper.className = "select";
     select.parentNode.insertBefore(wrapper, select);
   
     select.style.display = "none";
     wrapper.appendChild(select);
   
     const newSelect = document.createElement("div");
     newSelect.className = "new-select";
     newSelect.textContent = i18next.t(select.querySelector("option:disabled").dataset.i18n);
     wrapper.appendChild(newSelect);
   
     const selectHead = newSelect;
   
     const selectList = document.createElement("div");
     selectList.className = "new-select__list";
     wrapper.appendChild(selectList);
   
     for (let i = 1; i < selectOptionLength; i++) {
       const selectItem = document.createElement("div");
       selectItem.className = "new-select__item";
       const span = document.createElement("span");
       span.textContent = i18next.t(selectOption[i].dataset.i18n);
       selectItem.appendChild(span);
       selectItem.dataset.value = selectOption[i].value;
       selectList.appendChild(selectItem);
     }
   
     const selectItems = selectList.querySelectorAll(".new-select__item");
     selectList.style.display = "none";
     selectHead.addEventListener("click", (e) => {
       if (!selectHead.classList.contains("on")) {
         selectHead.classList.add("on");
         selectList.style.display = "block";
         selectItems.forEach((item) => {
           item.addEventListener("click", function () {
             const chooseItem = this.dataset.value;
             select.value = chooseItem;
             selectedOption.removeAttribute("selected");
             selectOption.forEach((option) => {
               if (option.value === chooseItem) {
                 option.setAttribute("selected", "selected");
               }
             });
             selectHead.textContent = this.querySelector("span").textContent;
             selectList.style.display = "none";
             selectHead.classList.remove("on");
           });
         });
       } else {
         selectHead.classList.remove("on");
         selectList.style.display = "none";
       }
     });
     const newSelects = document.querySelectorAll(".new-select");
     document.addEventListener("click", (event) => {
       const targetElement = event.target;
       const isSelect = targetElement.classList.contains("new-select");
       if (!isSelect) {
         newSelects.forEach((newSelect) => {
           newSelect.classList.remove("on");
         });
         selectList.style.display = "none";
       }
     });
   });
   };