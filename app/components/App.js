import React, { PropTypes } from 'react';

const App = ({ children }) =>
    <div>
        <h1>RSS Reader</h1>
        { children }
    </div>;

App.propTypes = {
    children: PropTypes.object
};

export default App;
