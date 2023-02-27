package lk.easy.carRental.service.impl;

import lk.easy.carRental.dto.CustomerDTO;
import lk.easy.carRental.dto.DriverDTO;
import lk.easy.carRental.dto.DriverLicenseImageDTO;
import lk.easy.carRental.dto.NicAndLicenseImageDTO;
import lk.easy.carRental.embedded.CustomerImage;
import lk.easy.carRental.entity.Customer;
import lk.easy.carRental.entity.Driver;
import lk.easy.carRental.repo.DriverRepo;
import lk.easy.carRental.repo.User_credentialsRepo;
import lk.easy.carRental.service.DriverService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
}
