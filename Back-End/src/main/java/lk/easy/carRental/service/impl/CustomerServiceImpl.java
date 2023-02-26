package lk.easy.carRental.service.impl;

import lk.easy.carRental.dto.CarDTO;
import lk.easy.carRental.dto.CustomerDTO;
import lk.easy.carRental.dto.ImageDTO;
import lk.easy.carRental.dto.NicAndLicenseImageDTO;
import lk.easy.carRental.embedded.CustomerImage;
import lk.easy.carRental.embedded.VehicleImage;
import lk.easy.carRental.entity.Car;
import lk.easy.carRental.entity.Customer;
import lk.easy.carRental.entity.User_credentials;
import lk.easy.carRental.repo.CarRepo;
import lk.easy.carRental.repo.CustomerRepo;
import lk.easy.carRental.repo.User_credentialsRepo;
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
    private User_credentialsRepo userRepo;
    @Autowired
    private ModelMapper mapper;

    @Override
    public void registerCustomer(CustomerDTO customerDTO) {
        if (!customerRepo.existsById(customerDTO.getCustomerId())) {
            Customer entity = mapper.map(customerDTO, Customer.class);

            User_credentials user = userRepo.findUser_credentialsByUsername(customerDTO.getUser_credentials());
            entity.setUser_credentials(user);

            customerRepo.save(entity);
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

    @Override
    public String generateNewCustomerID() {
        String lastCustomerID = customerRepo.getLastCustomerId();
        if (lastCustomerID != null) {
            int tempId = Integer.parseInt(lastCustomerID.split("-")[1]);
            tempId++;
            if (tempId <= 9) {
                return "C00-00" + tempId;
            } else if (tempId <= 99) {
                return "C00-0" + tempId;
            } else {
                return "C00-" + tempId;
            }
        } else {
            return "C00-001";
        }
    }

    @Override
    public CustomerDTO getCustomerDetails(String username) {
        if (userRepo.existsByUsername(username)) {
            return mapper.map(customerRepo.findCustomerByUsername(username), CustomerDTO.class);
        } else {
            throw new RuntimeException("There is No Such a User by this Username");
        }
    }

    @Override
    public NicAndLicenseImageDTO getCustomerImages(String customerId) {
        Customer entity = customerRepo.findById(customerId).get();
        CustomerImage images = entity.getUploadedImages();
        if (images != null) {
            return new NicAndLicenseImageDTO(images.getNicImage(), images.getLicenseImage());
        } else {
            throw new RuntimeException("This Customer has no images yet..!");
        }
    }
}
