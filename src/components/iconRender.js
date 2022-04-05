import React from 'react';

function IconRender({icon}) {
    const style ={
        width: 30,
        display: 'flex',
        paddingInlineStart: 5

}
    return (
        <div>
            <img style={style} src={icon}/>
        </div>
    );
}

export default IconRender;