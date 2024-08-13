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
    link: "https://images.unsplash.com/photo-1722082095682-510a3ce6d59f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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

// Modal
const modal = document.querySelector(".modal");
const modalCloseBtn = modal.querySelector(".modal__exit-btn");

// Profile form
const profileForm = document.forms["profile-form"];
const profileFormFieldset = profileForm.querySelector(".modal__fieldset");
const profileFormInputName = profileFormFieldset.querySelector("#name");
const profileFormInputDescription =
  profileFormFieldset.querySelector("#description");

// Cards
const cardTemplate = document.querySelector("#card-template").content;
const cardConatiner = document.querySelector(".card-container");

//-- Functions --//

// Returns a created card element from card data
function createCard(cardData) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardElementImage = cardElement.querySelector(".card__image");
  const cardElementText = cardElement.querySelector(".card__text");

  cardElementText.textContent = cardData.name;
  cardElementImage.src = cardData.link;
  cardElementImage.alt = cardData.name;

  return cardElement;
}

function getCardElement(cardData) {
  const newCard = createCard(cardData);
  cardConatiner.prepend(newCard);
}

function loadCards(data) {
  for (let cardData of data) {
    getCardElement(cardData);
  }
}

function openModal() {
  loadForm();
  modal.classList.add("modal_opened");
}

function closeModal() {
  modal.classList.remove("modal_opened");
}

function loadForm() {
  profileFormInputName.value = profileName.textContent;
  profileFormInputDescription.value = profileOccupation.textContent;
}

function submitEditProfile(evt) {
  evt.preventDefault();

  profileName.textContent = profileFormInputName.value;
  profileOccupation.textContent = profileFormInputDescription.value;

  closeModal();
}

//-- Events --//

profileEditBtn.addEventListener("click", openModal);
modalCloseBtn.addEventListener("click", closeModal);
profileForm.addEventListener("submit", submitEditProfile);

loadCards(initialCards);
loadForm();
