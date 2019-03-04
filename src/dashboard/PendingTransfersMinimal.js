import React from 'react';
import compose from 'recompose/compose';
import Card from '@material-ui/core/Card';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CommentIcon from '@material-ui/icons/DonutLarge';
import Divider from '@material-ui/core/Divider';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { translate } from 'react-admin';

import CardIcon from './CardIcon';

const styles = theme => ({
    main: {
        flex: '1',
        marginRight: '1em',
        marginTop: 20,
    },
    titleLink: { textDecoration: 'none', color: 'inherit' },
    card: {
        padding: '16px 0',
        overflow: 'inherit',
        textAlign: 'right',
    },
    title: {
        padding: '0 16px',
    },
    value: {
        padding: '0 16px',
        minHeight: 48,
    },
    listItemText: {
        overflowY: 'hidden',
        height: '4em',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
    },
    actions: {
      display: 'flex',
      flex : '1',
      marginLeft: '2em',
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
});

const location = {
    pathname: 'data',
    query: { filter: JSON.stringify({ status: 'inprogress' }) },
};

class PendingTransfers extends React.Component{
    state = { expanded: false };

    handleExpandClick = () => {
      this.setState(state => ({ expanded: !state.expanded }));
    };
  
    render(){
        const {
            transfers = [],
            nb,
            translate,
            classes,
        } = this.props;

        return (
            <div className={classes.main}>
                <CardIcon Icon={CommentIcon} bgColor="#ff9800" />
                <Card className={classes.card}>
                    <Typography className={classes.title} color="textSecondary">
                        {translate('pos.dashboard.transfer_inprogress')}
                    </Typography>
                    <Typography
                        variant="headline"
                        component="h2"
                        className={classes.value}
                    >
                        <Link to={location} className={classes.titleLink}>
                            {nb}
                        </Link>
                    </Typography>
                    <Divider />
                    <CardActions className={classes.actions}  disableActionSpacing>
                        <Typography> Show More... </Typography>
                        <IconButton
                            className={classnames(classes.expand, {
                            [classes.expandOpen]: this.state.expanded,
                            })}
                            onClick={this.handleExpandClick}
                            aria-expanded={this.state.expanded}
                            aria-label="Show more"
                        >
                            <ExpandMoreIcon title="test" />
                        </IconButton>
                    </CardActions>
                    <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <List>
                                {transfers.map(record => (
                                    <ListItem
                                        key={record.id}
                                        button
                                        component={Link}
                                        to={`/data/${record.id}`}
                                    >
                                    <ListItemText
                                            primary={`${record.theme} ${record.category}`}
                                            secondary={`${record.filename}`}
                                            className={classes.listItemText}
                                            style={{ paddingRight: 0 }}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </CardContent>
                    </Collapse>
                </Card>
    </div>
        );
    }
}

// const PendingTransfers = ({
//     transfers = [],
//     nb,
//     translate,
//     classes,
// }) => (
//     <div className={classes.main}>
//         <CardIcon Icon={CommentIcon} bgColor="#ff9800" />
//         <Card className={classes.card}>
//             <Typography className={classes.title} color="textSecondary">
//                 {translate('pos.dashboard.transfer_inprogress')}
//             </Typography>
//             <Typography
//                 variant="headline"
//                 component="h2"
//                 className={classes.value}
//             >
//                 <Link to={location} className={classes.titleLink}>
//                     {nb}
//                 </Link>
//             </Typography>
//             <Divider />
//             <List>
//                 {transfers.map(record => (
//                     <ListItem
//                         key={record.id}
//                         button
//                         component={Link}
//                         to={`/data/${record.id}`}
//                     >
//                        <ListItemText
//                             primary={`${record.theme} ${record.category}`}
//                             secondary={`${record.filename}`}
//                             className={classes.listItemText}
//                             style={{ paddingRight: 0 }}
//                         />
//                     </ListItem>
//                 ))}
//             </List>
//         </Card>
//     </div>
// );

const enhance = compose(
    withStyles(styles),
    translate
);

export default enhance(PendingTransfers);
