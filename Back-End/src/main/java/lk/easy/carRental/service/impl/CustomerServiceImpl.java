package lk.easy.carRental.service.impl;

import lk.easy.carRental.dto.CarDTO;
import lk.easy.carRental.dto.CustomerDTO;
import lk.easy.carRental.entity.Car;
import lk.easy.carRental.entity.Customer;
import lk.easy.carRental.repo.CarRepo;
import lk.easy.carRental.repo.CustomerRepo;
import lk.easy.carRental.service.CustomerService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class CustomerServiceImpl implements CustomerService {
    @Autowired
    private CustomerRepo customerRepo;
    @Autowired
    private ModelMapper mapper;

    @Override
    public void registerCustomer(CustomerDTO customerDTO) {
        if (!customerRepo.existsById(customerDTO.getCustomerId())) {
            customerRepo.save(mapper.map(customerDTO, Customer.class));
        } else {
            throw new RuntimeException("This Customer is Already Exists, Therefore Can't be Register..!");
        }
    }

    @Override
    public void uploadNICAndLicenseImages(String customerId, String nicImage, String licenseImage) {
        if (customerRepo.existsById(customerId)) {
            customerRepo.uploadCustomerImages(customerId, nicImage, licenseImage);
        } else {
            throw new RuntimeException("There is No Such a Customer to Upload NIC and License Images");
        }
    }
}
