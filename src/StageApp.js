import React, {Component} from 'react';
import Stage from './components/Stage_Select';
import { connect } from 'react-redux';


export default class StageApp extends Component {
    static defaultProps = {
        stagelist: [1]
    }
    render() {
        const { stagelist } = this.props; //[1], 2------[1,2], 3
        let value = 1; //1-----2
        
        return (
            <div id="stagewrapper">
                <ul className="d-flex flex-wrap">
                   {stagelist.map(index => (<Stage key={(value++).toString()} index={index}/>))}
                </ul>
            </div>
        );//value. add가 될 수록 value가 1씩 증가한 상태에서 key값이 시작되어 앞에 있던 stage의 내용을 하나 전의 stage가 이어 받는다? -> key값과 그 상태를 저장한다?
    }     //solution: key값이 항상 첫번째 요소에는 1로 시작될 수 있도록 미리 초기화 해준다....
  }

  const mapStateToProps = ({actReducer}) => ({
    // page: actReducer.page,
    // chapterlist: actReducer.chapterlist,
    stagelist: actReducer.stagelist
    // cid: actReducer.cid,
    // sid: actReducer.sid
});

StageApp = connect(
    mapStateToProps
)(StageApp);

//delete 누르면 