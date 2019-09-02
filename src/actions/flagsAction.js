export const flagsAction = (flags) => dispatch => {
    dispatch({
     type: 'FLAGS_ACTION',
     payload: flags
    })
   }