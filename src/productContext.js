// react hooks
import { createContext, useContext, useEffect, useState } from "react";

// database
import { db } from "./firebaseInit";
import {
  updateDoc,
  doc,
  arrayUnion,
  onSnapshot,
  arrayRemove,
} from "firebase/firestore";

// importing list of all the products
import { data } from "./assets/data";

// values from custom hook (authentication)
import { useAuthValue } from "./authContext";

// toast notification
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

// create contextAPI for product
export const productContext = createContext();

// custom context hook
export function useProductContext() {
  const value = useContext(productContext);
  return value;
}

// custom Provider
export function ProductContext({ children }) {
  const { isLoggedIn, userLoggedIn, setLoggedIn, setUserLoggedIn } =
    useAuthValue();
  // number of items in cart
  const [total, setTotal] = useState(0);
  const [item, setItem] = useState(0);
  const [cart, setCart] = useState([]);
  const [myorders, setMyOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // to check if the user is still logged in on page refresh
  useEffect(() => {
    // getting user authentication token from local storage
    const token = window.localStorage.getItem("token");
    if (token) {
      // loggedIn user's data
      const index = window.localStorage.getItem("index");
      const user = JSON.parse(index);
      setLoggedIn(token);
      setUserLoggedIn(user);
    
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      const unsub = onSnapshot(doc(db, "buybusy", userLoggedIn.id), (doc) => {
        setCart(doc.data().cart);
        setMyOrders(doc.data().orders);
      });
      let sum = 0;
      cart.map((item) => Number((sum += item.price * item.qty)));
      setTotal(sum);
      let items = 0;
      cart.map((item) => Number((items += item.qty)));
      setItem(items);
    }
  });

  //  function to add product to cart
  async function addToCart(product) {
    // check whether user is logged in or not
    setIsLoading(true);
    if (!isLoggedIn) {
      toast.error("Please Login first");
      return;
    }
    const index = cart.findIndex((item) => item.name === product.name);
    if (index === -1) {
      setCart([...cart, { ...product, qty: 1 }]);
      setTotal(total + product.price);
    } else {
      cart[index].qty++;
      setCart(cart);
      setTotal(total + cart[index].price);
    }
    setItem(item + 1);
    // add product to the cart of loggedIn user
    const userRef = doc(db, "buybusy", userLoggedIn.id);
    await updateDoc(userRef, {
      cart: arrayUnion({ qty: 1, ...product }),
    });
    setIsLoading(false);
    toast.success("Added to your Cart!");
  }

  async function removeFromCart(id) {
    const index = cart.findIndex((item) => item.id === id);
    setIsLoading(true);
    if (index !== -1) {
      const userRef = doc(db, "buybusy", userLoggedIn.id);
      await updateDoc(userRef, {
        cart: arrayRemove(cart[index]),
      });
      setItem(item - cart[index].qty);
      setTotal(Number(total - cart[index].qty * cart[index].price));
      cart.splice(index, 1);
      setCart(cart);
      setIsLoading(false);
      toast.success("Item has been removed!");
    }
  }

  async function clearCart() {
    setIsLoading(true);
    // if no item in cart then return with message
    if (item === 0) {
      toast.error("Nothing to remove in Cart!");
      setIsLoading(false);
      return;
    }

    // empty cart array in database
    const userRef = doc(db, "buybusy", userLoggedIn.id);
    await updateDoc(userRef, {
      cart: [],
    });

    // set item count and total amount
    setTotal(0);
    setItem(0);
    setIsLoading(false);
    toast.success("Empty Cart!");
  }

  // to increase item's quantity
  async function increaseQuantity(product) {
    // finding item's index in cart array
    const index = cart.findIndex((item) => item.name === product.name);
    // increase product quantity and update in useState
    cart[index].qty++;
    setCart(cart);
    // increase itemCount and total amount
    setItem(item + 1);
    setTotal(Number(total + cart[index].price));
    const userRef = doc(db, "buybusy", userLoggedIn.id);
    await updateDoc(userRef, {
      cart: cart,
    });
  }

  async function decreaseQuantity(product) {
    // finding item's index
    const index = cart.findIndex((item) => item.name === product.name);
    // reduce total amount
    setTotal(Number(total - cart[index].price));

    // change quantity of product and update cart array
    if (cart[index].qty > 1) {
      cart[index].qty--;
    } else {
      cart.splice(index, 1);
    }

    // update cart and item Count
    setCart(cart);
    setItem(item - 1);
    const userRef = doc(db, "buybusy", userLoggedIn.id);
    await updateDoc(userRef, {
      cart: cart,
    });
  }

  function getDate() {
    // getting current date
    const date = new Date();
    // day
    let day = date.getDate();
    // month
    let month = date.getMonth() + 1;
    // year
    let year = date.getFullYear();

    // yy/mm/dd format
    return `${year}-${month}-${day}`;
  }

  async function purchaseAll() {
    // get current data from function
    const currentDate = getDate();

    // adding order to database
    const userRef = doc(db, "buybusy", userLoggedIn.id);
    await updateDoc(userRef, {
      orders: arrayUnion({ date: currentDate, list: cart, amount: total }),
    });
    toast.success("Items has been purchased!");
    // empty cart
    clearCart();
  }

  return (
    <productContext.Provider
      value={{
        data,
        addToCart,
        setCart,
        cart,
        item,
        total,
        removeFromCart,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
        purchaseAll,
        myorders,
        isLoading,
      }}
    >
      {children}
    </productContext.Provider>
  );
}
