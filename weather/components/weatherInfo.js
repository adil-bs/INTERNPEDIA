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
    cloudBase:{
      unit:'m',
      availability: ['Avg','Min','Max'],
    },
    cloudCeiling:{
      unit:'m',
      availability: ['Avg','Min','Max'],
    },
    cloudCover:{
      unit:'okta',
      availability: ['Avg','Min','Max'],
    },
    dewPoint:{
      unit:'°C',
      availability: ['Avg','Min','Max'],
    },
    evapotranspiration:{
      unit:'mm/day',
      availability: ['Avg','Min','Max','Sum'],
    },
    freezingRainIntensity:{
      unit:'mm/h',
      availability: ['Avg','Min','Max'],
    },
    humidity:{
      unit:'%',
      availability: ['Avg','Min','Max'],
    },
    iceAccumulation:{
      unit:'mm',
      availability: ['Avg','Min','Max','Sum'],
    },
    iceAccumulationLwe:{
      unit:'mm',
      availability: ['Avg','Min','Max','Sum'],
    },
    precipitationProbability:{
      unit:'',
      availability: ['Avg','Min','Max'],
    },
    pressureSurfaceLevel:{
      unit:'hPa',
      availability: ['Avg','Min','Max'],
    },
    rainAccumulation: {
      unit:'mm',
      availability: ['Avg','Min','Max','Sum'],
    },
    rainAccumulationLwe: {
      unit:'mm',
      availability: ['Avg','Min','Max'],
    },
    rainIntensity:{
      unit:'mm/h',
      availability: ['Avg','Min','Max'],
    },
    sleetAccumulation:{
      unit:'mm',
      availability: ['Avg','Min','Max'],
    },
    sleetAccumulationLwe:{
      unit:'mm',
      availability: ['Avg','Min','Max','Sum'],
    },
    sleetIntensity:{
      unit:'mm/h',
      availability: ['Avg','Min','Max'],
    },
    snowAccumulation:{
      unit:'mm',
      availability: ['Avg','Min','Max'],
    },
    snowAccumulationLwe:{
      unit:'mm',
      availability: ['Avg','Min','Max','Sum'],
    },
    snowDepth:{
      unit:'cm',
      availability: ['Avg','Min','Max','Sum'],
    },
    snowIntensity:{
      unit:'mm/h',
      availability: ['Avg','Min','Max'],
    },
    temperatureApparent:{
      unit:'°C',
      availability: ['Avg','Min','Max'],
    },
    temperature:{
      unit:'°C',
      availability: ['Avg','Min','Max'],
    },
    uvHealthConcern:{
      unit:'',
      availability: ['Avg','Min','Max'],
    },
    uvIndex:{
      unit:'',
      availability: ['Avg','Min','Max'],
    },
    visibility:{
      unit:'m',
      availability: ['Avg','Min','Max'],
    },
    windDirection:{
      unit:'°',
      availability: ['Avg',],
    },
    windGust:{
      unit:'m/s',
      availability: ['Avg','Min','Max'],
    },
    windSpeed:{
      unit:'m/s',
      availability: ['Avg','Min','Max'],
    },
  }