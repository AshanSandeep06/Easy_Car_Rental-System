package lk.easy.carRental.repo;

import lk.easy.carRental.entity.Driver;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DriverRepo extends JpaRepository<Driver, String> {

}
