//Side bar
$(document).ready(function(){ 
	$.get("sidebar.html", function(response) {
		$("#sidebar").html(response);
	});
});

/*
//Date Picker
$(document).ready(function() {
    $('#datePicker')
		.datepicker({
            format: 'mm/dd/yyyy'
        })
        .on('changeDate', function(e) {
            // Revalidate the date field
            $('#eventForm').formValidation('revalidateField', 'date');
        });

    
});*/