package lk.easy.carRental.controller;

import lk.easy.carRental.service.DriverService;
import lk.easy.carRental.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
}
