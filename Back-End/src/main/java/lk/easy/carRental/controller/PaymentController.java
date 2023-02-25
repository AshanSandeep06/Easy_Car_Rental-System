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

    @PostMapping
    public ResponseUtil savePayment(@RequestBody PaymentDTO paymentDTO) {
        System.out.println(paymentDTO);
        paymentService.savePayment(paymentDTO);
        return new ResponseUtil("OK", "Payment Completed Successfully..!", null);
    }

    @GetMapping(path = "/generateNewPaymentID")
    public ResponseUtil generateNewPaymentID() {
        return new ResponseUtil("OK", "A New Payment ID has been Generated Successfully..!", paymentService.generateNewPaymentID());
    }
}
