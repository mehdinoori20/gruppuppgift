

import React from 'react'


interface Props {
    title: String;
}

const Title = (props: Props) => {
    const {title} = props;
    return (
        <h1>{title}</h1>


    )
}

export default Title