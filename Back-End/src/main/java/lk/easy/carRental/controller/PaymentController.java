package lk.easy.carRental.controller;

import lk.easy.carRental.dto.PaymentDTO;
import lk.easy.carRental.dto.RentDTO;
import lk.easy.carRental.service.PaymentService;
import lk.easy.carRental.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/payment")
public class PaymentController {
    @Autowired
    private PaymentService paymentService;

    @GetMapping
    public ResponseUtil getAllRents(){
        return new ResponseUtil("OK", "Loaded All Bookings Successfully..!", paymentService.getAllPayments());
    }

    @PostMapping
    public ResponseUtil savePayment(@RequestBody PaymentDTO paymentDTO) {
        paymentService.savePayment(paymentDTO);
        return new ResponseUtil("OK", "Payment Completed Successfully..!", null);
    }

    @PostMapping(path = "/savePaymentWithRentID")
    public ResponseUtil savePaymentWithRentID(@RequestBody PaymentDTO paymentDTO) {
        System.out.println(paymentDTO);
        paymentService.savePaymentWithRentID(paymentDTO);
        return new ResponseUtil("OK", "Payment Completed Successfully..!", null);
    }

    @GetMapping(path = "/generateNewPaymentID")
    public ResponseUtil generateNewPaymentID() {
        return new ResponseUtil("OK", "A New Payment ID has been Generated Successfully..!", paymentService.generateNewPaymentID());
    }

    @GetMapping(params = {"rentID"})
    public ResponseUtil getAllPaymentsByRentID(@RequestParam String rentID){
        return new ResponseUtil("OK", "Load All Payments of this rent "+rentID, paymentService.getAllPaymentsByRentID(rentID));
    }

    @PutMapping
    public ResponseUtil updatePayment(@RequestBody PaymentDTO paymentDTO) {
        paymentService.updatePayment(paymentDTO);
        return new ResponseUtil("OK", "Payment Updated Successfully..!", null);
    }
}
