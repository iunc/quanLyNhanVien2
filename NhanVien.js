var NhanVien = function (maNhanVien,tenNhanVien,chucVu,heSoChucVu,luongCoBan,soGioLam) {
    this.maNhanVien = maNhanVien,
    this.tenNhanVien = tenNhanVien,
    this.chucVu = chucVu,
    this.heSoChucVu = heSoChucVu,
    this.luongCoBan = luongCoBan,
    this.soGioLam = soGioLam,
    this.tongLuong = function () {
        return this.luongCoBan * this.heSoChucVu;
    },
    this.xepLoai = function () {
        if (this.soGioLam >= 120) {
            return 'Nhân viên xuất sắc';
        }
        else {
            if (this.soGioLam >= 100 && this.soGioLam < 120) {
                return 'Nhân viên giỏi';
            }
            else if (this.soGioLam >= 80 && this.soGioLam < 100) {
                return 'Nhân viên khá';
            }
            else if (this.soGioLam >= 50 && this.soGioLam < 80) {
                return 'Nhân viên trung bình';
            }
        }
    }
}