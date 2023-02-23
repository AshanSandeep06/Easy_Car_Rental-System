$(function () {
    $('#customerPage_home').css("display", "block");
    $('#customerPage_bookings').css("display", "none");
    $('#customerPage_rentStatus').css("display", "none");
    $('#customerPage_myProfile').css("display", "none");
    loadAllCarsDetails();
});

$("#btnHome").on('click', function () {
    $('#customerPage_home').css("display", "block");
    $('#customerPage_bookings').css("display", "none");
    $('#customerPage_rentStatus').css("display", "none");
    $('#customerPage_myProfile').css("display", "none");
});

$("#btnMyBookings").on('click', function () {
    $('#customerPage_home').css("display", "none");
    $('#customerPage_bookings').css("display", "block");
    $('#customerPage_rentStatus').css("display", "none");
    $('#customerPage_myProfile').css("display", "none");
});

$("#btnBookingsStatus").on('click', function () {
    $('#customerPage_home').css("display", "none");
    $('#customerPage_bookings').css("display", "none");
    $('#customerPage_rentStatus').css("display", "block");
    $('#customerPage_myProfile').css("display", "none");
});

$("#btnCustomerProfile").on('click', function () {
    $('#customerPage_home').css("display", "none");
    $('#customerPage_bookings').css("display", "none");
    $('#customerPage_rentStatus').css("display", "none");
    $('#customerPage_myProfile').css("display", "block");
});

$(".cars_btn").on('click', function () {
    $(".cars_btn > a").attr({
        "target": "_self",
        "href": "carBooking.html"
    });
});

/*----------------------------- Load All Vehicles data -----------------------------------*/
function loadAllCarsDetails() {
    // $("#tblManageVehicle>tbody").empty();

    $.ajax({
        url: baseUrl + "car",
        method: "get",
        dataType: "json",
        success: function (resp) {
            for (let car of resp.data) {
                var row = "<tr><td>" + car.carId + "</td><td>" + car.registerNum + "</td><td>" + car.brand + "</td><td>" + car.type + "</td><td>" + car.priceRate.dailyRate + "</td><td>" + car.priceRate.monthlyRate + "</td><td>" + car.freeMileage.dailyMileage + "</td><td>" + car.freeMileage.monthlyMileage + "</td><td>" + car.color + "</td><td>" + car.transmissionType + "</td><td>" + car.numOfPassengers + "</td><td>" + car.fuelType + "</td><td>" + car.pricePerExtraKM + "</td><td>" + car.lossDamageWaiver + "</td><td>" + car.lastServiceMileage + "</td><td>" + car.availabilityType + "</td></tr>";
                $("#tblManageVehicle").append(row);
            }
            clearSortingSectionRadioButtons();
            $("#txtCarID").focus();
        }
    });
}

function clearSortingSectionRadioButtons() {
    if ($("#sortingSection input").attr('type') == "radio") {
        // $('#sortingSection input[type="radio"] + label').text();
    }
}











