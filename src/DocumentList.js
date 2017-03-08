import React from 'react'
import styled from 'styled-components'
import { Row, Col, Card } from 'elemental'

import Document from './Document'
import withDueFilter from './withDueFilter'

export default (props) => {

    return (<Col>
        {Object.keys(props.documents).map(key => {
            const DocumentWithDueFilter = withDueFilter(Document);
            return (<Card>
                <DocumentWithDueFilter key={key} {...props.documents[key]} />
            </Card>)
        })}
    </Col>)
}

