import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import Profile from "../components/Profile.js";
import ModalWithForm from "../components/ModalWithForm.js";
import ModalWithImage from "../components/ModalWithImage.js";
import Api from "../utils/Api.js";
import {
  validatorSettings,
  cardTemplate,
  cardContainerSelector,
  profileSelector,
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
    authorization: "6a49bc73-4cbf-41b7-bd3f-9c47b1919869",
    "Content-Type": "application/json",
  },
});

// Profile logic
const profile = new Profile(profileSelector, () => {
  profileModal.setInputValues({
    name: this.nameElem.textContent,
    about: this.aboutElem.textContent,
  });
  profileModal.open();
});

api.getUser().then((data) => {
  profile.setData(data);
});

api.editUserInfo();

// Profile Modal logic
function onProfileFormSubmit(inputValues) {
  api.editUserInfo(inputValues).then(profile.setInfo);
  profileModal.close();
}

const profileModal = new ModalWithForm(
  profileModalSelector,
  onProfileFormSubmit
);
profileModal.setEventListeners();

const profileFormValidator = new FormValidator(
  validatorSettings,
  profileModal.getForm()
);

profileFormValidator.enableValidation();

// Card logic
api.getInitialCards().then((data) => {
  data.forEach((cardData) => {
    createCard(cardData);
  });
});

function createCard(cardData) {
  const card = new Card(cardData, cardTemplate, () => {
    imageModal.loadImage(cardData);
    imageModal.open();
  });

  cardContainer.addItem(card.generateCard(), "prepend");
}

const cardContainer = new Section({
  items: [],
  renderer: createCard,
  containerSelector: cardContainerSelector,
});

// Post Modal logic
function onPostFormSubmit(inputValues) {
  api.postCard(inputValues).then(createCard);
  postModal.close();
  postModal.setInputValues();
}

const postModal = new ModalWithForm(postModalSelector, onPostFormSubmit);
postModal.setEventListeners();

const postAddBtn = document.querySelector(".profile__post-btn");
postAddBtn.addEventListener("click", postModal.open);

const postFormValidator = new FormValidator(
  validatorSettings,
  postModal.getForm()
);
postFormValidator.enableValidation();

// Image Modal logic
const imageModal = new ModalWithImage(imageModalSelector);
imageModal.setEventListeners();
