import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card } from 'elemental'
import styled from 'styled-components'
import { Spinner } from 'elemental'

import Document from './Document'
import { documentIsDue } from './isDueSpecification'
import {
    selectLineItem, SHOWING_DUE_ITEMS_ONLY
} from './actions'
import {
    createClosureRetrieveChildrenOfItem,
    createClosureRetrieveLineItemsByDocId
} from './selectors'

const Centered = styled.div`
    text-align:center`

export class DocumentList extends Component {

    onLineItemSelect = (id) => {
        this.props.dispatch(selectLineItem(id))
    }

    render = () => {
        let docs = undefined;
        let showDueItemsOnly = this.props.filter.find((filter) => filter === SHOWING_DUE_ITEMS_ONLY) ? true : false;

        const lis = this.props.lineItems;
        const retrieveChildrenOfItem = createClosureRetrieveChildrenOfItem(lis);
        const retrieveLineItemsByDocId = createClosureRetrieveLineItemsByDocId(lis);

        docs = Object.keys(this.props.documents).map(key => {
            const doc = this.props.documents[key]
            const lineItems = retrieveLineItemsByDocId(key)
            const due = documentIsDue(
                lineItems,
                retrieveChildrenOfItem)

            const DocumentInCard =
                <Card key={key}>
                    <Document
                        childrenByParent={retrieveChildrenOfItem}
                        document={doc}
                        lineItems={lineItems}
                        onLineItemSelect={this.onLineItemSelect}
                        selectedLineItems={this.props.selectedLineItems}
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
                {docs}
                <Centered>
                    {this.props.FETCHING_DOCS && <Spinner size="lg" />}
                </Centered>
            </div>)
    }
}

const mapStateToProps = (state) => {
    return {...state.docList}
}
export default connect(mapStateToProps)(DocumentList)

