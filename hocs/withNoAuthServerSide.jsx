// withAuthServerSide.tsx

import React from "react";
import { redirectToLogin } from '../lib/redirectToLogin'

export function withNoAuthServerSideProps(getServerSidePropsFunc){
    return async (ctx) => {
      // console.log(ctx)
      
      let token = null;
      let user = null;
      // if context has request info aka Server Side
      if (ctx.req) {
        // ugly way to get cookie value from a string of values
        // good enough for demostration
        token = ctx.req.headers.cookie && ctx.req.headers.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
      } else {
        // we dont have request info aka Client Side
        token = Cookie.get('token')
      }

      if (!token) {
        console.log("not auth");
        // redirect to login
        // redirectToLogin(ctx)   
      }

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
          user = await getUser(data)
          // return data
        } catch (err) {
          // in case of error
          console.log(err);
          console.log("redirecting back to main page");
          // redirect to login
          // redirectToLogin(ctx)
        }    

      if(getServerSidePropsFunc){
        return {props: {user, data: await getServerSidePropsFunc(context, user)}};
      }
      return {props: {user, data: {props: {user}}}};
    }
}

async function getUser(content) {
    if (content.error) {
        return null
    }
    const { id, username, email } = content;
    // console.log('content', content)
    return {
        id,
        username,
        email
    }
}