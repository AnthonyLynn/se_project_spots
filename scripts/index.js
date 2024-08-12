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

const modal = document.querySelector(".modal");
const profileEditBtn = document.querySelector(".profile__edit-button");
const modalCloseBtn = modal.querySelector(".modal__exit");

const profile = document.querySelector(".profile");
const profileName = profile.querySelector(".profile__name");
const profileOccupation = profile.querySelector(".profile__occupation");

const editProfileFieldset = modal.querySelector(".edit-profile__fieldset");
const editProfileName = editProfileFieldset.querySelector("#name");
const editProfileDescription =
  editProfileFieldset.querySelector("#description");

const editForm = modal.querySelector(".edit-profile");

const cardTemplate = document.querySelector("#card-template").content;
const pictures = document.querySelector(".pictures");

function getCardElement(cardData) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardElementImage = cardElement.querySelector(".card__image");
  const cardElementText = cardElement.querySelector(".card__text");

  cardElementText.textContent = cardData.name;
  cardElementImage.src = cardData.link;
  cardElementImage.alt = cardData.name;

  pictures.prepend(cardElement);
}

function loadCards(data) {
  for (let cardData of data) {
    console.log(cardData);
    getCardElement(cardData);
  }
}

function toggleModal() {
  modal.classList.toggle("modal_hidden");
}

function loadForm() {
  editProfileName.value = profileName.textContent;
  editProfileDescription.value = profileOccupation.textContent;
}

function submitEditProfile(evt) {
  evt.preventDefault();

  profileName.textContent = editProfileName.value;
  profileOccupation.textContent = editProfileDescription.value;

  toggleModal();
}

profileEditBtn.addEventListener("click", toggleModal);
modalCloseBtn.addEventListener("click", toggleModal);
editForm.addEventListener("submit", submitEditProfile);

loadCards(initialCards);
loadForm();
