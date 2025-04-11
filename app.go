package main

import "fmt"

type employee struct {
	name string
	salary float64
}

func (e *Emplotyee) increaseSalary(percentage float64) {
	e.salary += e.salary * percentage / 100
}

func main() {
	emp := employee{Name : "John", Salary: 5000}
	emp.increaseSalary(10)
	fmt.Printf(emp.Salary)
}


package main

import "fmt"

type employee struct {
	name   string
	salary float64
}

func (e *employee) increaseSalary(percentage float64) {
	e.salary += e.salary * percentage / 100
}

func main() {
	emp := employee{name: "John", salary: 5000}
	emp.increaseSalary(20)
	fmt.Printf("Salary after increase: %.2f\n", emp.salary)
}