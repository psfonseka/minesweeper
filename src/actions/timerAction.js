export const timerAction = (time) => dispatch => {
    dispatch({
     type: 'CURRENT_ACTION',
     payload: time
    })
   }
