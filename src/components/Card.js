export default class Card {
  constructor(data, selector, onImageClick, onDeleteClick, onLike) {
    this._card = document.querySelector(selector);
    this._name = data.name;
    this._link = data.link;
    this._owner = data.owner;
    this._id = data._id;
    this._onImageClick = onImageClick;
    this._onDeleteClick = onDeleteClick;
    this._onLike = onLike;
    this.isLiked = data.isLiked;
  }

  toggleLikeApperance = (isLiked) => {
    if (isLiked === true) {
      this._likeBtn.classList.add("card__like-icon_selected");
    } else if (isLiked === false) {
      this._likeBtn.classList.remove("card__like-icon_selected");
    } else {
      this._likeBtn.classList.toggle("card__like-icon_selected");
    }
  };

  _setEventListeners() {
    this._likeBtn.addEventListener("click", this._onLike);
    this._trashBtn.addEventListener("click", this._onDeleteClick);
    this._imageElement.addEventListener("click", this._onImageClick);
  }

  _getTemplate() {
    const cardElement = this._card.content
      .querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  _loadTextElement() {
    this._textElement = this._element.querySelector(".card__text");
    this._textElement.textContent = this._name;
  }

  _loadImageElement() {
    this._imageElement = this._element.querySelector(".card__image");
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
  }

  remove() {
    this._element.remove();
  }

  getId() {
    return this._id;
  }

  generateCard() {
    this._element = this._getTemplate();

    this._likeBtn = this._element.querySelector(".card__like-icon");
    this._trashBtn = this._element.querySelector(".card__trash-icon");

    this._loadTextElement();
    this._loadImageElement();
    this.toggleLikeApperance(this.isLiked);

    this._setEventListeners();

    return this._element;
  }
}