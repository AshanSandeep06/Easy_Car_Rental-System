package lk.easy.carRental.dto;

import lk.easy.carRental.embedded.CustomerImage;
import lk.easy.carRental.embedded.Mileage;
import lk.easy.carRental.embedded.PriceRate;
import lk.easy.carRental.entity.Car;
import lk.easy.carRental.entity.Customer;
import lk.easy.carRental.entity.User_credentials;
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
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class Test {
    public static void main(String[] args) {
        Test t1 = new Test();
        t1.call();
    }

    public void call() {

        /*try {
            String pathDirectory = new File("F:\\Ijse\\GDSE 60\\Easy_Car_Rental-System\\Front-End\\assets\\img\\uploads\\carImages\\").getAbsolutePath();

            Path frontImageLocation = Paths.get(pathDirectory + "/" + "V001_ashan-image.png");

            Files.delete(frontImageLocation);


        } catch (IOException e) {
            throw new RuntimeException(e);
        }*/


        /*User_credentials user = new User_credentials();
        user.setUsername("Nima03333");
        Customer c1 = new Customer("C001", "2001", "Nimal Perera", "nimal@gmail.com", "Galle", "0779851784", "B4567034", new CustomerImage("nic.png", "license.png"),user);

        ModelMapper mapper = new ModelMapper();
        CustomerDTO dto = mapper.map(c1, CustomerDTO.class);

//        System.out.println(dto);

//        System.out.println(dto.getUser_credentials());

        Customer c2 = new Customer();
        c2.setUser_credentials(new User_credentials("kamal0234", "1234", "Customer"));

        CustomerDTO dto1 = mapper.map(c2, CustomerDTO.class);
        System.out.println(dto1.getUser_credentials());*/

        /*ModelMapper mapper = new ModelMapper();
        CustomerDTO c1 = new CustomerDTO("C001", "2001", "Nimal Perera", "nimal@gmail.com", "Galle", "0445454545", "B2323434", "nimal033");

        Customer entity = mapper.map(c1, Customer.class);
        entity.setUser_credentials(new User_credentials(c1.getUser_credentials()));
        System.out.println(entity);*/


    }
}
