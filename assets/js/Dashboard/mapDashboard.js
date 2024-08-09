let map;

function initMap() {
  $(document).ready(function () {
    // Fungsi untuk menginisialisasi peta dengan Google Maps
    function initializeMap() {
      var mapOptions = {
        center: { lat: -6.18461, lng: 106.84401 },
        zoom: 19,
      };
      map = new google.maps.Map(document.getElementById("map"), mapOptions);
      return map;
    }

    // Menampilkan modal saat ikon peta diklik
    $("td a").on("click", function (event) {
      event.preventDefault();
      $("#locationModal").modal("show");

      // Inisialisasi peta setelah modal ditampilkan
      $("#locationModal").on("shown.bs.modal", function () {
        if (!map) {
          initializeMap();
        } else {
          google.maps.event.trigger(map, "resize");
          map.setCenter({ lat: -6.18461, lng: 106.84401 });
        }
      });
    });
  });

  document.addEventListener("DOMContentLoaded", function () {
    var mapIcons = document.querySelectorAll(".map-icon");

    mapIcons.forEach(function (icon) {
      icon.addEventListener("click", function (event) {
        event.preventDefault();
        var rowId = this.getAttribute("data-row");
        var rowData = getRowData(rowId);
        document.getElementById("modalLocationText").innerText = "Location for " + rowData.location + ": " + rowData.name;
        document.getElementById("lastUpdateText").innerText = "Last Update Loc: " + rowData.lastUpdate;
        $("#locationModal").modal("show");
      });
    });

    function getRowData(rowId) {
      // Replace this with actual data retrieval logic, e.g., AJAX call or table row parsing
      var data = {
        A1: { name: "Lukman Prasetyo", location: "A1", lastUpdate: "Jul 9 2024 1:29 PM" },
        AAA: { name: "Muhammad Zen", location: "AAA", lastUpdate: "Jul 9 2024 8:06 AM" },
        AAB: { name: "Hein Lantang", location: "AAB", lastUpdate: "Jul 5 2024 9:31 PM" },
        AAD: { name: "M. Irsyad Kamil", location: "AAD", lastUpdate: "Jul 9 2024 1:31 AM" },
        AAG: { name: "Muhammad Ichsan", location: "AAG", lastUpdate: "Jul 8 2024 13:56 PM" },
        AAH: { name: "Panca Anta Maulana", location: "AAH", lastUpdate: "-" },
        AAI: { name: "Apri Saputra", location: "AAI", lastUpdate: " Jul 9 2024 9:41 AM" },
        AAJ: { name: "Vicko Haditya Nugraha", location: "AAJ", lastUpdate: "Jul 9 2024 8:23 AM" },
        B1: { name: "Leonardus Bronson Simbolon", location: "B1", lastUpdate: "Jul 9 2024 3:45 PM" },
        BAA: { name: "Adi Nugraha", location: "BAA", lastUpdate: "Jul 8 2024 10:20AM" },
        BAC: { name: "Fery Aldi", location: "BAC", lastUpdate: "-" },
        BAE: { name: "Nofri Haryandi", location: "BAE", lastUpdate: "Jul 7 2024 11:00 AM" },
        G1: { name: "Immanuel Nugroho DH", location: "G1", lastUpdate: "Jul 8 2024 3:43 PM" },
        GAW: { name: "Sandy Pindho Wijaya", location: "GAW", lastUpdate: "Jul 4 2024 4:00 PM" },
        GAX: { name: "Dadan Darmawan", location: "GAX", lastUpdate: "Jul 8 2024 10:48AM" },
        GCA: { name: "Sri Sugiharso", location: "GCA", lastUpdate: "Jul 8 2024 10:48AM" },
        GCB: { name: "Dimas Setiawan", location: "GCB", lastUpdate: "Jul 8 2024 10:34AM" },
        GCC: { name: "Jefferson Putra Iskandar", location: "GCC", lastUpdate: "-" },
        GCD: { name: "Afrila Adrian", location: "GCD", lastUpdate: " Jul 8 2024 10:41AM" },
        GDA: { name: "Irwan Fuzi Saputra", location: "GDA", lastUpdate: "Jul 8 2024 8:23 AM" },
        GDB: { name: "Fajar Aminudin", location: "-" },
        GEB: { name: "Durotun Nashikin", location: "-" },
        GEC: { name: "Sutrisno", location: "-" },
        GED: { name: "Muhammad Rizki Romadhon", location: "-" },
        GVB: { name: "Yohanes Martin", location: "-" },
        GVE: { name: "Ony Fitriyanto", location: "-" },
        GVG: { name: "Achmad Mulyawan", location: "GVG", lastUpdate: "Jul 6 2024 11:20AM" },
        GVH: { name: "Dahya", location: "GVH" },
      };
      return data[rowId];
    }
  });
}
