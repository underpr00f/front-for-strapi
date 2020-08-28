// noauth.tsx

import {withNoAuthComponent} from '../hocs/withNoAuthComponent';
import {withNoAuthServerSideProps} from '../hocs/withNoAuthServerSide';

import { Layout } from "../components/Layout"

function confirmedEmail () {
    return (
    	<Layout>
			<span>EMAIL CONFIRMED PLEASE SIGN IN!</span>
		</Layout>
    )
    
}

export default withNoAuthComponent(confirmedEmail)
export const getServerSideProps = withNoAuthServerSideProps();