package org.prac.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Table(name="student")
@Data
@AllArgsConstructor
@NoArgsConstructor

public class student {

    @Id

    private int id;
    private String name;
    private int semester;
    @Temporal(TemporalType.DATE)
    private Date dateofbirth;

   @Column(name="image_data", columnDefinition = "LONGTEXT")
    private String imagedata;
    private String imagetype;
    private String imagename;




}
