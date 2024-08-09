$(document).ready(function () {
    var table = $("#multi-filter-select").DataTable({
      pageLength: 5,
      initComplete: function () {
        this.api()
          .columns()
          .every(function () {
            var column = this;
            var input = $(
              '<input type="text" placeholder="Filter..." class="form-control" style="margin-right: 60px;"/>'
            )
              .appendTo($(column.footer()).empty())
              .on("keyup change clear", function () {
                var val = $.fn.dataTable.util.escapeRegex($(this).val());
                column.search(val ? "^" + val : "", true, false).draw();
              });
          });
      },
    });

    $("#id-filter").on("change", function () {
      var val = $.fn.dataTable.util.escapeRegex($(this).val());
      if (val) {
        table.column(0).search("^" + val, true, false).draw();
      } else {
        table.column(0).search("").draw();
      }
    });
});