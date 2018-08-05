const users = document.getElementsByClassName('hnuser');

css(`
  .friends {
    background-color: #ff6600;
    color: #fff !important;
    padding: 0.25em;
  }
`);

loadFriends((friends) => {
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    if (friends.has(user.innerHTML)) {
      user.classList.add('friends');
    }
  }
});
