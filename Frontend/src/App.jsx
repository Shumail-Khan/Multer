import Form from './components/Form'
import {Route, Routes} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Entry from './components/Entry'
import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [data, setData] = useState([]);
  const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/forms');
            setData(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
  return (
    <div>
      <Navbar />
      <Routes>
          <Route path='/' element={<Home data={data} fetchData={fetchData}/>} />
          <Route path='/form' element={<Form fetchData={fetchData}/>} />
          <Route path='/:id' element={<Entry data={data}/>} />
      </Routes>
    </div>
  )
}

export default App
