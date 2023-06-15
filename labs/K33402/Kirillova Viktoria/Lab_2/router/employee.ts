import express, { Request, Response } from 'express';
import { employeeController } from '../controllers/employee';



const employeeRoute = express.Router();

// Get all employees
employeeRoute.get('/employees',employeeController.showAllEmployee);

// Get employee by ID
employeeRoute.get('/employees/:id', employeeController.getEmployeeById);

// Create a new employee
employeeRoute.post('/employees',employeeController.addEmployee);

// Update an employee
employeeRoute.put('/employees/:id',employeeController.updateEmployee);

// Delete an employee
employeeRoute.delete('/employees/:id',employeeController.deleteEmployee);

export default employeeRoute;
