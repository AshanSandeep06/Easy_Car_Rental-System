let baseUrl = "http://localhost:8085/Back_End_war/";
$(function () {
    $('#adminDashboard').css("display", "flex");
    $("#manageRentalRequests_section").css('display', 'none');
    $("#manageVehicle_section").css('display', 'none');
    $("#manageBookings_section").css('display', 'none');
    $("#manageCustomer_section").css('display', 'none');
    $("#manageDriver_section").css('display', 'none');
    $("#viewDriverSchedule_section").css('display', 'none');
    $("#viewCarSchedule_section").css('display', 'none');
    $("#adminProfile_section").css('display', 'none');
    $("#manageRentDetails_section").css('display', 'none');
    $("#managePayment_section").css('display', 'none');
});

$('#btnAdminDashBoard').on('click', function () {
    $('#adminDashboard').css("display", "flex");
    $("#manageRentalRequests_section").css('display', 'none');
    $("#manageVehicle_section").css('display', 'none');
    $("#manageBookings_section").css('display', 'none');
    $("#manageCustomer_section").css('display', 'none');
    $("#manageDriver_section").css('display', 'none');
    $("#viewDriverSchedule_section").css('display', 'none');
    $("#viewCarSchedule_section").css('display', 'none');
    $("#adminProfile_section").css('display', 'none');
    $("#manageRentDetails_section").css('display', 'none');
    $("#managePayment_section").css('display', 'none');
});

$('#btnRentalRequests').on('click', function () {
    $('#adminDashboard').css("display", "none");
    $("#manageRentalRequests_section").css('display', 'block');
    $("#manageVehicle_section").css('display', 'none');
    $("#manageBookings_section").css('display', 'none');
    $("#manageCustomer_section").css('display', 'none');
    $("#manageDriver_section").css('display', 'none');
    $("#viewDriverSchedule_section").css('display', 'none');
    $("#viewCarSchedule_section").css('display', 'none');
    $("#adminProfile_section").css('display', 'none');
    $("#manageRentDetails_section").css('display', 'none');
    $("#managePayment_section").css('display', 'none');
    loadAllRentalRequests();
});

$('#btnManageVehicle').on('click', function () {
    $('#adminDashboard').css("display", "none");
    $("#manageRentalRequests_section").css('display', 'none');
    $("#manageVehicle_section").css('display', 'block');
    $("#manageBookings_section").css('display', 'none');
    $("#manageCustomer_section").css('display', 'none');
    $("#manageDriver_section").css('display', 'none');
    $("#viewDriverSchedule_section").css('display', 'none');
    $("#viewCarSchedule_section").css('display', 'none');
    $("#adminProfile_section").css('display', 'none');
    $("#manageRentDetails_section").css('display', 'none');
    $("#managePayment_section").css('display', 'none');
    loadAllCars();
});

$('#btnManageBookings').on('click', function () {
    $('#adminDashboard').css("display", "none");
    $("#manageRentalRequests_section").css('display', 'none');
    $("#manageVehicle_section").css('display', 'none');
    $("#manageBookings_section").css('display', 'block');
    $("#manageCustomer_section").css('display', 'none');
    $("#manageDriver_section").css('display', 'none');
    $("#viewDriverSchedule_section").css('display', 'none');
    $("#viewCarSchedule_section").css('display', 'none');
    $("#adminProfile_section").css('display', 'none');
    $("#manageRentDetails_section").css('display', 'none');
    $("#managePayment_section").css('display', 'none');
    loadAllBookings();
});

$('#btnManageCustomer').on('click', function () {
    $('#adminDashboard').css("display", "none");
    $("#manageRentalRequests_section").css('display', 'none');
    $("#manageVehicle_section").css('display', 'none');
    $("#manageBookings_section").css('display', 'none');
    $("#manageCustomer_section").css('display', 'block');
    $("#manageDriver_section").css('display', 'none');
    $("#viewDriverSchedule_section").css('display', 'none');
    $("#viewCarSchedule_section").css('display', 'none');
    $("#adminProfile_section").css('display', 'none');
    $("#manageRentDetails_section").css('display', 'none');
    $("#managePayment_section").css('display', 'none');
    loadAllCustomers();
});

$('#btnManageDriver').on('click', function () {
    $('#adminDashboard').css("display", "none");
    $("#manageRentalRequests_section").css('display', 'none');
    $("#manageVehicle_section").css('display', 'none');
    $("#manageBookings_section").css('display', 'none');
    $("#manageCustomer_section").css('display', 'none');
    $("#manageDriver_section").css('display', 'block');
    $("#viewDriverSchedule_section").css('display', 'none');
    $("#viewCarSchedule_section").css('display', 'none');
    $("#adminProfile_section").css('display', 'none');
    $("#manageRentDetails_section").css('display', 'none');
    $("#managePayment_section").css('display', 'none');
    loadAllDrivers();
});

$('#btnViewDriverSchedule').on('click', function () {
    $('#adminDashboard').css("display", "none");
    $("#manageRentalRequests_section").css('display', 'none');
    $("#manageVehicle_section").css('display', 'none');
    $("#manageBookings_section").css('display', 'none');
    $("#manageCustomer_section").css('display', 'none');
    $("#manageDriver_section").css('display', 'none');
    $("#viewDriverSchedule_section").css('display', 'block');
    $("#viewCarSchedule_section").css('display', 'none');
    $("#adminProfile_section").css('display', 'none');
    $("#manageRentDetails_section").css('display', 'none');
    $("#managePayment_section").css('display', 'none');
});

$('#btnViewCarSchedule').on('click', function () {
    $('#adminDashboard').css("display", "none");
    $("#manageRentalRequests_section").css('display', 'none');
    $("#manageVehicle_section").css('display', 'none');
    $("#manageBookings_section").css('display', 'none');
    $("#manageCustomer_section").css('display', 'none');
    $("#manageDriver_section").css('display', 'none');
    $("#viewDriverSchedule_section").css('display', 'none');
    $("#viewCarSchedule_section").css('display', 'block');
    $("#adminProfile_section").css('display', 'none');
    $("#manageRentDetails_section").css('display', 'none');
    $("#managePayment_section").css('display', 'none');
});

$('#btnManagePayments').on('click', function () {
    $('#adminDashboard').css("display", "none");
    $("#manageRentalRequests_section").css('display', 'none');
    $("#manageVehicle_section").css('display', 'none');
    $("#manageBookings_section").css('display', 'none');
    $("#manageCustomer_section").css('display', 'none');
    $("#manageDriver_section").css('display', 'none');
    $("#viewDriverSchedule_section").css('display', 'none');
    $("#viewCarSchedule_section").css('display', 'none');
    $("#adminProfile_section").css('display', 'none');
    $("#manageRentDetails_section").css('display', 'none');
    $("#managePayment_section").css('display', 'block');
});

$('#btnManageRentDetails').on('click', function () {
    $('#adminDashboard').css("display", "none");
    $("#manageRentalRequests_section").css('display', 'none');
    $("#manageVehicle_section").css('display', 'none');
    $("#manageBookings_section").css('display', 'none');
    $("#manageCustomer_section").css('display', 'none');
    $("#manageDriver_section").css('display', 'none');
    $("#viewDriverSchedule_section").css('display', 'none');
    $("#viewCarSchedule_section").css('display', 'none');
    $("#adminProfile_section").css('display', 'none');
    $("#manageRentDetails_section").css('display', 'block');
    $("#managePayment_section").css('display', 'none');
});

$('#btnAdminProfile').on('click', function () {
    $('#adminDashboard').css("display", "none");
    $("#manageRentalRequests_section").css('display', 'none');
    $("#manageVehicle_section").css('display', 'none');
    $("#manageBookings_section").css('display', 'none');
    $("#manageCustomer_section").css('display', 'none');
    $("#manageDriver_section").css('display', 'none');
    $("#viewDriverSchedule_section").css('display', 'none');
    $("#viewCarSchedule_section").css('display', 'none');
    $("#adminProfile_section").css('display', 'block');
    $("#manageRentDetails_section").css('display', 'none');
    $("#managePayment_section").css('display', 'none');
});

$('#option').on('click', function () {
    if ($('#header').css('left') == '-300px') {
        $('#header').css('left', 0);
    } else {
        $('#header').css('left', '-300px');
    }
});


$(".btnDeny").on('click', function () {
    const {value: email} = Swal.fire({
        title: 'Enter Your Denied Reason',
        input: 'textarea',
        inputLabel: 'Your Message',
        inputPlaceholder: 'Enter your message here',
        showCancelButton: true,
        confirmButtonText: "Send Message",
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire('Saved!', '', 'success')
        } else if (result.isCancelled) {
            Swal.fire('Changes are not saved', '', 'info')
        }
    })
});

function bindRowClickEventsOfTblManageVehicle() {
    $("#tblManageVehicle>tbody>tr").on('click', function () {
        let carId = $(this).children(":eq(0)").text();
        let regNo = $(this).children(":eq(1)").text();
        let brand = $(this).children(":eq(2)").text();
        let type = $(this).children(":eq(3)").text();
        let dailyRate = $(this).children(":eq(4)").text();
        let monthlyRate = $(this).children(":eq(5)").text();
        let dailyMileage = $(this).children(":eq(6)").text();
        let monthlyMileage = $(this).children(":eq(7)").text();
        let color = $(this).children(":eq(8)").text();
        let transmissionType = $(this).children(":eq(9)").text();
        let noOfPassengers = $(this).children(":eq(10)").text();
        let fuelType = $(this).children(":eq(11)").text();
        let pricePerExtraKm = $(this).children(":eq(12)").text();
        let LDW = $(this).children(":eq(13)").text();
        let lastServiceMileage = $(this).children(":eq(14)").text();
        let availabilityType = $(this).children(":eq(15)").text();

        $('#txtCarID').val(carId);
        $('#txtRegNo').val(regNo);
        $('#txtCarBrand').val(brand);
        $('#txtCarType').val(type);
        $('#txtDailyRate').val(dailyRate);
        $('#txtMonthlyRate').val(monthlyRate);
        $('#txtDailyMileage').val(dailyMileage);
        $('#txtMonthlyMileage').val(monthlyMileage);
        $('#txtCarColor').val(color);
        $('#txtTransmissionType').val(transmissionType);
        $('#txtNoOfPassengers').val(noOfPassengers);
        $('#txtFuelType').val(fuelType);
        $('#txtPricePerExtraKm').val(pricePerExtraKm);
        $('#txtLDWPayment').val(LDW);
        $('#txtLastServiceMileage').val(lastServiceMileage);
        $('#txtAvailabilityType').val(availabilityType);

        $.ajax({
            url: baseUrl + "car/getCarImages/" + carId,
            method: "get",
            dataType: "json",
            success: function (resp) {
                $("#carFront_image").attr('src', "../assets/img/uploads/carImages/" + resp.data.front);
                $("#carBack_image").attr('src', "../assets/img/uploads/carImages/" + resp.data.back);
                $("#carSide_image").attr('src', "../assets/img/uploads/carImages/" + resp.data.side);
                $("#carInterior_image").attr('src', "../assets/img/uploads/carImages/" + resp.data.interior);
            }
        });
    });
}

/* =============================================================================== */

/* ---------------------------------------- Manage Vehicle Section ----------------------------------------------- */

loadAllCars();

// Set Front Image
$("#frontCarImageUploader").on('change', function (e) {
    let file = e.target.files;
    if (FileReader && file && file.length) {
        let reader = new FileReader();
        reader.onload = function () {
            $("#carFront_image").attr('src', reader.result);
        }
        reader.readAsDataURL(file[0]);
    }
});

// Set Back Image
$("#backCarImageUploader").on('change', function (e) {
    let file = e.target.files;
    if (FileReader && file && file.length) {
        let reader = new FileReader();
        reader.onload = function () {
            $("#carBack_image").attr('src', reader.result);
        }
        reader.readAsDataURL(file[0]);
    }
});

// Set Side Image
$("#sideCarImageUploader").on('change', function (e) {
    let file = e.target.files;
    if (FileReader && file && file.length) {
        let reader = new FileReader();
        reader.onload = function () {
            $("#carSide_image").attr('src', reader.result);
        }
        reader.readAsDataURL(file[0]);
    }
});

// Set Interior Image
$("#interiorCarImageUploader").on('change', function (e) {
    let file = e.target.files;
    if (FileReader && file && file.length) {
        let reader = new FileReader();
        reader.onload = function () {
            $("#carInterior_image").attr('src', reader.result);
        }
        reader.readAsDataURL(file[0]);
    }
});

// Add Car
$("#btnAddCar").on('click', function () {
    let dailyRate = $("#txtDailyRate").val();
    let monthlyRate = $("#txtMonthlyRate").val();
    let dailyMileage = $("#txtDailyMileage").val();
    let monthlyMileage = $("#txtMonthlyMileage").val();

    let carObject = {
        carId: $("#txtCarID").val(),
        registerNum: $("#txtRegNo").val(),
        brand: $("#txtCarBrand").val(),
        type: $("#txtCarType").val(),
        priceRate: {dailyRate: dailyRate, monthlyRate: monthlyRate},
        freeMileage: {dailyMileage: dailyMileage, monthlyMileage: monthlyMileage},
        color: $("#txtCarColor").val(),
        transmissionType: $("#txtTransmissionType").val(),
        numOfPassengers: $("#txtNoOfPassengers").val(),
        fuelType: $("#txtFuelType").val(),
        pricePerExtraKM: $("#txtPricePerExtraKm").val(),
        lossDamageWaiver: $("#txtLDWPayment").val(),
        lastServiceMileage: $("#txtLastServiceMileage").val(),
        availabilityType: $("#txtAvailabilityType").val(),
    };

    if ($('#frontCarImageUploader')[0].files[0] != null && $('#backCarImageUploader')[0].files[0] != null && $('#sideCarImageUploader')[0].files[0] != null && $('#interiorCarImageUploader')[0].files[0] != null) {
        $.ajax({
            url: baseUrl + "car",
            method: "post",
            data: JSON.stringify(carObject),
            contentType: "application/json",
            success: function (res) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Car has been Successfully Saved',
                    showConfirmButton: false,
                    timer: 1500
                })

                uploadCarImages($("#txtCarID").val());
                loadAllCars();
            },
            error: function (error) {
                alert(JSON.parse(error.responseText).message);
            }
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'You Should Provide Car Images, Therefore, Can\'t be Save the Car'
        })
    }
});


// ----------------------------------------------------------
function uploadCarImages(carId) {
    var frontImage = $('#frontCarImageUploader')[0].files[0];
    var frontImageName = carId + "_front-image." + $('#frontCarImageUploader')[0].files[0].name.split(".")[1];

    var backImage = $('#backCarImageUploader')[0].files[0];
    var backImageName = carId + "_back-image." + $('#backCarImageUploader')[0].files[0].name.split(".")[1]

    var sideImage = $('#sideCarImageUploader')[0].files[0];
    var sideImageName = carId + "_side-image." + $('#sideCarImageUploader')[0].files[0].name.split(".")[1];

    var interiorImage = $('#interiorCarImageUploader')[0].files[0];
    var interiorImageName = carId + "_interior-image." + $('#interiorCarImageUploader')[0].files[0].name.split(".")[1];

    var imagesData = new FormData();
    imagesData.append("front", frontImage, frontImageName);
    imagesData.append("back", backImage, backImageName);
    imagesData.append("side", sideImage, sideImageName);
    imagesData.append("interior", interiorImage, interiorImageName);

    $.ajax({
        url: baseUrl + "car/uploadCarImages/" + carId,
        method: "PUT",
        contentType: false,
        processData: false,
        data: imagesData,
        success: function (res) {
            alert("Images Uploaded..!");
        }
    })
}

/* Get All Cars */
function loadAllCars() {
    $("#tblManageVehicle>tbody").empty();
    $.ajax({
        url: baseUrl + "car",
        method: "get",
        dataType: "json",
        success: function (resp) {
            for (let car of resp.data) {
                var row = "<tr><td>" + car.carId + "</td><td>" + car.registerNum + "</td><td>" + car.brand + "</td><td>" + car.type + "</td><td>" + car.priceRate.dailyRate + "</td><td>" + car.priceRate.monthlyRate + "</td><td>" + car.freeMileage.dailyMileage + "</td><td>" + car.freeMileage.monthlyMileage + "</td><td>" + car.color + "</td><td>" + car.transmissionType + "</td><td>" + car.numOfPassengers + "</td><td>" + car.fuelType + "</td><td>" + car.pricePerExtraKM + "</td><td>" + car.lossDamageWaiver + "</td><td>" + car.lastServiceMileage + "</td><td>" + car.availabilityType + "</td></tr>";
                $("#tblManageVehicle").append(row);
            }
            bindRowClickEventsOfTblManageVehicle();
            clearManageCarSectionTextFields();
            $("#txtCarID").focus();
        }
    });
}

function clearManageCarSectionTextFields() {
    $("#txtCarID").val("");
    $("#txtRegNo").val("");
    $("#txtCarBrand").val("");
    $("#txtCarType").val("Select Vehicle Type");
    $("#txtDailyRate").val("");
    $("#txtMonthlyRate").val("");
    $("#txtDailyMileage").val("");
    $("#txtMonthlyMileage").val("");
    $("#txtCarColor").val("");
    $("#txtTransmissionType").val("Select Transmission Type");
    $("#txtNoOfPassengers").val("");
    $("#txtFuelType").val("Select Fuel Type");
    $("#txtPricePerExtraKm").val("");
    $("#txtLDWPayment").val("");
    $("#txtLastServiceMileage").val("");
    $("#txtAvailabilityType").val("Select Availability Type");

    // Clear file choosers
    $("#frontCarImageUploader").val("");
    $("#backCarImageUploader").val("");
    $("#sideCarImageUploader").val("");
    $("#interiorCarImageUploader").val("");

    // Clear images
    $("#carFront_image").attr('src', "");
    $("#carBack_image").attr('src', "");
    $("#carSide_image").attr('src', "");
    $("#carInterior_image").attr('src', "");
}

$("#btnClearCarData").on('click', function () {
    clearManageCarSectionTextFields();
});

// Update Car
$("#btnUpdateCar").on('click', function () {
    let dailyRate = $("#txtDailyRate").val();
    let monthlyRate = $("#txtMonthlyRate").val();
    let dailyMileage = $("#txtDailyMileage").val();
    let monthlyMileage = $("#txtMonthlyMileage").val();

    let carObject = {
        carId: $("#txtCarID").val(),
        registerNum: $("#txtRegNo").val(),
        brand: $("#txtCarBrand").val(),
        type: $("#txtCarType").val(),
        priceRate: {dailyRate: dailyRate, monthlyRate: monthlyRate},
        freeMileage: {dailyMileage: dailyMileage, monthlyMileage: monthlyMileage},
        color: $("#txtCarColor").val(),
        transmissionType: $("#txtTransmissionType").val(),
        numOfPassengers: $("#txtNoOfPassengers").val(),
        fuelType: $("#txtFuelType").val(),
        pricePerExtraKM: $("#txtPricePerExtraKm").val(),
        lossDamageWaiver: $("#txtLDWPayment").val(),
        lastServiceMileage: $("#txtLastServiceMileage").val(),
        availabilityType: $("#txtAvailabilityType").val(),
    };

    Swal.fire({
        title: 'Are you sure?',
        text: "Do You Want to Update Car with Images.?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Update it!'
    }).then((result) => {
        if (!result.isConfirmed) {
            $.ajax({
                url: baseUrl + "car",
                method: "put",
                data: JSON.stringify(carObject),
                contentType: "application/json",
                success: function (res) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Car has been Successfully Updated',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    loadAllCars();
                },

                error: function (error) {
                    alert(JSON.parse(error.responseText).message);
                }
            });

        } else {
            if ($('#frontCarImageUploader')[0].files[0] != null && $('#backCarImageUploader')[0].files[0] != null && $('#sideCarImageUploader')[0].files[0] != null && $('#interiorCarImageUploader')[0].files[0] != null) {
                $.ajax({
                    url: baseUrl + "car",
                    method: "put",
                    data: JSON.stringify(carObject),
                    contentType: "application/json",
                    success: function (res) {
                        uploadCarImages($("#txtCarID").val());
                        loadAllCars();
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Car has been Successfully Updated',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    },

                    error: function (error) {
                        alert(JSON.parse(error.responseText).message);
                    }
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Car hasn\'t been Updated, Something Went Wrong..!',
                })
            }
        }
    })
});

// Delete Car
$("#btnDeleteCar").on('click', function () {
    let carId = $("#txtCarID").val();
    $.ajax({
        url: baseUrl + "car?carId=" + carId,
        method: "delete",
        dataType: "json",
        success: function (resp) {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: resp.message,
                showConfirmButton: false,
                timer: 1500
            })
            loadAllCars();
            // deleteCarImages(carId);
        },
        error: function (error) {
            alert(JSON.parse(error.responseText).message);
        }
    });
});

function deleteCarImages(carId) {
    $.ajax({
        url: baseUrl + "car/deleteCarImages/" + carId,
        method: "delete",
        dataType: "json",
        success: function (res) {
            alert(res.message);
        },
        error: function (error) {
            alert(JSON.parse(error.responseText).message);
        }
    })
}

/*------------------- Manage Rental Requests -------------------*/
function loadAllRentalRequests() {
    $("#tblManageRentalRequests>tbody").empty();

    $.ajax({
        url: baseUrl + "rent/ManageRentalRequests/Pending",
        method: "get",
        success: function (resp) {
            if (resp.data != null) {
                for (let rent of resp.data) {
                    console.log(rent)
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
                        var tag = '<span class="badge rounded-5 text-bg-primary statusBadge" style="font-size: 13px;">Pending</span>';

                        var btnGroupDiv = '<div class="btn-group btnGroups" role="group" aria-label="Basic mixed styles example">' +
                            '<button type="button" class="btn btn-success btnAccept">Accept</button>' +
                            '<button type="button" class="btn btn-danger btnDeny">Deny</button>' +
                            '</div>';

                        $("#tblManageRentalRequests>tbody").append(`<tr><td>${rent.rentId}</td><td>${rent.rentDetail[i].carId}</td><td>${startDate}</td><td>${startTime}</td><td>${endDate}</td><td>${returnTime}</td><td>${rent.location}</td><td>${"Paid"}</td><td>${rent.customer.customerId}</td><td>${rent.customer.name}</td><td>${rent.rentDetail[i].driver.driverId}</td><td>${tag}</td><td>${btnGroupDiv}</td></tr>`);
                    }
                }
                bindRowClickEventsForManageRentalRequestsSection();
            }
        }
    });
}

function bindRowClickEventsForManageRentalRequestsSection() {
    $(".btnAccept").on('click', function () {
        console.log($(this).parent().parent().parent().children(":eq(0)").text()); //rent ID
        let rentID = $(this).parent().parent().parent().children(":eq(0)").text();

        Swal.fire({
            title: 'Are you sure?',
            text: "Do You want to Accept This Rental Request..?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#198754',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Accept it!',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: baseUrl + "rent?rentId=" + rentID + "&" + "rentStatus=Accepted&deniedReason=" + '',
                    method: "put",
                    dataType: "json",
                    success: function (res) {
                        const Toast = Swal.mixin({
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                                toast.addEventListener('mouseenter', Swal.stopTimer)
                                toast.addEventListener('mouseleave', Swal.resumeTimer)
                            }
                        })

                        Toast.fire({
                            icon: 'success',
                            title: 'Successfully Accepted'
                        })
                        loadAllRentalRequests();
                    },

                    error: function (error) {
                        loadAllRentalRequests();
                        console.log(JSON.parse(error.responseText).message);
                    }
                });
            }
        })
    });

    $(".btnDeny").on('click', function () {
        console.log($(this).parent().parent().parent().children(":eq(0)").text()); //rent ID
        let rentID = $(this).parent().parent().parent().children(":eq(0)").text();

        Swal.fire({
            title: 'Are you sure?',
            text: "Do You want to Deny this Rental Request..?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, Deny it!',
            cancelButtonText: 'No'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const {value: deniedReason} = await Swal.fire({
                    title: 'Enter Your Denied Reason',
                    input: 'textarea',
                    inputLabel: 'Your Message',
                    inputPlaceholder: 'Enter your message here',
                    showCancelButton: true,
                    confirmButtonText: "Send Message",
                    allowOutsideClick: false
                })
                if (deniedReason) {
                    $.ajax({
                        url: baseUrl + "rent?rentId=" + rentID + "&" + "rentStatus=Denied&deniedReason=" + deniedReason,
                        method: "put",
                        dataType: "json",
                        success: function (res) {
                            Swal.fire('Successfully Denied!', '', 'success');
                            loadAllRentalRequests();
                        },

                        error: function (error) {
                            loadAllRentalRequests();
                            console.log(JSON.parse(error.responseText).message);
                        }
                    });
                } else {
                    swal.fire(
                        'Dismissed',
                        'Rental Request Denial has been Cancelled..!',
                        'warning'
                    )
                }

            } else if (result.dismiss === Swal.DismissReason.cancel) {
                swal.fire(
                    'Dismissed',
                    'Rental Request Denial has been Cancelled..!',
                    'warning'
                )
            }
        });
    });
}

/* const { value: file } = await Swal.fire({
  title: 'Select image',
  input: 'file',
  inputAttributes: {
    'accept': 'image/*',
    'aria-label': 'Upload your profile picture'
  }
})

if (file) {
  const reader = new FileReader()
  reader.onload = (e) => {
    Swal.fire({
      title: 'Your uploaded picture',
      imageUrl: e.target.result,
      imageAlt: 'The uploaded picture'
    })
  }
  reader.readAsDataURL(file)
}
*/

function loadAllBookings() {
    $("#tblManageBookings>tbody").empty();
    loadAllDriverIds();
    loadAllCarIds();

    $.ajax({
        url: baseUrl + "rent",
        method: "get",
        success: function (resp) {
            if (resp.data != null) {
                for (let rent of resp.data) {

                    console.log(rent);

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
                        $("#tblManageBookings>tbody").append(`<tr><td>${rent.rentId}</td><td>${rent.rentDetail[i].carId}</td><td>${rent.requestTypeOfDriver}</td><td>${rent.rentDetail[i].driver.driverId}</td><td>${rent.rentDetail[i].driver.name}</td><td>${startTime}</td><td>${startDate}</td><td>${returnTime}</td><td>${endDate}</td><td>${rent.rentStatus}</td><td>${rent.location}</td></tr>`);
                    }
                }
                bindRowClickEventsManageBookingsTable();
            }
        }
    });
}

// Search From Rent ID ------------>
/*if ($('#txtSearchDriverSchedule').val() != '') {
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
}*/

//Load All Car IDs
function loadAllCarIds() {
    $("#txtRentCarID").empty();
    $("#txtRentCarID").append(`<option selected disabled>Select Car</option>`);

    $.ajax({
        url: baseUrl + "car",
        method: "get",
        success: function (resp) {
            for (let c1 of resp.data) {
                $("#txtRentCarID").append(`<option>${c1.carId}</option>`);
            }
        }
    });
}

//Load All Driver IDs
function loadAllDriverIds() {
    $("#txtRentDriverId").empty();
    $("#txtRentDriverId").append(`<option selected disabled>Select Driver</option>`);

    $.ajax({
        url: baseUrl + "driver",
        method: "get",
        success: function (resp) {
            for (let c1 of resp.data) {
                $("#txtRentDriverId").append(`<option>${c1.driverId}</option>`);
            }
        }
    });
}

$("#txtRentDriverId").change(function () {
    let driverId = $(this).val();

    $.ajax({
        url: baseUrl + "driver/getDriverName?driverId=" + driverId,
        method: "get",
        success: function (resp) {
            if (resp.data != null) {
                $('#txtRentDriverName').val(resp.data);
            }
        }
    });
});

$('#btnClear_ManageBookingsSection').on('click', function () {
    loadAllBookings();
    $('#txtRentID').val('');
    $('#txtRentCarID').val('Select Car');
    $('#txtRentDriverReqType').val('');
    $('#txtRentDriverId').val('Select Driver');
    $('#txtRentDriverName').val('');
    $('#txtRentPickUpTime').val('');
    $('#txtRentPickUpDate').val('');
    $('#txtRentReturnTime').val('');
    $('#txtRentReturnDate').val('');
    $('#txtRentStatus').val('');
    $('#txtRentLocation').val('');
});

$('#txtRentID').on('keyup', function (e) {
    if (e.key == "Enter") {
        if ($('#txtRentID').val() != '') {
            $.ajax({
                url: baseUrl + "rent/" + $('#txtRentID').val(),
                method: "get",
                success: function (resp) {
                    if (resp.data != null) {
                        $("#tblManageBookings>tbody").empty();
                        let rent = resp.data;
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
                            $("#tblManageBookings>tbody").append(`<tr><td>${rent.rentId}</td><td>${rent.rentDetail[i].carId}</td><td>${rent.requestTypeOfDriver}</td><td>${rent.rentDetail[i].driver.driverId}</td><td>${rent.rentDetail[i].driver.name}</td><td>${startTime}</td><td>${startDate}</td><td>${returnTime}</td><td>${endDate}</td><td>${rent.rentStatus}</td><td>${rent.location}</td></tr>`);
                        }

                        bindRowClickEventsManageBookingsTable();
                        alert("Successfully Loaded Rent Data of " + $('#txtRentID').val());
                    }
                },

                error: function (error) {
                    alert(JSON.parse(error.responseText).message);
                }
            });
        }
    }
});

function bindRowClickEventsManageBookingsTable() {
    $("#tblManageBookings>tbody>tr").on('click', function () {
        let rentID = $(this).children(":eq(0)").text();
        let carID = $(this).children(":eq(1)").text();
        let driverReqType = $(this).children(":eq(2)").text();
        let driverID = $(this).children(":eq(3)").text();
        let driverName = $(this).children(":eq(4)").text();
        let pickUpTime = $(this).children(":eq(5)").text();
        let pickUpDate = $(this).children(":eq(6)").text();
        let returnTime = $(this).children(":eq(7)").text();
        let returnDate = $(this).children(":eq(8)").text();
        let rentStatus = $(this).children(":eq(9)").text();
        let location = $(this).children(":eq(10)").text();

        setTextFieldValues(rentID, carID, driverReqType, driverID, driverName, pickUpTime, pickUpDate, returnTime, returnDate, rentStatus, location);
    });
}

//Set text fields values function
function setTextFieldValues(rentID, carID, driverReqType, driverID, driverName, pickUpTime, pickUpDate, returnTime, returnDate, rentStatus, location) {
    $('#txtRentID').val(rentID);
    $('#txtRentCarID').val(`${carID}`);
    $('#txtRentDriverReqType').val(`${driverReqType}`);
    $('#txtRentDriverId').val(`${driverID}`);
    $('#txtRentDriverName').val(driverName);
    $('#txtRentPickUpTime').val("0" + pickUpTime.split(" ")[0]);

    if (pickUpDate.split("-")[1] >= 10) {
        $('#txtRentPickUpDate').val(pickUpDate);
    }
    if (parseInt(pickUpDate.split("-")[1]) < 10) {
        var month = "0" + pickUpDate.split("-")[1];
        var year = pickUpDate.split("-")[0];
        var day = pickUpDate.split("-")[2];
        $('#txtRentPickUpDate').val(year + "-" + month + "-" + day);
    }

    $('#txtRentReturnTime').val("0" + returnTime.split(" ")[0]);
    $('#txtRentReturnDate').val(returnDate);
    if (returnDate.split("-")[1] >= 10) {
        $('#txtRentReturnDate').val(returnDate);
    }
    if (parseInt(returnDate.split("-")[1]) < 10) {
        var month = "0" + returnDate.split("-")[1];
        var year = returnDate.split("-")[0];
        var day = returnDate.split("-")[2];
        $('#txtRentReturnDate').val(year + "-" + month + "-" + day);
    }

    $('#txtRentStatus').val(rentStatus);
    $('#txtRentLocation').val(location);
}

$('#btnUpdateBookings').on('click', function () {
    if ($('#txtRentID').val() != '' && $('#txtRentCarID').val() != null && $('#txtRentDriverReqType').val() != null && $('#txtRentDriverId').val() != null && $('#txtRentDriverName').val() != '' && $('#txtRentPickUpTime').val() != '' && $('#txtRentPickUpDate').val() != '' && $('#txtRentReturnTime').val() != '' && $('#txtRentReturnDate').val() != '' && $('#txtRentStatus').val() != '' && $('#txtRentLocation').val() != '') {
        let driverObject = {
            driverId: $('#txtRentDriverId').val(),
            name: $('#txtRentDriverName').val(),
            availabilityType: "Unavailable"
        }

        let rentDetail = [];
        rentDetail.push({rentId: $('#txtRentID').val(), carId: $("#txtRentCarID").val(), driver: driverObject});

        let rentObject = {
            rentId: $('#txtRentID').val(),
            pickUpTime: $('#txtRentPickUpTime').val(),
            pickUpDate: $('#txtRentPickUpDate').val(),
            returnTime: $('#txtRentReturnTime').val(),
            returnDate: $('#txtRentReturnDate').val(),
            requestTypeOfDriver: $('#txtRentDriverReqType').val(),
            location: $('#txtRentLocation').val(),
            rentStatus: $('#txtRentStatus').val(),
            rentDetail: rentDetail
        };

        $.ajax({
            url: baseUrl + "rent/manageBookings",
            method: "put",
            data: JSON.stringify(rentObject),
            contentType: "application/json",
            dataType: "json",
            success: function (resp) {
                console.log(resp.data);
            }
        });

    } else {
        swal.fire(
            'Booking Update Failed',
            'All Fields Must be filled With Data..',
            'warning'
        )
    }
});

/*------------------------ Manage Customer ------------------------*/

// Load All Customers
function loadAllCustomers() {
    $("#tblManageCustomer>tbody").empty();
    $.ajax({
        url: baseUrl + "customer",
        method: "get",
        dataType: "json",
        success: function (resp) {
            if (resp.data != null) {
                for (let c1 of resp.data) {
                    console.log(c1)

                    $.ajax({
                        url: baseUrl + "user_credentials/getCustomerUserCredentials/Customer/" + c1.customerId,
                        method: "get",
                        async: false,
                        success: function (resp) {
                            var row = "<tr><td>" + c1.customerId + "</td><td>" + resp.data.username + "</td><td>" + resp.data.password + "</td><td>" + c1.name + "</td><td>" + c1.address + "</td><td>" + c1.contactNumber + "</td><td>" + c1.email + "</td><td>" + c1.nic + "</td><td>" + c1.licenseNo + "</td></tr>";
                            $("#tblManageCustomer>tbody").append(row);
                        }
                    });
                }
            }
            bindRowClickEventsManageCustomerTable();
            clearManageCustomerSectionTextFields();
        }
    });
}

function bindRowClickEventsManageCustomerTable() {
    $("#tblManageCustomer>tbody>tr").on('click', function () {
        let customerID = $(this).children(":eq(0)").text();
        let username = $(this).children(":eq(1)").text();
        let password = $(this).children(":eq(2)").text();
        let cusName = $(this).children(":eq(3)").text();
        let cusAddress = $(this).children(":eq(4)").text();
        let cusContactNumber = $(this).children(":eq(5)").text();
        let cusEmail = $(this).children(":eq(6)").text();
        let cusNic = $(this).children(":eq(7)").text();
        let cusLicenseNo = $(this).children(":eq(8)").text();

        $('#txtCustomerID').val(customerID);
        $('#txtCusUsername').val(username);
        $('#txtCusPassword').val(password);
        $('#txtCustomerName').val(cusName);
        $('#txtCustomerAddress').val(cusAddress);
        $('#txtCustomerContact').val(cusContactNumber);
        $('#txtCustomerEmail').val(cusEmail);
        $('#txtCustomerNic').val(cusNic);
        $('#txtCustomerLicenseNo').val(cusLicenseNo);

        $.ajax({
            url: baseUrl + "customer/getCustomerImages/" + customerID,
            method: "get",
            dataType: "json",
            success: function (resp) {
                $("#customerNicImage").attr('src', "../assets/img/uploads/customerImages/" + resp.data.nicImage);
                $("#customerLicenseImage").attr('src', "../assets/img/uploads/customerImages/" + resp.data.licenseImage);
            }
        });
    });
}

function clearManageCustomerSectionTextFields() {
    $('#txtCustomerID').val("");
    $('#txtCusUsername').val("");
    $('#txtCusPassword').val("");
    $('#txtCustomerName').val("");
    $('#txtCustomerAddress').val("");
    $('#txtCustomerContact').val("");
    $('#txtCustomerEmail').val("");
    $('#txtCustomerNic').val("");
    $('#txtCustomerLicenseNo').val("");

    $('#txtSearchCustomer').val("");

    // Clear images
    $("#customerNicImage").attr('src', "");
    $("#customerLicenseImage").attr('src', "");
}

$("#btnViewAllCustomers").on('click', function () {
    loadAllCustomers();
});

$("#btnClearCustomerFields").on('click', function () {
    clearManageCustomerSectionTextFields();
});

$('#btnSearchCustomer').on('click', function () {
    if ($('#txtSearchCustomer').val() != '') {
        if ($('#cmbSelectCustomer').val() == "Customer ID") {
            $.ajax({
                url: baseUrl + "customer/" + $('#txtSearchCustomer').val(),
                method: "get",
                success: function (resp) {
                    if (resp.data != null) {
                        let c1 = resp.data;
                        $("#tblManageCustomer>tbody").empty();

                        $.ajax({
                            url: baseUrl + "user_credentials/getCustomerUserCredentials/Customer/" + c1.customerId,
                            method: "get",
                            async: false,
                            success: function (resp) {
                                var row = "<tr><td>" + c1.customerId + "</td><td>" + resp.data.username + "</td><td>" + resp.data.password + "</td><td>" + c1.name + "</td><td>" + c1.address + "</td><td>" + c1.contactNumber + "</td><td>" + c1.email + "</td><td>" + c1.nic + "</td><td>" + c1.licenseNo + "</td></tr>";
                                $("#tblManageCustomer>tbody").append(row);

                                $('#txtCustomerID').val(c1.customerId);
                                $('#txtCusUsername').val(resp.data.username);
                                $('#txtCusPassword').val(resp.data.password);
                                $('#txtCustomerName').val(c1.name);
                                $('#txtCustomerAddress').val(c1.address);
                                $('#txtCustomerContact').val(c1.contactNumber);
                                $('#txtCustomerEmail').val(c1.email);
                                $('#txtCustomerNic').val(c1.nic);
                                $('#txtCustomerLicenseNo').val(c1.licenseNo);

                                $.ajax({
                                    url: baseUrl + "customer/getCustomerImages/" + c1.customerId,
                                    method: "get",
                                    async: false,
                                    dataType: "json",
                                    success: function (resp) {
                                        $("#customerNicImage").attr('src', "../assets/img/uploads/customerImages/" + resp.data.nicImage);
                                        $("#customerLicenseImage").attr('src', "../assets/img/uploads/customerImages/" + resp.data.licenseImage);
                                    }
                                });
                            }
                        });
                    }
                    bindRowClickEventsManageCustomerTable();
                },
                error: function (error) {
                    alert(JSON.parse(error.responseText).message);
                    clearManageCustomerSectionTextFields();
                    loadAllCustomers();
                }
            });

        } else {
            $.ajax({
                url: baseUrl + "customer/getCustomerByNIC?customerNIC=" + $('#txtSearchCustomer').val(),
                method: "get",
                success: function (resp) {
                    if (resp.data != null) {
                        let c1 = resp.data;
                        $("#tblManageCustomer>tbody").empty();

                        $.ajax({
                            url: baseUrl + "user_credentials/getCustomerUserCredentials/Customer/" + c1.customerId,
                            method: "get",
                            async: false,
                            success: function (resp) {
                                var row = "<tr><td>" + c1.customerId + "</td><td>" + resp.data.username + "</td><td>" + resp.data.password + "</td><td>" + c1.name + "</td><td>" + c1.address + "</td><td>" + c1.contactNumber + "</td><td>" + c1.email + "</td><td>" + c1.nic + "</td><td>" + c1.licenseNo + "</td></tr>";
                                $("#tblManageCustomer>tbody").append(row);

                                $('#txtCustomerID').val(c1.customerId);
                                $('#txtCusUsername').val(resp.data.username);
                                $('#txtCusPassword').val(resp.data.password);
                                $('#txtCustomerName').val(c1.name);
                                $('#txtCustomerAddress').val(c1.address);
                                $('#txtCustomerContact').val(c1.contactNumber);
                                $('#txtCustomerEmail').val(c1.email);
                                $('#txtCustomerNic').val(c1.nic);
                                $('#txtCustomerLicenseNo').val(c1.licenseNo);

                                $.ajax({
                                    url: baseUrl + "customer/getCustomerImages/" + c1.customerId,
                                    method: "get",
                                    dataType: "json",
                                    async: false,
                                    success: function (resp) {
                                        $("#customerNicImage").attr('src', "../assets/img/uploads/customerImages/" + resp.data.nicImage);
                                        $("#customerLicenseImage").attr('src', "../assets/img/uploads/customerImages/" + resp.data.licenseImage);
                                    }
                                });
                            }
                        });
                    }
                    bindRowClickEventsManageCustomerTable();
                },

                error: function (error) {
                    alert(JSON.parse(error.responseText).message);
                    clearManageCustomerSectionTextFields();
                    loadAllCustomers();
                }
            });
        }

    } else {
        Swal.fire({
            icon: 'error',
            title: 'Empty Fields ?',
            text: 'Customer ID or Customer NIC Search Field is Empty..!'
        })
    }
});

/*------------------------ Manage Driver ------------------------*/

// Load All Customers
function loadAllDrivers() {
    $("#tblManageDriver>tbody").empty();
    generateNewDriverID();
    $.ajax({
        url: baseUrl + "driver",
        method: "get",
        dataType: "json",
        success: function (resp) {
            if (resp.data != null) {
                for (let d1 of resp.data) {
                    console.log(d1)
                    var row = "<tr><td>" + d1.driverId + "</td><td>" + d1.name + "</td><td>" + d1.user_credentials.username + "</td><td>" + d1.user_credentials.password + "</td><td>" + d1.address + "</td><td>" + d1.contactNumber + "</td><td>" + d1.nic + "</td><td>" + d1.licenseNo + "</td><td>" + d1.availabilityType + "</td></tr>";
                    $("#tblManageDriver>tbody").append(row);
                }
            }
            bindRowClickEventsManageDriverTable();
            clearManageDriverSectionTextFields();
        }
    });
}

function clearManageDriverSectionTextFields() {
    generateNewDriverID();
    $('#txtDriverAvailabilityType').val('Select Availability Type');
    $('#txtDriverLicenseImageUploader').val('');
    $('#txtDriverUsername').val('');
    $('#txtDriverPassword').val('');
    $('#txtDriverName').val('');
    $('#txtDriverAddress').val('');
    $('#txtDriverContact').val('');
    $('#txtDriverNic').val('');
    $('#txtDriverLicenseNo').val('');

    $('#txtSearchDriver').val("");

    $("#driverLicenseImage").attr('src', "");
}

function bindRowClickEventsManageDriverTable() {
    $("#tblManageDriver>tbody>tr").on('click', function () {
        $('#txtDriverUsername').attr('disabled', true);
        let driverID = $(this).children(":eq(0)").text();
        let driverName = $(this).children(":eq(1)").text();
        let username = $(this).children(":eq(2)").text();
        let password = $(this).children(":eq(3)").text();
        let driverAddress = $(this).children(":eq(4)").text();
        let driverContactNumber = $(this).children(":eq(5)").text();
        let driverNIC = $(this).children(":eq(6)").text();
        let driverLicenseNo = $(this).children(":eq(7)").text();
        let driverAvailabilityType = $(this).children(":eq(8)").text();

        $('#txtDriverId').val(driverID);
        $('#txtDriverUsername').val(username);
        $('#txtDriverPassword').val(password);
        $('#txtDriverName').val(driverName);
        $('#txtDriverAddress').val(driverAddress);
        $('#txtDriverContact').val(driverContactNumber);
        $('#txtDriverNic').val(driverNIC);
        $('#txtDriverLicenseNo').val(driverLicenseNo);
        $('#txtDriverAvailabilityType').val(`${driverAvailabilityType}`);

        $.ajax({
            url: baseUrl + "driver/getDriverImages/" + driverID,
            method: "get",
            dataType: "json",
            success: function (resp) {
                $("#driverLicenseImage").attr('src', "../assets/img/uploads/driverImages/" + resp.data.licenseImage);
            },
            error: function (error) {
                $("#driverLicenseImage").attr('src', "");
                alert(JSON.parse(error.responseText).message);
            }
        });
    });
}

/*=================================================*/

$("#btnAddDriver").on('click', function () {
    if ($('#txtDriverAvailabilityType').val() != null && $('#txtDriverId').val() != '' && $('#txtDriverUsername').val() != '' && $('#txtDriverPassword').val() != '' && $('#txtDriverName').val() != '' && $('#txtDriverAddress').val() != '' && $('#txtDriverContact').val() != '' && $('#txtDriverNic').val() != '' && $('#txtDriverLicenseNo').val() != '') {
        let userObject = {
            username: $("#txtDriverUsername").val(),
            password: $("#txtDriverPassword").val(),
            role: "Driver"
        };

        let driverObject = {
            driverId: $("#txtDriverId").val(),
            name: $("#txtDriverName").val(),
            address: $("#txtDriverAddress").val(),
            contactNumber: $("#txtDriverContact").val(),
            nic: $("#txtDriverNic").val(),
            licenseNo: $("#txtDriverLicenseNo").val(),
            availabilityType: $("#txtDriverAvailabilityType").val(),
            user_credentials: userObject
        };

        if ($('#txtDriverLicenseImageUploader')[0].files[0] != null) {
            $.ajax({
                url: baseUrl + "driver",
                method: "post",
                data: JSON.stringify(driverObject),
                contentType: "application/json",
                success: function (res) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Driver has been Successfully Saved',
                        showConfirmButton: false,
                        timer: 1500
                    })

                    uploadDriverImages($("#txtDriverId").val());
                    loadAllCars();
                },
                error: function (error) {
                    alert(JSON.parse(error.responseText).message);
                }
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'You Should Provide Driver License Image, Therefore, Can\'t Save the Driver'
            })
        }
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'All Driver Fields Must be filled With data'
        })
    }
    generateNewDriverID();
});

function generateNewDriverID() {
    $.ajax({
        url: baseUrl + "driver/generateNewDriverID",
        method: "get",
        dataType: "json",
        async: false,
        success: function (res) {
            $("#txtDriverId").val(res.data);
        },

        error: function (error) {
            alert(JSON.parse(error.responseText).message);
        }
    });
}


// ----------------------------------------------------------
function uploadDriverImages(driverId) {
    var driverLicenseImage = $('#txtDriverLicenseImageUploader')[0].files[0];
    var driverLicenseImageName = driverId + "_License-image." + $('#txtDriverLicenseImageUploader')[0].files[0].name.split(".")[1];

    var imagesData = new FormData();
    imagesData.append("licenseImage", driverLicenseImage, driverLicenseImageName);

    $.ajax({
        url: baseUrl + "driver/uploadDriverImages/uploadLicenseImage?driverId=" + driverId,
        method: "PUT",
        contentType: false,
        processData: false,
        data: imagesData,
        success: function (res) {
            alert("Driver License Image Uploaded..!");
        }
    })
}

$('#btnClearDriverFields').on('click', function () {
    clearManageDriverSectionTextFields();
    $('#txtDriverUsername').attr('disabled', false);
});

$("#txtDriverLicenseImageUploader").on('change', function (e) {
    let file = e.target.files;
    if (FileReader && file && file.length) {
        let reader = new FileReader();
        reader.onload = function () {
            $("#driverLicenseImage").attr('src', reader.result);
        }
        reader.readAsDataURL(file[0]);
    }
});

// Update Driver
$("#btnUpdateDriver").on('click', function () {
    if ($('#txtDriverAvailabilityType').val() != null && $('#txtDriverId').val() != '' && $('#txtDriverUsername').val() != '' && $('#txtDriverPassword').val() != '' && $('#txtDriverName').val() != '' && $('#txtDriverAddress').val() != '' && $('#txtDriverContact').val() != '' && $('#txtDriverNic').val() != '' && $('#txtDriverLicenseNo').val() != '') {
        let userObject = {
            username: $("#txtDriverUsername").val(),
            password: $("#txtDriverPassword").val(),
            role: "Driver"
        };

        let driverObject = {
            driverId: $("#txtDriverId").val(),
            name: $("#txtDriverName").val(),
            address: $("#txtDriverAddress").val(),
            contactNumber: $("#txtDriverContact").val(),
            nic: $("#txtDriverNic").val(),
            licenseNo: $("#txtDriverLicenseNo").val(),
            availabilityType: $("#txtDriverAvailabilityType").val(),
            user_credentials: userObject
        };

        Swal.fire({
            title: 'Are you sure?',
            text: "Do You Want to Update this Driver with License Image.?",
            icon: 'question',
            showCancelButton: true,
            cancelButtonText: 'No',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Update it!'
        }).then((result) => {
            if (!result.isConfirmed) {
                $.ajax({
                    url: baseUrl + "driver",
                    method: "put",
                    data: JSON.stringify(driverObject),
                    contentType: "application/json",
                    success: function (res) {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Driver has been Successfully Updated',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        loadAllDrivers();
                    },

                    error: function (error) {
                        alert(JSON.parse(error.responseText).message);
                    }
                });

            } else {
                if ($('#txtDriverLicenseImageUploader')[0].files[0] != null) {
                    $.ajax({
                        url: baseUrl + "driver",
                        method: "put",
                        data: JSON.stringify(driverObject),
                        contentType: "application/json",
                        success: function (res) {
                            uploadDriverImages($("#txtDriverId").val());
                            loadAllDrivers();
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Drivers has been Successfully Updated With License Image',
                                showConfirmButton: false,
                                timer: 1500
                            })
                        },

                        error: function (error) {
                            alert(JSON.parse(error.responseText).message);
                        }
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Driver hasn\'t been Updated, Something Went Wrong..!',
                    })
                }
            }
        })
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'All Driver Fields Must be filled With data'
        })
    }
    generateNewDriverID();
});

// Delete Driver
$("#btnDeleteDriver").on('click', function () {
    let driverID = $("#txtDriverId").val();
    deleteDriverLicenseImage(driverID);

    $.ajax({
        url: baseUrl + "driver?driverID=" + driverID,
        method: "delete",
        dataType: "json",
        success: function (resp) {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: resp.message,
                showConfirmButton: false,
                timer: 1500
            })
            loadAllDrivers();
        },
        error: function (error) {
            alert(JSON.parse(error.responseText).message);
        }
    });
});

function deleteDriverLicenseImage(driverID) {
    $.ajax({
        url: baseUrl + "driver/deleteDriverLicenseImage/" + driverID,
        method: "delete",
        dataType: "json",
        success: function (res) {
            alert(res.message);
        },
        error: function (error) {
            alert(JSON.parse(error.responseText).message);
        }
    })
}

/*--------------------- View Driver Schedule ---------------------*/












