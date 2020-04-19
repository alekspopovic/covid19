import Utilities from "./Utilities.js";

let utilities = new Utilities();

var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
fetch("https://www.who.int/rss-feeds/news-english.xml", requestOptions)
.then(response => response.text())
.then(result => {
    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(result,"text/xml");

    let news = document.getElementsByClassName("news")[0];

    let nodes = xmlDoc.getElementsByTagName("item");
    let url, title, description, content, date;
    let newsItemDiv, urlDiv, titleDiv, contentDiv, dateDiv;

    for (let i = 0; i < nodes.length ;i++) {
        let innerNodes = nodes[i].childNodes;
        
        url = innerNodes[1].innerHTML;
        title = innerNodes[3].innerHTML;
        description = innerNodes[4].innerHTML;
        date = innerNodes[5].innerHTML;

        if (innerNodes.length > 6) {
            content = innerNodes[6].innerHTML;
        } else {
            content = "";
        }
        
        let fullContent;

        fullContent = description;

        // if (content) {
        //     fullContent = content;
        // } else {
        //     fullContent = description;
        // }

        newsItemDiv = utilities.createElement("div", "newsItem", "");
        urlDiv = utilities.createUrl("url", "Read more", url);
        titleDiv = utilities.createElement("h3", "title", title);
        contentDiv = utilities.createElement("div", "content", utilities.decodeHtml(fullContent));

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