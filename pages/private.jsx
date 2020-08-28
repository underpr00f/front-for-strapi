import React from 'react';
// import { Cookies } from 'react-cookie';
import { handleAuthSSR } from '../lib/handleAuthSSR';
import Link from "next/link";
import { logout } from '../lib/logout';
import { useAuth } from "../context/Auth.context"
const serverUrl = 'http://localhost:1337';

// set up cookies
// const cookies = new Cookies();
const Secret = ({username}) => {
    // onPingCall = async (e) => {
  //   const token = cookies.get('token')

  //   try {
  //     const res = await axios.get(serverUrl + '/api/ping', { headers: { 'Authorization': token } });
  //     console.log(res.data.msg);
  //   } catch (err) {
  //     console.log(err.response.data.msg);
  //   }
  // }
  const [state, dispatch] = useAuth()
  return (
    <>
    <div>
      <h2>OLD Secret page {username}</h2>
      <p>Only accessible via a valid JWT CONTEXT: {state.username}</p>
      <br></br>
      {/*<button onClick={(e) => this.onPingCall(e)}>Ping Call</button>*/}
      <p>Check console for response</p>
      <Link href={'/signin'} passHref >
        <button onClick={logout}>
          LogOut
        </button>
      </Link>
      <Link href={'/'} passHref >
        <button>
          Main
        </button>
      </Link>
    </div>
    </>
  )

}


// Server-Side Rendering
Secret.getInitialProps = async (ctx) => {
  let username
  // Must validate JWT
  // If the JWT is invalid it must redirect
  // back to the main page. You can do that
  // with Router from 'next/router
  const data = await handleAuthSSR(ctx);
  if (data) {
    username = data.username;
  }
  
  // Must return an object
  return { username }
}

export default Secret;