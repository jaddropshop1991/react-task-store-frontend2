import React from 'react'
import styled from 'styled-components'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import PinterestIcon from '@mui/icons-material/Pinterest';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CallIcon from '@mui/icons-material/Call';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { mobile } from "../responsive";

const Container = styled.div`
display:flex;
${mobile({flexDirection: "column"})}
`
const Left = styled.div`
flex:1;
flex-direction:column;
padding:20px;
`

const Logo = styled.div`

`
const Desc = styled.p`
margin:20px 0px;
`
const SocialContainer = styled.div`
display:flex;
`
const SocialIcon = styled.div`
width:40px;
height:40px;
border-radius:50%;
color:white;
background-color: #${props=>props.color};
display:flex;
align-items:center;
justify-content:center;
margin-right:20px;
`

const Center = styled.div`
flex:1;
padding:20px;
${mobile({display: "none"})}
`
const Right = styled.div`
flex:1;
padding:20px;
${mobile({backgroundColor: "#fff8f8"})}
`

const Title =styled.h3`
margin-bottom:30px;
`

const List = styled.ul`
margin:0;
padding:0;
list-style:none;
display: flex;
flex-wrap: wrap;
`

const ListItem = styled.li`
width:50%;
margin-bottom:10;
`

const ContactItem = styled.div`
margin-bottom:20px;
display:flex;
align-items:center;
`

const Payment = styled.img`
width:70%;
`

const Footer = () => {
  return (
    <Container>
<Left>
<Logo>
    Mini Store
</Logo>
<Desc>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni minima modi labore soluta fugit sit voluptate corrupti eligendi perspiciatis, iure tempora odit! Dolorem animi doloremque quis aliquam quisquam nisi consectetur.
</Desc>
<SocialContainer>
    <SocialIcon color="385999">
        <FacebookIcon/>
    </SocialIcon>
    <SocialIcon color="E4405F">
        <InstagramIcon/>
    </SocialIcon>
    <SocialIcon color="55ACEE">
        <TwitterIcon/>
    </SocialIcon> 
    <SocialIcon color="E60023">
        <PinterestIcon/>
    </SocialIcon> 
</SocialContainer>
</Left>
<Center>
<Title>Useful Links</Title>
<List>
    <ListItem>Home </ListItem>
    <ListItem>Cart </ListItem>
    <ListItem>Man Fashion </ListItem>
    <ListItem>Women Fashion </ListItem>
    <ListItem>Accessories </ListItem>
    <ListItem>My Account </ListItem>
    <ListItem>Order Tracking </ListItem>
    <ListItem>Wishlist </ListItem>
    <ListItem>Terms </ListItem>
</List>
</Center>
<Right>
<Title>Contact</Title>
<ContactItem>
   <LocationOnIcon style={{marginRight:"10px"}}/> Mount Lebanon, Chouf, Lebaonon
</ContactItem>
<ContactItem>
 <CallIcon style={{marginRight:"10px"}}/> +961 76598607
</ContactItem>
<ContactItem>
 <MailOutlineIcon style={{marginRight:"10px"}}/>jadiab1991@gmail.com
</ContactItem>
<Payment src="https://help.zazzle.com/hc/article_attachments/360010513393/Logos-01.png"/>
</Right>
    </Container>
  )
}

export default Footer