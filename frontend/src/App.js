import React, { useEffect, useState } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import Home from "./pages/Home/HomePage"
import BookDetail from "./pages/BookDetail/BookDetail"
import Cart from "./pages/Cart/Cart"
import Shipping from "./pages/Shipping/Shipping"
import Payment from "./pages/Payment/Payment"
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder"
import Order from "./pages/Order/Order"
import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"
import Profile from "./pages/Profile/Profile"
import UserList from "./pages/UserList/UserList"
import UserEdit from "./pages/UserEdit/UserEdit"
import BookList from "./pages/BookList/BookList"
import BookEdit from "./pages/BookEdit/BookEdit"
import OrderList from "./pages/OrderList/OrderList"
import socketIOClient from "socket.io-client"
import BookOrderChart from "./components/Chart/BookOrderChart"
const ENDPOINT = "http://127.0.0.1:5000"

const App = () => {
  const [activeUserCount, setActiveUserCount] = useState("")

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT)
    socket.on("clients", (data) => {
      setActiveUserCount(data)
      console.log(activeUserCount)
    })

    return () => socket.disconnect()
  }, [])

  return (
    <div className='app'>
      <Router>
        <Header />
        <main>
          <Routes>
            <Route path='/order/:id' element={<Order />} />
            <Route path='/shipping' element={<Shipping />} />
            <Route path='/payment' element={<Payment />} />
            <Route path='/placeorder' element={<PlaceOrder />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/book/:id' element={<BookDetail />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/cart/:id' element={<Cart />} />
            <Route
              path='/admin/userlist'
              element={<UserList activeUserCount={activeUserCount} />}
            />
            <Route path='/admin/user/:id/edit' element={<UserEdit />} />
            <Route path='/admin/booklist' element={<BookList />} />
            <Route path='/admin/orderlist' element={<OrderList />} />
            <Route path='/admin/bookOrderChart' element={<BookOrderChart />} />
            <Route
              path='/admin/booklist/:pageNumber'
              element={<BookList />}
              exact
            />
            <Route path='/admin/book/:id/edit' element={<BookEdit />} />
            <Route
              path='/search/:keyword/:maxPrice/:rating'
              element={<Home />}
              exact
            />
            <Route path='/page/:pageNumber' element={<Home />} exact />
            <Route
              path='/search/:keyword/page/:pageNumber'
              element={<Home />}
              exact
            />
            <Route path='/' element={<Home />} exact />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  )
}

export default App
