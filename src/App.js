import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import { connect } from 'react-redux'

import logo from './logo.svg';
import DocumentList from './DocumentList';

const applogospin = keyframes`
 from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }`

const GlobalStyled = styled.div`
  background-color: #DDD;`

const Logo = styled.img`
  animation: ${applogospin} infinite 20s linear;
  height: 80px;`

const H2 = styled.h2`
  color: white;`

const Header = styled.div`
  background-color: #222;
  text-align: center;
  height: 150px;
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
          <H2>Flexible Orders</H2>
        </Header>
        <Content>
          <br/>
          <DocumentList documents={this.props.documents} />
        </Content>
      </GlobalStyled>
    );
  }
}

export default connect(state => state)(App);
