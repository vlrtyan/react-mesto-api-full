export class Api {
    constructor({ url }) {
        this.url = url;
        this.__getResponseData = this._getResponseData.bind(this);
    }

    getToken() {
        return `Bearer ${localStorage.getItem('token')}`
    }

    setAuthHeaders() {
        this._headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        }
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
                'Authorization': this.getToken()
            }
        })
            .then(this.__getResponseData);
    }

    getInitialCards() {
        return fetch(`${this.url}/cards/`, {
            headers: {
                'Authorization': this.getToken()
            }
        })
            .then(this.__getResponseData);
    }

    editUserData({name, about}) {
        return fetch(`${this.url}/users/me`, {
            method: 'PATCH',
            headers: {
                'Authorization': this.getToken(),
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
                'Authorization': this.getToken(),
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
                'Authorization': this.getToken(),
                'Content-Type': 'application/json'
            },
        })
            .then(this.__getResponseData);
    }

    changeAvatar(data) {
        return fetch(`${this.url}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                'Authorization': this.getToken(),
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
                    'Authorization': this.getToken(),
                    'Content-Type': 'application/json'
                }
            })
                .then(this.__getResponseData);
        } else {
            return fetch(`${this.url}/cards/${data._id}/likes`, {
                method: 'PUT',
                headers: {
                    'Authorization': this.getToken(),
                    'Content-Type': 'application/json'
                }
            })
                .then(this.__getResponseData);
        }
    }

}

export const api = new Api({
    url: 'https://api.mesto.vlrtyan.nomoredomains.sbs'
})