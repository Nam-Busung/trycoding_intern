import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';
import Header from './components/header.js';
// import Footer from './components/footer.js';
import BtnContainer from './containers/buttonContainer';
import StageApp from './StageApp';
import ChapterApp from './ChapterApp';
import { Route } from 'react-router-dom';
import './main.css';

class App extends Component {

  render() {
    return (
      <Container fluid={true}>
        <Row>
        <Route path="/Chapter" component={Header}/>
          <div className="content col-sm-12 text-center">
            <div id="mainwrapper">
                 <Route path="/Chapter" component={BtnContainer}/>
                 <Route exact path="/Chapter" component={ChapterApp}/>
                 <Route exact path="/Chapter/:chpID/Stage" component={StageApp}/>
            </div>
          </div>  
          {/* <Footer /> */}
        </Row>
      </Container>
    );
  };
}
export default App;
//state에서 type을 동적이게 설정할 수 있다면, 같은 알고리즘을 사용하는 chapter, stage, item의 type만 달리 설정해주면 된다.
//App js에서 라우팅을 사용할 수 있도록, stage&select의 main layout과 edit의 main layout을 구분하여 라우팅에 따라 해당 컴포넌트를 호출 할 수 있도록 구현한다.
// 1. Editor의 main layout && Item들이 toggle 되는 Func button && item list 들을 컴포넌트로 구분하고, 
  //  
  //  버튼마다 Collapse로 이루어진 창인데 어떻게 구분하지?
// 
// 2. <Link/> component를 이용해서 Chapter를 눌렀을 때, URL만 바뀌고 Stage component가 렌더링 될 수 있도록

// 3. Header의 제목도 페이지의 내용과 index를 받아서 문구를 수정할 수 있도록

// 4. Contents가 늘어날 수록 페이지의 전체 height도 맞춰 늘어날 수 있도록. or 세부 layout 조정