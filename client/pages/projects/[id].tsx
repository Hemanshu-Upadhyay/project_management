import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import Spinner from '../../components/Spinner'
import { GET_PROJECT } from '../../queries/projectQueries'
import ClientInfo from '../../components/ClientInfo/ClientInfo'
import DeleteProjectButton from '../../components/DeleteProject'
import EditProject from '../../components/EditProject/EditProject'

const ProjectDetails = () => {
  const router = useRouter()
  const { id } = router.query
  console.log(id)
  const { loading, error, data } = useQuery(GET_PROJECT, { variables: { id } })

  if (loading) return <Spinner />
  if (error) return <p>Something Went Wrong</p>

  return (
    <>
      {!loading && !error && (
        <div className="mx-auto w-75 card p-5">
          <a href="/" className="btn btn-light btn-sm w-25 d-inline ms-auto">
            Back
          </a>

          <h1>{data.project.name}</h1>
          <p>{data.project.description}</p>

          <h5 className="mt-3">Project Status</h5>
          <p className="lead">{data.project.status}</p>

          <ClientInfo client={data.project.client} />
          <EditProject project={data.project} />
          <DeleteProjectButton projectId={data.project.id} />
        </div>
      )}
    </>
  )
}

export default ProjectDetails
