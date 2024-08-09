document.addEventListener("DOMContentLoaded", function () {
  const serviceOrders = {
    G1: {
      open: [
        { id: "3724301", status: "DIS", time: "2024-05-24 04:02:44", name: "NUSANTARA KALIMANT..", detail: "579584 | DCV3060CPS", icon: "fa-solid fa-cloud-arrow-up", color: "red", size: "25px" },
        { id: "3734588", status: "DIS", time: "2024-06-21 04:02:25", name: "CHAROEN POKPHAND J..", detail: "333714 | AP4C4430ST", icon: "fa-solid fa-cloud-arrow-up", color: "red", size: "25px" },
        { id: "3736934", status: "INS", time: "2024-06-27 11:26:44", name: "BUREAU VERITAS CON..", detail: "839609 | A4830CPS", icon: "fa-solid fa-cloud-arrow-up", color: "red", size: "25px" },
        { id: "3737762", status: "DIS", time: "2024-07-01 04:02:49", name: "BANK MANDIRI (PERS..", detail: "654239 | MA95CP", icon: "fa-solid fa-cloud-arrow-up", color: "blue", size: "25px" },
        { id: "3738213", status: "INS", time: "2024-07-01 14:41:38", name: "SUTJONO ARIFIN", detail: "645676 | DCV3065ST", icon: "fa-solid fa-cloud-arrow-up", color: "blue", size: "25px" },
      ],
      close: [
        { id: "3737754", status: "DIS", time: "2024-07-01 04:02:49", name: "BUREAU VERITAS CON...", detail: "810071 | AP5570CPS", icon: "fa-solid fa-cloud-arrow-up", color: "blue", size: "25px" },
        { id: "3737977", status: "UMC", time: "2024-07-01 10:03:03", name: "LARAS EXATA USTANT...", detail: "741927 | DC5C2263CPS", icon: "fa-solid fa-cloud-arrow-up", color: "blue", size: "25px" },
        { id: "3738098", status: "UMC", time: "2024-07-01 13:00:00", name: "IEWAY", detail: "265356 | DW6035EP", icon: "fa-solid fa-cloud-arrow-up", color: "blue", size: "25px" },
      ],
    },
    GAW: {
      open: [],
      close: [
        { id: "3738420", status: "UMC", time: "2024-07-02 09:34:58", name: "ASTRA INTERNATIONA...", detail: "729616 | DCV2060CP", icon: "fa-solid fa-right-from-bracket", color: "blue", size: "25px" },
        { id: "3738693", status: "UMC", time: "2024-07-02 13:15:20", name: "ANGKASA PURA SUPOR...", detail: "539339 | DC5C3373ST", icon: "fa-solid fa-right-from-bracket", color: "blue", size: "25px" },
        { id: "3737795", status: "UMC", time: "2024-07-01 09:38:00", name: "KANTOR NOTARIS TJH...", detail: "714357 | DP3105", icon: "fa-solid fa-right-from-bracket", color: "blue", size: "25px" },
      ],
    },
    GDA: {
      open: [
        { id: "3737850", status: "UMC", time: "2024-07-01 08:40:05", name: "AGUNG MULIA COPY C..", detail: "654033 | DC6C3370CPS", icon: "fas fa-pause", color: "blue", size: "25px" },
        { id: "3738094", status: "UMC", time: "2024-07-02 08:25:32", name: "BANK MANDIRI (PERS..", detail: "539379 | AP5C2275ST", icon: "fas fa-check-circle", color: "blue", size: "25px" },
        { id: "3738213", status: "INS", time: "2024-07-01 14:41:38", name: "SUTJIONO ARIFIN", detail: "645676 | DCV3065ST", icon: "fas fa-check-circle", color: "blue", size: "25px" },
        { id: "3738412", status: "UMC", time: "2024-07-02 08:52:55", name: "BINA SAN PRIMA", detail: "608120 | DCV2060CP", icon: "fas fa-download", color: "blue", size: "25px" },
      ],
      close: [],
    },
    GDB: {
      open: [
        { id: "3738033", status: "UMC", time: "2024-07-01 11:17:00", name: "JANUARDI PUTERA LO..", detail: "652675 | AP4020ST", icon: "fas fa-check-circle", color: "blue", size: "25px" },
      ],
      close: [],
    },
  };

  function populateModal(modalBody, details) {
    if (details.length === 0) {
      modalBody.innerHTML = `
        <tr>
          <td colspan="3" style="text-align: center;">No Data Found</td>
        </tr>
      `;
    } else {
      modalBody.innerHTML = details
        .map(
          (order) => `
        <tr>
          <td><b>${order.id} - ${order.status}</b><br>${order.time}</td>
          <td><b>${order.name}</b><br>${order.detail}</td>
          <td style="text-align: center;">
            <a href="#" class="dispatch-button" data-id="${order.id}">
              <i class="${order.icon}" style="color: ${order.color}; font-size: ${order.size};"></i>
            </a>
          </td>
        </tr>
      `
        )
        .join("");
    }
  }

  function populateDispatchHistory(details) {
    const dispatchHistoryTableBody = document.getElementById("dispatchHistoryTableBody");
    if (details.length === 0) {
      dispatchHistoryTableBody.innerHTML = `
        <tr>
          <td colspan="5" style="text-align: center;">No Data Found</td>
        </tr>
      `;
    } else {
      dispatchHistoryTableBody.innerHTML = details
        .map((history, index) => {
          const isLastItem = index === details.length - 1; 
          return `
            <tr>
              ${isLastItem ? '<td><a href="#" class="open-dispatch-modal" "${history.id}" "${history.detail}" "${history.service}"><i class="fas fa-sign-in-alt" style="font-size: 20px;"></i></a></td>' : '<td></td>'}
              <td class="collapse-row" style="width:250px;"><a href="#" class="toggle-nested" style="font-size: 13px;">${history.name}</a></td>
              <td class="inline-container">
                <span style="font-weight: bold; font-size: 13px;">Notif Time </span>
                <span style="font-size: 13px;">${history.notifTime}</span>
              </td>
              <td class="inline-container">
                <span style="font-weight: bold; font-size: 13px;">Page Time </span>
                <span style="font-size: 13px;">${history.pageTime}</span>
              </td>
            </tr>
            <tr class="nested-table" style="display: none;">
              <td colspan="5">
                <table class="table table-bordered">
                  ${
                    history.nestedTable.length > 0
                      ? history.nestedTable
                        .map((nested) => `
                          <tr class="${nested.highlight}">
                            <td class="inline-container">
                              <span style="font-weight: bold;">
                                <a href="#" class="finish-label" style="color: black;" data-sv-order-id="${nested.svOrderId}">${nested.label} :   </a>
                              </span>
                              <span>${nested.time}</span>
                            </td>
                            <td>${nested.extraInfo || ""}</td>
                            <td>
                              <a href="#" class="map-icon">
                                <i class="fas fa-map-marker-alt" style="color: black; font-size: 20px;"></i>
                              </a>
                            </td>
                          </tr>
                        `)
                        .join("")
                    : `
                      <tr>
                        <td colspan="3" style="text-align: center;">No Data Found</td>
                      </tr>
                    `
                  }
                </table>
              </td>
            </tr>
          `;
        })
      .join("");
    }
  }

  function updateDispatchHistoryTitle(id) {
    const dispatchHistoryTitle = document.getElementById("dispatchHistoryTitle");
    dispatchHistoryTitle.innerText = `Dispatch History - ${id}`;
  }

  // Function to add event listeners to the icons inside modals
  function addModalIconListeners() {
    document.querySelectorAll(".dispatch-button").forEach(function (button) {
      button.addEventListener("click", function (event) {
        event.preventDefault();
        const id = this.getAttribute("data-id");
        updateDispatchHistoryTitle(id);
      });
    });
  }

  const dispatchHistoryLink = document.getElementById("dispatchHistoryTitle");

  // Event listener for left-click on the Dispatch History hyperlink
  dispatchHistoryLink.addEventListener("click", function (event) {
      event.preventDefault();
      showColorModal();
  });

  // Event listener for right-click on the Dispatch History hyperlink
  dispatchHistoryLink.addEventListener("contextmenu", function (event) {
      event.preventDefault();
      showBWModal();
  });

  document.querySelectorAll(".open-modal").forEach(function (element) {
    element.addEventListener("click", function (event) {
      event.preventDefault();
      const openId = this.getAttribute("data-open-id");
      const details = serviceOrders[openId] ? serviceOrders[openId].open : [];
      const modalBody = document.getElementById("openModalTableBody");
      populateModal(modalBody, details);
      addModalIconListeners();  
      $("#openModal").modal("show");
    });
  });

  document.querySelectorAll(".close-modal").forEach(function (element) {
    element.addEventListener("click", function (event) {
      event.preventDefault();
      const closeId = this.getAttribute("data-close-id");
      const details = serviceOrders[closeId] ? serviceOrders[closeId].close : [];
      const modalBody = document.getElementById("closeModalTableBody");
      populateModal(modalBody, details);
      addModalIconListeners();  
      $("#closeModal").modal("show");
    });
  });

  document.querySelectorAll(".lol-modal").forEach(function (element) {
    element.addEventListener("click", function (event) {
      event.preventDefault();
      const lolId = this.getAttribute("data-lol-id");
      const lolCount = parseInt(this.textContent);
      const details = serviceOrders[lolId] ? serviceOrders[lolId].open : [];
      const modalBody = document.getElementById("lolModalTableBody");

  
      const redDetails = details.filter(order => order.color === "red");

      if (lolCount === 0 || redDetails.length === 0) {
        modalBody.innerHTML = `
          <tr>
            <td colspan="3" style="text-align: center;">No Data Found</td>
          </tr>
        `;
      } else {
        populateModal(modalBody, redDetails);
      }

      $("#lolModal").modal("show");
    });
  });

  document.addEventListener("click", function (event) {
    if (event.target.closest(".dispatch-button")) {
      const id = event.target.closest(".dispatch-button").getAttribute("data-id");
      const details = getDispatchHistoryById(id);
      populateDispatchHistory(details);
      $("#openModal").modal("hide");
      $("#closeModal").modal("hide");
    }

    if (event.target.closest(".toggle-nested")) {
      event.preventDefault();
      const nestedRow = event.target.closest("tr").nextElementSibling;
      if (nestedRow.classList.contains("nested-table")) {
        $(nestedRow).toggle();
      }
    }

    if (event.target.closest(".dispatch-info")) {
      event.preventDefault();
      const svo = event.target.closest(".dispatch-info").getAttribute("data-id");
      const mat = event.target.closest(".dispatch-info").getAttribute("data-status");
      const crtime = event.target.closest(".dispatch-info").getAttribute("data-time");
      $("#dispatchDetailsModal").modal("show");
    }

    if (event.target.closest(".open-dispatch-modal")) {
      event.preventDefault();
      const id = event.target.closest(".open-dispatch-modal").getAttribute("id");
      const detail = event.target.closest(".open-dispatch-modal").getAttribute("detail");
      const service = event.target.closest(".open-dispatch-modal").getAttribute("service");
      const modalTitle = document.getElementById("dispatchModalTitle");
      modalTitle.innerText = `Dispatch - ${id} - ${detail} - ${service}`;
      $("#dispatchModal").modal("show");
    }
  });

  document.addEventListener("click", function (event) {
    if (event.target.closest(".finish-label")) {
      event.preventDefault();
      const svOrderId = event.target.getAttribute("data-sv-order-id");

      const imageUrl = getImageUrlBySvOrderId(svOrderId);

    
      const modalImage = document.getElementById("modalImage");
      modalImage.src = imageUrl;

      // Show the modal
      $("#imageModal").modal("show");
    } 
  });

  document.addEventListener("click", function (event) {
    const icon = event.target.closest(".fa-image");
    if (icon) {
      event.preventDefault();
      const imageUrl = getImageUrlByIcon(icon);
      const modalImage = document.getElementById("newModalImage");
      modalImage.src = imageUrl;
      $("#newImageModal").modal("show");
    }
  });

  function showColorModal() {
    document.getElementById("eqModalLabelCol").textContent = "EQ Scan (Color)";
    document.getElementById("eqTableCol").innerHTML = `
      <thead class="thead-dark">
        <tr>
          <th>EQ No</th>
          <th style="text-align: center;">T1</th>
          <th style="text-align: center;">T2</th>
          <th style="text-align: center;">T3</th>
          <th style="text-align: center;">T4</th>
          <th style="text-align: center;">D1</th>
          <th style="text-align: center;">D2</th>
          <th style="text-align: center;">D3</th>
          <th style="text-align: center;">D4</th>
        </tr>
      </thead>
      <tbody>
        <tr class="table-secondary">
          <td><b>12313218</b></td>
          <td style="text-align: center;"><i class="fa-solid fa-square-check" style="color: #18B815; font-size: 25px;"></i></td>
          <td style="text-align: center;"><i class="fa-solid fa-square-check" style="color: #18B815; font-size: 25px;"></i></td>
          <td style="text-align: center;"><i class="fa-solid fa-square-check" style="color: #18B815; font-size: 25px;"></i></td>
          <td style="text-align: center;"><i class="fa-solid fa-image" style="font-size: 25px; color: #1954ED"></i></td>
          <td style="text-align: center;"><i class="fa-solid fa-image" style="font-size: 25px; color: #1954ED"></i></td>
          <td style="text-align: center;"><i class="fa-solid fa-square-check" style="color: #18B815; font-size: 25px;"></i></td>
          <td style="text-align: center;"><i class="fa-solid fa-square-check" style="color: #18B815; font-size: 25px;"></i></td>
          <td style="text-align: center;"><i class="fa-solid fa-square-check" style="color: #18B815; font-size: 25px;"></i></td>
        </tr>
      </tbody>
    `;
    $("#eqModalCol").modal("show");
  }

  // Function to create and show the BW Modal
  function showBWModal() {
      document.getElementById("eqModalLabelBW").textContent = "EQ Scan (BW)";
      document.getElementById("eqTableBW").innerHTML = `
        <thead class="thead-dark">
          <tr>
            <th>EQ No</th>
            <th style="text-align: center;">T1</th>
            <th style="text-align: center;">D1</th>
          </tr>
        </thead>
        <tbody>
          <tr class="table-secondary">
            <td><b>12313218</b></td>
            <td style="text-align: center;"><i class="fa-solid fa-square-check" style="color: #18B815; font-size: 25px;"></i></td>
            <td style="text-align: center;"><i class="fa-solid fa-square-check" style="color: #18B815; font-size: 25px;"></i></td>
          </tr>
        </tbody>
      `;
      $("#eqModalBW").modal("show");
  }

  
  function getImageUrlByIcon(icon) {
    return "assets/img/jds/contoh2.jpg";
  }

  function getImageUrlBySvOrderId(svOrderId) {
    return "assets/img/jds/contoh.jpg";
  }
  

  function getDispatchHistoryById(id) {
    if (id === "3737762") {
      return [
        {
          name: "G1 - IMMANUEL NUGROHO DH",
          notifTime: "02-07-2024 | 09:55:58",
          pageTime: "02-07-2024 | 09:44:04",
          nestedTable: [],
        },
      ];
    } else if (id === "3738420") {
      return [
        {
          name: "GAW - SANDY PINDHO WIJAYA",
          notifTime: "02-07-2024 | 09:55:58",
          pageTime: "02-07-2024 | 09:36:55",
          nestedTable: [
            { label: "Receive", time: "02-07-2024 | 09:37:18", highlight: "highlight-row-grey", dataRow: "GAW" },
            { label: "Accept", time: "02-07-2024 | 09:55:58", highlight: "highlight-row-purple", extraInfo: "ETA: 60", dataRow: "GAW" },
            { label: "Arrive", time: "02-07-2024 | 10:24:47", highlight: "highlight-row-blue", extraInfo: "Travel: 8", dataRow: "GAW" },
            { label: "Finish", time: "02-07-2024 | 10:58:04", highlight: "highlight-row-green2", extraInfo: "Solving: Replace switch sensor", dataRow: "GAW" },
          ],
        },
        {
          name: "G1 - IMMANUEL NUGROHO DH",
          notifTime: "02-07-2024 | 09:55:58",
          pageTime: "02-07-2024 | 09:44:04",
          nestedTable: [],
        },
        {
          name: "GAW - SANDY PINDHO WIJAYA",
          notifTime: "02-07-2024 | 09:55:58",
          pageTime: "02-07-2024 | 09:52:42",
          nestedTable: [
            { label: "Receive", time: "02-07-2024 | 09:37:18", highlight: "highlight-row-grey", dataRow: "GAW" },
            { label: "Accept", time: "02-07-2024 | 09:55:58", highlight: "highlight-row-purple", extraInfo: "ETA: 60", dataRow: "GAW" },
            { label: "Arrive", time: "02-07-2024 | 10:24:47", highlight: "highlight-row-blue", extraInfo: "Travel: 8", dataRow: "GAW" },
            { label: "Finish", time: "02-07-2024 | 10:58:04", highlight: "highlight-row-green2", extraInfo: "Solving: Replace switch sensor", dataRow: "GAW" },
          ],
        },
      ];
    } else if (id === "3737850") {
      return [
        {
          name: "GDA - IRWAN FAUZI SAPUTRA",
          notifTime: "01-07-2024 | 08:40:05",
          pageTime: "01-07-2024 | 08:40:29",
          nestedTable: [
            { label: "Receive", time: "01-07-2024 | 08:55:24", highlight: "highlight-row-grey", dataRow: "GDA" },
            { label: "Accept", time: "01-07-2024 | 08:55:28", highlight: "highlight-row-purple", extraInfo: "ETA: 120", dataRow: "GDA" },
            { label: "Arrive", time: "01-07-2024 | 09:20:24", highlight: "highlight-row-blue", extraInfo: "Travel: 15", dataRow: "GDA" },
            { label: "Continue", time: "01-07-2024 | 09:44:20", highlight: "highlight-row-orange", extraInfo: "Reason: Kanibal part", dataRow: "GDA" },
          ],
        },
        {
          name: "GDA - IRWAN FAUZI SAPUTRA",
          notifTime: "01-07-2024 | 08:40:05",
          pageTime: "01-07-2024 | 08:40:29",
          nestedTable: [
            { label: "Receive", time: "01-07-2024 | 08:55:24", highlight: "highlight-row-grey", dataRow: "GDA" },
            { label: "Accept", time: "01-07-2024 | 08:55:28", highlight: "highlight-row-purple", extraInfo: "ETA: 120", dataRow: "GDA" },
            { label: "Arrive", time: "01-07-2024 | 09:20:24", highlight: "highlight-row-blue", extraInfo: "Travel: 15", dataRow: "GDA" },
            { label: "Continue", time: "01-07-2024 | 09:44:20", highlight: "highlight-row-orange", extraInfo: "Reason: Kanibal part", dataRow: "GDA" },
          ],
        },
        {
          name: "G1 - IMMANUEL NUGROHO DH",
          notifTime: "01-07-2024 | 08:40:05",
          pageTime: "01-07-2024 | 08:48:21",
          nestedTable: [],
        },
        {
          name: "GDA - IRWAN FAUZI SAPUTRA",
          notifTime: "01-07-2024 | 08:40:05",
          pageTime: "01-07-2024 | 08:49:37",
          nestedTable: [
            { label: "Receive", time: "01-07-2024 | 08:55:24", highlight: "highlight-row-grey", dataRow: "GDA" },
            { label: "Accept", time: "01-07-2024 | 08:55:28", highlight: "highlight-row-purple", extraInfo: "ETA: 120", dataRow: "GDA" },
            { label: "Arrive", time: "01-07-2024 | 09:20:24", highlight: "highlight-row-blue", extraInfo: "Travel: 15", dataRow: "GDA" },
            { label: "Continue", time: "01-07-2024 | 09:44:20", highlight: "highlight-row-orange", extraInfo: "Reason: Kanibal part", dataRow: "GDA" },
          ],
        },
      ];
    } else {
      return [];
    }
  }
});
