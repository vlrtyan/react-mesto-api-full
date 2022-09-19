export class Api {
    constructor({ url, token }) {
        this.url = url;
        this.token = token;
        this.__getResponseData = this._getResponseData.bind(this);
    }

    _getResponseData(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    }

    getUserData() {
        return fetch(`${this.url}/users/me`, {
            headers: {
                authorization: this.token
            }
        })
            .then(this.__getResponseData);
    }

    getInitialCards() {
        return fetch(`${this.url}/cards/`, {
            headers: {
                authorization: this.token
            }
        })
            .then(this.__getResponseData);
    }

    editUserData({name, about}) {
        return fetch(`${this.url}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
            .then(this.__getResponseData);
    }

    addNewItem(data) {
        return fetch(`${this.url}/cards`, {
            method: 'POST',
            headers: {
                authorization: this.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
            .then(this.__getResponseData);
    }

    deleteCard(data) {
        return fetch(`${this.url}/cards/${data._id}`, {
            method: 'DELETE',
            headers: {
                authorization: this.token,
                'Content-Type': 'application/json'
            },
        })
            .then(this.__getResponseData);
    }

    changeAvatar(data) {
        return fetch(`${this.url}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
            .then(this.__getResponseData);
    }

    changeLikeCardStatus(data, isLiked) {
        if (isLiked === true) {
            return fetch(`${this.url}/cards/${data._id}/likes`, {
                method: 'DELETE',
                headers: {
                    authorization: this.token,
                    'Content-Type': 'application/json'
                }
            })
                .then(this.__getResponseData);
        } else {
            return fetch(`${this.url}/cards/${data._id}/likes`, {
                method: 'PUT',
                headers: {
                    authorization: this.token,
                    'Content-Type': 'application/json'
                }
            })
                .then(this.__getResponseData);
        }
    }

}

export const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-32',
    token: 'f7e9f27f-efd9-4384-a381-5bfd59f30ca5'
})