package lk.easy.carRental.entity;

import lk.easy.carRental.enums.PaymentType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
@Entity
public class Payment {
    @Id
    private String paymentId;

    private String paymentType;

    private LocalDate paymentDate;

    private LocalTime paymentTime;

    private double amount;

    private double cash;

    private double balance;

    @ManyToOne(cascade = {CascadeType.REFRESH, CascadeType.DETACH})
    @JoinColumn(name = "rentId", referencedColumnName = "rentId", nullable = false)
    private Rent rent;
}
