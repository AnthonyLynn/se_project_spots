export default class Profile {
  constructor(selector, onEdit, onAvatarEdit) {
    this._profile = document.querySelector(selector);
    this.avatarElem = this._profile.querySelector(".profile__avatar");
    this.nameElem = this._profile.querySelector(".profile__name");
    this.aboutElem = this._profile.querySelector(".profile__about");
    this._editBtn = this._profile.querySelector("#profile-btn");
    this._avatarBtn = this._profile.querySelector("#avatar-btn");
    this._onEdit = onEdit;
    this._onAvatarEdit = onAvatarEdit;
  }

  setData(data) {
    this.avatarElem.src = data.avatar;
    this.nameElem.textContent = data.name;
    this.aboutElem.textContent = data.about;
  }

  setAvatar(data) {
    console.log(data);
    this.avatarElem.src = data.avatar;
  }

  setInfo(data) {
    this.nameElem.textContent = data.name;
    this.aboutElem.textContent = data.about;
  }

  setEventListeners() {
    console.log(this._editBtn, this._avatarBtn);
    this._editBtn.addEventListener("click", this._onEdit);
    this._avatarBtn.addEventListener("click", this._onAvatarEdit);
  }
}
