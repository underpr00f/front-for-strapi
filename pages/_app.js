import React from 'react'
import App from 'next/app'
import Router from 'next/router'
import Loader from '../components/Loader'
import { AuthProvider } from '../context/Auth.context'

export default class MyApp extends App {
  state = { isLoading: false }

  componentDidMount() {
    // Logging to prove _app.js only mounts once,
    // but initializing router events here will also accomplishes
    // goal of setting state on route change

    Router.events.on('routeChangeStart', (url) => {
      console.log(`Loading: ${url}`)
      this.setState({ isLoading: true })
    })
    Router.events.on('routeChangeComplete', () => {
      this.setState({ isLoading: false })
    })
    Router.events.on('routeChangeError', () => {
      this.setState({ isLoading: false })
    })
  }

  render() {
    const {
      Component,
      pageProps,
      router: { pathname },
    } = this.props
    const { isLoading } = this.state

    return (
      <>
        <AuthProvider>
          <Component {...pageProps} isLoading={isLoading} />
        </AuthProvider>
        {isLoading && <Loader />}
      </>
    )
  }
}
