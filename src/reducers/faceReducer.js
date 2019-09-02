export default (state = {result: "default.jpg"}, action) => {
    switch (action.type) {
     case 'FACE_ACTION':
      return {
       result: action.payload
      }
     default:
      return state
    }
   }