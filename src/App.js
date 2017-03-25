import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Alert, Pill } from 'elemental'

import QueryInput from './QueryInput/'
import DocumentList from './DocumentList'

import {
  showDueItemsOnly, SHOWING_DUE_ITEMS_ONLY,
  clearDueItemsFilter, CLEARING_DUE_FILTER
} from './actions'


const Content = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 768px;
  padding-left: 20px;
  padding-right: 20px;`

const Row = styled.div`
  display: table;`

const Column = styled.div`
  display: table-cell;`

class App extends Component {

  clearFilterDueItems = (evt, button) => {
    this.props.dispatch(clearDueItemsFilter);
  }

  filterDueItems = (evt, button) => {
    this.props.dispatch(showDueItemsOnly);
  }

  render() {

    return (
      <div>
        <Content>
          {this.props.errors.length > 0 &&
            this.props.errors.map(msg => (
              <Alert type="danger" key={msg}><strong>Error: </strong>{msg}</Alert>
            ))
          }
          <Row>
            <Column><QueryInput /></Column>
            <Column>
              <Pill label='due items only' type="primary"
                onClear={this.clearFilterDueItems}
                onClick={this.filterDueItems} />
            </Column>
          </Row>
          <DocumentList />
        </Content>
      </div>
    );
  }
}

export default connect(state => state)(App);
