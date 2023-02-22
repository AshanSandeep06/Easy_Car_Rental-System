package lk.easy.carRental.repo;

import lk.easy.carRental.entity.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

public interface CarRepo extends JpaRepository<Car, String> {
    @Modifying
    @Transactional
    @Query(value = "UPDATE Car SET front=:front,back=:back,side=:side,interior=:interior WHERE carId=:carId", nativeQuery = true)
    void uploadCarImages(@Param("carId") String carId, @Param("front") String front, @Param("back") String back, @Param("side") String side, @Param("interior") String interior);

    @Query(nativeQuery = true, value = "SELECT * FROM Car WHERE carId=:id")
    Car getCarImages(@Param("id") String carId);
}
