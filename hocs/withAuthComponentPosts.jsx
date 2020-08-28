// withAuthComponent.tsx
import React from "react";
import { Layout } from "../components/Layout"

export function withAuthComponentPosts(Component){

    return ({posts, data}) => {
        if(!posts){
            return (
            	<Layout>
            		<span>Access Posts Denied</span> 
            	</Layout>
            )
        }
        return <Component {...data.props}/>
    }
}

export function withAuthComponentSinglePost(Component){

    return ({post, data}) => {
        if(!post){
            return (
                <Layout>
                    <span>Access Posts Denied</span> 
                </Layout>
            )
        }
        return <Component {...data.props}/>
    }
}