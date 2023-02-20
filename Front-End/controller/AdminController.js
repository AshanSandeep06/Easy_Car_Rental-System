let baseUrl = "http://localhost:8080/Back-End";

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

/* ---------------------------------------- Manage Vehicle ----------------------------------------------- */
$("#imagesUploader").on('change', function () {
    if ($("#all_Car_carousel_images").children().hasClass("active")) {
        var formData = new FormData($('#imageUploaderForm')[0]);

        $.ajax({
            url: baseUrl + "/imageController",
            type: "post",
            data: formData,
            contentType: false,
            processData: false,
            success: function (response) {
                if ($("#all_Car_carousel_images").children(":eq(0)").hasClass("active")) {
                    $("#all_Car_carousel_images").children(":eq(0)").children().attr('src', `data:image/png;base64,${response}`);
                } else if ($("#all_Car_carousel_images").children(":eq(1)").hasClass("active")) {
                    $("#all_Car_carousel_images").children(":eq(1)").children().attr('src', `data:image/png;base64,${response}`);
                } else if ($("#all_Car_carousel_images").children(":eq(2)").hasClass("active")) {
                    $("#all_Car_carousel_images").children(":eq(2)").children().attr('src', `data:image/png;base64,${response}`);
                } else {
                    $("#all_Car_carousel_images").children(":eq(3)").children().attr('src', `data:image/png;base64,${response}`);
                }
            }
        });
    }
});

/*$("#btnAddCar").on('click', function () {
    let formData = $("#manageVehicleForm").serialize();
    formData.append("", "");
});*/
