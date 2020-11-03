var Validation = function () {
    //Kiểm tra rỗng
    this.kiemTraRong = function (value, name, selectorError) {
        if (value.trim() === "") {
            document.querySelector(selectorError).innerHTML = name + ' không được bỏ trống!';
            return false;
        }
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }
    //Kiểm tra độ dài chuỗi
    this.kiemTraDoDaiChuoi = function (value, name, selectorError, minLength, maxLength) {
        if (value.trim().length < minLength || value.trim().length > maxLength) {
            document.querySelector(selectorError).innerHTML = name + ` từ ${minLength} đến ${maxLength} ký tự!`;
            return false;
        }
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }
    //Kiểm tra giá trị
    this.kiemTraGiaTri = function (value, name, selectorError, minValue, maxValue) {
        if (Number(value) < minValue || Number(value) > maxValue) {
            document.querySelector(selectorError).innerHTML = name + ` từ ${minValue} đến ${maxValue}!`;
            return false;
        }
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }

    //Kiểm tra tên nhân viên
    this.kiemTraTatCaKyTu = function (value, name, selectorError) {
        var regexKyTu = /^[A-Za-z ]+$/;
        if (!regexKyTu.test(value)) {
            document.querySelector(selectorError).innerHTML = name + ' không đúng định dạng!';
            return false;
        }
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }
}