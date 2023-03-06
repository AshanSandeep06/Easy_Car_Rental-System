package lk.easy.carRental.service.impl;

import lk.easy.carRental.dto.PaymentDTO;
import lk.easy.carRental.entity.Payment;
import lk.easy.carRental.entity.Rent;
import lk.easy.carRental.repo.CustomerRepo;
import lk.easy.carRental.repo.PaymentRepo;
import lk.easy.carRental.repo.RentRepo;
import lk.easy.carRental.repo.User_credentialsRepo;
import lk.easy.carRental.service.PaymentService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class PaymentServiceImpl implements PaymentService {
    @Autowired
    private PaymentRepo paymentRepo;
    @Autowired
    private RentRepo rentRepo;
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
    public ArrayList<PaymentDTO> getAllPaymentsByRentID(String rentID) {
        if (rentRepo.existsById(rentID)) {
            return mapper.map(paymentRepo.findAllPaymentsByRentID(rentID), new TypeToken<ArrayList<PaymentDTO>>() {
            }.getType());
        } else {
            throw new RuntimeException("This rent is not exists..!");
        }
    }

    @Override
    public ArrayList<PaymentDTO> getAllPayments() {
        return mapper.map(paymentRepo.findAll(), new TypeToken<ArrayList<PaymentDTO>>() {
        }.getType());
    }

    @Override
    public void savePayment(PaymentDTO paymentDTO) {
        if (paymentDTO != null) {
            paymentRepo.save(mapper.map(paymentDTO, Payment.class));
        } else {
            throw new RuntimeException("Payment Data is Empty, Please Try Again..!");
        }
    }

    @Override
    public void savePaymentWithRentID(PaymentDTO paymentDTO) {
        if (rentRepo.existsById(paymentDTO.getRent().getRentId())) {
            if (!paymentRepo.existsById(paymentDTO.getPaymentId())) {
                Rent rent = rentRepo.findById(paymentDTO.getRent().getRentId()).get();
                Payment payment = mapper.map(paymentDTO, Payment.class);
                payment.setRent(rent);

                if (paymentDTO.getPaymentType().equals("Damage Fee")) {
                    Payment lossDamageWaiver = paymentRepo.findPaymentByRentIdAndPaymentType(paymentDTO.getRent().getRentId(), "Loss Damage Waiver");
                    lossDamageWaiver.setAmount(lossDamageWaiver.getAmount() - paymentDTO.getAmount());
                    paymentRepo.save(lossDamageWaiver);
                }

                paymentRepo.save(payment);
            } else {
                throw new RuntimeException("This Payment is Already Exists, Therefore Can't Make the Payment..!");
            }
        } else {
            throw new RuntimeException("This Rent is not Exists, Therefore Can't Make the Payment..!");
        }
    }

    @Override
    public void updatePayment(PaymentDTO paymentDTO) {
        if (rentRepo.existsById(paymentDTO.getRent().getRentId())) {
            if (paymentRepo.existsById(paymentDTO.getPaymentId())) {
                Rent rent = rentRepo.findById(paymentDTO.getRent().getRentId()).get();
                Payment payment = mapper.map(paymentDTO, Payment.class);
                payment.setRent(rent);

                if (paymentDTO.getPaymentType().equals("Damage Fee")) {
                    Payment lossDamageWaiver = paymentRepo.findPaymentByRentIdAndPaymentType(paymentDTO.getRent().getRentId(), "Loss Damage Waiver");
                    lossDamageWaiver.setAmount(lossDamageWaiver.getAmount() - paymentDTO.getAmount());
                    paymentRepo.save(lossDamageWaiver);
                }

                paymentRepo.save(payment);
            } else {
                throw new RuntimeException("This Payment is not Exists, Therefore Can't Update the Payment..!");
            }
        } else {
            throw new RuntimeException("This Rent is not Exists, Therefore Can't Update the Payment..!");
        }
    }
}
