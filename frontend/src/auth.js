export let BASE_URL = "";
const { NODE_ENV } = process.env;
if (NODE_ENV === "production") {
  BASE_URL = "https://mesto.vlrtyan.nomoredomains.sbs";
} else {
  BASE_URL = "http://localhost:3000";
}

const HEADERS = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

const getResponseData = (res) => {
    if (res.ok) {
        return res.json();
    } else {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
}

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify({
            email, password
        })
    })
        .then(getResponseData)
};

export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify({
            email, password
        })
    })
        .then(getResponseData)
};
export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            ...HEADERS,
            'Authorization': `Bearer ${token}`,
        }
    })
        .then(getResponseData)
}