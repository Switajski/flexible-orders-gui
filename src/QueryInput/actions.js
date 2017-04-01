export const UPDATE_INPUT_VALUE = 'UPDATE_INPUT_VALUE';
export const CLEAR_SUGGESTIONS = 'CLEAR_SUGGESTIONS';
export const MAYBE_UPDATE_SUGGESTIONS = 'MAYBE_UPDATE_SUGGESTIONS';
export const LOAD_SUGGESTIONS_BEGIN = 'LOAD_SUGGESTIONS_BEGIN';

export const loadSuggestionsBegin = {
    type: LOAD_SUGGESTIONS_BEGIN
}

export const randomDelay = () => {
    return 100 + Math.random() * 100;
}

export const loadSuggestions = (value) => {
    return dispatch => {
        dispatch(loadSuggestionsBegin);

        // Fake an AJAX call
        setTimeout(() => {
            dispatch(maybeUpdateSuggestions(value));
        }, randomDelay());
    };
}

export const updateInputValue = (value) => {
    return {
        type: UPDATE_INPUT_VALUE,
        value
    };
}

export const clearSuggestions = {
    type: CLEAR_SUGGESTIONS
}

export const maybeUpdateSuggestions = (value) => {
    return {
        type: MAYBE_UPDATE_SUGGESTIONS,
        value
    };
}
