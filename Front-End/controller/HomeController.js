$(function () {
    $("#resetPasswordForm").css('display', 'none');
});

$("#btnForgotPassword").click(function () {
    $("#loginFormHeader").text("Reset Password Form");
    $("#loginFormBody").css('display', 'none');
    $("#resetPasswordForm").css('display', 'block');
});

$("#btnCloseLoginForm").click(function () {
    $("#loginFormHeader").text("Login Form");
    $("#loginFormBody").css('display', 'flex');
    $("#resetPasswordForm").css('display', 'none');
});

$("#btnCancelResetPassword").click(function () {
    $("#loginFormHeader").text("Login Form");
    $("#loginFormBody").css('display', 'flex');
    $("#resetPasswordForm").css('display', 'none');
});

// Set Nic Image
$("#uploadNicImage").on('change', function (e) {
    let file = e.target.files;
    if (FileReader && file && file.length) {
        let reader = new FileReader();
        reader.onload = function () {
            $("#customerNicImage").attr('src', reader.result);
        }
        reader.readAsDataURL(file[0]);
    }
});

// Set License Image
$("#uploadLicenseImage").on('change', function (e) {
    let file = e.target.files;
    if (FileReader && file && file.length) {
        let reader = new FileReader();
        reader.onload = function () {
            $("#customerLicenseImage").attr('src', reader.result);
        }
        reader.readAsDataURL(file[0]);
    }
});

$("#btnCancel_registerForm").on('click', function () {
    $("#txtCustomerName").val("");
    $("#txtCusUsername").val("");
    $("#txtCusPassword").val("");
    $("#txtCustomerAddress").val("");
    $("#txtCustomerContact").val("");
    $("#txtCustomerEmail").val("");
    $("#txtCustomerNic").val("");
    $("#txtCustomerLicenseNo").val("");

    // Clear file choosers
    $("#uploadNicImage").val("");
    $("#uploadLicenseImage").val("");

    // Clear images
    $("#customerNicImage").attr('src', "");
    $("#customerLicenseImage").attr('src', "");
});

// Customer Registration
$("#btnRegister_registerForm").on('click', function () {
    let cusObject = {
        carId: $("#txtCarID").val(),
        registerNum: $("#txtRegNo").val(),
        brand: $("#txtCarBrand").val(),
        type: $("#txtCarType").val(),
        priceRate: {dailyRate: dailyRate, monthlyRate: monthlyRate},
        freeMileage: {dailyMileage: dailyMileage, monthlyMileage: monthlyMileage},
        color: $("#txtCarColor").val(),
        transmissionType: $("#txtTransmissionType").val(),
        numOfPassengers: $("#txtNoOfPassengers").val(),
        fuelType: $("#txtFuelType").val(),
        pricePerExtraKM: $("#txtPricePerExtraKm").val(),
        lossDamageWaiver: $("#txtLDWPayment").val(),
        lastServiceMileage: $("#txtLastServiceMileage").val(),
        availabilityType: $("#txtAvailabilityType").val(),
    };

    if ($('#frontCarImageUploader')[0].files[0] != null && $('#backCarImageUploader')[0].files[0] != null && $('#sideCarImageUploader')[0].files[0] != null && $('#interiorCarImageUploader')[0].files[0] != null) {
        $.ajax({
            url: baseUrl + "car",
            method: "post",
            data: JSON.stringify(carObject),
            contentType: "application/json",
            success: function (res) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Car has been Successfully Saved',
                    showConfirmButton: false,
                    timer: 1500
                })

                uploadCarImages($("#txtCarID").val());
                loadAllCars();
            },
            error: function (error) {
                alert(JSON.parse(error.responseText).message);
            }
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'You Should Provide Car Images, Therefore, Can\'t be Save the Car'
        })
    }
});