package lk.easy.carRental.entity;

import lk.easy.carRental.enums.RentStatusType;
import lk.easy.carRental.enums.RequestType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
@Entity
public class Rent {
    @Id
    private String rentId;

    private LocalTime pickUpTime;

    private LocalDate pickUpDate;

    private LocalTime returnTime;

    private LocalDate returnDate;

    private String requestTypeOfDriver;

    private String location;

    private String rentStatus;

    private String deniedReason;

    @ManyToOne(cascade = {CascadeType.REFRESH,CascadeType.DETACH})
    @JoinColumn(name = "customerId",referencedColumnName = "customerId",nullable = false)
    private Customer customer;

    @OneToMany(mappedBy = "rent",cascade = CascadeType.ALL)
    private List<Rent_detail> rentDetail;
}
