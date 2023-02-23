package lk.easy.carRental.dto;

import lk.easy.carRental.entity.User_credentials;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class CustomerDTO {
    private String customerId;
    private String nic;
    private String name;
    private String email;
    private String address;
    private String contactNumber;
    private String licenseNo;
    private User_credentialsDTO user_credentials;
}
