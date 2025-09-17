package org.prac.service;

import org.prac.model.student;

import org.prac.repository.studentRepository;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.List;

@Service
public class studentservice {
    @Autowired
    public studentRepository repo;
    public void deletestudentbyId(int id)
    {
        repo.deleteById(id);
    }


    public List<student> getallStudents() {
        return repo.findAll();
    }

    public student addStudent(student student1, MultipartFile imagefile)throws IOException {
        if(imagefile!=null && !imagefile.isEmpty())
        {
            String image64= Base64.getEncoder().encodeToString(imagefile.getBytes());
            student1.setImagedata(image64);
            student1.setImagename(imagefile.getOriginalFilename());
            student1.setImagetype(imagefile.getContentType());
        }
        return repo.save(student1);
    }

    public student getstudentbyId(int id) {
        return repo.findById(id).orElse(null);
    }

    public student updateProduct(int id, student student0, MultipartFile imagefile) throws IOException{
        if(imagefile!=null && !imagefile.isEmpty())
        {
            String image64=Base64.getEncoder().encodeToString(imagefile.getBytes());
            student0.setImagedata(image64);
            student0.setImagename(imagefile.getOriginalFilename());
            student0.setImagetype(imagefile.getContentType());
        }
        return repo.save(student0);
    }
}
