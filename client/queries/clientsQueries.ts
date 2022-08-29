import { gql } from '@apollo/client'

const GET_CLIENTS = gql`
  query {
    allclient {
      id
      name
      email
      phone
    }
  }
`

export { GET_CLIENTS }
