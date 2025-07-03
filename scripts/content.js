"TODO: Comments, BUG whenever clicking a new video in yt, data doesnt refresh"

/**
 * class Scrapebot from ./utils/scrape.js
 */

// when the signal is recieved from the popup script, we scrape the website for metadata
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request["RetrieveMetaData"])
    {
        const ScrapeMetaData = new ScrapeBot()
        const MetaDataOfPage = ScrapeMetaData.generateMetaData()
        console.log(MetaDataOfPage, "Sent from Content Script")
        sendResponse({MetaData: MetaDataOfPage});
    }
    return true
  }
);

// Testing debug stuff here
console.log("Hello World Content Script")
const test = new ScrapeBot()
test.schemas.forEach((schem) => {console.log("Cite Schema", schem)})
