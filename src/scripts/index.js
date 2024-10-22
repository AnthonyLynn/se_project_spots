import "../pages/index.css";
import Api from "../utils/Api.js";
import {
  checkFormValidity,
  enableValidation,
  disableButton,
} from "./validation.js";

// Api
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "6a49bc73-4cbf-41b7-bd3f-9c47b1919869",
    "Content-Type": "application/json",
  },
});

// Profile
const profile = document.querySelector(".profile");
const avatar = profile.querySelector(".profile__avatar");
const name = profile.querySelector(".profile__name");
const about = profile.querySelector(".profile__about");
const editBtn = profile.querySelector("#profile-btn");
const avatarBtn = profile.querySelector("#avatar-btn");

function setData(data) {
  setInfo(data);
  setAvatar(data);
}

function setInfo(data) {
  name.textContent = data.name;
  about.textContent = data.about;
}

function setAvatar(data) {
  avatar.src = data.avatar;
}

function onInfoEdit() {
  setInputValues(profileForm, profileInputList, {
    name: name.textContent,
    about: about.textContent,
  });
  openModal(profileModal);
}

function onAvatarEdit() {
  openModal(avatarModal);
}

editBtn.addEventListener("click", onInfoEdit);
avatarBtn.addEventListener("click", onAvatarEdit);

api.getUser().then(setData);

// Form
function setInputValues(form, inputList, inputValues) {
  if (inputValues) {
    inputList.forEach((input) => {
      if (inputValues[input.id]) {
        input.value = inputValues[input.id];
      } else {
        input.reset();
      }
    });
  } else {
    form.reset();
  }

  checkFormValidity(form, settings);
}

function getInputValues(inputList) {
  const inputValues = {};
  inputList.forEach((input) => {
    inputValues[input.id] = input.value;
  });

  return inputValues;
}

const savingText = "Saving...";
const deletingText = "Deleting...";
function setLoadingText(button, text) {
  const oldText = button.textContent;
  return function (isSubmiting) {
    if (isSubmiting) {
      button.textContent = text;
    } else {
      button.textContent = oldText;
    }
  };
}

// Modal
let currentModal;

function escapeHandler(evt) {
  if (evt.key === "Escape") {
    closeModal(currentModal);
  }
}

function outsideClickHandler(evt) {
  if (evt.currentTarget === evt.target) {
    closeModal(currentModal);
  }
}

function openModal(modal) {
  currentModal = modal;
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", escapeHandler);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", escapeHandler);
}

const modals = Array.from(document.querySelectorAll(".modal"));
modals.forEach((modal) => {
  modal.addEventListener("click", outsideClickHandler);

  const exitBtn = modal.querySelector(".modal__exit-btn");
  exitBtn.addEventListener("click", () => closeModal(modal));
});

// Profile Modal
const profileModal = document.querySelector("#profile-modal");
const profileForm = document.forms["profile-form"];
const profileSubmitBtn = profileModal.querySelector(".modal__button");
const profileInputList = profileModal.querySelectorAll(".modal__input");

const setProfileLoading = setLoadingText(profileSubmitBtn, savingText);

function onProfileFormSubmit(evt) {
  evt.preventDefault();
  const inputValues = getInputValues(profileInputList);
  setProfileLoading(true);
  api
    .editUserInfo(inputValues)
    .then((data) => {
      setInfo(data);
      closeModal(profileModal);
    })
    .finally(() => setProfileLoading(false));
}

profileForm.addEventListener("submit", onProfileFormSubmit);

// Avatar Modal
const avatarModal = document.querySelector("#avatar-modal");
const avatarForm = document.forms["avatar-form"];
const avatarSubmitBtn = avatarModal.querySelector(".modal__button");
const avatarInputList = avatarModal.querySelectorAll(".modal__input");

const setAvatarLoading = setLoadingText(avatarSubmitBtn, savingText);

function onAvatarFormSubmit(evt) {
  evt.preventDefault();
  const inputValues = getInputValues(avatarInputList);
  setAvatarLoading(true);
  api
    .editUserAvatar(inputValues)
    .then((data) => {
      setAvatar(data);
      closeModal(avatarModal);
      setInputValues(avatarForm, avatarInputList);
    })
    .finally(() => setAvatarLoading(false));
}

avatarForm.addEventListener("submit", onAvatarFormSubmit);

// Post Modal
const postModal = document.querySelector("#post-modal");
const postForm = document.forms["post-form"];
const postSubmitBtn = postModal.querySelector(".modal__button");
const postInputList = postModal.querySelectorAll(".modal__input");

const setPostLoading = setLoadingText(postSubmitBtn, savingText);

function onPostFormSubmit(evt) {
  evt.preventDefault();
  const inputValues = getInputValues(postInputList);
  setPostLoading(true);
  api
    .postCard(inputValues)
    .then((data) => {
      renderCard(data);
      closeModal(postModal);
      setInputValues(postForm, postInputList);
    })
    .finally(() => setPostLoading(false));
}

postForm.addEventListener("submit", onPostFormSubmit);

const postAddBtn = document.querySelector(".profile__post-btn");
postAddBtn.addEventListener("click", () => openModal(postModal));

// Delete Modal
let currentCard;
let currentCardId;

const deleteModal = document.querySelector("#delete-modal");
const deleteBtn = deleteModal.querySelector(`#delete-btn`);
const cancelBtn = deleteModal.querySelector(`#cancel-btn`);

const setDeleteLoading = setLoadingText(deleteBtn, deletingText);

function onDeleteCard() {
  setDeleteLoading(true);
  api
    .removeCard(currentCardId)
    .then(() => {
      currentCard.remove();
      closeModal(deleteModal);
    })
    .finally(() => setDeleteLoading(false));
}

deleteBtn.addEventListener("click", onDeleteCard);
cancelBtn.addEventListener("click", () => closeModal(deleteModal));

// Image Modal
const imageModal = document.querySelector("#image-modal");
const image = imageModal.querySelector(`.modal__image`);
const caption = imageModal.querySelectorAll(`.modal__caption`);

function loadModalImage(data) {
  image.src = data.link;
  image.alt = data.name;
  caption.textContent = data.name;
}

// Card
const cardTemplate = "#card-template";

function getCardTemplate(template) {
  return template.content.querySelector(".card").cloneNode(true);
}

function enableCardLike(likeBtn, isLiked) {
  if (isLiked === true) {
    likeBtn.classList.add("card__like-icon_selected");
  } else {
    likeBtn.classList.remove("card__like-icon_selected");
  }
}

function createCard(data, selector) {
  const cardName = data.name;
  const cardLink = data.link;
  const cardId = data._id;
  let isLiked = data.isLiked;

  const template = document.querySelector(selector);
  const element = getCardTemplate(template);

  const cardText = element.querySelector(".card__text");
  cardText.textContent = cardName;

  const cardImage = element.querySelector(".card__image");
  cardImage.src = cardLink;
  cardImage.alt = cardName;

  cardImage.addEventListener("click", () => {
    loadModalImage(data);
    openModal(imageModal);
  });

  const likeBtn = element.querySelector(".card__like-icon");
  enableCardLike(likeBtn, isLiked);

  likeBtn.addEventListener("click", () => {
    // Will revert the likes apperance if it wasn't able to send to the server
    if (isLiked) {
      enableCardLike(likeBtn, false);
      api
        .dislikeCard(cardId)
        .then(() => {
          isLiked = false;
        })
        .finally(() => {
          enableCardLike(likeBtn, isLiked);
        });
    } else {
      enableCardLike(likeBtn, true);
      api
        .likeCard(cardId)
        .then(() => {
          isLiked = true;
        })
        .finally(() => {
          enableCardLike(likeBtn, isLiked);
        });
    }
  });

  const trashBtn = element.querySelector(".card__trash-icon");

  trashBtn.addEventListener("click", () => {
    currentCard = element;
    currentCardId = cardId;
    openModal(deleteModal);
  });

  return element;
}

// Card Container
const cardContainer = document.querySelector(".card-container");

function renderCard(data, method = "prepend") {
  const cardElement = createCard(data, cardTemplate);
  cardContainer[method](cardElement);
}

api
  .getInitialCards()
  .then((cards) => cards.forEach((card) => renderCard(card)));

// Validation
const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

enableValidation(settings);
