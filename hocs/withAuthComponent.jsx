// withAuthComponent.tsx
import React from "react";
import { Layout } from "../components/Layout"

export function withAuthComponent(Component){

    return ({user, data}) => {
    	console.log(user, data)
        if(!user){
            return (
            	<Layout>
            		<span>Access Denied</span> 
            	</Layout>
            )
        }
        return <Component {...data.props}/>
    }
}