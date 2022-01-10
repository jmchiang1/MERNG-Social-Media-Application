import React, {useContext} from 'react';
import { Route, Navigate } from 'react-router-dom';

import { AuthContext } from '../Context/Auth'

const PrivateRoute = ({ component: Component, ...rest }) => {

    const { user } = useContext(AuthContext);

    if(user) {
        return <Navigate to="/" />;
    }
    return <Route path="/login" element={<Component />} />
};

export default PrivateRoute;