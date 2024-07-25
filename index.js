import getArgs from './helpers/args.js'
import { getWeather, getIcons} from './services/api.service.js'
import { printError, printSuccess, printHelp, printWeather } from './services/log.service.js'
import { getKeyValue, saveKeyValue, TOKEN_DICTIONARY } from './services/storage.service.js'

const saveToken = async token => {
    if (!token.length) {
        printError(`Doesn't exist`)
        return
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token)
        printSuccess('Token was Saved')
    } catch (error) {
        printError(error.message)
    }

}

const saveCity = async city => {
    if (!city.length) {
        printError(`City doesn't exist`)
        return
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.city, city)
        printSuccess('City was Saved')
    } catch (error) {
        printError(error.message)
    }

}

const getForecast = async () => {
    try {
        const city = process.env.CITY ?? (await getKeyValue(TOKEN_DICTIONARY.city))
        const response = await getWeather(city)
        printWeather(response, getIcons(response.weather[0].icon))
    } catch (error) {
        if (error?.response?.status == 404) {
            printError('City not found')
        }
        else if (error?.response?.status == 401) {
            printError('Invalid token')
        }
        else{
            printError(error.message)
        }
    }

}

const startCli = () => {
    const args = getArgs(process.argv)
    if (args.h) {
        return printHelp()
    }
    if (args.s) {
        return saveCity(args.s)
    }
    if (args.t) {
        return saveToken(args.t)
    }
    return getForecast()
}

startCli()