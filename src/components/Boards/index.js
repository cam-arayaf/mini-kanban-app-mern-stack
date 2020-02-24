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
    
    putSkipNote = (_id, skip) => axios.put(`${ api_url }/notes/${ skip }/${ _id }`)
        .then(() => this.getNotes())
        .catch(error => console.log(error));

    eventHandler = (event, _id) => {
        switch (event) {
            case 'clickAddIcon':
                return this.clickAddIcon();
            case 'clickDeleteIcon':
                return this.clickDeleteIcon(_id);
            case 'clickSkipPreviousIcon': case 'clickSkipNextIcon':
                return this.clickSkipPreviousNextIcon(event, _id);
            case 'clickSaveIcon':
                return this.clickSaveIcon(_id);
            default:
                return;
        }
    }

    clickAddIcon = () => {
        const textField0 = document.querySelector('#textFieldAdd');
        const text = textField0.value.trim();
        if (!text) return textField0.value = '';
        textField0.value = '';
        this.postNote(text);
    }

    clickDeleteIcon = _id => this.deleteNote(_id);

    clickSkipPreviousNextIcon = (event, _id) => {
        const skip = event === 'clickSkipPreviousIcon' ? 'previous' : 'next';
        this.putSkipNote(_id, skip);
    }

    clickSaveIcon = _id => {
        const textField = document.querySelector(`#textField${ _id }`);
        const text = textField.value.trim();
        if (!text) return textField.value = '';
        this.putTextNote(_id, text);
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