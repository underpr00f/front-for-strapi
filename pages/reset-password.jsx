import React, { useRef, useState } from "react";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import fetch from "isomorphic-unfetch";
import Link from "next/link";

import { Layout } from "../components/Layout"

import { useAuth } from "../context/Auth.context";

import {withNoAuthComponent} from '../hocs/withNoAuthComponent';
import {withNoAuthServerSideProps} from '../hocs/withNoAuthServerSide';

const ResetPasswordPage = () => {

  const router = useRouter();

  const passwordInput = useRef();
  const passwordConfirmInput = useRef();
  const [state, dispatch] = useAuth();
  const [token, setToken] = useState(Cookie.get('token') || null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const queryCode = window.location.search.split('code=')[1];

    const password = passwordInput.current.value;
    const passwordConfirm = passwordConfirmInput.current.value;
    try {
      const response = await fetch("http://localhost:1337/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: queryCode, password: password, passwordConfirmation: passwordConfirm })
      });
      if (response.ok) {      
        const data = await response.json();

        console.log(data)
        return router.push("/confirmed-pass");
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
        <h2>Reset Password Page</h2>
        <Link href={'/'} passHref >
          <button>
            Main
          </button>
        </Link>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Password: <input type="password" ref={passwordInput} />
            </label>
          </div>
          <div>
            <label>
              PasswordConfirm: <input type="password" ref={passwordConfirmInput} />
            </label>
          </div>
          <div>
            <button type="submit">Set New Password</button>
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


export default withNoAuthComponent(ResetPasswordPage)
export const getServerSideProps = withNoAuthServerSideProps();