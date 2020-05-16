chrome.runtime.onInstalled.addListener(function () {

  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    let rule = {
      conditions: [
        new chrome.declarativeContent.PageStateMatcher({ pageUrl: { hostEquals: 'www.youtube.com' } }),
      ],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }
    chrome.declarativeContent.onPageChanged.addRules([rule]);
  });

});
