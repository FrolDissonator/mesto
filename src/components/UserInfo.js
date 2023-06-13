export default class UserInfo {
  constructor(usernameSelector, selfInfoSelector, avatarSelector) {
    this._usernameElement = usernameSelector;
    this._selfInfoElement = selfInfoSelector;
    this._avatarElement = avatarSelector;
  }

  getUserInfo() {
    return {
      name: this._usernameElement.textContent,
      description: this._selfInfoElement.textContent,
      avatar: this._avatarElement.src
    }
  }

  setUserInfo(data) {
    if (data.name) this._usernameElement.textContent = data.name;
    if (data.about) this._selfInfoElement.textContent = data.about;
    this.setUserAvatar(data)
  }

  setUserAvatar(data) {
    if (data.avatar) this._avatarElement.src = data.avatar;
    if (data.name) this._avatarElement.alt = data.name;
  }
}

