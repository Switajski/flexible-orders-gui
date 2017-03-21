- in http://redux.js.org/docs/advanced/AsyncActions.html it is recommended not store nested entities in store: 
BTW: what is has thunk middleware to do with async?

##Reason for denormalization of data
The data structure is propably going to change permanently along with the evolving application. Therefore I want to decouple the logical data structure from the storage data structure.

Examples:
- The Document component relies on documents, that have line items. 
- A line item should always have certain attributes like product name. But the API has it only once in the parent root line item.

While implementing data-representing react components with its props I realized, that I'm destructuring the data anyway. A denormalized data structure would give me the opportunity to get needed data by functions/selectors.


