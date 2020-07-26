var canvas = new fabric.Canvas('c', {
    preserveObjectStacking: true
});
canvas.setHeight(412);
canvas.setWidth(637);
var oImg, isImageLoaded;

// oImgObj bread and butter, kudos @grunt
function replaceImage(oImgObj, imgUrl) {
    if (!isImageLoaded) return; //return if initial image not loaded
    var imgElem = oImgObj._element; //reference to actual image element
    imgElem.src = imgUrl; //set image source
    imgElem.onload = () => canvas.renderAll(); //render on image load
}

// initialize default frame (light brown wood oval)
fabric.Image.fromURL('images/frames/LightBrownWoodOval.png', function (img) {
    isImageLoaded = true;
    oImg = img.set({
        selectable: false,
        evented: false,
    }).scale(0.5);
    canvas.add(oImg).renderAll();
    canvas.sendToBack(oImg);
});

// add photo (link)
$(function () {
    $("#upload_link").on('click', function (e) {
        e.preventDefault();
        $("#file:hidden").trigger('click');
    });
});

var dataURL = canvas.toDataURL({
    format: "png",
    left: 0,
    top: 0,
    width: canvas.width,
    height: canvas.height,
});

// add photo
document.getElementById('file').addEventListener("change", function (e) {
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function (f) {
        var data = f.target.result;
        fabric.Image.fromURL(data, function (img) {
            var oImg = img.set({
                left: 400,
                top: 102,
                centeredScaling: true,
                lockUniScaling: true,
                cornerStyle: 'circle',
                transparentCorners: false,
            }).scale(1);
            canvas.add(oImg);
            canvas.setActiveObject(oImg);
            var image = canvas.getActiveObject();
            image.moveTo(-1);
            canvas.discardActiveObject();
            canvas.renderAll();
            canvas.sendToBack(oImg);
        });
    };
    reader.readAsDataURL(file);
});

const text = {
    left: 475,
    fontSize: 27,
    hasBorders: true,
    hasControls: false,
    selectable: true,
    lockRotation: true,
    lockMovementX: true,
    lockMovementY: true,
    align: 'mid',
    originX: 'center',
    originY: 'center',
    centeredScaling: true,
};

// Text Fields
canvas.add(new fabric.IText('In Loving Memory', {
    ...text,
    top: 25,
}));

canvas.add(new fabric.IText('Name', {
    ...text,
    top: 60,
}));

// Text Options
var underline = document.getElementById('btn-underline');
var bold = document.getElementById('btn-bold');
var italic = document.getElementById('btn-italic');

underline.addEventListener('click', function () {
    dtEditText('underline');
});
bold.addEventListener('click', function () {
    dtEditText('bold');
});
italic.addEventListener('click', function () {
    dtEditText('italic');
});

    // Font Styling
    function dtEditText(action) {
        var a = action;
        var o = canvas.getActiveObject();
        var t;
        // If object selected, what type?
        if (o) {
            t = o.get('type');
        }
        if (o && t === 'i-text') {
            switch (a) {
                case 'bold':
                    var isBold = dtGetStyle(o, 'fontWeight') === 'bold';
                    dtSetStyle(o, 'fontWeight', isBold ? '' : 'bold');
                    break;

                case 'italic':
                    var isItalic = dtGetStyle(o, 'fontStyle') === 'italic';
                    dtSetStyle(o, 'fontStyle', isItalic ? '' : 'italic');
                    break;

                case 'underline':
                    var isUnderline = dtGetStyle(o, 'textDecoration') === 'underline';
                    dtSetStyle(o, 'textDecoration', isUnderline ? '' : 'underline');
                    break;
                   
            }
			 canvas.renderAll();
        }
    }

    // Get the style
    function dtGetStyle(object, styleName) {
        return object[styleName];
    }
    // Set the style
    function dtSetStyle(object, styleName, value) {
        object[styleName] = value;
        object.set({
            dirty: true
        });
        canvas.renderAll();
    }

    // Switching Fonts
    document.getElementById("cinzel").addEventListener("click", function (e) {
        canvas.getActiveObject().set("fontFamily", "Cinzel");
        canvas.renderAll();
    });

    document
        .getElementById("cinzelDecorative")
        .addEventListener("click", function (e) {
            canvas.getActiveObject().set("fontFamily", "Cinzel Decorative");
            canvas.renderAll();
        });

    document
        .getElementById("monsieurladoulaise")
        .addEventListener("click", function (e) {
            canvas.getActiveObject().set("fontFamily", "Monsieur La Doulaise");
            canvas.renderAll();
        });
    document.getElementById("opensans").addEventListener("click", function (e) {
        canvas.getActiveObject().set("fontFamily", "Open Sans");
        canvas.renderAll();
    });

    document.getElementById("montserrat").addEventListener("click", function (e) {
        canvas.getActiveObject().set("fontFamily", "Montserrat");
        canvas.renderAll();
    });

    document.getElementById("times").addEventListener("click", function (e) {
        canvas.getActiveObject().set("fontFamily", "Times New Roman");
        canvas.renderAll();
    });

// Centered Line
var line = new fabric.Line([canvas.width / 2, 0, canvas.width / 2, canvas.height], {
    strokeWidth: 1,
    stroke: '#dddddd',
    selectable: false,
});
canvas.add(line);

// Save
function download(url, name) {
    // make the link. set the href and download. emulate dom click
    $('<a>').attr({
        href: url,
        download: name
    })[0].click();
}

function downloadFabric(canvas, name) {
    //  convert the canvas to a data url and download it.
    download(canvas.toDataURL({
        multiplier: 4
    }), name + '.png');
}

// Print
function printCanvas() {
	console.log('avanish')
    var dataUrl = document.getElementById('c').toDataURL( /* data multiplier?*/ ); //attempt to save base64 string to server using this var  
    var windowContent = '<!DOCTYPE html>';
    windowContent += '<html>';
    windowContent += '<head><title>Print canvas</title></head>';
    windowContent += '<body>';
    windowContent += '<img src="' + dataUrl + '" onload=window.print();window.close();>';
    windowContent += '</body>';
    windowContent += '</html>';
    var printWin = window.open('', '', 'width=340,height=260');
    printWin.document.open();
    printWin.document.write(windowContent);
}