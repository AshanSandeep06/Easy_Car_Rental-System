package lk.easy.carRental.embedded;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Embeddable;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
@Embeddable
public class PriceRate {
    private double dailyRate;

    private double monthlyRate;
}
