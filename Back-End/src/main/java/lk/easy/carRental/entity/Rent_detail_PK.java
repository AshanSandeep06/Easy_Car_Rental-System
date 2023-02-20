package lk.easy.carRental.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class Rent_detail_PK implements Serializable {
    private String rentId;

    private String carId;
}
