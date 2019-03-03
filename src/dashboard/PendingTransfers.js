import React from 'react';
import compose from 'recompose/compose';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { translate } from 'react-admin';

const style = theme => ({
    root: {
        flex: 1,
    },
    avatar: {
        background: theme.palette.background.avatar,
    },
    cost: {
        marginRight: '1em',
        color: theme.palette.text.primary,
    },
});

const PendingOrders = ({ transfers = [], translate, classes }) => (
    <Card className={classes.root}>
        <CardHeader title={translate('pos.dashboard.pending_transfers')} />
        <List dense={true}>
            {transfers.map(record => (
                <ListItem
                    key={record.id}
                    button
                    component={Link}
                    to={`/commands/${record.id}`}
                >
                    
                     <Avatar />
                     <ListItemText
                        primary={new Date(record.date).toLocaleString('en-GB')}
                        secondary={translate('pos.dashboard.order.items', {
                            smart_count: record.length,
                            nb_items: record.length,
                        })}
                    />
                    <ListItemSecondaryAction>
                        <span className={classes.cost}>{record.total}$</span>
                    </ListItemSecondaryAction>
                </ListItem>
            ))}
        </List>
    </Card>
);

const enhance = compose(
    withStyles(style),
    translate
);

export default enhance(PendingOrders);
