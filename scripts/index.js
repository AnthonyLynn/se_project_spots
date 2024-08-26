//-- Variables --//

// Card data
const initialCards = [
  {
    name: "Door",
    link: "https://images.unsplash.com/photo-1722100351919-86ee668c88db?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Greens",
    link: "https://images.unsplash.com/photo-1722113515289-72771c520102?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Overflow",
    link: "https://images.unsplash.com/photo-1722082095682-510a3ce6d59f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Mountains",
    link: "https://images.unsplash.com/photo-1723451150503-a82e2ccf121e?q=80&w=930&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Post",
    link: "https://images.unsplash.com/photo-1682935757340-ca567f83da68?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Large House",
    link: "https://images.unsplash.com/photo-1722113515787-cdb34057d018?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

// Avatar info
const profile = document.querySelector(".profile");
const profileName = profile.querySelector(".profile__name");
const profileOccupation = profile.querySelector(".profile__occupation");
const profileEditBtn = document.querySelector(".profile__edit-btn");

// Profile Modal
const profileModal = document.querySelector("#profile-modal");
const profileForm = document.forms["profile-form"];
const profileFormFieldset = profileForm.querySelector(".modal__fieldset");
const profileFormInputName = profileFormFieldset.querySelector("#name");
const profileFormInputDescription =
  profileFormFieldset.querySelector("#description");

// Post Modal
const postModal = document.querySelector("#post-modal");
const postAddBtn = document.querySelector(".profile__post-btn");
const postForm = document.forms["post-form"];
const postFormFieldset = postForm.querySelector(".modal__fieldset");
const postFormInputImageLink = postFormFieldset.querySelector("#image-link");
const postFormInputCaption = postFormFieldset.querySelector("#caption");

// Image Modal
const imageModal = document.querySelector("#image-modal");
const imageModalImage = imageModal.querySelector(".modal__image");
const imageModalCaption = imageModal.querySelector(".modal__caption");

// Close Buttons
const modalCloseButtons = document.querySelectorAll(".modal__exit-btn");

// Cards
const cardTemplate = document.querySelector("#card-template").content;
const cardContainer = document.querySelector(".card-container");

//-- Functions --//

// Returns a created card element from card data
function createCard(cardData) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardElementImage = cardElement.querySelector(".card__image");
  const cardElementText = cardElement.querySelector(".card__text");
  const cardElementLikeIconBtn = cardElement.querySelector(".card__like-icon");
  const cardElementTrashIconBtn =
    cardElement.querySelector(".card__trash-icon");

  cardElementText.textContent = cardData.name;
  cardElementImage.src = cardData.link;
  cardElementImage.alt = cardData.name;

  cardElementLikeIconBtn.addEventListener("click", () => {
    cardElementLikeIconBtn.classList.toggle("card__like-icon_selected");
  });

  cardElementTrashIconBtn.addEventListener("click", () => {
    cardElement.remove();
  });

  cardElementImage.addEventListener("click", () => {
    loadImageModal(cardData);
    openModal(imageModal);
  });

  return cardElement;
}

function renderCard(cardData, method = "prepend") {
  const cardElement = createCard(cardData);
  cardContainer[method](cardElement);
}

function loadCards(data) {
  data.forEach((item) => renderCard(item));
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function loadProfileForm() {
  profileFormInputName.value = profileName.textContent;
  profileFormInputDescription.value = profileOccupation.textContent;
}

function submitEditProfile(evt) {
  evt.preventDefault();

  profileName.textContent = profileFormInputName.value;
  profileOccupation.textContent = profileFormInputDescription.value;

  closeModal(profileModal);
}

function resetPostModal() {
  postFormInputImageLink.value = "";
  postFormInputCaption.value = "";
}

function submitAddPost(event) {
  event.preventDefault();
  const cardData = {
    link: postFormInputImageLink.value,
    name: postFormInputCaption.value,
  };
  renderCard(cardData);
  closeModal(postModal);
  resetPostModal();
}

function loadImageModal(cardData) {
  imageModalImage.src = cardData.link;
  imageModalImage.alt = cardData.name;
  imageModalCaption.textContent = cardData.name;
}
//-- Events --//

modalCloseButtons.forEach((exitBtn) => {
  const modal = exitBtn.closest(".modal");
  exitBtn.addEventListener("click", () => closeModal(modal));
});

profileEditBtn.addEventListener("click", () => openModal(profileModal));
profileForm.addEventListener("submit", submitEditProfile);

postAddBtn.addEventListener("click", () => openModal(postModal));
postForm.addEventListener("submit", submitAddPost);

loadCards(initialCards);
loadProfileForm();
