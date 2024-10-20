import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import Profile from "../components/Profile.js";
import ModalWithForm from "../components/ModalWithForm.js";
import ModalWithImage from "../components/ModalWithImage.js";
import ModalWithOption from "../components/ModalWithOption.js";
import Api from "../utils/Api.js";
import {
  validatorSettings,
  cardTemplate,
  cardContainerSelector,
  profileSelector,
  deleteModalSelector,
  profileModalSelector,
  avatarModalSelector,
  postModalSelector,
  imageModalSelector,
} from "../utils/constants.js";
import "./index.css";

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
    name: profile.nameElem.textContent,
    about: profile.aboutElem.textContent,
  });
  profileModal.open();
});

profile.setEventListeners();

api.getUser().then((data) => profile.setData(data));

// Profile Modal logic
function onProfileFormSubmit(inputValues) {
  api.editUserInfo(inputValues).then((data) => {
    profile.setInfo(data);
    profileModal.close();
  });
}

const profileModal = new ModalWithForm(
  profileModalSelector,
  onProfileFormSubmit
);
profileModal.setEventListeners();

// Avatar Modal logic
function onAvatarFormSubmit(inputValues) {
  api.editUserAvatar(inputValues).then((data) => {
    profile.setAvatar(data);
    avatarModal.close();
  });
}

const avatarModal = new ModalWithForm(avatarModalSelector, onAvatarFormSubmit);
avatarModal.setEventListeners();

// Delete Modal logic
function onCardDeletion(card) {
  api.removeCard(card.getId()).then(() => {
    card.remove();
    deleteModal.close();
  });
}

const deleteModal = new ModalWithOption(deleteModalSelector, onCardDeletion);
deleteModal.setEventListeners();

// Card logic
api.getInitialCards().then((data) => {
  data.forEach((cardData) => {
    createCard(cardData);
  });
});

function likeCard(card) {
  // This will revert the likes apperance if it wasn't able to send to the server
  if (card.isLiked) {
    card.toggleLikeApperance(false);
    api
      .dislikeCard(card.getId())
      .then(() => {
        card.isLiked = false;
      })
      .catch(() => {
        card.toggleLikeApperance(true);
      });
  } else {
    card.toggleLikeApperance(true);
    api
      .likeCard(card.getId())
      .then(() => {
        card.isLiked = true;
      })
      .catch(() => {
        card.toggleLikeApperance(false);
      });
  }
}

function createCard(cardData) {
  const card = new Card(
    cardData,
    cardTemplate,
    () => {
      imageModal.loadImage(cardData);
      imageModal.open();
    },
    () => {
      deleteModal.toDelete = card;
      deleteModal.open();
    },
    () => likeCard(card)
  );

  cardContainer.addItem(card.generateCard(), "prepend");
}

const cardContainer = new Section({
  items: [],
  renderer: createCard,
  containerSelector: cardContainerSelector,
});

// Post Modal logic
function onPostFormSubmit(inputValues) {
  console.log(inputValues);
  api.postCard(inputValues).then(createCard);
  postModal.close();
  postModal.setInputValues();
}

const postModal = new ModalWithForm(postModalSelector, onPostFormSubmit);
postModal.setEventListeners();

const postAddBtn = document.querySelector(".profile__post-btn");
postAddBtn.addEventListener("click", postModal.open);

// Image Modal logic
const imageModal = new ModalWithImage(imageModalSelector);
imageModal.setEventListeners();

// Validation logic
const forms = Array.from(document.forms);
forms.forEach((form) => {
  new FormValidator(validatorSettings, form).enableValidation();
});
