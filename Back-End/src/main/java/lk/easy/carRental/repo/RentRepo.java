package lk.easy.carRental.repo;

import lk.easy.carRental.entity.Rent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.ArrayList;

public interface RentRepo extends JpaRepository<Rent, String> {
    @Query(value = "SELECT rentId FROM Rent ORDER BY rentId DESC LIMIT 1", nativeQuery = true)
    String getLastRentId();

    @Query(nativeQuery = true, value = "SELECT * FROM Rent WHERE customerId=:customerId")
    ArrayList<Rent> getAllActiveBookingsByCustomerId(@Param("customerId") String customerId);
}
