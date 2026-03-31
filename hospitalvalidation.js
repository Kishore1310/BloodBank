const form=document.getElementById('form')
const email_input=document.getElementById('email-input')
const password_input=document.getElementById('password-input')
const hospital_id_input=document.getElementById('hospitalid-input')
const hospital_name_input=document.getElementById('hospitalname-input')
const location_input=document.getElementById('location-input')
const contact_input=document.getElementById('contact-input')
const license_input=document.getElementById('license-input')
const repeat_password_input=document.getElementById('repeat-password-input')
const error_message=document.getElementById('error-message')
var hospital_type;
const hospital_type_input=document.querySelectorAll('input[name="hospital"]')
hospital_type_input.forEach(hospital_type_input=>{
hospital_type_input.addEventListener('change',()=>{
hospital_type=hospital_type_input.value
  });
});

form.addEventListener('submit',(e)=>{
  let errors=[]
  if(hospital_id_input){
    //we are in signup page
    errors=getSignupFormErrors(hospital_id_input.value,hospital_name_input.value,email_input.value,password_input.value,repeat_password_input.value,location_input.value,contact_input.value,license_input.value,hospital_type)
  }
  else{
    //if fisrtname_input is not so we are in login page
    errors=getLoginFormErrors(email_input.value,password_input.value)
  }
  if(errors.length>0){
    e.preventDefault()
    error_message.innerText=errors.join(". ")
  }
})
function getSignupFormErrors(hospitalid,hospitalname,email,password,repeatpassword,location,contact,license){
  let errors=[]
  if(hospitalid===''||hospitalid==null){
    errors.push('hospitalid is required')
    hospital_id_input.parentElement.classList.add('incorrect')
  }
  if(hospitalname===''||hospitalname==null){
    errors.push('hospitalname is required')
    hospital_name_input.parentElement.classList.add('incorrect')
  }
  if(email===''||email==null){
    errors.push('email is required')
    email_input.parentElement.classList.add('incorrect')
  }
  if(password===''||password==null){
    errors.push('password is required')
    password_input.parentElement.classList.add('incorrect')
  }
  if(repeatpassword===''||repeatpassword==null){
    errors.push('repeatpassword is required')
    repeat_password_input.parentElement.classList.add('incorrect')

  }
  if(contact===''||contact==null){
    errors.push('contact is required')
    contact_input.parentElement.classList.add('incorrect')
  }
  if(location===''||location==null){
    errors.push('location is required')
    location_input.parentElement.classList.add('incorrect')
  }
  if(license===''||license==null){
    errors.push('license is required')
    license_input.parentElement.classList.add('incorrect')
  }
  if(password.length<8){
    errors.push('password must have at least 8 characters')
    password_input.parentElement.classList.add('incorrect')
  }
  if(password!=repeatpassword){
    errors.push("password does not match repeated password")
  }
  return errors;
}
function getLoginFormErrors(email,password){
 let errors=[]
 if(email===''||email==null){
    errors.push('email is required')
    email_input.parentElement.classList.add('incorrect')
  }
  if(password===''||password==null){
    errors.push('password is required')
    password_input.parentElement.classList.add('incorrect')
  } 
  
  return errors;
}
const allinputs=[hospital_id_input,hospital_name_input,email_input,password_input,repeat_password_input,location_input,contact_input,license_input].filter(input=>input!=null)
allinputs.forEach(input=>{
  input.addEventListener('input',()=>{
  if(input.parentElement.classList.contains('incorrect')){
    input.parentElement.classList.remove('incorrect')
    error_message.innerText=''
  }
  })
})
