const users = document.getElementsByClassName('hnuser');

css(`
  .friends {
    background-color: #ff6600;
    color: #fff !important;
    padding: 0.25em;
  }

  .tag {
    height: 0.75em;
  }
`);

function addTagElement(user, tag) {
  const img = document.createElement('img');
  img.src = chrome.extension.getURL('img/tag.svg');
  img.className = 'tag';
  img.title = tag;
  user.parentElement.insertBefore(img, user.nextSibling);
  user.parentElement.insertBefore(document.createTextNode(' '), img);
}

(async () => {
  const { friends, tags } = await data;
  console.log(tags);
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    const username = user.innerHTML;

    if (friends.has(username)) {
      user.classList.add('friends');
    }
    if (username in tags) {
      user.title = tags[username];
      addTagElement(user, tags[username]);
    }
  }
})();
