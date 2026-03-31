const form=document.getElementById('form')
const donorname_input=document.getElementById('firstname-input')
const bloodgroup_input=document.getElementById('bloodGroup')
const donationdate_input=document.getElementById('donation_Date')
const contact_input=document.getElementById('contact-input')
const error_message=document.getElementById('error-message')
const donationlocation_input=document.getElementById('donation_location-input')
form.addEventListener('submit',(e)=>{
     let errors=[]
     errors=getdonordetailerrors(donorname_input.value,bloodgroup_input.value,contact_input.value,donationlocation_input.value)
      if(errors.length>0){
    e.preventDefault()
    error_message.innerText=errors.join(". ")
  }
})
function getdonordetailerrors(donorname,blood,contact,donationlocation){
  let errors=[]
  if(donorname===''||donorname==null){
    errors.push('donor name required')
    donorname_input.parentElement.classList.add('incorrect')
  }
  
   if(blood===''||blood==null){
    errors.push(' select glood group')
    bloodgroup_input.parentElement.classList.add('incorrect')
  }
  if(contact===''||contact==null){
    errors.push('contact required')
    contact_input.parentElement.classList.add('incorrect')
  }
  if(donationlocation===''||donationlocation==null){
    errors.push('location required')
    donationdate_input.parentElement.classList.add('incorrect')
  }
  return errors;
}
const allinputs=[donorname_input,bloodgroup_input,contact_input,donationdate_input].filter(input=>input!=null)
allinputs.forEach(input=>{
  input.addEventListener('input',()=>{
  if(input.parentElement.classList.contains('incorrect')){
    input.parentElement.classList.remove('incorrect')
    error_message.innerText=''
  }
  })
})