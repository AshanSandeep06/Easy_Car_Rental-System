package lk.easy.carRental.service;

import lk.easy.carRental.dto.CustomerDTO;
import lk.easy.carRental.dto.ImageDTO;
import lk.easy.carRental.dto.NicAndLicenseImageDTO;

import java.util.ArrayList;

public interface CustomerService {
    void registerCustomer(CustomerDTO customerDTO);
    void uploadNICAndLicenseImages(String customerId, String nicImage, String licenseImage);
    void uploadCustomerNICImage(String customerId, String nicImage);
    void uploadCustomerLicenseImage(String customerId, String licenseImage);
    String generateNewCustomerID();
    CustomerDTO getCustomerDetails(String username);
    NicAndLicenseImageDTO getCustomerImages(String customerId);
    void updateCustomer(CustomerDTO customerDTO);
    void updateCustomerContactNumber(String customerId, String contactNumber);
    ArrayList<CustomerDTO> getAllCustomers();
    CustomerDTO getCustomerByCustomerID(String customerId);
    CustomerDTO getCustomerByCustomerNIC(String customerNIC);
    int getCustomerCount();
}
