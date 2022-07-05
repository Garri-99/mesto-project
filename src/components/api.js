const config = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-13",
  headers: {
    authorization: "3bc54813-3658-4b8a-b68f-e51cf1301e4a",
    "Content-Type": "application/json",
  },
};

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

export function getUserInfo() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(checkResponse);
}

export function getCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(checkResponse);
}

export function patchEditProfile(nameInput, activityInput) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: nameInput,
      about: activityInput,
    }),
  }).then(checkResponse);
}

export function postAddCard(titleCard, srcCard) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: titleCard,
      link: srcCard,
    }),
  }).then(checkResponse);
}

export function deleteCard(id) {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkResponse);
}

export function putLike(id) {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "PUT",
    headers: config.headers,
  }).then(checkResponse);
}

export function deleteLike(id) {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkResponse);
}

export function patchEditAvatar(url) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: url,
    }),
  }).then(checkResponse);
}
