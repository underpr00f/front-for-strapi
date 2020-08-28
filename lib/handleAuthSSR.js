// import axios from 'axios';
import Router from 'next/router';
import Cookie from "js-cookie";
import fetch from "isomorphic-unfetch";
import { redirectToLogin } from './redirectToLogin'
// set up cookies
const serverUrl = 'http://localhost:1337';

export async function handleAuthSSR(ctx) {
  let token = null;

  // if context has request info aka Server Side
  if (ctx.req) {
    // ugly way to get cookie value from a string of values
    // good enough for demostration
    token = ctx.req.headers.cookie && ctx.req.headers.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
  } else {
    // we dont have request info aka Client Side
    token = Cookie.get('token')
  }
  
  if (token) {
    try {
      const response = await fetch("http://localhost:1337/users/me", {
          method: "GET",
          // credentials: "include",
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      const data = await response.json();
      // const response = await axios.get(serverUrl + "/api/token/ping", { headers: { 'Authorization': token } });
      // dont really care about response, as long as it not an error
      return data
    } catch (err) {
      // in case of error
      console.log(err);
      console.log("redirecting back to main page");
      // redirect to login
      // redirectToLogin(ctx)
    }    
  } else {
    // redirect to login
    // redirectToLogin(ctx)   
  }

}