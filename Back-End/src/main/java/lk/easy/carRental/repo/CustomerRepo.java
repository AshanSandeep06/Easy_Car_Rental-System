package lk.easy.carRental.repo;

import lk.easy.carRental.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface CustomerRepo extends JpaRepository<Customer, String> {
    @Modifying
    @Transactional
    @Query(value = "UPDATE Customer SET nicImage=:nicImage, licenseImage=:licenseImage WHERE carId=:customerId", nativeQuery = true)
    void uploadCustomerImages(@Param("customerId") String customerId, @Param("nicImage") String nicImage, @Param("licenseImage") String licenseImage);
}
