import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled, { keyframes } from 'styled-components'
import { Alert } from 'elemental'

import logo from './logo.svg'
import DocumentList from './DocumentList'

const WrappedAlert = styled(Alert)``

const applogospin = keyframes`
 from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }`

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
      <div>
        <Header>
          <Logo src={logo} alt="logo" />
        </Header>
        <Content>
          {this.props.errors.length > 0 &&
            this.props.errors.map(msg => (
              <Alert type="danger"><strong>Error: </strong>{msg}</Alert>
            ))
          }
          <DocumentList />
        </Content>
      </div>
    );
  }
}

export default connect(state => state)(App);
