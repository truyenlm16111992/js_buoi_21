function ListEmployee() {
    this.employees = [];
    this.getLength = function () {
        return this.employees.length;
    };

    this.addItem = function (_employee) {
        this.employees.push(_employee);
    };

    this.updateItem = function (_employee) {
        let index=this.findByUserCode(_employee.userCode);
        if (index >=0 && index < this.getLength()) {
            this.employees[index].userName = _employee.userName;
            this.employees[index].userEmail = _employee.userEmail;
            this.employees[index].password = _employee.password;
            this.employees[index].workingDay = _employee.workingDay;
            this.employees[index].basicSalary = _employee.basicSalary;
            this.employees[index].jobTitle = _employee.jobTitle;
            this.employees[index].workHours = _employee.workHours;
            return 1;
        } else
            return 0;

    };

    this.removeAt = function (_index) {
        if (_index >=0 && _index < this.getLength()) {
            this.employees.splice(_index, 1);
            return 1;
        } else
            return 0;
    };

    this.findByUserCode = function (_userCode) {
        let n = this.getLength();
        for (let i = 0; i < n; i++)
            if (this.employees[i].userCode === _userCode)
                return i;
        return -1;
    };
    this.filterByAttribute=function(_valueSearch,_attrSearch){
        _valueSearch=_valueSearch.toLowerCase();
        let arrResult=[];
        this.employees.forEach(e=>eval("e."+_attrSearch).toString().toLowerCase().indexOf(_valueSearch)!==-1&&arrResult.push(e));
        return arrResult;
    }
}