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

    @GetMapping(params = {"username"})
    public ResponseUtil getCustomerDetails(@RequestParam("username") String customerUsername) {
        return new ResponseUtil("OK", "Customer Details has been loaded Successfully..!", customerService.getCustomerDetails(customerUsername));
    }

    @GetMapping(path = "/generateNewCustomerID")
    public ResponseUtil generateNewCustomerID() {
        return new ResponseUtil("OK", "A New Customer ID has been Generated Successfully..!", customerService.generateNewCustomerID());
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
}
