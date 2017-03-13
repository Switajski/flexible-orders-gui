import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card } from 'elemental'
import styled from 'styled-components'
import { Pill } from 'elemental'

import indexOnChildrenByParent from './childrenByParent'
import Document from './Document'
import isDue from './documentIsDueSpecification'
import { withOverlay } from './Components/withOverlay'
import {
    showDueItemsOnly, SHOW_DUE_ITEMS_ONLY,
    dueItemsFilterClear, DUE_ITEMS_FILTER_CLEAR,
    DUE_MARK_DONE
} from './actions'

const H2AlignedInMiddle = styled.h2`
    text-align:center;
    vertical-align: middle;`


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

    clearFilterDueItems = (evt, button) => {
        this.props.dispatch(dueItemsFilterClear);
    }

    filterDueItems = (evt, button) => {
        this.props.dispatch(showDueItemsOnly);
    }

    render = () => {
        const childrenByParent = indexOnChildrenByParent(this.props.documents);

        const items = Object.keys(this.props.documents).map(key => {
            const doc = this.props.documents[key];
            const due = isDue(doc, childrenByParent)
            if (this.props.filter.includes(SHOW_DUE_ITEMS_ONLY)) {
                if (due) {
                    return <Card key={key}><Document {...doc} /></Card>
                } else {
                    return <div key={key} />
                }
            }

            if (!due && this.props.filter.includes(DUE_MARK_DONE)) {
                const ComponentWithOverlay = withOverlay(Document, <H2AlignedInMiddle>Done</H2AlignedInMiddle>);
                return (props) => (<ComponentWithOverlay {...props} key={key} />)
            }

            return <Card key={key}><Document {...doc} /></Card>
        })

        return (
            <div><Pill label='due items only' type="primary"
                onClear={this.clearFilterDueItems}
                onClick={this.filterDueItems} />

                <div>
                    {items}
                </div >
            </div>)
    }
}

export default connect(state => state)(DocumentList)

