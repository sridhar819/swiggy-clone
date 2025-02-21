import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = (props) => {
    const { children } = props
    const token = Cookies.get('jwt_token');

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
