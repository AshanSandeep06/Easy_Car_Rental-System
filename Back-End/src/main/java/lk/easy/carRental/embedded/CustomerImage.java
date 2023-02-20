package lk.easy.carRental.embedded;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Embeddable;

@NoArgsConstructor
@AllArgsConstructor
@ToString
@Data
@Embeddable
public class CustomerImage {
    private String nicImage;
    private String licenseImage;
}
