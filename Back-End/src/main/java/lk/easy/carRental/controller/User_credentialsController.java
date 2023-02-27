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

    @GetMapping(path = "/getCustomerUserCredentials/{jobRole}/{customerId}")
    public ResponseUtil getCustomerUserCredentials(@PathVariable String jobRole, @PathVariable String customerId) {
        return new ResponseUtil("OK", "User Credentials of " + customerId + " Loaded Successfully..!", userService.getCustomerUserCredentials(jobRole, customerId));
    }

    @GetMapping(params = {"username"})
    public ResponseUtil getUserCredentials(@RequestParam String username) {
        return new ResponseUtil("OK", "User Credentials Loaded Successfully..!", userService.getUserCredentials(username));
    }

    @GetMapping(path = "/verifyLogin", params = {"username", "password"})
    public ResponseUtil verifyUserCredentials(@RequestParam String username, @RequestParam String password) {
        return new ResponseUtil("OK", "Login Successfully..!", userService.getUserCredentials(username, password));
    }

    @PutMapping(path = "/resetPassword")
    public ResponseUtil resetPassword(@RequestBody User_credentialsDTO userDTO) {
        userService.resetUserPassword(userDTO);
        return new ResponseUtil("OK", "Password Reset was Successfully..!", null);
    }

    @PutMapping
    public ResponseUtil updateUsernameAndPassword(@RequestBody User_credentialsDTO userDTO) {
        userService.updateUserCredentials(userDTO);
        return new ResponseUtil("OK", "Update Username And Password Successfully..!", null);
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
