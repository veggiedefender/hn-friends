const container = document.getElementById('container');
const exportBtn = document.getElementById('export');
const importBtn = document.getElementById('import');
const fileUpload = document.getElementById('upload');

function showMessage(message) {
  const elem = document.createElement('p');
  elem.className = 'message';
  elem.textContent = message;
  container.appendChild(elem);
  return elem;
}

function showError(err) {
  const elem = showMessage(err);
  elem.classList.add('error');
}

function getStats(data) {
  const numFriends = data.friends.length;
  const numTags = Object.keys(data.tags).length;
  return { numFriends, numTags };
}

function download(data) {
  const elem = document.createElement('a');
  elem.href = 'data:application/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data));
  elem.download = 'hn-friends.json';
  elem.style.display = 'none';
  document.body.appendChild(elem);
  elem.click();
  document.body.removeChild(elem);
}

exportBtn.onclick = async function() {
  const data = await loadData('friends', 'tags');
  serialize(data);
  download(data);

  const { numFriends, numTags } = getStats(data);
  showMessage(`exported ${numFriends} friends and ${numTags} tags.`);
}

importBtn.onclick = async function() {
  fileUpload.click();
}

upload.onchange = function(changeEvent) {
  const file = changeEvent.target.files[0];
  const reader = new FileReader();
  reader.onload = async function(readerEvent) {
    try {
      const data = JSON.parse(readerEvent.target.result);
      deserialize(data);
      await setData(data);

      const { numFriends, numTags } = getStats(data);
      showMessage(`imported ${numFriends} friends and ${numTags} tags.`);
    } catch (err) {
      showError(err);
    }
  }
  reader.readAsText(file);
}
