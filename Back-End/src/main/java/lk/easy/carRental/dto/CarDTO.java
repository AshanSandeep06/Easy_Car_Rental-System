package lk.easy.carRental.dto;

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

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class CarDTO {
    private String carId;
    private String registerNum;
    private String brand;
    private CarType type;
    private PriceRate priceRate;
    private Mileage freeMileage;
    private String color;
    private TransmissionType transmissionType;
    private int numOfPassengers;
    private FuelType fuelType;
    private double pricePerExtraKM;
    private double lossDamageWaiver;
    private double lastServiceMileage;
    private VehicleImage vehicleImages;
    private CarAvailabilityType availabilityType;
}
