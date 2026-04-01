  const URL="http://localhost:3000/index/kishor";

const getblood=async ( )=>{
  let response=await fetch(URL)
    console.log(response)
    let data=await response.json();
    var blood=[]; var bloodgroup=[];
    //  var donorid=[];
    // var name1=[]; var bloodde=[]; var contactd=[];
     let blood1=document.getElementsByClassName("box1")
     let bloodgroup1=document.getElementsByClassName("box2")
    //  let donor_id1=document.getElementsByClassName('box3')
    //  let name=document.getElementsByClassName("box4")
    //  let bloodt=document.getElementsByClassName("box5")
    //  let contact=document.getElementsByClassName("box6")
     
      for(let i=0;i<data.bloodsummary.length;i++){
        blood[i]=data.bloodsummary[i].total;
       bloodgroup[i]=data.bloodsummary[i].blood_group;
       
      }
     for(let i=0;i<blood1.length;i++){
      blood1[i].innerText=blood[i];
     bloodgroup1[i].innerText=bloodgroup[i];
     }
    //  console.log(data.donordetail.length)
    //  console.log(data.donordetail[0].name)
    //  console.log(data.donordetail[0].donor_id)
    //  for(let i=0;i<data.donordetail.length;i++){
    //         donorid[i]=data.donordetail[i].donor_id;
    //         name1[i]=data.donordetail[i].name;
    //        bloodde[i]=data.donordetail[i].blood_group;
    //         contactd[i]=data.donordetail[i].contact;
    //  }
    //  console.log(donorid)
    //  for( let i=0;i<data.donordetail.length;i++){
    //        donor_id1[i].innerText=donorid[i];
    //         name[i].innerText=name1[i];
    //          bloodt[i].innerText=bloodde[i];
    //         contact[i].innerText=contactd[i];
    //  }
    //  conso
    let tbody = document.getElementById("donorTable");
    let tbody1 = document.getElementById("donorTable1");

  tbody.innerHTML = ""; // clear old data
  tbody1.innerHTML="";
  for (let i = 0; i < data.donordetail.length; i++) {
    let d = data.donordetail[i];
    let c=data.unitdetail[i];
    let row = `
      <tr>
        <td>${d.donor_id}</td>
        <td>${d.name}</td>
        <td>${d.blood_group}</td>
        <td>${d.contact}</td>
      </tr>
    `;
     let rowc = `
      <tr>
        <td>${c.unit_id}</td>
        <td>${c.donor_id}</td>
        <td>${c.blood_group}</td>
        <td>${c.collection_date}</td>
        <td>${c.expiry_date}</td>
        <td>${c.status}</td>
        <td>${c.storage_location}</td>
      </tr>
    `;

    tbody.innerHTML += row;
    tbody1.innerHTML+=rowc;
  }
};
 getblood();
    
      