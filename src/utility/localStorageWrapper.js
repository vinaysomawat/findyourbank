export var myLocalStorage = {
  getItem(key) {
    return localStorage.getItem(key);
  },
  setItem(key, value, expiry) {
    // if the expiry time is 0, it means there is no need to add the item
    if (expiry === 0) return;
    localStorage.setItem(key, value);
    let timer;
    if (expiry) {
      timer = setTimeout(() => {
        this.removeItem(key);
        timer && clearTimeout(timer);
      }, expiry);
    }
  },
  removeItem(key) {
    localStorage.removeItem(key);
  },
};
