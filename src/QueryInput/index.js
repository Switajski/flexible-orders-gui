import React, { Component } from 'react'
import { connect } from 'react-redux';
import Autosuggest from 'react-autosuggest'

/**
 * Code from http://codepen.io/moroshko/pen/ZQLyNK?editors=0010#0
 */
class QueryInput extends Component {

    getSuggestionValue = (suggestion) => {
        return suggestion.name;
    }

    renderSuggestion = (suggestion) => {
        return (
            <span>{suggestion.name}</span>
        );
    }

    onSuggestionsFetchRequested = () => {

    }

    onSuggestionsClearRequested = () => {

    }

    render() {
        const { value, suggestions, isLoading, onChange, onSuggestionsFetchRequested, onSuggestionsClearRequested } = this.props;

        const status = (isLoading ? 'Loading...' : 'Type to load suggestions');

        const inputProps = {
            placeholder: "Type 'c'",
            value,
            onChange
        };

        return <div>
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={this.getSuggestionValue}
                renderSuggestion={this.renderSuggestion}
                inputProps={inputProps} />
            <div className="status">
                <strong>Status:</strong> {status}
            </div>
        </div>
    }
}

export default connect(state => state)(QueryInput)