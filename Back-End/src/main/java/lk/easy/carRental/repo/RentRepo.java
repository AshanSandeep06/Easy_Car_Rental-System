package lk.easy.carRental.repo;

import lk.easy.carRental.entity.Rent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

public interface RentRepo extends JpaRepository<Rent, String> {
    @Query(value = "SELECT rentId FROM Rent ORDER BY rentId DESC LIMIT 1", nativeQuery = true)
    String getLastRentId();

    @Query(nativeQuery = true, value = "SELECT * FROM Rent WHERE customerId=:customerId AND rentStatus='Pending' OR rentStatus='Accepted'")
    ArrayList<Rent> getAllActiveBookingsByCustomerId(@Param("customerId") String customerId);

    @Query(nativeQuery = true, value = "SELECT * FROM Rent WHERE customerId=:customerId AND rentStatus='Pending' OR rentStatus='Accepted' OR rentStatus='Denied'")
    ArrayList<Rent> getBookingsRentStatusByCustomerId(@Param("customerId") String customerId);

    @Modifying
    @Transactional
    @Query(nativeQuery = true, value = "UPDATE Rent SET rentStatus='Cancelled' WHERE rentId=:rentId")
    void cancelRentRequest(@Param("rentId") String rentId);

}
