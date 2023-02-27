package lk.easy.carRental.service;

import lk.easy.carRental.dto.RentDTO;

import java.util.ArrayList;

public interface RentService {
    String generateNewRentID();
    void placeRent(RentDTO rentDTO);
    ArrayList<RentDTO> getAllActiveBookings(String customerId);
    ArrayList<RentDTO> getBookingsRentStatus(String customerId);
    ArrayList<RentDTO> getAllRentsByDriverRequestingType(String driverRequestingType);
    ArrayList<RentDTO> loadAllPendingRentalRequests(String rentStatus);
    void cancelRentRequest(String rentId);
    void updateRentStatus(String rentId, String rentStatus);
    int getOngoingRentalsCount(String customerId);
}
