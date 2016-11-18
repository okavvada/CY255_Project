
// Feature selection
function initFeatureSelection () {
    var popup = document.getElementById('popup'); // click-popup

    // feature edit popup
    map.getContainer().addEventListener('mousemove', function (event) {
        picking = true;
        latlng = map.mouseEventToLatLng(event);

        var pixel = { x: event.clientX, y: event.clientY };

        scene.getFeatureAt(pixel).then(function(selection) {
            if (!selection || selection.feature == null || selection.feature.properties == null) {
                picking = false;
                popup.style.visibility = 'hidden';
                return;
            }                
            var properties = selection.feature.properties;
            
            // generate osm edit link
            var url = 'https://www.openstreetmap.org/edit?';
            var position = '19' + '/' + latlng.lat + '/' + latlng.lng;

            if (properties.id) {
                url += 'way=' + properties.id + '#map=' + position;
            }

            var josmUrl = 'http://www.openstreetmap.org/edit?editor=remote#map='+position;

            popup.style.left = (pixel.x + 0) + 'px';
            popup.style.top = (pixel.y + 0) + 'px';
            
            if (properties.name == undefined) {
                popup.style.visibility = 'visible';
                popup.innerHTML = '<span class="labelInner">' + 'You found an unnamed street!' + '</span><br>';
                popup.appendChild(createEditLinkElement(url, 'iD', 'Edit with iD ➹'));
                popup.appendChild(createEditLinkElement(josmUrl, 'JOSM', 'Edit with JOSM ➹'));
            }
        });
    });

    map.getContainer().addEventListener('mousedown', function (event) {
        popup.style.visibility = 'hidden';
    });
}