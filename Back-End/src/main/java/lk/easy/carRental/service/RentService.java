package lk.easy.carRental.service;

import lk.easy.carRental.dto.RentDTO;

public interface RentService {
    String generateNewRentID();
    void placeRent(RentDTO rentDTO);
}
