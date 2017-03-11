import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
    position:relative`
const Overlay = styled.div`
    position:absolute;
    width: 100%;
    height: 100%;
    background-color:rgba(0, 100, 0, 0.5);`

export default (Component, Content) => {
    return (props) => (
        <Wrapper>
            <Overlay children={Content}/>
            <Component {...props} />
        </Wrapper>)
    
}