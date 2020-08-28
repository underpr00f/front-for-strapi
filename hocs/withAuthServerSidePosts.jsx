// withAuthServerSide.tsx

import React from "react";
import { redirectToLogin } from '../lib/redirectToLogin'

export function withAuthServerSidePosts(getServerSidePropsFunc){
    return async (ctx) => {      
      let token = null;
      let posts = null;

      if (ctx.req) {
        token = ctx.req.headers.cookie && ctx.req.headers.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
      } else {
        token = Cookie.get('token')
      }
      if (!token) {
        console.log("not auth"); 
      }
 
        try {
          const response = await fetch("http://localhost:1337/posts", {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
          const data = await response.json();
          posts = await getPosts(data)
        } catch (err) {
          console.log(err);
          console.log("redirecting back to main page");
        } 
      if(getServerSidePropsFunc){
        return {props: {posts, data: await getServerSidePropsFunc(context, posts)}};
      }
      return {props: {posts, data: {props: {posts}}}};
    }
}

async function getPosts(content) {
    if (content.error) {
        return null
    }
    const shows = content.map((entry) => entry)

    return shows
}

//SINGLE POST
export function withAuthServerSideSinglePost(getServerSidePropsFunc){
    return async (ctx) => {      
      let token = null;
      let post = null;
      let id = null;

      if (ctx.req) {
        id = ctx.query.id
        token = ctx.req.headers.cookie && ctx.req.headers.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
      } else {
        id = window.location.pathname.split("/").pop()
        token = Cookie.get('token')
      }
      if (!token) {
        console.log("not auth"); 
      }
        try {
          const response = await fetch("http://localhost:1337/posts/"+id, {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
          const data = await response.json();
          post = await getSinglePost(data)
        } catch (err) {
          console.log(err);
          console.log("redirecting back to main page");
        } 
      if(getServerSidePropsFunc){
        return {props: {post, id, data: await getServerSidePropsFunc(context, post, id)}};
      }
      return {props: {post, id, data: {props: {post, id}}}};
    }
}

async function getSinglePost(content) {
    if (content.error) {
        return null
    }
    console.log(content)
    // const shows = content.map((entry) => entry)

    return content
}