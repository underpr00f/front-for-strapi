// noauth.tsx

import {withNoAuthComponent} from '../hocs/withNoAuthComponent';
import {withNoAuthServerSideProps} from '../hocs/withNoAuthServerSide';

import { Layout } from "../components/Layout"

function registerEmail () {
    return (
    	<Layout>
			<span>PLEASE CHECK YOUR EMAIL BOX TO CONFIRM ACCOUNT!</span>
		</Layout>
    )
    
}

export default withNoAuthComponent(registerEmail)
export const getServerSideProps = withNoAuthServerSideProps();