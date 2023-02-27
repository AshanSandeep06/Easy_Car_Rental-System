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

    @GetMapping(params = {"driverRequestingType"})
    public ResponseUtil getAllRentsByDriverRequestingType(@RequestParam String driverRequestingType) {
        return new ResponseUtil("OK", "Load All Drivers' Work Schedule..!", rentService.getAllRentsByDriverRequestingType(driverRequestingType));
    }

    @GetMapping(path = "/checkOngoingRentals/OngoingRentalsCount", params = {"customerId"})
    public ResponseUtil getOngoingRentalsCount(String customerId) {
        return new ResponseUtil("OK", "Ongoing Rentals Count of " + customerId + " has been generated..!", rentService.getOngoingRentalsCount(customerId));
    }

    @GetMapping(path = "/generateNewRentID")
    public ResponseUtil generateNewRentID() {
        return new ResponseUtil("OK", "A New Rent ID has been Generated Successfully..!", rentService.generateNewRentID());
    }

    @GetMapping(params = {"customerId"}, path = "/getActiveBookings")
    public ResponseUtil getActiveBookings(String customerId) {
        return new ResponseUtil("OK", "Active Rental Requests of " + customerId + " has been Loaded..!", rentService.getAllActiveBookings(customerId));
    }

    @GetMapping(path = "/getBookingsRentStatus/{customerId}")
    public ResponseUtil getBookingsRentStatus(@PathVariable String customerId) {
        return new ResponseUtil("OK", "Rental Requests of " + customerId + " has been Loaded..!", rentService.getBookingsRentStatus(customerId));
    }

    @GetMapping(path = "/ManageRentalRequests/Pending")
    public ResponseUtil loadAllPendingRentalRequests() {
        return new ResponseUtil("OK", "Successfully Loaded All Pending Rental Requests..!", rentService.loadAllPendingRentalRequests("Pending"));
    }

    @PostMapping
    public ResponseUtil placeRent(@RequestBody RentDTO rentDTO) {
        System.out.println(rentDTO);
        rentService.placeRent(rentDTO);
        return new ResponseUtil("OK", "Rental Request Placement Successfully..!", null);
    }

    @PutMapping(params = {"rentId"})
    public ResponseUtil cancelRentRequest(@RequestParam String rentId) {
        rentService.cancelRentRequest(rentId);
        return new ResponseUtil("OK", "Successfully Cancelled Your Rental Request..!", null);
    }

    @PutMapping(params = {"rentId", "rentStatus"})
    public ResponseUtil updateRentStatus(String rentId, String rentStatus) {
        rentService.updateRentStatus(rentId, rentStatus);
        return new ResponseUtil("OK", "Successfully Updated the Status of "+rentId+" Rental Request..!", null);
    }

}
