import React, {Component} from 'react';
import './main.css';
import "./Layout/editor/stage_edit.css";
import { Button, ButtonGroup, Card, CardHeader, CardBody, Input, InputGroup,InputGroupAddon, InputGroupText} from 'reactstrap';
import { changeTile } from './tile_action';
import { changeProp } from './tile_action';
import { connect } from 'react-redux';
import TileApp, { testing } from './TileApp';
import {mission_send} from './TileApp';
import CardDeck from 'reactstrap/lib/CardDeck';
export default class Editor extends Component {
  constructor(props){
    super(props);

    this.abc = this.abc.bind(this);
    this.cda = this.cda.bind(this);
  }

  cda=(e)=>{
    
    mission_send(e);
    console.log("mission");
  }

  abc=()=>{
    testing();
  }

  /** Tab 마다의 Collapse 기능을 위한 함수 */
  switchNone = (ele) => {
    document.getElementById(ele).style.display = "none"
  }

  toggle = (e) => {
    const idList = ["tiles", "props", "gameobj", "missions", "description"];
    idList.map(this.switchNone);
    let visibility = document.getElementById(e.target.value).style;
    visibility.display = visibility.display === "none" ? "block" : "none";
  }

  /** currentTile을 변경하기 위해 connect 한 action creator를 Editor class 내 함수로 선언해 둔다. */
   changeCurrentTile = (e) => {
     const tile = 1*e.target.id-1; //javascript의 자동 형변환을 이용한 string -> int 변환
     this.props.changeTile(tile);
     console.log("Current Tile is " + tile);
   }

   changeCurrentMission = (e) => {
    const mission = 1*e.target.id-1; //javascript의 자동 형변환을 이용한 string -> int 변환
    // this.props.changeMission(mission);
    this.cda(mission);
    console.log("Current mission is " + mission);

  }

   changeCurrentProp = (e) => {
    const prop= 1*e.target.id-1; //javascript의 자동 형변환을 이용한 string -> int 변환
    this.props.changeProp(prop);
    console.log("Current Prop is " + prop);
  }

   /** Tile item들의 click시 마다 해당 메서드가 호출 될 수 있도록 등록해둔다. */
    render(){
        return (
        <React.Fragment>
        <header className="col Body-center bg-primary text-center">
          <h1>Stage Editor</h1>
        </header>
        <div className="content col-sm-12 bg-warning Body-center">
          <div id="edit-area" className="bg-danger">
            <div className="row">
                <TileApp currentTile={this.props.currentTile} currentProp={this.props.currentProp} select_mission={this.props.select_mission} />
                <div className="col-sm-4 bg-secondary" id="edit-sec">
                <div id="editbuttons">
                <ButtonGroup className="bg-secondary btn-block">
                    <Button onClick={this.toggle} type="button" className="fb bg-success active w-30" value="tiles">Tiles</Button>
                    <Button onClick={this.toggle} type="button" className="fb bg-info w-30" value="props">Props</Button>
                    <Button onClick={this.toggle} type="button" className="fb bg-warning w-30" id="GOBJ" value="gameobj">Obj</Button>
                </ButtonGroup>
                <ButtonGroup className="btn-block">
                    <Button onClick={this.toggle} type="button" className="fb bg-primary w-50" value="missions">Missions</Button>
                </ButtonGroup>
                <ButtonGroup className="btn-block align-top">
                <Button type="button" className="fb bg-success active w-30" onClick={this.abc}>Save</Button>
                <Button  onClick={this.changeCurrentTile} id="25" type="button" className="fb bg-warning w-30"  >Delete Img</Button>
              </ButtonGroup>
                </div>
                <div id="tiles" className="items"> 
                <input type="image" src={require('./laboratory.ground.1.2.0.10.png') } alt="Submit" width="64" height="64" onClick={this.changeCurrentTile} id="1"/>
                <input type="image" src={require('./tmw_desert_spacing2.png') } alt="Submit" width="64" height="64" onClick={this.changeCurrentTile} id="2"/>
                
                     {/* <div className="btn flex-item" onClick={this.changeCurrentTile} id="3">item</div>
                     <div className="btn flex-item" onClick={this.changeCurrentTile} id="4">item</div> */}
                </div>
                   <div id="props" className="items"> 
                  <input type="image" src={require('./drone1.1.1.png') } alt="Submit" width="51" height="64" onClick={this.changeCurrentProp} id="1"/>
                  <input type="image" src={require('./prop.1.2.1.png') } alt="Submit" width="60" height="74" onClick={this.changeCurrentProp} id="2"/>
                </div>
                <div id="gameobj" className="items"> 
                <div className="btn flex-item" onClick={this.changeCurrentTile} id="1">Collider</div>
                <div className="btn flex-item" onClick={this.changeCurrentTile} id="5">Exit</div>
                <div className="btn flex-item" onClick={this.changeCurrentTile} id="6">Player</div>
                <div className="btn flex-item" onClick={this.changeCurrentTile} id="7">Enemy</div>
                <div className="btn flex-item" onClick={this.changeCurrentTile} id="8">Enemy Path</div>
                <div className="btn flex-item" onClick={this.changeCurrentTile} id="4">Hostage</div>
                <div className="btn flex-item" onClick={this.changeCurrentTile} id="3">Terminal</div>
                <div className="btn flex-item" onClick={this.changeCurrentTile} id="10">Card Key</div>
                <div className="btn flex-item" onClick={this.changeCurrentTile} id="11">Mine</div>
                <div className="btn flex-item" onClick={this.changeCurrentTile} id="12">Rock</div>
                <div className="btn flex-item" onClick={this.changeCurrentTile} id="13">RockCrusher</div>
                <div className="btn flex-item" onClick={this.changeCurrentTile} id="15">Electronic Trap</div>
                <div className="btn flex-item" onClick={this.changeCurrentTile} id="16">Foothold</div>
                <div className="btn flex-item" onClick={this.changeCurrentTile} id="17">Box</div>
                </div> 
                <div id="missions" className="items"> 
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <Input addon type="checkbox" aria-label="Checkbox for following text input" onChange={this.changeCurrentMission} id="1"onClick={this.cda} />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Exit" />
                 </InputGroup>
                 
                 <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <Input addon type="checkbox" aria-label="Checkbox for following text input" onChange={this.changeCurrentMission} id="2" onClick={this.cda}/>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Rescue" />
                 </InputGroup>

                 <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <Input addon type="checkbox" aria-label="Checkbox for following text input" onChange={this.changeCurrentMission} id="3"onClick={this.cda} />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Hack" />
                 </InputGroup>

                 <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <Input addon type="checkbox" aria-label="Checkbox for following text input" onChange={this.changeCurrentMission} id="4"onClick={this.cda} />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="KillEnemies" />
                 </InputGroup>

                 <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <Input addon type="checkbox" aria-label="Checkbox for following text input" onChange={this.changeCurrentMission} id="5"onClick={this.cda} />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="KillBoss" />
                 </InputGroup>

                 <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <Input addon type="checkbox" aria-label="Checkbox for following text input" onChange={this.changeCurrentMission} id="6" onClick={this.cda}/>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="BreakRock" />
                 </InputGroup>

                 <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <Input addon type="checkbox" aria-label="Checkbox for following text input" onChange={this.changeCurrentMission} id="7" onClick={this.cda}/>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="activeTrapKillEnemy" />
                 </InputGroup>

                 <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <Input addon type="checkbox" aria-label="Checkbox for following text input" onChange={this.changeCurrentMission} id="8" onClick={this.cda}/>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="HackWithPassword" />
                 </InputGroup>
                </div> 
                <div id="description" className="items"> 
                     <Card>
                       <CardHeader>Description Header1</CardHeader>
                       <CardBody>Description Body1</CardBody>
                     </Card>
                     <Card className="mt-2">
                       <CardHeader>Description Header2</CardHeader>
                       <CardBody>Description Body2</CardBody>
                     </Card>
                </div> 
                </div>
            </div>
          </div>
        </div>
        </React.Fragment>
        );
    };
}

const mapStateToProps = ({tileactReducer}) => ({
  currentTile: tileactReducer.currentTile,
  currentProp: tileactReducer.currentProp,

}); //쓸모가 없나?

const mapDispatchToProps = dispatch => ({
  changeTile: (tile) => dispatch(changeTile(tile)),
  changeProp: (prop) => dispatch(changeProp(prop)),

});

Editor = connect(
  mapStateToProps,
  mapDispatchToProps
)(Editor);
