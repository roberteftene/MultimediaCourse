var canvas;
var context;

var values = [10, 50, 100];

function init() {
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');

    var max = getMax(values);
    var list = document.getElementById('sliders');


    for (i = 0; i < values.length; i++) {

        var input = document.createElement('input');
        var li = document.createElement('li');
        var label = document.createElement('label');

        label.setAttribute('for', 'id' + i)
        label.textContent = 'Value ' + i + ' ';
        li.appendChild(label)
        input.setAttribute('type', "range");
        input.setAttribute('id', 'id' + i);
        input.setAttribute('max', max);
        input.value = values[i];
        // input.setAttribute('oninput', 'changeVal(' + i + ')');

        li.appendChild(input)
        list.appendChild(li);
    }

    makePieChart(300, 100, 90, values);

}


function getMax(values) {
    var maxV = 0;
    for (let i = 0; i < values.length; i++) {
        if (maxV < values[i])
            maxV = values[i];
    }

    return maxV;
}

function makePieChart(cx, cy, radius, values) {
    context.restore();
    var sum = 0;

    for (let index = 0; index < values.length; index++) {
        const element = values[index];
        sum += element;
    }

    var startingAngle = 0;
    var endAngle = 0;
    var percentage;
    context.strokeStyle = 'grey';

    for (let index = 0; index < values.length; index++) {
        const element = values[index];
        let red = Math.floor(Math.random() * 255); 
        let green = Math.floor(Math.random() * 255); 
        let blue = Math.floor(Math.random() * 255); 
        context.fillStyle = 'rgb(' + red + ',' + green + ',' + blue + ')';
        percentage = element / sum;
        endAngle = startingAngle + Math.PI * 2 * percentage;
        context.arc(cx,cy,radius,startingAngle,endAngle)
        context.lineTo(cx, cy);

        startingAngle = endAngle;
        context.fill();
        context.closePath();
        context.save();
    }

}