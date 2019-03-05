import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import {
    linkToRecord,
    ReferenceField,
    FunctionField,
    TextField,
} from 'react-admin';

const styles = {
    root: {
        width: '100vw',
    },
    link: {
        textDecoration: 'none',
        color: 'inherit',
    },
    inline: {
        display: 'inline',
    },
};

const LiveDataMobileList = ({
    basePath,
    classes = {},
    className,
    data,
    ids,
    isLoading,
    total,
}) =>
    (isLoading || total > 0) && (
        <List className={classes.root}>
            {ids.map(id => (
                <Link
                    to={linkToRecord(basePath, id)}
                    className={classes.link}
                    key={id}
                >
                    <ListItem button>
                       
                        <ListItemText
                            primary={
                                <Fragment>
                                    
                                </Fragment>
                            }
                            secondary={data[id].status}
                            secondaryTypographyProps={{ noWrap: true }}
                        />
                    </ListItem>
                </Link>
            ))}
        </List>
    );

LiveDataMobileList.propTypes = {
    basePath: PropTypes.string,
    classes: PropTypes.object,
    className: PropTypes.string,
    data: PropTypes.object,
    hasBulkActions: PropTypes.bool.isRequired,
    ids: PropTypes.array,
    leftAvatar: PropTypes.func,
    leftIcon: PropTypes.func,
    linkType: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
        .isRequired,
    onToggleItem: PropTypes.func,
    primaryText: PropTypes.func,
    rightAvatar: PropTypes.func,
    rightIcon: PropTypes.func,
    secondaryText: PropTypes.func,
    selectedIds: PropTypes.arrayOf(PropTypes.any).isRequired,
    tertiaryText: PropTypes.func,
};

LiveDataMobileList.defaultProps = {
    linkType: 'edit',
    hasBulkActions: false,
    selectedIds: [],
};

export default withStyles(styles)(LiveDataMobileList);
