// fetch("http://localhost:3000/index/status", {
//   credentials: "include"
// })
//   .then(res => res.json())
//   .then(data => {

//     console.log(data); 

//     const container = document.getElementById("cardContainer");
//      container.innerHTML = "";

    
    
  
//     data.forEach(req => {
//      const card = document.createElement("div");
//       card.classList.add("card");

//       card.innerHTML = `
//         <h3>${req.request_id}</h3>
//          <p><b>Blood_group:</b> ${req.blood_group}</p>
//          <p><b>Unit Requested:</b> ${req.unitrequired}</p>
//          <p><b>Urgency_level:</b>${req.urgency_level}</p>
//          <p><b>Required_by:</b>${req.required_by}</p>
//          <p><b>Request_date:</b>${req.request_date}</p>
//         <p><b>Allocated_date:</b> ${req.allocation_date}</p>
//         <p><b>Allocation:</b> ${req.allocation}</p>
//         <p><b>Allocated_unit:</b>${req.total_allocated_unit}<p>
//         <p><b>status:</b>${req.status}</p>
//         <p><b>dispatch_date:</b>${req.dispatch_date}</p>
//         <p><b>delivered_date:</b>${req.delivered_date}</p>
        
//      `;
       

//       container.appendChild(card);
      
   
//      });

//   })
function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const cards = document.querySelectorAll(".card");

  let y = 10;

  doc.setFontSize(16);
  doc.text("Blood Request Status Report", 10, y);
  y += 10;

  cards.forEach((card, index) => {
    const text = card.innerText;

    const lines = doc.splitTextToSize(text, 180);

    doc.setFontSize(10);
    doc.text(lines, 10, y);

    y += lines.length * 6 + 5;

    // Add new page if space ends
    if (y > 270) {
      doc.addPage();
      y = 10;
    }
  });

  doc.save("Blood_Request_Status.pdf");
}
//   .catch(err => console.log(err));
   document.addEventListener("DOMContentLoaded", async () => {

   const container = document.getElementById("cardContainer");

  try {
    // 🔗 Fetch data from backend
   const res = await fetch("http://localhost:3000/index/status");  // your API route
     const data = await res.json();

   // ❌ No data
   if (!data || data.length === 0) {
     container.innerHTML = "<p>No requests found</p>";
     return;
   }

   // 🔁 Loop through requests
    data.forEach(req => {

       const card = document.createElement("div");
      card.classList.add("card");

      // 🎨 Dynamic classes
       const urgencyClass = "urgent-" + req.urgency_level.toLowerCase();
      const statusClass = "status-" + req.status.toLowerCase();

       // 🧾 Card content
      card.innerHTML = `
        <h3>Request ID: ${req.request_id}</h3>

        <p><span>Blood Group:</span> ${req.blood_group}</p>
        <p><span>Units Requested:</span> ${req.unitrequired}</p>

        <p><span>Urgency:</span> 
           <span class="${urgencyClass}">
             ${req.urgency_level}
           </span>
         </p>

       

        <p><span>Required By:</span> ${req.required_by || "N/A"}</p>
        <p><span>Request Date:</span> ${req.request_date ||"N/A"}</p>
            <p><span>Allocated_date:</span> ${req.allocation_date ||"N/A"}</p>
            <p><span>dispatch_date:</span> ${req.dispatch_date ||"N/A"}</p>
             <p><span>Required By:</span> ${req.required_by || "N/A"}</p>
        <p><span>delivered_date:</span> ${req.delivered_date || "N/A"}</p>

        <div class="transfer-status">
          🚚 Transfer: ${req.status || "Not Dispatched"}
        </div>

        <div class="decision-box">
          📝 Decision: ${req.allocation || "Pending"}
        </div>
      `;

       container.appendChild(card);
     });

   } catch (error) {
     console.error(error);
    container.innerHTML = "<p>Error loading data</p>";
  }

 });