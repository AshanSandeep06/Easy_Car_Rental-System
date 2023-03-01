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

    @Modifying
    @Transactional
    @Query(value = "UPDATE Customer SET nicImage=:nicImage WHERE customerId=:customerId", nativeQuery = true)
    void uploadCustomerNICImage(@Param("customerId") String customerId, @Param("nicImage") String nicImage);

    @Modifying
    @Transactional
    @Query(value = "UPDATE Customer SET licenseImage=:licenseImage WHERE customerId=:customerId", nativeQuery = true)
    void uploadCustomerLicenseImage(@Param("customerId") String customerId, @Param("licenseImage") String licenseImage);

    @Query(value = "SELECT customerId FROM Customer ORDER BY customerId DESC LIMIT 1", nativeQuery = true)
    String getLastCustomerId();

    @Query(nativeQuery = true, value = "SELECT * FROM Customer WHERE user_credentials_username=:username")
    Customer findCustomerByUsername(@Param("username") String username);

    Customer findCustomerByNic(String nic);
    Boolean existsCustomerByNic(String nic);

    @Query(nativeQuery = true, value = "SELECT COUNT(customerId) FROM Customer")
    int getCustomerCount();
}
