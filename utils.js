const storage = chrome.storage.local;

function loadFriends(callback) {
  storage.get({ friends: [] }, ({ friends }) => callback(new Set(friends)));
}

function setFriends(friends, callback) {
  storage.set({ friends: Array.from(friends) }, callback);
}

function addFriend(username, callback) {
  loadFriends(friends => setFriends(friends.add(username), callback));
}

function removeFriend(username, callback) {
  loadFriends(friends => setFriends(friends.delete(username), callback));
}

function css(styles) {
  const sheet = document.createElement('style')
  sheet.innerHTML = styles;
  document.head.appendChild(sheet);
}
