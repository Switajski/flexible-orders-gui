import { STATUS, STATUS_DUE_ITEMS_ONLY } from '../Filter'
import { createNormalizedTestData } from '../DocumentList/test/testDocuments'

const { documents, customers } = createNormalizedTestData();

const transformToArray = objects => {
    const array = []
    Object.keys(objects).forEach(key => {
        array.push(objects[key])
    })
    return array
}

export const initialState = {
    suggestions: [],
    value: '',
    keyValue: {
        documents: transformToArray(documents),
        customers: transformToArray(customers),
        [STATUS]: [{ name: STATUS_DUE_ITEMS_ONLY }]
    }
}
