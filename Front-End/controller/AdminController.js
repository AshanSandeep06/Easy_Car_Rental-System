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
    var frontImageName = carId + "-front-" + $('#frontCarImageUploader')[0].files[0].name;

    var backImage = $('#backCarImageUploader')[0].files[0];
    var backImageName = carId + "-back-" + $('#backCarImageUploader')[0].files[0].name;

    var sideImage = $('#sideCarImageUploader')[0].files[0];
    var sideImageName = carId + "-side-" + $('#sideCarImageUploader')[0].files[0].name;

    var interiorImage = $('#interiorCarImageUploader')[0].files[0];
    var interiorImageName = carId + "-interior-" + $('#interiorCarImageUploader')[0].files[0].name;

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
            // $("#carInterior_image").attr('src', `data:image/png;base64,${res}`);
            alert("Images Uploaded..!");
        }
    })
}
