package lk.easy.carRental.service;

import lk.easy.carRental.dto.PaymentDTO;

import java.util.ArrayList;

public interface PaymentService {
    String generateNewPaymentID();
    ArrayList<PaymentDTO> getAllPaymentsByRentID(String rentID);
    ArrayList<PaymentDTO> getAllPayments();

    void savePayment(PaymentDTO paymentDTO);
    void savePaymentWithRentID(PaymentDTO paymentDTO);
    void updatePayment(PaymentDTO paymentDTO);
}
