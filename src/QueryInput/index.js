import React, { Component } from 'react'
import { connect } from 'react-redux'
import Autosuggest from 'react-autosuggest'
import { Pill } from 'elemental'
import styled from 'styled-components'

import { updateInputValue, loadSuggestions, loadSuggestionsBegin, clearSuggestions } from './actions'
import { setFilter } from '../actions'
import autosuggest from './autosuggest.css'
import { CUSTOMER_ID_FILTER, DUE_ITEMS_ONLY_FILTER } from '../Filter'

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
class QueryInput extends Component {

    onUnsetFilter(filter) {
        this.props.dispatch(unsetFilter(filter))
    }

    getSuggestionValue = suggestion => suggestion.getSuggestionValue()

    renderSuggestion = suggestion => suggestion.render()

    onSuggestionsFetchRequested = ({ value }) => {
        this.props.dispatch(loadSuggestions(value))
    }

    onSuggestionsClearRequested = () => {

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
        const { value, suggestions, isLoading, onSuggestionsFetchRequested, onSuggestionsClearRequested } = this.props;

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
                    getSuggestionValue={this.getSuggestionValue}
                    renderSuggestion={this.renderSuggestion}
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
                {this.getFilterValue(DUE_ITEMS_ONLY_FILTER) &&
                    <Pill label='due items only' type="primary"
                        onClear={() => this.onUnsetFilter(DUE_ITEMS_ONLY_FILTER)} />}
            </Column>
        </Row>
    }
}

const mapStateToProps = (state) => {
    return { ...state.query, filters: state.global.filters }
}

export default connect(mapStateToProps)(QueryInput)