import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import ModalWithForm from "../components/ModalWithForm.js";
import ModalWithImage from "../components/ModalWithImage.js";
import Api from "../utils/Api.js";
import {
  validatorSettings,
  initialCards,
  cardTemplate,
  cardContainerSelector,
  profileModalSelector,
  postModalSelector,
  imageModalSelector,
} from "../utils/constants.js";
import "./index.css";

//-- Variables --//

// Api
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "c56e30dc-2883-4270-a59e-b2f7bae969c6",
    "Content-Type": "application/json",
  },
});

// Avatar info
const profile = document.querySelector(".profile");
const profileName = profile.querySelector(".profile__name");
const profileOccupation = profile.querySelector(".profile__occupation");
const profileEditBtn = document.querySelector(".profile__edit-btn");

// Post
const postAddBtn = document.querySelector(".profile__post-btn");

// Card logic
function createCard(cardData) {
  const card = new Card(cardData, cardTemplate, () => {
    imageModal.loadImage(cardData);
    imageModal.open();
  });

  cardContainer.addItem(card.generateCard(), "prepend");
}

const cardContainer = new Section({
  items: initialCards,
  renderer: createCard,
  containerSelector: cardContainerSelector,
});

cardContainer.renderItems();

// Profile Modal logic
function onProfileFormSubmit(inputValues) {
  profileName.textContent = inputValues.name;
  profileOccupation.textContent = inputValues.description;

  profileModal.close();
}

const profileModal = new ModalWithForm(
  profileModalSelector,
  onProfileFormSubmit
);
profileModal.setEventListeners();

profileEditBtn.addEventListener("click", () => {
  profileModal.setInputValues({
    name: profileName.textContent,
    description: profileOccupation.textContent,
  });
  profileModal.open();
});

const profileFormValidator = new FormValidator(
  validatorSettings,
  profileModal.getForm()
);
profileFormValidator.enableValidation();

// Post Modal logic
function onPostFormSubmit(inputValues) {
  createCard(inputValues);
  postModal.close();
  postModal.setInputValues();
}

const postModal = new ModalWithForm(postModalSelector, onPostFormSubmit);
postModal.setEventListeners();

postAddBtn.addEventListener("click", postModal.open);

const postFormValidator = new FormValidator(
  validatorSettings,
  postModal.getForm()
);
postFormValidator.enableValidation();

// Image Modal logic
const imageModal = new ModalWithImage(imageModalSelector);
imageModal.setEventListeners();
