package lk.easy.carRental.controller;

import lk.easy.carRental.dto.CarDTO;
import lk.easy.carRental.dto.ImageDTO;
import lk.easy.carRental.dto.VehicleImageDTO;
import lk.easy.carRental.service.CarService;
import lk.easy.carRental.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@CrossOrigin
@RequestMapping("/car")
public class CarController {
    @Autowired
    private CarService carService;

    @GetMapping
    public ResponseUtil getAllCars() {
        return new ResponseUtil("OK", "Successfully Loaded All Cars", carService.getAllCars());
    }

    @GetMapping(params = {"carId"})
    public ResponseUtil getCarFromCarID(String carId) {
        return new ResponseUtil("OK", "Successfully Loaded "+carId+" Car", carService.getCarFromCarID(carId));
    }

    @GetMapping(path = "/sortFromCarBrand")
    public ResponseUtil getAllCarsFromBrand() {
        return new ResponseUtil("OK", "Successfully Loaded All Cars", carService.getAllCarsSortFromBrand());
    }

    @GetMapping(path = "/admin/dashBoard/availableCars")
    public ResponseUtil getAvailableCarCount() {
        return new ResponseUtil("OK", "Successfully Loaded Available Car Count", carService.getAvailableCarCount());
    }

    @GetMapping(path = "/admin/dashBoard/needToMaintenance/carCount")
    public ResponseUtil getNeedToMaintenanceCarCount() {
        return new ResponseUtil("OK", "Successfully Loaded needToMaintenance Car Count", carService.getNeedToMaintenanceCarCount());
    }

    @GetMapping(path = "/admin/dashBoard/maintenance/underMaintenance/carCount")
    public ResponseUtil getUnderMaintenanceCarCount() {
        return new ResponseUtil("OK", "Successfully Loaded underMaintenance Car Count", carService.getUnderMaintenanceCarCount());
    }

    @GetMapping(path = "/adminDashBoard/reservedCars")
    public ResponseUtil getReservedCarCount() {
        return new ResponseUtil("OK", "Successfully Loaded Reserved Car Count", carService.getReservedCarCount());
    }

    @GetMapping(path = "/getCarImages/{carId}")
    public ResponseUtil getCarImages(@PathVariable String carId) {
        return new ResponseUtil("OK", "Successfully Loaded Car Images of " + carId, carService.getCarImages(carId));
    }

    @GetMapping(path = "/{carType}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getAllCarsFromType(@PathVariable String carType) {
        return new ResponseUtil("OK", "Successfully Loaded All " + carType + " Cars", carService.getAllCarsFromCarType(carType));
    }

    @GetMapping(path = "/{carType}/{availabilityType}")
    public ResponseUtil getCarCountByCarBrandAndAvailabilityType(@PathVariable String carType, @PathVariable String availabilityType) {
        return new ResponseUtil("OK", "Successfully Loaded Car Count", carService.getCarCountByCarBrandAndAvailabilityType(carType, availabilityType));
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil saveCar(@RequestBody CarDTO carDTO) {
        if (carDTO != null) {
            carService.saveCar(carDTO);
            return new ResponseUtil("OK", "Successfully Saved Car..!", null);
        } else {
            throw new RuntimeException("Cant' be Save the Car, Cause of Received data is Empty");
        }
    }

    @PutMapping
    public ResponseUtil updateCar(@RequestBody CarDTO carDTO) {
        if (carDTO != null) {
            carService.updateCar(carDTO);
            return new ResponseUtil("OK", "Successfully Updated Car : " + carDTO.getCarId(), null);
        } else {
            throw new RuntimeException("Cant' be Update the Car, Cause of Received data is Empty");
        }
    }

    @PutMapping(path = "/uploadCarImages/{carId}")
    public ResponseUtil uploadAndUpdateImages(@ModelAttribute VehicleImageDTO imageDTO, @PathVariable("carId") String carId) {
        try {
            String pathDirectory = new File("F:\\Ijse\\GDSE 60\\Easy_Car_Rental-System\\Front-End\\assets\\img\\uploads\\carImages\\").getAbsolutePath();

            Path frontImageLocation = Paths.get(pathDirectory + "/" + imageDTO.getFront().getOriginalFilename());
            Path backImageLocation = Paths.get(pathDirectory + "/" + imageDTO.getBack().getOriginalFilename());
            Path sideImageLocation = Paths.get(pathDirectory + "/" + imageDTO.getSide().getOriginalFilename());
            Path interiorImageLocation = Paths.get(pathDirectory + "/" + imageDTO.getInterior().getOriginalFilename());

            byte[] frontImageBytes = imageDTO.getFront().getBytes();
            byte[] backImageBytes = imageDTO.getBack().getBytes();
            byte[] sideImageBytes = imageDTO.getSide().getBytes();
            byte[] interiorImageBytes = imageDTO.getInterior().getBytes();

            Files.write(frontImageLocation, frontImageBytes);
            Files.write(backImageLocation, backImageBytes);
            Files.write(sideImageLocation, sideImageBytes);
            Files.write(interiorImageLocation, interiorImageBytes);

            imageDTO.getFront().transferTo(frontImageLocation);
            imageDTO.getBack().transferTo(backImageLocation);
            imageDTO.getSide().transferTo(sideImageLocation);
            imageDTO.getInterior().transferTo(interiorImageLocation);

            carService.uploadCarImages(carId, imageDTO.getFront().getOriginalFilename(), imageDTO.getBack().getOriginalFilename(), imageDTO.getSide().getOriginalFilename(), imageDTO.getInterior().getOriginalFilename());

            return new ResponseUtil("OK", "Successfully Uploaded Car Images", null);
        } catch (IOException e) {
            return new ResponseUtil("Error", e.getMessage(), null);
        }
    }

    @DeleteMapping(params = {"carId"})
    public ResponseUtil deleteCar(@RequestParam String carId) {
        carService.deleteCar(carId);
        return new ResponseUtil("OK", "Successfully Deleted Car..!", null);
    }

    @DeleteMapping(path = "/deleteCarImages/{carId}")
    public ResponseUtil deleteCarImages(@PathVariable String carId) {
        try {
            String pathDirectory = new File("F:\\Ijse\\GDSE 60\\Easy_Car_Rental-System\\Front-End\\assets\\img\\uploads\\carImages\\").getAbsolutePath();

            ImageDTO imageDTO = carService.getCarImages(carId);

            Path frontImageLocation = Paths.get(pathDirectory + "/" + imageDTO.getFront());
            Path backImageLocation = Paths.get(pathDirectory + "/" + imageDTO.getBack());
            Path sideImageLocation = Paths.get(pathDirectory + "/" + imageDTO.getSide());
            Path interiorImageLocation = Paths.get(pathDirectory + "/" + imageDTO.getInterior());

            Files.delete(frontImageLocation);
            Files.delete(backImageLocation);
            Files.delete(sideImageLocation);
            Files.delete(interiorImageLocation);

            return new ResponseUtil("OK", "Successfully Deleted Car Images", null);
        } catch (IOException e) {
            return new ResponseUtil("Error", e.getMessage(), null);
        }
    }
}
