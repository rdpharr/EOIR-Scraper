
/*
eeyore.js: this file is loaded into the target webpage and interacts directly
with its elements. communicates with the sidebar via `browser.runtime.onMessage`
*/
(function() {
  console.log('Starting Eeyore Script!');
  //Listen for messages from the background script.
  browser.runtime.onMessage.addListener((message) => {
    if (message.command === "search") {
      search(message.aNumber);
    } else if (message.command === "scrape") {
      return Promise.resolve(getData());
    }
  });

  function search(aNumber) {
    // console.log('Searching:', aNumber);
    var inputNumber = document.getElementById('AlienNumber');
    inputNumber.value = aNumber;

    var btnSubmit = document.getElementById('rcpButton');
    btnSubmit.click();
  }

  function getData() {
    const data = {
      name: document.querySelector("#alienid > span:nth-child(2)").textContent.trim(),
      aNumber: document.querySelector("#alienid > span:nth-child(5)").textContent.trim(),
      nextHearing: document.querySelector("#NextHearingBox > div:nth-child(2) > div:nth-child(1)").textContent.trim(),
      judge: document.querySelector("div.row:nth-child(4) > div:nth-child(2)").textContent.trim(),
      courtAddress: document.querySelector("#NextHearingBox > div:nth-child(2) > div:nth-child(5) > div:nth-child(2)").textContent.trim(),
      decisionInfo: document.querySelector("#DecisionBox > div:nth-child(2)").textContent.trim(),
      caseAppealInfo: document.querySelector("#AppealBox > div:nth-child(2)").textContent.trim(),
      contactAddress: document.querySelector("#ContactBox > div:nth-child(2) > div:nth-child(5) > div:nth-child(2)").textContent.trim(),
      contactPhone: document.querySelector("div.row:nth-child(6) > div:nth-child(2)").textContent.trim(),
    }
    var backButton = document.getElementsByClassName("backButton")[0];
    backButton.click();
    return data;
  }
})();
