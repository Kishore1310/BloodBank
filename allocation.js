console.log("JS Loaded");
const form=document.getElementById('form')
const admin_name_input=document.getElementById('firstname-input')
const request_id_input=document.getElementById('firrequest-input')
const blood_unit_id_input=document.getElementById('firstunit-input')
const bloodgroup_input=document.getElementById('bloodGroup')
const unit_allocated_input=document.getElementById('unitallocate-input')
const date_input=document.getElementById('requiredDate')
const notes_input=document.getElementById('notes')
const error_message=document.getElementById('error-message')
form.addEventListener('submit',(e)=>{
   // e.preventDefault()
let errors=[]

 errors=getSignupFormErrors(admin_name_input.value,request_id_input.value,unit_allocated_input.value,blood_unit_id_input.value,bloodgroup_input.value,date_input.value,notes_input.value)
//   
   if(errors.length>0){
    e.preventDefault()
     error_message.innerText=errors.join(". ")
  }
})
 function getSignupFormErrors(admin,request,unitallocated,bloodid,bloodgroup,date,notes){
   let errors=[]
  if(admin===''||admin==null){
    errors.push('admin name is required')
    admin_name_input.parentElement.classList.add('incorrect')
  }
   if(request===''||request==null){
    errors.push('request id is required')
    request_id_input.parentElement.classList.add('incorrect')
  }
   if(unitallocated===''||unitallocated==null){
    errors.push('number of uunit  is required')
    unit_allocated_input.parentElement.classList.add('incorrect')
   }
 if(bloodid==''||bloodid==null){
     errors.push('blood id  is required')
   blood_unit_id_input.parentElement.classList.add('incorrect')
   }
   if(bloodgroup===''||bloodgroup==null){
   errors.push('blood gropu  is required')
  bloodgroup_input.parentElement.classList.add('incorrect')
   }
    if(date===''||date==null){
   errors.push('allocation date is required')
  date_input.parentElement.classList.add('incorrect')
   }
    if(notes===''||notes==null){
   errors.push('notes is required')
  notes_input.parentElement.classList.add('incorrect')
   }
   if (parseInt(unitallocated) > parseInt(bloodid)) {
  errors.push("Allocated units cannot exceed requested units");
}
  return errors;
 }
 const allinputs=[admin_name_input,request_id_input,unit_allocated_input,blood_unit_id_input,bloodgroup_input,date_input,notes_input].filter(input=>input!=null)
 allinputs.forEach(input=>{
  input.addEventListener('input',()=>{
  if(input.parentElement.classList.contains('incorrect')){
    input.parentElement.classList.remove('incorrect')
    error_message.innerText=''
  }
  })

})

// form.addEventListener("submit", function(e) {
//     e.preventDefault(); // stop page refresh
//      console.log(admin_name_input.value);
//      console.log(request_id_input.value);
//      console.log(unit_allocated_input.value);
//      console.log(blood_unit_id_input.value);
//      console.log(bloodgroup_input.value);
//      console.log(date_input.value);
//      console.log(notes_input.value);
//     let selected = document.querySelector('.show_radio_button input[type="radio"]:checked');

//     if (selected) {
//         let value = selected.value.replace('=', ''); // 👉 your selected value
//         console.log(value);
//     } else {
//         console.log("No option selected");
//     }
// });

 fetch("http://localhost:3000/index/allocation")
      .then(res => res.json())
      .then(data => {
        const container = document.getElementById("cardContainer");
        container.innerHTML = "";
        document.getElementsByClassName("welcome_hospital_name")[0].innerText=data.adminname;
        console.log("Total Requests:", data.requestdetail.length); // debug

        data.requestdetail.forEach(req => {

          // find matching hospital
          const hospital = data.hospitalname.find(
            h => h.hospital_id === req.hospital_id
          );
          const status=data.allocationtype.find(
            h=>h.request_id===req.request_id
          );
          const statusText = status ? status.allocation : "pending";
          const card = document.createElement("div");
          card.classList.add("card");
const urgencyClass = req.urgency_level === "critical" ? "urgent" : "";
          card.innerHTML = `
            <h3>${req.request_id}</h3>

            <p><b>Hospital Name:</b> ${hospital ? hospital.name : "Unknown"}</p>
            <p><b>Hospital ID:</b> ${req.hospital_id}</p>
            <p><b>Blood Group:</b> ${req.blood_group}</p>
            <p><b>Unit Need:</b> ${req.unitrequired}</p>

            <p><b>Urgency:</b> 
             <span class="${urgencyClass}">
  ${req.urgency_level}
</span>
            </p>

            <p><b>Status:</b> 
             <span class="status ${statusText}">
  ${statusText}
</span>
            </p>
              <p><b>Hospital Type:</b> ${hospital ? hospital.hospital_type : "Unknown"}</p>
               <p><b>Hospital location:</b> ${hospital ? hospital.location: "Unknown"}</p>
            <p><b>Required By:</b> ${req.required_by}</p>
            <p><b>Request Date:</b> ${req.request_date}</p>

            <p><b>Notes:</b> ${req.notes || "-"}</p>
          `;
              card.addEventListener("click",()=>{
                console.log("Clicked:", req);
                 document.querySelectorAll(".card").forEach(c => c.classList.remove("active"));

  // add highlight
  card.classList.add("active");

  console.log("Clicked:", req);
          admin_name_input.value=data.adminname;
          request_id_input.value=req.request_id;
          blood_unit_id_input.value=req.unitrequired;
          bloodgroup_input.value=req.blood_group;

      })
          container.appendChild(card);
        });
      })
      .catch(err => console.log(err));
      
      