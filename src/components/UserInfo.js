export class UserInfo {
  constructor(
    { profileName, profileActivity },
    { apiGetUserInfo, apiPatchEditProfile }
  ) {
    this._nameElem = profileName;
    this._activityElem = profileActivity;
    this._apiGetUserInfo = apiGetUserInfo;
    this._apiPatchEditProfile = apiPatchEditProfile;
  }

  getUserInfo() {
    return this._apiGetUserInfo();
  }

  setUserInfo(newName, newActivity) {
    return this._apiPatchEditProfile(newName, newActivity).then(() => {
      this._nameElem.textContent = newName;
      this._activityElem.textContent = newActivity;
    });
  }
}
