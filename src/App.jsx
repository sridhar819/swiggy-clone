import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import RestaurantDetails from './components/RestaurantDetails'
import Home from './components/Home'
import CartContext from './Context'
import Cart from './components/Cart'
import './App.css'
import { useEffect, useState } from 'react'

const parseData = JSON.parse(localStorage.getItem("cartList"));
const parseisOrder = JSON.parse(localStorage.getItem('isOrder'))

const App = () => {

  const [cartList, setCart] = useState(parseData ? parseData : []);
  const [isOrderPlaced, setOrder] = useState(parseisOrder?parseisOrder:false);

  const placeOrder = () => {
    setCart([])
    setOrder(pre => !pre)
  }

  const increaseCount = id => {
    setCart(prevCart => prevCart.map(each => {
      if (each.id == id) {
        return { ...each, quantity: each.quantity + 1 }
      }
      return each
    }))
  }

  const decreaseCount = id => {
    const isItems = cartList.find(each => each.id === id);
    if (isItems.quantity <= 1) {
      setCart(prevCart => prevCart.filter(each => each.id !== id))
    }
    else {
      setCart(prevCart => prevCart.map(each => {
        if (each.id == id) {
          return { ...each, quantity: each.quantity - 1 }
        }
        return each
      }))

    }
  }

  const removeCart = id => {
    setCart(cartList.filter(each => each.id !== id))
  }

  const addCart = (food) => {
    setCart((prevCart) => [...prevCart, { ...food, quantity: 1 }]);
    setOrder(false)

  }

  useEffect(() => {
    localStorage.setItem('isOrder', JSON.stringify(isOrderPlaced))
  }, [isOrderPlaced])

  useEffect(() => {
    localStorage.setItem('cartList', JSON.stringify(cartList))
  }, [cartList])

  return (
    <CartContext.Provider value={{
      cartList,
      isOrderPlaced,
      addCart,
      removeCart,
      increaseCount,
      decreaseCount,
      placeOrder
    }}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/restaurant/:id" element={<ProtectedRoute><RestaurantDetails /></ProtectedRoute>} />
        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
      </Routes>
    </CartContext.Provider>)
}


export default App