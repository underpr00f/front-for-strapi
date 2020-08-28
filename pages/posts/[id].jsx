import React, { useRef, useState } from "react";
import {withAuthComponentSinglePost} from '../../hocs/withAuthComponentPosts';
import {withAuthServerSideSinglePost} from '../../hocs/withAuthServerSidePosts';

import Link from "next/link";
import { Layout } from "../../components/Layout"
import Cookies from 'js-cookie';

function Post({post,id}) {
	const textInput = useRef();
	const [textName, setTextName] = useState(post.text||"")
	const token = Cookies.get('token')

	const [inputValue, setInputValue] = useState(post.text||"");

	const onChangeHandler = event => {
		setInputValue(event.target.value);
	};

	const handleSubmit = async (e) => {
	    e.preventDefault();

	    const text = textInput.current.value;

	    try {
	      const response = await fetch("http://localhost:1337/posts/"+id, {
	        method: "PUT",
	        headers: { "Content-Type": "application/json",
	                    Authorization: `Bearer ${token}`
	        },
	        body: JSON.stringify({ text: text })
	      });
	      if (response.ok) {      
	        // setToken.response
	        const data = await response.json();
	        setTextName(data.text)
	        console.log(data)
	      } else {
	        alert(response.statusText)
	        throw new Error(response.status + " " + response.statusText);
	      }
	    } catch(err) {
	      console.log(err); // TypeError: failed to fetch
	    }

	};
    return (
    	<>
    	<Layout>
			<h3>{textName}</h3>

			<form onSubmit={handleSubmit}>
	          <div>
	            <label>
	             text: <input type="text" ref={textInput} value={inputValue} onChange={onChangeHandler}/>
	            </label>
	          </div>
	          <div>
	            <button type="submit">Update</button>
	          </div>
	        </form>
		</Layout>
		</>
    )
    
}
export default withAuthComponentSinglePost(Post)
export const getServerSideProps = withAuthServerSideSinglePost();
