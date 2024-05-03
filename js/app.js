var app = angular.module('myApp', []);

app.controller('MyController', function ($scope) {
    $scope.formData = {
        channel: '',
        otherText: '',
        cccd: '',
        ngayXetTuyen: new Date(),
        maNganh: '',
        dotXetTuyen: '01',
        year: '2024',
        heXetTuyen: 'Cao Đẳng',
        nganhDuTuyen: '',
        ho_ten : '',
        gioi_tinh : 'nam',
        ngay_sinh : '',
        dien_thoai : '',
        dan_toc : 'Kinh',
        email : '',
        dia_chi : '',
        phuong_thuc_xet_tuyen : 'Chuẩn bị thi tốt nghiệp THPT',
        ten_truong_thpt : '',
        lop_6 : '',
        lop_7 : '',
        lop_8 : '',
        lop_9 : '',
        lop_10 : '',
        lop_11 : '',
        lop_12 : '',
    };

    $scope.printData = function () {
        if (isValidSurvey() && isValidAdmission() && isValidPersonalInfo() && isValidGrades()) {
            showSuccessNotification($scope.formData.toString());
        }

    };

    function isValidSurvey() {
        if (!$scope.formData.channel) {
            showErrorNotification("Vui lòng chọn thông tin khảo sát");
            return false;
        }
        if ($scope.formData.channel === 'Khác' && !$scope.formData.otherText) {
            showErrorNotification("Vui lòng nhập thông tin khác");
            return false;
        }
        return true;
    }

    function isValidAdmission() {
        if (!$scope.formData.cccd || 
            !$scope.formData.ngayXetTuyen || 
            !$scope.formData.maNganh || 
            !$scope.formData.dotXetTuyen || 
            !$scope.formData.year || 
            !$scope.formData.heXetTuyen || 
            !$scope.formData.nganhDuTuyen) {
            showErrorNotification("Vui lòng điền đầy đủ thông tin");
            return false;
        } else if (!isValidIDNumber($scope.formData.cccd)) {
            showErrorNotification("Số CCCD / CMND không hợp lệ");
            return false;
        } else if ($scope.formData.heXetTuyen === 'Cao Đẳng' && (!$scope.formData.lop_10 || !$scope.formData.lop_11 || !$scope.formData.lop_12)) {
            showErrorNotification("Vui lòng nhập điểm lớp 10, 11, 12");
            return false;
        } else if ($scope.formData.heXetTuyen === 'Trung cấp' && (!$scope.formData.lop_6 || !$scope.formData.lop_7 || !$scope.formData.lop_8 || !$scope.formData.lop_9)) {
            showErrorNotification("Vui lòng nhập điểm lớp 6, 7, 8, 9");
            return false;
        }
        return true;
    }

    function isValidPersonalInfo() {
        if (!$scope.formData.ho_ten || 
            !$scope.formData.gioi_tinh || 
            !$scope.formData.ngay_sinh || 
            !$scope.formData.dien_thoai || 
            !$scope.formData.dan_toc || 
            !$scope.formData.email || 
            !$scope.formData.dia_chi || 
            !$scope.formData.phuong_thuc_xet_tuyen || 
            !$scope.formData.ten_truong_thpt) {
                console.log($scope.formData.email);
            showErrorNotification("Vui lòng điền đầy đủ thông tin cá nhân");
            return false;
        } else if ($scope.formData.dien_thoai.length !== 10) {
            showErrorNotification("Số điện thoại phải có đúng 10 số");
            return false;
        } else if (!isValidEmail($scope.formData.email)) {
            showErrorNotification("Vui lòng nhập địa chỉ email hợp lệ");
            return false;
        }
        return true;
    }
    
    function isValidGrades() {
        var grades = [$scope.formData.lop_6, $scope.formData.lop_7, $scope.formData.lop_8, 
                      $scope.formData.lop_9, $scope.formData.lop_10, $scope.formData.lop_11, 
                      $scope.formData.lop_12];
        
        for (var i = 0; i < grades.length; i++) {
            if (!grades[i]) {
                showErrorNotification("Vui lòng nhập điểm học tập cho tất cả các lớp từ lớp 6 đến lớp 12");
                return false;
            } else if (isNaN(grades[i]) || grades[i] < 0 || grades[i] > 10) {
                showErrorNotification("Điểm học tập phải là một số từ 0 đến 10");
                return false;
            }
        }
        
        return true;
    }

    function isValidEmail(email) {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function isValidIDNumber(idNumber) {
        // Biểu thức chính quy để kiểm tra định dạng CMND hoặc CCCD
        var idRegex = /^[0-9]{9,12}$/;
    
        // Kiểm tra xem chuỗi nhập vào có khớp với biểu thức chính quy hay không
        return idRegex.test(idNumber);
    }

    function showErrorNotification(message) {
        Swal.fire({
            icon: "error",
            title: "Thất bại",
            text: message,
        });
    }

    function showSuccessNotification(message) {
        Swal.fire({
            icon: "success",
            title: "Gửi hồ sơ thành công",
            text: message,
        });
    }
    
});