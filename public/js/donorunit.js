const form=document.getElementById('form')
const error_message=document.getElementById('error-message')
const id11=document.getElementById('userid_input')
const bloodgroup1=document.getElementById('bloodGroup1')
const expiry=document.getElementById('requiredDate')
form.addEventListener('submit',(e)=>{
     let errors=[]
     
     errors=getdonordetailerrors(id11.value,bloodgroup1.value,expiry.value)
      if(errors.length>0){
    e.preventDefault()
    error_message.innerText=errors.join(". ")
  }
})
function getdonordetailerrors(id1,blood2,edate){
  let errors=[]
  if(id1===''||id1==null){
    errors.push('donor id required')
    id11.parentElement.classList.add('incorrect')
  }
   
  if(blood2===''||blood2==null){
    errors.push(' select glood group')
    bloodgroup1.parentElement.classList.add('incorrect')
  }
 
  if(edate===''||edate==null){
    errors.push('select date')
    expiry.parentElement.classList.add('incorrect')
  }

  return errors;
}
const allinputs=[id11,bloodgroup1,expiry].filter(input=>input!=null)
allinputs.forEach(input=>{
  input.addEventListener('input',()=>{
  if(input.parentElement.classList.contains('incorrect')){
    input.parentElement.classList.remove('incorrect')
    error_message.innerText=''
  }
  })
})