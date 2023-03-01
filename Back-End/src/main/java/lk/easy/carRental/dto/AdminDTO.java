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
@ToString
@Data
public class AdminDTO {
    private String adminNic;
    private String adminName;
    private String contactNumber;
    private String email;
    private User_credentialsDTO user_credentials;
}
