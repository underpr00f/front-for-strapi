// withAuthComponent.tsx
import React from "react";
import { Layout } from "../components/Layout"

export function withNoAuthComponent(Component){

    return ({user, data}) => {
        if(user){
            return (
            	<Layout>
            		<span>Logout First To Get This Page</span> 
            	</Layout>
            )
        }
        return <Component {...data.props}/>
    }
}