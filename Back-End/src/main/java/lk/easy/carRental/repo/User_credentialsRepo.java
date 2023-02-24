package lk.easy.carRental.repo;

import com.sun.org.apache.xpath.internal.operations.Bool;
import lk.easy.carRental.entity.User_credentials;
import org.springframework.data.jpa.repository.JpaRepository;

public interface User_credentialsRepo extends JpaRepository<User_credentials, String> {
    Boolean existsByUsername(String username);

    User_credentials findUser_credentialsByUsername(String username);
}
