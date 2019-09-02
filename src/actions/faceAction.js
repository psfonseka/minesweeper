export const faceAction = (face) => dispatch => {
    dispatch({
     type: 'FACE_ACTION',
     payload: face
    })
   }