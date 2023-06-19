import express from 'express'
import Employee from '../models/employee';


export  class employeeController{
   
    public static showAllEmployee = async (req:express.Request,res:express.Response)=>{
        try {
            const employees = await Employee.findAll();
            res.json(employees);
          } catch (error) {
            res.status(500).json({ message: 'Failed to retrieve employees.' });
          }
    }

    public static getEmployeeById = async (req:express.Request,res:express.Response)=>{
        const { id } = req.params;
        try {
            const employee = await Employee.findByPk(id);
            if (employee) {
            res.json(employee);
            } else {
            res.status(404).json({ message: 'Employee not found.' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Failed to retrieve employee.' });
        }
    } 
    
    public static addEmployee = async (req:express.Request,res:express.Response)=>{
        try {
            const employee = await Employee.create(req.body);
            res.status(201).json(employee);
        } catch (error) {
            res.status(500).json({ message: 'Failed to create employee.' });
        }     
    }    
    
    public static updateEmployee = async (req:express.Request,res:express.Response)=>{
        const { id } = req.params;
        const { first_name, last_name, email, position } = req.body;
        try {
          const employee = await Employee.findByPk(id);
          if (employee) {
            await employee.update({ first_name, last_name, email, position });
            res.json(employee);
          } else {
            res.status(404).json({ message: 'Employee not found.' });
          }
        } catch (error) {
          res.status(500).json({ message: 'Failed to update employee.' });
        }
    }

    public static deleteEmployee = async (req:express.Request,res:express.Response)=>{
        const { id } = req.params;
        try {
          const employee = await Employee.findByPk(id);
          if (employee) {
            await employee.destroy();
            res.sendStatus(204);
          } else {
            res.status(404).json({ message: 'Employee not found.' });
          }
        } catch (error) {
          res.status(500).json({ message: 'Failed to delete employee.' });
        }

    }


}