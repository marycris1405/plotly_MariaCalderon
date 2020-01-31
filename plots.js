function init() {
    var selector = d3.select("#selDataset");
  
    d3.json("samples.json").then((data) => {
      console.log(data);
      var sampleNames = data.names;
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
})}
init();

function optionChanged(newSample) {
    buildMetadata(newSample);
    buildBarCharts(newSample);
    buildBubbleChart(newSample);
}

///////////////// METADATA /////////////////

function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
      var metadata = data.metadata;
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];
      var PANEL = d3.select("#sample-metadata");
  
      PANEL.html("");
      //PANEL.append("h6").text(result.location);
      Object.entries(result).forEach(([key,value])=>{
          PANEL.append("h6").text(key.toUpperCase()+':'+value);
      })
    });
  }

///////////////// BAR CHARTS /////////////////

function buildBarCharts (sample){
    d3.json("samples.json").then((data) => {
        var resultArray = data.samples.filter(sampleObj => {
                return sampleObj.id == sample

            });
        
        var result = resultArray[0];
        
        var topten = result.otu_ids.slice(0,10).map(numbericIds=>{
            return 'OTU' + numbericIds;
        }).reverse();

        var topten_svalues= result.sample_values.slide(0,10).reverse();
        
        var topten_labels= result.otu_labels.slice(0,10).reverse();

        var bargraph= [
            {
                x: topten_svalues,
                y: topten,
                text: topten_labels,
                name: "Top 10 Labels",
                type: 'bar',
                orientation: 'h'
            }
        ];

        var data= [bargraph];

        var barlayout= {
            title: "Top 10 OTUs"
        };

        Plotly.newPlot('bar',bargraph, barlayout)
    });

    }

 ///////////////// BUBBLE CHARTS /////////////////

 function buildBubbleChart(sample){
    d3.json("samples.json").then((data)=>{
        var resultArray=data.samples.filter(sampleObj=>{
            return sampleObj.id==sample
        });
    
    var result= resultArray[0];

    var otu_ids=result.odu_ids.map(numbericIds=>{
        return numbericIds;
    }). reverse();

    var sample_values=result.sample_values.reverse();
    
    var otu_labels= result.otu_labels.reverse();

    var bubbles={
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: 'markers',
        marker: {
            color: otu_ids,
            size: saple_values
        }
    };

    var data = [bubbles];

    var bubblelay={
        tittle: 'OTU Id',
        showlegend: true,
    };

    Ploty.newPlot('bubble',data, bubblelay)

    });
}
