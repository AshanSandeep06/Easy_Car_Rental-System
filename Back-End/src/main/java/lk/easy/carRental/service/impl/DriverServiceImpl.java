package lk.easy.carRental.service.impl;

import lk.easy.carRental.dto.*;
import lk.easy.carRental.embedded.CustomerImage;
import lk.easy.carRental.entity.Customer;
import lk.easy.carRental.entity.Driver;
import lk.easy.carRental.repo.DriverRepo;
import lk.easy.carRental.repo.User_credentialsRepo;
import lk.easy.carRental.service.DriverService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@Service
@Transactional
public class DriverServiceImpl implements DriverService {
    @Autowired
    private DriverRepo driverRepo;
    @Autowired
    private User_credentialsRepo userRepo;
    @Autowired
    private ModelMapper mapper;

    @Override
    public DriverDTO getDriverDetails(String driverUsername) {
        if (userRepo.existsByUsername(driverUsername)) {
            return mapper.map(driverRepo.findDriverByUsername(driverUsername), DriverDTO.class);
        } else {
            throw new RuntimeException("There is No Such a Driver by this Username");
        }
    }

    @Override
    public DriverLicenseImageDTO getDriverImages(String driverId) {
        Driver entity = driverRepo.findById(driverId).get();
        String driverLicenseImage = entity.getLicenseImage();
        if (driverLicenseImage != null) {
            return new DriverLicenseImageDTO(driverLicenseImage);
        } else {
            throw new RuntimeException("This Driver has no images yet..!");
        }
    }

    @Override
    public void updateDriver(DriverDTO driverDTO) {
        Driver driver = driverRepo.findById(driverDTO.getDriverId()).get();
        if (driver != null) {
            driver.setName(driverDTO.getName());
            driver.setAddress(driverDTO.getAddress());
            driver.setContactNumber(driverDTO.getContactNumber());
            driver.setNic(driverDTO.getNic());
            driver.setLicenseNo(driverDTO.getLicenseNo());
            driverRepo.save(driver);
        } else {
            throw new RuntimeException("This Driver is not exists..!");
        }
    }

    @Override
    public void uploadDriverLicenseImage(String driverId, String licenseImage) {
        if (driverRepo.existsById(driverId)) {
            driverRepo.uploadCustomerLicenseImage(driverId, licenseImage);
        } else {
            throw new RuntimeException("There is No Such a Driver to Upload License Image");
        }
    }

    @Override
    public ArrayList<DriverDTO> getAllDrivers() {
        return mapper.map(driverRepo.findAll(), new TypeToken<ArrayList<DriverDTO>>() {
        }.getType());
    }

    @Override
    public String getDriverName(String driverId) {
        if (driverRepo.existsById(driverId)) {
            Driver driver = driverRepo.findById(driverId).get();
            return driver.getName();
        } else {
            throw new RuntimeException("This Driver is not exists..!");
        }
    }
}
