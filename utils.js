const storage = chrome.storage.local;

function loadFriends(callback) {
  storage.get({ friends: [] }, ({ friends }) => callback(new Set(friends)));
}

function setFriends(setter, callback) {
  loadFriends((friends) => {
    const newFriends = setter(friends);
    storage.set({ friends: Array.from(newFriends) }, callback);
  });
}

function addFriend(username, callback) {
  setFriends(friends => friends.add(username), callback);
}

function removeFriend(username, callback) {
  setFriends(friends => friends.delete(username), callback);
}

function css(styles) {
  const sheet = document.createElement('style');
  sheet.innerHTML = styles;
  document.head.appendChild(sheet);
}
