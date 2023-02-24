package lk.easy.carRental.service;

import lk.easy.carRental.dto.User_credentialsDTO;

public interface User_credentialsService {
    void saveUserCredentials(User_credentialsDTO userDTO);
    User_credentialsDTO getUserCredentials(String username, String password);
}
