package lk.easy.carRental.repo;

import lk.easy.carRental.entity.Car;
import lk.easy.carRental.entity.Driver;
import lk.easy.carRental.entity.Rent_detail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface Rent_detailRepo extends JpaRepository<Rent_detail, String> {
    Rent_detail findRent_detailByCarIdAndRentId(String carId, String rentId);
}
