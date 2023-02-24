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
    @Query(value = "UPDATE Customer SET nicImage=:nicImage, licenseImage=:licenseImage WHERE customerId=:customerId", nativeQuery = true)
    void uploadCustomerImages(@Param("customerId") String customerId, @Param("nicImage") String nicImage, @Param("licenseImage") String licenseImage);

    @Query(value = "SELECT customerId FROM Customer ORDER BY customerId DESC LIMIT 1", nativeQuery = true)
    String getLastCustomerId();
}
