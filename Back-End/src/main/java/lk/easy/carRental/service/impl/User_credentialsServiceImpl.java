package lk.easy.carRental.service.impl;

import lk.easy.carRental.dto.CarDTO;
import lk.easy.carRental.dto.User_credentialsDTO;
import lk.easy.carRental.entity.Car;
import lk.easy.carRental.entity.Customer;
import lk.easy.carRental.entity.User_credentials;
import lk.easy.carRental.repo.CarRepo;
import lk.easy.carRental.repo.CustomerRepo;
import lk.easy.carRental.repo.User_credentialsRepo;
import lk.easy.carRental.service.User_credentialsService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class User_credentialsServiceImpl implements User_credentialsService {
    @Autowired
    private User_credentialsRepo userRepo;
    @Autowired
    private CustomerRepo customerRepo;
    @Autowired
    private ModelMapper mapper;

    @Override
    public void saveUserCredentials(User_credentialsDTO userDTO) {
        if (!userRepo.existsByUsername(userDTO.getUsername())) {
            userRepo.save(mapper.map(userDTO, User_credentials.class));
        } else {
            throw new RuntimeException("This User is Already Exists, Therefore Can't be Saved..!");
        }
    }

    @Override
    public User_credentialsDTO getUserCredentials(String username, String password) {
        User_credentials userEntity = userRepo.findByUsernameAndPassword(username, password);
        if (userEntity != null) {
            return mapper.map(userEntity, User_credentialsDTO.class);
        } else {
            throw new RuntimeException("You Given Incorrect Username Or Password..!, Please Try again");
        }
    }

    @Override
    public User_credentialsDTO getUserCredentials(String username) {
        User_credentials entity = userRepo.findById(username).get();
        if (entity != null) {
            return mapper.map(entity, User_credentialsDTO.class);
        } else {
            throw new RuntimeException("You Given Incorrect Username..!, Invalid Username");
        }
    }

    @Override
    public void resetUserPassword(User_credentialsDTO userDTO) {
        if (userRepo.existsByUsername(userDTO.getUsername())) {
            if (userRepo.updatePasswordByUsername(userDTO.getUsername(), userDTO.getPassword()) <= 0) {
                throw new RuntimeException("Password Reset Process Failed..!");
            }
        } else {
            throw new RuntimeException("This User is not exists, Therefore Can't reset password..!");
        }
    }

    @Override
    public void updateUserCredentials(User_credentialsDTO userDTO) {
        if (userRepo.existsByUsername(userDTO.getUsername())) {
            User_credentials user = userRepo.findById(userDTO.getUsername()).get();
            user.setPassword(userDTO.getPassword());
            user.setRole(userDTO.getRole());
            userRepo.save(user);
        } else {
            throw new RuntimeException("This User is not exists, Therefore Can't Update User..!");
        }
    }

    @Override
    public User_credentialsDTO getCustomerUserCredentials(String jobRole, String customerId) {
        Customer customer = customerRepo.findById(customerId).get();
        User_credentials userCredentials = customer.getUser_credentials();
        if (customer != null) {
            return mapper.map(userCredentials, User_credentialsDTO.class);
        } else {
            throw new RuntimeException("This Customer doesn't exists");
        }
    }
}
