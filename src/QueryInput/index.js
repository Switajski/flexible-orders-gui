import React, { Component } from 'react'
import { connect } from 'react-redux'
import Autosuggest from 'react-autosuggest'
import { Pill } from 'elemental'
import styled from 'styled-components'

import { updateInputValue, loadSuggestions, clearSuggestions } from './actions'
import { setFilter } from '../actions'
// eslint-disable-next-line
import autosuggest from './autosuggest.css'
import { CUSTOMER_ID_FILTER, STATUS } from '../Filter'

import {
    unsetFilter
} from '../actions'


const Row = styled.div`
  display: table;
  border-spacing: 10px`

const Column = styled.div`
  display: table-cell;
  vertical-align: top`

/**
 * Code from http://codepen.io/moroshko/pen/ZQLyNK?editors=0010#0
 */
export class QueryInput extends Component {

    onUnsetFilter(filter) {
        this.props.dispatch(unsetFilter(filter))
    }

    onSuggestionsFetchRequested = ({ value }) => {
        this.props.dispatch(loadSuggestions(value))
    }

    onSuggestionsClearRequested = () => {
        this.props.dispatch(clearSuggestions)
    }

    onInputChange = (inputValue, { newValue }) => {
        this.props.dispatch(updateInputValue(newValue))
    }

    onSuggestionSelected = (event, { suggestionValue }) => {
        const splittedSuggestionValue = suggestionValue.split(':')
        this.props.dispatch(setFilter(splittedSuggestionValue[0], splittedSuggestionValue[1]))
    }

    getFilterValue = (filter) =>
        this.props.filters && this.props.filters[filter]
            ? this.props.filters[filter]
            : false

    render = () => {
        const { value, suggestions, isLoading, 
        //    onSuggestionsFetchRequested, onSuggestionsClearRequested 
        } = this.props;

        const status = (isLoading ? 'Loading...' : 'Type to load suggestions');

        const inputProps = {
            placeholder: "Type 'D'",
            value,
            onChange: this.onInputChange
        };

        const customerFilterValue = this.getFilterValue(CUSTOMER_ID_FILTER)

        return <Row>
            <Column>
                <Autosuggest
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={suggestion => suggestion.getValue()}
                    renderSuggestion={suggestion => suggestion.render()}
                    onSuggestionSelected={this.onSuggestionSelected}
                    alwaysRenderSuggestions={true}
                    inputProps={inputProps} />
                <div className="status">
                    <strong>Status:</strong> {status}
                </div>
            </Column>
            <Column>
                {customerFilterValue &&
                    <Pill label={'Customer ID: ' + customerFilterValue} type="primary"
                        onClear={() => this.onUnsetFilter(CUSTOMER_ID_FILTER)} />}
                {this.getFilterValue(STATUS) &&
                    <Pill label='due items only' type="primary"
                        onClear={() => this.onUnsetFilter(STATUS)} />}
            </Column>
        </Row>
    }
}

const mapStateToProps = (state) => {
    return { ...state.query, filters: state.global.filters }
}

export default connect(mapStateToProps)(QueryInput)