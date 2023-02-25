package lk.easy.carRental.dto;

import lk.easy.carRental.entity.Car;
import lk.easy.carRental.entity.Driver;
import lk.easy.carRental.entity.Rent;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class Rent_detailDTO {
    private String rentId;
    private String carId;
    private double distanceMileage;
    private double carCost;
    private double driverCost;
    private double damageFee;
    private DriverDTO driver;
}
