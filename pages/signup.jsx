import React, { useRef, useState } from "react";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import fetch from "isomorphic-unfetch";
import Link from "next/link";

import { Layout } from "../components/Layout"

import { useAuth } from "../context/Auth.context";

import {withNoAuthComponent} from '../hocs/withNoAuthComponent';
import {withNoAuthServerSideProps} from '../hocs/withNoAuthServerSide';

const SignUpPage = () => {

  const router = useRouter();
  const emailInput = useRef();
  const passwordInput = useRef();
  const usernameInput = useRef();
  const [state, dispatch] = useAuth();
  const [token, setToken] = useState(Cookie.get('token') || null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = emailInput.current.value;
    const password = passwordInput.current.value;
    const username = usernameInput.current.value;
    try {
      const response = await fetch("http://localhost:1337/auth/local/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password, username: username })
      });
      if (response.ok) {      
        // setToken.response
        const data = await response.json();

        console.log(data)
        return router.push("/register-email");
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
        <h2>Register Page</h2>
        <Link href={'/'} passHref >
          <button>
            Main
          </button>
        </Link>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
             Username: <input type="text" ref={usernameInput} />
            </label>
          </div>
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
            <button type="submit">Register</button>
          </div>
        </form>
        <Link href={'/private'} passHref>
          <button>
            private
          </button>
        </Link>
      </Layout>
    </>
  );
};


export default withNoAuthComponent(SignUpPage)
export const getServerSideProps = withNoAuthServerSideProps();