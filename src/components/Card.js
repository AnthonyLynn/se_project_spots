export default class Card {
  constructor(data, selector, onImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._card = document.querySelector(selector);
    this._onImageClick = onImageClick;
  }

  _toggleLike = () => {
    this._likeBtn.classList.toggle("card__like-icon_selected");
  };

  _deleteCard = () => {
    this._element.remove();
  };

  _setEventListeners() {
    this._likeBtn = this._element.querySelector(".card__like-icon");
    this._likeBtn.addEventListener("click", this._toggleLike);

    this._trashBtn = this._element.querySelector(".card__trash-icon");
    this._trashBtn.addEventListener("click", this._deleteCard);

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

  generateCard() {
    this._element = this._getTemplate();

    this._loadTextElement();
    this._loadImageElement();

    this._setEventListeners();

    return this._element;
  }
}
