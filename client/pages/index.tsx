import type { NextPage } from 'next'
import AddProjectModal from '../components/AddprojectModal/AddProjectModal'
import ClientModal from '../components/Clientmodal/ClientModal'
import Clients from '../components/Clients/Clients'
import Header from '../components/Header/Header'
import Projects from '../components/Projects/Projects'

const Home: NextPage = () => {
  return (
    <>
      <Header />
      <Projects />
      <ClientModal />
      <AddProjectModal />
      <Clients />
    </>
  )
}

export default Home
