import { useEffect, useState } from "react"
import { db } from "../data/db.js"


function UseCart() {

    const data = db

  const initialCart = () => {
    const cartItem = localStorage.getItem("cart")
    return cartItem ? JSON.parse(cartItem) : []
  }

  const [cart, setCart] = useState(initialCart)

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])
  
  const addToCart = (item) => {
    
    const itemExists = cart.findIndex((cartItem) => cartItem.id === item.id)

    if (itemExists >= 0) {
      const newCart = [...cart]
      newCart[itemExists].quantity += 1
      setCart(newCart)
      console.log(newCart)
    }else {
      const newItem = {
        ...item,
        quantity: 1
      }
      setCart([...cart, newItem])
    }
  }

  const removeFromCart = (item) => {
    setCart(cart.filter((cartItem) => cartItem.id !== item))
  }

  const decreaseQuantity = (item) => {
    const updatedCart = cart.map((cartItem) => {
      if (cartItem.id === item && cartItem.quantity > 1) {
        return {
          ...cartItem,
          quantity: cartItem.quantity - 1
        }
      }
      return cartItem
    })

    setCart(updatedCart)
  }

  const increaseQuantity = (item) => {
    const updatedCart = cart.map((cartItem) => {
      if (cartItem.id === item && cartItem.quantity < 10) {
        return {
          ...cartItem,
          quantity: cartItem.quantity + 1
        }
      }
      return cartItem
    })

    setCart(updatedCart)
  }

  const clearCart = () => {
    setCart([])
  }

    /* const suma = cart.reduce((total, {quantity, price}) => {return total + (quantity * price)}, 0) */

    const suma = cart.reduce((total, item) => {
    if (item && typeof item === "object" && "quantity" in item && "price" in item) {
      return total + (item.quantity * item.price)
    }
    return total
  }, 0)

  return {
    data,
    cart,
    addToCart,
    removeFromCart,
    decreaseQuantity,
    increaseQuantity,
    clearCart,
    suma
  }
}

export default UseCart