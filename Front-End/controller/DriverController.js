let baseUrl = "http://localhost:8080/Back-End/";

$(function () {
    $("#driverInformation_section").css("display", 'none');
    $("#driverSchedule_section").css("display", 'block');
    loadAllDriversSchedule();
});

$('#btnDriverSchedule').on('click', function () {
    $("#driverInformation_section").css("display", 'none');
    $("#driverSchedule_section").css("display", 'block');
    loadAllDriversSchedule();
});

$('#btnDriverInformation').on('click', function () {
    $("#driverInformation_section").css("display", 'block');
    $("#driverSchedule_section").css("display", 'none');
});

function loadAllDriversSchedule() {
    $("#tblDriverSchedule>tbody").empty();

    $.ajax({
        url: baseUrl + "rent?driverRequestingType=Yes",
        method: "get",
        success: function (resp) {
            if (resp.data != null) {
                for (let rent of resp.data) {
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
            });

        } else {
            $.ajax({
                url: baseUrl + "rent?driverRequestingType=Yes",
                method: "get",
                success: function (resp) {
                    if (resp.data != null) {
                        $("#tblDriverSchedule>tbody").empty();
                        for (let rent of resp.data) {
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

$('#txtSearchDriverSchedule').on("keydown", function () {
    if ($('#txtSearchDriverSchedule').val() == '') {
        loadAllDriversSchedule();
    }
});

$('#btnSearchDriverClear').on('click', function () {
    $('#txtSearchDriverSchedule').val('');
    $('#cmbSelectDriver').val('Driver ID');
    loadAllDriversSchedule();
});