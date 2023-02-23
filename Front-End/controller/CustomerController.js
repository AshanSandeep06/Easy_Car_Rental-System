let baseUrl = "http://localhost:8080/Back-End/";

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
function clearHomePageFields() {
    $("#cmbSelectCarType").val("Select Car Type");
    $("#txtPickUpDate").val("");
    $("#txtReturnDate").val("");
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
            if(resp.data != null){
                for (let car of resp.data) {
                    console.log(car.carId)
                }
            }
            clearHomePageFields();
        }
    });
}











