package lk.easy.carRental.dto;

import lk.easy.carRental.enums.CarAvailabilityType;

public class Test {
    public static void main(String[] args) {
        CarDTO carDTO = new CarDTO();
        carDTO.setAvailabilityType(CarAvailabilityType.NOT_AVAILABLE);
        CarAvailabilityType type = carDTO.getAvailabilityType();
        System.out.println(type);
    }
}
