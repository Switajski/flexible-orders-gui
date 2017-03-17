import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card } from 'elemental'
import styled from 'styled-components'
import { Pill, Spinner } from 'elemental'

import createClosureRetrieveChildrenOfItem from './childrenByParent'
import Document from './Document'
import { documentIsDue } from './isDueSpecification'
import { withOverlay } from './Components/withOverlay'
import {
    showDueItemsOnly, SHOW_DUE_ITEMS_ONLY,
    dueItemsFilterClear, DUE_ITEMS_FILTER_CLEAR,
    DUE_MARK_DONE,
    showError,
    loadDocuments,
    requestDocs, REQUESTING_DOCS
} from './actions'

const H2AlignedInMiddle = styled.h2`
    text-align:center;
    vertical-align: middle;`

const Centered = styled.div`
    text-align:center`


export class DocumentList extends Component {

    onDueDropdownSelect = (event) => {
        switch (event) {
            case SHOW_DUE_ITEMS_ONLY:
                return this.props.dispatch(showDueItemsOnly)
            case DUE_ITEMS_FILTER_CLEAR:
                return this.props.dispatch(dueItemsFilterClear)
            default: return false;
        }
    }

    componentDidMount = () => {

        this.props.dispatch(requestDocs)
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
                this.props.dispatch(loadDocuments(response))
            })
            .catch(err => {
                this.props.dispatch(
                    showError('Could not fetch documents from server: ' + err.message))
            })
    }

    clearFilterDueItems = (evt, button) => {
        this.props.dispatch(dueItemsFilterClear);
    }

    filterDueItems = (evt, button) => {
        this.props.dispatch(showDueItemsOnly);
    }

    render = () => {
        const retrieveChildrenOfItem = createClosureRetrieveChildrenOfItem(this.props.documents)

        const docs = Object.keys(this.props.documents).map(key => {
            const doc = this.props.documents[key];
            const due = documentIsDue(doc, retrieveChildrenOfItem)

            const DocumentInCard =
                <Card key={key}>
                    <Document childrenByParent={retrieveChildrenOfItem} document={doc} filter={this.props.filter} />
                </Card>

            if (this.props.filter.includes(SHOW_DUE_ITEMS_ONLY)) {
                if (due) {
                    return DocumentInCard
                } else {
                    return <div key={key} />
                }
            }

            if (!due && this.props.filter.includes(DUE_MARK_DONE)) {
                const ComponentWithOverlay = withOverlay(Document, <H2AlignedInMiddle>Done</H2AlignedInMiddle>);
                return (props) => (<ComponentWithOverlay {...props} key={key} />)
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
                    {this.props.REQUESTING_DOCS && <Spinner size="lg" />}
                </Centered>
            </div>)
    }
}

const mapStateToProps = (state) => {
    return state
}
export default connect(mapStateToProps)(DocumentList)

