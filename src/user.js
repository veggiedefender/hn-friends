const user = document.getElementsByClassName('hnuser')[0];
const tableRow = document.getElementsByClassName('athing')[0];
const username = user.innerHTML;

function addFriendToggle(text, onclick) {
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

function updateTag(e) {
  addTag(username, e.target.value);
}

function tableCell() {
  const cell = document.createElement('td');
  cell.style.verticalAlign = 'top';
  return cell;
}
function addTagInput(tag) {
  const newRow = document.createElement('tr');

  const label = tableCell();
  label.appendChild(document.createTextNode('tag:'));
  newRow.appendChild(label);

  const container = tableCell();
  const textBox = document.createElement('input');
  textBox.value = tag;
  textBox.size = 60;
  textBox.oninput = updateTag;
  container.appendChild(textBox);
  newRow.appendChild(container);

  tableRow.parentNode.insertBefore(newRow, tableRow.nextSibling);
}

function andReload(fn) {
  return async () => {
    await fn();
    window.location.reload();
  }
}

(async () => {
  const { friends, tags } = await data;
  if (friends.has(username)) {
    addFriendToggle('(remove friend)', andReload(() => removeFriend(username)));
  } else {
    addFriendToggle('(add friend)', andReload(() => addFriend(username)));
  }
  addTagInput(tags[username] || '');
})();
