import {createSlice} from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:"cart",
    initialState: {
        products:localStorage.getItem("products")
        ? JSON.parse(localStorage.getItem("products"))
        : [],
        quantity:0,
        total:0,
        
    },
    reducers: {
    
        addProduct: (state, action)=> {


            const existingIndex = state.products.findIndex(
                (item) => item._id === action.payload._id
              );
        
              if (existingIndex >= 0) {

                state.total = state.total - (action.payload.price *  state.products[existingIndex].quantity);
               
                state.products[existingIndex] = {
                  ...state.products[existingIndex],
                  quantity: state.products[existingIndex].quantity +action.payload.quantity,
                  
                };

                const newProductQuantity =  state.products[existingIndex].quantity;
               
                 state.total =  state.total + (action.payload.price * newProductQuantity );
                 localStorage.setItem("products", JSON.stringify(state.products));
              } else {

            state.quantity +=1;
            state.products.push(action.payload);
            state.total +=action.payload.price * action.payload.quantity;
            localStorage.setItem("products", JSON.stringify(state.products));

              }
        },

              
        increaseCart: (state, action) =>{
            const itemIndex = state.products.findIndex(
                (item) => item._id === action.payload._id
              );
              state.total = state.total - (action.payload.price *  state.products[itemIndex].quantity);
               const newProductQuantity = state.products[itemIndex].quantity += 1;
              
                state.total =  state.total + (action.payload.price * newProductQuantity );
                localStorage.setItem("products", JSON.stringify(state.products));
          },

          
        decreaseCart:(state, action) =>{
            const itemIndex = state.products.findIndex(
              (item) => item._id === action.payload._id
            );
      
            if (state.products[itemIndex].quantity > 1) {
                state.total = state.total - (action.payload.price *  state.products[itemIndex].quantity);
                const newProductQuantity = state.products[itemIndex].quantity -= 1;
               
                 state.total =  state.total + (action.payload.price * newProductQuantity );
                 localStorage.setItem("products", JSON.stringify(state.products));
            
      
            } else if (state.products[itemIndex].quantity === 1) {
              const nextCartItems = state.products.filter(
                (item) => item._id !== action.payload._id
              );
              state.quantity -=1;
              state.total -=action.payload.price;
              state.products = nextCartItems;
      
            }
      
            localStorage.setItem("products", JSON.stringify(state.products));
          },



          removeFromCart(state, action) {
            state.products.map((cartItem) => {
              if (cartItem._id === action.payload._id) {
                // console.log(cartItem._id)
                const nextCartItems = state.products.filter(
                  (item) => item._id !== cartItem._id
                );

                const itemIndex = state.products.findIndex(
                    (item) => item._id === action.payload._id
                  );

               
                  state.total = state.total - (action.payload.price *  state.products[itemIndex].quantity);
                  const newProductQuantity =   state.products[itemIndex].quantity = 0;
                 
                
                //    localStorage.setItem("products", JSON.stringify(state.products));


                state.quantity -=1;
                state.products = nextCartItems;
                
              }
              localStorage.setItem("products", JSON.stringify(state.products));
              return state;
            });
          },

          clearCart(state, action) {
            state.products = [];
            state.quantity=0;
            state.total=0;
            localStorage.setItem("products", JSON.stringify(state.products));
      
          },


        //   getTotals(state, action) {
        //     let { total, quantity } = state.products.reduce(
        //       (cartTotal, cartItem) => {
        //         const { price, quantity } = cartItem;
        //         const itemTotal = price * quantity;
      
        //         cartTotal.total += itemTotal;
        //         cartTotal.quantity += quantity;
      
        //         return cartTotal;
        //       },
        //       {
        //         total: 0,
        //         quantity: 0,
        //       }
        //     );
        //     total = parseFloat(total.toFixed(2));
        //     state.quantity = quantity;
        //     state.total = total;
        //   },

    
    },



});

export const {addProduct, increaseCart,decreaseCart,removeFromCart, clearCart,getTotals} = cartSlice.actions;
export default cartSlice.reducer;
