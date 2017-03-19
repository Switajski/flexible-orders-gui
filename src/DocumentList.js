import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card } from 'elemental'
import styled from 'styled-components'
import { Pill, Spinner } from 'elemental'

import createClosureRetrieveChildrenOfItem from './childrenByParent'
import Document from './Document'
import { documentIsDue } from './isDueSpecification'
import {
    showDueItemsOnly, SHOWING_DUE_ITEMS_ONLY,
    clearDueItemsFilter, CLEARING_DUE_FILTER,
    showError,
    fetchDocsSuccess,
    fetchingDocs,
    fetchDocsFailed
} from './actions'

const Centered = styled.div`
    text-align:center`

export class DocumentList extends Component {

    onDueDropdownSelect = (event) => {
        switch (event) {
            case SHOWING_DUE_ITEMS_ONLY:
                return this.props.dispatch(showDueItemsOnly)
            case CLEARING_DUE_FILTER:
                return this.props.dispatch(clearDueItemsFilter)
            default: return false;
        }
    }

    componentDidMount = () => {

        this.props.dispatch(fetchingDocs)
        fetch('/documents')
            .then(response => {
                const start = Date.now()
                while (Date.now() < start + 3000) { }
                if (!response.ok) {
                    throw Error('Network response was not ok');
                } else {
                    return response.json()
                }
            })
            .then(response => {
                this.props.dispatch(fetchDocsSuccess(response))
            })
            .catch(err => {
                this.props.dispatch(
                    fetchDocsFailed('Could not fetch documents from server: ' + err.message)
                )
            })
    }

    clearFilterDueItems = (evt, button) => {
        this.props.dispatch(clearDueItemsFilter);
    }

    filterDueItems = (evt, button) => {
        this.props.dispatch(showDueItemsOnly);
    }

    render = () => {
        let showDueItemsOnly = false
        if (this.props.filter) {
            if (this.props.filter.find((filter) => filter === SHOWING_DUE_ITEMS_ONLY))
                showDueItemsOnly = true
        }

        // TODO: code below could be obsolete by a normalized data structure in state
        let docs = undefined;
        if (this.props.documents) {
            const retrieveChildrenOfItem = createClosureRetrieveChildrenOfItem(this.props.documents);
            docs = Object.keys(this.props.documents).map(key => {
                const doc = this.props.documents[key];
                const due = documentIsDue(doc, retrieveChildrenOfItem)

                const DocumentInCard =
                    <Card key={key}>
                        <Document
                            childrenByParent={retrieveChildrenOfItem}
                            document={doc}
                            filter={this.props.filter}
                            showDueItemsOnly={showDueItemsOnly} />
                    </Card>

                if (showDueItemsOnly) {
                    if (due) {
                        return DocumentInCard
                    } else {
                        return <div key={key} />
                    }
                }

                return DocumentInCard
            })
        }

        return (
            <div>
                <Pill label='due items only' type="primary"
                    onClear={this.clearFilterDueItems}
                    onClick={this.filterDueItems} />

                <Centered>
                    {docs}
                    {this.props.FETCHING_DOCS && <Spinner size="lg" />}
                </Centered>
            </div>)
    }
}

const mapStateToProps = (state) => {
    return state
}
export default connect(mapStateToProps)(DocumentList)

