import React, { Fragment } from 'react';
import MuiToolbar from '@material-ui/core/Toolbar';
import withStyles from '@material-ui/core/styles/withStyles';

import { SaveButton } from 'react-admin';
import AcceptButton from './AcceptButton';
import RejectButton from './RejectButton';

const styles = {
    root: {
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'space-between',
    },
};

const LiveDataEditToolbar = ({
    basePath,
    classes,
    handleSubmitWithRedirect,
    invalid,
    record,
    resource,
    saving,
}) => (
    <MuiToolbar className={classes.root}>
        {record.status === 'failed' ? (
            <Fragment>
                <AcceptButton record={record} />
                <RejectButton record={record} />
            </Fragment>
        ) : (
            <Fragment>
                <SaveButton 
                    basePath={basePath}
                    label='Ok'
                    handleSubmitWithRedirect={handleSubmitWithRedirect}
                    redirect="data"
                />


                {/* <SaveButton
                    handleSubmitWithRedirect={handleSubmitWithRedirect}
                    invalid={invalid}
                    saving={saving}
                    redirect="data"
                    submitOnEnter={true}
                />
                <DeleteButton
                    basePath={basePath}
                    record={record}
                    resource={resource}
                /> */}
            </Fragment>
        )}
    </MuiToolbar>
);

export default withStyles(styles)(LiveDataEditToolbar);
