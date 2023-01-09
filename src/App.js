import Home from "./Pages/Home";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import ProductList from "./Pages/ProductList";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Success from "./Pages/Success";
import { useSelector } from "react-redux";
import ScrollToTop from "./Components/scrollToTop";


const App=()=> {


  // const user = false
  const user = useSelector((state)=>state.user.currentUser)
  return (

  <BrowserRouter>
    <ScrollToTop>
  <Routes>

<Route exact path="/" element={<Home />} />
 
<Route exact path="/products" element={<ProductList />}/>
<Route exact path="/products/:category" element={<ProductList />}/>
<Route exact path="/product/:id" element={<Product/>}/>
<Route exact path="/cart" element={<Cart/>}/>
<Route exact path="/login" 
element={user ?  <Navigate to="/" replace />:  <Login />}
/>
<Route exact path="/register" 
element={user ?  <Navigate to="/" replace />:  <Register />}
/>
<Route path="/success" element={<Success/>} />

</Routes>
</ScrollToTop>
</BrowserRouter>
  );
}

export default App;
