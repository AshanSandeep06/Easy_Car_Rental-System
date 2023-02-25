package lk.easy.carRental.service;

import lk.easy.carRental.dto.PaymentDTO;

public interface PaymentService {
    String generateNewPaymentID();

    void savePayment(PaymentDTO paymentDTO);
}
