package lk.easy.carRental.util;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class ResponseUtil {
    private String state;
    private String message;
    private Object data;
}
