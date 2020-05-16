document.addEventListener('DOMContentLoaded', function () {
  let downloadButton = document.querySelector('#downloadButton');
  downloadButton.addEventListener('click', onDownload);

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'findVideoTitle' }, function (response) {
      let titleInput = document.querySelector('#titleInput');
      titleInput.value = response.title;
    });
  });
});

function onDownload() {
  let statusDiv = document.querySelector('#statusDiv');
  chrome.tabs.query({ active: true }, function (tabs) {
    let url = tabs[0].url;
    let [baseUrl, videoId] = url.split('https://www.youtube.com/watch?v=');
    let title = document.querySelector('#titleInput').value;
    if (videoId && title) {
      chrome.storage.local.get(['password'], function (result) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
          if (xhr.readyState == XMLHttpRequest.DONE) {
            statusDiv.innerText = 'Download finished';
          }
        }
        xhr.open('POST', 'https://maniacfish.com:8443/getmp3', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({
          videoId: videoId,
          password: result.password,
          fileName: title
        }));
        statusDiv.innerText = 'Downloading...';
      });

    }
  });
}
