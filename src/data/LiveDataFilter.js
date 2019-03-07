import React from 'react';
import {
    AutocompleteInput,
    DateInput,
    Filter,
    ReferenceInput,
    SearchInput,
    SelectInput,
} from 'react-admin';
import withStyles from '@material-ui/core/styles/withStyles';
import { TimeInput, DateTimeInput } from 'react-admin-date-inputs';

const filterStyles = {
    status: { width: 150 },
};

const LiveDataFilter = ({ classes, ...props }) => (
    <Filter {...props}>
        <SearchInput source="q" alwaysOn />
        <SelectInput
            source="status"
            choices={[
                { id: 'completed', name: 'Completed' },
                { id: 'inprogress', name: 'In-Progress' },
                { id: 'failed', name: 'Failed' },
            ]}
            className={classes.status}
        />
        {/* <ReferenceInput source="customer_id" reference="customers">
            <AutocompleteInput
                optionText={choice =>
                    `${choice.first_name} ${choice.last_name}`
                }
            />
        </ReferenceInput>
        <ReferenceInput source="product_id" reference="products">
            <AutocompleteInput optionText="reference" />
        </ReferenceInput>
        <DateInput source="date_gte" />*/}
        <DateTimeInput source="date_lte" /> 
    </Filter>
);

export default withStyles(filterStyles)(LiveDataFilter);
