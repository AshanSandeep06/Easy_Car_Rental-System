package lk.easy.carRental.repo;

import lk.easy.carRental.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.ArrayList;

public interface PaymentRepo extends JpaRepository<Payment, String> {
    @Query(value = "SELECT paymentId FROM Payment ORDER BY paymentId DESC LIMIT 1", nativeQuery = true)
    String getLastPaymentId();

    @Query(nativeQuery = true, value = "SELECT * FROM Payment WHERE rentId=:rentId")
    ArrayList<Payment> findAllPaymentsByRentID(@Param("rentId") String rentId);

    @Query(nativeQuery = true, value = "SELECT * FROM Payment WHERE rentId=:rentId AND paymentType=:paymentType")
    Payment findPaymentByRentIdAndPaymentType(@Param("rentId") String rentId, @Param("paymentType") String paymentType);
}
