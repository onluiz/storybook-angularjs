import React from 'react';
import { AppContext } from './SSTable';

const SSThead = ({ table, className, ...props }) => (
  <thead onClick={table.handleSort} className={['s-thead', className].join(' ')} {...props}>{table.sortBy}</thead>
);

export default props => (
  <AppContext.Consumer>
    {(table) => <SSThead table={table} {...props} />}
  </AppContext.Consumer>
);
