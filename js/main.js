// create a wrapper around native canvas element (with id="c")
var canvas = new fabric.Canvas('c');
	var state;
	 // past states
	var undo = [];
	 // reverted states
	var redo = [];



/****Add Image from library Div*******/

/******
When I run function toDataURL on the canvas, I get a js error during Download

Uncaught DOMException: Failed to execute 'toDataURL' on 'HTMLCanvasElement': Tainted canvases may not be exported.
******/

/****Add Image from library *******/

//third try to add image from librabry 
document.querySelectorAll(".library img").forEach(el=>{
	el.addEventListener('click',()=>{
		fabric.Image.fromURL(el.src, (img) => {
			selectable: 1
			img.scale(0.4);
			img.set({left:200,
			top:200,
			width: 250,
			height: 200,
			angle: 0});
		canvas.add(img);
		save();
		}); 
		
		
		
		
	}); 
}); 

//second try to add image from librabry 
/*document.querySelectorAll(".library img").forEach(el=>{
	el.addEventListener('click',()=>{
		fabric.Image.fromURL(el.src, (img) => {
			img.scale(0.4);
			img.set({left:200,
			top:200,
			width: 250,
			height: 200,
			angle: 0});
		canvas.add(img);
		save();
		}); 
	}); 
}); */

/*
first try to add image from librabry 
document.querySelectorAll(".library img").forEach(el=>{
	el.addEventListener('click',()=>{
	var imgInstance = new fabric.Image(el, {
		  left: 100,
		  top: 100,
		  angle: 0,
		   opacity: 0.75, 
		  width:300,
		  height:300
		});
		canvas.add(imgInstance); 

	
	}); 
}); 
*/


/****Add Image *******/
/* first try to add image 

document.getElementById('file').addEventListener("change", function (e) {
  var file = e.target.files[0];
  var reader = new FileReader();
  reader.onload = function (f) {
    var data = f.target.result;
    fabric.Image.fromURL(data, function (img) {
      var oImg = img.set({
		  left: 70,
		  top: 100,
		  width: 250,
		  height: 200,
		  angle: 0,

		  }).scale(0.9);
		  
      canvas.add(oImg).renderAll();
      canvas.setActiveObject(oImg);  
    });
  };
  reader.readAsDataURL(file);
  save();
});*/



////second try to add image  -> success
var imageLoader = document.getElementById('file');
imageLoader.addEventListener('change', handleImage, false);
function handleImage(e) {
    var objects = canvas.getObjects();
   
   /******
   //remove all content from canvas first
    for (var i in objects) {
       objects[i].remove();
    } 
	*****/ 
	
    var reader = new FileReader();
    reader.onload = function (event) {
        var img = new Image();
        img.onload = function () {
            var imgInstance = new fabric.Image(img, {
               selectable: 1
            }).scale(0.5);
            canvas.add(imgInstance);
            canvas.deactivateAll().renderAll();
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
}

/****Add Background Image *******/
document.getElementById('bg_file').addEventListener("change", function (e) {
  var file = e.target.files[0];
  var reader = new FileReader();
  reader.onload = function (f) {
    var imageUrl = f.target.result;
    canvas.setBackgroundImage(imageUrl, canvas.renderAll.bind(canvas), {
		backgroundImageOpacity: 0.5,
		backgroundImageStretch: true,
			width:canvas.width,
			height:canvas.height
		});
  };
  reader.readAsDataURL(file);
  save();
});



/****Change Text Color *******/
$(document).on('change','#fill',function(){
	
	var obj = canvas.getActiveObject();
	  if(obj){
		obj.set("fill", this.value);
	  }
  canvas.renderAll();
  save();
	
});

/****Change Font Size *******/
$(document).on('change','#size',function(){
	
	var obj = canvas.getActiveObject();
	  if(obj){
		obj.set("fontSize", this.value);
	  }
  canvas.renderAll();
  save();
	
});

/****Change Text Font *******/
$('#font').change(function(){
  var obj = canvas.getActiveObject();
  if(obj){
    obj.set("fontFamily", this.value);
  }
  canvas.renderAll();
  
});

/****Add Text Font *******/
function addText() {
  var oText = new fabric.IText('Add new text...', { 
    left: 100, 
    top: 100 ,
  });
  canvas.add(oText);
  oText.bringToFront();
  canvas.setActiveObject(oText);
  $('#fill, #font , #size').trigger('change');
  
}

/****Add Shape *******/
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
			
		}
		
		  save();
	  
	}); 
 
}); 

/**** Delete Selected element *******/
window.addEventListener("keydown",e =>{
	if(e.key === "Delete" || e.key === "Backspace"){
		canvas.remove(canvas.getActiveObject());
	}
	save();
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

	 /*** Push the current state into the undo stack and then capture the current state ***/
	 
	 
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
		
		
		
/**** Changes Canvas Size  *******/	
	var changeSize = document.getElementById('canvasSize');
	changeSize.addEventListener('click', changeCanvasSize, false);
	function changeCanvasSize(){
		canvas.setDimensions({width:$('#cwidth').val(), height:$('#cheight').val()});
		save();
	}
	
/**** Clean Canvas   *******/		
	
	var changeSize = document.getElementById('canvasClean');
	changeSize.addEventListener('click', cleanCanvas, false);
	function cleanCanvas(){
		var objects = canvas.getObjects();
		if(canvas.getObjects().length ){
			for (var i in objects) {
			   objects[i].remove();
			} 
			save();
		}	
	}
	

	
/****Download Images *******/
// First try to download
/*$(document).on('click','#download',function(){
	 
		  image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
		  var link = document.createElement('a');
		  link.download = "my-image.png";
		  link.href = image;
		  link.click();

	
}); */

// second try to download
var imageSaver = document.getElementById('lnkDownload');
imageSaver.addEventListener('click', saveImage, false);

function saveImage(e) {
	var objects = canvas.getObjects();    
	if(canvas.getObjects().length){
    
	 var link = document.createElement('a');
         link.download = 'canvas.png';
		 link.href = canvas.toDataURL({
						format: 'png',
						quality: 0.8
					});
		 link.click();
}	
}


