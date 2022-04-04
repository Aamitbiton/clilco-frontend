import React from 'react';
import './title.css'

function Title({title}) {
    return (
        <div>
            <p className={'title'}>{title}</p>
        </div>
    );
}

export default Title;