class Utilities {

    createElement(type, className, html) {
        let newElement = document.createElement(type);
    
        newElement.className = className;
        newElement.innerHTML = html;
    
        return newElement;
    }
    
    createUrl(className, html, href) {
        let newElement = document.createElement("a");
    
        newElement.className = className;
        newElement.innerHTML = html;
        newElement.href = href;
        newElement.target = "_blank";
    
        return newElement;
    }

    createImage(src) {
        let newElement = document.createElement("img");
    
        newElement.src = src;
    
        return newElement;
    }
    
    decodeHtml(html) {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }

    //https://css-tricks.com/snippets/javascript/get-url-variables/
    getQueryVariable(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split("&");

        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if(pair[0] === variable){return pair[1];}
        }
        
        return(false);
    }

    addEvent(element, className) {
        element.addEventListener("click", function(){
            if (element.classList.contains(className)) {
                element.classList.remove(className);
            } else {
                element.classList.add(className);
            }

            let selected = document.getElementsByClassName(className);

            let filters = document.getElementById("filter");

            if (selected.length > 0) {
                filters.classList.replace("hide", "show");
            } else {
                filters.classList.replace("show", "hide");
            }
        });

        return element;
    }
}

export default Utilities