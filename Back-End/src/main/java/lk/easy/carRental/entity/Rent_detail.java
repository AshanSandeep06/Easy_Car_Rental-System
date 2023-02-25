package lk.easy.carRental.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
@Entity
@IdClass(Rent_detail_PK.class)
public class Rent_detail {
    @Id
    private String rentId;

    @Id
    private String carId;

    private double distanceMileage;

    private double carCost;

    private double driverCost;

    private double damageFee;

    @ManyToOne
    @JoinColumn(name = "rentId", referencedColumnName = "rentId", insertable = false, updatable = false)
    private Rent rent;

    @ManyToOne
    @JoinColumn(name = "carId", referencedColumnName = "carId", insertable = false, updatable = false)
    private Car car;

    @ManyToOne(cascade = {CascadeType.REFRESH, CascadeType.DETACH})
    @JoinColumn(name = "driverId", referencedColumnName = "driverId")
    private Driver driver;
}
