import { useQuery } from '@apollo/client'
import { GET_CLIENTS } from '../../queries/clientsQueries'
import ClientRow from '../ClientRow/clientRow'
import Spinner from '../Spinner'
import UpdateClient from '../UpdateClient/UpdateClient'

const Clients = () => {
  const { loading, error, data } = useQuery(GET_CLIENTS)

  if (loading) return <Spinner />
  if (error) return <p>Error :</p>

  return (
    <>
      <h1>Clients</h1>
      {!loading && !error && (
        <table className="table table-hover mt-3">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.allclient.map((client: any) => (
              <>
                <ClientRow key={client.id} client={client} />
              </>
            ))}
          </tbody>
        </table>
      )}
    </>
  )
}

export default Clients
