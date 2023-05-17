(async function () {
  const data = await fetch("./data.json");
  const res = await data.json();

  let employees = res;
  let selectedEmployeeId = employees[0].id;
  let selectedEmployee = employees[0];

  const employeeList = document.querySelector(".employees__names--list");
  const employeeInfo = document.querySelector(".employees__single--info");

  //Add Employee Logic
  const addEmployeeModel = document.getElementsByClassName("add_employee");
  const addEmployeeform = document.getElementsByClassName(
    "addEmployee__create"
  );
  const createEmployee = document.getElementsByClassName("createEmployee");

  // console.log(createEmployee);
  createEmployee[0].addEventListener("click", () => {
    addEmployeeModel[0].style.display = "flex";
  });

  addEmployeeModel[0].addEventListener("click", (e) => {
    if (e.target.className === "add_employee") {
      addEmployeeModel[0].style.display = "none";
    }
  });

  addEmployeeform[0].addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(addEmployeeform[0]);
    const values = [...formData.entries()];
    console.log(values);
    let empData = {};
    values.map((val) => {
      empData[val[0]] = val[1];
    });
    empData.id = employees[employees.length - 1].id + 1;
    empData.age =
      new Date().getFullYear() - parseInt(empData.dob.slice(0, 4), 10);
    employees.push(empData);
    renderEmployees();
    addEmployeeform[0].reset();
    addEmployeeModel[0].style.display = "none";
  });

  //Select Employee Logic
  employeeList.addEventListener("click", (e) => {
    if (e.target.tagName === "SPAN" && selectedEmployeeId !== e.target.id) {
      selectedEmployeeId = e.target.id;
      renderEmployees();
      renderSingleEmployee();
    }
    console.log(e.target);
    if (e.target.tagName === "I") {
      employees = employees.filter(
        (emp) => String(emp.id) !== e.target.parentNode.id
      );
      if (String(selectedEmployeeId) === e.target.parentNode.id) {
        selectedEmployeeId = employees[0]?.id || -1;
        selectedEmployee = employees[0] || {};
        renderSingleEmployee();
      }
      renderEmployees();
    }
  });

  const renderEmployees = () => {
    employeeList.innerHTML = "";
    employees.forEach((emp) => {
      const employee = document.createElement("span");
      employee.classList.add("employees__names--item");
      if (parseInt(selectedEmployeeId, 10) === emp.id) {
        employee.classList.add("selected");
        selectedEmployee = emp;
      }
      employee.setAttribute("id", emp.id);
      employee.innerHTML = `${emp.firstName} ${emp.lastName} <i class="employeeDelete">❌</i>`;
      console.log("working2");

      employeeList.append(employee);
      // employeeList.append("hello");
    });
  };

  const renderSingleEmployee = () => {
    // Employee Delete Logic - START

    if (selectedEmployeeId === -1) {
      employeeInfo.innerHTML = "";
      return;
    }
    // Employee Delete Logic - END

    employeeInfo.innerHTML = `
      <img src="${selectedEmployee.imageUrl}" />
      <span class="employees__single--heading">
      ${selectedEmployee.firstName} ${selectedEmployee.lastName} (${selectedEmployee.age})
      </span>
      <span>${selectedEmployee.address}</span>
      <span>${selectedEmployee.email}</span>
      <span>Mobile - ${selectedEmployee.contactNumber}</span>
      <span>DOB - ${selectedEmployee.dob}</span>
    `;
  };
  console.log("working1");
  renderEmployees();
  if (selectedEmployee) renderSingleEmployee();
})();
