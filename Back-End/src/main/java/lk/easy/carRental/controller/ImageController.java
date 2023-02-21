package lk.easy.carRental.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;

@RestController
@RequestMapping("/imageController")
@CrossOrigin
public class ImageController {
    @PostMapping
    public String uploadFile(@RequestParam("imagesUploader") MultipartFile file) {
        try {
            System.out.println("Image Received -------------------");
            byte[] bytes = file.getBytes();
            return Base64.getEncoder().encodeToString(bytes);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
