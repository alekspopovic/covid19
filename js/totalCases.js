var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

const apiEndpoint = "https://corona.lmao.ninja/v2/all";
  
fetch(apiEndpoint, requestOptions)
.then(response => response.text())
.then(result => {
    let totalCasesDiv = document.getElementById("totalCases");

    let data = JSON.parse(result);

    let cases = data.cases;
    let deaths = data.deaths;
    let recovered = data.recovered;

    let deathRate = (deaths / (cases + deaths + recovered)) * 100;
    let deathRateRounded = deathRate.toFixed(2);

    let dataText = `<h2>Global Data</h2>
                    <p>Cases: ${cases.toLocaleString()}</p>
                    <p>Deaths: ${deaths.toLocaleString()}</p>
                    <p>Recovered: ${recovered.toLocaleString()}</p>
                    <p>Death rate: ${deathRateRounded}%</p>`;
    
    totalCasesDiv.innerHTML = dataText;
})
.catch(error => {
    console.log('error', error);

    let news = document.getElementsByClassName("news")[0];
    news.innerHTML = "There was an error while retrieving data. Please try again. " + error;
});