export const click2DAction = (newArr) => dispatch => {
    dispatch({
     type: '2D_ACTION',
     payload: newArr
    })
   }