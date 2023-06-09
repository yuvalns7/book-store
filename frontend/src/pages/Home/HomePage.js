import React, { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Book from "../../components/Book/Book"
import Message from "../../components/Message/Message"
import Loader from "../../components/Loader/Loader"
import Paginate from "../../components/Paginate/Paginate"
import { listBooks } from "../../actions/bookActions"
import "./HomePage.css"

const HomePage = () => {
  const { keyword, maxPrice, rating } = useParams()
  const { pageNumber } = useParams() || 1

  const dispatch = useDispatch()

  const bookList = useSelector((state) => state.bookList)
  const { loading, error, books, page, pages } = bookList

  useEffect(() => {
    dispatch(listBooks(keyword, pageNumber, maxPrice, rating))
  }, [dispatch, keyword, pageNumber, maxPrice, rating])

  return (
    <div className='home'>
      <div className='title'>
        <h2>All Books</h2>
      </div>
      {books.length === 0 && <Message>No books matched the search</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='alert-danger'>{error}</Message>
      ) : (
        <>
          <div className='books'>
            {books.map((book) => (
              <Book key={book._id} book={book} />
            ))}
          </div>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </div>
  )
}

export default HomePage
