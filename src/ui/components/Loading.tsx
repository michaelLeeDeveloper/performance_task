import React, { FC } from 'react';
import "../stylesheets/Loading.css";


const Loading: FC = () => {
    return (
        <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    );
};

export default Loading;