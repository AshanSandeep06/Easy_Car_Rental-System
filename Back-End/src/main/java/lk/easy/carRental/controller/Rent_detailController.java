package lk.easy.carRental.controller;

import lk.easy.carRental.dto.Rent_detailDTO;
import lk.easy.carRental.service.Rent_detailService;
import lk.easy.carRental.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/rent_detail")
public class Rent_detailController {
    @Autowired
    private Rent_detailService rentDetailService;

    @PutMapping
    public ResponseUtil updateRentDetails(@RequestBody Rent_detailDTO rentDetailDTO) {
        rentDetailService.updateRentDetails(rentDetailDTO);
        return new ResponseUtil("OK", "Successfully Updated Rent Details", null);
    }
}
