import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { GET_CLIENTS } from '../../queries/clientsQueries'
import { UPDATE_CLIENT } from '../../mutations/clientMutation'
import { FaUser } from 'react-icons/fa'

const UpdateClient = ({ client }) => {
  const [name, setName] = useState(client.name)
  const [email, setEmail] = useState(client.email)
  const [phone, setPhone] = useState(client.phone)

  const [updateClient] = useMutation(UPDATE_CLIENT, {
    variables: { id: client.id, name, email, phone },
    refetchQueries: [{ query: GET_CLIENTS }],
  })

  const data = () => {
    console.log(client)
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (!name || !email || !phone) {
      return alert('Please fill out all fields')
    }

    updateClient(name, email, phone)
  }
  return (
    <>
      <div className="mb-0 mt-2">
        <button
          type="button"
          className="btn btn-secondary"
          data-bs-toggle="modal"
          data-bs-target="#updateclientmodal"
        >
          <div className="d-flex align-items-center">
            <FaUser className="icon" />
            <div onClick={data}>
              <strong>Update Client</strong>
            </div>
          </div>
        </button>

        <div
          className="modal fade"
          id="updateclientmodal"
          aria-labelledby="UpdateClientModal"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="UpdateClientModal">
                  Update Client
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input
                      type="text"
                      className="form-control"
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>

                  <button
                    type="submit"
                    data-bs-dismiss="modal"
                    className="btn btn-secondary"
                    onClick={onSubmit}
                  >
                    Update Client
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UpdateClient
