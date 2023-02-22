package lk.easy.carRental.dto;

import lk.easy.carRental.embedded.Mileage;
import lk.easy.carRental.embedded.PriceRate;
import lk.easy.carRental.entity.Car;
import lk.easy.carRental.enums.CarAvailabilityType;
import lk.easy.carRental.enums.CarType;
import lk.easy.carRental.enums.FuelType;
import lk.easy.carRental.enums.TransmissionType;
import org.modelmapper.ModelMapper;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class Test {
    public static void main(String[] args) {
        Test t1 = new Test();
        t1.call();
    }

    public void call(){

        try {
            String pathDirectory = new File("F:\\Ijse\\GDSE 60\\Easy_Car_Rental-System\\Front-End\\assets\\img\\uploads\\carImages\\").getAbsolutePath();

            Path frontImageLocation = Paths.get(pathDirectory + "/" + "V001_ashan-image.png");

            Files.delete(frontImageLocation);


        } catch (IOException e) {
            throw new RuntimeException(e);
        }






    }
}
