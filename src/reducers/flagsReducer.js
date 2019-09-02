export default (state = {result: 10}, action) => {
    switch (action.type) {
     case 'FLAGS_ACTION':
      return {
       result: action.payload
      }
     default:
      return state
    }
   }