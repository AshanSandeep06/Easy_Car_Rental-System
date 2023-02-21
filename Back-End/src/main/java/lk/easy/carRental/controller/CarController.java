package lk.easy.carRental.controller;

import lk.easy.carRental.dto.CarDTO;
import lk.easy.carRental.util.ResponseUtil;
import org.springframework.http.HttpStatus;
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
    @PostMapping
    public void saveCar(@ModelAttribute CarDTO carDTO) {
        System.out.println(carDTO);
    }

    @PutMapping(path = "/uploadCarImages")
    public ResponseUtil uploadImages(@RequestPart("front") MultipartFile front, @RequestPart("back") MultipartFile back, @RequestPart("side") MultipartFile side, @RequestPart("interior") MultipartFile interior){
        /*System.out.println(front.getOriginalFilename());
        System.out.println(back.getOriginalFilename());
        System.out.println(side.getOriginalFilename());
        System.out.println(interior.getOriginalFilename());*/

        try{
            String pathDirectory = new File("F:\\Ijse\\GDSE 60\\Easy_Car_Rental-System\\Front-End\\assets\\img\\uploads\\carImages\\").getAbsolutePath();
            System.out.println(pathDirectory);

            Path frontImageLocation = Paths.get(pathDirectory +"/"+ front.getOriginalFilename());
            Path backImageLocation = Paths.get(pathDirectory +"/"+ back.getOriginalFilename());
            Path sideImageLocation = Paths.get(pathDirectory +"/"+ side.getOriginalFilename());
            Path interiorImageLocation = Paths.get(pathDirectory +"/"+ interior.getOriginalFilename());

            System.out.println(frontImageLocation+" "+backImageLocation+" "+sideImageLocation+" "+interiorImageLocation);

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
        }catch (IOException e){
            e.printStackTrace();
        }

        return new ResponseUtil("Ok", "Successfully Uploaded", null);
    }
}
