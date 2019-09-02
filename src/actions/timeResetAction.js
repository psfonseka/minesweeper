export const timeResetAction = (time) => dispatch => {
    dispatch({
     type: 'OLD_ACTION',
     payload: time
    })
   }