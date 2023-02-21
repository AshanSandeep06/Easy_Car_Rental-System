package lk.easy.carRental.dto;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;

public class Test {
    public static void main(String[] args) {
        Test t1 = new Test();
        t1.call();
    }

    public void call(){
        try {
            String projectPath = new File(this.getClass().getProtectionDomain().getCodeSource().getLocation().toURI()).getParentFile().getParentFile().getAbsolutePath();
            File uploadsDir = new File(projectPath + "/uploads");
            System.out.println(projectPath);
            System.out.println(uploadsDir);

            System.out.println(uploadsDir.getAbsolutePath());
//            uploadsDir.mkdir();
//            myFile.transferTo(new File(uploadsDir.getAbsolutePath() + "/" + myFile.getOriginalFilename()));

            //save the path of the uploaded image in the temporary database
//            allImages.add("uploads/" + myFile.getOriginalFilename());

        } catch (URISyntaxException e) {
            e.printStackTrace();
        }
    }
}
