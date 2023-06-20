function Employee(
    _userCode,
    _userName,
    _userEmail,
    _password,
    _workingDay,
    _basicSalary,
    _jobTitle,
    _workHours
) {
    this.userCode = _userCode;
    this.userName = _userName;
    this.userEmail = _userEmail;
    this.password = _password;
    this.workingDay = _workingDay;
    this.basicSalary = _basicSalary;
    this.jobTitle = _jobTitle;
    this.workHours = _workHours;
    this.getSalaryFactor = function () {
        if (this.jobTitle === "Giám đốc")
            return 3;
        else if (this.jobTitle === "Trưởng phòng")
            return 2;
        else
            return 1;
    };
    this.getTotalSalary = function () {
        return (this.getSalaryFactor()*this.basicSalary).toLocaleString();
    };
    this.getRatingEmployee = function () {
        if (this.workHours >= 192)
            return "Nhân viên xuất sắc";
        else if (this.workHours >= 176)
            return "Nhân viên giỏi";
        else if (this.workHours >= 160)
            return "Nhân viên khá";
        else
            return "Nhân viên trung bình";
    }
}