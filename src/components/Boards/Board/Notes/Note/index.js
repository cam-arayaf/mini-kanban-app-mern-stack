import React, { Fragment } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid'
import { Card, CardActions, CardContent, IconButton, TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import PropTypes from 'prop-types';

const IconBtn = ({ onMouseDown, icon }) => (
    <IconButton onMouseDown={ onMouseDown } size="small">
        { icon }
    </IconButton>
);

const AddIdea = ({ eventHandler }) => (
    <Col xs={ 12 }>
        <IconBtn onMouseDown={ () => eventHandler('clickAddIcon') } icon={ <AddIcon /> } />
    </Col>
);

const IdeaAndDoneNote = ({ _id, type, eventHandler }) => (
    <Fragment>
        <Col xs={ 4 }>
            <IconBtn
                onMouseDown={ type === 'ideas' ? () => eventHandler('clickSaveIcon', _id) :
                    () => eventHandler('clickSkipPreviousIcon', _id)
                }
                icon={ type === 'ideas' ? <SaveIcon /> : <SkipPreviousIcon /> }
            />
        </Col>
        <Col xs={ 4 }>
            <IconBtn
                onMouseDown={ type === 'ideas' ? () => eventHandler('clickDeleteIcon', _id) :
                    () => eventHandler('clickSaveIcon', _id)
                }
                icon={ type === 'ideas' ? <DeleteIcon /> : <SaveIcon /> }
            />
        </Col>
        <Col xs={ 4 }>
            <IconBtn
                onMouseDown={ type === 'ideas' ? () => eventHandler('clickSkipNextIcon', _id) :
                    () => eventHandler('clickDeleteIcon', _id)
                }
                icon={ type === 'ideas' ? <SkipNextIcon /> : <DeleteIcon /> }
            />
        </Col>
    </Fragment>
);

const ToDoAndInProgressNote = ({ _id, eventHandler }) => (
    <Fragment>
        <Col xs={ 6 } sm={ 3 }>
            <IconBtn
                onMouseDown={ () => eventHandler('clickSkipPreviousIcon', _id) }
                icon={ <SkipPreviousIcon /> }
            />
        </Col>
        <Col xs={ 6 } sm={ 3 }>
            <IconBtn
                onMouseDown={ () => eventHandler('clickSaveIcon', _id) }
                icon={ <SaveIcon /> }
            />
        </Col>
        <Col xs={ 6 } sm={ 3 }>
            <IconBtn
                onMouseDown={ () => eventHandler('clickDeleteIcon', _id) }
                icon={ <DeleteIcon /> }
            />
        </Col>
        <Col xs={ 6 } sm={ 3 }>
            <IconBtn
                onMouseDown={ () => eventHandler('clickSkipNextIcon', _id) }
                icon={ <SkipNextIcon /> }
            />
        </Col>
    </Fragment>
);

const Buttons = ({ _id, type, eventHandler }) => (
    type === 'ideas' || type === 'done' ?
        <IdeaAndDoneNote _id={ _id } type={ type } eventHandler={ eventHandler } /> :
        <ToDoAndInProgressNote _id={ _id } eventHandler={ eventHandler } />
);

const Note = ({ _id, type, text, eventHandler }) => (
    <Card>
        <CardContent>
            <TextField
                id={ `textField${ _id ? _id : 'Add' }` }
                multiline
                rowsMax="4"
                variant="outlined"
                defaultValue={ text }
            />
        </CardContent>
        <CardActions>
            <Grid>
                <Row>
                    {
                        _id ?
                            <Buttons _id={ _id } type={ type } eventHandler={ eventHandler } /> :
                            <AddIdea eventHandler={ eventHandler } />
                    }
                </Row>
            </Grid>
        </CardActions>
    </Card>
);

IconBtn.propTypes = {
    onMouseDown: PropTypes.func.isRequired,
    icon: PropTypes.element.isRequired
}

AddIdea.propTypes = {
    eventHandler: PropTypes.func.isRequired
}

IdeaAndDoneNote.propTypes = {
    _id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    eventHandler: PropTypes.func.isRequired
}

ToDoAndInProgressNote.propTypes = {
    _id: PropTypes.string.isRequired,
    eventHandler: PropTypes.func.isRequired
}

Buttons.propTypes = {
    _id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    eventHandler: PropTypes.func.isRequired
}

Note.propTypes = {
    _id: PropTypes.string,
    type: PropTypes.string,
    text: PropTypes.string,
    eventHandler: PropTypes.func.isRequired
}

Note.displayName = "Note";

export default Note;