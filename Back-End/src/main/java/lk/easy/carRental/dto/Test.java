package lk.easy.carRental.dto;

import lk.easy.carRental.embedded.Mileage;
import lk.easy.carRental.embedded.PriceRate;
import lk.easy.carRental.entity.Car;
import lk.easy.carRental.enums.CarAvailabilityType;
import lk.easy.carRental.enums.CarType;
import lk.easy.carRental.enums.FuelType;
import lk.easy.carRental.enums.TransmissionType;
import org.modelmapper.ModelMapper;

public class Test {
    public static void main(String[] args) {
        Test t1 = new Test();
        t1.call();
    }

    public void call(){
        /*CarDTO dto = new CarDTO();
        dto.setCarId("V001");
        dto.setRegisterNum("AAB-5680");
        dto.setBrand("Suzuki");
        dto.setType("General");
        dto.setDailyRate(2500.00);
        dto.setMonthlyRate(2500.00);
        dto.setDailyMileage(100);
        dto.setMonthlyMileage(100);
        dto.setTransmissionType("Auto");
        dto.setNumOfPassengers(4);
        dto.setFuelType("Diesel");
        dto.setPricePerExtraKM(30.00);
        dto.setLossDamageWaiver(10000.00);
        dto.setLastServiceMileage(400);
        dto.setAvailabilityType("Available");

        ModelMapper mapper = new ModelMapper();
        Car entity = mapper.map(dto, Car.class);

        System.out.println(entity);*/

    }
}