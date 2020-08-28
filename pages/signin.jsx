import React, { useRef, useState } from "react";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import fetch from "isomorphic-unfetch";
import Link from "next/link";

import { Layout } from "../components/Layout"

import { useAuth } from "../context/Auth.context";

import {withNoAuthComponent} from '../hocs/withNoAuthComponent';
import {withNoAuthServerSideProps} from '../hocs/withNoAuthServerSide';

const SignInPage = () => {

  const router = useRouter();
  const emailInput = useRef();
  const passwordInput = useRef();
  const [state, dispatch] = useAuth();
  const [token, setToken] = useState(Cookie.get('token') || null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = emailInput.current.value;
    const password = passwordInput.current.value;

    try {
      const response = await fetch("http://localhost:1337/auth/local", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: email, password: password })
      });
      if (response.ok) {      
        // setToken.response
        const data = await response.json();
        // console.log("response", data.jwt);
        Cookie.set('token', data.jwt);
        setToken(data.jwt)
        dispatch({
          type: "setAuthDetails",
          payload: {
            username: data.user.username,
            id: data.user.id,
            email: data.user.email,
          },
        }) 
       
        return router.push("/protected");
      } else {
        alert(response.statusText)
        throw new Error(response.status + " " + response.statusText);
      }
    } catch(err) {
      console.log(err); // TypeError: failed to fetch
    }

  };

  return (
    <>      
      <Layout>
        <Link href={'/'} passHref >
          <button>
            Main
          </button>
        </Link>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
             Email: <input type="text" ref={emailInput} />
            </label>
          </div>
          <div>
            <label>
              Password: <input type="password" ref={passwordInput} />
            </label>
          </div>
          <div>
            <button type="submit">Sign in</button>
          </div>
        </form>
        <Link href={'/private'} passHref>
          <button>
            private
          </button>
        </Link>
        <Link href={'/forgot-password'} passHref>
          <button>
            forgot-password
          </button>
        </Link>
      </Layout>
    </>
  );
};


export default withNoAuthComponent(SignInPage)
export const getServerSideProps = withNoAuthServerSideProps();