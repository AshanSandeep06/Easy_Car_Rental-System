package lk.easy.carRental.controller;

import lk.easy.carRental.dto.User_credentialsDTO;
import lk.easy.carRental.service.User_credentialsService;
import lk.easy.carRental.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/user_credentials")
public class User_credentialsController {
    @Autowired
    private User_credentialsService userService;

    @GetMapping(path = "/verifyLogin", params = {"username", "password"})
    public ResponseUtil verifyUserCredentials(@RequestParam String username, @RequestParam String password) {
        return new ResponseUtil("OK", "Login Successfully..!", userService.getUserCredentials(username, password));
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public ResponseUtil saveUserCredentials(@RequestBody User_credentialsDTO userDTO) {
        if (userDTO != null) {
            userService.saveUserCredentials(userDTO);
            return new ResponseUtil("OK", "User Credentials has been Saved Successfully..!", null);
        } else {
            throw new RuntimeException("Cant' be Save the User Credentials, Cause of Received data is Empty");
        }
    }
}
