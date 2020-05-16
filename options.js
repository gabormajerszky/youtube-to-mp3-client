function restorePassword() {
  let passwordInput = document.querySelector('#passwordInput');
  chrome.storage.local.get(['password'], function (result) {
    passwordInput.value = result.password;
  });
}

function setPassword() {
  let passwordInput = document.querySelector('#passwordInput');
  chrome.storage.local.set({
    password: passwordInput.value
  });
  let resultDiv = document.querySelector('#resultDiv');
  resultDiv.innerText = 'Password set!';
}

document.addEventListener('DOMContentLoaded', restorePassword);
document.querySelector('#setButton').addEventListener('click', setPassword);
