 
import Link from 'next/link'
// import { useCount, useDispatchCount } from '../context/AppContext'
import { Layout } from "../components/Layout"

const IndexPage = () => {

  return (
    <Layout>
      <h1>About</h1>
      <p>Counter</p>
      <p>
        <Link href="/">
          <a>Main</a>
        </Link>
      </p>
    </Layout>
  )
}

export default IndexPage