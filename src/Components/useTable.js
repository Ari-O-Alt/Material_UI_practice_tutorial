import {
  makeStyles,
  Table,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from '@material-ui/core';
import React from 'react';

const styles = makeStyles((theme) => ({
  table: {
    marginTop: theme.spacing(3),
    '& thead th': {
      fontWeight: '600',
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.primary.light,
    },
    '& tbody td': {
      fontWeight: '300',
    },
    '& tbody tr:hover': {
      backgroundColor: '#fffbf2',
      cursor: 'pointer',
    },
  },
}));

const useTable = (records, headCells, filterFunction) => {
  const classes = styles();

  // array that stores the options for how many rows we want per page
  const rowsPerPageOptions = [5, 10, 25];
  // we start at page 0
  const [page, setPage] = React.useState(0);
  // we initiate the rows per page to 5, the first value in the rowsPerPageOptions array
  const [rowsPerPage, setRowsPerPage] = React.useState(
    rowsPerPageOptions[page]
  );
  const [orderDirection, setOrderDirection] = React.useState();
  const [columnToSort, setColumnToSort] = React.useState();

  const MyTableContainer = (props) => {
    return <Table className={classes.table}>{props.children}</Table>;
  };

  const MyTableHead = () => {
    // function that will sort the table's columns
    const handleSortRequest = (columnId) => {
      const isAscending = columnToSort === columnId && orderDirection === 'asc';
      setOrderDirection(isAscending ? 'desc' : 'asc');
      setColumnToSort(columnId);
    };

    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => {
            return (
              <TableCell
                key={headCell.id}
                sortDirection={
                  columnToSort === headCell.id ? orderDirection : false
                }
              >
                <TableSortLabel
                  active={columnToSort === headCell.id}
                  direction={
                    columnToSort === headCell.id ? orderDirection : 'asc'
                  }
                  onClick={() => handleSortRequest(headCell.id)}
                >
                  {headCell.label}
                </TableSortLabel>
              </TableCell>
            );
          })}
        </TableRow>
      </TableHead>
    );
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const MyTablePagination = () => {
    return (
      <TablePagination
        component='div'
        page={page}
        rowsPerPageOptions={rowsPerPageOptions}
        rowsPerPage={rowsPerPage}
        count={records.length}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleRowsPerPageChange}
      />
    );
  };

  function stableSort(theArray, theComparator) {
    const stablizedThis = theArray.map((item, index) => [item, index]);
    stablizedThis.sort((a, b) => {
      const order = theComparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stablizedThis.map((item) => item[0]);
  }

  function getComparator(orderDirection, columnToSort) {
    return orderDirection === 'desc'
      ? (a, b) => descendingComparator(a, b, columnToSort)
      : (a, b) => -descendingComparator(a, b, columnToSort);
  }

  function descendingComparator(a, b, columnToSort) {
    if (b[columnToSort] < a[columnToSort]) {
      return -1;
    }
    if (b[columnToSort] > a[columnToSort]) {
      return 1;
    }
    return 0;
  }

  const recordsAfterPagingAndSorting = () => {
    return stableSort(
      filterFunction.fn(records),
      getComparator(orderDirection, columnToSort)
    ).slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  };

  return {
    MyTableContainer,
    MyTableHead,
    MyTablePagination,
    recordsAfterPagingAndSorting,
  };
};

export default useTable;
