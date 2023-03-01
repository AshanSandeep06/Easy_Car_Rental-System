package lk.easy.carRental.service.impl;

import lk.easy.carRental.dto.*;
import lk.easy.carRental.embedded.CustomerImage;
import lk.easy.carRental.entity.Customer;
import lk.easy.carRental.entity.Driver;
import lk.easy.carRental.entity.Rent_detail;
import lk.easy.carRental.entity.User_credentials;
import lk.easy.carRental.repo.DriverRepo;
import lk.easy.carRental.repo.Rent_detailRepo;
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
    private Rent_detailRepo rentDetailRepo;
    @Autowired
    private ModelMapper mapper;

    @Override
    public String generateNewDriverID() {
        String lastDriverId = driverRepo.getLastDriverId();
        if (lastDriverId != null) {
            int tempId = Integer.parseInt(lastDriverId.split("D")[1]);
            tempId++;
            if (tempId <= 9) {
                return "D00" + tempId;
            } else if (tempId <= 99) {
                return "D0" + tempId;
            } else {
                return "D" + tempId;
            }
        } else {
            return "D001";
        }
    }

    @Override
    public void deleteDriver(String driverID) {
        if (driverRepo.existsById(driverID)) {
            ArrayList<Rent_detail> rentDetail = rentDetailRepo.getRentDetailsByDriverId(driverID);
            if (rentDetail.size() > 0) {
                throw new RuntimeException("This Driver has Ongoing or Finished Rentals, Therefore, Can't Delete..!");
            } else {
                driverRepo.deleteById(driverID);
            }
        } else {
            throw new RuntimeException("There is No Such a Driver, Therefore Can't be Deleted..!");
        }
    }

    @Override
    public int getOccupiedDriverCount() {
        return driverRepo.getOccupiedDriverCount();
    }

    @Override
    public int getAvailableDriversCount() {
        return driverRepo.getAvailableDriversCount();
    }

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
        System.out.println(driverLicenseImage);
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
            if (driverDTO.getAvailabilityType() != null) {
                driver.setAvailabilityType(driverDTO.getAvailabilityType());
            }

            if (driverDTO.getUser_credentials() != null) {
                if (userRepo.existsByUsername(driverDTO.getUser_credentials().getUsername())) {
                    userRepo.save(mapper.map(driverDTO.getUser_credentials(), User_credentials.class));
                } else {
                    throw new RuntimeException("This User isn't exists..!");
                }
            }

            driverRepo.save(driver);
        } else {
            throw new RuntimeException("This Driver is not exists..!");
        }
    }

    @Override
    public void saveDriver(DriverDTO driverDTO) {
        if (!driverRepo.existsById(driverDTO.getDriverId())) {
            if (!userRepo.existsByUsername(driverDTO.getUser_credentials().getUsername())) {
                userRepo.save(mapper.map(driverDTO.getUser_credentials(), User_credentials.class));
                driverRepo.save(mapper.map(driverDTO, Driver.class));
            } else {
                throw new RuntimeException("This User is already exists..!");
            }
        } else {
            throw new RuntimeException("This Driver is already exists..!");
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
