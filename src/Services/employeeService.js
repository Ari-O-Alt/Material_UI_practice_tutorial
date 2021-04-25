const KEYS = {
  employees: 'employees',
  employeeId: 'employeeId',
};

export const getDepartmentCollection = () => {
  return [
    { id: '1', title: 'Marketing' },
    { id: '2', title: 'Sales' },
    { id: '3', title: 'HR' },
    { id: '4', title: 'Development' },
  ];
};

/**
 * Functions for insertion of the employee in the local storage
 * @param submittedFormData: the object that holds the data in the submitted form
 */
export const insertEmployee = (submittedFormData) => {
  // we first access the already existing value in the local storage (we get back an array)
  let employees = getAllEmployees();
  // we create an employee id and set it as the value of the "id" prop of the submittedFormData object
  submittedFormData['id'] = generateEmployeeId();
  // we append the submitted form data to that array
  employees.push(submittedFormData);
  // then we set to the local storage the newly updated array
  localStorage.setItem(KEYS.employees, JSON.stringify(employees));
};

/**
 *
 * Function to update employees in the local storage
 */
export const updateEmployee = (submittedFormData) => {
  let employees = getAllEmployees();
  let recordToUpdateIndex = employees.findIndex(
    (record) => record.id === submittedFormData.id
  );
  employees[recordToUpdateIndex] = { ...submittedFormData };
  localStorage.setItem(KEYS.employees, JSON.stringify(employees));
};

/**
 * Function to generate an exmployee id
 */
export const generateEmployeeId = () => {
  if (localStorage.getItem(KEYS.employeeId) === null) {
    localStorage.setItem(KEYS.employeeId, '0');
  }
  let id = parseInt(localStorage.getItem(KEYS.employeeId), 10);
  console.log('ID', id);
  localStorage.setItem(KEYS.employeeId, (++id).toString());
  return id;
};

/**
 * Function that will retrieve the data (employees) from the local storage
 */
export const getAllEmployees = () => {
  // if the value of the KEYS.employees key is null
  if (localStorage.getItem(KEYS.employees) === null) {
    // set that value to an empty array
    localStorage.setItem(KEYS.employees, JSON.stringify([]));
  }

  // else return the value of the KEYS.employees key

  const employees = JSON.parse(localStorage.getItem(KEYS.employees));

  let departments = getDepartmentCollection();
  return employees.map((employee) => ({
    ...employee,
    department: departments[employee.departmentId - 1].title,
  }));
};
