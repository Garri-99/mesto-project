export function getProfile() {
  return fetch("https://nomoreparties.co/v1/plus-cohort-13/users/me", {
    headers: {
      authorization: "3bc54813-3658-4b8a-b68f-e51cf1301e4a",
    },
  });
}

export function getInitialCards() {
  return fetch("https://nomoreparties.co/v1/plus-cohort-13/cards", {
    headers: {
      authorization: "3bc54813-3658-4b8a-b68f-e51cf1301e4a",
    },
  });
}

export function patchEditProfile(nameInput, activityInput) {
  return fetch("https://nomoreparties.co/v1/plus-cohort-13/users/me", {
    method: "PATCH",
    headers: {
      authorization: "3bc54813-3658-4b8a-b68f-e51cf1301e4a",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: nameInput,
      about: activityInput,
    }),
  });
}

export function postAddCard(titleCard, srcCard) {
  return fetch("https://nomoreparties.co/v1/plus-cohort-13/cards", {
    method: "POST",
    headers: {
      authorization: "3bc54813-3658-4b8a-b68f-e51cf1301e4a",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: titleCard,
      link: srcCard,
    }),
  });
}

export function deleteCard(id) {
  return fetch(`https://nomoreparties.co/v1/plus-cohort-13/cards/${id}`, {
    method: "DELETE",
    headers: {
      authorization: "3bc54813-3658-4b8a-b68f-e51cf1301e4a",
      "Content-Type": "application/json",
    },
  });
}

export function putLike(id) {
  return fetch(`https://nomoreparties.co/v1/plus-cohort-13/cards/likes/${id}`, {
    method: "PUT",
    headers: {
      authorization: "3bc54813-3658-4b8a-b68f-e51cf1301e4a",
      "Content-Type": "application/json",
    },
  });
}

export function deleteLike(id) {
  return fetch(`https://nomoreparties.co/v1/plus-cohort-13/cards/likes/${id}`, {
    method: "DELETE",
    headers: {
      authorization: "3bc54813-3658-4b8a-b68f-e51cf1301e4a",
      "Content-Type": "application/json",
    },
  });
}

export function patchEditAvatar(url) {
  return fetch('https://nomoreparties.co/v1/plus-cohort-13/users/me/avatar', {
    method: 'PATCH',
    headers: {
      authorization: "3bc54813-3658-4b8a-b68f-e51cf1301e4a",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      avatar: url,
    }),
  })
}
