import React, { useRef, useState } from "react";
import {withAuthComponent} from '../hocs/withAuthComponent';
import {withAuthServerSideProps} from '../hocs/withAuthServerSide';

import Link from "next/link";
import { Layout } from "../components/Layout"
import Cookies from 'js-cookie';

function contactPage({user}) {
	const textInput = useRef();
	const [textName, setTextName] = useState("Contact Us")
	const token = Cookies.get('token')

	const [inputValue, setInputValue] = useState("");

	const onChangeHandler = event => {
		setInputValue(event.target.value);
	};

	const handleSubmit = async (e) => {
	    e.preventDefault();

	    const text = textInput.current.value;

	    try {
	      const response = await fetch("http://localhost:1337/contact-form", {
	        method: "POST",
	        headers: { "Content-Type": "application/json",
	                    Authorization: `Bearer ${token}`
	        },
	        body: JSON.stringify({ 
	        	message: text,
	        	to: user.email
	        })
	      });
	      if (response.ok) {      
	        // setToken.response
	        const data = await response.json();
	        setTextName("Message Sent")
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
	             message: <input type="text" ref={textInput} value={inputValue} onChange={onChangeHandler}/>
	            </label>
	          </div>
	          <div>
	            <button type="submit">Send</button>
	          </div>
	        </form>
		</Layout>
		</>
    )
}   

export const getServerSideProps = withAuthServerSideProps();
export default withAuthComponent(contactPage)
