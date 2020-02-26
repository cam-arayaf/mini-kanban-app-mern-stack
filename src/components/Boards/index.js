import React, { Component } from 'react';
import { Grid, Row } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import axios from 'axios';
import { api_url } from './../../constants';
import Board from './Board';

class Boards extends Component {
    state = { boards: [], notes: [] };

    componentDidMount() {
        this.getBoards();
        this.getNotes();
    }

    getBoards = () => axios.get(`${ api_url }/boards`)
        .then(resp => this.setState({ boards: resp.data.boards }))
        .catch(error => console.log(error));

    getNotes = () => axios.get(`${ api_url }/notes`)
        .then(resp => this.setState({ notes: resp.data.notes }))
        .catch(error => console.log(error));

    postNote = text => axios.post(`${ api_url }/notes`, { text })
        .then(() => this.getNotes())
        .catch(error => console.log(error));

    deleteNote = _id => axios.delete(`${ api_url }/notes/${ _id }`)
        .then(() => this.getNotes())
        .catch(error => console.log(error));

    putTextNote = (_id, text) => axios.put(`${ api_url }/notes/text/${ _id }`, { text })
        .then(() => this.getNotes())
        .catch(error => console.log(error));
    
    putPreviousNextNote = (_id, event) => axios.put(`${ api_url }/notes/${ event }/${ _id }`)
        .then(() => this.getNotes())
        .catch(error => console.log(error));

    addNote = () => {
        const textField0 = document.querySelector('#textFieldAdd');
        const text = textField0.value.trim();
        if (!text) return textField0.value = '';
        textField0.value = '';
        this.postNote(text);
    }

    saveNote = _id => {
        const textField = document.querySelector(`#textField${ _id }`);
        const text = textField.value.trim();
        const previousText = this.state.notes.find(note => note._id === _id).text;
        if (!text || previousText === text) return textField.value = previousText;
        textField.value = text;
        this.putTextNote(_id, text);
    }

    eventHandler = (event, _id) => {
        switch (event) {
            case 'add':
                return this.addNote();
            case 'remove':
                return this.deleteNote(_id);
            case 'previous': case 'next':
                return this.putPreviousNextNote(_id, event);
            case 'save':
                return this.saveNote(_id);
            default:
                return;
        }
    }

    render() {
        const { boards, notes } = this.state;
        return (
            <Grid>
                <Row>
                    {
                        boards.map(board => {
                            const { _id, class_name, title } = board;
                            return (
                                <Board
                                    key={ _id }
                                    class_name={ class_name }
                                    title={ title }
                                    notes={ notes }
                                    eventHandler={ this.eventHandler }
                                />
                            );
                        })
                    }
                </Row>
            </Grid>
        );
    }
}

Boards.propTypes = {
    boards: PropTypes.array,
    notes: PropTypes.array
}

Boards.displayName = "Boards";

export default Boards;