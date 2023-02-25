let baseUrl = "http://localhost:8080/Back-End/";

var username = location.search.substring(1);
console.log(username);

$(function () {
    $('#customerPage_home').css("display", "block");
    $('#customerPage_bookings').css("display", "none");
    $('#customerPage_rentStatus').css("display", "none");
    $('#customerPage_myProfile').css("display", "none");
    $('#carBookingMain').css("display", "none");
    loadAllCarsDetails();
});

$("#btnHome").on('click', function () {
    $('#customerPage_home').css("display", "block");
    $('#customerPage_bookings').css("display", "none");
    $('#customerPage_rentStatus').css("display", "none");
    $('#customerPage_myProfile').css("display", "none");
    $('#carBookingMain').css("display", "none");
    loadAllCarsDetails();
});

$("#btnMyBookings").on('click', function () {
    $('#customerPage_home').css("display", "none");
    $('#customerPage_bookings').css("display", "block");
    $('#customerPage_rentStatus').css("display", "none");
    $('#customerPage_myProfile').css("display", "none");
    $('#carBookingMain').css("display", "none");
});

$("#btnBookingsStatus").on('click', function () {
    $('#customerPage_home').css("display", "none");
    $('#customerPage_bookings').css("display", "none");
    $('#customerPage_rentStatus').css("display", "block");
    $('#customerPage_myProfile').css("display", "none");
    $('#carBookingMain').css("display", "none");
});

$("#btnCustomerProfile").on('click', function () {
    $('#customerPage_home').css("display", "none");
    $('#customerPage_bookings').css("display", "none");
    $('#customerPage_rentStatus').css("display", "none");
    $('#customerPage_myProfile').css("display", "block");
    $('#carBookingMain').css("display", "none");
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

    $.ajax({
        url: baseUrl + "car/sortFromCarBrand",
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
                            $("#carsCollection > section:first-child").children(`:eq(${i})`).children(":eq(1)").children(":eq(0)").attr('src', "../assets/img/uploads/carImages/" + resp.data.front);
                        }
                    });

                    $("#carsCollection > section:first-child").children(`:eq(${i})`).children(":eq(0)").children(":eq(1)").text(resp.data[i].brand);
                    $("#carsCollection > section:first-child").children(`:eq(${i})`).children(":eq(0)").children(":eq(2)").text("Free Km for Day - " + resp.data[i].freeMileage.dailyMileage + " Km");
                    $("#carsCollection > section:first-child").children(`:eq(${i})`).children(":eq(0)").children(":eq(3)").text("Free Km for Month - " + resp.data[i].freeMileage.monthlyMileage + " Km");
                    $("#carsCollection > section:first-child").children(`:eq(${i})`).children(":eq(0)").children(":eq(4)").text("Price Per Extra Km - " + resp.data[i].pricePerExtraKM + " LKR");

                    $.ajax({
                        url: baseUrl + "car/" + resp.data[i].brand + "/Available",
                        method: "get",
                        dataType: "json",
                        success: function (resp) {
                            $("#carsCollection > section:first-child").children(`:eq(${i})`).children(":eq(0)").children(":eq(5)").text("Available Car Qty - " + resp.data);
                        }
                    });

                    $("#carsCollection > section:first-child").children(`:eq(${i})`).children(":eq(2)").children(":eq(0)").text(resp.data[i].brand);

                    $("#carsCollection > section:first-child").children(`:eq(${i})`).children(":eq(3)").children(":eq(0)").empty();
                    $("#carsCollection > section:first-child").children(`:eq(${i})`).children(":eq(3)").children(":eq(0)").append('<i class="fa-solid fa-gas-pump"></i>');
                    $("#carsCollection > section:first-child").children(`:eq(${i})`).children(":eq(3)").children(":eq(0)").append(resp.data[i].fuelType);

                    $("#carsCollection > section:first-child").children(`:eq(${i})`).children(":eq(3)").children(":eq(1)").empty();
                    $("#carsCollection > section:first-child").children(`:eq(${i})`).children(":eq(3)").children(":eq(1)").append('<i class="fa-solid fa-users"></i>');
                    $("#carsCollection > section:first-child").children(`:eq(${i})`).children(":eq(3)").children(":eq(1)").append(resp.data[i].numOfPassengers);

                    $("#carsCollection > section:first-child").children(`:eq(${i})`).children(":eq(3)").children(":eq(2)").empty();
                    $("#carsCollection > section:first-child").children(`:eq(${i})`).children(":eq(3)").children(":eq(2)").append('<i class="fa-solid fa-gear"></i>');
                    $("#carsCollection > section:first-child").children(`:eq(${i})`).children(":eq(3)").children(":eq(2)").append(resp.data[i].transmissionType);

                    $("#carsCollection > section:first-child").children(`:eq(${i})`).children(":eq(4)").children(":eq(0)").children(":eq(0)").text("Rs." + resp.data[i].priceRate.dailyRate);
                    $("#carsCollection > section:first-child").children(`:eq(${i})`).children(":eq(4)").children(":eq(1)").children(":eq(0)").text("Rs." + resp.data[i].priceRate.monthlyRate);
                }

                for (let i = 0; i < $("#carsCollection > section:first-child").children().length; i++) {
                    $("#carsCollection > section:first-child").children(`:eq(${i})`).css('display', 'flex');
                }

                for (let i = resp.data.length; i < $("#carsCollection > section:first-child").children().length; i++) {
                    $("#carsCollection > section:first-child").children(`:eq(${i})`).css('display', 'none');
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
                            $("#carsCollection > section:first-child").children(`:eq(${i})`).children(":eq(1)").children(":eq(0)").attr('src', "../assets/img/uploads/carImages/" + resp.data.front);
                        }
                    });

                    $("#carsCollection > section:first-child").children(`:eq(${i})`).children(":eq(0)").children(":eq(1)").text(resp.data[i].brand);
                    $("#carsCollection > section:first-child").children(`:eq(${i})`).children(":eq(0)").children(":eq(2)").text("Free Km for Day - " + resp.data[i].freeMileage.dailyMileage + " Km");
                    $("#carsCollection > section:first-child").children(`:eq(${i})`).children(":eq(0)").children(":eq(3)").text("Free Km for Month - " + resp.data[i].freeMileage.monthlyMileage + " Km");
                    $("#carsCollection > section:first-child").children(`:eq(${i})`).children(":eq(0)").children(":eq(4)").text("Price Per Extra Km - " + resp.data[i].pricePerExtraKM + " LKR");

                    $.ajax({
                        url: baseUrl + "car/" + resp.data[i].brand + "/Available",
                        method: "get",
                        dataType: "json",
                        success: function (resp) {
                            $("#carsCollection > section:first-child").children(`:eq(${i})`).children(":eq(0)").children(":eq(5)").text("Available Car Qty - " + resp.data);
                        }
                    });

                    $("#carsCollection > section:first-child").children(`:eq(${i})`).children(":eq(2)").children(":eq(0)").text(resp.data[i].brand);

                    $("#carsCollection > section:first-child").children(`:eq(${i})`).children(":eq(3)").children(":eq(0)").empty();
                    $("#carsCollection > section:first-child").children(`:eq(${i})`).children(":eq(3)").children(":eq(0)").append('<i class="fa-solid fa-gas-pump"></i>');
                    $("#carsCollection > section:first-child").children(`:eq(${i})`).children(":eq(3)").children(":eq(0)").append(resp.data[i].fuelType);

                    $("#carsCollection > section:first-child").children(`:eq(${i})`).children(":eq(3)").children(":eq(1)").empty();
                    $("#carsCollection > section:first-child").children(`:eq(${i})`).children(":eq(3)").children(":eq(1)").append('<i class="fa-solid fa-users"></i>');
                    $("#carsCollection > section:first-child").children(`:eq(${i})`).children(":eq(3)").children(":eq(1)").append(resp.data[i].numOfPassengers);

                    $("#carsCollection > section:first-child").children(`:eq(${i})`).children(":eq(3)").children(":eq(2)").empty();
                    $("#carsCollection > section:first-child").children(`:eq(${i})`).children(":eq(3)").children(":eq(2)").append('<i class="fa-solid fa-gear"></i>');
                    $("#carsCollection > section:first-child").children(`:eq(${i})`).children(":eq(3)").children(":eq(2)").append(resp.data[i].transmissionType);

                    $("#carsCollection > section:first-child").children(`:eq(${i})`).children(":eq(4)").children(":eq(0)").children(":eq(0)").text("Rs." + resp.data[i].priceRate.dailyRate);
                    $("#carsCollection > section:first-child").children(`:eq(${i})`).children(":eq(4)").children(":eq(1)").children(":eq(0)").text("Rs." + resp.data[i].priceRate.monthlyRate);

                    for (let i = 0; i < $("#carsCollection > section:first-child").children().length; i++) {
                        $("#carsCollection > section:first-child").children(`:eq(${i})`).css('display', 'flex');
                    }

                    for (let i = resp.data.length; i < $("#carsCollection > section:first-child").children().length; i++) {
                        $("#carsCollection > section:first-child").children(`:eq(${i})`).css('display', 'none');
                    }
                }
                return;
            }
            for (let i = 0; i < $("#carsCollection > section:first-child").children().length; i++) {
                $("#carsCollection > section:first-child").children(`:eq(${i})`).css('display', 'none');
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
    $('#customerPage_home').css("display", "none");
    $('#carBookingMain').css("display", "flex");
    var carBrand = $(this).parent().parent().children(":eq(2)").children(":eq(0)").text();
    console.log(carBrand);
    loadAllCarsFromBrand(carBrand);
    loadCustomerDetails();
    generateNewRentalID();
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
        }
    }
});

$("#btnCancelRent").on('click', function () {
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
    // $("#driverAcceptanceField").is(":checked");
});

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
            driver: null
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
        var currentTime = fullDate.getHours() + ":" + fullDate.getMinutes();

        $.ajax({
            url: baseUrl + "rent",
            method: "post",
            data: JSON.stringify(rentObject),
            contentType: "application/json",
            dataType: "json",
            success: function (res) {
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

                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: res.message,
                            showConfirmButton: false,
                            timer: 1500
                        })
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






