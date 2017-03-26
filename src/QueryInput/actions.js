export const FETCH_SUGGESTIONS = 'FETCH_SUGGESTIONS'

export const fetchSuggestions = (typedChars) => {
    type: FETCH_SUGGESTIONS;
    typedChars: typedChars
}