import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addChapNext, rmvChapLast, addStageNext, rmvStageLast } from '../action';

export default class BtnContainer extends Component { //connect 된 props가 전달 된 상태.
    addOne = () => {
        console.log(this.props);
        
        this.props.location.pathname.indexOf("S") === -1 ? this.props.addChapNext() : this.props.addStageNext();
    };
    rmvOne = () => {
        this.props.location.pathname.indexOf("S") === -1 ? this.props.rmvChapLast() : this.props.rmvStageLast();
    };
    
    render(){
        
        return (
        <div id="funcbuttons" className="btn-group">
            <button id="save" type="button" className="fb btn">Save</button>
            <button id="add" onClick={this.addOne} type="button" className="fb btn">Add</button>
            <button id="delete" onClick={this.rmvOne} type="button" className="fb btn">Delete</button>
        </div>
        );
    }
}

const mapStateToProps = state => ({
    page: state.actReducer.page,
});

//store에서 Provide 해준 state를 받아서 새로운 객체로 리턴한다. props가 어떤 멤버로 있는지 확인하기

const mapDispatchToProps = dispatch => ({
    addChapNext: () => dispatch(addChapNext()),
    addStageNext: () => dispatch(addStageNext()),
    rmvChapLast: () => dispatch(rmvChapLast()),
    rmvStageLast: () => dispatch(rmvStageLast())
});

//액션 크리에이터를 import 해서 dispatch(action())의 형태로 해당 액션 객체를 dispatch하는 함수를 객체로 할당하여 리턴한다.

BtnContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(BtnContainer);
//현재 문제는 렌더링이 안되는 것이 문제다. 상태가 변하지만 그 상태를 인식 못하고 있는건가?
//리듀서를 combineReducers로 합친 후 root reducer를 store에 등록해주면, 여러 리듀서를 가지게 될 것을 대비해서
//store는 reducer 별로 상태를 해당 reducer의 선언 이름인 객체 배열들로 저장해 둔다. 그래서 store의 해당 reducer의 state를 참조 하려면
//state.{reducer-name}.{props-name}의 형식으로 참조한다.