// noauth.tsx

import {withNoAuthComponent} from '../hocs/withNoAuthComponent';
import {withNoAuthServerSideProps} from '../hocs/withNoAuthServerSide';

import { Layout } from "../components/Layout"

function noAuth () {
    return (
    	<Layout>
			<span>No Auth Page</span>
		</Layout>
    )
    
}

export default withNoAuthComponent(noAuth)
export const getServerSideProps = withNoAuthServerSideProps();