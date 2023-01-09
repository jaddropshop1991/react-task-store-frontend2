import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Announcement from '../Components/Announcement'
import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'
import NewsLetter from '../Components/NewsLetter'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { mobile } from "../responsive";
import { useLocation } from 'react-router-dom';
import { publicRequest } from '../requestMethods'
import { addProduct } from '../redux/cartRedux'
import { useDispatch } from 'react-redux'

const Container = styled.div`

`

const Wrapper = styled.div`
padding: 50px;
display: flex;
${mobile({padding: "10px", flexDirection:"column"})}
`
const ImageContainer = styled.div`
flex:1;
`
const Image = styled.img`
  width: 100%;
  height: 90vh;
 
  ${mobile({ height: "50vh" })}
`
const InfoContainer = styled.div`
flex:1;
padding: 0px 50px;
${mobile({padding: "10px"})}
`

const Title = styled.div`
font-size:25px;
font-weight:300;
`
const Desc = styled.div`
margin: 20px 0px;
`
const Price = styled.div`

font-size:35px;
font-weight:200;
`

const FilterContainer = styled.div`
width: 50%;
margin: 30px 0px;
display: flex;
justify-content: space-between;
${mobile({width: "100%"})}
`;
const Filter = styled.div`
display:flex;
align-items:center;
`;
const FilterTitle = styled.span`

font-size:20px;
font-weight:200;
`;
const FilterColor = styled.div`
width: 20px;
height: 20px;
border-radius: 50%;
background-color: ${props=>props.color};
margin:0px 4px;
cursor:pointer;
`;
const FilterSize = styled.select`
margin-left:10px;
padding: 5px;

`;
const FilterOption = styled.option``;

const AddContainer = styled.div`
width:50%;
display:flex;
align-items:center;
justify-content:space-between ;
${mobile({width: "100%"})}
`;
const AmountContainer = styled.div`
display: flex;
align-items:center ;
font-weight: 700;
`;
const Amount = styled.span`
width: 30px;
height: 30px;
border-radius:10px;
border:1px solid teal;
display: flex;
align-items: center;
justify-content: center;
margin:0px 5px ;
`;
const Button = styled.button`
padding: 15px;
border:2px solid teal ;
background-color:white ;
cursor:pointer ;
font-weight: 500;

&:hover{
    background-color:#f8f4f4 ;
}
`;


const Product = () => {

const location = useLocation();
    const id = location.pathname.split("/")[2];
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [color, setColor]= useState("");
    const [size, setSize] = useState("");
    const dispatch = useDispatch()

    useEffect(()=>{
      const getProduct = async ()=> {
        try{
          const res = await publicRequest.get("/products/find/"+id);
          setProduct(res.data);
        } catch(err){

        }
      }
      getProduct()
    }, [id])

    const handleQuantity = (type) => {
      if (type === "dec") {
        quantity > 1 && setQuantity(quantity - 1);
      } else {
        setQuantity(quantity + 1);
      }
    };

    const handleClick = () => {
      //update cart
      dispatch(
    //  addProduct({product, quantity, price: product.price * quantity})
    addProduct({...product, quantity, color, size})
      );
    }
  return (
    <Container>

        <Navbar/>
        <Announcement/>
        <Wrapper>
            <ImageContainer>
                <Image src={product.img}/>
            </ImageContainer>

            <InfoContainer>
                <Title>{product.title}</Title>
                <Desc>{product.desc}</Desc>
                <Price>{product.price} $</Price>
                <FilterContainer>
                    <Filter>
                        <FilterTitle>Color</FilterTitle>
                        {product.color?.map((c) => (
                <FilterColor color={c} key={c} onClick={()=>setColor(c)}/>
              ))}
                  
                    
                    </Filter>


                    <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize onChange={(e) => setSize(e.target.value)}>
                {product.size?.map((s) => (
                  <FilterOption key={s}>{s}</FilterOption>
                ))}
              </FilterSize>
            </Filter>
                    
                </FilterContainer>
                <AddContainer>
                    <AmountContainer>
                        <RemoveIcon 
                         style={{
                          
                          cursor: "pointer"
                      }}
                        onClick={() => handleQuantity("dec")}/>
                        <Amount>{quantity}</Amount>
                      <AddIcon 
                        style={{
                          
                          cursor: "pointer"
                      }}
                      onClick={() => handleQuantity("inc")}/>
                    </AmountContainer>
                    <Button onClick={handleClick}>ADD TO CART</Button>
                </AddContainer>
            </InfoContainer>
        </Wrapper>
        <NewsLetter/>
        <Footer/>
    </Container>
  )
}

export default Product