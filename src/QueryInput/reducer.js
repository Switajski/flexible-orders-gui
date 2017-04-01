import {
    CLEAR_SUGGESTIONS,
    LOAD_SUGGESTIONS_BEGIN,
    MAYBE_UPDATE_SUGGESTIONS,
    UPDATE_INPUT_VALUE
} from './actions'

import { createNormalizedTestData } from '../DocumentList/test/testDocuments'

//TODO: If customer would be also normalized, then much of following code could be saved.
const { documents, lineItems, customers } = createNormalizedTestData();

const transformToArray = objects => {
    const array = []
    Object.keys(objects).forEach(key => {
        array.push(objects[key])
    })
    return array
}

const initialState = {
    suggestions: [],
    value: '',
    keyValue: {
        documents: transformToArray(documents),
        customers: transformToArray(customers)
    }
}

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getMatchingDocumentIds(value, documents) {
    const escapedValue = escapeRegexCharacters(value.trim());
    if (escapedValue === '') {
        return [];
    }
    const regex = new RegExp('^' + escapedValue, 'i');
    return documents.filter(doc => regex.test(doc.id));
}

function getMatchingCustomerLastNames(value, customers) {
    const escapedValue = escapeRegexCharacters(value.trim());
    if (escapedValue === '') {
        return [];
    }
    const regex = new RegExp('^' + escapedValue, 'i');
    return customers.filter(doc => regex.test(doc.lastName));
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
            const suggestions = getMatchingDocumentIds(state.value, state.keyValue.documents);
            getMatchingCustomerLastNames(state.value, state.keyValue.customers).forEach(cln => suggestions.push(cln))

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