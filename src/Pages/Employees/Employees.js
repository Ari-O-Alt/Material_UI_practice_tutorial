import React from 'react';
import EmployeeForm from './EmployeeForm';
import PeopleIcon from '@material-ui/icons/People';
import AddIcon from '@material-ui/icons/Add';
import PageHeader from '../../Components/PageHeader/PageHeader';
import {
  InputAdornment,
  makeStyles,
  Paper,
  TableBody,
  TableCell,
  TableRow,
  Toolbar,
} from '@material-ui/core';
import useTable from '../../Components/useTable';
import * as EmployeeService from '../../Services/employeeService';
import MyInput from '../../Components/Controls/MyInput';
import { Search } from '@material-ui/icons';
import MyButton from '../../Components/Controls/MyButton';
import MyPopup from '../../Components/MyPopup/MyPopup';

const styles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  searchInput: {
    width: '75%',
  },
  addNewButton: {
    position: 'absolute',
    right: '10px',
  },
}));

const headCells = [
  { id: 'fullName', label: "Employee's Name" },
  { id: 'city', label: 'City' },
  { id: 'department', label: 'Department' },
  { id: 'phone', label: 'Phone number', disableSorting: true },
];

const Employees = () => {
  const classes = styles();

  // we get all the data from the local storage
  const tableBodyData = EmployeeService.getAllEmployees();

  // we store the data from the local storage in the records state
  const [records, setRecords] = React.useState(tableBodyData);
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);

  const [filterFunction, setFilterFunction] = React.useState({
    fn: (items) => {
      return items;
    },
  });

  const {
    MyTableContainer,
    MyTableHead,
    MyTablePagination,
    recordsAfterPagingAndSorting,
  } = useTable(records, headCells, filterFunction);

  /**
   *
   * function that will handle the search action
   */
  const handleSearch = (event) => {
    let target = event.target;
    setFilterFunction({
      // we set the state to a function that will return all the items if the search box is empty or the items that match the value in the search bar
      fn(items) {
        if (target.value === ' ') {
          return items;
        } else {
          return items.filter((item) =>
            item.fullName.toLowerCase().includes(target.value)
          );
        }
      },
    });
  };

  return (
    <React.Fragment>
      <PageHeader
        icon={<PeopleIcon fontSize={'large'} />}
        title={'New employee'}
        subtitle={'Form design validation'}
      />
      <Paper className={classes.pageContent}>
        <Toolbar>
          <MyInput
            className={classes.searchInput}
            label={'Search employees'}
            InputProps={{
              startAdornment: (
                <InputAdornment position={'start'}>
                  <Search />
                </InputAdornment>
              ),
            }}
            onChange={handleSearch}
          />
          <MyButton
            text={'Add New'}
            variant='outlined'
            startIcon={<AddIcon />}
            className={classes.addNewButton}
            onClick={() => setIsPopupOpen(true)}
          />
        </Toolbar>
        <MyTableContainer>
          <MyTableHead />
          <TableBody>
            {recordsAfterPagingAndSorting().map((record, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>{record.fullName}</TableCell>
                  <TableCell>{record.city}</TableCell>
                  <TableCell>{record.department}</TableCell>
                  <TableCell>{record.mobile}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </MyTableContainer>
        <MyTablePagination />
      </Paper>
      <MyPopup
        isPopupOpen={isPopupOpen}
        title={'Employee form'}
        setIsPopupOpen={setIsPopupOpen}
      >
        <EmployeeForm />
      </MyPopup>
    </React.Fragment>
  );
};

export default Employees;
