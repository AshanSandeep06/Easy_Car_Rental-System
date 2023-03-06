package lk.easy.carRental.service.impl;

import lk.easy.carRental.dto.CarDTO;
import lk.easy.carRental.dto.DriverDTO;
import lk.easy.carRental.dto.RentDTO;
import lk.easy.carRental.dto.Rent_detailDTO;
import lk.easy.carRental.entity.Car;
import lk.easy.carRental.entity.Driver;
import lk.easy.carRental.entity.Rent;
import lk.easy.carRental.entity.Rent_detail;
import lk.easy.carRental.repo.CarRepo;
import lk.easy.carRental.repo.DriverRepo;
import lk.easy.carRental.repo.RentRepo;
import lk.easy.carRental.repo.Rent_detailRepo;
import lk.easy.carRental.service.RentService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
@Transactional
public class RentServiceImpl implements RentService {
    @Autowired
    private RentRepo rentRepo;

    @Autowired
    private DriverRepo driverRepo;

    @Autowired
    private CarRepo carRepo;

    @Autowired
    private Rent_detailRepo rentDetailRepo;
    @Autowired
    private ModelMapper mapper;

    @Override
    public String generateNewRentID() {
        String lastRentID = rentRepo.getLastRentId();
        if (lastRentID != null) {
            int tempId = Integer.parseInt(lastRentID.split("-")[1]);
            tempId++;
            if (tempId <= 9) {
                return "R00-00" + tempId;
            } else if (tempId <= 99) {
                return "R00-0" + tempId;
            } else {
                return "R00-" + tempId;
            }
        } else {
            return "R00-001";
        }
    }

    @Override
    public void placeRent(RentDTO rentDTO) {
        Random random = new Random();
        Rent rent = mapper.map(rentDTO, Rent.class);

        if (rentDTO.getRequestTypeOfDriver().equals("Yes")) {
            ArrayList<Driver> allAvailableDrivers = driverRepo.findDriverByAvailabilityType("Available");
            if (allAvailableDrivers.size() > 0) {
                Driver assignableDriver = allAvailableDrivers.get(random.nextInt(allAvailableDrivers.size()));
                rent.getRentDetail().get(0).setDriver(assignableDriver);
                System.out.println(assignableDriver);
                assignableDriver.setAvailabilityType("Unavailable");
                driverRepo.save(assignableDriver);
            } else {
                throw new RuntimeException("Can't Reserve a Driver for Your Rental Request on this Time, Please Try again..!");
            }
        }

        if (rentRepo.existsById(rent.getRentId())) {
            throw new RuntimeException("Can't Place this Rent Request, This is Already Added..!");
        }
        rentRepo.save(rent);

        Car car = carRepo.findById(rentDTO.getRentDetail().get(0).getCarId()).get();
        car.setAvailabilityType("Unavailable");
        carRepo.save(car);

    }

    @Override
    public ArrayList<RentDTO> getAllActiveBookings(String customerId) {
        ArrayList<Rent> bookingsList = rentRepo.getAllActiveBookingsByCustomerId(customerId);
        if (!bookingsList.isEmpty()) {
            return mapper.map(bookingsList, new TypeToken<ArrayList<RentDTO>>() {
            }.getType());
        }
        return null;
    }

    @Override
    public ArrayList<RentDTO> getBookingsRentStatus(String customerId) {
        ArrayList<Rent> bookingsList = rentRepo.getBookingsRentStatusByCustomerId(customerId);
        if (!bookingsList.isEmpty()) {
            return mapper.map(bookingsList, new TypeToken<ArrayList<RentDTO>>() {
            }.getType());
        }
        return null;
    }

    @Override
    public ArrayList<RentDTO> getAllRentsByDriverRequestingType(String driverRequestingType) {
        return mapper.map(rentRepo.findAllByRequestTypeOfDriver(driverRequestingType), new TypeToken<ArrayList<RentDTO>>() {
        }.getType());
    }

    @Override
    public ArrayList<RentDTO> loadAllPendingRentalRequests(String rentStatus) {
        return mapper.map(rentRepo.findAllByRentStatus(rentStatus), new TypeToken<ArrayList<RentDTO>>() {
        }.getType());
    }

    @Override
    public ArrayList<RentDTO> getAllRents() {
        return mapper.map(rentRepo.findAll(), new TypeToken<ArrayList<RentDTO>>() {
        }.getType());
    }

    @Override
    public void cancelRentRequest(String rentId) {
        if (rentRepo.existsById(rentId)) {
            rentRepo.cancelRentRequest(rentId);
        } else {
            throw new RuntimeException("This Rental Request isn't exists, to Cancel..!");
        }
    }

    @Override
    public void updateRentStatus(String rentId, String rentStatus, String deniedReason) {
        if (rentRepo.existsById(rentId)) {
            if (rentStatus.equals("Accepted")) {
                Rent rent = rentRepo.findById(rentId).get();
                rent.setRentStatus(rentStatus);
                rentRepo.save(rent);
            } else if (rentStatus.equals("Denied")) {
                Rent rent = rentRepo.findById(rentId).get();

                for (int i = 0; i < rent.getRentDetail().size(); i++) {
                    Driver driver = rent.getRentDetail().get(i).getDriver();
                    driver.setAvailabilityType("Available");
                    driverRepo.save(driver);

                    Car car = rent.getRentDetail().get(i).getCar();
                    car.setAvailabilityType("Available");
                    carRepo.save(car);
                }
                rent.setRentStatus(rentStatus);
                rent.setDeniedReason(deniedReason);
                rentRepo.save(rent);
            }else if(rentStatus.equals("Ongoing")){
                Rent rent = rentRepo.findById(rentId).get();
                rent.setRentStatus(rentStatus);
                rentRepo.save(rent);
            }else if(rentStatus.equals("Finished")){
                Rent rent = rentRepo.findById(rentId).get();
                rent.setRentStatus(rentStatus);

                Driver driver = rent.getRentDetail().get(0).getDriver();
                driver.setAvailabilityType("Available");
                driverRepo.save(driver);

                Car car = rent.getRentDetail().get(0).getCar();
                car.setAvailabilityType("Available");
                car.setLastServiceMileage(rent.getRentDetail().get(0).getDistanceMileage());
                carRepo.save(car);

                rentRepo.save(rent);
            }
        } else {
            throw new RuntimeException("This Rental Request isn't exists, to Cancel..!");
        }
    }

    @Override
    public int getOngoingRentalsCount(String customerId) {
        return rentRepo.getOngoingRentalsCount(customerId);
    }

    @Override
    public RentDTO getRentByRentID(String rentId) {
        if (rentRepo.existsById(rentId)) {
            Rent rent = rentRepo.findById(rentId).get();
            return mapper.map(rent, RentDTO.class);
        } else {
            throw new RuntimeException("This Rent is not exists");
        }
    }

    @Override
    public void updateBookings(RentDTO rentDTO) {
        if (rentRepo.existsById(rentDTO.getRentId())) {
            Rent rent = rentRepo.findById(rentDTO.getRentId()).get();
            rent.setRequestTypeOfDriver(rentDTO.getRequestTypeOfDriver());
            rent.setPickUpTime(rentDTO.getPickUpTime());
            rent.setPickUpDate(rentDTO.getPickUpDate());
            rent.setReturnTime(rentDTO.getReturnTime());
            rent.setReturnDate(rentDTO.getReturnDate());
            rent.setRentStatus(rentDTO.getRentStatus());
            rent.setLocation(rentDTO.getLocation());

            for (int i = 0; i < rentDTO.getRentDetail().size(); i++) {
                Rent_detailDTO rentDetailDTO = rentDTO.getRentDetail().get(i);
                Rent_detail rentDetail = rent.getRentDetail().get(i);

                rentDetail.setCarId(rentDetailDTO.getCarId());
                Driver preDriver = rentDetail.getDriver();
                preDriver.setAvailabilityType("Available");
                driverRepo.save(preDriver);

                rentDetail.setDriver(mapper.map(rentDetailDTO.getDriver(), Driver.class));
                rentDetailRepo.save(rentDetail);

                Driver driver = driverRepo.findById(rentDetailDTO.getDriver().getDriverId()).get();
                driver.setAvailabilityType(rentDetailDTO.getDriver().getAvailabilityType());
                driverRepo.save(driver);
            }

            rentRepo.save(rent);

        } else {
            throw new RuntimeException("This Rent is not exists");
        }
    }

    @Override
    public int getTotalBookingsCount() {
        return rentRepo.getTotalBookingsCount();
    }

    @Override
    public int getActiveBookingsCount() {
        return 0;
    }
}
