const URL="http://localhost:3000/index/history1";
const gethistory=async()=>{
  let response= await fetch(URL);
  console.log(response);
  let data=await response.json();
    console.log(data)
     let tbody = document.getElementById("donorTable");
    
  tbody.innerHTML = ""; // clear old data
 
  for (let i = 0; i < data.length; i++) {
    let d = data[i];
    let row = `
      <tr>
        <td>${d.request_id}</td>
        <td>${d.blood_group}</td>
        <td>${d.unitrequired}</td>
        <td>${d.urgency_level}</td>
         <td>${d.required_by}</td>
          <td>${d.request_date}</td>
          <td>${d.notes}</td>
      </tr>
    `;
    

    tbody.innerHTML += row;

  }
}
gethistory();