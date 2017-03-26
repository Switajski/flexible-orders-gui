import { combineReducers } from 'redux'

import reducer from './reducer'
import dlReducer from './DocumentList/reducer'
import qiReducer from './QueryInput/reducer'

export default () => combineReducers({
  query: qiReducer,
  docList: dlReducer,
  global: reducer
})