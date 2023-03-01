package lk.easy.carRental.service;

import lk.easy.carRental.dto.DriverDTO;
import lk.easy.carRental.dto.DriverLicenseImageDTO;

import java.util.ArrayList;

public interface DriverService {
    DriverDTO getDriverDetails(String driverUsername);
    DriverLicenseImageDTO getDriverImages(String driverId);
    void updateDriver(DriverDTO driverDTO);
    void saveDriver(DriverDTO driverDTO);
    void uploadDriverLicenseImage(String driverId, String licenseImage);
    ArrayList<DriverDTO> getAllDrivers();
    String getDriverName(String driverId);
    String generateNewDriverID();
    void deleteDriver(String driverID);
    int getOccupiedDriverCount();
    int getAvailableDriversCount();
}
