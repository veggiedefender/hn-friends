const user = document.getElementsByClassName('hnuser')[0];
const username = user.innerHTML;
const tableRow = document.getElementsByClassName('athing')[0];

function andReload(fn) {
  return async () => {
    await fn();
    window.location.reload();
  }
}

function addFriendToggle(text, onclick) {
  const button = document.createElement('a');
  button.className = 'friend-toggle';
  button.href = 'javascript:void(0)';
  button.onclick = onclick;

  const underline = document.createElement('u')
  underline.textContent = text;

  button.appendChild(underline);
  user.parentElement.appendChild(document.createTextNode(' '));
  user.parentElement.appendChild(button);
}

function tableCell() {
  const cell = document.createElement('td');
  cell.style.verticalAlign = 'top';
  return cell;
}
function addTagInput(tag) {
  const newRow = document.createElement('tr');

  const label = tableCell();
  label.textContent = 'tag:';
  newRow.appendChild(label);

  const container = tableCell();

  const form = document.createElement('form');
  form.style.marginBottom = 0;

  const textBox = document.createElement('input');
  textBox.value = tag;
  form.appendChild(textBox);

  const button = document.createElement('input');
  button.type = 'submit';
  button.value = 'save';
  form.appendChild(button);

  form.onsubmit = andReload(() => addTag(username, textBox.value));
  container.appendChild(form);

  newRow.appendChild(container);

  tableRow.parentNode.insertBefore(newRow, tableRow.nextSibling);
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
