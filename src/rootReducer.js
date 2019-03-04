import { combineReducers } from 'redux';
import actReducer from './action';
import tileactReducer from './tile_action';

export default combineReducers({
    actReducer, tileactReducer
});

//리듀서가 여러개일 경우를 대비하여 만든 루트 리듀서

// initialState = {
//     data : Map({
//         chapterlist: List([
//             Map({stagelist: List([1]),
//                  sid: 2}),
//         ]),
//         sid: 2,
//         page: "Chapter"
//     })
// };
