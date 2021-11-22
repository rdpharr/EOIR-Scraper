var activeTab;
var courtData = [];

/* test Numbers
220567516
220571948
220449433
*/

// TODO: add retry loop
// TODO: try/catch

document.addEventListener("click", async (e) => {
  if (e.target.id === "tabs-create") {
    createTab();
    document.getElementById('status').innerHTML = "Tab ready!";
  } else if (e.target.id === "go-button") {
    scrapeAll();
  };
});

function createTab() {
  browser.tabs.create({
    url: "https://portal.eoir.justice.gov/InfoSystem"
  }).then(async (tab) => {
    //success
    await timeout(2000);
    activeTab = tab.id
  }, (error)=>onError(error));
}

async function scrapeAll() {
  courtData = [];
  const numberText = document.querySelector("#numbers").value;
  const numbers = numberText.split("\n");
  for (item of numbers) {
    item = item.replace("-",""); // remove dashes from string
    console.log(item);
    await scraper(item);
  }
  console.log(courtData);
  download("results.csv", courtData);
  document.getElementById('status').innerHTML = "Done!";
}

async function scraper(aNumber) {
  await timeout(2000);
  document.getElementById('status').innerHTML = "Starting " + aNumber;
  browser.tabs.sendMessage(
    tabId = activeTab,
    message = {
      command: "search",
      aNumber: aNumber
    }).catch(onError);
  await timeout(2000);
  await browser.tabs.sendMessage(
    tabId = activeTab,
    message = {
      command: "scrape"
    }).then(response => {
    console.log(response);
    courtData.push(response);
  }).catch(onError);
}

function download(filename, courtData) {
  //convert to csv
  keys = Object.keys(courtData[0]);
  result = "";
  result += keys.join(",");
  result += "\n";
  courtData.forEach(item => {
    ctr = 0;
    keys.forEach(key => {
      if (ctr > 0) result += ",";
      result += "\"" + item[key] + "\""
      ctr++;
    })
    result += "\n";
  })

  // download file
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/csv;charset=UTF-8,' + encodeURIComponent(result));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

async function timeout(millis) {
  await new Promise(r => setTimeout(r, millis));
}
function onError(error){
  console.log(error);
}
