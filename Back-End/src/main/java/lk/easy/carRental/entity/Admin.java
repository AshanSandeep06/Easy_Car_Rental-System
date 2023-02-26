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
public class Admin {
    @Id
    private String adminNic;

    private String adminName;

    private String contactNumber;

    private String email;

    @OneToOne(cascade = CascadeType.ALL)
    private User_credentials user_credentials;
}
