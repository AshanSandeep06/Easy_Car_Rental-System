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
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.multipart.MultipartFile;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class CarDTO {
    private String carId;
    private String registerNum;
    private String brand;
    private String type;
    private double dailyRate;
    private double monthlyRate;
    private double dailyMileage;
    private double monthlyMileage;
    private String color;
    private String transmissionType;
    private int numOfPassengers;
    private String fuelType;
    private double pricePerExtraKM;
    private double lossDamageWaiver;
    private double lastServiceMileage;
    private MultipartFile front;
    private MultipartFile back;
    private MultipartFile side;
    private MultipartFile interior;
    private String availabilityType;
}
