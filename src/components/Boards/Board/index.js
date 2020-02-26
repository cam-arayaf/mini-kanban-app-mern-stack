import React from 'react';
import { Col } from 'react-flexbox-grid'
import { Container } from '@material-ui/core';
import PropTypes from 'prop-types';
import Notes from './Notes';

const Board = ({ class_name, title, notes, eventHandler }) => (
    <Col xs={ 12 } sm={ 6 } md={ 3 } className={ class_name }>
        <h3>{ title }</h3>
            <Container maxWidth="sm">
                {
                    <Notes
                        class_name={ class_name }
                        notes={ notes }
                        eventHandler={ eventHandler }
                    />
                }
            </Container>
    </Col>
);

Board.propTypes = {
    class_name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    notes: PropTypes.array.isRequired,
    eventHandler: PropTypes.func.isRequired
}

Board.displayName = "Board";

export default Board;