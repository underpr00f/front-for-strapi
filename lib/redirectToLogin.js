import Router from 'next/router';

export async function redirectToLogin(ctx) {
  if (ctx.res) {
    ctx.res.writeHead(302, {
      Location: '/'
    })
    ctx.res.end()
  } else {
    Router.push('/')
  }
}