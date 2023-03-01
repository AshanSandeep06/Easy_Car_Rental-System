package lk.easy.carRental.controller;

import lk.easy.carRental.dto.CarDTO;
import lk.easy.carRental.dto.CustomerDTO;
import lk.easy.carRental.dto.CustomerImageDTO;
import lk.easy.carRental.dto.User_credentialsDTO;
import lk.easy.carRental.service.CustomerService;
import lk.easy.carRental.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@CrossOrigin
@RequestMapping("/customer")
public class CustomerController {
    @Autowired
    private CustomerService customerService;

    @GetMapping
    public ResponseUtil getAllCustomers() {
        return new ResponseUtil("OK", "Loaded All Customers Successfully..!", customerService.getAllCustomers());
    }

    @GetMapping(path = "/admin/dashBoard/getAllCustomerCount")
    public ResponseUtil getCustomerCount() {
        return new ResponseUtil("OK", "Loaded All Customer Count..!", customerService.getCustomerCount());
    }

    @GetMapping(params = {"username"})
    public ResponseUtil getCustomerDetails(@RequestParam("username") String customerUsername) {
        return new ResponseUtil("OK", "Customer Details has been loaded Successfully..!", customerService.getCustomerDetails(customerUsername));
    }

    @GetMapping(path = "/generateNewCustomerID")
    public ResponseUtil generateNewCustomerID() {
        return new ResponseUtil("OK", "A New Customer ID has been Generated Successfully..!", customerService.generateNewCustomerID());
    }

    @GetMapping(path = "/{customerId}")
    public ResponseUtil getCustomerByCustomerID(@PathVariable String customerId){
        return new ResponseUtil("OK", "Successfully getting "+customerId+" Customer", customerService.getCustomerByCustomerID(customerId));
    }

    @GetMapping(path = "/getCustomerByNIC", params = {"customerNIC"})
    public ResponseUtil getCustomerByCustomerNIC(@RequestParam String customerNIC){
        return new ResponseUtil("OK", "Successfully getting "+customerNIC+" Customer", customerService.getCustomerByCustomerNIC(customerNIC));
    }

    @GetMapping(path = "/getCustomerImages/{customerId}")
    public ResponseUtil getCustomerImages(@PathVariable String customerId) {
        return new ResponseUtil("OK", "Successfully Loaded Customer Images of " + customerId, customerService.getCustomerImages(customerId));
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil registerCustomer(@RequestBody CustomerDTO customerDTO) {
        if (customerDTO != null) {
            customerService.registerCustomer(customerDTO);
            return new ResponseUtil("OK", "Customer has been Saved Successfully..!", null);
        } else {
            throw new RuntimeException("Cant' be Register the Customer, Cause of Received data is Empty");
        }
    }

    @PutMapping
    public ResponseUtil updateCustomer(@RequestBody CustomerDTO customerDTO) {
        customerService.updateCustomer(customerDTO);
        return new ResponseUtil("OK", "Customer Profile Updated Successfully..!", customerService.generateNewCustomerID());
    }

    @PutMapping(path = "/{customerId}/{contactNumber}")
    public ResponseUtil updateCustomerContactNumber(@PathVariable String customerId, @PathVariable String contactNumber) {
        customerService.updateCustomerContactNumber(customerId, contactNumber);
        return new ResponseUtil("OK", "Customer Profile Updated Successfully..!", customerService.generateNewCustomerID());
    }

    @PutMapping(path = "/uploadCustomerImages/{customerId}")
    public ResponseUtil uploadCustomerNicAndLicenseImages(@ModelAttribute CustomerImageDTO imageDTO, @PathVariable String customerId) {
        try {
            String pathDirectory = new File("F:\\Ijse\\GDSE 60\\Easy_Car_Rental-System\\Front-End\\assets\\img\\uploads\\customerImages\\").getAbsolutePath();

            Path nicImageLocation = Paths.get(pathDirectory + "/" + imageDTO.getNicImage().getOriginalFilename());
            Path licenseImageLocation = Paths.get(pathDirectory + "/" + imageDTO.getLicenseImage().getOriginalFilename());

            byte[] nicImageBytes = imageDTO.getNicImage().getBytes();
            byte[] licenseImageBytes = imageDTO.getLicenseImage().getBytes();

            Files.write(nicImageLocation, nicImageBytes);
            Files.write(licenseImageLocation, licenseImageBytes);

            imageDTO.getNicImage().transferTo(nicImageLocation);
            imageDTO.getLicenseImage().transferTo(licenseImageLocation);

            customerService.uploadNICAndLicenseImages(customerId, imageDTO.getNicImage().getOriginalFilename(), imageDTO.getLicenseImage().getOriginalFilename());
            return new ResponseUtil("OK", "Successfully Uploaded Customer NIC and License Images", null);
        } catch (IOException e) {
            return new ResponseUtil("Error", e.getMessage(), null);
        }
    }

    @PutMapping(path = "/uploadCustomerImages/uploadNICImage/{customerId}")
    public ResponseUtil uploadCustomerNICImage(@RequestPart MultipartFile nicImage, @PathVariable String customerId) {
        try {
            String pathDirectory = new File("F:\\Ijse\\GDSE 60\\Easy_Car_Rental-System\\Front-End\\assets\\img\\uploads\\customerImages\\").getAbsolutePath();

            Path nicImageLocation = Paths.get(pathDirectory + "/" + nicImage.getOriginalFilename());

            byte[] nicImageBytes = nicImage.getBytes();

            Files.write(nicImageLocation, nicImageBytes);

            nicImage.transferTo(nicImageLocation);

            customerService.uploadCustomerNICImage(customerId, nicImage.getOriginalFilename());
            return new ResponseUtil("OK", "Successfully Uploaded Customer NIC Image", null);
        } catch (IOException e) {
            return new ResponseUtil("Error", e.getMessage(), null);
        }
    }

    @PutMapping(path = "/uploadCustomerImages/uploadLicenseImage", params = {"customerId"})
    public ResponseUtil uploadCustomerLicenseImage(@RequestPart MultipartFile licenseImage, @RequestParam String customerId) {
        try {
            String pathDirectory = new File("F:\\Ijse\\GDSE 60\\Easy_Car_Rental-System\\Front-End\\assets\\img\\uploads\\customerImages\\").getAbsolutePath();

            Path licenseImageLocation = Paths.get(pathDirectory + "/" + licenseImage.getOriginalFilename());

            byte[] licenseImageBytes = licenseImage.getBytes();

            Files.write(licenseImageLocation, licenseImageBytes);

            licenseImage.transferTo(licenseImageLocation);

            customerService.uploadCustomerLicenseImage(customerId, licenseImage.getOriginalFilename());
            return new ResponseUtil("OK", "Successfully Uploaded Customer License Image", null);
        } catch (IOException e) {
            return new ResponseUtil("Error", e.getMessage(), null);
        }
    }
}
