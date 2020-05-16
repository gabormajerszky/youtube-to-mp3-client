chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'findVideoTitle') {
    let titleElement = document.querySelector('#container > h1 > yt-formatted-string');
    let titleText = titleElement ? titleElement.innerHTML : '';
    sendResponse({
      title: titleText
    });
  }
});

function setPassword() {
  console.log('Setting password...');
}