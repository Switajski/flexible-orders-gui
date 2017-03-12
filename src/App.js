import React, { Component } from 'react'
import styled, { keyframes } from 'styled-components'
import { connect } from 'react-redux'

import logo from './logo.svg'
import DocumentList from './DocumentList'
import { Pill } from 'elemental'

import indexOnChildrenByParent from './childrenByParent'
import {
  showDueItemsOnly, SHOW_DUE_ITEMS_ONLY,
  dueItemsFilterClear, DUE_ITEMS_FILTER_CLEAR
} from './Actions'

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

  onDueDropdownSelect = (event) => {
    switch (event) {
      case SHOW_DUE_ITEMS_ONLY:
        return this.props.dispatch(showDueItemsOnly)
      case DUE_ITEMS_FILTER_CLEAR:
        return this.props.dispatch(dueItemsFilterClear)
      default: return false;
    }
  }

  clearFilterDueItems = (evt, button) => {
    this.props.dispatch(dueItemsFilterClear);
  }

  filterDueItems = (evt, button) => {
    this.props.dispatch(showDueItemsOnly);
  } 


  render() {
    const childrenByParent = indexOnChildrenByParent(this.props.documents);

    return (
      <GlobalStyled>
        <Header>
          <Logo src={logo} alt="logo" />
          <H2>Flexible Orders</H2>
        </Header>
        <Content>
          <br />
          <Pill label='due items only' type="primary" onClear={this.clearFilterDueItems} onClick={this.filterDueItems}/> 
          <DocumentList documents={this.props.documents}
            childrenByParent={childrenByParent}
            filter={this.props.filter} />
        </Content>
      </GlobalStyled>
    );
  }
}

export default connect(state => state)(App);
