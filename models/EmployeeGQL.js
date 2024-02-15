const { gql } = require('apollo-server');
const  employees = require('../dummyEmp');


const EmployeeTypeDefs = gql`#graphql

    type Employee{
        id: ID!
        firstName: String!
        lastName: String!
        email: String!
        gender: String!
        salary: Float!
    }

    type Query{ # Display data
        employees: [Employee] #return all employees
        employeeById(id: ID!): Employee # return a single employee by id
    }

    type EmpResponse{ # response message
        message: String!
        employee: Employee!
    }

    type Mutation{ # CRUD operations
        addEmployee(
            id: ID!,
            firstName: String!,
            lastName: String!,
            email: String!,
            gender: String!,
            salary: Float!
        ) : EmpResponse # add a new employee

        updateEmployeebyId(
            id: ID!,
            firstName: String!,
            lastName: String!,
            email: String!,
            gender: String!,
            salary: Float!
        ): Employee # update an employee by id

        deleteEmployeebyId(id: ID!): Employee # delete an employee by id
    }
    
`
// data types that we have are
// int,float,string,boolean, ID

// ! means that the field is required
// if we don't put ! then the field is optional and can be null

const EmployeeResolvers = {

    Query: {
        employees: () => {return employees},
        employeeById: (parent, { id }) => {return employees.find(employee => employee.id === id)},
    },

    Mutation: {
        addEmployee: (parent, args) => {
            const newEmployee = { 
                ...args
            };

            if(newEmployee){
                employees.push(newEmployee);
                return {
                    message: "Employee added successfully",
                    employee: newEmployee
                };
            }
            
        },

        updateEmployeebyId: (parent, { id, firstName, lastName , email, gender, salary }) => {
            const employee = employees.find(employee => employee.id === id);
            // if employee exists
            if(employee){
                employee.firstName = firstName;
                employee.lastName = lastName;
                employee.email = email;
                employee.gender = gender;
                employee.salary = salary;

                // save the updated employee to the database
                return employee;
            }

        },

        deleteEmployeebyId: (parent, { id }) => {
            const employee = employees.find(employee => employee.id === id);
            employees = employees.filter(employee => employee.id !== id);
            return employee;
        }
    }
}


module.exports = {EmployeeTypeDefs, EmployeeResolvers};


/*

== EMPLOYEE BY LAST NAME ==
query{
  employeeByLastName(lastName: "Doe") {
    id
    firstName
    lastName
    email
    gender
    salary
  }
}

== EMPLOYEE BY ID ==
query {
  employeeById(id: 1) {
    email
    firstName
    gender
    lastName
    id
    salary
  }
}

== EMPLOYEES ==
query  {
  employees {
    email
    firstName
    gender
    id
    lastName
    salary
  }
}

== ADD EMPLOYEE ==
mutation($addEmployeeId: ID!, $firstName: String!, $lastName: String!, $email: String!, $gender: String!, $salary: Float!){
  addEmployee(id: $addEmployeeId, firstName: $firstName, lastName: $lastName, email: $email, gender: $gender, salary: $salary) {
    message
    employee {
      id
      firstName
      lastName
      email
      gender
      salary
    }
  }
}


== UPDATE EMPLOYEE ==
mutation Mutation($updateEmployeebyIdId: ID!, $firstName: String!, $lastName: String!, $email: String!, $gender: String!, $salary: Float!) {
  updateEmployeebyId(id: $updateEmployeebyIdId, firstName: $firstName, lastName: $lastName, email: $email, gender: $gender, salary: $salary) {
    id
    firstName
    lastName
    email
    gender
    salary
  }
}

== DELETE EMPLOYEE ==
mutation DeleteEmployeebyId($deleteEmployeebyIdId: ID!) {
  deleteEmployeebyId(id: $deleteEmployeebyIdId) {
    id
    firstName
    lastName
    email
    gender
    salary
  }
}
*/

