  const URL="http://localhost:3000/index/audit1";

const getblood=async ( )=>{
  let response=await fetch(URL)
    console.log(response)
    let data=await response.json();
  
    let tbody = document.getElementById("donorTable");

  tbody.innerHTML = ""; // clear old data

  for (let i = 0; i < data.length; i++) {
    let d = data[i];
    
    let row = `
      <tr>
        <td>${d.audit_id}</td>
        <td>${d.name}</td>
        <td>${d.role}</td>
        <td>${d.action_type}</td>
        <td>${d.action_date}</td>
        <td>${d.reference_id}</td>
        <td>${d.reference_table}</td>
        <td>${d.details}</td>
      </tr>
    `;
     

    tbody.innerHTML += row;
   
  }
};
 getblood();
    
      