let baseUrl = "http://localhost:8085/Back_End_war/";
$(function () {
    $("#resetPasswordForm").css('display', 'none');
    $('#sortingContainer').children().css('display', 'none');
    loadAllCarsDetails();
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

    $("#txtResetUsername").val("");
    $("#txtResetNewPassword").val("");
    $("#txtResetConfirmPassword").val("");
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
                    async: false,
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
                sessionStorage.setItem("userData", user);

                $("#btnUserLogin > a").attr("target", "_self");
                $("#btnUserLogin > a").attr("href", "view/adminPage.html?" + user.username);

            } else if (user.role == "Driver") {
                sessionStorage.setItem("userData", user);

                $("#btnUserLogin > a").attr("target", "_self");
                $("#btnUserLogin > a").attr("href", "view/driverPage.html?" + user.username);
            }
            if (user.role == "Customer") {
                sessionStorage.setItem("userData", user);

                $("#btnUserLogin > a").attr("target", "_self");
                $("#btnUserLogin > a").attr("href", "view/customerPage.html?" + user.username);
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

// Reset Password Function
$("#btnResetPassword").on('click', function () {
    if ($("#txtResetUsername").val() != '' && $("#txtResetNewPassword").val() != '' && $("#txtResetConfirmPassword").val() != '') {
        if ($("#txtResetNewPassword").val() === $("#txtResetConfirmPassword").val()) {
            let resetUserObject = {
                username: $("#txtResetUsername").val(),
                password: $("#txtResetConfirmPassword").val()
            };

            $.ajax({
                url: baseUrl + "user_credentials/resetPassword",
                method: "put",
                data: JSON.stringify(resetUserObject),
                contentType: "application/json",
                dataType: "json",
                success: function (res) {
                    $("#txtResetUsername").val("");
                    $("#txtResetNewPassword").val("");
                    $("#txtResetConfirmPassword").val("");

                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: res.message,
                        showConfirmButton: false,
                        timer: 1500
                    })
                },

                error: function (error) {
                    $("#txtResetUsername").val("");
                    $("#txtResetNewPassword").val("");
                    $("#txtResetConfirmPassword").val("");

                    Swal.fire({
                        icon: 'error',
                        title: 'Password Reset Failed',
                        text: JSON.parse(error.responseText).message
                    })
                }
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Execution',
                text: 'Password Fields doesn\'t Match, Please enter the Password Correctly..!'
            })
        }
    } else {
        $("#txtResetUsername").val("");
        $("#txtResetNewPassword").val("");
        $("#txtResetConfirmPassword").val("");

        Swal.fire({
            icon: 'error',
            title: 'Reset Password Fields Are Empty..!',
            text: 'Please Be Aware to Fill all the Fields'
        })
    }
});

$(".cars_btn").on('click', function () {
    Swal.fire(
        'Want to Book a Car Now ?',
        'You Must Register or Login First',
        'question'
    )
});

$('#txtSortingType').on('change', function () {
    if ($('#txtSortingType') != null) {
        if ($('#txtSortingType').val() === "Type") {
            $('#vehicleTypeRow').css('display', 'flex');
            $('#brandRow').css('display', 'none');
            $('#fuelTypeRow').css('display', 'none');
            $('#transmissionTypeRow').css('display', 'none');
            $('#priceRow').css('display', 'none');
            $('#NoOfPassengersRow').css('display', 'none');

        } else if ($('#txtSortingType').val() === "Brand") {
            $('#vehicleTypeRow').css('display', 'none');
            $('#brandRow').css('display', 'flex');
            $('#fuelTypeRow').css('display', 'none');
            $('#transmissionTypeRow').css('display', 'none');
            $('#priceRow').css('display', 'none');
            $('#NoOfPassengersRow').css('display', 'none');

        } else if ($('#txtSortingType').val() === "Fuel Type") {
            $('#vehicleTypeRow').css('display', 'none');
            $('#brandRow').css('display', 'none');
            $('#fuelTypeRow').css('display', 'flex');
            $('#transmissionTypeRow').css('display', 'none');
            $('#priceRow').css('display', 'none');
            $('#NoOfPassengersRow').css('display', 'none');

        } else if ($('#txtSortingType').val() === "Transmission Type") {
            $('#vehicleTypeRow').css('display', 'none');
            $('#brandRow').css('display', 'none');
            $('#fuelTypeRow').css('display', 'none');
            $('#transmissionTypeRow').css('display', 'flex');
            $('#priceRow').css('display', 'none');
            $('#NoOfPassengersRow').css('display', 'none');

        } else if ($('#txtSortingType').val() === "Price") {
            $('#vehicleTypeRow').css('display', 'none');
            $('#brandRow').css('display', 'none');
            $('#fuelTypeRow').css('display', 'none');
            $('#transmissionTypeRow').css('display', 'none');
            $('#priceRow').css('display', 'flex');
            $('#NoOfPassengersRow').css('display', 'none');

        } else {
            $('#vehicleTypeRow').css('display', 'none');
            $('#brandRow').css('display', 'none');
            $('#fuelTypeRow').css('display', 'none');
            $('#transmissionTypeRow').css('display', 'none');
            $('#priceRow').css('display', 'none');
            $('#NoOfPassengersRow').css('display', 'flex');

        }
    }
});

function loadAllCarsDetails() {
    var availableCount = 0;

    $.ajax({
        url: baseUrl + "car/sortFromCarBrand",
        method: "get",
        dataType: "json",
        async: false,
        success: function (resp) {
            if (resp.data != null) {
                for (let i = 0; i < resp.data.length; i++) {
                    console.log(resp.data[i]);

                    $.ajax({
                        url: baseUrl + "car/getCarImages/" + resp.data[i].carId,
                        method: "get",
                        async: false,
                        dataType: "json",
                        success: function (resp) {
                            $("#carsCollection > .carDetails_section").children(`:eq(${i})`).children(":eq(1)").children(":eq(0)").attr('src', "../assets/img/uploads/carImages/" + resp.data.front);
                        }
                    });

                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).children(":eq(0)").children(":eq(1)").text(resp.data[i].brand);
                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).children(":eq(0)").children(":eq(2)").text("Free Km for Day - " + resp.data[i].freeMileage.dailyMileage + " Km");
                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).children(":eq(0)").children(":eq(3)").text("Free Km for Month - " + resp.data[i].freeMileage.monthlyMileage + " Km");
                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).children(":eq(0)").children(":eq(4)").text("Price Per Extra Km - " + resp.data[i].pricePerExtraKM + " LKR");

                    $.ajax({
                        url: baseUrl + "car/" + resp.data[i].brand + "/Available",
                        method: "get",
                        dataType: "json",
                        async: false,
                        success: function (resp) {
                            $("#carsCollection > .carDetails_section").children(`:eq(${i})`).children(":eq(0)").children(":eq(5)").text("Available Car Qty - " + resp.data);

                            if (resp.data > 0) {
                                availableCount += resp.data;
                            }
                        }
                    });

                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).children(":eq(2)").children(":eq(0)").text(resp.data[i].brand);

                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).children(":eq(3)").children(":eq(0)").empty();
                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).children(":eq(3)").children(":eq(0)").append('<i class="fa-solid fa-gas-pump"></i>');
                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).children(":eq(3)").children(":eq(0)").append(resp.data[i].fuelType);

                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).children(":eq(3)").children(":eq(1)").empty();
                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).children(":eq(3)").children(":eq(1)").append('<i class="fa-solid fa-users"></i>');
                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).children(":eq(3)").children(":eq(1)").append(resp.data[i].numOfPassengers);

                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).children(":eq(3)").children(":eq(2)").empty();
                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).children(":eq(3)").children(":eq(2)").append('<i class="fa-solid fa-gear"></i>');
                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).children(":eq(3)").children(":eq(2)").append(resp.data[i].transmissionType);

                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).children(":eq(4)").children(":eq(0)").children(":eq(0)").text("Rs." + resp.data[i].priceRate.dailyRate);
                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).children(":eq(4)").children(":eq(1)").children(":eq(0)").text("Rs." + resp.data[i].priceRate.monthlyRate);
                }

                for (let i = 0; i < $("#carsCollection > .carDetails_section").children().length; i++) {
                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).css('display', 'flex');
                }

                for (let i = resp.data.length; i < $("#carsCollection > .carDetails_section").children().length; i++) {
                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).css('display', 'none');
                }
            } else {
                console.log("Hureee")
                for (let i = 0; i < $("#carsCollection > .carDetails_section").children().length; i++) {
                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).css('display', 'none');
                }
            }
        }
    });
}

$('#btnClearSorting').on('click', function () {
    loadAllCarsDetails();

    $("#txtSortingType").empty();
    $("#txtSortingType").append(`<option selected disabled>Sort By</option>`);
    $("#txtSortingType").append(`<option>Type</option>`);
    $("#txtSortingType").append(`<option>Brand</option>`);
    $("#txtSortingType").append(`<option>Fuel Type</option>`);
    $("#txtSortingType").append(`<option>Transmission Type</option>`);
    $("#txtSortingType").append(`<option>Price</option>`);
    $("#txtSortingType").append(`<option>No Of Passengers</option>`);

    $('#vehicleTypeRow').css('display', 'none');
    $('#brandRow').css('display', 'none');
    $('#fuelTypeRow').css('display', 'none');
    $('#transmissionTypeRow').css('display', 'none');
    $('#priceRow').css('display', 'none');
    $('#NoOfPassengersRow').css('display', 'none');

    $('input:radio').prop('checked', false);
});

function loadAllCarsByCarType(carType) {
    var availableCount = 0;

    $.ajax({
        url: baseUrl + "car/" + carType,
        method: "get",
        dataType: "json",
        async: false,
        success: function (resp) {
            if (resp.data != null) {
                for (let i = 0; i < resp.data.length; i++) {
                    console.log(resp.data[i]);

                    $.ajax({
                        url: baseUrl + "car/getCarImages/" + resp.data[i].carId,
                        method: "get",
                        async: false,
                        dataType: "json",
                        success: function (resp) {
                            $("#carsCollection > .carDetails_section").children(`:eq(${i})`).children(":eq(1)").children(":eq(0)").attr('src', "../assets/img/uploads/carImages/" + resp.data.front);
                        }
                    });

                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).children(":eq(0)").children(":eq(1)").text(resp.data[i].brand);
                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).children(":eq(0)").children(":eq(2)").text("Free Km for Day - " + resp.data[i].freeMileage.dailyMileage + " Km");
                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).children(":eq(0)").children(":eq(3)").text("Free Km for Month - " + resp.data[i].freeMileage.monthlyMileage + " Km");
                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).children(":eq(0)").children(":eq(4)").text("Price Per Extra Km - " + resp.data[i].pricePerExtraKM + " LKR");

                    $.ajax({
                        url: baseUrl + "car/" + resp.data[i].brand + "/Available",
                        method: "get",
                        dataType: "json",
                        async: false,
                        success: function (resp) {
                            $("#carsCollection > .carDetails_section").children(`:eq(${i})`).children(":eq(0)").children(":eq(5)").text("Available Car Qty - " + resp.data);

                            if (resp.data > 0) {
                                availableCount += resp.data;
                            }
                        }
                    });

                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).children(":eq(2)").children(":eq(0)").text(resp.data[i].brand);

                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).children(":eq(3)").children(":eq(0)").empty();
                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).children(":eq(3)").children(":eq(0)").append('<i class="fa-solid fa-gas-pump"></i>');
                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).children(":eq(3)").children(":eq(0)").append(resp.data[i].fuelType);

                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).children(":eq(3)").children(":eq(1)").empty();
                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).children(":eq(3)").children(":eq(1)").append('<i class="fa-solid fa-users"></i>');
                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).children(":eq(3)").children(":eq(1)").append(resp.data[i].numOfPassengers);

                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).children(":eq(3)").children(":eq(2)").empty();
                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).children(":eq(3)").children(":eq(2)").append('<i class="fa-solid fa-gear"></i>');
                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).children(":eq(3)").children(":eq(2)").append(resp.data[i].transmissionType);

                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).children(":eq(4)").children(":eq(0)").children(":eq(0)").text("Rs." + resp.data[i].priceRate.dailyRate);
                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).children(":eq(4)").children(":eq(1)").children(":eq(0)").text("Rs." + resp.data[i].priceRate.monthlyRate);
                }

                for (let i = 0; i < $("#carsCollection > .carDetails_section").children().length; i++) {
                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).css('display', 'flex');
                }

                for (let i = resp.data.length; i < $("#carsCollection > .carDetails_section").children().length; i++) {
                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).css('display', 'none');
                }
            } else {
                console.log("Hureee")
                for (let i = 0; i < $("#carsCollection > .carDetails_section").children().length; i++) {
                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).css('display', 'none');
                }
            }
        }
    });
}

$('#general').on('click', function () {
    var carType = "General";
    loadAllCarsByCarType(carType);
});

$('#premium').on('click', function () {
    var carType = "Premium";
    loadAllCarsByCarType(carType);
});

$('#luxury').on('click', function () {
    var carType = "Luxury";
    loadAllCarsByCarType(carType);
});

function loadAllCarsByCarBrand(brand) {
    var availableCount = 0;
    var carCount = 0;
    let j = 0;

    $.ajax({
        url: baseUrl + "car/sortFromCarBrand",
        method: "get",
        dataType: "json",
        async: false,
        success: function (resp) {
            if (resp.data != null) {
                for (let i = 0; i < resp.data.length; i++) {
                    if (resp.data[i].brand.slice(0, brand.length) == brand) {
                        carCount++;
                        console.log(resp.data[i]);

                        $.ajax({
                            url: baseUrl + "car/getCarImages/" + resp.data[i].carId,
                            method: "get",
                            async: false,
                            dataType: "json",
                            success: function (resp) {
                                $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(1)").children(":eq(0)").attr('src', "../assets/img/uploads/carImages/" + resp.data.front);
                            }
                        });

                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(0)").children(":eq(1)").text(resp.data[i].brand);
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(0)").children(":eq(2)").text("Free Km for Day - " + resp.data[i].freeMileage.dailyMileage + " Km");
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(0)").children(":eq(3)").text("Free Km for Month - " + resp.data[i].freeMileage.monthlyMileage + " Km");
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(0)").children(":eq(4)").text("Price Per Extra Km - " + resp.data[i].pricePerExtraKM + " LKR");

                        $.ajax({
                            url: baseUrl + "car/" + resp.data[i].brand + "/Available",
                            method: "get",
                            dataType: "json",
                            async: false,
                            success: function (resp) {
                                $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(0)").children(":eq(5)").text("Available Car Qty - " + resp.data);

                                if (resp.data > 0) {
                                    availableCount += resp.data;
                                }
                            }
                        });

                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(2)").children(":eq(0)").text(resp.data[i].brand);

                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(0)").empty();
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(0)").append('<i class="fa-solid fa-gas-pump"></i>');
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(0)").append(resp.data[i].fuelType);

                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(1)").empty();
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(1)").append('<i class="fa-solid fa-users"></i>');
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(1)").append(resp.data[i].numOfPassengers);

                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(2)").empty();
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(2)").append('<i class="fa-solid fa-gear"></i>');
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(2)").append(resp.data[i].transmissionType);

                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(4)").children(":eq(0)").children(":eq(0)").text("Rs." + resp.data[i].priceRate.dailyRate);
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(4)").children(":eq(1)").children(":eq(0)").text("Rs." + resp.data[i].priceRate.monthlyRate);

                        j++;
                    }
                }

                for (let i = 0; i < $("#carsCollection > .carDetails_section").children().length; i++) {
                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).css('display', 'flex');
                }

                for (let i = carCount; i < $("#carsCollection > .carDetails_section").children().length; i++) {
                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).css('display', 'none');
                }
            } else {
                console.log("Hureee")
                for (let i = 0; i < $("#carsCollection > .carDetails_section").children().length; i++) {
                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).css('display', 'none');
                }
            }
        }
    });
}

$('#suzuki').on('click', function () {
    var brand = "Suzuki";
    loadAllCarsByCarBrand(brand);
});

$('#toyota').on('click', function () {
    var brand = "Toyota";
    loadAllCarsByCarBrand(brand);
});

$('#perodua').on('click', function () {
    var brand = "Perodua";
    loadAllCarsByCarBrand(brand);
});

$('#mercedes').on('click', function () {
    var brand = "Mercedes";
    loadAllCarsByCarBrand(brand);
});

$('#BMW').on('click', function () {
    var brand = "BMW";
    loadAllCarsByCarBrand(brand);
});

function loadAllCarsByFuelType(fuelType) {
    var availableCount = 0;
    var carCount = 0;
    let j = 0;

    $.ajax({
        url: baseUrl + "car/sortFromCarBrand",
        method: "get",
        dataType: "json",
        async: false,
        success: function (resp) {
            if (resp.data != null) {
                for (let i = 0; i < resp.data.length; i++) {
                    if (resp.data[i].fuelType == fuelType) {
                        carCount++;
                        console.log(resp.data[i]);

                        $.ajax({
                            url: baseUrl + "car/getCarImages/" + resp.data[i].carId,
                            method: "get",
                            async: false,
                            dataType: "json",
                            success: function (resp) {
                                $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(1)").children(":eq(0)").attr('src', "../assets/img/uploads/carImages/" + resp.data.front);
                            }
                        });

                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(0)").children(":eq(1)").text(resp.data[i].brand);
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(0)").children(":eq(2)").text("Free Km for Day - " + resp.data[i].freeMileage.dailyMileage + " Km");
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(0)").children(":eq(3)").text("Free Km for Month - " + resp.data[i].freeMileage.monthlyMileage + " Km");
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(0)").children(":eq(4)").text("Price Per Extra Km - " + resp.data[i].pricePerExtraKM + " LKR");

                        $.ajax({
                            url: baseUrl + "car/" + resp.data[i].brand + "/Available",
                            method: "get",
                            dataType: "json",
                            async: false,
                            success: function (resp) {
                                $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(0)").children(":eq(5)").text("Available Car Qty - " + resp.data);

                                if (resp.data > 0) {
                                    availableCount += resp.data;
                                }
                            }
                        });

                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(2)").children(":eq(0)").text(resp.data[i].brand);

                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(0)").empty();
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(0)").append('<i class="fa-solid fa-gas-pump"></i>');
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(0)").append(resp.data[i].fuelType);

                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(1)").empty();
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(1)").append('<i class="fa-solid fa-users"></i>');
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(1)").append(resp.data[i].numOfPassengers);

                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(2)").empty();
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(2)").append('<i class="fa-solid fa-gear"></i>');
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(2)").append(resp.data[i].transmissionType);

                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(4)").children(":eq(0)").children(":eq(0)").text("Rs." + resp.data[i].priceRate.dailyRate);
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(4)").children(":eq(1)").children(":eq(0)").text("Rs." + resp.data[i].priceRate.monthlyRate);

                        j++;
                    }
                }

                for (let i = 0; i < $("#carsCollection > .carDetails_section").children().length; i++) {
                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).css('display', 'flex');
                }

                for (let i = carCount; i < $("#carsCollection > .carDetails_section").children().length; i++) {
                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).css('display', 'none');
                }
            } else {
                console.log("Hureee")
                for (let i = 0; i < $("#carsCollection > .carDetails_section").children().length; i++) {
                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).css('display', 'none');
                }
            }
        }
    });
}

$('#diesel').on('click', function () {
    var fuelType = "Diesel";
    loadAllCarsByFuelType(fuelType);
});

$('#petrol').on('click', function () {
    var fuelType = "Petrol";
    loadAllCarsByFuelType(fuelType);
});

function loadAllCarsByTransmissionType(transmissionType) {
    var availableCount = 0;
    var carCount = 0;
    let j = 0;

    $.ajax({
        url: baseUrl + "car/sortFromCarBrand",
        method: "get",
        dataType: "json",
        async: false,
        success: function (resp) {
            if (resp.data != null) {
                for (let i = 0; i < resp.data.length; i++) {
                    if (resp.data[i].transmissionType == transmissionType) {
                        carCount++;
                        console.log(resp.data[i]);

                        $.ajax({
                            url: baseUrl + "car/getCarImages/" + resp.data[i].carId,
                            method: "get",
                            async: false,
                            dataType: "json",
                            success: function (resp) {
                                $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(1)").children(":eq(0)").attr('src', "../assets/img/uploads/carImages/" + resp.data.front);
                            }
                        });

                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(0)").children(":eq(1)").text(resp.data[i].brand);
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(0)").children(":eq(2)").text("Free Km for Day - " + resp.data[i].freeMileage.dailyMileage + " Km");
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(0)").children(":eq(3)").text("Free Km for Month - " + resp.data[i].freeMileage.monthlyMileage + " Km");
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(0)").children(":eq(4)").text("Price Per Extra Km - " + resp.data[i].pricePerExtraKM + " LKR");

                        $.ajax({
                            url: baseUrl + "car/" + resp.data[i].brand + "/Available",
                            method: "get",
                            dataType: "json",
                            async: false,
                            success: function (resp) {
                                $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(0)").children(":eq(5)").text("Available Car Qty - " + resp.data);

                                if (resp.data > 0) {
                                    availableCount += resp.data;
                                }
                            }
                        });

                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(2)").children(":eq(0)").text(resp.data[i].brand);

                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(0)").empty();
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(0)").append('<i class="fa-solid fa-gas-pump"></i>');
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(0)").append(resp.data[i].fuelType);

                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(1)").empty();
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(1)").append('<i class="fa-solid fa-users"></i>');
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(1)").append(resp.data[i].numOfPassengers);

                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(2)").empty();
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(2)").append('<i class="fa-solid fa-gear"></i>');
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(2)").append(resp.data[i].transmissionType);

                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(4)").children(":eq(0)").children(":eq(0)").text("Rs." + resp.data[i].priceRate.dailyRate);
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(4)").children(":eq(1)").children(":eq(0)").text("Rs." + resp.data[i].priceRate.monthlyRate);

                        j++;
                    }
                }

                for (let i = 0; i < $("#carsCollection > .carDetails_section").children().length; i++) {
                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).css('display', 'flex');
                }

                for (let i = carCount; i < $("#carsCollection > .carDetails_section").children().length; i++) {
                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).css('display', 'none');
                }
            } else {
                console.log("Hureee")
                for (let i = 0; i < $("#carsCollection > .carDetails_section").children().length; i++) {
                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).css('display', 'none');
                }
            }
        }
    });
}

$('#auto').on('click', function () {
    var transmissionType = "Auto";
    loadAllCarsByTransmissionType(transmissionType);
});

$('#manual').on('click', function () {
    var transmissionType = "Manual";
    loadAllCarsByTransmissionType(transmissionType);
});

function loadAllCarsByNumOfPassengers(noOfPassengers) {
    var availableCount = 0;
    var carCount = 0;
    let j = 0;

    $.ajax({
        url: baseUrl + "car/sortFromCarBrand",
        method: "get",
        dataType: "json",
        async: false,
        success: function (resp) {
            if (resp.data != null) {
                for (let i = 0; i < resp.data.length; i++) {
                    if (resp.data[i].numOfPassengers == noOfPassengers) {
                        carCount++;
                        console.log(resp.data[i]);

                        $.ajax({
                            url: baseUrl + "car/getCarImages/" + resp.data[i].carId,
                            method: "get",
                            async: false,
                            dataType: "json",
                            success: function (resp) {
                                $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(1)").children(":eq(0)").attr('src', "../assets/img/uploads/carImages/" + resp.data.front);
                            }
                        });

                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(0)").children(":eq(1)").text(resp.data[i].brand);
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(0)").children(":eq(2)").text("Free Km for Day - " + resp.data[i].freeMileage.dailyMileage + " Km");
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(0)").children(":eq(3)").text("Free Km for Month - " + resp.data[i].freeMileage.monthlyMileage + " Km");
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(0)").children(":eq(4)").text("Price Per Extra Km - " + resp.data[i].pricePerExtraKM + " LKR");

                        $.ajax({
                            url: baseUrl + "car/" + resp.data[i].brand + "/Available",
                            method: "get",
                            dataType: "json",
                            async: false,
                            success: function (resp) {
                                $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(0)").children(":eq(5)").text("Available Car Qty - " + resp.data);

                                if (resp.data > 0) {
                                    availableCount += resp.data;
                                }
                            }
                        });

                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(2)").children(":eq(0)").text(resp.data[i].brand);

                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(0)").empty();
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(0)").append('<i class="fa-solid fa-gas-pump"></i>');
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(0)").append(resp.data[i].fuelType);

                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(1)").empty();
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(1)").append('<i class="fa-solid fa-users"></i>');
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(1)").append(resp.data[i].numOfPassengers);

                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(2)").empty();
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(2)").append('<i class="fa-solid fa-gear"></i>');
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(2)").append(resp.data[i].transmissionType);

                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(4)").children(":eq(0)").children(":eq(0)").text("Rs." + resp.data[i].priceRate.dailyRate);
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(4)").children(":eq(1)").children(":eq(0)").text("Rs." + resp.data[i].priceRate.monthlyRate);

                        j++;
                    }
                }

                for (let i = 0; i < $("#carsCollection > .carDetails_section").children().length; i++) {
                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).css('display', 'flex');
                }

                for (let i = carCount; i < $("#carsCollection > .carDetails_section").children().length; i++) {
                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).css('display', 'none');
                }
            } else {
                console.log("Hureee")
                for (let i = 0; i < $("#carsCollection > .carDetails_section").children().length; i++) {
                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).css('display', 'none');
                }
            }
        }
    });
}

$('#four').on('click', function () {
    var numOfPassengers = "4";
    loadAllCarsByNumOfPassengers(numOfPassengers);
});

$('#six').on('click', function () {
    var numOfPassengers = "6";
    loadAllCarsByNumOfPassengers(numOfPassengers);
});

$('#eight').on('click', function () {
    var numOfPassengers = "8";
    loadAllCarsByNumOfPassengers(numOfPassengers);
});

function loadAllCarsByCarPrice(price) {
    var availableCount = 0;
    var carCount = 0;
    let j = 0;

    $.ajax({
        url: baseUrl + "car/sortFromCarBrand",
        method: "get",
        dataType: "json",
        async: false,
        success: function (resp) {
            if (resp.data != null) {
                for (let i = 0; i < resp.data.length; i++) {
                    if (parseFloat(resp.data[i].priceRate.dailyRate) == parseFloat(price) || parseFloat(resp.data[i].priceRate.monthlyRate) == parseFloat(price)) {
                        carCount++;
                        console.log(resp.data[i]);

                        $.ajax({
                            url: baseUrl + "car/getCarImages/" + resp.data[i].carId,
                            method: "get",
                            async: false,
                            dataType: "json",
                            success: function (resp) {
                                $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(1)").children(":eq(0)").attr('src', "../assets/img/uploads/carImages/" + resp.data.front);
                            }
                        });

                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(0)").children(":eq(1)").text(resp.data[i].brand);
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(0)").children(":eq(2)").text("Free Km for Day - " + resp.data[i].freeMileage.dailyMileage + " Km");
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(0)").children(":eq(3)").text("Free Km for Month - " + resp.data[i].freeMileage.monthlyMileage + " Km");
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(0)").children(":eq(4)").text("Price Per Extra Km - " + resp.data[i].pricePerExtraKM + " LKR");

                        $.ajax({
                            url: baseUrl + "car/" + resp.data[i].brand + "/Available",
                            method: "get",
                            dataType: "json",
                            async: false,
                            success: function (resp) {
                                $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(0)").children(":eq(5)").text("Available Car Qty - " + resp.data);

                                if (resp.data > 0) {
                                    availableCount += resp.data;
                                }
                            }
                        });

                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(2)").children(":eq(0)").text(resp.data[i].brand);

                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(0)").empty();
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(0)").append('<i class="fa-solid fa-gas-pump"></i>');
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(0)").append(resp.data[i].fuelType);

                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(1)").empty();
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(1)").append('<i class="fa-solid fa-users"></i>');
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(1)").append(resp.data[i].numOfPassengers);

                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(2)").empty();
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(2)").append('<i class="fa-solid fa-gear"></i>');
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(3)").children(":eq(2)").append(resp.data[i].transmissionType);

                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(4)").children(":eq(0)").children(":eq(0)").text("Rs." + resp.data[i].priceRate.dailyRate);
                        $("#carsCollection > .carDetails_section").children(`:eq(${j})`).children(":eq(4)").children(":eq(1)").children(":eq(0)").text("Rs." + resp.data[i].priceRate.monthlyRate);

                        j++;
                    }
                }

                for (let i = 0; i < $("#carsCollection > .carDetails_section").children().length; i++) {
                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).css('display', 'flex');
                }

                for (let i = carCount; i < $("#carsCollection > .carDetails_section").children().length; i++) {
                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).css('display', 'none');
                }
            } else {
                console.log("Hureee")
                for (let i = 0; i < $("#carsCollection > .carDetails_section").children().length; i++) {
                    $("#carsCollection > .carDetails_section").children(`:eq(${i})`).css('display', 'none');
                }
            }
        }
    });
}

$('#txtEnterPrice').on('keyup', function () {
    if ($('#txtEnterPrice').val() != '') {
        var carPrice = $('#txtEnterPrice').val();
        loadAllCarsByCarPrice(carPrice);
    } else {
        for (let i = 0; i < $("#carsCollection > .carDetails_section").children().length; i++) {
            $("#carsCollection > .carDetails_section").children(`:eq(${i})`).css('display', 'none');
        }
    }
});