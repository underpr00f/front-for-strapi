// noauth.tsx

import {withNoAuthComponent} from '../hocs/withNoAuthComponent';
import {withNoAuthServerSideProps} from '../hocs/withNoAuthServerSide';

import { Layout } from "../components/Layout"

function resetPass () {
    return (
    	<Layout>
			<span>PLEASE CHECK YOUR EMAIL BOX TO RESET PASSWORD!</span>
		</Layout>
    )
    
}

export default withNoAuthComponent(resetPass)
export const getServerSideProps = withNoAuthServerSideProps();