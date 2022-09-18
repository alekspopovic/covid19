import Utilities from "./Utilities.js";

let utilities = new Utilities();
let data;

let countries = utilities.getQueryVariable("countries");
let lastDays = utilities.getQueryVariable("lastDays");
let cases = utilities.getQueryVariable("cases");
let deaths = utilities.getQueryVariable("deaths");
let recovered = utilities.getQueryVariable("recovered");

let countryListTrimmed = false;

getHistoricalData();

async function getHistoricalData() {
  if (queryHasNoParameters()) {
    return;
  }

  if (!countries) {
    return;
  }

  showLegend();

  let maxCountries = getMaxNumberOfCountries();

  if (maxCountries === 0) {
    return;
  }

  countries = trimCountries(maxCountries);

  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  let queryUrl = `https://disease.sh/v3/covid-19/historical/${countries}`;

  https: if (lastDays) {
    queryUrl = `${queryUrl}?lastdays=${lastDays}`;
  }

  fetch(queryUrl, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      data = JSON.parse(result);

      if (data) {
        let hasValidData = verifyData(data);

        if (!hasValidData) {
          updateLegendWithIncorrectData();
          return;
        }

        createChart(data);

        showChart();

        updateLegend();
      }
    })
    .catch((error) => {
      console.log("error", error);

      let news = document.getElementsByClassName("news")[0];
      news.innerHTML =
        "There was an error while retrieving data. Please try again. " + error;
    });
}

function createChart(countryData) {
  if (countryData) {
    let dateLabels = getDateLabels(countryData);

    let casesData = getCasesPerCountry(countryData);

    let chartLabels = getChartLabelsPerCountry(countryData);

    var chartData = {
      labels: dateLabels,
      series: casesData,
    };

    var plugins = {
      fullWidth: true,
      chartPadding: {
        right: 40,
      },
      plugins: [
        Chartist.plugins.legend({
          legendNames: chartLabels,
          clickable: true,
        }),
      ],
    };

    new Chartist.Line(".ct-chart", chartData, plugins);
  }
}

function getDateLabels(countryData) {
  if (Array.isArray(countryData)) {
    return Object.keys(countryData[0].timeline.cases);
  }

  return Object.keys(countryData.timeline.cases);
}

function getCasesPerCountry(countryData) {
  let casesData = new Array();

  if (!cases && !deaths && !recovered) {
    cases = true;
  }

  if (Array.isArray(countryData)) {
    countryData.forEach((country) => {
      let timeline = country.timeline;

      if (cases) {
        casesData.push(Object.values(timeline.cases));
      }

      if (deaths) {
        casesData.push(Object.values(timeline.deaths));
      }

      if (recovered) {
        casesData.push(Object.values(timeline.recovered));
      }
    });

    return casesData;
  }

  let timeline = countryData.timeline;

  if (cases) {
    casesData.push(Object.values(timeline.cases));
  }

  if (deaths) {
    casesData.push(Object.values(timeline.deaths));
  }

  if (recovered) {
    casesData.push(Object.values(timeline.recovered));
  }

  return casesData;
}

function getChartLabelsPerCountry(countryData) {
  let chartLabels = new Array();

  if (Array.isArray(countryData)) {
    countryData.forEach((country) => {
      let countryName = country.country;

      if (cases) {
        chartLabels.push(`${countryName} (cases)`);
      }

      if (deaths) {
        chartLabels.push(`${countryName} (deaths)`);
      }

      if (recovered) {
        chartLabels.push(`${countryName} (recovered)`);
      }
    });

    return chartLabels;
  }

  let countryName = countryData.country;

  if (cases) {
    chartLabels.push(`${countryName} (cases)`);
  }

  if (deaths) {
    chartLabels.push(`${countryName} (deaths)`);
  }

  if (recovered) {
    chartLabels.push(`${countryName} (recovered)`);
  }

  return chartLabels;
}

function queryHasNoParameters() {
  return !countries && !lastDays && !cases && !deaths && !recovered;
}

function showLegend() {
  let legend = document.getElementById("legend");
  legend.classList.remove("hideLegend");
}

function showChart() {
  let legend = document.getElementById("chart");
  legend.classList.remove("hideChart");
}

function updateLegend() {
  let legendDiv = document.getElementById("legend");

  let listOfCountries = countries.toUpperCase().replace(/,/g, ", ");
  listOfCountries = listOfCountries.replace(/%20/g, " ");

  let numberOfDays = "30";

  let countryListWasTrimmedText = "";

  if (countryListTrimmed) {
    countryListWasTrimmedText =
      "<p>Country list has been trimmed to fit the maximum number of chart entries (15).</p>";
  }

  if (lastDays) {
    numberOfDays = lastDays;
  }

  legendDiv.innerHTML = `<p>Showing historical data for the last ${numberOfDays} days for countries: ${listOfCountries}.</p>
                            ${countryListWasTrimmedText}
                            <p>Click on a country's data label below to toggle data on or off.</p>`;
}

function verifyData(data) {
  let result = true;

  if (Array.isArray(data)) {
    for (let country of data) {
      if (!country.timeline) {
        result = false;
        break;
      }
    }

    return result;
  }

  if (!data.timeline) {
    result = false;
  }

  return result;
}

function updateLegendWithIncorrectData() {
  let legendDiv = document.getElementById("legend");

  legendDiv.innerHTML = `<p>Historical data for one or more countries is currently not available.</p>`;

  legendDiv.classList.add("removeMarginBottom");
}

function getMaxNumberOfCountries() {
  let counter = 0;
  let maxCountries = 0;

  if (cases) {
    counter++;
  }

  if (recovered) {
    counter++;
  }

  if (deaths) {
    counter++;
  }

  if (counter === 0) {
    counter = 1;
  }

  if (counter === 1) {
    maxCountries = 15;
  } else if (counter === 2) {
    maxCountries = 7;
  } else if (counter === 3) {
    maxCountries = 5;
  }

  return maxCountries;
}

function trimCountries(maxCountries) {
  let individualCountries = countries.split(",");

  if (individualCountries.length > maxCountries) {
    individualCountries.length = maxCountries;
    countryListTrimmed = true;
  }

  return individualCountries.join(",");
}
