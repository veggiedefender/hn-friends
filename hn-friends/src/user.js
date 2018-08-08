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
  underline.appendChild(document.createTextNode(text));

  button.appendChild(underline);
  user.parentElement.appendChild(document.createTextNode(' '));
  user.parentElement.appendChild(button);
}

function updateTag(e) {
  const newTag = e.target.children[0].value;
  andReload(() => addTag(username, newTag))();
  e.preventDefault();
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
  newRow.appendChild(container);

  const form = document.createElement('form');
  form.onsubmit = updateTag;
  form.style.marginBottom = '0';
  container.appendChild(form);

  const textBox = document.createElement('input');
  textBox.value = tag;
  form.appendChild(textBox);
  console.log(form);

  const button = document.createElement('input');
  button.type = 'submit';
  button.value = 'save';
  form.appendChild(button);

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
