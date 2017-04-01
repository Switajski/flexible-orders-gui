import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Alert} from 'elemental'

import QueryInput from './QueryInput/'
import DocumentList from './DocumentList/'

const Content = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 768px;
  padding-left: 20px;
  padding-right: 20px;`

export class App extends Component {

  render() {

    return (
      <div>
        <Content>
          {this.props.errors.length > 0 &&
            this.props.errors.map(msg => (
              <Alert type="danger" key={msg}><strong>Error: </strong>{msg}</Alert>
            ))
          }
          <QueryInput />
          <DocumentList />
        </Content>
      </div>
    );
  }
}

export default connect(state => state.global)(App);
