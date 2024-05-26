let btnSearch = document.querySelector(".btn-search");
let inputSearch = document.querySelector(".input-search");
let btnRefresh = document.querySelector(".btn-refresh");
let displayContainer = document.querySelector(".display-container");
let spinner = document.querySelector(".loading");
let error = document.querySelector(".error");

// adding event listener for buttons through document for updating weather

btnSearch.addEventListener("click", (e) => {
  e.preventDefault();
  if (inputSearch.value == "") {
    alert("please enter the city to search");
  } else {
    spinner.classList.add("active");
    setTimeout(() => {
      spinner.classList.remove("active");
    }, 1000);
    updateData(inputSearch.value);
    inputSearch.value = "";
    inputSearch.select();
  }
});
document.addEventListener("keyup", (e) => {
  if (e.key == "Enter") {
    if (inputSearch.value == "") {
      alert("please enter the city to search");
    } else {
      spinner.classList.add("active");
      setTimeout(() => {
        spinner.classList.remove("active");
      }, 1000);
      updateData(inputSearch.value);
      inputSearch.value = "";
    }
  }
});

document.addEventListener("click", (e) => {
  e.preventDefault();
  error.classList.remove("active");
  if (e.target.dataset.set) {
    let city = document.querySelector(".city");
    if (city.innerText == "--") {
      alert("please enter the city to search");
    } else {
      spinner.classList.add("active");
      setTimeout(() => {
        spinner.classList.remove("active");
      }, 1000);
      updateData(city.innerText);
    }
  }
});

// creating async function for fetching from api
async function updateData(x) {
  const apiKey = "4b7785a250f1411bdf9231d5aa77abbb";
  let location = x;
  
  await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.cod == "404") {
        alert("kindly enter valid city");
      } else {
        let cityName = data.name;
        let displayTemp = data.main.temp;
        let condition = data.weather[0].main;
        let feltTemp = data.main.feels_like;
        let humidity = data.main.humidity;
        let wind = data.wind.speed;
        let visibility = data.visibility / 1000;
        let maxTemp = data.main.temp_max;
        let minTemp = data.main.temp_min;
        // weather input
        let cityDOM = document.querySelector(".city");
        let displayTempDOM = document.querySelector(".display-temp");
        let conditionDOM = document.querySelector(".condition");
        let feltTempDOM = document.querySelector(".feltTemp");
        let humidityDOM = document.querySelector(".humidity");
        let windDOM = document.querySelector(".wind");
        let visibilityDOM = document.querySelector(".visibility");
        let maxTempDOM = document.querySelector(".maxTemp");
        let minTempDOM = document.querySelector(".minTemp");
        cityDOM.innerText = cityName;
        displayTempDOM.innerHTML = `${displayTemp}&#x2103`;
        conditionDOM.innerText = condition;
        feltTempDOM.innerHTML = `${feltTemp}&#x2103`;
        humidityDOM.innerText = humidity;
        windDOM.innerText = `${wind} Km/h`;
        visibilityDOM.innerText = `${visibility} Km`;
        maxTempDOM.innerHTML = `${maxTemp}&#x2103`;
        minTempDOM.innerHTML = `${minTemp}&#x2103`;
        if (condition == "Haze") {
          document.body.className =
            "bg-primary d-flex align-items-center justify-content-center haze";
        } else if (condition == "Clouds") {
          document.body.className =
            "bg-primary d-flex align-items-center justify-content-center cloud";
        } else if (condition == "Clear") {
          document.body.className =
            "bg-primary d-flex align-items-center justify-content-center clear";
        } else if (condition == "Rain") {
          document.body.className =
            "bg-primary d-flex align-items-center justify-content-center rain";
        } else if (condition == "Mist") {
          document.body.className =
            "bg-primary d-flex align-items-center justify-content-center mist";
        }
      }
    })
    .catch((error) => {
      console.log(error);
    });
}