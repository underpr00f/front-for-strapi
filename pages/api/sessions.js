// import axios from 'axios';
import Router from 'next/router';
import { Cookies } from 'react-cookie';
// import fetch from "isomorphic-unfetch";
// set up cookies
const cookies = new Cookies();
const serverUrl = 'http://localhost:3001';

export async function handleAuthSSR(ctx) {
  let token = null;

  // if context has request info aka Server Side
  if (ctx.req) {
    // ugly way to get cookie value from a string of values
    // good enough for demostration
    token = ctx.req.headers.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
  }
  else {
    // we dont have request info aka Client Side
    token = cookies.get('token')
  }

  try {
    const response = await fetch("http://localhost:1337/auth/local", {
      method: "GET",
      headers: { 'Authorization': token }
    });
    // const response = await axios.get(serverUrl + "/api/token/ping", { headers: { 'Authorization': token } });
    // dont really care about response, as long as it not an error
    console.log("token ping:", response.data.msg)
  } catch (err) {
    // in case of error
    console.log(err.response.data.msg);
    console.log("redirecting back to main page");
    // redirect to login
    if (ctx.res) {
      ctx.res.writeHead(302, {
        Location: '/'
      })
      ctx.res.end()
    } else {
      Router.push('/')
    }
  }
}

// import { withIronSession } from "next-iron-session";

// const VALID_EMAIL = "example@mail.com";
// const VALID_PASSWORD = "12345";

// export default withIronSession(
//   async (req, res) => {
//     if (req.method === "POST") {
      
//       const { email, password } = req.body;
//       console.log("req.body", req.body)
//       // if (email === VALID_EMAIL && password === VALID_PASSWORD) {
//       if (email && password) {
//         req.session.set("user", { email });
//         console.log("req.session", req.session)
//         await req.session.save();
//         return res.status(201).send("");
//       }

//       return res.status(403).send("");
//     }

//     return res.status(404).send("");
//   },
//   {
//     cookieName: "MYSITECOOKIE",
//     cookieOptions: {
//       secure: process.env.NODE_ENV === "production" ? true : false
//     },
//     password: process.env.APPLICATION_SECRET
//   }
// );