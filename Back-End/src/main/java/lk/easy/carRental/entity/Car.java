package lk.easy.carRental.entity;

import lk.easy.carRental.embedded.Mileage;
import lk.easy.carRental.embedded.PriceRate;
import lk.easy.carRental.embedded.VehicleImage;
import lk.easy.carRental.enums.CarAvailabilityType;
import lk.easy.carRental.enums.CarType;
import lk.easy.carRental.enums.FuelType;
import lk.easy.carRental.enums.TransmissionType;
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
public class Car {
    @Id
    private String carId;
    private String registerNum;
    private String brand;
    @Enumerated(EnumType.STRING)
    private CarType type;
    @Embedded
    private PriceRate priceRate;
    @Embedded
    private Mileage freeMileage;
    private String color;
    @Enumerated(EnumType.STRING)
    private TransmissionType transmissionType;
    private int numOfPassengers;
    @Enumerated(EnumType.STRING)
    private FuelType fuelType;
    private double pricePerExtraKM;
    private double lossDamageWaiver;
    private double lastServiceMileage;
    @Embedded
    private VehicleImage vehicleImages;
    @Enumerated(EnumType.STRING)
    private CarAvailabilityType availabilityType;
}
