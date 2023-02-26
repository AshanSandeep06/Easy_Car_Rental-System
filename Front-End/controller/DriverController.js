let baseUrl = "http://localhost:8080/Back-End/";

$(function () {
    $("#driverInformation_section").css("display", 'none');
    $("#driverSchedule_section").css("display", 'block');
});

$('#btnDriverSchedule').on('click', function (){
    $("#driverInformation_section").css("display", 'none');
    $("#driverSchedule_section").css("display", 'block');
});

$('#btnDriverInformation').on('click', function (){
    $("#driverInformation_section").css("display", 'block');
    $("#driverSchedule_section").css("display", 'none');
});

function loadAllDriversSchedule() {
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
}