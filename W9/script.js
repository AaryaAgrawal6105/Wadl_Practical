function getWeather() {
    let city = document.getElementById("city").value;

    fetch("data.json")
        .then(res => res.json())
        .then(data => {
            if (data[city]) {
                let w = data[city];
                document.getElementById("result").innerHTML =
                    `Temp: ${w.temp}°C <br> Humidity: ${w.humidity}% <br> Condition: ${w.condition}`;
            } else {
                document.getElementById("result").innerText = "City not found";
            }
        });
}