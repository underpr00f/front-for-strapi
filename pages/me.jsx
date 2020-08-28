// me.jsx

import {withAuthComponent} from '../hocs/withAuthComponent';
import {withAuthServerSideProps} from '../hocs/withAuthServerSide';

import { Layout } from "../components/Layout"

function protectedPage({user}) {

  return (
    <Layout>
      <div>username: {user.username}</div>
      <div>id: {user.id}</div>
      <div>email: {user.email}</div>
    </Layout>
  )
    
}

export default withAuthComponent(protectedPage)
export const getServerSideProps = withAuthServerSideProps();