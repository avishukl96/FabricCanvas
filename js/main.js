// create a wrapper around native canvas element (with id="c")
var canvas = new fabric.Canvas('c');

		var state;
         // past states
        var undo = [];
         // reverted states
        var redo = [];

document.querySelectorAll(".library img").forEach(el=>{
	
	el.addEventListener('click',()=>{
		//console.log(el);
		fabric.Image.fromURL(el.src, (img) => {
			img.scale(0.4);
			img.set({left:200,top:200});
		canvas.add(img);
}); 
	}); 
 
}); 

document.querySelectorAll(".shape button").forEach(btn=>{
	btn.addEventListener('click',()=>{
		switch(btn.id){
			case 'circle':
				var circle = new fabric.Circle({
					  radius: 30, fill: 'green', left: 100, top: 100
					});
					canvas.add(circle);
			break;
			case 'triangle':
				var triangle = new fabric.Triangle({
					  width: 40, height: 50, fill: 'green', left: 50, top: 50
					});
					canvas.add(triangle);
			break;
			case 'ellipse':
				var ellipse = new fabric.Ellipse({ 
						rx: 80, 
						ry: 40, 
						fill: '', 
						stroke: 'green', 
						strokeWidth: 3 
					}); 
					
				canvas.add(ellipse);
			break;
			case 'rectangle':
			
				var rect = new fabric.Rect({
				  left: 100,top: 100,fill: 'green',width: 40,height: 40
				});

				canvas.add(rect);
			
			break;
			case 'line':
										//x1, y1 , x2, y2
				var line = new fabric.Line([100, 50, 200, 50], { 
						stroke: 'green' 
					}); 
			   
			   canvas.add(line); 
			
			break;
			
			case 'polygon':
				var polygon = new fabric.Polygon([ 
					{ x: 200, y: 10 }, 
					{ x: 250, y: 50 }, 
					{ x: 250, y: 180}, 
					{ x: 150, y: 180}, 
					{ x: 150, y: 50 }], { 
						fill: 'green' 
					}); 
  
				canvas.add(polygon); 
			
			break;
			
			case 'polyline':
				var polyline = new fabric.Polyline(
					[
					{ x: 200, y: 10 },
					{ x: 250, y: 50 },
					{ x: 250, y: 180},
					{ x: 150, y: 180},
					{ x: 150,y: 50 },
					{ x: 200,y: 10 }
					],
					{ fill: 'white', stroke: 'green'}); 
				
				canvas.add(polyline); 
			
			break;
			case 'texts':
			 var texts = new fabric.IText('Add New Text', { 
				  fontFamily: 'arial', //arial black
				  left: 100, 
				  top: 100 ,
				})
			canvas.add(texts); 
			
			
			 
			
			
			
			break;
			
			
		}
		
		 
	  
	}); 
 
}); 

window.addEventListener("keydown",e =>{
	if(e.key === "Delete" || e.key === "Backspace"){
		canvas.remove(canvas.getActiveObject());
	}
})

/******************      Undo & Redo started here *************************/


    $(function() {
           
          // save initial state
			save();
          // register event listener for user's actions
          canvas.on('object:modified', function() {
            save();
          });
       
          // undo and redo buttons Clicks
          $('#undo').click(function() {
            replay(undo, redo, '#redo', this);
          });
          $('#redo').click(function() {
            replay(redo, undo, '#undo', this);
          })
        });

	 /*** Push the current state into the undo stack and then capture the current state*/
	 
	 
        function save() {
          // clear the redo stack
          redo = [];
          $('#redo').prop('disabled', true);
          // initial call won't have a state
          if (state) {
            undo.push(state);
            $('#undo').prop('disabled', false);
          }
          state = JSON.stringify(canvas);
        }

        /**
         * Save the current state in the redo stack, reset to a state in the undo stack, and enable the buttons accordingly.
         * Or, do the opposite (redo vs. undo)
         * @param playStack which stack to get the last state from and to then render the canvas as
         * @param saveStack which stack to push current state into
         * @param buttonsOn jQuery selector. Enable these buttons.
         * @param buttonsOff jQuery selector. Disable these buttons.
         */
        function replay(playStack, saveStack, buttonsOn, buttonsOff) {
          saveStack.push(state);
          state = playStack.pop();
          var on = $(buttonsOn);
          var off = $(buttonsOff);
          // turn both buttons off for the moment to prevent rapid clicking
          on.prop('disabled', true);
          off.prop('disabled', true);
          canvas.clear();
          canvas.loadFromJSON(state, function() {
            canvas.renderAll();
            // now turn the buttons back on if applicable
            on.prop('disabled', false);
            if (playStack.length) {
              off.prop('disabled', false);
            }
          });
        }

