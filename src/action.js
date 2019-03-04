/** Kind of actions Editing LayOut */
const ADD_CHAPTER_NEXT = 'action/ADD_CHAPTER_NEXT';
const ADD_STAGE_NEXT = 'action/ADD_STAGE_NEXT';
const REMOVE_CHAPTER_LAST = 'action/REMOVE_CHAPTER_LAST';
const REMOVE_STAGE_LAST = 'action/REMOVE_STAGE_LAST';


export const addChapNext = () => ({type: ADD_CHAPTER_NEXT}); //따로 인수 받아야 하는게 아니라 상태값 증가시켜서 리턴만 하면 되기 때문에
export const addStageNext = () => ({type: ADD_STAGE_NEXT}); //따로 인수 받아야 하는게 아니라 상태값 증가시켜서 리턴만 하면 되기 때문에

export const rmvChapLast = () => ({type: REMOVE_CHAPTER_LAST});
export const rmvStageLast = () => ({type: REMOVE_STAGE_LAST});



//모듈의 초기 상태를 정의한다.
const initialState = {
    cid: 2,
    sid: 2,
    chapterlist: [1],
    stagelist: [1],
    page: "Chapter",
}

//리듀서를 만들어서 내보내준다.
export default function actReducer(state = initialState, action) {
//액션의 타입에 따라 변화된 상태를 정의하여 반환한다.
//지금처럼 공통적인 number를 사용하면 
    let x = state.cid>1 ? 1:0;
    let y = state.sid>1 ? 1:0;
    switch(action.type) {
        case ADD_CHAPTER_NEXT:
            return { 
                 ...state,
                 cid: state.cid + 1,
                 chapterlist: state.chapterlist.concat([state.cid])
            };
        case REMOVE_CHAPTER_LAST:
            return { 
                ...state,
                chapterlist: state.chapterlist.filter(num => num !== state.cid-x),
                cid: state.cid - x
             };
        case ADD_STAGE_NEXT:
             return { 
                  ...state,
                  sid: state.sid + 1,
                  stagelist: state.stagelist.concat([state.sid])
             };
         case REMOVE_STAGE_LAST:
             return { 
                 ...state,
                 stagelist: state.stagelist.filter(num => num !== state.sid-y),
                 sid: state.sid - y
              };
         
        default:
            return state;
    }
}
