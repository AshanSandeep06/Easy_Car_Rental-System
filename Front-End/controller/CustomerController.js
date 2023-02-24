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

function loadAllCarsFromBrand(carBrand) {
    $("#cmbSelectCarId").empty();
    $("#cmbSelectCarId").append(`<option selected disabled>Select Car</option>`);

    $.ajax({
        url: baseUrl + "car",
        method: "get",
        success: function (resp) {
            for (let c1 of resp.data) {
                console.log("Awla : " + resp.data)
                if (c1.brand == carBrand && c1.availabilityType == "Available") {
                    $("#cmbSelectCarId").append(`<option>${c1.carId}</option>`);
                }
            }
        }
    });
}

$(".cars_btn").on('click', function () {
    $('#customerPage_home').css("display", "none");
    $('#carBookingMain').css("display", "flex");
    var carBrand = $(this).parent().parent().children(":eq(2)").children(":eq(0)").text();
    console.log(carBrand);
    loadAllCarsFromBrand(carBrand);
});











