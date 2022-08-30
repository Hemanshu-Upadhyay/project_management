import { FaTrash } from 'react-icons/fa'
import { useMutation } from '@apollo/client'
import { DELETE_CLIENT } from '../../mutations/clientMutation'
import { GET_CLIENTS } from '../../queries/clientsQueries'
import UpdateClient from '../UpdateClient/UpdateClient'

const clientRow = ({ client }) => {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    refetchQueries: [{ query: GET_CLIENTS }],
    // update(cache, { data: { deleteClient } }) {
    //   const { clients } = cache.readQuery({ query: GET_CLIENTS })
    //   cache.writeQuery({
    //     query: GET_CLIENTS,
    //     data: {
    //       allclient: clients.filter((client) => client.id !== deleteClient.id),
    //     },
    //   })
    // },
  })
  const Deleteconfirmation = () => {
    const text = `Are you sure you want to delete this client ${client.name}?`
    if (confirm(text) === true) {
      deleteClient()
    } else {
      return
    }
  }

  return (
    <>
      <tr>
        <td>{client.name}</td>
        <td>{client.email}</td>
        <td>{client.phone}</td>
        <td>
          <div className="">
            <UpdateClient key={client.id} client={client} />
          </div>
          <div
            className="mb-0"
            style={{ position: 'relative', left: '200px', top: '-36px' }}
          >
            <button className="btn btn-danger" onClick={Deleteconfirmation}>
              <FaTrash />
              <strong className="m-2">Delete Client</strong>
            </button>
          </div>
        </td>
      </tr>
    </>
  )
}

export default clientRow
