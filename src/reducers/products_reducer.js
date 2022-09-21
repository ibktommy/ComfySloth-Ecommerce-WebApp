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

const products_reducer = (state, action) => {
  // SIDEBAR_OPEN REDUCER FUNCTION
  if (action.type === SIDEBAR_OPEN) {
    return {
      ...state,
      isSideBarOpen: true,
    }
  }
  // SIDEBAR_CLOSE REDUCER FUNCTION
  if (action.type === SIDEBAR_CLOSE) {
    return {
      ...state,
      isSideBarOpen: false,
    }
  }
  // ACTION PERFORMED WHEN STARTING TO FETCH PRODUCTS
  if (action.type === GET_PRODUCTS_BEGIN) {
    return {
      ...state, 
      isLoadingProducts: true,
    }
  }

  // ACTION PERFORMED WHEN PRODUCTS IS SUCCESSFULLY FETCHED FROM SERVER
  if (action.type === GET_PRODUCTS_SUCCESS) {
    const featured_products = action.payload.filter((filteredProducts) => {
      return filteredProducts.featured === true
    })

    return {
      ...state,
      isLoadingProducts: false,
      products: action.payload,
      featured_products,
    }
  }
  // ACTION PERFORMED WHEN PRODUCTS IS NOT FETCHED FROM SERVER
  if (action.type === GET_PRODUCTS_ERROR) {
    return {
      ...state,
      isLoadingProducts: false, 
      isError: true,
    }
  }

  // ACTION PERFORMED WHEN STARTING TO FETCH A SINGLE PRODUCTS
  if (action.type === GET_SINGLE_PRODUCT_BEGIN) {
    return {
      ...state,
      loadingSingleProduct: true,
      errorSingleProduct: false,
    }
  }

  // ACTION PERFORMED WHEN A SINGLE PRODUCTS IS SUCCESSFULLY FETCHED FROM SERVER
  if (action.type === GET_SINGLE_PRODUCT_SUCCESS) {
    return {
      ...state,
      loadingSingleProduct: false,
      singleProduct: action.payload,
    }
  }

  // ACTION PERFORMED WHEN SINGLE-PRODUCT IS NOT FETCHED FROM SERVER
  if (action.type === GET_SINGLE_PRODUCT_ERROR) {
    return {
      ...state,
      loadingSingleProduct: false,
      errorSingleProduct: true,
    }
  }

  // return state
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default products_reducer
