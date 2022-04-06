import React from 'react';

function IconRender({icon}) {
    const style ={
        width: 30,
        display: 'flex',
        paddingInlineStart: 5

}
    return (
        <div>
            <img style={style} alt={"app-icon"} src={icon}/>
        </div>
    );
}

export default IconRender;