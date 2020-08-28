import React, { useReducer, useContext, useEffect } from "react"

// create the context
export const AuthStateContext = React.createContext({})

// set up initial state which is used in the below `AuthProvider` function
const initialState = { username: "", id: "", email: "" }

// set up the reducer - same as Redux, allows us to process more complex changes
// to the state within the context API
const reducer = (state, action) => {
	
  switch (action.type) {
    case "setAuthDetails":
      return {
        username: action.payload.username,
        id: action.payload.id,
        email: action.payload.email,
      }
    case "removeAuthDetails":
      return {
        username: initialState.username,
        id: initialState.id,
        email: initialState.email,
      }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

// create and export the AuthProvider - this is imported to the _app.js file
// and wrapped around the whole app, providing context to the whole app, and
// is called each time this specific context is accessed (updated or retrieved)
export const AuthProvider = ({ children }) => {

  let localState = null
  if (typeof localStorage !== "undefined" && localStorage.getItem("userInfo")) {
    localState = JSON.parse(localStorage.getItem("userInfo") || "")
  }

  const [state, dispatch] = useReducer(reducer, localState || initialState)

  if (typeof localStorage !== "undefined") {
    useEffect(() => {
      localStorage.setItem("userInfo", JSON.stringify(state))
    }, [state])
  }
  return (
    <AuthStateContext.Provider value={[state, dispatch]}>
      {children}
    </AuthStateContext.Provider>
  )
}

export const useAuth = () => useContext(AuthStateContext)