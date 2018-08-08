const storage = chrome.storage.local;
const defaults = {
  friends: [],
  tags: {},
};
const data = loadData('friends', 'tags');

function deserialize(data) {
  for (let key in data) {
    if (!(key in defaults)) {
      delete data[key];
    }
  }

  if ('friends' in data) {
    data.friends = new Set(data.friends);
  }
}

function serialize(values) {
  if ('friends' in values) {
    values.friends = Array.from(values.friends);
  }
  if ('tags' in values) {
    for (let username in values.tags) {
      values.tags[username] = values.tags[username].trim();
      if (values.tags[username] === '') {
        delete values.tags[username];
      }
    }
  }
}

function loadData(...keys) {
  return new Promise((resolve, reject) => {
    const query = {};
    keys.forEach(key => query[key] = defaults[key]);
    storage.get(query, (data) => {
      if (!chrome.runtime.lastError) {
        deserialize(data);
        resolve(data);
      } else {
        reject(browser.runtime.lastError);
      }
    });
  });
}

function setData(values) {
  return new Promise((resolve, reject) => {
    serialize(values);
    storage.set(values, () => {
      if (!chrome.runtime.lastError) {
        resolve();
      } else {
        reject(browser.runtime.lastError);
      }
    });
  });
}

async function addFriend(username) {
  const { friends } = await loadData('friends');
  friends.add(username);
  await setData({ friends });
}

async function removeFriend(username) {
  const { friends } = await loadData('friends');
  friends.delete(username);
  await setData({ friends });
}

async function addTag(username, tag) {
  const { tags } = await loadData('tags');
  tags[username] = tag;
  await setData({ tags });
}

function css(styles) {
  const sheet = document.createElement('style');
  sheet.innerHTML = styles;
  document.head.appendChild(sheet);
}
