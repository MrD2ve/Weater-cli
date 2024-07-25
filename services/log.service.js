import chalk from "chalk";
import dedent from "dedent-js";
const printError = (error) => {
    console.log(chalk.bgRed('ERROR') + " " + error);
}

const printSuccess = (message) => {
    console.log(chalk.bgGreen('Success') + " " + message);
}

const printHelp = () => {
    console.log(dedent`
        ${chalk.cyan('HELP')}    
        -s [CITY] for install city
        -h for help
        -t [API_KEY] for saving token
        `);
}

const printWeather = (responce, icon) => {
    console.log(dedent`
        ${chalk.yellowBright('WEATHER')} City weather ${responce.name}
        ${icon} ${responce.weather[0].description}
        Temperature: ${responce.main.temp} (feels like ${responce.main.feels_like})
        Humidity: ${responce.main.humidity}%
        Wind speed: ${responce.wind.speed}
        `);
}

export { printError, printSuccess, printHelp, printWeather }
