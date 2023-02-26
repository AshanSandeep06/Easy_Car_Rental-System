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
    setCustomerProfileData();
    // viewMyActiveBookings();
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
                        // Edited 2023-02-25
                        async: false,
                        success: function (resp) {
                            $("#carsCollection > section:first-child").children(`:eq(${i})`).children(":eq(0)").children(":eq(5)").text("Available Car Qty - " + resp.data);

                            // Edited 2023-02-25
                            if (resp.data > 0) {
                                availableCount += resp.data;
                            }
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

                // Edited 2023-02-25 ((Meka thibune kalin --> resp.data.length) insteadof availableCount)
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
        if (fullDate.getMinutes() < 10) {
            currentTime = fullDate.getHours() + ":0" + fullDate.getMinutes();
        }

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

                    // <button type="button" class="btn btn-danger btnOptionCancelRent">Cancel Request</button>

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
        // error
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


$('#uploadNicImage, #uploadLicenseImage').change(function () {
    if ($('#uploadNicImage').val() != '' && $('#uploadLicenseImage').val() != '') {
        console.log("heyyyyy");
    }
});





