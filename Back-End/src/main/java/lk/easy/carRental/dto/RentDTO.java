package lk.easy.carRental.dto;

import lk.easy.carRental.entity.Customer;
import lk.easy.carRental.entity.Rent_detail;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.CascadeType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class RentDTO {
    private String rentId;

    private LocalTime pickUpTime;

    private LocalDate pickUpDate;

    private LocalTime returnTime;

    private LocalDate returnDate;

    private String requestTypeOfDriver;

    private String location;

    private String rentStatus;

    private String deniedReason;

    private String customer;

    private List<Rent_detailDTO> rentDetail;
}
