package lk.easy.carRental.controller;

import lk.easy.carRental.dto.*;
import lk.easy.carRental.service.DriverService;
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
@RequestMapping("/driver")
public class DriverController {
    @Autowired
    private DriverService driverService;

    @GetMapping
    public ResponseUtil getAllDrivers() {
        return new ResponseUtil("OK", "Loaded All Drivers Successfully..!", driverService.getAllDrivers());
    }

    @GetMapping(params = {"driverUsername"})
    public ResponseUtil getDriverDetails(@RequestParam("driverUsername") String driverUsername) {
        return new ResponseUtil("OK", "Driver Details has been loaded Successfully..!", driverService.getDriverDetails(driverUsername));
    }

    @GetMapping(path = "/adminDashBoard/occupiedDrivers")
    public ResponseUtil getOccupiedDriverCount() {
        return new ResponseUtil("OK", "Occupied Driver Count Returned..!", driverService.getOccupiedDriverCount());
    }

    @GetMapping(path = "/admin/dashBoard/availableDrivers")
    public ResponseUtil getAvailableDriversCount() {
        return new ResponseUtil("OK", "Available Driver Count Returned..!", driverService.getAvailableDriversCount());
    }

    @GetMapping(path = "/getDriverName", params = {"driverId"})
    public ResponseUtil getDriverName(@RequestParam String driverId) {
        return new ResponseUtil("OK", driverId + " driver name has been loaded Successfully..!", driverService.getDriverName(driverId));
    }

    @GetMapping(path = "/getDriverImages/{driverId}")
    public ResponseUtil getDriverImages(@PathVariable String driverId) {
        return new ResponseUtil("OK", "Successfully Loaded License Image of " + driverId, driverService.getDriverImages(driverId));
    }

    @GetMapping(path = "/generateNewDriverID")
    public ResponseUtil generateNewDriverID() {
        return new ResponseUtil("OK", "A New Driver ID has been Generated Successfully..!", driverService.generateNewDriverID());
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil saveDriver(@RequestBody DriverDTO driverDTO) {
        if (driverDTO != null) {
            driverService.saveDriver(driverDTO);
            return new ResponseUtil("OK", "Successfully Saved Driver..!", null);
        } else {
            throw new RuntimeException("Cant' be Save the Driver, Cause of Received data is Empty");
        }
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
            return new ResponseUtil("OK", "Successfully Uploaded Driver License Image", null);
        } catch (IOException e) {
            return new ResponseUtil("Error", e.getMessage(), null);
        }
    }

    @DeleteMapping(params = {"driverID"})
    public ResponseUtil deleteCar(@RequestParam String driverID) {
        driverService.deleteDriver(driverID);
        return new ResponseUtil("OK", "Successfully Deleted Driver..!", null);
    }

    @DeleteMapping(path = "/deleteDriverLicenseImage/{driverID}")
    public ResponseUtil deleteCarImages(@PathVariable String driverID) {
        try {
            String pathDirectory = new File("F:\\Ijse\\GDSE 60\\Easy_Car_Rental-System\\Front-End\\assets\\img\\uploads\\driverImages\\").getAbsolutePath();
            DriverLicenseImageDTO licenseImageDTO = driverService.getDriverImages(driverID);
            Path driverLicenseImageLocation = Paths.get(pathDirectory + "/" + licenseImageDTO.getLicenseImage());
            Files.delete(driverLicenseImageLocation);

            return new ResponseUtil("OK", "Successfully Deleted " + driverID + " Driver License Image", null);
        } catch (IOException e) {
            return new ResponseUtil("Error", e.getMessage(), null);
        }
    }
}
