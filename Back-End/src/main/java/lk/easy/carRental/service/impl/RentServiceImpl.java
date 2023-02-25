package lk.easy.carRental.service.impl;

import lk.easy.carRental.dto.DriverDTO;
import lk.easy.carRental.dto.RentDTO;
import lk.easy.carRental.entity.Car;
import lk.easy.carRental.entity.Driver;
import lk.easy.carRental.entity.Rent;
import lk.easy.carRental.entity.Rent_detail;
import lk.easy.carRental.repo.CarRepo;
import lk.easy.carRental.repo.DriverRepo;
import lk.easy.carRental.repo.RentRepo;
import lk.easy.carRental.repo.Rent_detailRepo;
import lk.easy.carRental.service.RentService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
@Transactional
public class RentServiceImpl implements RentService {
    @Autowired
    private RentRepo rentRepo;

    @Autowired
    private DriverRepo driverRepo;

    @Autowired
    private CarRepo carRepo;

    @Autowired
    private Rent_detailRepo rentDetailRepo;
    @Autowired
    private ModelMapper mapper;

    @Override
    public String generateNewRentID() {
        String lastRentID = rentRepo.getLastRentId();
        if (lastRentID != null) {
            int tempId = Integer.parseInt(lastRentID.split("-")[1]);
            tempId++;
            if (tempId <= 9) {
                return "R00-00" + tempId;
            } else if (tempId <= 99) {
                return "R00-0" + tempId;
            } else {
                return "R00-" + tempId;
            }
        } else {
            return "R00-001";
        }
    }

    @Override
    public void placeRent(RentDTO rentDTO) {
        Random random = new Random();
        Rent rent = mapper.map(rentDTO, Rent.class);

        if (rentDTO.getRequestTypeOfDriver().equals("Yes")) {
            ArrayList<Driver> allAvailableDrivers = driverRepo.findDriverByAvailabilityType("Available");
            if (allAvailableDrivers.size() > 0) {
                Driver assignableDriver = allAvailableDrivers.get(random.nextInt(allAvailableDrivers.size()));
                rent.getRentDetail().get(0).setDriver(assignableDriver);
                System.out.println(assignableDriver);
                assignableDriver.setAvailabilityType("Unavailable");
                driverRepo.save(assignableDriver);
            } else {
                throw new RuntimeException("Can't Reserve a Driver for Your Rental Request on this Time, Please Try again..!");
            }
        }

        if (rentRepo.existsById(rent.getRentId())) {
            throw new RuntimeException("Can't Place this Rent Request, This is Already Added..!");
        }
        rentRepo.save(rent);

        Car car = carRepo.findById(rentDTO.getRentDetail().get(0).getCarId()).get();
        car.setAvailabilityType("Unavailable");
        carRepo.save(car);

    }
}
