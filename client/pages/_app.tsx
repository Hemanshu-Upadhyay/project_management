import type { AppProps } from 'next/app'
import 'bootstrap/dist/css/bootstrap.css'
import Head from 'next/head'
import Script from 'next/script'
import '../styles/globals.css'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        allclient: {
          merge(existing = [], incoming) {
            return [...existing, ...incoming]
          },
        },
        allprojects: {
          merge(existing = [], incoming) {
            return [...existing, ...incoming]
          },
        },
      },
    },
  },
})

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql',
  cache,
})

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1"
          crossOrigin="anonymous"
        />
      </Head>

      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
        crossOrigin="anonymous"
      />
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </>
  )
}

export default MyApp
