let baseUrl = "http://localhost:8080/Back-End/";

$("#adminDashboard").css('display', 'none');
$("#manageRentalRequests_section").css('display', 'none');
// $("#manageVehicle_section").css('display', 'none');
$("#manageBookings_section").css('display', 'none');
$("#manageCustomer_section").css('display', 'none');
$("#manageDriver_section").css('display', 'none');
$("#viewDriverSchedule_section").css('display', 'none');
$("#viewCarSchedule_section").css('display', 'none');
$("#adminProfile_section").css('display', 'none');
$("#manageRentDetails_section").css('display', 'none');
$("#managePayment_section").css('display', 'none');

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

bindRowClickEvents();

function bindRowClickEvents() {
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

    });
}

/* =============================================================================== */

/* ---------------------------------------- Manage Vehicle Section ----------------------------------------------- */

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
    let formData = $("#manageCarForm").serialize();

    $.ajax({
        url: baseUrl + "car",
        method: "post",
        data: formData,
        success: function (res) {
            uploadCarImages($("#txtCarID").val());
            alert("Success Invoked..!");
        },

        error: function (error) {
            // alert(JSON.parse(error.responseText).message);
            alert("Error Invoking..!");
        }
    });
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
        url: baseUrl + "car/uploadCarImages",
        method: "PUT",
        contentType: false,
        processData: false,
        data: imagesData,
        success: function (res) {
            alert("Images Uploaded..!");
        }
    })
}
