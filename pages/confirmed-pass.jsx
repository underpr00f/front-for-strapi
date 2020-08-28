// noauth.tsx

import {withNoAuthComponent} from '../hocs/withNoAuthComponent';
import {withNoAuthServerSideProps} from '../hocs/withNoAuthServerSide';

import { Layout } from "../components/Layout"

function confirmedPass () {
    return (
    	<Layout>
			<span>PASSWORD CONFIRMED PLEASE SIGN IN!</span>
		</Layout>
    )
    
}

export default withNoAuthComponent(confirmedPass)
export const getServerSideProps = withNoAuthServerSideProps();