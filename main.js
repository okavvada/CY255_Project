map = (function () {

	var picking = false;

	    // Feature selection
    function initFeatureSelection () {
        // Selection info shown on hover
        var selection_info = document.createElement('div');
        selection_info.setAttribute('class', 'label');
        selection_info.style.display = 'block';
        selection_info.style.zindex = 1000;

        // Show selected feature on hover
        map.getContainer().addEventListener('mousemove', function (event) {
            if (picking) return;
            var pixel = { x: event.clientX, y: event.clientY };

            scene.getFeatureAt(pixel).then(function(selection) {    
                if (!selection) {
                    return;
                }
                var feature = selection.feature;
                if (feature != null) {

                    var label = '';
                    if (feature.properties != null) {
                        var sorted = [];
                        var count = 0;
                        Object.keys(feature.properties)
                            .sort()
                            .forEach(function(v, i) {
                                sorted.push([v, feature.properties[v]]);
                                count++;
                            });
                        label = "";
                        label += "layer : "+feature.layers+"<br>";

                        for (x in sorted) {
                            key = sorted[x][0]
                            val = sorted[x][1];
                            label += "<span class='labelLine' key='"+key+"' value='"+val+"' onclick='setValuesFromSpan(this)'>"+key+" : "+val+"</span><br>";
                        }
                    }

                    if (label != '') {
                        selection_info.style.left = (pixel.x + 5) + 'px';
                        selection_info.style.top = (pixel.y + 15) + 'px';
                        selection_info.innerHTML = '<span class="labelInner">' + label + '</span>';
                        map.getContainer().appendChild(selection_info);
                    }
                    else if (selection_info.parentNode != null) {
                        selection_info.parentNode.removeChild(selection_info);
                    }
                }
                else if (selection_info.parentNode != null) {
                    selection_info.parentNode.removeChild(selection_info);
                }
            });

            // Don't show labels while panning
            if (scene.panning == true) {
                if (selection_info.parentNode != null) {
                    selection_info.parentNode.removeChild(selection_info);
                }
            }
        });

        // toggle popup picking state
        map.getContainer().addEventListener('click', function (event) {
            picking = !picking;
        });
        // toggle popup picking state
        map.getContainer().addEventListener('drag', function (event) {
            picking = false;
        });
    }

        return map;

}());