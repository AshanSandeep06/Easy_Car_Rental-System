package lk.easy.carRental.service;

import lk.easy.carRental.dto.DriverDTO;
import lk.easy.carRental.dto.DriverLicenseImageDTO;

public interface DriverService {
    DriverDTO getDriverDetails(String driverUsername);
    DriverLicenseImageDTO getDriverImages(String driverId);
    void updateDriver(DriverDTO driverDTO);
    void uploadDriverLicenseImage(String driverId, String licenseImage);
}
