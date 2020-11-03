var mangNhanVien = [];
var validate = new Validation();

document.querySelector('#btn').onclick = function () {
    var nv = new NhanVien();
    nv.maNhanVien = document.querySelector('#maNhanVien').value;
    nv.tenNhanVien = document.querySelector('#tenNhanVien').value;
    nv.heSoChucVu = document.querySelector('#chucVu').value;
    nv.luongCoBan = document.querySelector('#luongCoBan').value;
    nv.soGioLam = document.querySelector('#soGioLam').value;

    var tagChucVu = document.querySelector('#chucVu');
    var arrOption = tagChucVu.options;
    nv.chucVu = arrOption[tagChucVu.selectedIndex].innerHTML;

    //Kiểm tra hợp lệ
    var valid = true;
    //Kiểm tra rỗng
    valid &= validate.kiemTraRong(nv.maNhanVien, 'Mã nhân viên', '.null-maNV')
        & validate.kiemTraRong(nv.tenNhanVien, 'Tên nhân viên', '.null-tenNV')
        & validate.kiemTraRong(nv.luongCoBan, 'Lương cơ bản', '.null-luongCoBan')
        & validate.kiemTraRong(nv.soGioLam, 'Số giờ làm', '.null-soGioLam');
    //Kiểm tra độ dài tên và mã nhân viên
    valid &= validate.kiemTraDoDaiChuoi(nv.maNhanVien, 'Mã nhân viên', '.length-maNV', 4, 6)
        & validate.kiemTraDoDaiChuoi(nv.tenNhanVien, 'Tên nhân viên', '.length-tenNV', 6, 32)
    //Kiểm tra giá trị lương cơ bản và giờ làm
    valid &= validate.kiemTraGiaTri(nv.luongCoBan, 'Lương cơ bản', '.giatri-luongCoBan', 1000000, 20000000)
        & validate.kiemTraGiaTri(nv.soGioLam, 'Số giờ làm', '.giatri-soGioLam', 50, 150);
    //Kiểm tra tên nhân viên
    valid &= validate.kiemTraTatCaKyTu(nv.tenNhanVien, 'Tên nhân viên', '.dinhdang-tenNV');
    if (!valid) {
        return;
    }

    //thêm nhân viên vào mảng
    mangNhanVien.push(nv);
    //tạo bảng
    renderTabble(mangNhanVien);
    //lưu vào localstorage
    luuLocalStorage();
}

//Hàm tạo bảng
var renderTabble = function (arrNV) {
    var noiDungTable = '';
    for (var index = 0; index < arrNV.length; index++) {
        var nhanVien = arrNV[index];
        var nv = new NhanVien(nhanVien.maNhanVien, nhanVien.tenNhanVien, nhanVien.chucVu, nhanVien.heSoChucVu, nhanVien.luongCoBan, nhanVien.soGioLam)

        noiDungTable += `
            <tr>
                <td>${nv.maNhanVien}</td>
                <td>${nv.tenNhanVien}</td>
                <td>${nv.chucVu}</td>
                <td>${nv.luongCoBan}</td>
                <td>${nv.tongLuong()}</td>
                <td>${nv.soGioLam}</td>
                <td>${nv.xepLoai()}</td>
                <td><button class="btn btn-danger" onclick="xoaNhanVien('${nv.maNhanVien}')">Xóa</button></td>
                <td><button class="btn btn-primary" onclick="chinhSua('${nv.maNhanVien}')">Chỉnh sửa</button></td>
            </tr>
        `
    }
    document.querySelector('#tableNhanVien').innerHTML = noiDungTable;
}

//Hàm xóa nhân viên
var xoaNhanVien = function (maNV) {
    for (var index = mangNhanVien.length - 1; index >= 0; index--) {
        var nv = mangNhanVien[index];

        if (nv.maNhanVien === maNV) {
            mangNhanVien.splice(index, 1);
        }
    }
    renderTabble(mangNhanVien);
    luuLocalStorage();
}

//Hàm chỉnh sửa thông tin
var chinhSua = function (maNV) {
    document.querySelector('#maNhanVien').disabled = true;
    document.querySelector('#btn').disabled = true;
    for (var index = 0; index < mangNhanVien.length; index++) {
        var nv = mangNhanVien[index];
        if (maNV === nv.maNhanVien) {
            document.querySelector('#maNhanVien').value = nv.maNhanVien;
            document.querySelector('#tenNhanVien').value = nv.tenNhanVien;
            document.querySelector('#chucVu').value = nv.heSoChucVu;
            document.querySelector('#luongCoBan').value = nv.luongCoBan;
            document.querySelector('#soGioLam').value = nv.soGioLam;
        }
    }
}

//Lưu vào localstorage
var luuLocalStorage = function () {
    var sMangNhanVien = JSON.stringify(mangNhanVien);
    localStorage.setItem('mangNhanVien', sMangNhanVien);
}

//Lấy dữ liệu từ localstorage
var layMangNhanVienStorage = function () {
    if (localStorage.getItem('mangNhanVien')) {
        var sMangNhanVien = localStorage.getItem('mangNhanVien');
        mangNhanVien = JSON.parse(sMangNhanVien);
        renderTabble(mangNhanVien);
    }
}
layMangNhanVienStorage();

//Cập nhật thông tin người dùng
document.querySelector('#btnSave').onclick = function () {
    document.querySelector('#maNhanVien').disabled = false;
    document.querySelector('#btn').disabled = false;
    var nv = new NhanVien();
    nv.maNhanVien = document.querySelector('#maNhanVien').value;
    nv.tenNhanVien = document.querySelector('#tenNhanVien').value;
    nv.heSoChucVu = document.querySelector('#chucVu').value;
    nv.luongCoBan = document.querySelector('#luongCoBan').value;
    nv.soGioLam = document.querySelector('#soGioLam').value;
    var tagChucVu = document.querySelector('#chucVu');
    var arrOption = tagChucVu.options;
    nv.chucVu = arrOption[tagChucVu.selectedIndex].innerHTML;

    for (var index = 0; index < mangNhanVien.length; index++) {
        var nhanVienCapNhat = mangNhanVien[index];
        if (nhanVienCapNhat.maNhanVien === nv.maNhanVien) {
            nhanVienCapNhat.maNhanVien = nv.maNhanVien;
            nhanVienCapNhat.tenNhanVien = nv.tenNhanVien;
            nhanVienCapNhat.heSoChucVu = nv.heSoChucVu;
            nhanVienCapNhat.luongCoBan = nv.luongCoBan;
            nhanVienCapNhat.soGioLam = nv.soGioLam;
            nhanVienCapNhat.chucVu = nv.chucVu;
        }
    }
    renderTabble(mangNhanVien);
    luuLocalStorage();
}