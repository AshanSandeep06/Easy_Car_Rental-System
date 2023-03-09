let baseUrl = "http://localhost:8085/Back_End_war/";

var username = location.search.substring(1);
console.log(username);

$(function () {
    $('#customerPage_home').css("display", "block");
    $('#customerPage_bookings').css("display", "none");
    $('#customerPage_rentStatus').css("display", "none");
    $('#customerPage_myProfile').css("display", "none");
    $('#carBookingMain').css("display", "none");
    loadAllCarsDetails();
    setCustomerProfileData();
    checkWhenInOngoingRental(username);
    $('#sortingContainer').children().css('display', 'none');
    // viewMyActiveBookings();
    $("#carFront_image").attr('src', '');
    $("#carBack_image").attr('src', '');
    $("#carSide_image").attr('src', '');
    $("#carInterior_image").attr('src', '');
    /*for (let i = 0; i < $("#carsCollection > .carDetails_section").children().length; i++) {
        $("#carsCollection > .carDetails_section").children(`:eq(${i})`).css('display', 'none');
    }*/
});

$("#btnHome").on('click', function () {
    $('#customerPage_home').css("display", "block");
    $('#customerPage_bookings').css("display", "none");
    $('#customerPage_rentStatus').css("display", "none");
    $('#customerPage_myProfile').css("display", "none");
    $('#carBookingMain').css("display", "none");
    loadAllCarsDetails();
    $("#carFront_image").attr('src', '');
    $("#carBack_image").attr('src', '');
    $("#carSide_image").attr('src', '');
    $("#carInterior_image").attr('src', '');
});

$("#btnMyBookings").on('click', function () {
    $('#customerPage_home').css("display", "none");
    $('#customerPage_bookings').css("display", "block");
    $('#customerPage_rentStatus').css("display", "none");
    $('#customerPage_myProfile').css("display", "none");
    $('#carBookingMain').css("display", "none");
    viewMyActiveBookings();
});

$("#btnBookingsStatus").on('click', function () {
    $('#customerPage_home').css("display", "none");
    $('#customerPage_bookings').css("display", "none");
    $('#customerPage_rentStatus').css("display", "block");
    $('#customerPage_myProfile').css("display", "none");
    $('#carBookingMain').css("display", "none");
    viewBookingsRentStatus();
});

$("#btnCustomerProfile").on('click', function () {
    $('#customerPage_home').css("display", "none");
    $('#customerPage_bookings').css("display", "none");
    $('#customerPage_rentStatus').css("display", "none");
    $('#customerPage_myProfile').css("display", "block");
    $('#carBookingMain').css("display", "none");
    setCustomerProfileData();
    checkWhenInOngoingRental(username);
});

/*----------------------------- Load All Vehicles data -----------------------------------*/
function clearHomePageFields() {
    $("#cmbSelectCarType").val("Select Car Type");
    $("#txtPickUpDate").val("");
    $("#txtReturnDate").val("");
    loadAllCarsDetails();
}

$("#btnClear").on('click', function () {
    clearHomePageFields();
});

function loadAllCarsDetails() {
    // $("#tblManageVehicle>tbody").empty();
    var availableCount = 0;

    $.ajax({
        url: baseUrl + "car/sortFromCarBrand",
        method: "get",
        dataType: "json",
        // Edited 2023-02-25
        async: false,
        success: function (resp) {
            if (resp.data != null) {
                for (let i = 0; i < resp.data.length; i++) {
                    console.log(resp.data[i]);

                    $.ajax({
                        url: baseUrl + "car/getCarImages/" + resp.data[i].carId,
                        method: "get",
                        // Edited 2023-02-25
                        async: false,
                        dataType: "json",
                        success: function (resp) {
                            $("#carsCollection > .carDetails_section").children(`:eq(${i})`).children(":eq(1)").children(":eq(0)").attr('src', "../assets/img/uploads/carImages/" + resp.data.front);
                        }
                    });

                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).children(":eq(0)").children(":eq(1)").text(resp.data[i].brand);
                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).children(":eq(0)").children(":eq(2)").text("Free Km for Day - " + resp.data[i].freeMileage.dailyMileage + " Km");
                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).children(":eq(0)").children(":eq(3)").text("Free Km for Month - " + resp.data[i].freeMileage.monthlyMileage + " Km");
                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).children(":eq(0)").children(":eq(4)").text("Price Per Extra Km - " + resp.data[i].pricePerExtraKM + " LKR");

                    $.ajax({
                        url: baseUrl + "car/" + resp.data[i].brand + "/Available",
                        method: "get",
                        dataType: "json",
                        // Edited 2023-02-25
                        async: false,
                        success: function (resp) {
                            $("#carsCollection > .carDetails_section").children(`:eq(${i})`).children(":eq(0)").children(":eq(5)").text("Available Car Qty - " + resp.data);

                            // Edited 2023-02-25
                            if (resp.data > 0) {
                                availableCount += resp.data;
                            }
                        }
                    });

                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).children(":eq(2)").children(":eq(0)").text(resp.data[i].brand);

                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).children(":eq(3)").children(":eq(0)").empty();
                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).children(":eq(3)").children(":eq(0)").append('<i class="fa-solid fa-gas-pump"></i>');
                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).children(":eq(3)").children(":eq(0)").append(resp.data[i].fuelType);

                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).children(":eq(3)").children(":eq(1)").empty();
                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).children(":eq(3)").children(":eq(1)").append('<i class="fa-solid fa-users"></i>');
                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).children(":eq(3)").children(":eq(1)").append(resp.data[i].numOfPassengers);

                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).children(":eq(3)").children(":eq(2)").empty();
                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).children(":eq(3)").children(":eq(2)").append('<i class="fa-solid fa-gear"></i>');
                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).children(":eq(3)").children(":eq(2)").append(resp.data[i].transmissionType);

                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).children(":eq(4)").children(":eq(0)").children(":eq(0)").text("Rs." + resp.data[i].priceRate.dailyRate);
                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).children(":eq(4)").children(":eq(1)").children(":eq(0)").text("Rs." + resp.data[i].priceRate.monthlyRate);
                }

                for (let i = 0; i < $("#carsCollection > .carDetails_section").children().length; i++) {
                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).css('display', 'flex');
                }

                // Edited 2023-02-25 ((Meka thibune kalin --> resp.data.length) insteadof availableCount)
                for (let i = resp.data.length; i < $("#carsCollection > .carDetails_section").children().length; i++) {
                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).css('display', 'none');
                }
            }
        }
    });
}

$("#cmbSelectCarType").on('change', function () {
    let carType = $("#cmbSelectCarType").val();

    $.ajax({
        url: baseUrl + "car/" + carType,
        method: "get",
        dataType: "json",
        success: function (resp) {
            if (resp.data != null) {
                for (let i = 0; i < resp.data.length; i++) {
                    console.log(resp.data[i]);

                    $.ajax({
                        url: baseUrl + "car/getCarImages/" + resp.data[i].carId,
                        method: "get",
                        dataType: "json",
                        success: function (resp) {
                            $("#carsCollection > .carDetails_section").children(`:eq(${i})`).children(":eq(1)").children(":eq(0)").attr('src', "../assets/img/uploads/carImages/" + resp.data.front);
                        }
                    });

                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).children(":eq(0)").children(":eq(1)").text(resp.data[i].brand);
                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).children(":eq(0)").children(":eq(2)").text("Free Km for Day - " + resp.data[i].freeMileage.dailyMileage + " Km");
                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).children(":eq(0)").children(":eq(3)").text("Free Km for Month - " + resp.data[i].freeMileage.monthlyMileage + " Km");
                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).children(":eq(0)").children(":eq(4)").text("Price Per Extra Km - " + resp.data[i].pricePerExtraKM + " LKR");

                    $.ajax({
                        url: baseUrl + "car/" + resp.data[i].brand + "/Available",
                        method: "get",
                        dataType: "json",
                        success: function (resp) {
                            $("#carsCollection > .carDetails_section").children(`:eq(${i})`).children(":eq(0)").children(":eq(5)").text("Available Car Qty - " + resp.data);
                        }
                    });

                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).children(":eq(2)").children(":eq(0)").text(resp.data[i].brand);

                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).children(":eq(3)").children(":eq(0)").empty();
                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).children(":eq(3)").children(":eq(0)").append('<i class="fa-solid fa-gas-pump"></i>');
                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).children(":eq(3)").children(":eq(0)").append(resp.data[i].fuelType);

                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).children(":eq(3)").children(":eq(1)").empty();
                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).children(":eq(3)").children(":eq(1)").append('<i class="fa-solid fa-users"></i>');
                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).children(":eq(3)").children(":eq(1)").append(resp.data[i].numOfPassengers);

                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).children(":eq(3)").children(":eq(2)").empty();
                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).children(":eq(3)").children(":eq(2)").append('<i class="fa-solid fa-gear"></i>');
                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).children(":eq(3)").children(":eq(2)").append(resp.data[i].transmissionType);

                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).children(":eq(4)").children(":eq(0)").children(":eq(0)").text("Rs." + resp.data[i].priceRate.dailyRate);
                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).children(":eq(4)").children(":eq(1)").children(":eq(0)").text("Rs." + resp.data[i].priceRate.monthlyRate);

                    for (let i = 0; i < $("#carsCollection > .carDetails_section").children().length; i++) {
                        $("#carsCollection > .carDetails_section").children(`:eq(${i})`).css('display', 'flex');
                    }

                    for (let i = resp.data.length; i < $("#carsCollection > .carDetails_section").children().length; i++) {
                        $("#carsCollection > .carDetails_section").children(`:eq(${i})`).css('display', 'none');
                    }
                }
                return;
            }
            for (let i = 0; i < $("#carsCollection > .carDetails_section").children().length; i++) {
                $("#carsCollection > .carDetails_section").children(`:eq(${i})`).css('display', 'none');
            }
        }
    });
});

//propertyIsEnumerable()

function loadAllCarsFromBrand(carBrand) {
    $("#cmbSelectCarId").empty();
    $("#cmbSelectCarId").append(`<option selected disabled>Select Car</option>`);

    var dailyRate;
    var monthlyRate;
    var driverCostPerDay;
    var lossDamageWaiver;

    $.ajax({
        url: baseUrl + "car",
        method: "get",
        success: function (resp) {
            for (let c1 of resp.data) {
                if (c1.brand == carBrand && c1.availabilityType == "Available") {
                    $("#cmbSelectCarId").append(`<option>${c1.carId}</option>`);

                    dailyRate = c1.priceRate.dailyRate;
                    monthlyRate = c1.priceRate.monthlyRate;
                    driverCostPerDay = "1000";
                    lossDamageWaiver = c1.lossDamageWaiver;
                }
            }

            $("#carDetailsAside > h1:first-child > span").text(carBrand);
            $("#carDetailsAside > h2:nth-child(3) > span").text(dailyRate + " LKR");
            $("#carDetailsAside > h2:nth-child(4) > span").text(monthlyRate + " LKR");
            $("#carDetailsAside > h2:nth-child(5) > span").text(driverCostPerDay + " LKR");
            $("#carDetailsAside > h2:nth-child(6) > span").text(lossDamageWaiver + " LKR");

        }
    });
}

$(".cars_btn").on('click', function () {
    console.log($(this).parent().children(":eq(5)").text());
    cancelRent();
    if ($(this).parent().children(":eq(5)").text().split('-')[1].split(' ')[1] > 0) {
        $('#customerPage_home').css("display", "none");
        $('#carBookingMain').css("display", "flex");
        $("#cmbSelectCarId").focus();
        var carBrand = $(this).parent().parent().children(":eq(2)").children(":eq(0)").text();
        console.log(carBrand);
        loadAllCarsFromBrand(carBrand);
        loadCustomerDetails();
        generateNewRentalID();
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "All Cars of Your Selected Car Brand is Sold Out.."
        })
    }
});

$("#cmbSelectCarId").change(function () {
    $("#tblCarDetails>tbody").empty();
    let carId = $(this).val();

    $.ajax({
        url: baseUrl + "car?carId=" + carId,
        method: "get",
        success: function (resp) {
            if (resp.data != null) {
                $("#tblCarDetails>tbody").append(`<tr><td>${resp.data.carId}</td><td>${resp.data.registerNum}</td><td>${resp.data.brand}</td><td>${resp.data.color}</td><td>${resp.data.numOfPassengers}</td><td>${resp.data.fuelType}</td><td>${resp.data.transmissionType}</td><td>${resp.data.freeMileage.dailyMileage}</td><td>${resp.data.freeMileage.monthlyMileage}</td><td>${resp.data.pricePerExtraKM}</td></tr>`);
            }

            $.ajax({
                url: baseUrl + "car/getCarImages/" + carId,
                method: "get",
                success: function (resp) {
                    $("#carFront_image").attr('src', "../assets/img/uploads/carImages/" + resp.data.front);
                    $("#carBack_image").attr('src', "../assets/img/uploads/carImages/" + resp.data.back);
                    $("#carSide_image").attr('src', "../assets/img/uploads/carImages/" + resp.data.side);
                    $("#carInterior_image").attr('src', "../assets/img/uploads/carImages/" + resp.data.interior);
                }
            });
        }
    });
});

function loadCustomerDetails() {
    $.ajax({
        url: baseUrl + "/customer?username=" + username,
        method: "get",
        dataType: "json",
        success: function (resp) {
            if (resp.data != null) {
                $("#customerID").val(resp.data.customerId);
                $("#customerNic").val(resp.data.nic);
                $("#customerName").val(resp.data.name);
            }
        }
    });
}

function generateNewRentalID() {
    $.ajax({
        url: baseUrl + "rent/generateNewRentID",
        method: "get",
        dataType: "json",
        async: false,
        success: function (res) {
            $("#rentalID").val(res.data);
        },

        error: function (error) {
            alert(JSON.parse(error.responseText).message);
        }
    });
}

function generateNewPaymentID() {
    let paymentID = null;

    $.ajax({
        url: baseUrl + "payment/generateNewPaymentID",
        method: "get",
        dataType: "json",
        async: false,
        success: function (res) {
            paymentID = res.data;
        },

        error: function (error) {
            alert(JSON.parse(error.responseText).message);
        }
    });

    return paymentID;
}

/*function calculateRentDaysCount() {
    var start_time = $('#pickUpTime').val();
    var end_time = $('#returnTime').val();

    var totalHourCount = (new Date($("#returnDate").val() + " " + $('#returnTime').val()) - new Date($("#pickUpDate").val() + " " + $('#pickUpTime').val())) / 1000 / 60 / 60;
    var rentDaysCount = totalHourCount / 24;
    var rentHoursCount = totalHourCount % 24;

    console.log(totalHourCount);
    console.log(rentDaysCount);
    console.log(rentHoursCount);

    var exactRentDayCount = parseInt(totalHourCount / 24) + 1;
    console.log("exactRentDayCount : " + exactRentDayCount)
}*/

$("#pickUpTime, #pickUpDate, #returnTime, #returnDate").on('change', function () {
    if ($('#pickUpTime').val() != '' && $('#pickUpDate').val() != '' && $('#returnTime').val() != '' && $('#returnDate').val() != '') {
        if (new Date($('#pickUpDate').val()) > new Date() && new Date($('#returnDate').val()) > new Date()) {
            if (new Date($('#pickUpDate').val()) <= new Date($('#returnDate').val())) {
                var start_time = $('#pickUpTime').val();
                var end_time = $('#returnTime').val();

                var totalHourCount = (new Date($("#returnDate").val() + " " + $('#returnTime').val()) - new Date($("#pickUpDate").val() + " " + $('#pickUpTime').val())) / 1000 / 60 / 60;
                var rentDaysCount = totalHourCount / 24;
                var rentHoursCount = totalHourCount % 24;

                console.log(totalHourCount);
                console.log(rentDaysCount);
                console.log(rentHoursCount);

                var exactRentDayCount = parseInt(totalHourCount / 24);

                if (rentHoursCount > 0) {
                    exactRentDayCount = exactRentDayCount + 1;
                }

                console.log("exactRentDayCount : " + exactRentDayCount);

                $('#driverFee').val(parseFloat($("#carDetailsAside > h2:nth-child(5) > span").text().split(" LKR")[0]) * exactRentDayCount);
                $('#ldw').val(parseFloat($("#carDetailsAside > h2:nth-child(6) > span").text().split(" LKR")[0]));
                if (exactRentDayCount == 30) {
                    $('#carFee').val(parseInt($("#carDetailsAside > h2:nth-child(4) > span").text().split(" LKR")[0]));
                } else if (exactRentDayCount > 30 && exactRentDayCount < 60) {
                    $('#carFee').val(parseInt($("#carDetailsAside > h2:nth-child(4) > span").text().split(" LKR")[0]) + parseInt($("#carDetailsAside > h2:nth-child(3) > span").text().split(" LKR")[0]) * exactRentDayCount);
                } else {
                    $('#carFee').val(parseInt($("#carDetailsAside > h2:nth-child(3) > span").text().split(" LKR")[0]) * exactRentDayCount);
                }

                $('#totalFee').val(parseFloat($('#driverFee').val()) + parseFloat($('#ldw').val()) + parseFloat($('#carFee').val()));
            } else {
                $('#driverFee').val('');
                $('#ldw').val('');
                $('#carFee').val('');
                $('#totalFee').val('');
            }
        } else {
            $('#driverFee').val('');
            $('#ldw').val('');
            $('#carFee').val('');
            $('#totalFee').val('');
        }
    }
});

$("#btnCancelRent").on('click', function () {
    cancelRent();
    // $("#driverAcceptanceField").is(":checked");
});

function cancelRent() {
    generateNewRentalID();
    $('#tblCarDetails>tbody').empty();
    $('#cmbSelectCarId').val('Select Car');
    $('#location').val('');
    $('#pickUpTime').val('');
    $('#pickUpDate').val('');
    $('#returnTime').val('');
    $('#returnDate').val('');
    $('#carFee').val('');
    $('#ldw').val('');
    $('#driverFee').val('');
    $('#totalFee').val('');
    $('#uploadSlip').val('');
    $('#driverAcceptanceField').prop('checked', false);
    $("#carFront_image").attr('src', '');
    $("#carBack_image").attr('src', '');
    $("#carSide_image").attr('src', '');
    $("#carInterior_image").attr('src', '');
    $('#location,#pickUpTime,#pickUpDate,#returnTime, #returnDate').css("border", "1px solid #ced4da");
}

$('#btnSubmitRent').on('click', function () {
    if ($('#cmbSelectCarId').val() != null && !($('#tblCarDetails>tbody').is(':empty')) && $('#location').val() != '' && $('#pickUpTime').val() != '' && $('#pickUpDate').val() != '' && $('#returnTime').val() != '' && $('#returnDate').val() != '' && $('#uploadSlip').val() != '') {
        // DO THE TASK
        var rentDetailsArray = [];
        rentDetailsArray.push({
            rentId: $('#rentalID').val(),
            carId: $("#tblCarDetails>tbody").children().eq(0).children(":eq(0)").text(),
            distanceMileage: 0.00,
            carCost: parseFloat($('#carFee').val()).toFixed(2),
            driverCost: parseFloat($('#driverFee').val()).toFixed(2),
            damageFee: 0.00,
        });

        let rentObject = {
            rentId: $('#rentalID').val(),
            pickUpTime: $("#pickUpTime").val(),
            pickUpDate: $("#pickUpDate").val(),
            returnTime: $("#returnTime").val(),
            returnDate: $("#returnDate").val(),
            requestTypeOfDriver: $("#driverAcceptanceField").is(":checked") ? "Yes" : "No",
            location: $("#location").val(),
            rentStatus: "Pending",
            deniedReason: "N/A",
            customer: {customerId: $('#customerID').val()},
            rentDetail: rentDetailsArray
        };

        var fullDate = new Date();
        var currentDate = fullDate.getFullYear() + "-0" + (fullDate.getMonth() + 1) + "-" + fullDate.getDate();
        if (fullDate.getDate() < 10) {
            currentDate = fullDate.getFullYear() + "-0" + (fullDate.getMonth() + 1) + "-0" + fullDate.getDate();
        }

        //---------------------------------------------

        var currentTime = fullDate.getHours() + ":" + fullDate.getMinutes();
        if (fullDate.getHours() < 10) {
            currentTime = "0" + fullDate.getHours() + ":" + fullDate.getMinutes();
        }
        if (fullDate.getMinutes() < 10) {
            if (fullDate.getHours() >= 10) {
                currentTime = fullDate.getHours() + ":0" + fullDate.getMinutes();
            } else {
                currentTime = "0" + fullDate.getHours() + ":0" + fullDate.getMinutes();
            }
        }

        $.ajax({
            url: baseUrl + "rent",
            method: "post",
            data: JSON.stringify(rentObject),
            contentType: "application/json",
            dataType: "json",
            success: function (res) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: res.message,
                    showConfirmButton: false,
                    timer: 1500
                })

                let paymentObject = {
                    paymentId: generateNewPaymentID(),
                    paymentType: "Loss Damage Waiver",
                    paymentDate: currentDate,
                    paymentTime: currentTime,
                    amount: parseFloat($('#ldw').val()),
                    cash: $('#ldw').val(),
                    balance: 0.00,
                    rent: rentObject,
                };

                $.ajax({
                    url: baseUrl + "payment",
                    method: "post",
                    data: JSON.stringify(paymentObject),
                    contentType: "application/json",
                    success: function (res) {
                        $('#customerPage_home').css("display", "block");
                        $('#carBookingMain').css("display", "none");

                        loadAllCarsDetails();
                    },
                    error: function (error) {
                        // alert(JSON.parse(error.responseText).message);
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: JSON.parse(error.responseText).message
                        })
                    }
                });
            },
            error: function (error) {
                // alert(JSON.parse(error.responseText).message);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: JSON.parse(error.responseText).message
                })
            }
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Booking Fields are Empty..!',
            text: 'All Fields are Shouldn\'t Be Empty'
        })
    }
});

/*----------- My Active Bookings -----------*/
function viewMyActiveBookings() {
    $('#tblBookingDetails>tbody').empty();
    let customerId;

    $.ajax({
        url: baseUrl + "/customer?username=" + username,
        method: "get",
        async: false,
        dataType: "json",
        success: function (resp) {
            if (resp.data != null) {
                customerId = resp.data.customerId;
            }
        }
    });

    console.log(customerId)

    $.ajax({
        url: baseUrl + "rent/getActiveBookings?customerId=" + customerId,
        method: "get",
        dataType: "json",
        success: function (resp) {
            if (resp.data != null) {
                for (let rent of resp.data) {
                    console.log(rent)
                    var xr = rent.pickUpDate;
                    var startDate = xr[0] + "-" + xr[1] + "-" + xr[2];

                    var yr = rent.returnDate;
                    var endDate = yr[0] + "-" + yr[1] + "-" + yr[2];

                    $('#tblBookingDetails>tbody').append(`<tr><td>${rent.rentId}</td><td>${rent.customer.customerId}</td><td>${rent.customer.name}</td><td>${rent.customer.nic}</td><td>${startDate}</td><td>${endDate}</td><td>${rent.location}</td><td>${rent.requestTypeOfDriver}</td><td>${rent.rentDetail[0].driver.driverId}</td><td>${rent.rentDetail[0].driver.name}</td><td>${rent.rentDetail[0].driver.contactNumber}</td><td>${rent.rentDetail[0].carId}</td><td>${rent.rentDetail[0].carCost}</td><td>${rent.rentDetail[0].driverCost}</td><td><button type="button" class="btn btn-danger btnOptionCancelRent">Cancel Request
                            </button></td></tr>`);

                    if (rent.rentDetail.length > 1) {
                        for (let j = 1; j < resp.rentDetail.length; j++) {
                            $('#tblBookingDetails>tbody').append(`<tr><td>${rent.rentId}</td><td>${rent.customer.customerId}</td><td>${rent.customer.name}</td><td>${rent.customer.nic}</td><td>${startDate}</td><td>${endDate}</td><td>${rent.location}</td><td>${rent.requestTypeOfDriver}</td><td>${rent.rentDetail[j].driver.driverId}</td><td>${rent.rentDetail[j].driver.name}</td><td>${rent.rentDetail[j].driver.contactNumber}</td><td>${rent.rentDetail[j].carId}</td><td>${rent.rentDetail[j].carCost}</td><td>${rent.rentDetail[j].driverCost}</td><td><button type="button" class="btn btn-danger btnOptionCancelRent">Cancel Request
                            </button></td></tr>`);
                        }
                    }
                }
                bindRowClickEventsForViewActiveBookingsSection();
            }
        }
    });
}

function bindRowClickEventsForViewActiveBookingsSection() {
    $(".btnOptionCancelRent").on('click', function () {
        console.log($(this).parent().parent().children(':eq(0)').text());
        let rentID = $(this).parent().parent().children(':eq(0)').text();

        // allowOutsideClick(Backdrop)

        Swal.fire({
            title: 'Are you sure?',
            text: "Do You want to Cancel Your Rental Request..?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, cancel it!',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: baseUrl + "rent?rentId=" + rentID,
                    method: "put",
                    dataType: "json",
                    success: function (res) {
                        console.log(res.data);
                        Swal.fire(
                            'Cancelled!',
                            res.message,
                            'success'
                        )
                        viewMyActiveBookings();
                    },

                    error: function (error) {
                        viewMyActiveBookings();
                        console.log(JSON.parse(error.responseText).message)
                    }
                });

            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swal.fire(
                    'Dismissed',
                    'Your Rental Request Couldn\'t Cancelled',
                    'warning'
                )
            }
        })
    });
}

/*--------------- View Booking Status ---------------*/
function viewBookingsRentStatus() {
    $('#tblRentDetailsStatus>tbody').empty();
    let customerId;

    $.ajax({
        url: baseUrl + "/customer?username=" + username,
        method: "get",
        async: false,
        dataType: "json",
        success: function (resp) {
            if (resp.data != null) {
                customerId = resp.data.customerId;
            }
        }
    });

    $.ajax({
        url: baseUrl + "rent/getBookingsRentStatus/" + customerId,
        method: "get",
        dataType: "json",
        success: function (resp) {
            if (resp.data != null) {
                for (let rent of resp.data) {
                    console.log(rent)
                    var tag;
                    if (rent.rentStatus == "Pending") {
                        tag = '<span class="badge text-bg-primary" style="font-size: 13px;">Pending</span>';
                    } else if (rent.rentStatus == "Accepted") {
                        tag = '<span class="badge text-bg-success" style="font-size: 13px;">Accepted</span>';
                    } else {
                        tag = '<span class="badge text-bg-danger" style="font-size: 13px;">Denied</span>';
                    }

                    $('#tblRentDetailsStatus>tbody').append(`<tr><td>${rent.rentId}</td><td>${rent.customer.customerId}</td><td>${rent.customer.name}</td><td>${rent.customer.nic}</td><td>${rent.rentDetail[0].carId}</td><td>${tag}</td><td>${rent.deniedReason}</td></tr>`);

                    if (rent.rentDetail.length > 1) {
                        for (let j = 1; j < resp.rentDetail.length; j++) {
                            $('#tblRentDetailsStatus>tbody').append(`<tr><td>${rent.rentId}</td><td>${rent.customer.customerId}</td><td>${rent.customer.name}</td><td>${rent.customer.nic}</td><td>${rent.rentDetail[j].carId}</td><td>${tag}</td><td>${rent.deniedReason}</td></tr>`);
                        }
                    }
                }
            }
        }
    });
}

/*--------------- Customer Profile ---------------*/
function setCustomerProfileData() {
    $.ajax({
        url: baseUrl + "/customer?username=" + username,
        method: "get",
        dataType: "json",
        success: function (resp) {
            if (resp.data != null) {
                let customer = resp.data;
                $.ajax({
                    url: baseUrl + "/user_credentials?username=" + username,
                    method: "get",
                    dataType: "json",
                    success: function (resp) {
                        let user = resp.data;
                        $('#txtCustomerID').val(customer.customerId);
                        $('#txtCusUsername').val(user.username);
                        $('#txtCusPassword').val(user.password);
                        $('#txtCustomerName').val(customer.name);
                        $('#txtCustomerAddress').val(customer.address);
                        $('#txtCustomerContact').val(customer.contactNumber);
                        $('#txtCustomerEmail').val(customer.email);
                        $('#txtCustomerNic').val(customer.nic);
                        $('#txtCustomerLicenseNo').val(customer.licenseNo);

                        $.ajax({
                            url: baseUrl + "customer/getCustomerImages/" + customer.customerId,
                            method: "get",
                            dataType: "json",
                            success: function (resp) {
                                $("#customerNicImage").attr('src', "../assets/img/uploads/customerImages/" + resp.data.nicImage);
                                $("#customerLicenseImage").attr('src', "../assets/img/uploads/customerImages/" + resp.data.licenseImage);
                            }
                        });
                    }
                });
            }
        }
    });
}

$('#btnUpdateProfile').on('click', function () {
    updateCustomerProfile();
});

function updateCustomerProfile() {
    let array = [];
    array.push($("#txtCustomerNic")[0]);
    array.push($("#txtCustomerName")[0]);
    array.push($("#txtCustomerEmail")[0]);
    array.push($("#txtCustomerAddress")[0]);
    array.push($("#txtCustomerLicenseNo")[0]);
    array.push($("#txtCusPassword")[0]);
    array.push($("#uploadNicImage")[0]);
    array.push($("#uploadLicenseImage")[0]); //8

    var count = 0;

    for (let element of array) {
        if (element.hasAttribute('disabled')) {
            count++;
        }
    }

    if (count === 8) {
        if ($('#txtCustomerContact').val() == '') {
            alert("Failed to Update Customer Profile, Please Try again..!");
            return;
        } else {
            $.ajax({
                url: baseUrl + "customer/" + $('#txtCustomerID').val() + "/" + $('#txtCustomerContact').val(),
                method: "put",
                async: false,
                dataType: "json",
                success: function (resp) {
                    alert(resp.message);
                },
                error: function (error) {
                    alert(JSON.parse(error.responseText).message);
                }
            });
            return;
        }
    } else {
        if ($('#txtCustomerContact').val() == '') {
            alert("Failed to Update Customer Profile, Please Try again..!");
            return;
        }
    }

    if ($('#txtCustomerID').val() != '' && $('#txtCusUsername').val() != '' && $('#txtCusPassword').val() != '' && $('#txtCustomerName').val() != '' && $('#txtCustomerAddress').val() != '' && $('#txtCustomerContact').val() != '' && $('#txtCustomerEmail').val() != '' && $('#txtCustomerNic').val() != '' && $('#txtCustomerLicenseNo').val() != '') {
        let cusObject = {
            customerId: $('#txtCustomerID').val(),
            nic: $("#txtCustomerNic").val(),
            name: $("#txtCustomerName").val(),
            email: $("#txtCustomerEmail").val(),
            address: $("#txtCustomerAddress").val(),
            contactNumber: $("#txtCustomerContact").val(),
            licenseNo: $("#txtCustomerLicenseNo").val(),
        };

        let userObject = {
            username: $('#txtCusUsername').val(),
            password: $('#txtCusPassword').val(),
            role: "Customer"
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
                    url: baseUrl + "customer",
                    method: "put",
                    data: JSON.stringify(cusObject),
                    contentType: "application/json",
                    dataType: "json",
                    success: function (res) {
                        alert(res.message);

                        if ($('#uploadNicImage')[0].files[0] != null || $('#uploadLicenseImage')[0].files[0] != null) {
                            updateCustomerNicAndLicenseImages(cusObject.customerId);
                        }
                        setCustomerProfileData();
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

function updateCustomerNicAndLicenseImages(customerId) {
    if ($('#uploadNicImage')[0].files[0] != null) {
        let formData = new FormData();
        var nicImage = $('#uploadNicImage')[0].files[0];
        var nicImageName = customerId + "_NIC-image." + $('#uploadNicImage')[0].files[0].name.split(".")[1];
        formData.append("nicImage", nicImage, nicImageName);

        $.ajax({
            url: baseUrl + "customer/uploadCustomerImages/uploadNICImage/" + customerId,
            method: "PUT",
            contentType: false,
            processData: false,
            data: formData,

            success: function (res) {
                setCustomerProfileData();
                alert(res.message);
            },
            error: function (error) {
                alert(JSON.parse(error.responseText).message);
            }
        });
    }

    if ($('#uploadLicenseImage')[0].files[0] != null) {
        let formData = new FormData();
        var licenseImage = $('#uploadLicenseImage')[0].files[0];
        var licenseImageName = customerId + "_License-image." + $('#uploadLicenseImage')[0].files[0].name.split(".")[1];
        formData.append("licenseImage", licenseImage, licenseImageName);

        $.ajax({
            url: baseUrl + "customer/uploadCustomerImages/uploadLicenseImage?customerId=" + customerId,
            method: "PUT",
            contentType: false,
            processData: false,
            data: formData,

            success: function (res) {
                setCustomerProfileData();
                alert(res.message);
            },
            error: function (error) {
                alert(JSON.parse(error.responseText).message);
            }
        });
    }
    $('#uploadNicImage').val('');
    $('#uploadLicenseImage').val('');
}

function checkWhenInOngoingRental(username) {
    $.ajax({
        url: baseUrl + "customer?username=" + username,
        method: "get",
        dataType: "json",
        success: function (resp) {
            if (resp.data != null) {
                let customer = resp.data;
                $.ajax({
                    url: baseUrl + "rent/checkOngoingRentals/OngoingRentalsCount?customerId=" + customer.customerId,
                    method: "get",
                    dataType: "json",
                    success: function (resp) {
                        if (resp.data <= 0) {
                            $("#txtCustomerNic").attr('disabled', false);
                            $("#txtCustomerName").attr('disabled', false);
                            $("#txtCustomerEmail").attr('disabled', false);
                            $("#txtCustomerAddress").attr('disabled', false);
                            $("#txtCustomerContact").attr('disabled', false);
                            $("#txtCustomerLicenseNo").attr('disabled', false);
                            $('#txtCusPassword').attr('disabled', false);
                            $('#uploadNicImage').attr('disabled', false);
                            $('#uploadLicenseImage').attr('disabled', false);

                        } else {
                            $("#txtCustomerNic").attr('disabled', true);
                            $("#txtCustomerName").attr('disabled', true);
                            $("#txtCustomerEmail").attr('disabled', true);
                            $("#txtCustomerAddress").attr('disabled', true);
                            $("#txtCustomerLicenseNo").attr('disabled', true);
                            $('#txtCusPassword').attr('disabled', true);
                            $('#uploadNicImage').attr('disabled', true);
                            $('#uploadLicenseImage').attr('disabled', true);
                        }
                    }
                });
            }
        }
    });
}


/* ------------ Customer Home Page --------------*/
$('#txtSortingType').on('change', function () {
    if ($('#txtSortingType') != null) {
        if ($('#txtSortingType').val() === "Car Type") {
            $('#vehicleTypeRow').css('display', 'flex');
            $('#brandRow').css('display', 'none');
            $('#fuelTypeRow').css('display', 'none');
            $('#transmissionTypeRow').css('display', 'none');
            $('#priceRow').css('display', 'none');
            $('#NoOfPassengersRow').css('display', 'none');

        } else if ($('#txtSortingType').val() === "Brand") {
            $('#vehicleTypeRow').css('display', 'none');
            $('#brandRow').css('display', 'flex');
            $('#fuelTypeRow').css('display', 'none');
            $('#transmissionTypeRow').css('display', 'none');
            $('#priceRow').css('display', 'none');
            $('#NoOfPassengersRow').css('display', 'none');

        } else if ($('#txtSortingType').val() === "Fuel Type") {
            $('#vehicleTypeRow').css('display', 'none');
            $('#brandRow').css('display', 'none');
            $('#fuelTypeRow').css('display', 'flex');
            $('#transmissionTypeRow').css('display', 'none');
            $('#priceRow').css('display', 'none');
            $('#NoOfPassengersRow').css('display', 'none');

        } else if ($('#txtSortingType').val() === "Transmission Type") {
            $('#vehicleTypeRow').css('display', 'none');
            $('#brandRow').css('display', 'none');
            $('#fuelTypeRow').css('display', 'none');
            $('#transmissionTypeRow').css('display', 'flex');
            $('#priceRow').css('display', 'none');
            $('#NoOfPassengersRow').css('display', 'none');

        } else if ($('#txtSortingType').val() === "Price") {
            $('#vehicleTypeRow').css('display', 'none');
            $('#brandRow').css('display', 'none');
            $('#fuelTypeRow').css('display', 'none');
            $('#transmissionTypeRow').css('display', 'none');
            $('#priceRow').css('display', 'flex');
            $('#NoOfPassengersRow').css('display', 'none');

        } else {
            $('#vehicleTypeRow').css('display', 'none');
            $('#brandRow').css('display', 'none');
            $('#fuelTypeRow').css('display', 'none');
            $('#transmissionTypeRow').css('display', 'none');
            $('#priceRow').css('display', 'none');
            $('#NoOfPassengersRow').css('display', 'flex');

        }
    }
});

$('#btnClearSorting').on('click', function () {
    loadAllCarsDetails();

    $("#txtSortingType").empty();
    $("#txtSortingType").append(`<option class="badge text-bg-success" selected disabled>Sorted By</option>`);
    $("#txtSortingType").append(`<option>Car Type</option>`);
    $("#txtSortingType").append(`<option>Brand</option>`);
    $("#txtSortingType").append(`<option>Fuel Type</option>`);
    $("#txtSortingType").append(`<option>Transmission Type</option>`);
    $("#txtSortingType").append(`<option>Price</option>`);
    $("#txtSortingType").append(`<option>No Of Passengers</option>`);

    $('#vehicleTypeRow').css('display', 'none');
    $('#brandRow').css('display', 'none');
    $('#fuelTypeRow').css('display', 'none');
    $('#transmissionTypeRow').css('display', 'none');
    $('#priceRow').css('display', 'none');
    $('#NoOfPassengersRow').css('display', 'none');

    $('input:radio').prop('checked', false);
});

function loadAllCarsByCarType(carType) {
    var availableCount = 0;

    $.ajax({
        url: baseUrl + "car/" + carType,
        method: "get",
        dataType: "json",
        async: false,
        success: function (resp) {
            if (resp.data != null) {
                for (let i = 0; i < resp.data.length; i++) {
                    console.log(resp.data[i]);

                    $.ajax({
                        url: baseUrl + "car/getCarImages/" + resp.data[i].carId,
                        method: "get",
                        async: false,
                        dataType: "json",
                        success: function (resp) {
                            $("#carsCollection > .carDetails_section").children(`:eq(${i})`).children(":eq(1)").children(":eq(0)").attr('src', "../assets/img/uploads/carImages/" + resp.data.front);
                        }
                    });

                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).children(":eq(0)").children(":eq(1)").text(resp.data[i].brand);
                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).children(":eq(0)").children(":eq(2)").text("Free Km for Day - " + resp.data[i].freeMileage.dailyMileage + " Km");
                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).children(":eq(0)").children(":eq(3)").text("Free Km for Month - " + resp.data[i].freeMileage.monthlyMileage + " Km");
                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).children(":eq(0)").children(":eq(4)").text("Price Per Extra Km - " + resp.data[i].pricePerExtraKM + " LKR");

                    $.ajax({
                        url: baseUrl + "car/" + resp.data[i].brand + "/Available",
                        method: "get",
                        dataType: "json",
                        async: false,
                        success: function (resp) {
                            $("#carsCollection > .carDetails_section").children(`:eq(${i})`).children(":eq(0)").children(":eq(5)").text("Available Car Qty - " + resp.data);

                            if (resp.data > 0) {
                                availableCount += resp.data;
                            }
                        }
                    });

                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).children(":eq(2)").children(":eq(0)").text(resp.data[i].brand);

                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).children(":eq(3)").children(":eq(0)").empty();
                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).children(":eq(3)").children(":eq(0)").append('<i class="fa-solid fa-gas-pump"></i>');
                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).children(":eq(3)").children(":eq(0)").append(resp.data[i].fuelType);

                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).children(":eq(3)").children(":eq(1)").empty();
                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).children(":eq(3)").children(":eq(1)").append('<i class="fa-solid fa-users"></i>');
                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).children(":eq(3)").children(":eq(1)").append(resp.data[i].numOfPassengers);

                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).children(":eq(3)").children(":eq(2)").empty();
                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).children(":eq(3)").children(":eq(2)").append('<i class="fa-solid fa-gear"></i>');
                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).children(":eq(3)").children(":eq(2)").append(resp.data[i].transmissionType);

                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).children(":eq(4)").children(":eq(0)").children(":eq(0)").text("Rs." + resp.data[i].priceRate.dailyRate);
                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).children(":eq(4)").children(":eq(1)").children(":eq(0)").text("Rs." + resp.data[i].priceRate.monthlyRate);
                }

                for (let i = 0; i < $("#carsCollection > .carDetails_section").children().length; i++) {
                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).css('display', 'flex');
                }

                for (let i = resp.data.length; i < $("#carsCollection > .carDetails_section").children().length; i++) {
                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).css('display', 'none');
                }
            } else {
                console.log("Hureee")
                for (let i = 0; i < $("#carsCollection > .carDetails_section").children().length; i++) {
                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).css('display', 'none');
                }
            }
        }
    });
}

$('#general').on('click', function () {
    var carType = "General";
    loadAllCarsByCarType(carType);
});

$('#premium').on('click', function () {
    var carType = "Premium";
    loadAllCarsByCarType(carType);
});

$('#luxury').on('click', function () {
    var carType = "Luxury";
    loadAllCarsByCarType(carType);
});

function loadAllCarsByCarBrand(brand) {
    var availableCount = 0;
    var carCount = 0;
    let j = 0;

    $.ajax({
        url: baseUrl + "car/sortFromCarBrand",
        method: "get",
        dataType: "json",
        async: false,
        success: function (resp) {
            if (resp.data != null) {
                for (let i = 0; i < resp.data.length; i++) {
                    if (resp.data[i].brand.slice(0, brand.length) == brand) {
                        carCount++;
                        console.log(resp.data[i]);

                        $.ajax({
                            url: baseUrl + "car/getCarImages/" + resp.data[i].carId,
                            method: "get",
                            async: false,
                            dataType: "json",
                            success: function (resp) {
                                $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(1)").children(":eq(0)").attr('src', "../assets/img/uploads/carImages/" + resp.data.front);
                            }
                        });

                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(0)").children(":eq(1)").text(resp.data[i].brand);
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(0)").children(":eq(2)").text("Free Km for Day - " + resp.data[i].freeMileage.dailyMileage + " Km");
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(0)").children(":eq(3)").text("Free Km for Month - " + resp.data[i].freeMileage.monthlyMileage + " Km");
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(0)").children(":eq(4)").text("Price Per Extra Km - " + resp.data[i].pricePerExtraKM + " LKR");

                        $.ajax({
                            url: baseUrl + "car/" + resp.data[i].brand + "/Available",
                            method: "get",
                            dataType: "json",
                            async: false,
                            success: function (resp) {
                                $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(0)").children(":eq(5)").text("Available Car Qty - " + resp.data);

                                if (resp.data > 0) {
                                    availableCount += resp.data;
                                }
                            }
                        });

                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(2)").children(":eq(0)").text(resp.data[i].brand);

                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(0)").empty();
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(0)").append('<i class="fa-solid fa-gas-pump"></i>');
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(0)").append(resp.data[i].fuelType);

                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(1)").empty();
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(1)").append('<i class="fa-solid fa-users"></i>');
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(1)").append(resp.data[i].numOfPassengers);

                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(2)").empty();
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(2)").append('<i class="fa-solid fa-gear"></i>');
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(2)").append(resp.data[i].transmissionType);

                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(4)").children(":eq(0)").children(":eq(0)").text("Rs." + resp.data[i].priceRate.dailyRate);
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(4)").children(":eq(1)").children(":eq(0)").text("Rs." + resp.data[i].priceRate.monthlyRate);

                        j++;
                    }
                }

                for (let i = 0; i < $("#carsCollection > .carDetails_section").children().length; i++) {
                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).css('display', 'flex');
                }

                for (let i = carCount; i < $("#carsCollection > .carDetails_section").children().length; i++) {
                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).css('display', 'none');
                }
            } else {
                console.log("Hureee")
                for (let i = 0; i < $("#carsCollection > .carDetails_section").children().length; i++) {
                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).css('display', 'none');
                }
            }
        }
    });
}

$('#suzuki').on('click', function () {
    var brand = "Suzuki";
    loadAllCarsByCarBrand(brand);
});

$('#toyota').on('click', function () {
    var brand = "Toyota";
    loadAllCarsByCarBrand(brand);
});

$('#perodua').on('click', function () {
    var brand = "Perodua";
    loadAllCarsByCarBrand(brand);
});

$('#mercedes').on('click', function () {
    var brand = "Mercedes";
    loadAllCarsByCarBrand(brand);
});

$('#BMW').on('click', function () {
    var brand = "BMW";
    loadAllCarsByCarBrand(brand);
});

function loadAllCarsByFuelType(fuelType) {
    var availableCount = 0;
    var carCount = 0;
    let j = 0;

    $.ajax({
        url: baseUrl + "car/sortFromCarBrand",
        method: "get",
        dataType: "json",
        async: false,
        success: function (resp) {
            if (resp.data != null) {
                for (let i = 0; i < resp.data.length; i++) {
                    if (resp.data[i].fuelType == fuelType) {
                        carCount++;
                        console.log(resp.data[i]);

                        $.ajax({
                            url: baseUrl + "car/getCarImages/" + resp.data[i].carId,
                            method: "get",
                            async: false,
                            dataType: "json",
                            success: function (resp) {
                                $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(1)").children(":eq(0)").attr('src', "../assets/img/uploads/carImages/" + resp.data.front);
                            }
                        });

                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(0)").children(":eq(1)").text(resp.data[i].brand);
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(0)").children(":eq(2)").text("Free Km for Day - " + resp.data[i].freeMileage.dailyMileage + " Km");
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(0)").children(":eq(3)").text("Free Km for Month - " + resp.data[i].freeMileage.monthlyMileage + " Km");
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(0)").children(":eq(4)").text("Price Per Extra Km - " + resp.data[i].pricePerExtraKM + " LKR");

                        $.ajax({
                            url: baseUrl + "car/" + resp.data[i].brand + "/Available",
                            method: "get",
                            dataType: "json",
                            async: false,
                            success: function (resp) {
                                $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(0)").children(":eq(5)").text("Available Car Qty - " + resp.data);

                                if (resp.data > 0) {
                                    availableCount += resp.data;
                                }
                            }
                        });

                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(2)").children(":eq(0)").text(resp.data[i].brand);

                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(0)").empty();
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(0)").append('<i class="fa-solid fa-gas-pump"></i>');
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(0)").append(resp.data[i].fuelType);

                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(1)").empty();
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(1)").append('<i class="fa-solid fa-users"></i>');
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(1)").append(resp.data[i].numOfPassengers);

                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(2)").empty();
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(2)").append('<i class="fa-solid fa-gear"></i>');
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(2)").append(resp.data[i].transmissionType);

                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(4)").children(":eq(0)").children(":eq(0)").text("Rs." + resp.data[i].priceRate.dailyRate);
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(4)").children(":eq(1)").children(":eq(0)").text("Rs." + resp.data[i].priceRate.monthlyRate);

                        j++;
                    }
                }

                for (let i = 0; i < $("#carsCollection > .carDetails_section").children().length; i++) {
                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).css('display', 'flex');
                }

                for (let i = carCount; i < $("#carsCollection > .carDetails_section").children().length; i++) {
                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).css('display', 'none');
                }
            } else {
                console.log("Hureee")
                for (let i = 0; i < $("#carsCollection > .carDetails_section").children().length; i++) {
                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).css('display', 'none');
                }
            }
        }
    });
}

$('#diesel').on('click', function () {
    var fuelType = "Diesel";
    loadAllCarsByFuelType(fuelType);
});

$('#petrol').on('click', function () {
    var fuelType = "Petrol";
    loadAllCarsByFuelType(fuelType);
});

function loadAllCarsByTransmissionType(transmissionType) {
    var availableCount = 0;
    var carCount = 0;
    let j = 0;

    $.ajax({
        url: baseUrl + "car/sortFromCarBrand",
        method: "get",
        dataType: "json",
        async: false,
        success: function (resp) {
            if (resp.data != null) {
                for (let i = 0; i < resp.data.length; i++) {
                    if (resp.data[i].transmissionType == transmissionType) {
                        carCount++;
                        console.log(resp.data[i]);

                        $.ajax({
                            url: baseUrl + "car/getCarImages/" + resp.data[i].carId,
                            method: "get",
                            async: false,
                            dataType: "json",
                            success: function (resp) {
                                $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(1)").children(":eq(0)").attr('src', "../assets/img/uploads/carImages/" + resp.data.front);
                            }
                        });

                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(0)").children(":eq(1)").text(resp.data[i].brand);
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(0)").children(":eq(2)").text("Free Km for Day - " + resp.data[i].freeMileage.dailyMileage + " Km");
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(0)").children(":eq(3)").text("Free Km for Month - " + resp.data[i].freeMileage.monthlyMileage + " Km");
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(0)").children(":eq(4)").text("Price Per Extra Km - " + resp.data[i].pricePerExtraKM + " LKR");

                        $.ajax({
                            url: baseUrl + "car/" + resp.data[i].brand + "/Available",
                            method: "get",
                            dataType: "json",
                            async: false,
                            success: function (resp) {
                                $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(0)").children(":eq(5)").text("Available Car Qty - " + resp.data);

                                if (resp.data > 0) {
                                    availableCount += resp.data;
                                }
                            }
                        });

                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(2)").children(":eq(0)").text(resp.data[i].brand);

                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(0)").empty();
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(0)").append('<i class="fa-solid fa-gas-pump"></i>');
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(0)").append(resp.data[i].fuelType);

                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(1)").empty();
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(1)").append('<i class="fa-solid fa-users"></i>');
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(1)").append(resp.data[i].numOfPassengers);

                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(2)").empty();
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(2)").append('<i class="fa-solid fa-gear"></i>');
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(2)").append(resp.data[i].transmissionType);

                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(4)").children(":eq(0)").children(":eq(0)").text("Rs." + resp.data[i].priceRate.dailyRate);
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(4)").children(":eq(1)").children(":eq(0)").text("Rs." + resp.data[i].priceRate.monthlyRate);

                        j++;
                    }
                }

                for (let i = 0; i < $("#carsCollection > .carDetails_section").children().length; i++) {
                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).css('display', 'flex');
                }

                for (let i = carCount; i < $("#carsCollection > .carDetails_section").children().length; i++) {
                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).css('display', 'none');
                }
            } else {
                console.log("Hureee")
                for (let i = 0; i < $("#carsCollection > .carDetails_section").children().length; i++) {
                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).css('display', 'none');
                }
            }
        }
    });
}

$('#auto').on('click', function () {
    var transmissionType = "Auto";
    loadAllCarsByTransmissionType(transmissionType);
});

$('#manual').on('click', function () {
    var transmissionType = "Manual";
    loadAllCarsByTransmissionType(transmissionType);
});

function loadAllCarsByNumOfPassengers(noOfPassengers) {
    var availableCount = 0;
    var carCount = 0;
    let j = 0;

    $.ajax({
        url: baseUrl + "car/sortFromCarBrand",
        method: "get",
        dataType: "json",
        async: false,
        success: function (resp) {
            if (resp.data != null) {
                for (let i = 0; i < resp.data.length; i++) {
                    if (resp.data[i].numOfPassengers == noOfPassengers) {
                        carCount++;
                        console.log(resp.data[i]);

                        $.ajax({
                            url: baseUrl + "car/getCarImages/" + resp.data[i].carId,
                            method: "get",
                            async: false,
                            dataType: "json",
                            success: function (resp) {
                                $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(1)").children(":eq(0)").attr('src', "../assets/img/uploads/carImages/" + resp.data.front);
                            }
                        });

                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(0)").children(":eq(1)").text(resp.data[i].brand);
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(0)").children(":eq(2)").text("Free Km for Day - " + resp.data[i].freeMileage.dailyMileage + " Km");
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(0)").children(":eq(3)").text("Free Km for Month - " + resp.data[i].freeMileage.monthlyMileage + " Km");
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(0)").children(":eq(4)").text("Price Per Extra Km - " + resp.data[i].pricePerExtraKM + " LKR");

                        $.ajax({
                            url: baseUrl + "car/" + resp.data[i].brand + "/Available",
                            method: "get",
                            dataType: "json",
                            async: false,
                            success: function (resp) {
                                $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(0)").children(":eq(5)").text("Available Car Qty - " + resp.data);

                                if (resp.data > 0) {
                                    availableCount += resp.data;
                                }
                            }
                        });

                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(2)").children(":eq(0)").text(resp.data[i].brand);

                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(0)").empty();
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(0)").append('<i class="fa-solid fa-gas-pump"></i>');
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(0)").append(resp.data[i].fuelType);

                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(1)").empty();
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(1)").append('<i class="fa-solid fa-users"></i>');
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(1)").append(resp.data[i].numOfPassengers);

                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(2)").empty();
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(2)").append('<i class="fa-solid fa-gear"></i>');
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(2)").append(resp.data[i].transmissionType);

                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(4)").children(":eq(0)").children(":eq(0)").text("Rs." + resp.data[i].priceRate.dailyRate);
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(4)").children(":eq(1)").children(":eq(0)").text("Rs." + resp.data[i].priceRate.monthlyRate);

                        j++;
                    }
                }

                for (let i = 0; i < $("#carsCollection > .carDetails_section").children().length; i++) {
                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).css('display', 'flex');
                }

                for (let i = carCount; i < $("#carsCollection > .carDetails_section").children().length; i++) {
                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).css('display', 'none');
                }
            } else {
                console.log("Hureee")
                for (let i = 0; i < $("#carsCollection > .carDetails_section").children().length; i++) {
                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).css('display', 'none');
                }
            }
        }
    });
}

$('#four').on('click', function () {
    var numOfPassengers = "4";
    loadAllCarsByNumOfPassengers(numOfPassengers);
});

$('#six').on('click', function () {
    var numOfPassengers = "6";
    loadAllCarsByNumOfPassengers(numOfPassengers);
});

$('#eight').on('click', function () {
    var numOfPassengers = "8";
    loadAllCarsByNumOfPassengers(numOfPassengers);
});

function loadAllCarsByCarPrice(price) {
    var availableCount = 0;
    var carCount = 0;
    let j = 0;

    $.ajax({
        url: baseUrl + "car/sortFromCarBrand",
        method: "get",
        dataType: "json",
        async: false,
        success: function (resp) {
            if (resp.data != null) {
                for (let i = 0; i < resp.data.length; i++) {
                    if (parseFloat(resp.data[i].priceRate.dailyRate) == parseFloat(price) || parseFloat(resp.data[i].priceRate.monthlyRate) == parseFloat(price)) {
                        carCount++;
                        console.log(resp.data[i]);

                        $.ajax({
                            url: baseUrl + "car/getCarImages/" + resp.data[i].carId,
                            method: "get",
                            async: false,
                            dataType: "json",
                            success: function (resp) {
                                $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(1)").children(":eq(0)").attr('src', "../assets/img/uploads/carImages/" + resp.data.front);
                            }
                        });

                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(0)").children(":eq(1)").text(resp.data[i].brand);
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(0)").children(":eq(2)").text("Free Km for Day - " + resp.data[i].freeMileage.dailyMileage + " Km");
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(0)").children(":eq(3)").text("Free Km for Month - " + resp.data[i].freeMileage.monthlyMileage + " Km");
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(0)").children(":eq(4)").text("Price Per Extra Km - " + resp.data[i].pricePerExtraKM + " LKR");

                        $.ajax({
                            url: baseUrl + "car/" + resp.data[i].brand + "/Available",
                            method: "get",
                            dataType: "json",
                            async: false,
                            success: function (resp) {
                                $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(0)").children(":eq(5)").text("Available Car Qty - " + resp.data);

                                if (resp.data > 0) {
                                    availableCount += resp.data;
                                }
                            }
                        });

                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(2)").children(":eq(0)").text(resp.data[i].brand);

                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(0)").empty();
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(0)").append('<i class="fa-solid fa-gas-pump"></i>');
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(0)").append(resp.data[i].fuelType);

                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(1)").empty();
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(1)").append('<i class="fa-solid fa-users"></i>');
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(1)").append(resp.data[i].numOfPassengers);

                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(2)").empty();
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(2)").append('<i class="fa-solid fa-gear"></i>');
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(2)").append(resp.data[i].transmissionType);

                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(4)").children(":eq(0)").children(":eq(0)").text("Rs." + resp.data[i].priceRate.dailyRate);
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(4)").children(":eq(1)").children(":eq(0)").text("Rs." + resp.data[i].priceRate.monthlyRate);

                        j++;
                    }
                }

                for (let i = 0; i < $("#carsCollection > .carDetails_section").children().length; i++) {
                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).css('display', 'flex');
                }

                for (let i = carCount; i < $("#carsCollection > .carDetails_section").children().length; i++) {
                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).css('display', 'none');
                }
            } else {
                console.log("Hureee")
                for (let i = 0; i < $("#carsCollection > .carDetails_section").children().length; i++) {
                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).css('display', 'none');
                }
            }
        }
    });
}

$('#txtEnterPrice').on('keyup', function () {
    if ($('#txtEnterPrice').val() != '') {
        var carPrice = $('#txtEnterPrice').val();
        loadAllCarsByCarPrice(carPrice);
    } else {
        for (let i = 0; i < $("#carsCollection > .carDetails_section").children().length; i++) {
            $("#carsCollection > .carDetails_section").children(`:eq(${i})`).css('display', 'none');
        }
    }
});

/*$('#btnSearch').on('click', function () {
    if ($('#txtPickUpDate').val() != '' && $('#txtReturnDate').val() != '') {

        // Code Logic


        //
        var availableCount = 0;
        var carCount = 0;
        let j = 0;

        $.ajax({
            url: baseUrl + "car/sortFromCarBrand",
            method: "get",
            dataType: "json",
            async: false,
            success: function (resp) {
                if (resp.data != null) {
                    for (let i = 0; i < resp.data.length; i++) {
                        $.ajax({
                            url: baseUrl + "rent",
                            method: "get",
                            success: function (res) {
                                if (res.data != null) {
                                    for (let rent of res.data) {
                                        console.log(new Date(rent.pickUpDate).toLocaleDateString() )
                                        if (!new Date($('#txtPickUpDate').val()).toLocaleDateString() >= new Date(rent.pickUpDate).toLocaleDateString() && !new Date($('#txtReturnDate').val()).toLocaleDateString() <= new Date(rent.returnDate).toLocaleDateString()) {
                                            carCount++;
                                            console.log(resp.data[i]);

                                            $.ajax({
                                                url: baseUrl + "car/getCarImages/" + resp.data[i].carId,
                                                method: "get",
                                                async: false,
                                                dataType: "json",
                                                success: function (resp) {
                                                    $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(1)").children(":eq(0)").attr('src', "../assets/img/uploads/carImages/" + resp.data.front);
                                                }
                                            });

                                            $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(0)").children(":eq(1)").text(resp.data[i].brand);
                                            $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(0)").children(":eq(2)").text("Free Km for Day - " + resp.data[i].freeMileage.dailyMileage + " Km");
                                            $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(0)").children(":eq(3)").text("Free Km for Month - " + resp.data[i].freeMileage.monthlyMileage + " Km");
                                            $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(0)").children(":eq(4)").text("Price Per Extra Km - " + resp.data[i].pricePerExtraKM + " LKR");

                                            $.ajax({
                                                url: baseUrl + "car/" + resp.data[i].brand + "/Available",
                                                method: "get",
                                                dataType: "json",
                                                async: false,
                                                success: function (resp) {
                                                    $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(0)").children(":eq(5)").text("Available Car Qty - " + resp.data);

                                                    if (resp.data > 0) {
                                                        availableCount += resp.data;
                                                    }
                                                }
                                            });

                                            $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(2)").children(":eq(0)").text(resp.data[i].brand);

                                            $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(0)").empty();
                                            $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(0)").append('<i class="fa-solid fa-gas-pump"></i>');
                                            $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(0)").append(resp.data[i].fuelType);

                                            $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(1)").empty();
                                            $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(1)").append('<i class="fa-solid fa-users"></i>');
                                            $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(1)").append(resp.data[i].numOfPassengers);

                                            $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(2)").empty();
                                            $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(2)").append('<i class="fa-solid fa-gear"></i>');
                                            $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(2)").append(resp.data[i].transmissionType);

                                            $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(4)").children(":eq(0)").children(":eq(0)").text("Rs." + resp.data[i].priceRate.dailyRate);
                                            $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(4)").children(":eq(1)").children(":eq(0)").text("Rs." + resp.data[i].priceRate.monthlyRate);

                                            j++;
                                        }
                                    }
                                }
                            }
                        });
                    }

                    for (let i = 0; i < $("#carsCollection > .carDetails_section").children().length; i++) {
                        $("#carsCollection > .carDetails_section").children(`:eq(${i})`).css('display', 'flex');
                    }

                    for (let i = carCount; i < $("#carsCollection > .carDetails_section").children().length; i++) {
                        $("#carsCollection > .carDetails_section").children(`:eq(${i})`).css('display', 'none');
                    }
                } else {
                    console.log("Hureee")
                    for (let i = 0; i < $("#carsCollection > .carDetails_section").children().length; i++) {
                        $("#carsCollection > .carDetails_section").children(`:eq(${i})`).css('display', 'none');
                    }
                }
            }
        });

    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "PickUp Date and Return Date Should be Specified to rent Your Dream Car..!"
        })
    }
});*/


/* ------------------------------------ Validations ------------------------------------ */
$('.prevent_tab_key_focus').on('keydown', function (event) {
    if (event.code === "Tab") {
        event.preventDefault();
    }
});

$("#btnSubmitRent").attr('disabled', true);

// Regex Patterns
const locationPattern = /^[A-z ]{2,20}$/;
const datePattern = /^[0-9]{4}(-)[0-9]{2}(-)[0-9]{2}$/;
const timePattern = /^[0-9]{2}(:)[0-9]{2}$/;

let bookingValidationsArray = [];

bookingValidationsArray.push({
    regEx: locationPattern,
    textField: $('#location')
});

bookingValidationsArray.push({
    regEx: datePattern,
    textField: $('#pickUpDate')
});

bookingValidationsArray.push({
    regEx: datePattern,
    textField: $('#returnDate')
});

bookingValidationsArray.push({
    regEx: timePattern,
    textField: $('#pickUpTime')
});

bookingValidationsArray.push({
    regEx: timePattern,
    textField: $('#returnTime')
});

function check(regEx, textField) {
    return regEx.test(textField.val());
}

function checkValidation(validationArray, button) {
    let errorCounts = 0;

    if ($('#uploadSlip')[0].files[0] == null) {
        errorCounts += 1;
    }

    for (let validation of validationArray) {
        if (validation.regEx.test(validation.textField.val())) {
            removeError(validation.textField, "");
        } else {
            addError(validation.textField);
            errorCounts += 1;
        }
    }
    enableOrDisableBtn(button, errorCounts);
}

$('#cmbSelectCarId').on('keydown', function (event) {
    if (event.code === "Enter" && $('#cmbSelectCarId').val() != null) {
        $('#location').focus();
    }
});
$('#location').on('keydown', function (event) {
    if (event.code === "Enter" && check(locationPattern, $('#location'))) {
        $('#pickUpTime').focus();
    }
});

$('#pickUpTime').on('keydown', function (event) {
    if (event.code === "Enter" && check(timePattern, $('#pickUpTime'))) {
        $('#pickUpDate').focus();
    }
});

$('#pickUpDate').on('keydown', function (event) {
    if (event.code === "Enter" && check(datePattern, $('#pickUpDate'))) {
        $('#returnTime').focus();
    }
});

$('#returnTime').on('keydown', function (event) {
    if (event.code === "Enter" && check(timePattern, $('#returnTime'))) {
        $('#returnDate').focus();
    }
});

$('#returnDate').on('keydown', function (event) {
    if (event.code === "Enter" && check(datePattern, $('#returnDate'))) {
        $('#driverAcceptanceField').focus();
    }
});

$('#driverAcceptanceField').on('keydown', function (event) {
    if (event.code === "Enter") {
        $('#uploadSlip').focus();
    }
});

$('#uploadSlip').on('keydown', function (event) {
    if (event.code === "Enter" && $('#uploadSlip')[0].files[0] != null) {
        $('#btnSubmitRent').focus();
    }
});

$("#location,#pickUpTime,#pickUpDate,#returnTime, #returnDate, #driverAcceptanceField, #uploadSlip").on('keyup', function () {
    checkValidation(bookingValidationsArray, $('#btnSubmitRent'));
});

$("#location,#pickUpTime,#pickUpDate,#returnTime, #returnDate, #driverAcceptanceField, #uploadSlip").on('blur', function () {
    checkValidation(bookingValidationsArray, $('#btnSubmitRent'));
});

$('#uploadSlip').on('click', function () {
    checkValidation(bookingValidationsArray, $('#btnSubmitRent'));
});

$("#uploadSlip").on('focus', function () {
    checkValidation(bookingValidationsArray, $('#btnSubmitRent'));
});

function removeError() {
    arguments[0].css('border', '2px solid green');
}

function addError(textField) {
    if (textField.val().length <= 0) {
        textField.css("border", "1px solid #ced4da");
    } else {
        textField.css('border', '2px solid red');
    }
}

function enableOrDisableBtn(button, errorCounts) {
    if (errorCounts > 0) {
        button.attr('disabled', true);
    } else {
        button.attr('disabled', false);
    }
}


