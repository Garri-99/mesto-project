export class UserInfo {
  constructor({ profileName, profileActivity, profileAvatar }) {
    this._nameElem = profileName;
    this._activityElem = profileActivity;
    this._avatarElem = profileAvatar;
  }

  getUserInfo() {
    return {
      name: this._nameElem.textContent,
      activity: this._activityElem.textContent,
      avatar: this._avatarElem.src,
    };
  }

  setUserInfo(newName, newActivity) {
    this._nameElem.textContent = newName;
    this._activityElem.textContent = newActivity;
  }

  setUserAvatar(newSrc) {
    this._avatarElem.src = newSrc;
  }
}
