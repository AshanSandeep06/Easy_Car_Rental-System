package lk.easy.carRental.repo;

import lk.easy.carRental.entity.Customer;
import lk.easy.carRental.entity.Driver;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.ArrayList;

public interface DriverRepo extends JpaRepository<Driver, String> {
    ArrayList<Driver> findDriverByAvailabilityType(String availabilityType);

    @Query(nativeQuery = true, value = "SELECT * FROM Driver WHERE user_credentials_username=:username")
    Driver findDriverByUsername(@Param("username") String driverUsername);
}
