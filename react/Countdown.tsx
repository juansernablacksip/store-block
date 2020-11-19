import React from 'react'

import { useQuery } from 'react-apollo'
import { useProduct } from 'vtex.product-context'
import productReleaseDate from './graphql/productReleaseDate.graphql'

interface CountdownProps { }

const productContextValue = useProduct()
const { data, loading, error } = useQuery(productReleaseDate, {
  variables: {
    slug: productContextValue?.product?.productName
  },
  ssr: false
})
console.log('CONSOLEEEEEEEEEEEEEEEEEE'+ {data})

const Countdown: StorefrontFunctionComponent<CountdownProps> = ({ }) => {
  if (!productContextValue?.product?.productName) {
    return (
      <div>
        <span>There is no product context.</span>
      </div>
    )
  }
  if (loading) {
    return (
      <div>
        <span>Loading...</span>
      </div>
    )
  }
  if (error) {
    return (
      <div>
        <span>Error!</span>
      </div>
    )
  }
  return ( 
    <div>
      <h1>HOLAAA</h1>
    </div>
  )
}

Countdown.schema = {
  title: 'editor.countdown.title',
  description: 'editor.countdown.description',
  type: 'object',
  properties: {},
}

export default Countdown
