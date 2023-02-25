package lk.easy.carRental.repo;

import lk.easy.carRental.entity.Driver;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.ArrayList;

public interface DriverRepo extends JpaRepository<Driver, String> {
    ArrayList<Driver> findDriverByAvailabilityType(String availabilityType);
}
