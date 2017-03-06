import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import { connect } from 'react-redux'

import logo from './logo.svg';
import DocumentList from './DocumentList';

const applogospin = keyframes`
 from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }`

const GlobalStyled = styled.div`
  text-align: center;`

const Logo = styled.img`
  animation: ${applogospin} infinite 20s linear;
  height: 80px;`

const Header = styled.div`
  background-color: #222;
  height: 150px;
  padding: 20px;
  color: white;`

const Content = styled.div`
  background-color: #DDD;
  border: 1em;`

class App extends Component {
  render() {
    return (
      <GlobalStyled>
        <Header>
          <Logo src={logo} alt="logo" />
          <h2>Flexible Orders</h2>
        </Header>
        <Content>
          <DocumentList documents={this.props.documents} />
        </Content>
      </GlobalStyled>
    );
  }
}

export default connect(state => state)(App);
