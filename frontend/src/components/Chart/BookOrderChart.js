import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"
import { listOrdersByBook } from "../../actions/orderActions"
import Message from "../Message/Message"
import Loader from "../Loader/Loader"

const BookOrderChart = () => {
  const dispatch = useDispatch()
  const negative = useNavigate()

  const booksOrderList = useSelector((state) => state.booksOrderList)
  const { loading, error, booksOrders } = booksOrderList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrdersByBook())
    } else {
      negative("/login")
    }
  }, [dispatch, userInfo, negative])

  return (
    <div style={{ textAlign: "center", paddingTop: "5%" }}>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant={"alert-danger"}>{error}</Message>
      ) : (
        <BarChart
          width={2000}
          height={1000}
          data={booksOrders}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip />
          <Bar dataKey='pv' fill='#8884d8' />
        </BarChart>
      )}
    </div>
  )
}

export default BookOrderChart
