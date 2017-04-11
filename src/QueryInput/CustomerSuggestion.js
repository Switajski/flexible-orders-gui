import React from 'react'

const CustomerSuggestion = (props) => (<span>{props.id} - {props.firstName} {props.lastName}</span>)

CustomerSuggestion.propTypes = {
    id: React.PropTypes.number.isRequired,
    firstName: React.PropTypes.string.isRequired,
    lastName: React.PropTypes.string.isRequired
}

export default CustomerSuggestion