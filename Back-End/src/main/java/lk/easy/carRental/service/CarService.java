package lk.easy.carRental.service;

import lk.easy.carRental.dto.CarDTO;

import java.util.ArrayList;

public interface CarService {
    void saveCar(CarDTO carDTO);
    void updateCar(CarDTO carDTO);
    void deleteCar(String carId);
    ArrayList<CarDTO> getAllCars();
}
