

var dataset;

var margin = {top: 20, right: 20, bottom: 30, left: 40};

var width = 1300 - margin.left - margin.right;
var height = 850 - margin.top - margin.bottom;


var yDepth = d3.scaleLinear().domain([0,height]).range([0,height]);
var yAxis = d3.axisLeft(yDepth).ticks(10);


var yScale = d3.scaleLinear().domain([0, height]).range([0,height-55]);
var xScale = d3.scaleLinear().domain([0,width]).range([125,width-75]);
var wScale = d3.scaleLinear().domain([0, 300]).range([0,120]);
var hScale =  d3.scaleLinear().domain([0, 100]).range([0,50]);

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)     
    .attr("height", height + margin.top + margin.bottom)
    .attr("class","svg-container")
    .append("g")                                         
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
   
function drawAxes(){

    svg.append("g")
        .attr("class", "y axis")
        .attr("fill","white")
        .call(yAxis);
    
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 15)
        .attr("font-size","15px")
        .style("text-anchor", "end")
        .text("Profondità")
        .attr("fill", "white");
    }

function drawSubmarine(data,name,namesub,positionXSub){
    
    svg
    .append("ellipse")
    .attr("class","ellipse"+name)
    .attr("cx",xScale(positionXSub))
    .attr("cy", yScale(data.y+data.h))
    .attr("rx", wScale(data.l))
    .attr("ry",yScale(data.h))
    .attr("fill","rgb(95, 95, 95)")
    .on("click",function (){

        var find=false;
        var name_submarine1=""
        var name_sunmarine2=""
        // attraverso la variabili name_coda e sub_coda mi prendo le rect relative alle torrette e alle code dei sottomarini
        var name_rect=""
        var sub_coda=""
        // attraverso Math.random scelgo in modo randomico un sottomarino
        while(find==false){
            i=Math.floor(Math.random() * 10) ;
             name_submarine1=namesub[i];
             name_sunmarine2=d3.select(this).attr("class");
             name_rect=name_sunmarine2.replace("ellipse","rect");
             sub_coda=name_rect+"coda";
            if("ellipse"+name_submarine1!=name_sunmarine2){
                find=true;
            }
        }

        //prendo tutte le variabili relative al primo sottomarino

        var x=d3.select(this).attr("cx");
        var y=d3.select(this).attr("cy");
        var w=d3.select(this).attr("rx");
        var h=d3.select(this).attr("ry");

        var x_t=d3.select("."+name_rect).attr("x");
        var y_t=d3.select("."+name_rect).attr("y");
        var w_t=d3.select("."+name_rect).attr("width");
        var h_t=d3.select("."+name_rect).attr("height");
        
        var x_c=d3.select("."+sub_coda).attr("x");
        var y_c=d3.select("."+sub_coda).attr("y");
        var w_c=d3.select("."+sub_coda).attr("width");
        var h_c=d3.select("."+sub_coda).attr("height");

        //prendo tutte le variabili relative al secondo sottomarino
        var x1=d3.select(".ellipse"+name_submarine1).attr("cx");
        var y1=d3.select(".ellipse"+name_submarine1).attr("cy");
        var w1=d3.select(".ellipse"+name_submarine1).attr("rx");
        var h1=d3.select(".ellipse"+name_submarine1).attr("ry");
    

        var x1_t=d3.select(".rect"+name_submarine1).attr("x");
        var y1_t=d3.select(".rect"+name_submarine1).attr("y");
        var w1_t=d3.select(".rect"+name_submarine1).attr("width");
        var h1_t=d3.select(".rect"+name_submarine1).attr("height");

        var x1_c=d3.select(".rect"+name_submarine1+"coda").attr("x");
        var y1_c=d3.select(".rect"+name_submarine1+"coda").attr("y");
        var w1_c=d3.select(".rect"+name_submarine1+"coda").attr("width");
        var h1_c=d3.select(".rect"+name_submarine1+"coda").attr("height");

        //effettuo tutte le trasformazioni tra il sottomarino selezionato e quello scelto in modo randomico
    
        d3.select(this).transition().duration(1000).attr('rx',w1).attr('ry',h1).transition().duration(1000).attr('cy',y1).transition().duration(1000).attr('cx',x1);
        d3.select(".ellipse"+name_submarine1).transition().duration(1000).attr('rx',w).attr('ry',h).transition().duration(1000).attr('cy',y).transition().duration(1000).attr('cx',x);
        
        d3.select("."+name_rect).transition().duration(1000).attr('width',w1_t).attr('height',h1_t).attr('y',(y - h1 - h1_t)+5 ).attr('x',x-(w1_t/2)).transition().duration(1000).attr('y',y1_t).transition().duration(1000).attr('x',x1_t);
        d3.select(".rect"+name_submarine1).transition().duration(1000).attr('width',w_t).attr('height',h_t).attr('y',(y1 - h - h_t)+5 ).attr('x',x1-(w_t/2)).transition().duration(1000).attr('y',y_t).transition().duration(1000).attr('x',x_t);
       
        d3.select("."+sub_coda).transition().duration(1000).attr('width',w1_c).attr('height',h1_c).attr('y',y - (h1*1.5)/2 ).attr('x',+x + +w1).transition().duration(1000).attr('y',y1_c).transition().duration(1000).attr('x',x1_c);
        d3.select(".rect"+name_submarine1+"coda").transition().duration(1000).attr('width',w_c ).attr('height',h_c).attr('y',y1 - (h*1.5)/2 ).attr('x',+x1 + +w).transition().duration(1000).attr('y',y_c).transition().duration(1000).attr('x',x_c);

    });
   // creazione della torretta
    svg
    .append("rect")
    .attr("class","rect"+name)
    .attr("y",yScale(data.y)-yScale(data.h_torretta)+5)
    .attr("x",xScale(positionXSub)-wScale(data.w_torretta)/2)
    .attr("width", wScale(data.w_torretta))
    .attr("height", yScale(data.h_torretta))
    .attr("fill","rgb(95, 95, 95)");
    // creazione della coda 
    svg
    .append("rect")
    .attr("class","rect"+name+"coda")
    .attr("y",yScale(data.y+(data.h*1.5)/5))
    .attr("x",xScale(positionXSub)+wScale(data.l))
    .attr("width", wScale(data.l/5))
    .attr("height", yScale(data.h*1.5))
    .attr("fill","rgb(95, 95, 95)");

}

d3.json("data/sottomarini.json")
    .then(function(data) {
    drawAxes();
    //assegno ad ogni sottomarino una classe
    nameSub=["submarine1","submarine2","submarine3","submarine4","submarine5","submarine6","submarine7","submarine8","submarine9","submarine10"]
    positionXSub=[100,200,500,700,950,600,800,100,300,1000]
    var i=0;
    for (el in data){
        if(i<=9){
            drawSubmarine(data[el],nameSub[i],nameSub,positionXSub[i]);
            i++;
        }
    }
    });
