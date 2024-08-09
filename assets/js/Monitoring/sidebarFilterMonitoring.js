$(document).ready(function() {
    $('.select2').select2();

    var table = $('#basic-datatables').DataTable({
        "paging": true,
        "lengthChange": true,
        "searching": true,
        "ordering": true,
        "info": true,
        "autoWidth": false,
        pageLength: 15,
    });

    $('#planGroupSelect').on('change', function() {
        var selectedValues = $(this).val();
        if (selectedValues) {
        // Build regex pattern from selected values
        var regexPattern = selectedValues.map(value => '^' + value[0]).join('|');
        table.column(0).search(regexPattern, true, false).draw();
        } else {
        table.column(0).search('').draw();
        }
    });
    // Function to filter table based on MAT selection
    function filterByMat() {
        var selectedMats = $('#maintenanceAktivities').val();
        if (selectedMats && selectedMats.length > 0) {
        // Create regex pattern to match any selected MAT
        var regexPattern = selectedMats.map(mat => `(?=.*${mat})`).join('');
        table
            .columns(4) // Assuming the MAT is in the fifth column (index 4)
            .search(regexPattern, true, false)
            .draw();
        } else {
        // Clear search filter
        table.columns(4).search('').draw();
        }
    }

    // Event listener for MAT selection
    $('#maintenanceAktivities').on('change', function () {
        filterByMat();
        table.page('first').draw('page'); // Go to the first page after filtering
    });

    // Initial filtering to ensure correct display on page load
    filterByMat();
});