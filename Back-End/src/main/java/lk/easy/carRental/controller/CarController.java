package lk.easy.carRental.controller;

import lk.easy.carRental.dto.CarDTO;
import lk.easy.carRental.service.CarService;
import lk.easy.carRental.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
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

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil saveCar(@RequestBody CarDTO carDTO) {
        if (carDTO != null) {
            carService.saveCar(carDTO);
            return new ResponseUtil("OK", "Successfully Saved..!", null);
        }else{
            throw new RuntimeException("Received data is Empty");
        }
    }

    @PutMapping(path = "/uploadCarImages")
    public ResponseUtil uploadImages(@RequestPart("front") MultipartFile front, @RequestPart("back") MultipartFile back, @RequestPart("side") MultipartFile side, @RequestPart("interior") MultipartFile interior) {
        try {
            String pathDirectory = new File("F:\\Ijse\\GDSE 60\\Easy_Car_Rental-System\\Front-End\\assets\\img\\uploads\\carImages\\").getAbsolutePath();

            Path frontImageLocation = Paths.get(pathDirectory + "/" + front.getOriginalFilename());
            Path backImageLocation = Paths.get(pathDirectory + "/" + back.getOriginalFilename());
            Path sideImageLocation = Paths.get(pathDirectory + "/" + side.getOriginalFilename());
            Path interiorImageLocation = Paths.get(pathDirectory + "/" + interior.getOriginalFilename());

            byte[] frontImageBytes = front.getBytes();
            byte[] backImageBytes = back.getBytes();
            byte[] sideImageBytes = side.getBytes();
            byte[] interiorImageBytes = interior.getBytes();

            Files.write(frontImageLocation, frontImageBytes);
            Files.write(backImageLocation, backImageBytes);
            Files.write(sideImageLocation, sideImageBytes);
            Files.write(interiorImageLocation, interiorImageBytes);

            front.transferTo(frontImageLocation);
            back.transferTo(backImageLocation);
            side.transferTo(sideImageLocation);
            interior.transferTo(interiorImageLocation);
        } catch (IOException e) {
            e.printStackTrace();
        }

        return new ResponseUtil("Ok", "Successfully Uploaded", null);
    }
}
