import React from 'react';
import { TextField } from 'react-admin';
import withStyles from '@material-ui/core/styles/withStyles';
import rowStyle from './rowStyle';
import CustomizableDataGrid from '../components/CustomizableDatagrid'

const listStyles = {
    headerRow: {
        borderLeftColor: 'white',
        borderLeftWidth: 5,
        borderLeftStyle: 'solid',
    },
    comment: {
        maxWidth: '18em',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
};

const ReviewListDesktop = ({ classes, ...props }) => (
    <CustomizableDataGrid
        defaultColumns={['theme', 'category','filename']}
        rowClick="edit"
        rowStyle={rowStyle}
        classes={{ headerRow: classes.headerRow }}
        {...props}
    >
        <TextField source="theme" cellClassName={classes.comment} />
        <TextField source="category" />
        <TextField source="filename" />
        <TextField source="source" />
        <TextField source="destination" />
        <TextField source="initialtime" />
        <TextField source="updatetime" />
        <TextField source="status" />
    </CustomizableDataGrid>
);

export default withStyles(listStyles)(ReviewListDesktop);
