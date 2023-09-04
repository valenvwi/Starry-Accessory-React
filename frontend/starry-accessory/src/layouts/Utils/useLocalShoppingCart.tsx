import { useState } from "react";
import { CartItem } from "../../models/CartItem";
import ProductModel from "../../models/Product";

function getStoredCart(): CartItem[] {
  const storedCartString = localStorage.getItem("shoppingCartData");
  if (storedCartString) {
    return JSON.parse(storedCartString);
  } else {
    return [];
  }
}

function getTotalPrice(cartItems: CartItem[]): number {
  let totalPrice = 0;
  for (let currentCartItem of cartItems) {
    totalPrice += currentCartItem.quantity * currentCartItem.unitPrice;
  }
  return Math.round(totalPrice * 100) / 100;
}

function getTotalQuantity(cartItems: CartItem[]): number {
  let totalQuantity = 0;
  for (let currentCartItem of cartItems) {
    totalQuantity += currentCartItem.quantity;
  }
  return totalQuantity;
}

export const useLocalShoppingCart = () => {
  const [cartItems, setCartItems] = useState(getStoredCart);

  function saveCartItems(items: CartItem[]) {
    localStorage.setItem("shoppingCartData", JSON.stringify(items));
    setCartItems([...items]);
  }

  function addProductToCart(product: ProductModel) {
    const itemInCart = cartItems.find((item) => item.id === product.id);
    if (itemInCart) {
      const newCartItems = cartItems.map((item) => {
        if (item.id === product.id) {
          return { ...item, quantity: item.quantity + 1 };
        } else {
          return item;
        }
      });
      saveCartItems(newCartItems);
    } else {
      const newCartItem: CartItem = {
        id: product.id,
        name: product.name,
        imageUrl: product.imageUrl,
        unitPrice: product.unitPrice,
        quantity: 1,
      };
      const newCartItems = [...cartItems, newCartItem];
      saveCartItems(newCartItems);
    }
  }

  function increaseProductFromCart(cartItem: { id: number }) {
    const itemInCart = cartItems.find((item) => item.id === cartItem.id);
    if (itemInCart) {
      const newCartItems = cartItems.map((item) => {
        if (item.id === cartItem.id) {
          return { ...item, quantity: item.quantity + 1 };
        } else {
          return item;
        }
      });
      saveCartItems(newCartItems);
    }
    console.log("successfully increase item from cart");
  }

  function removeProductFromCart(cartItem: { id: number }) {
    const itemInCart = cartItems.find((item) => item.id === cartItem.id);
    if (itemInCart) {
      if (itemInCart.quantity === 1) {
        // remove the item form the cart
        const newCartItems = cartItems.filter(
          (item) => item.id !== cartItem.id
        );
        saveCartItems(newCartItems);
      } else {
        const newCartItems = cartItems.map((item) => {
          if (item.id === cartItem.id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
        saveCartItems(newCartItems);
      }
      console.log("successfully remove item from cart");
    }
  }

  function resetCart(){
    localStorage.setItem("shoppingCartData", JSON.stringify([]));
    setCartItems([]);
  }

  const totalPrice = getTotalPrice(cartItems);
  const totalQuantity = getTotalQuantity(cartItems);

  return {
    cartItems,
    totalPrice,
    totalQuantity,
    addProductToCart,
    increaseProductFromCart,
    removeProductFromCart,
    resetCart
  };
};
