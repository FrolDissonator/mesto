export default class UserInfo {
  constructor(usernameSelector, selfInfoSelector) {
    this._usernameElement = usernameSelector;
    this._selfInfoElement = selfInfoSelector;
  }

  getUserInfo() {
    return {
      name: this._usernameElement.textContent,
      description: this._selfInfoElement.textContent
    }
  }

  setUserInfo(name, description) {
    this._usernameElement.textContent = name;
    this._selfInfoElement.textContent = description;
  }
}
