package lk.easy.carRental.service.impl;

import lk.easy.carRental.config.WebRootConfig;
import lk.easy.carRental.dto.CustomerDTO;
import lk.easy.carRental.dto.DriverDTO;
import lk.easy.carRental.dto.RentDTO;
import lk.easy.carRental.dto.Rent_detailDTO;
import lk.easy.carRental.entity.Car;
import lk.easy.carRental.entity.Driver;
import lk.easy.carRental.entity.Rent;
import lk.easy.carRental.repo.CustomerRepo;
import lk.easy.carRental.repo.DriverRepo;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import static org.junit.jupiter.api.Assertions.*;

@WebAppConfiguration
@ContextConfiguration(classes = {WebRootConfig.class})
@ExtendWith(SpringExtension.class)
@Transactional
class RentServiceImplTest {

    @Autowired
    DriverRepo driverRepo;

    @Autowired
    ModelMapper mapper;

    @Autowired
    CustomerRepo customerRepo;
    List<Rent_detailDTO> rentDetailDTO = new ArrayList<>();
    RentDTO rentDTO;

    /*@Test
    void placeRent(RentDTO rentDTO) {
        rentDTO = new RentDTO("R001", LocalTime.now(), LocalDate.now(), LocalTime.now(), LocalDate.now(), "Yes", "Galle", "Pending", "N/A", mapper.map(customerRepo.findById("C00-001").get(), CustomerDTO.class), rentDetailDTO);
        Random random = new Random();

        ArrayList<Driver> allAvailableDrivers = driverRepo.findDriverByAvailabilityType("Available");
        Driver assignableDriver = allAvailableDrivers.get(random.nextInt(allAvailableDrivers.size()));

        rentDetailDTO.get(0).setDriver(mapper.map(assignableDriver, DriverDTO.class));

        rentDTO.getRentDetail().get(0).setDriver(mapper.map(assignableDriver, DriverDTO.class));

        System.out.println(assignableDriver);
        assignableDriver.setAvailabilityType("Unavailable");
        driverRepo.save(assignableDriver);


        Rent rent = mapper.map(rentDTO, Rent.class);
        System.out.println(rent);
    }*/
}