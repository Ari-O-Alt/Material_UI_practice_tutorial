import React from 'react';
import EmployeeForm from './EmployeeForm';
import PeopleIcon from '@material-ui/icons/People';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import EditOutlinedIcon from '@material-ui/icons/Edit';
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
import MyActionButton from '../../Components/Controls/MyActionButton';

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
  { id: 'actions', label: 'Actions', disableSorting: true },
];

const Employees = () => {
  const classes = styles();

  // we get the data from the local storage by calling a function; we then store it in the state
  const [records, setRecords] = React.useState(
    EmployeeService.getAllEmployees()
  );
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

  /**
   *
   * @param {*} employee the employee that needs to be added
   * @param {*} resetForm the functon that will empty the form
   * @param {*} setIsPopupOpen state set that will close the popup
   * @param {*} setRecords function that will get the updated data to display in the table
   */
  const addOrEdit = (employee, resetForm) => {
    EmployeeService.insertEmployee(employee);
    resetForm();
    setIsPopupOpen(false);
    setRecords(EmployeeService.getAllEmployees());
  };

  return (
    <React.Fragment>
      {/*   -------------------------------------------------------   page header */}
      <PageHeader
        icon={<PeopleIcon fontSize={'large'} />}
        title={'New employee'}
        subtitle={'Form design validation'}
      />
      {/*   -------------------------------------------------------   the whole paper */}
      <Paper className={classes.pageContent}>
        <Toolbar>
          {/*   -------------------------------------------------------   search input */}
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

          {/*   -----------------------------------------   button that opens the popup */}
          <MyButton
            text={'Add New'}
            variant='outlined'
            startIcon={<AddIcon />}
            className={classes.addNewButton}
            onClick={() => setIsPopupOpen(true)}
          />
        </Toolbar>

        {/*   -------------------------------------------------------   table of employees */}
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
                  <TableCell>
                    <MyActionButton color={'primary'}>
                      <EditOutlinedIcon fontSize={'small'} />
                    </MyActionButton>
                    <MyActionButton color={'secondary'}>
                      <CloseIcon fontSize={'small'} />
                    </MyActionButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </MyTableContainer>
        <MyTablePagination />
      </Paper>
      {/* -------------------------------------------------------------------------  popup for adding employees */}
      <MyPopup
        isPopupOpen={isPopupOpen}
        title={'Employee form'}
        setIsPopupOpen={setIsPopupOpen}
      >
        <EmployeeForm addOrEdit={addOrEdit} />
      </MyPopup>
    </React.Fragment>
  );
};

export default Employees;
