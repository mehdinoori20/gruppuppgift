
import { useState } from "react";
import { TiShoppingCart } from "react-icons/ti";
import { IoCloseSharp } from "react-icons/io5";
import useRecipeState from "../State/indexState"
import { Link } from "react-router-dom";
import { Recipe } from "../data/Recipes";
import { MutableRefObject, useRef } from "react"
import { FaBars, FaTimes } from "react-icons/fa"

interface CartItem {
    _id: string;
    title: string;
    imageUrl: string;
    price: number;
    quantity: number;
  }

const Navbar = () => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);
    const [orderNumber, setOrderNumber] = useState("");
    const cart = useRecipeState((state) => state.cart);
    const handleIncreaseCart = useRecipeState((state) => state.handleIncreaseCart);
    const handleDecreaseCart = useRecipeState((state) => state.handleDecreaseCart);
    const clearCart = useRecipeState((state) => state.clearCart)
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };
  
    
      const handleCartToggle = () => {
        setIsCartOpen(!isCartOpen);
        if (isOrderConfirmed) {
          setIsOrderConfirmed(false);
        }
      };
    
      const closeCart = () => {
        setIsCartOpen(false);
      };
    
      const confirmOrder = () => {
        setIsOrderConfirmed(true);
        setOrderNumber((Math.floor(Math.random() * 900000) + 100000).toString());
        useRecipeState.getState().clearCart();
      };
    
    
      const increaseQuantity = (recipeId: string) => {
        console.log(recipeId)
        console.log("tstINc", cart)
        handleIncreaseCart(recipeId);
      }
    
    
      const decreaseQuantity = (recipeId: string) => {
        console.log(recipeId)
        console.log("tst", cart)
        handleDecreaseCart(recipeId);
      }
    
    
      const totalPieces = cart.length;
      const totalPrice = cart.length > 0 ? cart.map((cartItem) => cartItem.price).reduce((total, price) => total + price, 0) : 0;
    

    return (
        <nav className="bg-gradient-to-r from-green-300 shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <a href="/" className="font-bold text-xl italic">Not-Mathem</a>
                      </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <Link to="/" className="text-gray-600 hover:text-white">Home</Link>
                            <Link id="recipe" to="/recipe" className="text-gray-600 hover:text-white">Categories</Link>
                            <Link id="weeklyTips" to="/weeklytips" className="text-gray-600 hover:text-white">Weekly Tips</Link>
                            <Link to="/about" className="text-gray-600 hover:text-white">About us</Link>
                            <Link id="cocktails" to="/cocktails" className="text-gray-600 hover:text-white">Cocktails</Link>
                            <Link to="/add" className="text-gray-600 hover:text-white pt-2 pb-2 pl-3 pr-3 bg-green-400 rounded-lg
                                                      hover:bg-green-300 ">Add recipe</Link>
                            {" "}
                            <button
                                onClick={handleCartToggle}
                                id="cartOpen"
                                className="text-2xl relative flex items-center justify-center w-12 h-12 "
                                >
                            <TiShoppingCart />
                                {cart.length > 0 && (
                                <span className="absolute -right-2 -top-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-green-600 rounded-full">
                                {cart.length}
                                </span>
                                  )}
                            </button>
                        </div>
                    </div>
                    
      {isCartOpen && (
        <div className="fixed top-0 right-0 h-full bg-white w-1/3 shadow-lg z-50 opacity-100 border rounded overflow-hidden max-sm:w-full max-md:w-full ">
          <button
            
            onClick={closeCart}
            className="text-2xl text-slate-400 absolute right-2 p-2 mt-1.5 hover:shadow-md hover:bg-gray-300"
          >
            <IoCloseSharp />
          </button>
          {!isOrderConfirmed ? (
            <>
              <div className="p-4 bg-white border rounded">
                <h2 className="text-xl font-semibold text-black p-4 text-center">Shopping Cart</h2>
              </div>
              <div className="px-2 overflow-y-auto" style={{ maxHeight: 'calc(100% - 200px)' }}>
                <div>

                  <div>
                    {Object.values<CartItem>(
                      cart.reduce(
                        (acc: { [key: string]: CartItem }, recipe) => {
                          if (acc[recipe._id]) {
                            acc[recipe._id].quantity += 1;
                          } else {
                            acc[recipe._id] = { ...recipe, quantity: 1 };
                          }
                          return acc;
                        },
                        {}
                      )
                    ).map((item: CartItem, index) => (
                      <div key={index} className="flex items-center my-2">
                        <div className="w-20 h-20">
                          <img src={item.imageUrl} className="w-full h-full object-cover" alt={item.title} />
                        </div>
                        <div className="flex-grow pl-4">
                          <p className="text-red-400 text-sm font-bold">{item.title}</p>
                          <div className="flex items-baseline">
                            <p className="text-black text-sm font-bold">
                              {item.price * item.quantity} kr
                            </p>
                            <p className="text-black text-sm ml-4" style={{ minWidth: '3rem' }}>
                              {item.quantity} pcs
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <button
                            id="decreaseMoreOfSame"
                            onClick={() => decreaseQuantity(item._id)}
                            className="bg-white text-black hover:bg-gray-300 px-3 h-8 border shadow-md rounded-l-md"
                          >
                            -
                          </button>
                          <button
                            id="addMoreOfSame"
                            onClick={() => increaseQuantity(item._id)}
                            className="bg-white hover:bg-gray-300 text-black px-3 h-8 border shadow-md rounded-r-md"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-white absolute bottom-0 w-full">
                <div className="flex justify-end">
                  <button id="clearCart" onClick={clearCart} className=" w-1/4 font-semibold border border-green-700 text-green-800 mt-4 py-2 rounded hover:bg-green-600 hover:text-white">Clear Cart</button>
                </div>

                <div className="flex justify-between items-center font-bold">
                  <span>Total Pieces:</span>
                  <span>{totalPieces}</span>
                </div>
                <div className="flex justify-between items-center font-bold mt-2">
                  <span>Total Price:</span>
                  <span>{totalPrice} kr</span>
                </div>
                <button id="confirmOrder" onClick={confirmOrder} className="w-full font-semibold bg-green-600 text-white mt-2 py-2 rounded hover:bg-green-800">Confirm Order</button>
              </div>
            </>
          ) : (
            <div className="text-center p-4 bg-slate-500">
              <h2 className="text-lg font-semibold">
                Thank you for your order!
              </h2>
              <p>Your order number is #{orderNumber}</p>
            </div>
          )}
        </div>
      )}
                {/*BORGIR MENU*/}
                    <div className="-mr-2 flex md:hidden">
                        <button onClick={toggleNavbar} type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-800">
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden ">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 z-50">
                        <Link to="/" className="text-gray-600 hover:text-green-300 block px-3 py-2 rounded-md text-base font-medium">Home</Link>
                        <Link to="/recipe" className="text-gray-600 hover:text-green-300  block px-3 py-2 rounded-md text-base font-medium">Categories</Link>
                        <Link to="/weeklytips" className="text-gray-600 hover:text-green-300  block px-3 py-2 rounded-md text-base font-medium">Weekly Tips</Link>
                        <Link to="/about" className="text-gray-600 hover:text-green-300  block px-3 py-2 rounded-md text-base font-medium">About us</Link>
                        <Link to="/cocktails" className="text-gray-600 hover:text-green-300  block px-3 py-2 rounded-md text-base font-medium">Cocktails</Link>
                        <Link to="/add" className="text-gray-600 hover:text-green-300  block px-3 py-2 rounded-md text-base font-medium">Add recipe</Link>
                       <div className="flex relative">
                        <button onClick={handleCartToggle} className="text-gray-600 hover:text-green-300 block px-3 py-2 rounded-md text-base font-medium">
                        <TiShoppingCart />
                                {cart.length > 0 && (
                                <span className="ml-5 absolute top-0 text-white bg-green-600 w-6 h-6 rounded-2xl">
                                {cart.length}
                                </span>
                                  )}
                        </button>
                        </div>
                        
                        
                    </div>
                </div>
            )}
            
        </nav>
    );
};

export default Navbar;
