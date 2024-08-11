const initialCards = [
  createCard(
    "Door",
    "https://images.unsplash.com/photo-1722100351919-86ee668c88db?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  ),
  createCard(
    "Greens",
    "https://images.unsplash.com/photo-1722113515289-72771c520102?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  ),
  createCard(
    "Overflow",
    "https://images.unsplash.com/photo-1722082095682-510a3ce6d59f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  ),
  createCard(
    "Mountains",
    "https://images.unsplash.com/photo-1722082095682-510a3ce6d59f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  ),
  createCard(
    "Post",
    "https://images.unsplash.com/photo-1682935757340-ca567f83da68?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  ),
  createCard(
    "Large House",
    "https://unsplash.com/photos/a-large-house-in-the-middle-of-a-forest-TaSLMCT3JAQ"
  ),
];

const modal = document.querySelector(".modal");
const profileEditBtn = document.querySelector(".profile__edit-button");
const modalCloseBtn = modal.querySelector(".modal__exit");

function createCard(name, link) {
  return {
    name: name,
    link: link,
  };
}

function toggleModal() {
  modal.classList.toggle("modal_hidden");
}

profileEditBtn.addEventListener("click", toggleModal);
modalCloseBtn.addEventListener("click", toggleModal);
