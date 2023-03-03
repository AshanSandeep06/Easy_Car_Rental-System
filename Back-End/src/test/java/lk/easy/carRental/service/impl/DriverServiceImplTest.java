package lk.easy.carRental.service.impl;

import lk.easy.carRental.config.WebRootConfig;
import lk.easy.carRental.dto.AdminDTO;
import lk.easy.carRental.dto.DriverDTO;
import lk.easy.carRental.dto.User_credentialsDTO;
import lk.easy.carRental.entity.Admin;
import lk.easy.carRental.entity.Driver;
import lk.easy.carRental.entity.User_credentials;
import lk.easy.carRental.repo.AdminRepo;
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
    AdminRepo adminRepo;
    @Autowired
    User_credentialsRepo userRepo;
    @Autowired
    ModelMapper mapper;

    @Test
    public void saveDriverLogin(){
        User_credentialsDTO dto = new User_credentialsDTO("mrsilva099", "mrsilva459063", "Admin");
        userRepo.save(mapper.map(dto, User_credentials.class));

        AdminDTO adminDTO = new AdminDTO("19926745365V", "Kamal Silva", "0775667394", "kamalsilva043@gmail.com", dto);
        Admin admin = mapper.map(adminDTO, Admin.class);
        System.out.println(adminDTO);
        System.out.println(admin);
        adminRepo.save(admin);
    }

}