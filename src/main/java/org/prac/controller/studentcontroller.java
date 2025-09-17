package org.prac.controller;

import org.prac.model.student;
import org.prac.service.studentservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class studentcontroller {
    @Autowired
    public studentservice service;

    @GetMapping("/students")
    public ResponseEntity<List<student>> getallstudents()
    {
        return new ResponseEntity<>(service.getallStudents(), HttpStatus.OK);
    }

    @PostMapping("/student")
    public ResponseEntity<?> addstudent(@RequestPart("student1") student student1,
                                        @RequestPart MultipartFile imagefile){
    try{
        student student2=service.addStudent(student1,imagefile);
        return new ResponseEntity<>(student2,HttpStatus.CREATED);
    }
    catch(Exception e)
    {
        return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
    }}

    @GetMapping("/student/{id}")
    public ResponseEntity<student> getstudentbyid(@PathVariable int id)
    {
        student student1=service.getstudentbyId(id);
        if(student1!=null)
            return new ResponseEntity<>(student1,HttpStatus.OK);

        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    @DeleteMapping("/students/{id}")
    public ResponseEntity<String> deletebyid(@PathVariable int id)
    {
        student student1= service.getstudentbyId(id);
        if(student1!=null){
            service.deletestudentbyId(id);
            return new ResponseEntity<>("Deleted",HttpStatus.OK);}
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    @GetMapping("student/{id}/image")
    public ResponseEntity<byte[]> getimagebyid(@PathVariable int id)
    throws IOException {
        student student1=service.getstudentbyId(id);

        byte[] imagefile = Base64.getDecoder().decode(student1.getImagedata());

        return ResponseEntity.ok()
                .contentType(MediaType.valueOf(student1.getImagetype()))
                .body(imagefile);
    }
    @PutMapping("student/{id}/update")
    public ResponseEntity<String> updateproduct(@PathVariable int id,
                                                 @RequestPart student student0,
                                                 @RequestPart MultipartFile imagefile)
    {
        student student1=null;
        try {
            student1=service.updateProduct(id,student0,imagefile);
        }
        catch (IOException e)
        {
            return new ResponseEntity<>("Failed to update",HttpStatus.BAD_REQUEST);
        }
        if(student1!=null)
        {
            return new ResponseEntity<>("Update ",HttpStatus.OK);
        }
        else
            return new ResponseEntity<>("Failed to update",HttpStatus.BAD_REQUEST);
    }

}
