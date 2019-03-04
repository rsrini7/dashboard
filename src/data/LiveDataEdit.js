import React from 'react';
import {
    EditController,
    TextField,
    SimpleForm,
} from 'react-admin';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import CloseIcon from '@material-ui/icons/Close';

import LiveDataEditToolbar from './LiveDataEditToolbar';

const editStyle = theme => ({
    root: {
        paddingTop: 40,
    },
    title: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: '1em',
    },
    form: {
        [theme.breakpoints.up('xs')]: {
            width: 400,
        },
        [theme.breakpoints.down('xs')]: {
            width: '100vw',
            marginTop: -30,
        },
    },
    inlineField: {
        display: 'inline-block',
        width: '50%',
    },
    field: {
        maxWidth: '18em',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
});

const LiveDataEdit = ({ classes, onCancel, ...props }) => (
    <EditController {...props}>
        {controllerProps =>
            controllerProps.record ? (
                <div className={classes.root}>
                    <div className={classes.title}>
                        <Typography variant="title">
                            {controllerProps.translate(
                                'resources.reviews.detail'
                            )}
                        </Typography>
                        <IconButton onClick={onCancel}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <SimpleForm
                        className={classes.form}
                        basePath={controllerProps.basePath}
                        record={controllerProps.record}
                        save={controllerProps.save}
                        version={controllerProps.version}
                        redirect="data"
                        resource="data"
                        toolbar={<LiveDataEditToolbar />}
                    >
                        <TextField source="theme" cellClassName={classes.field} />
                        <TextField source="category" cellClassName={classes.field} />
                        <TextField source="filename" cellClassName={classes.field} />
                        <TextField source="source" cellClassName={classes.field} />
                        <TextField source="destination" cellClassName={classes.field} />
                        <TextField source="initialtime" cellClassName={classes.field} />
                        <TextField source="updatetime" cellClassName={classes.field} />
                        <TextField source="status" cellClassName={classes.field} />                        
                        <TextField source="remarks" cellClassName={classes.field} />
                    </SimpleForm>
                </div>
            ) : null
        }
    </EditController>
);

export default withStyles(editStyle)(LiveDataEdit);
