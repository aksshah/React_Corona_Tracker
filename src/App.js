import {useEffect,useState} from 'react';
import { Cards, Charts, CountryPicker } from './components';
import styles from './App.module.css';
import {fetchData} from './api'; //when file is named index, file name can be omitted.

function App() {

  const [api_stats,setApiData] = useState([]);
  const [country,setCountry] = useState('');

  useEffect(() => {
    const fetchMyAPI = async () => {
      let stats = await fetchData();
      if(stats !== {})
      setApiData({...stats});
    }

    fetchMyAPI();
  },[]);

  const handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);
    setApiData({...fetchedData});
    setCountry(country);
  }

  return (
    <div className={styles.container}>
      <Cards stats={api_stats}/>
      <CountryPicker handleCountryChange={handleCountryChange}/>
      <Charts stats={api_stats} country={country}/> 
    </div>
  );
}

export default App;
