let baseUrl = "http://localhost:8080/Back-End/";
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
    clearCustomerRegistrationFields();
});

function clearCustomerRegistrationFields() {
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
}

function generateNewCustomerID() {
    let customerId;
    $.ajax({
        url: baseUrl + "customer/generateNewCustomerID",
        method: "get",
        dataType: "json",
        async: false,
        success: function (res) {
            console.log(res.data)
            customerId = res.data;
        },

        error: function (error) {
            alert(JSON.parse(error.responseText).message);
        }
    });
    return customerId;
}

// Customer Registration
$("#btnRegister_registerForm").on('click', function () {
    let username = $("#txtCusUsername").val();
    let password = $("#txtCusPassword").val();
    let role = "Customer";

    let cusObject = {
        customerId: generateNewCustomerID(),
        nic: $("#txtCustomerNic").val(),
        name: $("#txtCustomerName").val(),
        email: $("#txtCustomerEmail").val(),
        address: $("#txtCustomerAddress").val(),
        contactNumber: $("#txtCustomerContact").val(),
        licenseNo: $("#txtCustomerLicenseNo").val(),
        user_credentials: username
    };

    let userObject = {username: username, password: password, role: role};

    if ($('#uploadNicImage')[0].files[0] != null && $('#uploadLicenseImage')[0].files[0] != null) {
        $.ajax({
            url: baseUrl + "user_credentials",
            method: "post",
            data: JSON.stringify(userObject),
            contentType: "application/json",
            dataType: "json",
            success: function (res) {
                $.ajax({
                    url: baseUrl + "customer",
                    method: "post",
                    data: JSON.stringify(cusObject),
                    contentType: "application/json",

                    success: function (res) {
                        uploadCustomerNicAndLicenseImages(cusObject.customerId);
                        clearCustomerRegistrationFields();

                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Customer has been Successfully Registered', // res.message
                            showConfirmButton: false,
                            timer: 1500
                        })
                    },
                    error: function (error) {
                        // alert(JSON.parse(error.responseText).message);
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Customer Registration was failed..!'
                        })
                    }
                });
            },
            error: function (error) {
                // alert(JSON.parse(error.responseText).message);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Customer Registration was failed..!'
                })
            }
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'You Should Provide your NIC and License Images Therefore, Customer Registration was failed..!'
        })
    }
});

function uploadCustomerNicAndLicenseImages(customerId) {
    var nicImage = $('#uploadNicImage')[0].files[0];
    var nicImageName = customerId + "_NIC-image." + $('#uploadNicImage')[0].files[0].name.split(".")[1];

    var licenseImage = $('#uploadLicenseImage')[0].files[0];
    var licenseImageName = customerId + "_License-image." + $('#uploadLicenseImage')[0].files[0].name.split(".")[1];

    console.log(nicImageName + " " + licenseImageName);

    let formData = new FormData();
    formData.append("nicImage", nicImage, nicImageName);
    formData.append("licenseImage", licenseImage, licenseImageName);

    $.ajax({
        url: baseUrl + "customer/uploadCustomerImages/" + customerId,
        method: "PUT",
        contentType: false,
        processData: false,
        data: formData,

        success: function (res) {
            alert("Customer Images Uploaded Successfully..!"); // res.message
        },
        error: function (error) {
            alert(JSON.parse(error.responseText).message);
        }
    })
}

// User Login
$("#btnUserLogin").on('click', function () {
    let user = null;
    if ($("#txtUserName").val() != '' && $("#txtUserPassword").val() != '') {
        $.ajax({
            url: baseUrl + "user_credentials/verifyLogin?username=" + $("#txtUserName").val() + "&password=" + $("#txtUserPassword").val(),
            method: "get",
            dataType: "json",
            async: false,
            success: function (res) {
                user = res.data;
                $("#txtUserName").val("");
                $("#txtUserPassword").val("");

                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: res.message,
                    showConfirmButton: false,
                    timer: 1500
                })
            },

            error: function (error) {
                $("#txtUserName").val("");
                $("#txtUserPassword").val("");

                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: JSON.parse(error.responseText).message
                })
            }
        });

        if (user != null) {
            if (user.role == "Admin") {
                $("#btnUserLogin > a").attr("target", "-_self");
                $("#btnUserLogin > a").attr("href", "view/adminPage.html");

            } else if (user.role == "Driver") {
                $("#btnUserLogin > a").attr("target", "-_self");
                $("#btnUserLogin > a").attr("href", "view/driverPage.html");
            }
            if (user.role == "Customer") {
                $("#btnUserLogin > a").attr("target", "-_self");
                $("#btnUserLogin > a").attr("href", "view/customerPage.html");
            }
        }
    } else {
        $("#txtUserName").val("");
        $("#txtUserPassword").val("");

        Swal.fire({
            icon: 'error',
            title: 'Login Fields Are Empty..!',
            text: 'Please Be Aware to Enter Username and Password'
        })
    }

});