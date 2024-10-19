export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _defaultPromise(promise) {
    return promise.then(this._getResult).catch(console.error);
  }

  _getResult(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  getInitialCards() {
    return this._defaultPromise(
      fetch(`${this._baseUrl}/cards`, { headers: this._headers })
    );
  }

  getUser() {
    return this._defaultPromise(
      fetch(`${this._baseUrl}/users/me`, { headers: this._headers })
    );
  }

  editUserInfo({ name, about }) {
    return this._defaultPromise(
      fetch(`${this._baseUrl}/users/me`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          name,
          about,
        }),
      })
    );
  }

  postCard({ name, link }) {
    return this._defaultPromise(
      fetch(`${this._baseUrl}/cards`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
          name,
          link,
        }),
      })
    );
  }

  removeCard(id) {
    return this._defaultPromise(
      fetch(`${this._baseUrl}/cards/${id}`, {
        method: "DELETE",
        headers: this._headers,
      })
    );
  }

  likeCard() {
    return this._defaultPromise(
      fetch(`${this._baseUrl}/cards/${id}/likes`, {
        method: "PATCH",
        headers: this._headers,
      })
    );
  }

  dislikeCard() {
    return this._defaultPromise(
      fetch(`${this._baseUrl}/cards/${id}/likes`, {
        method: "DELETE",
        headers: this._headers,
      })
    );
  }
}
