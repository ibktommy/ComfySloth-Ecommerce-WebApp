import React, { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useProductsContext } from '../context/products_context'
import { single_product_url as url } from '../utils/constants'
import { formatPrice } from '../utils/helpers'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  PageHero,
} from '../components'

const SingleProductPage = () => {
  // Getting the id of the product form the useParams Object
  const { id } = useParams()
  console.log(id)
  // Get Values from AppContext
  const {
    loadingSingleProduct: loading,
    errorSingleProduct: error,
    singleProduct: product,
    fetchSingleProduct,
  } = useProductsContext()

  // Calling the Function to Fetch Single Product in the useEffect after component renders
  useEffect(() => {
    fetchSingleProduct(`${url}$s{id}`)
  }, [id])

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error />
  }

  return <h4>single product page</h4>
}

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`

export default SingleProductPage
