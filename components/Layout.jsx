/* /components/Layout.js */

import React, { useContext } from "react";
import Head from "next/head";
import Link from "next/link";
import { logout } from "../lib/auth";
import { useAuth } from "../context/Auth.context"

import dynamic from 'next/dynamic'

const UserComponentWithNoSSR = dynamic(
  () => import('../components/UserComponent'),
  { ssr: false }
)
// const isServer = () => typeof window === "undefined";

export const Layout = ({children}) => {
  const title = "Welcome to Nextjs";
  // const { user, setUser } = useContext(AppContext);
  const [state, dispatch] = useAuth();
  const logoutClick = () => {
    dispatch({
      type: "removeAuthDetails"
    }) 
    logout();
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          rel="stylesheet"
          href="https://bootswatch.com/4/cerulean/bootstrap.min.css"
        />
      </Head>
      <header>
        <style jsx>
          {`
            a {
              color: white;
            }
            h5 {
              color: white;
              padding-top: 11px;
            }
          `}
        </style>
        <div className="navbar navbar-dark bg-dark">
          <div>
            <Link href="/">
              <a className="navbar-brand">Home</a>
            </Link>
            <Link href="/posts">
              <a className="navbar-link mr-5">Posts</a>
            </Link>
            <Link href="/contact">
              <a className="navbar-link mr-5">Contact</a>
            </Link>
          </div>

          <div className="ml-auto d-flex">
            <UserComponentWithNoSSR user={state} logoutClick={logoutClick}/>
          </div>
          <div>
          </div>
        </div>
      </header>
      <main id="main">{children}</main>
    </>
  );
};

// export default Layout;