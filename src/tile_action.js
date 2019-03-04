/** Kind of actions Editing Map */
const PICK_CURRENT_TILE = './tile_action/PICK_CURRENT_TILE';
const PICK_CURRENT_PROP = './tile_action/PICK_CURRENT_PROP';



export const changeTile = (tile) => ({type: PICK_CURRENT_TILE, currentTile: tile}); 
export const changeProp = (Prop) =>({type: PICK_CURRENT_PROP, currentProp: Prop});



const initialState = {
    currentTile: 0,
    currentProp: 0,
}
/** currentTile은 지정한 간격을 기준으로 이미지를 slice해서 각 tile 이미지 요소를 가지고 있는 배열로 생성되기 때문에 해당 이미지의 index값으로 currentTile state를 정의할 수 있다.*/

export default function tileactReducer(state = initialState, action) {
    switch (action.type) {
         case PICK_CURRENT_TILE:
              return {
                  currentTile: action.currentTile
              };
         case PICK_CURRENT_PROP:
              return{
                  currentProp: action.currentProp
              };

        default:
            return state;
    }
}
///리덕스