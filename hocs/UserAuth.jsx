// withAuthComponent.tsx
import React from "react";

export function withUserAuth(Component){
    return ({user, data}) => {
        if(!user){
            return (
            	<>
            		<div>
            		<Link href={'/signin'} passHref>
			          <button>
			            signin
			          </button>
			        </Link>
            		</div>
            		<div>Sign Up</div>
            	</>
            )
        }
        return <Component {...data.props}/>
    }
}