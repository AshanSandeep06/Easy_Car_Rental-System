package lk.easy.carRental.repo;

import lk.easy.carRental.entity.Customer;
import lk.easy.carRental.entity.Driver;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

public interface DriverRepo extends JpaRepository<Driver, String> {
    ArrayList<Driver> findDriverByAvailabilityType(String availabilityType);

    @Query(nativeQuery = true, value = "SELECT * FROM Driver WHERE user_credentials_username=:username")
    Driver findDriverByUsername(@Param("username") String driverUsername);

    @Modifying
    @Transactional
    @Query(value = "UPDATE Driver SET licenseImage=:licenseImage WHERE driverId=:driverId", nativeQuery = true)
    void uploadCustomerLicenseImage(@Param("driverId") String driverId, @Param("licenseImage") String licenseImage);

    @Query(value = "SELECT driverId FROM Driver ORDER BY driverId DESC LIMIT 1", nativeQuery = true)
    String getLastDriverId();

    @Query(value = "SELECT COUNT(driverId) FROM Driver WHERE availabilityType='Unavailable'", nativeQuery = true)
    int getOccupiedDriverCount();

    @Query(value = "SELECT COUNT(driverId) FROM Driver WHERE availabilityType='Available'", nativeQuery = true)
    int getAvailableDriversCount();
}
