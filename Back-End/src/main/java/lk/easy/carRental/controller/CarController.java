package lk.easy.carRental.controller;

import lk.easy.carRental.dto.CarDTO;
import lk.easy.carRental.util.ResponseUtil;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
        System.out.println(front.getOriginalFilename());
        System.out.println(back.getOriginalFilename());
        System.out.println(side.getOriginalFilename());
        System.out.println(interior.getOriginalFilename());
        return new ResponseUtil("Ok", "Success", "");
    }
}
