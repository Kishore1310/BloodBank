console.log("JS Loaded");
const form=document.getElementById('form')
const firstname_input=document.getElementById('firstname-input')
const email_input=document.getElementById('email-input')
const password_input=document.getElementById('password-input')
const role_input=document.getElementById('role')
const repeat_password_input=document.getElementById('repeat-password-input')
const error_message=document.getElementById('error-message')
form.addEventListener('submit',(e)=>{
  // e.preventDefault()
  let errors=[]
  if(firstname_input){
    //we are in signup page
    errors=getSignupFormErrors(firstname_input.value,email_input.value,password_input.value,repeat_password_input.value,role_input.value)
  }
  else{
    //if fisrtname_input is not so we are in login page
    errors=getLoginFormErrors(email_input.value,password_input.value,role_input)
  }
  if(errors.length>0){
    e.preventDefault()
    error_message.innerText=errors.join(". ")
  }
})
function getSignupFormErrors(firstname,email,password,repeatpassword,role){
  let errors=[]
  if(firstname===''||firstname==null){
    errors.push('firstname is required')
    firstname_input.parentElement.classList.add('incorrect')
  }
  if(email===''||email==null){
    errors.push('email is required')
    email_input.parentElement.classList.add('incorrect')
  }
  if(role===''||role==null){
    errors.push('role is required')
    role_input.parentElement.classList.add('incorrect')
  }
  if(password===''||password==null){
    errors.push('password is required')
    password_input.parentElement.classList.add('incorrect')
  }
  if(repeatpassword===''||repeatpassword==null){
    errors.push('repeatpassword is required')
    repeat_password_input.parentElement.classList.add('incorrect')

  }
  if(password.length<8){
    errors.push('password must have at least 8 characters')
    password_input.parentElement.classList.add('incorrect')
  }
  if(password!==repeatpassword){
    errors.push("password does not match repeated password")
  }
   return errors;
}
const allinputs=[firstname_input,email_input,password_input,repeat_password_input,role_input].filter(input=>input!=null)
allinputs.forEach(input=>{
  input.addEventListener('input',()=>{
  if(input.parentElement.classList.contains('incorrect')){
    input.parentElement.classList.remove('incorrect')
    error_message.innerText=''
  }
  })
})
function getLoginFormErrors(email,password,role){
 let errors=[]
 if(email===''||email==null){
    errors.push('email is required')
    email_input.parentElement.classList.add('incorrect')
  }
  if(password===''||password==null){
    errors.push('password is required')
    password_input.parentElement.classList.add('incorrect')
  } 
  if(role===''||role==null){
    errors.push('role is required')
    role_input.parentElement.classList.add('incorrect')
  }
  
  return errors;
}