export default (state = {old: new Date().getTime(), current: 0, running: false}, action) => {
    switch (action.type) {
     case 'CURRENT_ACTION':
        return {
            old: state.old,
            current: action.payload,
            running: true
        }
    case 'OLD_ACTION':
        return {
            old: action.payload,
            current: 0,
            running: false
            }
     default:
      return state
    }
   }