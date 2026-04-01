
// 🔀 Navigation
console.log("JS Loaded");
function goToAllocation() {
  window.location.href = "/allocation.html";
}

function goToTransfer() {
  window.location.href = "/coordinator.html";
}
async function loadDashboard() {
  try {
    const response = await fetch("http://localhost:3000/index/dashboard");
    credentials: "include"
    const data = await response.json();
      console.log(data);
    console.log(data); // 👈 check in browser console

    // Set values
    document.getElementById("totalUnits").innerText = data.status1;
    document.getElementById("accepted").innerText = data.allocation1;
    document.getElementById("rejected").innerText = data.allocation2;
    document.getElementById("inTransit").innerText = data.status2;
    document.getElementById("delivered").innerText = data.status3;

  } catch (error) {
    console.log("Error loading dashboard:", error);
  }
}

// Call function
loadDashboard();