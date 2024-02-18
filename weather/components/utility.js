export const weatherCode = {
    "0"   : "Unknown",
    "1000": "Clear, Sunny",
    "1100": "Mostly Clear",
    "1101": "Partly Cloudy",
    "1102": "Mostly Cloudy",
    "1001": "Cloudy",
    "2000":"Fog",
    "2100":"Light Fog",
    "4000":"Drizzle",
    "4001":"Rain",
    "4200":"Light Rain",
    "4201": "Heavy Rain",
    "5000": "Snow",
    "5001": "Flurries",
    "5100": "Light Snow",
    "5101": "Heavy Snow",
    "6000": "Freezing Drizzle",
    "6001": "Freezing Rain",
    "6200": "Light Freezing Rain",
    "6201": "Heavy Freezing Rain",
    "7000": "Ice Pellets",
    "7101": "Heavy Ice Pellets",
    "7102": "Light Ice Pellets",
    "8000": "Thunderstorm",
}
export const weatherUnits = {
    temperature:'°C',
    temperatureApparent:'°C',
    windSpeed:'m/s',
    windGust:'m/s',
    windDirection:'°',
    humidity:'%',
    rainAccumulation: 'mm',
    rainAccumulationLwe: 'mm',
    rainIntensity:'mm/h',
    precipitationProbability:'',
    dewPoint:'°C',
    cloudBase:'m',
    cloudCeiling:'m',
    cloudCover:'okta',
    evapotranspiration:'mm/day',
    freezingRainIntensity:'mm/h',
    iceAccumulation:'mm',
    iceAccumulationLwe:'mm',
    pressureSurfaceLevel:'hPa',
    sleetAccumulation:'mm',
    sleetAccumulationLwe:'mm',
    sleetIntensity:'mm/h',
    snowAccumulation:'mm',
    snowAccumulationLwe:'mm',
    snowIntensity:'mm/h',
    visibility:'m',
}
export function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}
export function camelToCapital(camelCaseVariable) {
    return camelCaseVariable
      .split(/(?=[A-Z])|_+/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')
}
export const findDay=(isoDateString) => {
    return new Date(isoDateString).toLocaleString(undefined,{day:"2-digit"})
}