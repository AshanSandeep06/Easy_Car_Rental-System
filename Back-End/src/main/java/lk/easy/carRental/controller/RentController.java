package lk.easy.carRental.controller;

import lk.easy.carRental.service.RentService;
import lk.easy.carRental.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
