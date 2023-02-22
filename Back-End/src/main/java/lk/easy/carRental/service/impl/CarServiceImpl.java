package lk.easy.carRental.service.impl;

import lk.easy.carRental.dto.CarDTO;
import lk.easy.carRental.dto.ImageDTO;
import lk.easy.carRental.embedded.VehicleImage;
import lk.easy.carRental.entity.Car;
import lk.easy.carRental.repo.CarRepo;
import lk.easy.carRental.service.CarService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@Service
@Transactional
public class CarServiceImpl implements CarService {
    @Autowired
    private CarRepo carRepo;
    @Autowired
    private ModelMapper mapper;

    @Override
    public void saveCar(CarDTO carDTO) {
        if (!carRepo.existsById(carDTO.getCarId())) {
            Car entity = mapper.map(carDTO, Car.class);
            carRepo.save(entity);
        } else {
            throw new RuntimeException("This Vehicle Already Exists, Therefore Can't be Saved..!");
        }
    }

    @Override
    public void updateCar(CarDTO carDTO) {

    }

    @Override
    public void deleteCar(String carId) {

    }

    @Override
    public ArrayList<CarDTO> getAllCars() {
        return mapper.map(carRepo.findAll(), new TypeToken<ArrayList<CarDTO>>() {
        }.getType());
    }

    @Override
    public void uploadCarImages(String carId, String frontImage, String backImage, String sideImage, String interiorImage) {
        if (carRepo.existsById(carId)) {
            carRepo.uploadCarImages(carId, frontImage, backImage, sideImage, interiorImage);
        } else {
            throw new RuntimeException("There is No Such a Car to Upload Car Images");
        }
    }

    @Override
    public ImageDTO getCarImages(String carId) {
        Car entity = carRepo.getCarImages(carId);
        VehicleImage images = entity.getVehicleImages();
        return new ImageDTO(images.getFront(), images.getBack(), images.getSide(), images.getInterior());
    }
}
