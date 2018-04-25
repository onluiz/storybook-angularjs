import React, { Component, createContext, forwardRef } from 'react';

export const AppContext = createContext({
  sortBy: {},
  orderBy: 'asc',
  handleSortBy: () => {}
});

class SSTable extends Component {
  constructor(props) {
    super(props);
    this.handleSortBy = this.handleSortBy.bind(this);
    this.state = {
      sortBy: props.defaultSortBy,
      orderBy: props.defaultOrderBy,
      handleSortBy: this.handleSortBy
    };
  }

  handleSortBy(newSortKey) {
    // have newSortKey to sort on
    // need sortBy from state in order to change it (if needed)
    // need orderBy from state to change it
    // also look for oldSortKey to change it back to false
    this.setState(prevState => {
      const newState = {
        ...prevState,
        orderBy: 'asc'
      };
      const oldSort = Object.keys(prevState.sortBy).filter(key => !!prevState.sortBy[key]); // should only be one
      if (oldSort.length === 1) {
        const oldSortKey = oldSort[0];

        if (newSortKey !== oldSortKey) { // new sort key
          newState.sortBy[oldSortKey] = false;
          newState.sortBy[newSortKey] = true;
          newState.orderBy = 'desc';
        } else { // old sort key, instead change order
          if (prevState.orderBy === 'asc') {
            newState.orderBy = 'desc';
          } else {
            newState.orderBy = 'asc';
          }
        }
        return newState;
      } else {
        return prevState;
      }
    }, this.props.onSortChange({
      sortBy: this.state.sortBy,
      orderBy: this.state.orderBy
    }));
  }

  render() {
    return (
      <AppContext.Provider value={this.state}>
        <table className={this.props.className}>
          {this.props.children}
        </table>
      </AppContext.Provider>
    );
  }
}

const SSTh = ({ className, children, sortKey, determineClassNames, tableContext, ...props }) => {
  const classes = [className || ''];

  if (determineClassNames) {
    classes.push(determineClassNames({...tableContext, sortKey}));
  }

  return (
    <th {...props}
      className={classes.join(' ')}
      onClick={(e) => {
        e.preventDefault();
        sortKey && tableContext.handleSortBy(sortKey);
      }}>
      {children}
    </th>
  );
}

const newSSTh = forwardRef((props, ref) => (
  <AppContext.Consumer>
    {tableContext => (
      <SSTh {...props} tableContext={tableContext} ref={ref} />
    )}
  </AppContext.Consumer>
));

const a = () => (
  <SSTable>
    <thead>
      <tr>
        <th></th>
        <newSSTh sortKey="name">Name</newSSTh>
        <newSSTh sortKey="investments">Investments</newSSTh>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Btn</td>
        <td>NAME</td>
        <td>INVESTMENTS</td>
      </tr>
    </tbody>
  </SSTable>
);
