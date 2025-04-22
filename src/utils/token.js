const TOKEN_KEY = 'token_key'

function setToken(token) {
    localStorage.setItem(TOKEN_KEY, token)
}

function getToken() {
    return localStorage.getItem(TOKEN_KEY)
}

function removeToken() {
    localStorage.removeToken(TOKEN_KEY)
}

export {
    setToken,
    getToken,
    removeToken
}