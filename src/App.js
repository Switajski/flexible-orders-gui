import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled, { keyframes } from 'styled-components'
import { Alert } from 'elemental'

import logo from './logo.svg'
import DocumentList from './DocumentList'

const applogospin = keyframes`
 from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }`

const GlobalStyled = styled.div``

const Logo = styled.img`
  animation: ${applogospin} infinite 20s linear;
  height: 80px;`

const Header = styled.div`
  background-color: #222;
  text-align: center;
  height: 120px;
  padding: 20px;
  color: white;`

const Content = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 768px;
  padding-left: 20px;
  padding-right: 20px;`

class App extends Component {

  render() {

    return (
      <GlobalStyled>
        <Header>
          <Logo src={logo} alt="logo" />
        </Header>
        {this.props.errors.length > 0 &&
          this.props.errors.map(msg => (<Alert type="danger"><strong>Error: {msg}</strong> </Alert>))
        }
        <Content>
          <DocumentList />
        </Content>
      </GlobalStyled>
    );
  }
}

export default connect(state => state)(App);
