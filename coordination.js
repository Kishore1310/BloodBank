const form=document.getElementById('form')

const request_id_input=document.getElementById('firrequest-input')
//const blood_unit_id_input=document.getElementById('firstunit-input')
const status_input=document.getElementById('status11-input')
//const bloodgroup_input=document.getElementById('bloodstorage-input')
const hospital_name_input=document.getElementById('hospitalname-input')
const hospitallocation_input=document.getElementById('hospitallocation-input')
const date1_input=document.getElementById('DispatchDate')
//const date2_input=document.getElementById('deliveryDate1')
const error_message=document.getElementById('error-message')

form.addEventListener('submit',(e)=>{
  let errors=[]

  errors=getSignupFormErrors(
    request_id_input.value,
  
    status_input.value,
   // bloodgroup_input.value,
    hospital_name_input.value,
    hospitallocation_input.value,
    date1_input.value,
    //date2_input.value
  )

  if(errors.length>0){
    e.preventDefault()
    error_message.innerText=errors.join(". ")
  }
})

function getSignupFormErrors(request, status, hospitalname, hospitallocation, date1){
  let errors=[]

  if(request===''||request==null){
    errors.push('request id is required')
    request_id_input.parentElement.classList.add('incorrect')
  }

 

  if(status===''||status==null){
    errors.push('status required')
    status_input.parentElement.classList.add('incorrect')
  }

  // if(bloodgroup===''||bloodgroup==null){
  //   errors.push('storage location required')
  //   bloodgroup_input.parentElement.classList.add('incorrect')
  // }

  if(hospitalname===''||hospitalname==null){
    errors.push('hospital name required')
    hospital_name_input.parentElement.classList.add('incorrect')
  }

  if(hospitallocation===''||hospitallocation==null){
    errors.push('hospital location required')
    hospitallocation_input.parentElement.classList.add('incorrect')
  }

  if(date1===''||date1==null){
    errors.push('dispatch date is required')
    date1_input.parentElement.classList.add('incorrect')
  }

  // if(date2===''||date2==null){
  //   errors.push('delivery date is required')
  //   date2_input.parentElement.classList.add('incorrect')
  // }

  return errors
}

const allinputs=[
  request_id_input,
  status_input,
  // bloodgroup_input,
  hospital_name_input,
  hospitallocation_input,
  date1_input,
  // date2_input
].filter(input=>input!=null)
allinputs.forEach(input=>{
  input.addEventListener('input',()=>{
    if(input.parentElement.classList.contains('incorrect')){
      input.parentElement.classList.remove('incorrect')
      error_message.innerText=''
    }
  })
})
fetch("http://localhost:3000/index/transfer", {
  credentials: "include"
})
  .then(res => res.json())
  .then(data => {

    console.log(data); 

    const container = document.getElementById("cardContainer");
    container.innerHTML = "";

    
    document.querySelector(".welcome_hospital_name").innerText = data.coordinatorname;
  //  const selectedunit=document.getElementById("firstunit-input");
  //        selectedunit.innerHTML="";
  const colors = "#dee7ea";
    data.coordinator.forEach(req => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <h3>${req.request_id}</h3>
        <p><b>Hospital Name:</b> ${req.name}</p>
        <p><b>Hospital ID:</b> ${req.hospital_id}</p>
        <p><b>Allocated Blood Group:</b> ${req.allocated_blood}</p>
        <p><b>Number of Unit allocated:</b> ${req.allocated_unit}</p>
        <p><b>Allocated units:</b>${req.unit_ids}</p>
        <p><b>Status:</b> <span class="status">${req.status}</span></p>
        
      `;
        card.addEventListener("click",()=>{
          const selectedunit=document.getElementById("firstunit-input");
         selectedunit.innerHTML="";
          console.log("Clicked:", req.unit_ids)
          for (let i=0;i<req.unit_ids.length;i++){
            for(let j=0;j<data.storagelocation.length;j++){
                 if(req.unit_ids[i]==data.storagelocation[j].unit_id){
                  selectedunit.innerHTML += `
  <div style="background:${colors}; padding:10px; margin:5px; border-radius:8px;">
    Unit ID:${req.unit_ids[i]} - Storage:${data.storagelocation[j].storage_location}
  </div>
`;
                 }
          }
        }
        request_id_input.value=req.request_id;
        hospital_name_input.value=req.name;
        hospitallocation_input.value=req.location;
           let statusv=req.status;
  const btnbtn1=document.getElementById("btnbtn");
   const dates=document.getElementById("changedate");
  
  if (statusv === "Pending") {
  btnbtn1.innerText = "In transit";
  dates.innerText = "Dispatch date";
}
else if (statusv === "In transit") {
  btnbtn1.innerText = "Delivered";
  dates.innerText = "Delivered date";
}
else {
  e.preventDefault();
}})

      container.appendChild(card);
      
   
    });

  })
  .catch(err => console.log(err));
 