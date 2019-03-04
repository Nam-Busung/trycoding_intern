import React, { Component } from 'react';
import './Map_Editor.js';
import Editor from './Map_Editor.js';
import { Container} from 'reactstrap';


export default class EditApp extends Component {
    
    render(){
        return (
        <Container fluid={true}>
            <Editor/>
        </Container>
        );
    };
}