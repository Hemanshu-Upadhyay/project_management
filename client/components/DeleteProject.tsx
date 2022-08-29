import { FaTrash } from 'react-icons/fa'
import { useMutation } from '@apollo/client'
import { DELETE_PROJECT } from '../mutations/projectMutation'
import { GET_PROJECTS } from '../queries/projectQueries'
import Link from 'next/link'

export default function DeleteProjectButton({ projectId }) {
  const deleteconfirmation = () => {
    const text = 'Are you sure you want to delete this project?'
    if (confirm(text) === true) {
      deleteProject()
    } else {
      return
    }
  }

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id: projectId },
    onCompleted: () => {
      destination: '/'
    },
    refetchQueries: [{ query: GET_PROJECTS }],
  })

  return (
    <div className="d-flex mt-5 ms-auto">
      <Link href="/">
        <button className="btn btn-danger m-2" onClick={deleteconfirmation}>
          <FaTrash className="icon" /> Delete Project
        </button>
      </Link>
    </div>
  )
}
