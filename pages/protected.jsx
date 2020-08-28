// protected.tsx

import {withAuthComponent} from '../hocs/withAuthComponent';
import {withAuthServerSideProps} from '../hocs/withAuthServerSide';

import { Layout } from "../components/Layout"

function protectedPage({user}) {
    return (
    	<Layout>
			<span>{user.username}</span>
		</Layout>
    )
    
}

export default withAuthComponent(protectedPage)
export const getServerSideProps = withAuthServerSideProps();