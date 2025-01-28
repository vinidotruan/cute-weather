const url = "https://api.open-meteo.com/v1/forecast?latitude=-29.7603&longitude=-51.1472&current=temperature_2m,apparent_temperature,weather_code&forecast_days=1";

const client = new tmi.Client({
	channels: [ 'vinidotruan' ],
});

client.connect();

client.on('message', (channel, tags, message, self) => {
  if (message === "!tempo" || message === "!weather") {
    loadWeather();
  }
});

function loadWeather() {
  fetch(url)
    .then(r => r.json())
    .then(r => {
      const { current } = r;
      const currentTemp = current.temperature_2m;
      const weather_code = current.weather_code;

      const image = document.querySelector("#image");
      let src = "";

      if (weather_code === 0 ) {
        src = "assets/tempo-limpo.gif";
      } else if ([1, 2, 3].indexOf(weather_code) !== -1) {
        src = "assets/nublado.gif";
      } else if ([51, 53, 55].indexOf(weather_code) !== -1) {
        src = "assets/chuva-leve.gif";
      } else if ([61, 63, 65, 95].indexOf(weather_code) !== -1) {
        src = "assets/chuva-forte.gif";
      } else {
        src = "assets/tempo-limpo.gif";
      }
      image.src = src;

      const temp = document.querySelector("#temp");
      temp.innerText = `${currentTemp} °C`;
      console.log("Teste");
    });
}

loadWeather();
