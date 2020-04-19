import Utilities from "./Utilities.js";

let utilities = new Utilities();

var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
fetch("https://www.who.int/feeds/entity/csr/don/en/rss.xml", requestOptions)
.then(response => response.text())
.then(result => {
    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(result,"text/xml");

    let news = document.getElementsByClassName("news")[0];

    let nodes = xmlDoc.getElementsByTagName("item");
    let url, title, content, date;
    let newsItemDiv, urlDiv, titleDiv, contentDiv, dateDiv;

    for (let i = 0; i < nodes.length ;i++) {
        let innerNodes = nodes[i].childNodes;
        
        url = innerNodes[3].innerHTML;
        title = innerNodes[1].innerHTML;
        content = innerNodes[5].innerHTML;
        date = innerNodes[11].innerHTML;

        newsItemDiv = utilities.createElement("div", "newsItem", "");
        urlDiv = utilities.createUrl("url", "Read more", url);
        titleDiv = utilities.createElement("h3", "title", title);
        contentDiv = utilities.createElement("div", "content", utilities.decodeHtml(content));

        let dateParts = date.split(' ');
        let formattedDate = dateParts[0] + " " + dateParts[1] + " " + dateParts[2];

        dateDiv = utilities.createElement("div", "date", formattedDate);

        newsItemDiv.appendChild(titleDiv);
        newsItemDiv.appendChild(dateDiv);
        newsItemDiv.appendChild(contentDiv);
        newsItemDiv.appendChild(urlDiv);

        news.appendChild(newsItemDiv);
    }
})
.catch(error => {
    console.log('error', error);

    let news = document.getElementsByClassName("news")[0];
    news.innerHTML = "There was an error while retrieving the news. Please try again. " + error;
});