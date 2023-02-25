package lk.easy.carRental.service.impl;

import lk.easy.carRental.repo.RentRepo;
import lk.easy.carRental.service.RentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class RentServiceImpl implements RentService {
    @Autowired
    private RentRepo rentRepo;

    @Override
    public String generateNewRentID() {
        String lastRentID = rentRepo.getLastRentId();
        if (lastRentID != null) {
            int tempId = Integer.parseInt(lastRentID.split("-")[1]);
            tempId++;
            if (tempId <= 9) {
                return "R00-00" + tempId;
            } else if (tempId <= 99) {
                return "R00-0" + tempId;
            } else {
                return "R00-" + tempId;
            }
        } else {
            return "R00-001";
        }
    }
}
