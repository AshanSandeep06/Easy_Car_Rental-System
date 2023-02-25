package lk.easy.carRental.service;

import lk.easy.carRental.dto.CustomerDTO;

public interface CustomerService {
    void registerCustomer(CustomerDTO customerDTO);
    void uploadNICAndLicenseImages(String customerId, String nicImage, String licenseImage);
    String generateNewCustomerID();
    CustomerDTO getCustomerDetails(String username);
}
