document.addEventListener('DOMContentLoaded', function() {
    function handleFileSelect(evt) {
        var file = evt.target.files; // FileList object
        // Loop through the FileList and render image files as thumbnails.
        for (var i = 0, f; f = file[i]; i++) {
            // Only process image files.
            if (!f.type.match('image.*')) {
                alert("Image only please....");
            }
            var reader = new FileReader();
            // Closure to capture the file information.
            reader.onload = (function(theFile) {
                return function(e) {
                    // Render thumbnail.
                    var span = document.createElement('span');
                    span.className = "img";
                    // span.innerHTML = '<p class="del"></p>';
                    span.innerHTML = ['<img class="thumb" title="', escape(theFile.name), '" src="', e.target.result, '" />', '<p class="del"></p>'].join('');
                    document.getElementById('outputMulti').insertBefore(span, null);
                };
            })(f);
            // Read in the image file as a data URL.
            reader.readAsDataURL(f);
        }
    }
    document.getElementById('fileMulti').addEventListener('change', handleFileSelect, false);
});

$(function() {
    $(document).on("click", ".del", function() {
        $(this).parent('span').hide();
    })
})


