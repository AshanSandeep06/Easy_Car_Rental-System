package lk.easy.carRental.repo;

import lk.easy.carRental.entity.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

public interface CarRepo extends JpaRepository<Car, String> {

}
