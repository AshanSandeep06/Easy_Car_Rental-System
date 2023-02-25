package lk.easy.carRental.dto;

import lk.easy.carRental.entity.User_credentials;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.CascadeType;
import javax.persistence.OneToOne;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class DriverDTO {
    private String driverId;

    private String name;

    private String address;

    private String contactNumber;

    private String nic;

    private String licenseNo;

    private String licenseImage;

    private String availabilityType;

    private User_credentialsDTO user_credentials;
}
