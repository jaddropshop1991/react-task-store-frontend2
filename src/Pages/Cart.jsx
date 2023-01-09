import React, { useState,useEffect } from 'react'
import styled from 'styled-components'
import Announcement from '../Components/Announcement'
import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';

import { mobile } from "../responsive";
import { useSelector } from 'react-redux'
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { userRequest } from '../requestMethods'
import {decreaseCart, increaseCart ,removeFromCart,clearCart,getTotals} from '../redux/cartRedux'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';

const KEY ="pk_test_51MMyJuLoXB8VCEN0S15WmJEnm9xPZBxDBSZK3lBvD1EvC5JvSI2OTb9v2ocqx6OgoZQdtrYMDoKp54veaeBOSj6q00aZ4Yo5cb";


const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({padding: "10px"})}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({display: "none"})}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({flexDirection: "column"})}

`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({flexDirection: "column"})}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({margin: "5px 15px"})}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({marginBottom: "20px"})}
`;


const Hr = styled.hr`
 
background-color:#eee ;
border:none ;
height: 1px;
${mobile({marginBottom: "20px"})}
`;

const Summary = styled.div`
flex: 1;
border:0.5px solid lightgray;
border-radius:10px ;
padding: 20px;
height:50vh;
`;

const SummaryTitle = styled.h1`
font-weight: 200;
`;
const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;
const SummaryItemText = styled.span`


`;
const SummaryItemPrice = styled.span`


`;
const Button = styled.button`

width:100% ;
padding: 10px;
background-color:black ;
color:white;
font-weight:600 ;

`;






const Cart = () => {
  // useEffect(() => {
  //   dispatch(getTotals());
  // }, [cart, dispatch]);
  
  const cart = useSelector(state=>state.cart)
  const [stripeToken,setStripeToken ] = useState(null)
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const onToken = (token) =>{
    setStripeToken(token);
};

useEffect(()=> {
  const makeRequest = async () => {
  try{

     const res = await userRequest.post("/checkout/payment",{
      tokenId: stripeToken,
      amount: cart.total * 100,
     
     });

     console.log(res.data);
     navigate('/success', {data:res.data});

  } catch(err){
      console.log(err)
  }
};
stripeToken && cart.total>=1 && makeRequest()
}, [stripeToken,cart.total,navigate])


// console.log(stripeToken)


// const [productQuantity, setQuantity] = useState(1);

// const handleQuantity = (type, qauntity) => {

//   if (type === "dec") {
//     qauntity > 1 &&  setQuantity(qauntity - 1);
//     dispatch(
//       //  addProduct({product, quantity, price: product.price * quantity})
//       decreaseCart({ qauntity})
//         );
//   } else {
//     setQuantity( qauntity + 1);
//     dispatch(
//       //  addProduct({product, quantity, price: product.price * quantity})
//       decreaseCart({ qauntity})
//         );
//   }
// };

const handleDecreaseCart = (product) => {
  dispatch(decreaseCart(product));
};


const handleAddToCart = (product) => {
  dispatch(increaseCart(product));
  
};


const handleRemoveFromCart = (product) => {
  dispatch(removeFromCart(product));
};


const handleClearCart = () => {
  dispatch(clearCart());
};
 
  return (
    <Container> 
        <Navbar/>
        <Announcement/>
        <Wrapper>
            <Title>YOUR BAG</Title>
            <Top>
            <Link style={{
               textDecoration: "none",
               color:"black"
            }}
            to={"/products"}>
                <TopButton>
             
                  CONTINUE SHOPPING
                 
                  </TopButton>
                  </Link>
                <TopTexts>
                    {/* <TopText>Shopping Bag ()</TopText>
                    <TopText>Your wishlist (0)</TopText> */}
                  
                </TopTexts>
                <TopButton type="filled" onClick={() =>handleClearCart()}>CLEAR CART</TopButton>
            </Top>
            <Bottom>

                <Info>
                {cart.products.map((product) => (
              <Product>
                <ProductDetail>
                  <Image src={product.img} />
                  <Details>
                    <ProductName>
                      <b>Product:</b> {product.title}
                    </ProductName>
                    <ProductId>
                      <b>ID:</b> {product._id}
                    </ProductId>
                    <ProductColor color={product.color} />
                    <ProductSize>
                      <b>Size:</b> {product.size}
                    </ProductSize>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <AddIcon  style={{
                          
                          cursor: "pointer"
                      }}
                      onClick={() => handleAddToCart(product)}/>
                    <ProductAmount>{product.quantity }</ProductAmount>
                    <RemoveIcon 
                     style={{
                          
                      cursor: "pointer"
                  }}
                  onClick={() => handleDecreaseCart(product)}
                    />
                  </ProductAmountContainer>
                  <ProductPrice>
                    $ {product.price * product.quantity}
                  </ProductPrice>
                </PriceDetail>

                <DeleteIcon style={{
                      padding:"50",
                      cursor: "pointer"
                      }} onClick={() =>  handleRemoveFromCart(product)}/>
              </Product>
            ))}

<Hr/>
            {/* <Product>
              <ProductDetail>
                <Image src="https://d3o2e4jr3mxnm3.cloudfront.net/Mens-Jake-Guitar-Vintage-Crusher-Tee_68382_1_lg.png" />
                <Details>
                  <ProductName>
                    <b>Product:</b> T-Sirt
                  </ProductName>
                  <ProductId>
                    <b>ID:</b> 93813718293
                  </ProductId>
                  <ProductColor color="blue" />
                  <ProductSize>
                    <b>Size:</b> XL
                  </ProductSize>
                </Details>
              </ProductDetail>
              <PriceDetail>
                <ProductAmountContainer>
                  <AddIcon  />
                  <ProductAmount>2</ProductAmount>
                  <RemoveIcon  />
                </ProductAmountContainer>
                <ProductPrice>$ 40</ProductPrice>
              </PriceDetail>
            </Product> */}
                </Info>
                <Summary>
                    <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                    <SummaryItem>
                        <SummaryItemText>Subtotal</SummaryItemText>
                        <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                    </SummaryItem>
                    {/* <SummaryItem>
                        <SummaryItemText>Estimated Shipping</SummaryItemText>
                        <SummaryItemPrice>$ 5.90</SummaryItemPrice>
                    </SummaryItem>
                    <SummaryItem>
                        <SummaryItemText>Shipping Discount</SummaryItemText>
                        <SummaryItemPrice>$ -5.90</SummaryItemPrice>
                    </SummaryItem> */}
                    <SummaryItem type="total">
                        <SummaryItemText>Total</SummaryItemText>
                        <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                    </SummaryItem>
                    <StripeCheckout
       name="miniShop"
       image="https://w7.pngwing.com/pngs/621/196/png-transparent-e-commerce-logo-logo-e-commerce-electronic-business-ecommerce-angle-text-service.png"
       billingAddress
       shippingAddress
       description = "Your total is $20"
       //cents amount 
       amount={2000}
       token={onToken}
       stripeKey={KEY}
       >

    <Button
       style={{
                          
        cursor: "pointer"
    }}
    >
      CHECKOUT
        </Button>
        </StripeCheckout>
                </Summary>
            </Bottom>
        </Wrapper>
        <Footer/>
   </Container>
  )
}

export default Cart