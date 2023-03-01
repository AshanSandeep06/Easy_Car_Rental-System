package lk.easy.carRental.repo;

import lk.easy.carRental.dto.CarDTO;
import lk.easy.carRental.entity.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

public interface CarRepo extends JpaRepository<Car,String> {
    @Modifying
    @Transactional
    @Query(value = "UPDATE Car SET front=:front,back=:back,side=:side,interior=:interior WHERE carId=:carId", nativeQuery = true)
    void uploadCarImages(@Param("carId") String carId, @Param("front") String front, @Param("back") String back, @Param("side") String side, @Param("interior") String interior);

    @Query(nativeQuery = true, value = "SELECT * FROM Car WHERE carId=:id")
    Car getCarImages(@Param("id") String carId);

    @Modifying
    @Transactional
    @Query(nativeQuery = true, value = "UPDATE Car SET registerNum=?2, brand=?3, type=?4, dailyRate=?5, monthlyRate=?6, dailyMileage=?7, monthlyMileage=?8, color=?9, transmissionType=?10, numOfPassengers=?11, fuelType=?12, pricePerExtraKM=?13, lossDamageWaiver=?14, lastServiceMileage=?15, availabilityType=?16 WHERE carId=?1")
    void updateCar(String carId, String registerNo, String brand, String type, double dailyRate, double monthlyRate, int dailyMileage, int monthlyMileage, String color, String transmissionType, int noOfPassengers, String fuelType, double pricePerExtraKm, double lossDamageWaiver, double lastServiceMileage, String availabilityType);

    @Query(nativeQuery = true, value = "SELECT * FROM Car GROUP BY brand")
    ArrayList<Car> getAllCarsSortFromBrand();

    @Query(nativeQuery = true, value = "SELECT * FROM Car WHERE type=:type GROUP BY brand")
    ArrayList<Car> getAllCarsFromCarType(@Param("type") String carType);
    Long countCarByBrandAndAvailabilityType(String brand, String availabilityType);
    Car findCarByCarId(String carId);

    @Query(nativeQuery = true, value = "SELECT COUNT(carId) FROM Car WHERE availabilityType='Available'")
    int getAvailableCarCount();

    @Query(nativeQuery = true, value = "SELECT COUNT(carId) FROM Car WHERE availabilityType='Unavailable'")
    int getReservedCarCount();

    @Query(nativeQuery = true, value = "SELECT COUNT(carId) FROM Car WHERE availabilityType='Need Maintenance'")
    int getNeedToMaintenanceCarCount();

    @Query(nativeQuery = true, value = "SELECT COUNT(carId) FROM Car WHERE availabilityType='Under Maintenance'")
    int getUnderMaintenanceCarCount();
}
