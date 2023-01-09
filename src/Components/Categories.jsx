import React from 'react'
import styled from 'styled-components'
// import {categories} from "../data";
import CategoryItem from './CategoryItem';
import { useState, useEffect } from "react";
import axios from 'axios'
import { mobile } from "../responsive";



const Container = styled.div`
display:flex;
padding:20px;
justify-content:space-between;
${mobile({padding: "0px", flexDirection:"column"})}
`
const Categories = () => {

  const [categories, setCategories]= useState([]);
  useEffect(()=>{

    const getCategories = async ()=> {
     try{
       const res = await axios.get("https://react-task-store-backend2.onrender.com/api/categories" );
     //  console.log(res);
     setCategories(res.data)
     } catch(err){

     }
    };
    getCategories()
 },)
  return (
    <Container>

        {categories.map(item=>(
            <CategoryItem item={item} key={item.id}/>
        ))}
    </Container>
  )
}

export default Categories