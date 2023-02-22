package lk.easy.carRental.service;

import lk.easy.carRental.dto.CarDTO;
import lk.easy.carRental.dto.ImageDTO;

import java.util.ArrayList;

public interface CarService {
    void saveCar(CarDTO carDTO);
    void updateCar(CarDTO carDTO);
    void deleteCar(String carId);
    ArrayList<CarDTO> getAllCars();
    void uploadCarImages(String carId, String frontImage, String backImage, String sideImage, String interiorImage);
    ImageDTO getCarImages(String carId);
}
