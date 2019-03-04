import React, {Component} from 'react';
import "../main.css";
import "../Layout/stage/Stage.css";
import { Card, CardBody, Button, CardFooter, UncontrolledButtonDropdown, DropdownMenu, DropdownToggle  } from 'reactstrap';
import { Link } from 'react-router-dom';

export default class Stage extends Component {

    

    render(){
        
        const  index  = this.props.index;
        return (
            <UncontrolledButtonDropdown className="stageholder">
                <DropdownToggle caret tag="li">
                    <button id={"Stage"+index}>Stage<span className="lead" style={{color: "hsl(51, 100%, 60%)"}}> {index}</span></button>
                </DropdownToggle>
                <DropdownMenu>
                   <Card tag="div" className="stagedes">
                        <CardBody tag="span">
                            <div>Description : Please Choose a Stage What you want...</div>
                        </CardBody>
                        <div id="line"><div></div></div>
                        <CardFooter><Link to="/Stage/Edit"><Button className="w-100 h-100"><span className="lead font-weight-bold">Level Select</span></Button></Link></CardFooter>
                   </Card>
                </DropdownMenu>
            </UncontrolledButtonDropdown>
        );
    };
}
