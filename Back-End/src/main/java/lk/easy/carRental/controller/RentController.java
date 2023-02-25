package lk.easy.carRental.controller;

import lk.easy.carRental.dto.RentDTO;
import lk.easy.carRental.service.RentService;
import lk.easy.carRental.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/rent")
public class RentController {
    @Autowired
    private RentService rentService;

    @GetMapping(path = "/generateNewRentID")
    public ResponseUtil generateNewRentID() {
        return new ResponseUtil("OK", "A New Rent ID has been Generated Successfully..!", rentService.generateNewRentID());
    }

    @PostMapping
    public ResponseUtil placeRent(@RequestBody RentDTO rentDTO){
        System.out.println(rentDTO);
        rentService.placeRent(rentDTO);
        return new ResponseUtil("OK", "Rental Request Placement Successfully..!", null);
    }

}
