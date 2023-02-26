package lk.easy.carRental.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class NicAndLicenseImageDTO {
    private String nicImage;
    private String licenseImage;
}
