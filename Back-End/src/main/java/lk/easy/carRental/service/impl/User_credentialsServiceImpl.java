package lk.easy.carRental.service.impl;

import lk.easy.carRental.dto.CarDTO;
import lk.easy.carRental.dto.User_credentialsDTO;
import lk.easy.carRental.entity.Car;
import lk.easy.carRental.entity.User_credentials;
import lk.easy.carRental.repo.CarRepo;
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
}
