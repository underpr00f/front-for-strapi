import React from "react";
import Link from "next/link";

const UserComponent = ({user, logoutClick}) => {
    // const user = false
    if(!user){
        return (
            <>
             <h1>
              Loading....
             </h1>
            </>
        )
    }
    if(user&&user.username ===""){
        return (
        	<>
        		<Link href={'/signup'} passHref>
    	          <a className="nav-link">
    	            signup
    	          </a>
    	        </Link>
                <Link href={'/signin'} passHref>
                  <a className="nav-link">
                    signin
                  </a>
                </Link>
        	</>
        )
    }
    return (
        <>
            <Link href={'/me'} passHref>
                <a className="nav-link">{user.username}</a>
            </Link>
            <button onClick={logoutClick} className="btn btn-link">
                LogOut
            </button>
        </>
    )
}
export default UserComponent