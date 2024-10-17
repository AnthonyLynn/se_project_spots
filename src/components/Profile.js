export default class Profile {
  constructor(selector, onEdit) {
    this._profile = document.querySelector(selector);
    this.avatarElem = this._profile.querySelector(".profile__avatar");
    this.nameElem = this._profile.querySelector(".profile__name");
    this.aboutElem = this._profile.querySelector(".profile__about");
    this._editBtn = this._profile.querySelector(".profile__edit-btn");
    this._onEdit = onEdit;
  }

  setInfo(data) {
    this.avatarElem.src = data.avatar;
    this.nameElem.textContent = data.name;
    profile.aboutElem.textContent = data.about;
  }

  setEventListeners() {
    this._editBtn.addEventListener(this._onEdit);
  }
}
