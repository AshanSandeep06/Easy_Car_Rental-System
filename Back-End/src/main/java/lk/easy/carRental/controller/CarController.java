package lk.easy.carRental.controller;

import lk.easy.carRental.dto.CarDTO;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/car")
public class CarController {
    @PostMapping
    public void saveCar(@ModelAttribute CarDTO carDTO) {
        System.out.println(carDTO);
    }
}
