package lk.easy.carRental.entity;

import lk.easy.carRental.embedded.CustomerImage;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
@Entity
public class Customer {
    @Id
    private String customerId;

    private String nic;

    private String name;

    private String email;

    private String address;

    private String contactNumber;

    private String licenseNo;

    @Embedded
    private CustomerImage uploadedImages;

    @OneToOne(cascade = CascadeType.ALL)
    private User_credentials user_credentials;
}
