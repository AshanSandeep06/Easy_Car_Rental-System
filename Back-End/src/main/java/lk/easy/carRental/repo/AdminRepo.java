package lk.easy.carRental.repo;

import lk.easy.carRental.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepo extends JpaRepository<Admin, String> {

}
