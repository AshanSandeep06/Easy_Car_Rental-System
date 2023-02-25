package lk.easy.carRental.repo;

import lk.easy.carRental.entity.Rent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface RentRepo extends JpaRepository<Rent, String> {
    @Query(value = "SELECT rentId FROM Rent ORDER BY rentId DESC LIMIT 1", nativeQuery = true)
    String getLastRentId();
}
