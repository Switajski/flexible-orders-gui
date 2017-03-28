import {
    CLEAR_SUGGESTIONS,
    LOAD_SUGGESTIONS_BEGIN,
    MAYBE_UPDATE_SUGGESTIONS,
    UPDATE_INPUT_VALUE
} from './actions'

const initialState = {
    suggestions: [],
    value: '',
    documents: {}
}

export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_INPUT_VALUE:
            return {
                ...state,
                value: action.value
            };

        case CLEAR_SUGGESTIONS:
            return {
                ...state,
                suggestions: []
            };

        case LOAD_SUGGESTIONS_BEGIN:
            const suggestions = []
            Object.keys(state.documents).forEach(key =>
                suggestions.push(state.documents[key]))
            return {
                ...state,
                isLoading: true,
                suggestions: suggestions
            };

        case MAYBE_UPDATE_SUGGESTIONS:
            // Ignore suggestions if input value changed
            if (action.value !== state.value) {
                return {
                    ...state,
                    isLoading: false
                };
            }

            return {
                ...state,
                suggestions: action.suggestions,
                isLoading: false
            };

        default:
            return state;
    }
}