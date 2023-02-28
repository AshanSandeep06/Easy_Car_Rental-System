let baseUrl = "http://localhost:8085/Back_End_war/";

var driverUsername = location.search.substring(1);
console.log(driverUsername);

$(function () {
    $("#driverInformation_section").css("display", 'none');
    $("#driverSchedule_section").css("display", 'block');
    loadAllDriversSchedule();
    setDriverProfileData();
});

$('#btnDriverSchedule').on('click', function () {
    $("#driverInformation_section").css("display", 'none');
    $("#driverSchedule_section").css("display", 'block');
    loadAllDriversSchedule();
});

$('#btnDriverInformation').on('click', function () {
    $("#driverInformation_section").css("display", 'block');
    $("#driverSchedule_section").css("display", 'none');
    setDriverProfileData();
});

function loadAllDriversSchedule() {
    $("#tblDriverSchedule>tbody").empty();

    $.ajax({
        url: baseUrl + "rent?driverRequestingType=Yes",
        method: "get",
        success: function (resp) {
            if (resp.data != null) {
                for (let rent of resp.data) {
                    if (rent.rentStatus == "Pending" || rent.rentStatus == "Accepted" || rent.rentStatus == "Ongoing") {
                        var xr = rent.pickUpDate;
                        var startDate = xr[0] + "-" + xr[1] + "-" + xr[2];

                        var xr1 = rent.pickUpTime;
                        var startTime;
                        if (xr1[1] < 10) {
                            startTime = xr1[0] + ":0" + xr1[1];
                        }

                        if (xr1[0] >= 12) {
                            startTime += " PM";
                        } else {
                            startTime += " AM";
                        }

                        //---------------------------------

                        var yr = rent.returnDate;
                        var endDate = yr[0] + "-" + yr[1] + "-" + yr[2];

                        var yr1 = rent.returnTime;
                        var returnTime;
                        if (yr1[1] < 10) {
                            returnTime = yr1[0] + ":0" + yr1[1];
                        }

                        if (yr1[0] >= 12) {
                            returnTime += " PM";
                        } else {
                            returnTime += " AM";
                        }

                        for (let i = 0; i < rent.rentDetail.length; i++) {
                            $("#tblDriverSchedule>tbody").append(`<tr><td>${rent.rentDetail[i].driver.driverId}</td><td>${rent.rentDetail[i].driver.name}</td><td>${rent.rentId}</td><td>${rent.rentDetail[i].carId}</td><td>${rent.customer.name}</td><td>${rent.customer.email}</td><td>${rent.customer.contactNumber}</td><td>${startDate}</td><td>${startTime}</td><td>${endDate}</td><td>${returnTime}</td><td>${rent.location}</td></tr>`);
                        }
                    }
                }
            }
        }
    });
}

// ---------------------------------------------------------------

$('#btnSearchDriverSchedule').on('click', function () {
    if ($('#txtSearchDriverSchedule').val() != '') {
        if ($('#cmbSelectDriver').val() == "Driver ID") {
            $.ajax({
                url: baseUrl + "rent?driverRequestingType=Yes",
                method: "get",
                success: function (resp) {
                    if (resp.data != null) {
                        $("#tblDriverSchedule>tbody").empty();
                        for (let rent of resp.data) {
                            if (rent.rentStatus == "Pending" || rent.rentStatus == "Accepted" || rent.rentStatus == "Ongoing") {
                                var xr = rent.pickUpDate;
                                var startDate = xr[0] + "-" + xr[1] + "-" + xr[2];

                                var xr1 = rent.pickUpTime;
                                var startTime;
                                if (xr1[1] < 10) {
                                    startTime = xr1[0] + ":0" + xr1[1];
                                }

                                if (xr1[0] >= 12) {
                                    startTime += " PM";
                                } else {
                                    startTime += " AM";
                                }

                                //---------------------------------

                                var yr = rent.returnDate;
                                var endDate = yr[0] + "-" + yr[1] + "-" + yr[2];

                                var yr1 = rent.returnTime;
                                var returnTime;
                                if (yr1[1] < 10) {
                                    returnTime = yr1[0] + ":0" + yr1[1];
                                }

                                if (yr1[0] >= 12) {
                                    returnTime += " PM";
                                } else {
                                    returnTime += " AM";
                                }

                                for (let i = 0; i < rent.rentDetail.length; i++) {
                                    if (rent.rentDetail[i].driver.driverId == $('#txtSearchDriverSchedule').val()) {
                                        $("#tblDriverSchedule>tbody").append(`<tr><td>${rent.rentDetail[i].driver.driverId}</td><td>${rent.rentDetail[i].driver.name}</td><td>${rent.rentId}</td><td>${rent.rentDetail[i].carId}</td><td>${rent.customer.name}</td><td>${rent.customer.email}</td><td>${rent.customer.contactNumber}</td><td>${startDate}</td><td>${startTime}</td><td>${endDate}</td><td>${returnTime}</td><td>${rent.location}</td></tr>`);
                                    }
                                }
                            }
                        }
                    }
                }
            });

        } else {
            $.ajax({
                url: baseUrl + "rent?driverRequestingType=Yes",
                method: "get",
                success: function (resp) {
                    if (resp.data != null) {
                        $("#tblDriverSchedule>tbody").empty();
                        for (let rent of resp.data) {
                            if (rent.rentStatus == "Pending" || rent.rentStatus == "Accepted" || rent.rentStatus == "Ongoing") {
                                var xr = rent.pickUpDate;
                                var startDate = xr[0] + "-" + xr[1] + "-" + xr[2];

                                var xr1 = rent.pickUpTime;
                                var startTime;
                                if (xr1[1] < 10) {
                                    startTime = xr1[0] + ":0" + xr1[1];
                                }

                                if (xr1[0] >= 12) {
                                    startTime += " PM";
                                } else {
                                    startTime += " AM";
                                }

                                //---------------------------------

                                var yr = rent.returnDate;
                                var endDate = yr[0] + "-" + yr[1] + "-" + yr[2];

                                var yr1 = rent.returnTime;
                                var returnTime;
                                if (yr1[1] < 10) {
                                    returnTime = yr1[0] + ":0" + yr1[1];
                                }

                                if (yr1[0] >= 12) {
                                    returnTime += " PM";
                                } else {
                                    returnTime += " AM";
                                }

                                for (let i = 0; i < rent.rentDetail.length; i++) {
                                    if (rent.rentDetail[i].driver.nic == $('#txtSearchDriverSchedule').val()) {
                                        $("#tblDriverSchedule>tbody").append(`<tr><td>${rent.rentDetail[i].driver.driverId}</td><td>${rent.rentDetail[i].driver.name}</td><td>${rent.rentId}</td><td>${rent.rentDetail[i].carId}</td><td>${rent.customer.name}</td><td>${rent.customer.email}</td><td>${rent.customer.contactNumber}</td><td>${startDate}</td><td>${startTime}</td><td>${endDate}</td><td>${returnTime}</td><td>${rent.location}</td></tr>`);
                                    }
                                }
                            }
                        }
                    }
                }
            });
        }

    } else {
        Swal.fire({
            icon: 'error',
            title: 'Empty Fields ?',
            text: 'Driver ID or Driver NIC Search Field is Empty..!'
        })
    }
});

$('#txtSearchDriverSchedule').on("keyup", function () {
    if ($('#txtSearchDriverSchedule').val() == '') {
        loadAllDriversSchedule();
    }
});

$('#btnSearchDriverClear').on('click', function () {
    $('#txtSearchDriverSchedule').val('');
    $('#cmbSelectDriver').val('Driver ID');
    loadAllDriversSchedule();
});

/*----------------------- Driver Profile -----------------------*/
function setDriverProfileData() {
    $.ajax({
        url: baseUrl + "/driver?driverUsername=" + driverUsername,
        method: "get",
        dataType: "json",
        success: function (resp) {
            if (resp.data != null) {
                let driver = resp.data;
                $.ajax({
                    url: baseUrl + "/user_credentials?username=" + driverUsername,
                    method: "get",
                    dataType: "json",
                    success: function (resp) {
                        let user = resp.data;
                        $('#txtDriverId').val(driver.driverId);
                        $('#txtDriverUsername').val(user.username);
                        $('#txtDriverPassword').val(user.password);
                        $('#txtDriverName').val(driver.name);
                        $('#txtDriverAddress').val(driver.address);
                        $('#txtDriverContact').val(driver.contactNumber);
                        $('#txtDriverNic').val(driver.nic);
                        $('#txtDriverLicenseNo').val(driver.licenseNo);

                        $.ajax({
                            url: baseUrl + "driver/getDriverImages/" + driver.driverId,
                            method: "get",
                            dataType: "json",
                            success: function (resp) {
                                $("#driverLicenseImage").attr('src', "../assets/img/uploads/driverImages/" + resp.data.licenseImage);
                            }
                        });
                    }
                });
            }
        }
    });
}

$('#btnUpdateProfile').on('click', function () {
    updateDriverProfile();
});

function updateDriverProfile() {
    if ($('#txtDriverId').val() != '' && $('#txtDriverUsername').val() != '' && $('#txtDriverPassword').val() != '' && $('#txtDriverName').val() != '' && $('#txtDriverAddress').val() != '' && $('#txtDriverContact').val() != '' && $('#txtDriverNic').val() != '' && $('#txtDriverLicenseNo').val() != '') {
        let driverObject = {
            driverId: $('#txtDriverId').val(),
            name: $("#txtDriverName").val(),
            address: $("#txtDriverAddress").val(),
            contactNumber: $("#txtDriverContact").val(),
            nic: $("#txtDriverNic").val(),
            licenseNo: $("#txtDriverLicenseNo").val()
        };

        let userObject = {
            username: $('#txtDriverUsername').val(),
            password: $('#txtDriverPassword').val(),
            role: "Driver"
        };

        $.ajax({
            url: baseUrl + "user_credentials",
            method: "put",
            data: JSON.stringify(userObject),
            contentType: "application/json",
            dataType: "json",
            success: function (res) {
                alert(res.message);

                $.ajax({
                    url: baseUrl + "driver",
                    method: "put",
                    data: JSON.stringify(driverObject),
                    contentType: "application/json",
                    dataType: "json",
                    success: function (res) {
                        alert(res.message);

                        if ($('#uploadDriverLicenseImage')[0].files[0] != null) {
                            updateDriverLicenseImages(driverObject.driverId);
                        }
                        setDriverProfileData();
                    },

                    error: function (error) {
                        alert(JSON.parse(error.responseText).message);
                    }
                });

            },

            error: function (error) {
                alert(JSON.parse(error.responseText).message);
            }
        });

    } else {
        Swal.fire({
            icon: 'error',
            title: 'Your Profile Fields are Empty..!',
            text: 'All Fields are Shouldn\'t Be Empty'
        })
    }
}

function updateDriverLicenseImages(driverId) {
    if ($('#uploadDriverLicenseImage')[0].files[0] != null) {
        let formData = new FormData();
        var licenseImage = $('#uploadDriverLicenseImage')[0].files[0];
        var licenseImageName = driverId + "_License-image." + $('#uploadDriverLicenseImage')[0].files[0].name.split(".")[1];
        formData.append("licenseImage", licenseImage, licenseImageName);

        $.ajax({
            url: baseUrl + "driver/uploadDriverImages/uploadLicenseImage?driverId=" + driverId,
            method: "PUT",
            contentType: false,
            processData: false,
            data: formData,

            success: function (res) {
                setDriverProfileData();
                alert(res.message);
            },
            error: function (error) {
                alert(JSON.parse(error.responseText).message);
            }
        });
    }
    $('#uploadDriverLicenseImage').val('');
}






