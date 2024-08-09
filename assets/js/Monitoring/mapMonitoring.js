let map;

function initMap() {
$(document).ready(function() {
    // Fungsi untuk menginisialisasi peta dengan Google Maps
    function initializeMap() {
    var mapOptions = {
        center: { lat: -6.18461, lng: 106.84401 },
        zoom: 19
    };
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    return map;
    }

    // Menampilkan modal saat ikon peta diklik
    document.addEventListener('click', function(event) {
    if (event.target.closest('.map-icon')) {
        event.preventDefault();
        $('#locationModal').modal('show');

        $('#locationModal').on('shown.bs.modal', function() {
        if (!map) {
            initializeMap();
            console.log('Map initialized');
        } else {
            google.maps.event.trigger(map, 'resize');
            map.setCenter({ lat: -6.18461, lng: 106.84401 });
            console.log('Map already initialized');
        }
        });
    }
    });
});
}