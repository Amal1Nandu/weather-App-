import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const apiKey = "9b4089fd8107834f5a822f0cda7aae1e";

app.get("/", async (req, res) => {
    try {
        const response = await axios.get(
            "https://api.openweathermap.org/data/3.0/weather?q={city name}&limit={limit}&appid={API key}"
        );
        const result = response.data;
        res.render("index.ejs", { data: result });
    } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {
            error: error.message,
        });
    }
    
});

app.post("/get_weather", async (req, res) => {
    const city = req.body.city_search;
    const URL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    try {
        const response = await axios.get(URL);
        const result = response.data;
        // fetching climate
        const climate = result.weather[0].main;
        //fetching climate from API
        const weatherCondition = result.weather[0].main.toLowerCase();
        let weatherImages = "";

        // selcting based on climate

        switch (weatherCondition) {
            case "clear":
                weatherImages = "clear.jpg";
                break;

            case "clouds":
                weatherImages = "cloud.jpg";
                break;

            case "rain":
                weatherImages = "rain.jpg";
                break;

            case "snow":
                weatherImages = "snow.jpg";
                break;

            case "thunderstorm":
                weatherImages = "thunder.jpg";
                break;

            case "mist":
                weatherImages = "mist.jpg";
                break;

            case "fog":
                weatherImages = "fog.jpg";
                break;

            case "haze":
                weatherImages = "haze.jpg";
                break;

            default:
                weatherImages = "clear.jpg";
                break;
        }
        let temp = Math.floor(result.main.temp - 273.15);
        let wind = result.wind.speed;
        let humidity = result.main.humidity;
        res.render("index.ejs", {
            data: result,
            temperature: temp,
            wind: wind,
            humidity: humidity,
            weatherImages: weatherImages,
            climate: climate,
        });
    } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {
            error: error.message,
        });
    }
    
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

