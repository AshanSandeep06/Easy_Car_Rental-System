package lk.easy.carRental.service.impl;

import lk.easy.carRental.dto.Rent_detailDTO;
import lk.easy.carRental.entity.Driver;
import lk.easy.carRental.entity.Rent_detail;
import lk.easy.carRental.repo.DriverRepo;
import lk.easy.carRental.repo.RentRepo;
import lk.easy.carRental.repo.Rent_detailRepo;
import lk.easy.carRental.service.Rent_detailService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class Rent_detailServiceImpl implements Rent_detailService {
    @Autowired
    private Rent_detailRepo rentDetailRepo;
    @Autowired
    private RentRepo rentRepo;
    @Autowired
    private DriverRepo driverRepo;
    @Autowired
    private ModelMapper mapper;

    @Override
    public void updateRentDetails(Rent_detailDTO rent_detailDTO) {
        if (rentRepo.existsById(rent_detailDTO.getRentId())) {
            Driver driver = driverRepo.findById(rent_detailDTO.getDriver().getDriverId()).get();
            Rent_detail rent_detail = mapper.map(rent_detailDTO, Rent_detail.class);
            rent_detail.setDriver(driver);
            rentDetailRepo.save(rent_detail);

        } else {
            throw new RuntimeException("This Rent is not exists..!");
        }
    }
}
