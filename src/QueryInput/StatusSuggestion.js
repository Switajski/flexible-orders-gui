import React from 'react'

const StatusSuggestion = props => <span>Status:{props.name}</span>

StatusSuggestion.propTypes = {
    name: React.PropTypes.string.isRequired
}

export default StatusSuggestion