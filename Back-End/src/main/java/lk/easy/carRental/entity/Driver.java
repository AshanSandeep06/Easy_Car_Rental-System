package lk.easy.carRental.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToOne;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
@Entity
public class Driver {
    @Id
    private String driverId;

    private String name;

    private String address;

    private String contactNumber;

    private String nic;

    private String licenseNo;

    private String licenseImage;

    private String availabilityType;

    @OneToOne(cascade = CascadeType.ALL)
    private User_credentials user_credentials;
}
