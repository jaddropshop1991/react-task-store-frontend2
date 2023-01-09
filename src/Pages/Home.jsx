
import React from 'react'
import Announcement from '../Components/Announcement'
import Categories from '../Components/Categories'
import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'
import NewsLetter from '../Components/NewsLetter'

import Products from '../Components/Products'
import Slider from '../Components/Slider'
import Cart from './Cart'
import Login from './Login'
import Product from './Product'
import ProductList from './ProductList'
import Register from './Register'

const Home = () => {
  return (

    <div>
            <Announcement></Announcement>
            <Navbar/>
          <Slider/>
          <Categories/>
        <Products/>
        <NewsLetter/>
        <Footer/>
    </div>

    //<ProductList/>

     //<Product/>
//<Register/>
//<Login/>
//<Cart/>
  )
}

export default Home
