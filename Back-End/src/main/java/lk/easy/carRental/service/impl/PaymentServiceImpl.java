package lk.easy.carRental.service.impl;

import lk.easy.carRental.dto.PaymentDTO;
import lk.easy.carRental.entity.Payment;
import lk.easy.carRental.repo.CustomerRepo;
import lk.easy.carRental.repo.PaymentRepo;
import lk.easy.carRental.repo.User_credentialsRepo;
import lk.easy.carRental.service.PaymentService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class PaymentServiceImpl implements PaymentService {
    @Autowired
    private PaymentRepo paymentRepo;
    @Autowired
    private ModelMapper mapper;

    @Override
    public String generateNewPaymentID() {
        String lastPaymentId = paymentRepo.getLastPaymentId();
        if (lastPaymentId != null) {
            int tempId = Integer.parseInt(lastPaymentId.split("-")[1]);
            tempId++;
            if (tempId <= 9) {
                return "P00-00" + tempId;
            } else if (tempId <= 99) {
                return "P00-0" + tempId;
            } else {
                return "P00-" + tempId;
            }
        } else {
            return "P00-001";
        }
    }

    @Override
    public void savePayment(PaymentDTO paymentDTO) {
        if (paymentDTO != null) {
            paymentRepo.save(mapper.map(paymentDTO, Payment.class));
        } else {
            throw new RuntimeException("Payment Data is Empty, Please Try Again..!");
        }
    }
}
