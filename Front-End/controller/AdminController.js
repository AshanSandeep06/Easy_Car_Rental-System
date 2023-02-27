let baseUrl = "http://localhost:8080/Back-End/";
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
    deleteCarImages(carId);
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
                const { value: deniedReason } = await Swal.fire({
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
                }else{
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





















