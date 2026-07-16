const USERNAME = "thamilton12";
const COUNTRY_CODE = "US";

const init = () => {
  "use strict";

  let weatherButton = document.querySelector("#getWeather");
  weatherButton.addEventListener("click", getLocation);
};

const getWeather = (lat, lng) => {
  "use strict";

  let url = `https://secure.geonames.org/findNearByWeatherJSON?username=${USERNAME}&lat=${lat}&lng=${lng}`;

  let xhr = new XMLHttpRequest();

  xhr.open("get", url);

  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4) {
      let data = JSON.parse(xhr.responseText);
      let tempC = data.weatherObservation.temperature;
      let tempF = (tempC * (9 / 5) + 32).toFixed(0);
      let windSpeedK = data.weatherObservation.windSpeed;
      let windSpeedMph = (windSpeedK * 1.150779).toFixed(0);
      console.log(`Temp C: ${tempC}`);
      console.log(`Temp F: ${tempF}`);
      console.log(`Wind Speed K: ${windSpeedK}`);
      console.log(`Wind Speed MPH: ${windSpeedMph}`);

      let tableElement = document.createElement("table");
      tableElement.setAttribute("id", "wthTbl");

      let trTempF = document.createElement("tr");
      trTempF.setAttribute("id", "tempF");

      let trWindSpd = document.createElement("tr");
      trWindSpd.setAttribute("id", "windSpd");

      let tdTempF = document.createElement("td");
      tdTempF.innerHTML = `<h3>${tempF}° F</h3>`;
      if (Number(tempF) > 82) {
        tdTempF.innerHTML += `<img src="icons/hot_2699935.png" style="width: 10%; height: auto;">`;
      }
      if (Number(tempF) < 35) {
        tdTempF.innerHTML += `<img src="icons/cold-temperature_13405962.png" style="width: 10%; height: auto;">`;
      }

      let tdWindSpd = document.createElement("td");
      tdWindSpd.innerHTML = `<h3>Wind Speed: ${windSpeedMph} mph</h3>`;
      if (Number(windSpeedMph) > 15) {
        tdWindSpd.innerHTML += `<img src="icons/wind_439440.png" style="width: 10%; height: auto;">`;
      }

      trTempF.appendChild(tdTempF);
      trWindSpd.appendChild(tdWindSpd);
      tableElement.appendChild(trWindSpd);
      tableElement.insertBefore(trTempF, trWindSpd);

      document.body.appendChild(tableElement);
    }
  };

  xhr.send(null);
};

const getLocation = () => {
  "use strict";

  let oldLocTable = document.getElementById("locTbl");
  if (oldLocTable) {
    let oldLocTableParent = oldLocTable.parentNode;
    oldLocTableParent.removeChild(oldLocTable);
  }
  let oldWthTable = document.getElementById("wthTbl");
  if (oldWthTable) {
    let oldWthTableParent = oldWthTable.parentNode;
    oldWthTableParent.removeChild(oldWthTable);
  }

  let postalCode = document.getElementById("zip").value;
  let url = `https://secure.geonames.org/postalCodeSearchJSON?username=${USERNAME}&postalcode=${postalCode}&country=${COUNTRY_CODE}`;
  document.getElementById("zip").value = "";
  let xhr = new XMLHttpRequest();

  xhr.open("get", url);

  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4) {
      let data = JSON.parse(xhr.responseText);
      let lat = data.postalCodes[0].lat;
      let lng = data.postalCodes[0].lng;
      let city = data.postalCodes[0].placeName;
      let state = data.postalCodes[0].adminName1;
      console.log(`Where: ${city}, ${state}, ${postalCode}`);
      console.log(`Latitude: ${lat}, Longitude: ${lng}`);
      getWeather(lat, lng);

      let tableElement = document.createElement("table");
      tableElement.setAttribute("id", "locTbl");

      let trLoc = document.createElement("tr");
      trLoc.setAttribute("id", "location");

      let trLatLng = document.createElement("tr");
      trLatLng.setAttribute("id", "latlng");

      let tdLoc = document.createElement("td");
      tdLoc.innerHTML = `Location: ${city}, ${state}, ${postalCode}`;

      let tdLatLng = document.createElement("td");
      tdLatLng.innerHTML = `Latitude: ${lat}, Longitude: ${lng}`;

      trLoc.appendChild(tdLoc);
      trLatLng.appendChild(tdLatLng);
      tableElement.appendChild(trLatLng);
      tableElement.insertBefore(trLoc, trLatLng);

      document.body.appendChild(tableElement);
    }
  };

  xhr.send(null);
};

window.onload = init;
