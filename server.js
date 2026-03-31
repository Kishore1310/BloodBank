const express = require("express")
const session = require("express-session")
const db = require("./database")
const path = require("path")
const app = express()
const bcrypt = require("bcrypt")
const cors = require("cors")
const e = require("express")

app.use(express.static("public"));

//create seeeion for users
app.use(session({
  secret: "secret-key",
  resave: false,
  saveUninitialized: true
}));
app.get("/index/tracebility",(req,res)=>{
  res.sendFile(path.join(__dirname,"tracebility_page.html"))
})
app.use(express.static(__dirname))
app.get('/index', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
});
app.get('/index/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'))
});
app.get('/index/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'signup.html'))
});
app.get("/index/hospitalsignup", (req, res) => {
  res.sendFile(path.join(__dirname, "hospitalsignup.html"))
})
app.get("/index/hospitalsignup", (req, res) => {
  res.sendFile(path.join(__dirname, 'hospitalsignup.html'))
})
app.get("/index/history", (req, res) => {
  res.sendFile(path.join(__dirname, 'history.html'))
})
app.get("/index/inventory", (req, res) => {
  if (!req.session.user || req.session.user.role !== "Admin") {
    return res.send("Access denied");
  }
  res.sendFile(path.join(__dirname, 'inventory.html'))
})
app.get("/index/donor_registration", (req, res) => {
  res.sendFile(path.join(__dirname, 'donor_registration.html'))
})
app.get("/index/blood_unit_page", (req, res) => {

  res.sendFile(path.join(__dirname, 'blood_unit_page.html'))
})
app.get("/index/coordinator",(req,res)=>{
  res.sendFile(path.join(__dirname, 'coordinator_page.html'))
})
app.get("/index/coordinator", (req, res) => {
  if (!req.session.user || req.session.user.role !== "Coordinator") {
    return res.send("Access denied");
  }
  res.sendFile(path.join(__dirname, 'coordinator_page.html'))
})
app.get("/index/auditor", (req, res) => {
  if (!req.session.user || req.session.user.role !== "Auditor") {
    return res.send("Access denied");
  }
  res.sendFile(path.join(__dirname, 'audit.html'))
})
app.get("/index/request", (req, res) => {
  if (!req.session.user || req.session.user.role !== "Hospital stuff") {
    return res.send("Access denied");
  }
  res.sendFile(path.join(__dirname, 'request.html'))
})
app.get("/index/allocation_page", (req, res) => {
  res.sendFile(path.join(__dirname, 'allocation_page.html'))
})
//  app.get("/index/dashboard", (req, res) => {
//   res.sendFile(path.join(__dirname, 'dashboard.html'))
//  })
 app.get("/index/dashboard", (req, res) => {
  if (!req.session.user || req.session.user.role !== "Coordinator") {
    return res.send("Access denied");
  }
  res.sendFile(path.join(__dirname, 'dashboard.html'))
})
// app.get("/tracebility",(req,res)=>{
//    res.sendFile(path.join(__dirname,"tracebility_page.html"))
// })
db.getConnection((err, connection) => {
  if (err) {
    console.log("Database connection failed:", err)
  } else {
    console.log("Connected to MySQL")
    connection.release()
  }
})
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
//signup
app.post("/signup", async (req, res) => {
  const { name, email, role, password } = req.body
  const hashespassword = await bcrypt.hash(password, 10);
  const sql = "insert into users (name,email,role,password) values(?,?,?,?)"
  db.query(sql, [name, email, role, hashespassword], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error saving user")
    }
    res.redirect('/index/login')
  });
});
//login

app.post("/login", (req, res) => {
  const { email, role, password, } = req.body
  const sql = "select * from users where email =?"
  db.query(sql, [email], async (err, result) => {
    if (err) {
      return res.status(505).send("server error");
    }
    if (result.length === 0) {
      return res.status(400).send("user not found")
    }
    const user = result[0]

    if (!user) {
      res.status(400).send("invalid credentials")
    }
    try {
      const ismatch = await bcrypt.compare(password, user.password)
      if (!ismatch) {
        return res.status(400).send("Invalid credentials");
      }
      if (user.role !== role) {
        return res.status(403).send("Access denied (wrong role)");
      }
      req.session.user = user;
      if (ismatch) {
        // if (user.role === "Admin") {
        //     const sql=`insert into audit(name,role,action_type,reference_id,reference_table,detail) values(?,?,?,?,?,?)`;
        //     db.query(sql,[user.name,user.role,"Login",null,null,'Successful login'],(err,result)=>{
        //         if(err){
        //           console.log(err);
        //           return res.status(500).send("login failed")
        //         }
        //         console.log(result);
        //     })
        //   return res.redirect("/index/inventory")
        // }
        if (user.role === "Admin") {
    const sql = `INSERT INTO audit(name,role,action_type,reference_id,reference_table,details)
                 VALUES (?,?,?,?,?,?)`;

    db.query(
        sql,
        [user.name, user.role, "Login", req.session.user.user_id, "user", "Successful login"],
        (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send("login failed");
            }

            console.log(result);
            return res.redirect("/index/inventory");
        }
    );
}
        if (user.role === "Coordinator") {
          const sql = `INSERT INTO audit(name,role,action_type,reference_id,reference_table,details)
                 VALUES (?,?,?,?,?,?)`;

    db.query(
        sql,
        [user.name, user.role, "Login",  req.session.user.user_id, "user", "Successful login"],
        (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send("login failed");
            }

            console.log(result);
            return res.redirect("/index/dashboard")
        }
    );
         
        }
        if (user.role == "Auditor") {
          const sql = `INSERT INTO audit(name,role,action_type,reference_id,reference_table,details)
                 VALUES (?,?,?,?,?,?)`;

    db.query(
        sql,
        [user.name, user.role, "Login",  req.session.user.user_id, "user", "Successful login"],
        (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send("login failed");
            }

            console.log(result);
            return res.redirect("/index/auditor")
        }
    );
     
          
          
        }
        if (user.role == "Hospital stuff") {
          let user_id1 = user.user_id;
          const sql = 'select hospital_id from hospital where user_id=?'
          db.query(sql, [user_id1], (err, result) => {
            if (err) {
              console.log(err);
              return;
            }
            const hospital_id = result[0].hospital_id;

            req.session.user = {
              user_id: user.user_id,
              name: user.name,
              email: user.email,
              role: user.role,
              hospital_id: hospital_id
            };
            console.log("SESSION:", req.session.user);
             const sql1 = `INSERT INTO audit(name,role,action_type,reference_id,reference_table,details)
                 VALUES (?,?,?,?,?,?)`;

    db.query(
        sql1,
        [user.name, user.role, "Login", req.session.user.user_id, "user", "Successful login"],
        (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send("login failed");
            }

            console.log(result);
            return res.redirect("/index/request")
        }
    );
           
          })

        }
      }
      else {
        res.send("invalid credentials")
      }
    } catch (error) {
      console.log(error)
      return res.status(500).send("error comparing password")
    }
  });
});

//allocation
// app.post("/allocation_page",(req,res)=>{
//   const {Admin_name,status,bloodgroup,bloodunit,allocation_date,request_id,unit_id,notes}=req.body
//           console.log(Admin_name);
//           console.log(status)
//           console.log(bloodgroup)
//           var bloodg=bloodgroup;
//            console.log(bloodunit)
//             console.log(allocation_date)
//              console.log(request_id)
//               console.log(unit_id)
//               var stas=unit_id;
//               console.log(notes)
//    const sql='select * from blood_units where blood_group=? and status=? limit ?'
//       db.query(sql,[bloodg,'Available',stas],(err,result)=>{
//        if (err) {
//     console.log(err);   // print real error
//     return;             // 🔥 STOP execution
//   }

//   if (!result || result.length === 0) {
//     console.log("No blood units found");
//     return;
//   }

//   result.forEach(row => {
//     console.log(row.unit_id);
//   });
//       })

// const sql="insert into allocation (Admin_name,status,bloodgroup,bloodunit,allocation_date,request_id,unit_id,notes) values(?,?,?,?,?,?,?,?)"
// db.query(sql,[Admin_name,status,bloodgroup,bloodunit,allocation_date,request_id,unit,notes],(err,result)=>{
//   if(err){
//     console.log(err);
//     return res.status(500).send("Error saving user")
//   }
//    res.redirect('/index/history')
// });
// });
//donor_registration
app.post("/donor_registration", (req, res) => {
  const { name, blood_group, contact,donation_location} = req.body
  const sql = "insert into donor (name,blood_group,contact,donation_location) values(?,?,?,?)"
  db.query(sql, [name, blood_group, contact,donation_location], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error saving user")
    }
    const sql2=`select * from donor order by donor_id desc limit 1`;
    db.query(sql2,(err,result3)=>{
      if(err){
        return res.send(500).send("donor_id not found")
      }
const sql = `INSERT INTO audit(name,role,action_type,reference_id,reference_table,details)
                 VALUES (?,?,?,?,?,?)`;

    db.query(
        sql,
        [req.session.user.name, req.session.user.role, "Donor Added", result3[0].donor_id,'donor' , "New donor registered"],
        (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send("donor registration failed");
            }

            console.log(result);
            res.redirect('/index/donor_registration')
        }
    );
    })
     

  });
});

app.post("/blood_unit_page", (req, res) => {
  const { blood_group, collection_date, expiry_date, status, storage_location, donor_id } = req.body
  const sql = "insert into blood_units(blood_group,collection_date,expiry_date,status,storage_location,donor_id) values(?,?,?,?,?,?)"
  db.query(sql, [blood_group, collection_date, expiry_date, status, storage_location, donor_id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error saving user")
    }
    const sql2=`select * from blood_units order by  unit_id  desc limit 1`;
    db.query(sql2,(err,result3)=>{
      if(err){
        return res.send(500).send("unit_id not found")
      }
const sql = `INSERT INTO audit(name,role,action_type,reference_id,reference_table,details)
                 VALUES (?,?,?,?,?,?)`;

    db.query(
        sql,
        [req.session.user.name, req.session.user.role, "Blood Unit Added", result3[0].unit_id,'blood_units' , "New Blood Unit registered"],
        (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send("blood unit  registration failed");
            }

            console.log(result);
            res.redirect('/index/blood_unit_page')
        }
    );
    })
  });
});
app.post("/hospitalsignup", async (req, res) => {
  const { name, email, password, location, contact, licence, hospital_type } = req.body
  const hashespassword = await bcrypt.hash(password, 10);
  const sql = "insert into users (name,email,role,password) values(?,?,'Hospital stuff',?) "
  db.query(sql, [name, email, hashespassword], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error saving user")
    }

    const user_id = result.insertId;
    const sql1 = "insert into hospital (user_id,name,location,hospital_type,licence,contact,email) values (?,?,?,?,?,?,?)"
    db.query(sql1, [user_id, name, location, hospital_type, licence, email, contact], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Error saving hospital")
      }
      res.redirect('/index/hospitalsignup');
    });
  });
});
app.post("/request", (req, res) => {
  const { blood_group, unitrequired, urgency_level, required_by, notes } = req.body
  const hospital_id = req.session.user.hospital_id;
  console.log("SESSION:", req.session.user);
  const sql = 'insert into request(hospital_id,blood_group,unitrequired,urgency_level, required_by,notes) values(?,?,?,?,?,?)'
  db.query(sql, [hospital_id, blood_group, unitrequired, urgency_level, required_by, notes], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error saving request")
    }
    const sql2=`select * from request order by  request_id  desc limit 1`;
    db.query(sql2,(err,result3)=>{
      if(err){
        return res.send(500).send("request_id not found")
      }
const sql = `INSERT INTO audit(name,role,action_type,reference_id,reference_table,details)
                 VALUES (?,?,?,?,?,?)`;

    db.query(
        sql,
        [req.session.user.name, req.session.user.role, "Request Added", result3[0].request_id,'request_id' , "New  request registered"],
        (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send("request  registration failed");
            }

            console.log(result);
           res.redirect('/index/request');
        }
    );
    })
    
  })
})
app.get("/index/kishor", (req, res) => {
  const sql = "select blood_group,count(*) as total from donor group by blood_group";
  const sql1 = "select * from donor";
  const sql3 = ` SELECT 
    unit_id,
    donor_id,
    blood_group,
    DATE(collection_date) AS collection_date,
    DATE(expiry_date) AS expiry_date,
    status,
    storage_location
FROM blood_units`;
  db.query(sql, (err, result1) => {
    if (err) {
      return res.status(500).send(err);
    }
    db.query(sql1, (err, result2) => {
      if (err) {
        return res.status(500).send(err);
      }

      db.query(sql3, (err, result3) => {
        if (err) {
          return res.status(500).send(err)
        }
        const formattedUnits = result3.map(row => ({
          unit_id: row.unit_id,
          donor_id: row.donor_id,
          blood_group: row.blood_group,
          collection_date: new Date(row.collection_date).toLocaleDateString('en-GB').split('/').join('-'),
          expiry_date: new Date(row.expiry_date).toLocaleDateString('en-GB').split('/').join('-'),
          status: row.status,
          storage_location: row.storage_location
        }));
        res.json({
          bloodsummary: result1,
          donordetail: result2,
          unitdetail: formattedUnits
        })
      })
    })
  })
})

app.get("/index/getsesion", (req, res) => {
  res.json(req.session.user);
})
app.get("/index/history1", (req, res) => {
  const sql = "select * from request where hospital_id=?"
  db.query(sql, [req.session.user.hospital_id], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    const changedateformat = result.map(row => ({

      blood_group: row.blood_group,
      request_id: row.request_id,
      unitrequired: row.unitrequired,
      urgency_level: row.urgency_level,
      required_by: new Date(row.required_by).toLocaleDateString('en-GB').split('/').join('-'),
      request_date: new Date(row.request_date).toLocaleDateString('en-GB').split('/').join('-'),
      notes: row.notes
    }))

    res.json(changedateformat);
  })
})
app.get("/index/allocation", (req, res) => {
  const sql = 'select * from request'
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    const changedateformat = result.map(row => ({
      hospital_id: row.hospital_id,
      blood_group: row.blood_group,
      request_id: row.request_id,
      unitrequired: row.unitrequired,
      urgency_level: row.urgency_level,
      required_by: new Date(row.required_by).toLocaleDateString('en-GB').split('/').join('-'),
      request_date: new Date(row.request_date).toLocaleDateString('en-GB').split('/').join('-'),
      notes: row.notes
    }));
    const sql2 = 'select * from hospital'
    db.query(sql2, [result.hospital_id], (err, result2) => {
      if (err) {
        return res.status(500).send(err)
      }
      const sql4 = 'select *from allocation '
      db.query(sql4, (err, result12) => {
        if (err) {
          return res.status(500).send(err)
        }
        res.json({
          requestdetail: changedateformat,
          hospitalname: result2,
          adminname: req.session.user.name,
          allocationtype: result12
        });
      })

    })
  })
})

app.post("/allocation_page", (req, res) => {
  const {
    request_id,
    unit_id,
    allocation_date,
    admin_name,
    status,
    bloodgroup,
    bloodunit,
    notes
  } = req.body;

  const bloodg = bloodgroup;
  const units = parseInt(bloodunit);
  console.log("bloodg:", bloodg);
  if (status === "accept") {

    if (isNaN(units) || units <= 0) {
      return res.status(400).json({ error: "Invalid unit count" });
    }

    const sql = `SELECT * FROM blood_units 
                 WHERE blood_group=? AND status=? 
                 LIMIT ?`;

    db.query(sql, [bloodg, 'Available', units], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send("DB error");
      }

      if (!result || result.length === 0) {
        return res.status(404).send("No units available");
      }


      const unitIds = result.map(row => row.unit_id);


      const insertValues = unitIds.map(uid => [
        request_id,
        uid,
        allocation_date,
        admin_name,
        status,
        bloodgroup,
        1,
        notes
      ]);

      const sql3 = `
        INSERT INTO allocation 
        (request_id, unit_id, allocation_date, admin_name, allocation, allocated_blood, allocated_unit, notes)
        VALUES ?
      `;

      db.query(sql3, [insertValues], (err) => {
        if (err) {
          console.log(err);
          return res.status(500).send("Insert error");
        }


        const sql4 = `UPDATE blood_units SET status=? WHERE unit_id IN (?)`;

        db.query(sql4, ['Allocated', unitIds], (err) => {
          if (err) {
            return res.status(500).send("Update error");
          }
          const sql2=`select * from allocation order by  allocation_id  desc limit 1`;
    db.query(sql2,(err,result3)=>{
      if(err){
        return res.send(500).send("allocation_id not found")
      }
const sql = `INSERT INTO audit(name,role,action_type,reference_id,reference_table,details)
                 VALUES (?,?,?,?,?,?)`;

    db.query(
        sql,
        [req.session.user.name, req.session.user.role, "accept", result3[0].allocation_id,'allocation_id' , "Request Accepted"],
        (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send("request  accept failed");
            }

            console.log(result);
            res.redirect("/index/allocation_page");
        }
    );
    })
        });
      });
    });
  }
  else {
    const sql = `insert into allocation
      (request_id, unit_id, allocation_date, admin_name, allocation, allocated_blood, allocated_unit, notes)
      values (?,?,?,?,?,?,?,?)`
    db.query(sql, [request_id,
      null,
      allocation_date,
      admin_name,
      status,
      bloodgroup,
      0,
      notes], (err, result) => {
        if (err) {
          return res.status(500).send("Reject insert error")
        }
        const sql2=`select * from allocation order by  allocation_id  desc limit 1`;
    db.query(sql2,(err,result3)=>{
      if(err){
        return res.send(500).send("allocation_id not found")
      }
const sql = `INSERT INTO audit(name,role,action_type,reference_id,reference_table,details)
                 VALUES (?,?,?,?,?,?)`;

    db.query(
        sql,
        [req.session.user.name, req.session.user.role, "reject", result3[0].allocation_id,'allocation_id' , "Request Rejected"],
        (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send("request  reject  failed");
            }

            console.log(result);
            res.redirect("/index/allocation_page");
        }
    );
    })
      })
  }
});
app.get("/index/transfer", (req, res) => {
  const sql = `
   SELECT 
  r.request_id,
  r.hospital_id,
  a.allocated_blood,
  h.name,
  h.location,
  COALESCE(MAX(c.status), 'Pending') AS status,
  COUNT(DISTINCT a.unit_id) AS allocated_unit,
  GROUP_CONCAT(DISTINCT a.unit_id) AS unit_ids
FROM allocation a
JOIN request r ON a.request_id = r.request_id
JOIN hospital h ON h.hospital_id = r.hospital_id
LEFT JOIN coordinator c ON r.request_id = c.request_id
WHERE a.allocation = 'accept'
GROUP BY 
  r.request_id,
  r.hospital_id,
  a.allocated_blood,
  h.name,
  h.location
  `;

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
     console.log(result[0])
    const coordinatorName = req.session.user
      ? req.session.user.name
      : "Guest";

     const formatted = result.map(row => ({
      ...row,
       unit_ids: row.unit_ids ? row.unit_ids.split(",") : []
     }));
      const sql1="select b.storage_location,a.unit_id from allocation a join blood_units b where a.unit_id=b.unit_id";
       db.query(sql1,(err,result3)=>{
        if(err){
          return res.status(500).send("error from server")
        }
 res.json({
      coordinator: formatted,
      coordinatorname: coordinatorName,
      storagelocation:result3,
      

    });
          
        })
       
       })
    
  });
app.post("/coordinator", (req, res) => {
  const {
    request_id,
    status,
    hospitalname,
    hospitallocation,
    dispatchdate,
  } = req.body;

  const sql1 = `
    SELECT b.unit_id, b.storage_location
    FROM blood_units b
    JOIN allocation a ON b.unit_id = a.unit_id
    WHERE a.request_id = ?
  `;

  db.query(sql1, [request_id], (err, result) => {
    if (err) {
      return res.status(500).send("error from server");
    }

    if (!result || result.length === 0) {
      return res.status(500).send("allocation not done");
    }
    if (status === "In transit") {
      const insertvalues1 = result.map(row => [
        row.unit_id,
        request_id,
        status,
        row.storage_location,
        hospitalname,
        hospitallocation,
        dispatchdate,
        null
      ]);

      const sql = `
        INSERT INTO coordinator
        (unit_id, request_id, status, from_location, hospital_name, hospital_location, dispatch_date, delivered_date)
        VALUES ?
      `;

      db.query(sql, [insertvalues1], (err) => {
        if (err) {
          console.log(err);
          return res.status(500).send("insert error");
        }
         const sql2=`select * from coordinator order by   transfer_id  desc limit 1`;
    db.query(sql2,(err,result3)=>{
      if(err){
        return res.send(500).send(" transfer_id not found")
      }
const sql = `INSERT INTO audit(name,role,action_type,reference_id,reference_table,details)
                 VALUES (?,?,?,?,?,?)`;

    db.query(
        sql,
        [req.session.user.name, req.session.user.role, "In transit", result3[0].transfer_id,'transfer_id' , "Unit In transit "],
        (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send("request In transit failed");
            }

            console.log(result);
            res.redirect("/index/coordinator_page");
        }
    );
    })
      });
    }
    else if (status === "Delivered") {
      const sql2 = `
        UPDATE coordinator
        SET status = ?,  delivered_date = ?
        WHERE request_id = ?
      `;

      db.query(sql2, [status, dispatchdate, request_id], (err) => {
        if (err) {
          return res.status(500).send("update error");
        }
           const sql2=`select * from coordinator order by   transfer_id  desc limit 1`;
    db.query(sql2,(err,result3)=>{
      if(err){
        return res.send(500).send(" transfer_id not found")
      }
const sql = `INSERT INTO audit(name,role,action_type,reference_id,reference_table,details)
                 VALUES (?,?,?,?,?,?)`;

    db.query(
        sql,
        [req.session.user.name, req.session.user.role, "Delivered", result3[0].transfer_id,'transfer_id' , "Unit Delivered "],
        (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send("request Delivered failed");
            }

            console.log(result);
            res.redirect("/index/coordinator_page");
        }
    );
    })
      });
    }

    else {
      res.send("Invalid status");
    }
  });
});
app.get("/index/status",(req,res)=>{
      const sql1="select hospital_id from hospital where user_id=?"
      db.query(sql1,[req.session.user.user_id],(err,result)=>{
        if(err){
          return res.status(500).send("user not found");
        }
        const hospital_id=result[0].hospital_id;
        console.log(result);
 const sql=`SELECT r.request_id,r.blood_group,r.unitrequired,r.urgency_level,r.required_by,r.request_date, IFNULL(a.allocation_date, 'N/A') AS allocation_date,IFNULL(a.allocation, 'pending') AS allocation,IFNULL(a.allocated_blood, 'N/A') AS allocated_blood,COUNT(DISTINCT a.unit_id) AS total_allocated_unit,IFNULL(a.notes, '-') AS notes,IFNULL(c.status, 'not dispatched') AS status,IFNULL(c.dispatch_date, 'N/A') AS dispatch_date,IFNULL(c.delivered_date, 'N/A') AS delivered_date FROM request r LEFT JOIN allocation a ON r.request_id = a.request_id LEFT JOIN coordinator c ON r.request_id = c.request_id WHERE r.hospital_id = ? GROUP BY r.request_id,r.blood_group,r.unitrequired,r.urgency_level,r.required_by,r.request_date,a.allocation_date,a.allocation,a.allocated_blood,a.notes,c.status,c.dispatch_date,c.delivered_date;`;
       db.query(sql,[hospital_id],(err,result1)=>{
        if(err){
          return res.status(500).send("error from server");
 }      
        const changeformat=result1.map(row=>({
          request_id:row.request_id,
          blood_group:row.blood_group,
          unitrequired:row.unitrequired,
          urgency_level:row.urgency_level,
          required_by:new Date(row.required_by).toLocaleDateString('en-GB').split('/').join('-'),
          request_date:new Date(row.request_date).toLocaleDateString('en-GB').split('/').join('-'),
          allocation_date:new Date(row.allocation_date).toLocaleDateString('en-GB').split('/').join('-'),
          allocation:row.allocation,
          total_allocated_unit:row.total_allocated_unit,
          notes:row.notes,
          status:row.status,
          dispatch_date:new Date(row.dispatch_date).toLocaleDateString('en-GB').split('/').join('-'),
          delivered_date:new Date(row.delivered_date).toLocaleDateString('en-GB').split('/').join('-')


        }))
        res.json(changeformat)
       })
      })
})
// app.get("/index/dashboard", (req, res) => {

//   const data = {};
 
//   // Total units to allocate
//   db.query("SELECT COUNT(*) AS total FROM blood_units WHERE status='Available'", (err, result) => {
//     if (err) {
//       console.log(err);
//       return res.json({ error: err.message });
//     }
//     data.status1 = result?.[0]?.total||0;

//     // Accepted
//     db.query("SELECT COUNT(*) AS total FROM allocation WHERE allocation='accept'", (err, r1) => {
//       if (err) {
//       console.log(err);
//       return res.json({ error: err.message });
//     }
//       data.allocation1= r1?.[0]?.total||0;

//       // Rejected
//       db.query("SELECT COUNT(*) AS total FROM allocation  WHERE allocation='reject'", (err, r2) => {
//          if (err) {
//           console.log(err);
//           return res.json({ error: err.message });
//         }

//         data.allocation2 = r2?.[0]?.total || 0;
      

//         // In transit
//         db.query("SELECT COUNT(*) AS total FROM coordinator WHERE status='In transit'", (err, r3) => {
//             if (err) {
//             console.log(err);
//             return res.json({ error: err.message });
//           }

//           data.status2 = r3?.[0]?.total || 0;

//           // Delivered
//           db.query("SELECT COUNT(*) AS total FROM coordinator WHERE status='Delivered'", (err, r4) => {
//              if (err) {
//               console.log(err);
//               return res.json({ error: err.message });
//             }

//             data.status3 = r4?.[0]?.total || 0;
               
//             res.json(data);
//           });
//         });
//       });
//     });
//   });
// });
app.get("/index/dashboard1",(req,res)=>{
  const sql="SELECT COUNT(*) AS total FROM blood_units WHERE status='Available'"
  db.query(sql,(err,result)=>{
    if(err){
      return res.status(500).send("error from server-1");
    }
    const sql1="SELECT COUNT(*) AS total FROM allocation  WHERE allocation='reject'"
    db.query(sql1,(err,result1)=>{
      if(err){
        return res.status(500).send("error from server-2");
      }
      const sql2="SELECT COUNT(*) AS total FROM coordinator WHERE status='In transit'"
      db.query(sql2,(err,result2)=>{
        if(err){
          return res.status(500).send("error from server-3")
        }
        const sql3="SELECT COUNT(*) AS total FROM coordinator WHERE status='Delivered'"
        db.query(sql3,(err,result3)=>{
            if(err){
              return res.status(500).send("srror from server-4")
            }
            const sql4="SELECT COUNT(*) AS total FROM allocation WHERE allocation='accept'"
            db.query(sql4,(err,result4)=>{
              if(err){
                return res.status(500).send("error from server-4");
              }
               res.json({
              totalavailable:result,
              totalrejected:result1,
              totalintransit:result2,
              totaldelivered:result3,
              totalaccepted:result4
            })

            })
           
        })
      })
    })
  })
})
// app.get("index/tracebility1",(req,res)=>{
//   const sql=`select * from donor`;
//   db.query(sql,(err,result)=>{
//     if(err){
//       return res.status(500).send("donor not found");
//     }
//     const sql1=`select * from blood_units`;
//     db.query(sql1,(req,res)=>{
//     if(err){
//       res.status(500).send("blood_unit not available");
//     }
//     const sql2=`select ^ from allocation`
//      db.query(sql2,(req,res)=>{
//     if(err){
//       res.status(500).send("allocation not available");
//     }
//     const sql3="select * from hospital"
//   })
// })

// })
// app.post("/tracebility", async (req, res) => {
//   try {
//     const { username, userid } = req.body;

//     // donor
//     const [donor] = await db.promise().query(
//       `SELECT * FROM donor WHERE donor_id=? OR name=?`,
//       [userid, username]
//     );

//     if (donor.length === 0) {
//       return res.status(404).send("User not found");
//     }

//     // blood unit
//     const [bloodUnit] = await db.promise().query(
//       `SELECT * FROM blood_units WHERE donor_id=?`,
//       [userid]
//     );

//     if (bloodUnit.length === 0) {
//       return res.status(404).send("Blood unit not found");
//     }

//     const unitId = bloodUnit[0].unit_id;

//     // allocation
//     const [allocation] = await db.promise().query(
//       `SELECT * FROM allocation WHERE unit_id=?`,
//       [unitId]
//     );

//     if (allocation.length === 0) {
//       return res.status(404).send("Allocation not found");
//     }

//     // coordinator
//     const [coordinator] = await db.promise().query(
//       `SELECT * FROM coordinator WHERE unit_id=?`,
//       [unitId]
//     );

//     if (coordinator.length === 0) {
//       return res.status(404).send("Transfer not found");
//     }

//     // request hospital
//     const [request] = await db.promise().query(
//       `SELECT hospital_id FROM request WHERE request_id=?`,
//       [allocation[0].request_id]
//     );

//     // format blood unit
//     const formunitchange = bloodUnit.map(row => ({
//       unit_id: row.unit_id,
//       donor_id: row.donor_id,
//       blood_group: row.blood_group,
//       collection_date: new Date(row.collection_date).toLocaleDateString('en-GB'),
//       expiry_date: new Date(row.expiry_date).toLocaleDateString('en-GB'),
//       status: row.status,
//       storage_location: row.storage_location
//     }));

//     // format allocation
//     const formallocationchange = allocation.map(row => ({
//       allocation_id: row.allocation_id,
//       request_id: row.request_id,
//       unit_id: row.unit_id,
//       allocation_date: new Date(row.allocation_date).toLocaleDateString('en-GB'),
//       admin_name: row.admin_name,
//       allocation: row.allocation,
//       allocated_blood: row.allocated_blood,
//       allocated_unit: row.allocated_unit,
//       notes: row.notes
//     }));

//     // format coordinator
//     const fromcorrdinatorchange = coordinator.map(row => ({
//       transfer_id: row.transfer_id,
//       unit_id: row.unit_id,
//       request_id: row.request_id,
//       status: row.status,
//       from_location: row.from_location,
//       hospital_name: row.hospital_name,
//       hospital_location: row.hospital_location,
//       dispatch_date: new Date(row.dispatch_date).toLocaleDateString('en-GB'),
//       delivered_date: new Date(row.delivered_date).toLocaleDateString('en-GB')
//     }));

//     // final response
//     res.json({
//       fromdonor: donor,
//       fromunit: formunitchange,
//       fromallocation: formallocationchange,
//       fromcoordinator: fromcorrdinatorchange,
//       fromrequest: request
//     });

//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Server error");
//   }
// });



app.post("/tracebility", async (req, res) => {
  try {
    const { username, userid } = req.body;

    // donor
    const [donor] = await db.promise().query(
      `SELECT * FROM donor WHERE donor_id=? OR name=?`,
      [userid, username]
    );

    // blood unit
    const [bloodUnit] = await db.promise().query(
      `SELECT * FROM blood_units WHERE donor_id=?`,
      [userid]
    );

    let unitId = bloodUnit.length > 0 ? bloodUnit[0].unit_id : null;

    // allocation
    const [allocation] = unitId
      ? await db.promise().query(
          `SELECT * FROM allocation WHERE unit_id=?`,
          [unitId]
        )
      : [[]];

    // coordinator
    const [coordinator] = unitId
      ? await db.promise().query(
          `SELECT * FROM coordinator WHERE unit_id=?`,
          [unitId]
        )
      : [[]];

    // request hospital
    const [request] =
      allocation.length > 0
        ? await db.promise().query(
            `SELECT hospital_id FROM request WHERE request_id=?`,
            [allocation[0].request_id]
          )
        : [[]];

    // format blood unit
    const formunitchange =
      bloodUnit.length > 0
        ? bloodUnit.map((row) => ({
            unit_id: row.unit_id,
            donor_id: row.donor_id,
            blood_group: row.blood_group,
            collection_date: new Date(row.collection_date).toLocaleDateString("en-GB"),
            expiry_date: new Date(row.expiry_date).toLocaleDateString("en-GB"),
            status: row.status,
            storage_location: row.storage_location,
          }))
        : "N/A";

    // format allocation
    const formallocationchange =
      allocation.length > 0
        ? allocation.map((row) => ({
            allocation_id: row.allocation_id,
            request_id: row.request_id,
            unit_id: row.unit_id,
            allocation_date: new Date(row.allocation_date).toLocaleDateString("en-GB"),
            admin_name: row.admin_name,
            allocation: row.allocation,
            allocated_blood: row.allocated_blood,
            allocated_unit: row.allocated_unit,
            notes: row.notes,
          }))
        : "N/A";

    // format coordinator
    const fromcorrdinatorchange =
      coordinator.length > 0
        ? coordinator.map((row) => ({
            transfer_id: row.transfer_id,
            unit_id: row.unit_id,
            request_id: row.request_id,
            status: row.status,
            from_location: row.from_location,
            hospital_name: row.hospital_name,
            hospital_location: row.hospital_location,
            dispatch_date: new Date(row.dispatch_date).toLocaleDateString("en-GB"),
            delivered_date: new Date(row.delivered_date).toLocaleDateString("en-GB"),
          }))
        : "N/A";

    // final response
    res.json({
      fromdonor: donor.length > 0 ? donor : "N/A",
      fromunit: formunitchange,
      fromallocation: formallocationchange,
      fromcoordinator: fromcorrdinatorchange,
      fromrequest: request.length > 0 ? request : "N/A",
    });

  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

app.get("/index/audit1",(req,res)=>{
  const sql = "select * from audit"
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    const changedateformat = result.map(row => ({

      audit_id : row.audit_id ,
       name: row. name,
       role : row. role ,
      action_type : row.action_type ,
      action_date : new Date(row.action_date ).toLocaleDateString('en-GB').split('/').join('-'),
       reference_id :row. reference_id ,
       reference_table:row.reference_table,
       details  : row. details  
    }))

    res.json(changedateformat);
  })
})


















//run server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});