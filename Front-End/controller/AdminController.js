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

// Add Car
$("#btnAddCar").on('click', function () {

});
