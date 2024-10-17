export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _getResult(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  _error(err) {
    console.error(err);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, { headers: this._headers })
      .then(this._getResult)
      .catch(this._error);
  }

  getUser() {
    return fetch(`${this._baseUrl}/users/me`, { headers: this._headers })
      .then(this._getResult)
      .catch(this._error);
  }

  editUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    })
      .then(this._getResult)
      .catch(this._error);
  }

  postCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    })
      .then(this._getResult)
      .catch(this._error);
  }
}
