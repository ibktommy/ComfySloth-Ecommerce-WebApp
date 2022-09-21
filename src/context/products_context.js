import axios from 'axios'
import React, { useContext, useEffect, useReducer } from 'react'
import reducer from '../reducers/products_reducer'
import { products_url as url } from '../utils/constants'
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from '../actions'

const initialState = {
  isSideBarOpen: false,
  isLoadingProducts: false,
  isError: false,
  products: [],
  featured_products: [],
  loadingSingleProduct: false,
  errorSingleProduct: true,
  singleProduct: [],
}

const ProductsContext = React.createContext()

export const ProductsProvider = ({ children }) => {
  // Getting State from Reducer
  const [state, dispatch] = useReducer(reducer, initialState)

  // Function to Open NavMenu
  const openSideBar = () => {
    dispatch({
      type: SIDEBAR_OPEN,
    })
  }
  // Function to Close NavMenu
  const closeSideBar = () => {
    dispatch({
      type: SIDEBAR_CLOSE,
    })
  }

  // Function to Fetch Products from External API
  const fetchData = async (url) => {
    try {
      dispatch({ type: GET_PRODUCTS_BEGIN })

      const response = await axios.get(url)
      const products = response.data

      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: products })

    } catch (error) {
      dispatch({  type: GET_PRODUCTS_ERROR})
    }
  }

  // Function to Fetch Single-Products from External API
  const fetchSingleProduct = async (url) => {
    try {
      dispatch({ type: GET_SINGLE_PRODUCT_BEGIN })

      const response = await axios.get()
      const singleProduct = response.data

      dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: singleProduct })

    } catch (error) {
      dispatch({ type: GET_SINGLE_PRODUCT_ERROR }) 
    }
  }


  // UseEffect-Hook
  useEffect(() => {
    fetchData(url)
  }, [])


  return (
    <ProductsContext.Provider value={{
      ...state,
      openSideBar,
      closeSideBar,
      fetchSingleProduct,
    }}>
      {children}
    </ProductsContext.Provider>
  )
}
// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext)
}
