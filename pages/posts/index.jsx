import React, { useRef, useState } from "react";
import {withAuthComponentPosts} from '../../hocs/withAuthComponentPosts';
import {withAuthServerSidePosts} from '../../hocs/withAuthServerSidePosts';
import Cookies from 'js-cookie';

import Link from "next/link";
import { Layout } from "../../components/Layout"

function Posts({posts}) {
	const numberInputG = useRef();
	const numberInputL = useRef();
	// const [textName, setTextName] = useState(post.text||"")
	const token = Cookies.get('token')

	const [inputValueG, setInputValueG] = useState("");
	const [inputValueL, setInputValueL] = useState("");
	const [filterPosts, setFilterPosts] = useState(posts);

	const onChangeHandler = async (event) => {
		let validInputG = inputValueG
		let validInputL = inputValueL
	
		if (event.target.name === "numberInputG") {
			validInputG = (event.target.validity.valid) ? event.target.value:inputValueG
			if (validInputG!=="") { 
				setInputValueG(validInputG); 
			} else {
				validInputG=0; //for greater ===0
				setInputValueG(""); 
			}			
		} else if (event.target.name === "numberInputL") {
			validInputL = (event.target.validity.valid) ? event.target.value:inputValueL
			if (validInputL!=="") { 
				setInputValueL(validInputL); 
			} else {
				validInputL="";  //for lesser ===""
				setInputValueL(""); 
			}			
		}
		console.log("validInputG",validInputG, "validInputL",validInputL)

		try {

		  if (validInputG==="") { validInputG=0 } //fix bug with empty inputs
	      const response = await fetch("http://localhost:1337/posts?id_gte="+validInputG+"&id_lte="+validInputL, {
	        method: "GET",
	        headers: { "Content-Type": "application/json",
	                    Authorization: `Bearer ${token}`
	        },
	      });
	      if (response.ok) {      
	        // setToken.response
	        const data = await response.json();
	        console.log(data)
	        setFilterPosts(data)
	      } else {
	        alert(response.statusText)
	        throw new Error(response.status + " " + response.statusText);
	      }
	    } catch(err) {
	      console.log(err); // TypeError: failed to fetch
	    }
	};

    return (
    	<Layout>
			<h3>Почитать статьи: </h3>
			<div>
	            <label>
	             Filter Great than id (num): <input type="text" name="numberInputG" pattern="[0-9]*" ref={numberInputG} value={inputValueG} onChange={onChangeHandler}/>
	            </label>
	        </div>
	        <div>
	            <label>
	             Filter Less than id (num): <input type="text" name="numberInputL" pattern="[0-9]*" ref={numberInputL} value={inputValueL} onChange={onChangeHandler}/>
	            </label>
	        </div>
	        <ul>
	          {filterPosts.map((show) => (
	            <li key={show.id}>
	              <Link href="/posts/[id]" as={`/posts/${show.id}`}>
	                  <a>
	                    {show.text}
	                  </a>
	              </Link>
	            </li>
	          ))}
	        </ul>
		</Layout>
    )
    
}
export default withAuthComponentPosts(Posts)
export const getServerSideProps = withAuthServerSidePosts();
