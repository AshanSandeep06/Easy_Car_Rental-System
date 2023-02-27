package lk.easy.carRental.service;

import lk.easy.carRental.dto.User_credentialsDTO;

public interface User_credentialsService {
    void saveUserCredentials(User_credentialsDTO userDTO);
    User_credentialsDTO getUserCredentials(String username, String password);
    User_credentialsDTO getUserCredentials(String username);
    void resetUserPassword(User_credentialsDTO userDTO);
    void updateUserCredentials(User_credentialsDTO userDTO);
    User_credentialsDTO getCustomerUserCredentials(String jobRole, String customerId);
}
