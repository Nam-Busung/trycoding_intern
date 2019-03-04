import React, {Component} from 'react';
import Chapter from './components/Chapter_Select';
import { connect } from 'react-redux';
import './main.css';


export default class ChapterApp extends Component {
    static defaultProps = {
        chapterlist: [1],
        cid: 2
    }
    render() {
        const { chapterlist} = this.props;
        console.log(this.props.match.path[1]);
        
        let value = 1;
        const list = chapterlist.map(index => (<Chapter key={(value++).toString()} index={index}/> ));
        return (
            <div>
                {list}
            </div>
        );
    }
  }

  const mapStateToProps = ({actReducer}) => ({
    page: actReducer.page,
    chapterlist: actReducer.chapterlist,
});

ChapterApp = connect(
    mapStateToProps
)(ChapterApp);
