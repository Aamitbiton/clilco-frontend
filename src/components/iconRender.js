import React from 'react';

function IconRender({icon}) {
    const style ={
        width: 40,
        display: 'flex'
        }
    return (
        <div>
            <img style={style} src={icon}/>
        </div>
    );
}

export default IconRender;