import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card } from 'elemental'
import styled from 'styled-components'
import { Pill, Spinner } from 'elemental'

import Document from './Document'
import { documentIsDue } from './isDueSpecification'
import {
    showDueItemsOnly, SHOWING_DUE_ITEMS_ONLY,
    clearDueItemsFilter, CLEARING_DUE_FILTER
} from './actions'
import { createClosureRetrieveChildrenOfItem } from './selectors'

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

    clearFilterDueItems = (evt, button) => {
        this.props.dispatch(clearDueItemsFilter);
    }

    filterDueItems = (evt, button) => {
        this.props.dispatch(showDueItemsOnly);
    }

    render = () => {
        let docs = undefined;
        let showDueItemsOnly = this.props.filter.find((filter) => filter === SHOWING_DUE_ITEMS_ONLY) ? true : false;

        const lis = this.props.lineItems;
        const retrieveChildrenOfItem = createClosureRetrieveChildrenOfItem(lis);

        docs = Object.keys(this.props.documents).map(key => {
            const doc = this.props.documents[key];
            const lineItems = Object.keys(lis)
                .map(key => lis[key])
                .filter(li => li.docId === doc.id)
            const due = documentIsDue(
                lineItems,
                retrieveChildrenOfItem)

            const DocumentInCard =
                <Card key={key}>
                    <Document
                        childrenByParent={retrieveChildrenOfItem}
                        document={doc}
                        lineItems={lineItems}
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

