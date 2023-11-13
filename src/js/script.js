$(document).ready(function () {

   //burger menu start
   function toggleMenu() {
      const menuBox = document.getElementById('menuBox');
      menuBox.classList.toggle('active');
   }

   function navigateTo(sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
         element.scrollIntoView({ behavior: 'smooth' });
      }
   }

   function closeMenu() {
      const menuToggle = document.getElementById('menu__toggle');
      menuToggle.checked = false;
      document.body.style.overflow = "auto";
   }
   //burger menu end
   const scrollControllerModal = {
      disabledScroll() {
         document.body.style.overflow = "hidden";
      },
      enabledScroll() {
         document.body.style.overflow = "";
      },
   };
   function openForm() {
      document.getElementById("form-window").style.display = "flex";
      document.getElementById("modal-overlay").style.display = "block";
      scrollControllerModal.disabledScroll();
   }

   // close form window
   document.getElementById("close-form-window").addEventListener("click", () => {
      document.getElementById("form-window").style.display = "none";
      document.getElementById("modal-overlay").style.display = "none";
      document.querySelectorAll("#form-window input").forEach((elem) => {
         elem.value = "";
         elem.classList.remove("error-box");
      });
      document.querySelectorAll("#form-window .error-text").forEach((elem) => (elem.innerText = ""));
      scrollControllerModal.enabledScroll();
   });
   const lang = document.documentElement.lang;
   let isFormValid = false;
   let elemForCheckCaptcha;
   // validation
   document.querySelectorAll(".check-form").forEach((elem) =>
      elem.addEventListener("click", (event) => {
         // function that prevents the transition to the next action
         event.preventDefault();
         const form = elem.closest(".registration-form");
         elemForCheckCaptcha = form;
         // function to check the correctness of the entered project name
         function checkName() {
            const inputName = form.querySelector(".input-name");
            const regexName =
               /^[a-zA-Zа-яА-ЯїЇєЄіІґҐ]{2}[a-zA-Zа-яА-ЯїЇєЄіІґҐ\s'-]*$/;
            if (inputName.value.trim() == "") {
               switch (lang) {
                  case "uk":
                     inputName.closest(".input-wrapper").querySelector(".error-text").textContent = "Це поле є обов’язковим для заповнення";
                     break;
                  case "en":
                     inputName.closest(".input-wrapper").querySelector(".error-text").textContent = "This field is required";
                     break;
                  default:
                     break;
               }
               inputName.closest(".input-wrapper").querySelector("input").classList.add("error-box");
            } else if (!regexName.test(inputName.value)) {
               switch (lang) {
                  case "uk":
                     inputName.closest(".input-wrapper").querySelector(".error-text").innerHTML = "Поле має містити не менше двох символів";
                     break;
                  case "en":
                     inputName.closest(".input-wrapper").querySelector(".error-text").textContent = "The field must contain at least two characters";
                     break;
                  default:
                     break;
               }
               inputName.closest(".input-wrapper").querySelector("input").classList.add("error-box");
               inputName.closest(".input-wrapper").classList.add("error");
            } else {
               inputName.closest(".input-wrapper").querySelector(".error-text").innerHTML = "";
               inputName.closest(".input-wrapper").classList.remove("error");
               inputName.closest(".input-wrapper").querySelector("input").classList.remove("error-box");
            }
            return regexName.test(inputName.value);
         }
         // function to check the correctness of the entered phone number
         function checkPhone() {
            const inputPhone = form.querySelector(".phone-number");
            const regexPhone = /^\+38 \(0\d{2}\) \d{3}-\d{2}-\d{2}$/;
            if (inputPhone.value.trim() == "") {
               switch (lang) {
                  case "uk":
                     inputPhone.closest(".input-wrapper").querySelector(".error-text").textContent = "Це поле є обов’язковим для заповнення";
                     break;
                  case "en":
                     inputPhone.closest(".input-wrapper").querySelector(".error-text").textContent = "This field is required";
                     break;
                  default:
                     break;
               }
               inputPhone.closest(".input-wrapper").querySelector("input").classList.add("error-box");
            } else if (!regexPhone.test(inputPhone.value)) {
               switch (lang) {
                  case "uk":
                     inputPhone.closest(".input-wrapper").querySelector(".error-text").textContent = "Поле заповнено не коректно";
                     break;
                  case "en":
                     inputPhone.closest(".input-wrapper").querySelector(".error-text").textContent = "The field is filled out incorrectly";
                     break;
                  default:
                     break;
               }
               inputPhone.closest(".input-wrapper").classList.add("error");
               inputPhone.closest(".input-wrapper").querySelector("input").classList.add("error-box");
            } else {
               inputPhone.closest(".input-wrapper").querySelector(".error-text").textContent = "";
               inputPhone.closest(".input-wrapper").querySelector("input").classList.remove("error-box");
               inputPhone.closest(".input-wrapper").classList.remove("error");
            }
            return regexPhone.test(inputPhone.value);
         }
         checkName();
         checkPhone();
         if (checkName() && checkPhone()) {
            scrollControllerModal.disabledScroll();
            isFormValid = true;

         }
      })
   ); // close the second window
   document.getElementById("close-second-window").addEventListener("click", () => {
      document.getElementById("second-window").style.display = "none";
      document.getElementById("modal-overlay").style.display = "none";
      // field clearing
      document.querySelectorAll(".registration-form input").forEach((elem) => (elem.value = ""));
      location.reload(); // update
   });
   // phone number mask
   jQuery(".phone-number").inputmask({
      mask: "+38 (999) 999-99-99",
      greedy: false,
   });

   // reCAPTCHA
   listenSubmit();
   function listenSubmit() {
      document.querySelectorAll(".check-form").forEach((elem) =>
         elem.addEventListener("click", (event) => {
            event.preventDefault();
            // submit to the server if the form is valid
            if (isFormValid) {
               grecaptcha.ready(function () {
                  grecaptcha.execute(
                     "6LcwRRUaAAAAADavxcmw5ShOEUt1xMBmRAcPf6QP",
                     { action: "submit" }
                  )
                     .then(function (token) {
                        if (elemForCheckCaptcha.checkValidity()) {
                           const actionUrl =
                              "https://intita.com/api/v1/entrant";
                           const entrantFormData = new FormData(
                              elemForCheckCaptcha
                           );

                           entrantFormData.append(
                              "g-recaptcha-response",
                              token
                           );
                           const http = new XMLHttpRequest();
                           http.open("POST", actionUrl, true);
                           http.send(entrantFormData);
                           http.onreadystatechange = function () {
                              if (
                                 +http.readyState === 4 &&
                                 +http.status === 201
                              ) {
                                 entrantSubmitResponse();
                              } else if (+http.status === 400) {
                                 switch (lang) {
                                    case "uk":
                                       entrantSubmitResponse(
                                          "Сервер тимчасово перевантажений. Будь ласка, cпробуйте пізніше"
                                       );
                                       break;
                                    case "en":
                                       entrantSubmitResponse(
                                          "The server is temporary busy. Please try again later"
                                       );
                                       break;
                                    default:
                                       break;
                                 }
                              }
                           };
                           http.onload = function () {
                              if (+http.status !== 201) {
                                 switch (lang) {
                                    case "uk":
                                       entrantSubmitResponse(
                                          "Сервер тимчасово перевантажений. Будь ласка, cпробуйте пізніше"
                                       );
                                       break;
                                    case "en":
                                       entrantSubmitResponse(
                                          "The server is temporary busy. Please try again later"
                                       );
                                       break;
                                    default:
                                       break;
                                 }
                                 return;
                              }
                              entrantSubmitResponse();
                           };
                        }
                     });
               });
            }
         })
      );
   }
   function entrantSubmitResponse(errorStr) {
      const secondWindow = document.getElementById("second-window");
      if (getComputedStyle(secondWindow, null).display === "none") {
         scrollControllerModal.disabledScroll();
         const elementAnketeText =
            document.querySelector(".form-name-content");
         if (errorStr) {
            elementAnketeText.innerText = errorStr;
            document.getElementById("modal-overlay").style.display =
               "block";
            document.getElementById("form-window").style.display = "none";
            document.getElementById("second-window").style.display =
               "block";
         } else {
            switch (lang) {
               case "uk":
                  elementAnketeText.innerHTML =
                     "Дякую!<br>Я зателефоную Вам найближчим часом!";
                  break;
               case "en":
                  elementAnketeText.innerText =
                     "We will contact you shortly";
                  break;
               default:
                  break;
            }
            document.getElementById("form-window").style.display = "none";
            document.getElementById("second-window").style.display = "flex";
         }
         secondWindow.style.display = "block";
         document.getElementById("modal-overlay").style.display = "block";
         document.getElementById("form-window").style.display = "none";
         document.getElementById("second-window").style.display = "block";
      }
      scroll(0, 0);
   }

   //------------------- REVIEWS-SWIPER -------------------
   const swiper = new Swiper('.swiper', {

      direction: 'horizontal',
      loop: true, /*infinity */

      navigation: {
         nextEl: '.swiper-button-next',
         prevEl: '.swiper-button-prev',
      },

      pagination: {
         el: '.swiper-pagination',
         clickable: true,
         dynamicBullets: true,
      },

      /*drag the slide with the handle at an angle of 45 degrees*/
      simulateTouch: true,
      grabCursor: true,
      touchAngle: 45,
      slideToClickedSlide: true,/*flipping the slide with a mouse click*/

      mousewheel: {
         sentivity: 1,
         eventsTarget: ".swiper"
      },

      slidesPerGroup: 1,/*the number of slide rewinds*/

      initialSlide: 0, /*from which slide we start the show*/

      freeMode: true, /*free scrolling of slides*/

      /*auto scroll*/
      autoplay: {
         deley: 1000, /*pause between scrolling*/
         stopOnLasrSlide: false, /*end on the last slide*/
         disableONintersction: true, /*disable after manual switching*/
      },

      speed: 800,

      /*number of slides on page*/
      breakpoints: {
         320: {
            slidesPerView: 1,
         },
         992: {
            slidesPerView: 2,
            spaceBetween: 14,
         },
         1440: {
            slidesPerView: 3,
            spaceBetween: 14,
         }
      }
   });
   //----------------------------------------------------



});