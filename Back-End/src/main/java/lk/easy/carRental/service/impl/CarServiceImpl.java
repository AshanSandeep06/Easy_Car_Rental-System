package lk.easy.carRental.service.impl;

import lk.easy.carRental.dto.CarDTO;
import lk.easy.carRental.entity.Car;
import lk.easy.carRental.repo.CarRepo;
import lk.easy.carRental.service.CarService;
import org.modelmapper.ModelMapper;
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
        if(!carRepo.existsById(carDTO.getCarId())){
            Car entity = mapper.map(carDTO, Car.class);
            carRepo.save(entity);
        }else{
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
        return null;
    }
}
