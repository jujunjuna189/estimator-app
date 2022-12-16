import axios from "axios";
import resApi from "../../constants/Api";

async function authSignIn({ email, password }) {
    let url = resApi.authSignIn;
    let response = await axios.get(url, {
        headers: {
            Accept: 'application/json',
        },
        params: {
            email: email,
            password: password,
        }
    });

    if (response.status === 200) {
        localStorage.setItem('auth', JSON.stringify(response.data.data));
    }

    return response.data.data;
}

function getLocalAuth() {
    let data = '';
    if (localStorage.getItem('auth') !== null) {
        data = JSON.parse(localStorage.getItem('auth'));
    } else {
        data = false;
    }
    return data;
}

function removeLocalAuth() {
    let data = '';
    if (localStorage.getItem('auth') !== null) {
        data = JSON.parse(localStorage.removeItem('auth'));
    } else {
        data = false;
    }
    return data;
}

export {
    authSignIn,
    getLocalAuth,
    removeLocalAuth,
}