import React, { Component } from 'react'
import { connect } from 'react-redux';
import Autosuggest from 'react-autosuggest'
import { updateInputValue, loadSuggestions, loadSuggestionsBegin } from './actions'
import { setFilter } from '../actions'
import autosuggest from './autosuggest.css'

/**
 * Code from http://codepen.io/moroshko/pen/ZQLyNK?editors=0010#0
 */
class QueryInput extends Component {

    getSuggestionValue = (suggestion) => {
        return '' + suggestion.id;
    }

    renderSuggestion = (suggestion) => {
        return (
            <span>{'' + suggestion.id} - {suggestion.lastName}</span>
        );
    }

    onSuggestionsFetchRequested = ({ value }) => {
        this.props.dispatch(loadSuggestions(value))
    }

    onSuggestionsClearRequested = () => {

    }

    onInputChange = (inputValue, { newValue }) => {
        this.props.dispatch(updateInputValue(newValue))
    }

    onSuggestionSelected = (event, { suggestionValue }) => {
        this.props.dispatch(setFilter({ customerId: parseInt(suggestionValue) }))
    }

    render = () => {
        const { value, suggestions, isLoading, onSuggestionsFetchRequested, onSuggestionsClearRequested } = this.props;

        const status = (isLoading ? 'Loading...' : 'Type to load suggestions');

        const inputProps = {
            placeholder: "Type 'D'",
            value,
            onChange: this.onInputChange
        };

        return <div>
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
        </div>
    }
}

const mapStateToProps = (state) => state.query

export default connect(mapStateToProps)(QueryInput)