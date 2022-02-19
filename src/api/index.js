import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

export const fetchData = async (country) => {
    let dynamicUrl = url;
    if(country){
        dynamicUrl = `${url}/countries/${country}`
    }
    try{
        const {data: {confirmed, deaths, lastUpdate}} = await axios.get(dynamicUrl);
        return {confirmed,deaths,lastUpdate};
    }catch(error){
      return error;
    }
}

export const fetchDailyData = async () => {
    try {
    const { data } = await axios.get('https://api.covidtracking.com/v1/us/daily.json');

    return data.map(({ positive, recovered, death, dateChecked: date }) => ({ confirmed: positive, recovered, deaths: death, date }));
    } catch (error) {
      return error;
    }
}



export const fetchCountries = async () => {
    try {
      const { data: { countries } } = await axios.get(`${url}/countries`);
  
      return countries.map((country) => country.name);
    } catch (error) {
      return error;
    }
  };