package lk.easy.carRental.controller;

import lk.easy.carRental.dto.CustomerDTO;
import lk.easy.carRental.dto.DriverDTO;
import lk.easy.carRental.service.DriverService;
import lk.easy.carRental.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@CrossOrigin
@RequestMapping("/driver")
public class DriverController {
    @Autowired
    private DriverService driverService;

    @GetMapping(params = {"driverUsername"})
    public ResponseUtil getDriverDetails(@RequestParam("driverUsername") String driverUsername) {
        return new ResponseUtil("OK", "Driver Details has been loaded Successfully..!", driverService.getDriverDetails(driverUsername));
    }

    @GetMapping(path = "/getDriverImages/{driverId}")
    public ResponseUtil getDriverImages(@PathVariable String driverId) {
        return new ResponseUtil("OK", "Successfully Loaded License Image of " + driverId, driverService.getDriverImages(driverId));
    }

    @PutMapping
    public ResponseUtil updateDriver(@RequestBody DriverDTO driverDTO) {
        driverService.updateDriver(driverDTO);
        return new ResponseUtil("OK", "Driver Profile Updated Successfully..!", null);
    }

    @PutMapping(path = "/uploadDriverImages/uploadLicenseImage", params = {"driverId"})
    public ResponseUtil uploadDriverLicenseImage(@RequestPart MultipartFile licenseImage, @RequestParam String driverId) {
        try {
            String pathDirectory = new File("F:\\Ijse\\GDSE 60\\Easy_Car_Rental-System\\Front-End\\assets\\img\\uploads\\driverImages\\").getAbsolutePath();

            Path licenseImageLocation = Paths.get(pathDirectory + "/" + licenseImage.getOriginalFilename());

            byte[] licenseImageBytes = licenseImage.getBytes();

            Files.write(licenseImageLocation, licenseImageBytes);

            licenseImage.transferTo(licenseImageLocation);

            driverService.uploadDriverLicenseImage(driverId, licenseImage.getOriginalFilename());
            return new ResponseUtil("OK", "Successfully Uploaded Customer License Image", null);
        } catch (IOException e) {
            return new ResponseUtil("Error", e.getMessage(), null);
        }
    }
}
