import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card } from 'elemental'
import styled from 'styled-components'
import { Spinner } from 'elemental'

import Document from './Document'
import { documentIsDue } from './isDueSpecification'
import { selectLineItem } from './actions'
import {
    createClosureRetrieveChildrenOfItem,
    createClosureRetrieveLineItemsByDocId
} from './selectors'
import { CUSTOMER_ID_FILTER, STATUS } from '../Filter'

const Centered = styled.div`
    text-align:center`

export class DocumentList extends Component {

    onLineItemSelect = (id) => {
        this.props.dispatch(selectLineItem(id))
    }

    render = () => {
        let docs = undefined;
        const showDueItemsOnly = this.props.filters
            ? this.props.filters[STATUS]
            : false;
        const customerIdFilter = this.props.filters
            ? parseInt(this.props.filters[CUSTOMER_ID_FILTER], 10)
            : false;

        const lis = this.props.lineItems;
        const retrieveChildrenOfItem = createClosureRetrieveChildrenOfItem(lis);
        const retrieveLineItemsByDocId = createClosureRetrieveLineItemsByDocId(lis);

        docs = Object.keys(this.props.documents)
            .map(key => this.props.documents[key])
            .map(doc => {
                const lineItems = retrieveLineItemsByDocId(doc.id)
                return {
                    lineItems: lineItems,
                    due: documentIsDue(
                        lineItems,
                        retrieveChildrenOfItem),
                    document: doc
                }
            })
            .filter(({ due }) => showDueItemsOnly ? due : true)
            .filter(({ document }) => {
                if (customerIdFilter) {
                    return document.customerId === customerIdFilter
                }
                return true;
            })
            .map(({ document, due, lineItems }) => {
                const DocumentInCard =
                    <Card key={document.id}>
                        <Document
                            childrenByParent={retrieveChildrenOfItem}
                            document={document}
                            lineItems={lineItems}
                            onLineItemSelect={this.onLineItemSelect}
                            selectedLineItems={this.props.selectedLineItems}
                            filter={this.props.filter}
                            showDueItemsOnly={showDueItemsOnly} />
                    </Card>

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
    return { ...state.docList, ...state.global }
}
export default connect(mapStateToProps)(DocumentList)

