import { useQuery } from '@apollo/client'
import Spinner from '../Spinner'
import { GET_PROJECTS } from '../../queries/projectQueries'
import ProjectCard from '../ProjectCard/ProjectCard'
import { Key } from 'react'

export default function Projects() {
  const { loading, error, data } = useQuery(GET_PROJECTS)

  if (loading) return <Spinner />
  if (error) return <p>Something Went Wrong</p>

  return (
    <>
      {data.allprojects.length > 0 ? (
        <div className="row mt-4">
          {data.allprojects.map((project: { id: Key | null | undefined }) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <p>No Projects</p>
      )}
    </>
  )
}
