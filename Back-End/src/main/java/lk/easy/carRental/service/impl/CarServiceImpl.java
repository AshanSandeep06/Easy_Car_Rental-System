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
            carRepo.save(mapper.map(carDTO, Car.class));
        } else {
            throw new RuntimeException("This Vehicle Already Exists, Therefore Can't be Saved..!");
        }
    }

    @Override
    public void updateCar(CarDTO dto) {
        if (carRepo.existsById(dto.getCarId())) {
//            carRepo.save(mapper.map(carDTO, Car.class));
            carRepo.updateCar(
                    dto.getCarId(),
                    dto.getRegisterNum(),
                    dto.getBrand(),
                    dto.getType(),
                    dto.getPriceRate().getDailyRate(),
                    dto.getPriceRate().getMonthlyRate(),
                    dto.getFreeMileage().getDailyMileage(),
                    dto.getFreeMileage().getMonthlyMileage(),
                    dto.getColor(),
                    dto.getTransmissionType(),
                    dto.getNumOfPassengers(),
                    dto.getFuelType(),
                    dto.getPricePerExtraKM(),
                    dto.getLossDamageWaiver(),
                    dto.getLastServiceMileage(),
                    dto.getAvailabilityType()
            );
        } else {
            throw new RuntimeException("There is No Such a Car, Therefore Can't be Updated..!");
        }
    }

    @Override
    public void deleteCar(String carId) {
        if (carRepo.existsById(carId)) {
            carRepo.deleteById(carId);
        } else {
            throw new RuntimeException("There is No Such a Car, Therefore Can't be Deleted..!");
        }
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
        Car entity = carRepo.findById(carId).get();
        VehicleImage images = entity.getVehicleImages();
        if (images != null) {
            return new ImageDTO(images.getFront(), images.getBack(), images.getSide(), images.getInterior());
        } else {
            throw new RuntimeException("This Car has no images yet..!");
        }
    }
}
