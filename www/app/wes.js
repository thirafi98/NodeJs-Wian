var data = null;
var graph = null;

      // Called when the Visualization API is loaded.
      function drawVisualization() {
        // Create and populate a data table.
        data = new vis.DataSet();

        // create some nice looking data with sin/cos
        var steps = 50;
        var axisMax = 31;
        var tmax = 12 * 1 * 2;
        var axisStep = axisMax / steps;
        for (var t = 0; t < tmax; t += tmax / steps) {
          var r = 1;
          var x = r * Math.sin(t);
          var y = r * Math.cos(t);
          var z = t / tmax;
          data.add({x:x,y:y,z:z});
        }

        // specify options
        var options = {
          width:  '600px',
          height: '600px',
          style: 'line',
          showPerspective: false,
          showGrid: true,
          keepAspectRatio: true,
          verticalRatio: 1.0
        //   width:  '600px',
        //   height: '600px',
        //   style: 'surface',
        //   showPerspective: true,
        //   showGrid: true,
        //   showShadow: false,
        // // showAnimationControls: false,
        // keepAspectRatio: true,
        // verticalRatio: 0.5,
        // animationInterval: 100, // milliseconds
        // animationPreload: true

        };

        // create our graph
        var container = document.getElementById('mygraph');
        graph = new vis.Graph3d(container, data, options);

        graph.setCameraPosition(0.4, undefined, undefined);
      }