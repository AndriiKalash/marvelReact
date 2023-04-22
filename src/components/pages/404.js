import { Link } from 'react-router-dom'
import ErrorMessage from '../errorMessage/ErrorMessage'

const Page404 = () => (
    <div>
            <ErrorMessage />
            <p style={{ 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px', 'marginBottom': '15px' }}>Page dosn't exist</p>
            <Link to='/' style={{ 'color': '#9F0013', 'display': 'block', 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px' }} >
                Back to main page
            </Link>
        </div>
);

export default Page404;