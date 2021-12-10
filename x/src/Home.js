import React from 'react'
import axios from 'axios'

const Home = () => {
    axios.get(`http://localhost:4000/api/v1/home`)
    return (
        <div>
          Vidno vsem uporabnikom, za nadaljevnje stisni v zgornjem oknu Login
        </div>
        
    )
}

export default Home
