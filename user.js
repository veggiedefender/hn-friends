const user = document.getElementsByClassName('hnuser')[0];
const username = user.innerHTML;

const reload = window.location.reload.bind(window.location);

function createButton(text, onclick) {
  const button = document.createElement('a');
  button.className = 'friend-toggle';
  button.href = 'javascript:void(0)';
  button.onclick = onclick;

  const underline = document.createElement('u')
  underline.appendChild(document.createTextNode(text));

  button.appendChild(underline);
  user.parentElement.appendChild(document.createTextNode(' '));
  user.parentElement.appendChild(button);
}

loadFriends((friends) => {
  if (friends.has(username)) {
    createButton('(remove friend)', e => removeFriend(username, reload));
  } else {
    createButton('(add friend)', e => addFriend(username, reload));
  }
});
