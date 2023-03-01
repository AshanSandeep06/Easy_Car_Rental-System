package lk.easy.carRental.service.impl;

import lk.easy.carRental.config.WebRootConfig;
import lk.easy.carRental.dto.DriverDTO;
import lk.easy.carRental.dto.User_credentialsDTO;
import lk.easy.carRental.entity.Driver;
import lk.easy.carRental.entity.User_credentials;
import lk.easy.carRental.repo.CarRepo;
import lk.easy.carRental.repo.DriverRepo;
import lk.easy.carRental.repo.User_credentialsRepo;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.transaction.annotation.Transactional;
@WebAppConfiguration
@ContextConfiguration(classes = {WebRootConfig.class})
@ExtendWith(SpringExtension.class)
//@Transactional
class DriverServiceImplTest {
    @Autowired
    DriverRepo driverRepo;
    @Autowired
    User_credentialsRepo userRepo;
    @Autowired
    ModelMapper mapper;

    @Test
    public void saveDriverLogin(){
        User_credentialsDTO dto = new User_credentialsDTO("mrsilva099", "mrsilva459063", "Admin");
        userRepo.save(mapper.map(dto, User_credentials.class));

        DriverDTO driverDTO = new DriverDTO("D002", "Kumara Bandusena", "Galle", "0764582894", "19956784395V", "B8794563", null, "Available", dto);
        Driver driver = mapper.map(driverDTO, Driver.class);
        System.out.println(driverDTO);
        System.out.println(driver);
        driverRepo.save(driver);

    }

}