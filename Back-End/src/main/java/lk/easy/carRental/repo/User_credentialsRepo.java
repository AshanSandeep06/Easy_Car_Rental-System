package lk.easy.carRental.repo;

import com.sun.org.apache.xpath.internal.operations.Bool;
import lk.easy.carRental.entity.User_credentials;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface User_credentialsRepo extends JpaRepository<User_credentials, String> {
    Boolean existsByUsername(String username);
    User_credentials findUser_credentialsByUsername(String username);
    User_credentials findByUsernameAndPassword(String username, String password);

    @Modifying
    @Transactional
    @Query(nativeQuery = true, value = "UPDATE User_credentials SET password=:password WHERE username=:username")
    int updatePasswordByUsername(@Param("username") String username, @Param("password") String password);

}
