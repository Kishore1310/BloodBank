const form=document.getElementById('form')
const hospitalname_input=document.getElementById('hospitalname-input')
const hospitalid_input=document.getElementById('hospitalid-input')
const bloodGroup_input=document.getElementById('bloodGroup')
const unitrequired_input=document.getElementById('unitrequired-input')
const urgency_input=document.getElementById('urgency')
const date1_input=document.getElementById('requiredTime')
const notes_input=document.getElementById('notes')
const error_message=document.getElementById('error-message')

form.addEventListener('submit',(e)=>{
  let errors=[]

  errors=getSignupFormErrors(
   hospitalname_input.value,
   hospitalid_input.value,
   bloodGroup_input.value,
   unitrequired_input.value,
   urgency_input.value,
   date1_input.value,
   notes_input.value
  )

  if(errors.length>0){
    e.preventDefault()
    error_message.innerText=errors.join(". ")
  }
})

function getSignupFormErrors(hname, hid, bloodgroup, unitr, urgency, date1, notes){
  let errors=[]

  if(hname===''||hname==null){
    errors.push('hospital name required')
    hospitalname_input.parentElement.classList.add('incorrect')
  }

  if(hid===''||hid==null){
    errors.push('hospital id required')
    hospitalid_input.parentElement.classList.add('incorrect')
  }

  if(bloodgroup===''||bloodgroup==null){
    errors.push('storage location required')
    bloodGroup_input.parentElement.classList.add('incorrect')
  }


  if(unitr===''||unitr==null){
    errors.push('eter numder of unit')
   unitrequired_input.parentElement.classList.add('incorrect')
  }

  if(urgency===''||urgency==null){
    errors.push('select urgency')
    urgency_input.parentElement.classList.add('incorrect')
  }

  if(date1===''||date1==null){
    errors.push('request date is required')
    date1_input.parentElement.classList.add('incorrect')
  }

  if(notes===''||notes==null){
    errors.push('enter in to notes')
    notes_input.parentElement.classList.add('incorrect')
  }

  return errors;
}

const allinputs=[
  hospitalname_input,
   hospitalid_input,
   bloodGroup_input,
   unitrequired_input,
   urgency_input,
   date1_input,
   notes_input
].filter(input=>input!=null)
allinputs.forEach(input=>{
  input.addEventListener('input',()=>{
    if(input.parentElement.classList.contains('incorrect')){
      input.parentElement.classList.remove('incorrect')
      error_message.innerText=''
    }
  })
})
const URL="http://localhost:3000/index/getsesion"
const hospitalname=async()=>{
    let response= await fetch(URL)
     console.log(response);
     let data=await response.json();
     console.log(data);
     console.log(data.name);
    
     let hospitan=document.getElementsByClassName("welcome_hospital_name")[0];
     hospitan.innerText=data.name;
      hospitalname_input.value=data.name
      hospitalid_input.value=data.hospital_id;
   
  }
  hospitalname();