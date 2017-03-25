import React, { Component } from 'react'
import { connect } from 'react-redux';
import Autosuggest from 'react-autosuggest'

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

        const inputProps = {
            placeholder: "Type 'c'",
            value,
            onChange
        };

        return <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={this.getSuggestionValue}
            renderSuggestion={this.renderSuggestion}
            inputProps={inputProps} />
    }
}

export default connect(state => state)(QueryInput)