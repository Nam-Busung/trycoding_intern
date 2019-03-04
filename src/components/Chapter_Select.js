import React, {Component} from 'react';
import "../main.css";
import "../Layout/chapter/Chapter.css";
import { UncontrolledCollapse } from 'reactstrap';
import { Link } from 'react-router-dom';

//collapse 효과 적용 되도록
//import { Link } from 'react-router';

export default class Chapter extends Component {
    static defaultProps = {
        index: 0,
    }
//key값 2, indexlist는 [1]
    render(){
        const  {index}  = this.props;
        
        return (
            <div className="chapterItem">
                <div className="btn-group shadow-sm">
                    <button type="button" className="btn btn-block chapter-title text-left" id={"Chapter"+index}><h2>Chapter #{index}</h2></button>
                    <Link to={"/Chapter/"+index+"/Stage"}><button type="button" className="btn go-btn"><span>Go</span></button></Link>
                </div>
                <UncontrolledCollapse toggler={"Chapter"+index}>
                    <p className="chapter-des" data-parent="#mainwrapper">Chapter {index} is so easy</p>
                </UncontrolledCollapse>    
            </div>
        );
    };
}
//삭제를 하면 chapter 1만 다시 animation 작동 -> 1만 다시 렌더링?
//추가를 하면 현재 chapter와 다음 chapter가 animation 작동 -> 두개만 렌더링?