import React from "react";
import Link from "next/link";
import { Layout } from "../components/Layout"

const Home = ({err,shows}) => {

  return (
    <Layout>
        <Link href={'/signin'} passHref>
          <button>
            signin
          </button>
        </Link>
        <Link href={'/private'} passHref>
          <button>
            private
          </button>
        </Link>
        <Link href={'/protected'} passHref>
          <button>
            protected
          </button>
        </Link>
{/*       <h3>Почитать статьи: </h3>
        <ul>
          {shows.map((show) => (
            <li key={show.id}>
              <Link href="/people/[id]" as={`/people/${show.id}`}>
                  <a>
                    {show.text}
                  </a>
              </Link>
            </li>
          ))}
        </ul>*/}
    </Layout>
  )
}
// Home.getInitialProps = async () => {

//   const res = await fetch('http://localhost:1337/posts')
//   const data = await res.json()
//   if (data.error) {
//     return { 
//       err: data.message,
//       shows: [] 
//     }
//   }
//   console.log(data)
//   console.log(`Show data fetched. Count: ${data.length}`)

//   const shows = data.map((entry) => entry)

//   return {
//     err: null,
//     shows: shows
//   }
// }
export default Home