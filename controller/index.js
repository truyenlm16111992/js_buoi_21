let list = new ListEmployee();
reloadList();
function setLocalStorage() {
    localStorage.setItem("ListEmployee", JSON.stringify(list.employees));
}
function getLocalStorage() {
    let data = localStorage.getItem("ListEmployee");
    if (data) {
        arrData = JSON.parse(data);
        list.employees = [];
        arrData.forEach(e => {
            list.addItem(new Employee(
                e.userCode,
                e.userName,
                e.userEmail,
                e.password,
                e.workingDay,
                e.basicSalary,
                e.jobTitle,
                e.workHours
            ));
        });
    }
}
function reloadList() {
    getLocalStorage();
    renderList();
}
function renderList(_employees = list.employees) {
    let strRows = "";
    _employees.forEach(e => {
        strRows += `<tr>
                        <td>${e.userCode}</td>
                        <td>${e.userName}</td>
                        <td>${e.userEmail}</td>
                        <td>${e.workingDay}</td>
                        <td>${e.jobTitle}</td>
                        <td>${e.getTotalSalary()}</td>
                        <td>${e.getRatingEmployee()}</td>
                        <td>
                            <button type="button" onclick="setEditControl(true);updateEmployee('${e.userCode}');">
                                <i class="fa fa-edit"></i>
                            </button>
                            <button type="button" onclick="deleteEmployee('${e.userCode}');">
                                <i class="fa fa-times-circle"></i>
                            </button>
                        </td>
                    </tr>`;
    });
    getElement("#tblList").innerHTML = strRows;
}
function setEditControl(_isEdit = false) {
    getElement("#btnAdd").style.setProperty("display", _isEdit ? "none" : "inherit");
    getElement("#btnEdit").style.setProperty("display", _isEdit ? "inherit" : "none");
    !_isEdit && getElement("#frmEmployee").reset();
    getElementAll(".sp-thongbao").forEach(e=>e.style.setProperty("display","none"));
    let domUserCode = getElement("#tbUserCode");
    _isEdit ? domUserCode.setAttribute("readonly", true) : domUserCode.removeAttribute("readonly");
}
function getEmployee(_isEdit=false) {
    let basicSalary = getElement("#tbBasicSalary").value;
    let workHours = getElement("#tbWorkHours").value;
    let obj = new Employee(
        getElement("#tbUserCode").value,
        getElement("#tbUserName").value,
        getElement("#tbUserEmail").value,
        getElement("#tbPassword").value,
        getElement("#dpWorkingDay").value,
        +basicSalary,
        getElement("#cbJobTitle").value,
        +workHours,
    );
    let isValid = true;
    //Tài khoản độ dài 4-6 ký tự
    //isValid &= checkStringLength(obj.userCode, 1, undefined, "#lbWarningUserCode", "Tài khoản không được để trống.") && checkStringLength(obj.userCode, 4, 6, "#lbWarningUserCode", "Tài khoản là chuỗi có độ dài từ 4 đến 6 kí tự.")&&(!_isEdit&&list.findByUserCode(obj.userCode)!==-1?showMessage("#lbWarningUserCode", `Tài khoản '${obj.userCode}' đã tồn tại.`):showMessage("#lbWarningUserCode", ""));

    //Tài khoản độ dài 4-6 ký số và chữ alpha
    //isValid &= checkStringLength(obj.userCode, 1, undefined, "#lbWarningUserCode", "Tài khoản không được để trống.") && checkRegex(obj.userCode,/^[0-9a-zA-Z]{4,6}$/, "#lbWarningUserCode", "Tài khoản là chuỗi có độ dài từ 4 đến 6 kí số.")&&(!_isEdit&&list.findByUserCode(obj.userCode)!==-1?showMessage("#lbWarningUserCode", `Tài khoản '${obj.userCode}' đã tồn tại.`):showMessage("#lbWarningUserCode", ""));

    //Tài khoản độ dài 4-6 ký số
    isValid &= checkStringLength(obj.userCode, 1, undefined, "#lbWarningUserCode", "Tài khoản không được để trống.") && checkRegex(obj.userCode,/^[0-9]{4,6}$/, "#lbWarningUserCode", "Tài khoản là chuỗi có độ dài từ 4 đến 6 kí số.")&&(!_isEdit&&list.findByUserCode(obj.userCode)!==-1?showMessage("#lbWarningUserCode", `Tài khoản '${obj.userCode}' đã tồn tại.`):showMessage("#lbWarningUserCode", ""));
    isValid &= checkStringLength(obj.userName, 1, undefined, "#lbWarningUserName", "Họ và tên không được để trống.") && checkVietnameseLetters(obj.userName, "#lbWarningUserName", "Họ và tên phải là chuỗi gồm các kí tự chữ.");
    isValid &= checkStringLength(obj.userEmail, 1, undefined, "#lbWarningUserEmail", "Email không được để trống.") && checkEmail(obj.userEmail, "#lbWarningUserEmail", "Email không đúng định dạng.");
    isValid &= checkStringLength(obj.password, 1, undefined, "#lbWarningPassword", "Mật khẩu không được để trống.") && checkStringLength(obj.password, 6, 10, "#lbWarningPassword", "Mật khẩu là chuỗi có độ dài từ 6 đến 10 kí tự.") && checkPassword(obj.password, "#lbWarningPassword", "Mật khẩu phải chứa ít nhất 1 ký tự số, 1 ký tự in hoa và 1 ký tự đặc biệt.");
    isValid &= checkStringLength(obj.workingDay, 1, undefined, "#lbWarningWorkingDay", "Ngày làm việc không được để trống.") && checkDateFormat(obj.workingDay, "#lbWarningWorkingDay", "Ngày làm việc không đúng định dạng mm/dd/yyyy");
    isValid &= checkStringLength(basicSalary, 1, undefined, "#lbWarningBasicSalary", "Lương cơ bản không được để trống.") && (Number.isInteger(obj.basicSalary) ? showMessage("#lbWarningBasicSalary", "") : !showMessage("#lbWarningBasicSalary", "Lương cơ bản phải là số nguyên từ 1 000 000 đến 20 000 000.")) && checkRangeNumber(obj.basicSalary, 1000000, 20000000, "#lbWarningBasicSalary", "Lương cơ bản phải là số nguyên từ 1 000 000 đến 20 000 000.");
    isValid &= obj.jobTitle === "Chọn chức vụ" ? !showMessage("#lbWarningJobTitle", "Chức vụ không hợp lệ.") : showMessage("#lbWarningJobTitle", "");
    isValid &= checkStringLength(workHours, 1, undefined, "#lbWarningWorkHours", "Giờ làm việc không được để trống.") && (Number.isInteger(obj.workHours) ? showMessage("#lbWarningWorkHours", "") : !showMessage("#lbWarningWorkHours", "Giờ làm việc phải là số nguyên từ 80 đến 200 giờ.")) && checkRangeNumber(obj.workHours, 80, 200, "#lbWarningWorkHours", "Giờ làm việc phải là số nguyên từ 80 đến 200 giờ.");
    return isValid ? obj : undefined;
}
getElement("#btnAdd").onclick = function () {
    let employee = getEmployee();
    if (employee) {
        list.addItem(employee);
        setLocalStorage();
        reloadList();
        $("#myModal").modal('hide');
    }

};
getElement("#btnEdit").onclick = function () {
    let employee = getEmployee(true);
    if (employee) {
        list.updateItem(employee);
        setLocalStorage();
        reloadList();
        $("#myModal").modal('hide');
    }

};
function deleteEmployee(_userCode) {
    let del = list.findByUserCode(_userCode);
    if (del >= 0 && confirm(`Bạn có chắc rằng muốn tài khoản '${_userCode}' xóa?`)) {
        list.removeAt(del);
        setLocalStorage();
        reloadList();
    }
};
function updateEmployee(_userCode) {
    let index = list.findByUserCode(_userCode);
    if (index >= 0) {
        let obj = list.employees[index];
        getElement("#tbUserCode").value = obj.userCode;
        getElement("#tbUserName").value = obj.userName;
        getElement("#tbUserEmail").value = obj.userEmail;
        getElement("#tbPassword").value = obj.password;
        getElement("#dpWorkingDay").value = obj.workingDay;
        getElement("#tbBasicSalary").value = obj.basicSalary;
        getElement("#cbJobTitle").value = obj.jobTitle;
        getElement("#tbWorkHours").value = obj.workHours;
        $("#myModal").modal('show');
    }
}
getElement("#tbSearch").onkeyup = function (e) {
    e.target.value===""?reloadList():renderList(list.filterByAttribute(e.target.value,"getRatingEmployee()"));
};