import React from 'react'
import {
    CLEAR_SUGGESTIONS,
    LOAD_SUGGESTIONS_BEGIN,
    MAYBE_UPDATE_SUGGESTIONS,
    UPDATE_INPUT_VALUE
} from './actions'

import CustomerSuggestion from './CustomerSuggestion'
import StatusSuggestion from './StatusSuggestion'
import { CUSTOMER_ID_FILTER, DUE_ITEMS_ONLY_FILTER } from '../Filter'
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
        customers: transformToArray(customers),
        status: [{ name: DUE_ITEMS_ONLY_FILTER }]
    }
}

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getMatchingSuggestions(value, keyValue) {
    const escapedValue = escapeRegexCharacters(value.trim())
    const allSuggestions = [...keyValue.customers.map(cust => {
        return {
            ...cust,
            render: () => <CustomerSuggestion {...cust} />,
            getSuggestionValue: () => CUSTOMER_ID_FILTER + ':' + cust.id
        }
    }), ...keyValue.status.map(status => {
        return {
            ...status,
            render: () => <StatusSuggestion {...status} />,
            getSuggestionValue: () => DUE_ITEMS_ONLY_FILTER + ':' + true
        }
    })]

    if (escapedValue === '') {
        return allSuggestions
    }
    const regex = new RegExp('^' + escapedValue, 'i')
    const matchingCustomers = keyValue.customers.filter(cust => regex.test(cust.lastName))
    const matchingStatus = keyValue.status.filter(status => regex.test(status.name))

    return [...matchingCustomers, ...matchingStatus]
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
            return {
                ...state,
                isLoading: true
            };

        case MAYBE_UPDATE_SUGGESTIONS:
            // Ignore suggestions if input value changed
            if (action.value !== state.value) {
                return {
                    ...state,
                    isLoading: false
                };
            }
            const suggestions = getMatchingSuggestions(state.value, state.keyValue)

            return {
                ...state,
                suggestions: suggestions,
                isLoading: false
            };

        default:
            return state;
    }
}