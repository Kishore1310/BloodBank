
function downloadPDF() {
  const element = document.querySelector(".user_details");

  const opt = {
    margin: 0.5,
    filename: 'traceability_report.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
  };

  html2pdf().set(opt).from(element).save();
}

// document.getElementById("form").addEventListener("submit", async function (e) {
//   e.preventDefault();

//   const username = document.getElementById("user_name").value;
//   const userid = document.getElementById("user_id").value;

//   const response = await fetch("http://localhost:3000/tracebility", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify({
//       username,
//       userid
//     })
//   });

//   const data = await response.json();

//   // donor
//   document.getElementById("username_box").innerText = data.fromdonor[0].name;
//   document.getElementById("userid_box").innerText = data.fromdonor[0].donor_id;
//   document.getElementById("donation_box").innerText = data.fromdonor[0].donation_location;

//   // blood unit
//   document.getElementById("bloodgroup_box").innerText = data.fromunit[0].blood_group;
//   document.getElementById("unitid_box").innerText = data.fromunit[0].unit_id;
//   document.getElementById("storage_box").innerText = data.fromunit[0].storage_location;
//   document.getElementById("expiry_box").innerText = data.fromunit[0].expiry_date;
//   document.getElementById("status_box").innerText = data.fromunit[0].status;

//   // allocation
//   document.getElementById("allocationid_box").innerText = data.fromallocation[0].allocation_id;
//   document.getElementById("allocationdate_box").innerText = data.fromallocation[0].allocation_date;
//   document.getElementById("allocatedby_box").innerText = data.fromallocation[0].admin_name;
//   document.getElementById("allocationstatus_box").innerText = data.fromallocation[0].allocation;

//   // coordinator
//   document.getElementById("hospital_box").innerText = data.fromcoordinator[0].hospital_name;
//   document.getElementById("hospital_location_box").innerText = data.fromcoordinator[0].hospital_location;
//   document.getElementById("transferid_box").innerText = data.fromcoordinator[0].transfer_id;
//   document.getElementById("transferstatus_box").innerText = data.fromcoordinator[0].status;
//   document.getElementById("dispatch_box").innerText = data.fromcoordinator[0].dispatch_date;
//   document.getElementById("delivered_box").innerText = data.fromcoordinator[0].delivered_date;
// });


document.getElementById("form").addEventListener("submit", async function(e) {
  e.preventDefault();

  const username = document.getElementById("user_name").value;
  const userid = document.getElementById("user_id").value;

  const response = await fetch("/tracebility", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username,
      userid
    })
  });

  const data = await response.json();

  document.getElementById("username_box").innerText = data.fromdonor[0].name;
  document.getElementById("userid_box").innerText = data.fromdonor[0].donor_id;
  document.getElementById("bloodgroup_box").innerText = data.fromunit[0].blood_group;
  document.getElementById("unitid_box").innerText = data.fromunit[0].unit_id;
  document.getElementById("donation_box").innerText = data.fromdonor[0].donation_location;
  document.getElementById("storage_box").innerText = data.fromunit[0].storage_location;
   document.getElementById("expiry_box").innerText = data.fromunit[0].expiry_date;
  document.getElementById("status_box").innerText = data.fromunit[0].status;
   document.getElementById("allocationid_box").innerText = data.fromallocation[0].allocation_id;
   document.getElementById("allocationdate_box").innerText = data.fromallocation[0].allocation_date;
  document.getElementById("allocatedby_box").innerText = data.fromallocation[0].admin_name;
  document.getElementById("allocationstatus_box").innerText = data.fromallocation[0].allocation;
  document.getElementById("hospital_box").innerText = data.fromcoordinator[0].hospital_name;
   document.getElementById("hospital_location_box").innerText = data.fromcoordinator[0].hospital_location;
   document.getElementById("transferid_box").innerText = data.fromcoordinator[0].transfer_id;
   document.getElementById("transferstatus_box").innerText = data.fromcoordinator[0].status;
   document.getElementById("dispatch_box").innerText = data.fromcoordinator[0].dispatch_date;
  document.getElementById("delivered_box").innerText = data.fromcoordinator[0].delivered_date;
  document.getElementById("hospital_id_box").innerText =data.fromrequest[0].hospital_id;
  document.getElementById("donationl_box").innerText = data.fromunit[0].collection_date;
  
// });
});

