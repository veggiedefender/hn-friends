const user = document.getElementsByClassName('hnuser')[0];
const username = user.innerHTML;

const reload = window.location.reload.bind(window.location);

css(`
  .friend-toggle {
    cursor: pointer;
    margin-left: 1ch;
    text-decoration: underline;
  }
`);

function createButton(text, onclick) {
  const button = document.createElement('a');
  button.className = 'friend-toggle';
  button.appendChild(document.createTextNode(text));
  button.onclick = onclick;
  user.parentElement.appendChild(button);
}

loadFriends((friends) => {
  if (friends.has(username)) {
    createButton('(remove friend)', e => removeFriend(username, reload));
  } else {
    createButton('(add friend)', e => addFriend(username, reload));
  }
});
