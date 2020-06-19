
import { Component, NgZone } from "@angular/core";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import am4themes_material from "@amcharts/amcharts4/themes/material";

/* Chart code */
// Themes begin
am4core.useTheme(am4themes_material);
// Themes end

@Component({
  selector: "app-worldMap",
  templateUrl: "./worldMap.component.html",
  styleUrls: ["./worldMap.component.css"]
})
export class WorldComponent {
  //private chart: am4charts.XYChart;

  constructor(private zone: NgZone) {}

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
   
// Create map instance
let chart = am4core.create("chartdiv", am4maps.MapChart);

// Set map definition
chart.geodata = am4geodata_worldLow;

// Set projection
chart.projection = new am4maps.projections.Miller();

// Create map polygon series
let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

// Exclude Antartica
polygonSeries.exclude = ["AQ"];

// Make map load polygon (like country names) data from GeoJSON
polygonSeries.useGeodata = true;

let polygonTemplate = polygonSeries.mapPolygons.template;
polygonTemplate.tooltipText = "{name}";
polygonTemplate.polygon.fillOpacity = 0.6;
polygonTemplate.events.on("hit", function(ev) {
    // o modal é aqui para 
});


// Create hover state and set alternative fill color
let hs = polygonTemplate.states.create("hover");
hs.properties.fill = chart.colors.getIndex(0);


// Add image series
let imageSeries = chart.series.push(new am4maps.MapImageSeries());
imageSeries.mapImages.template.propertyFields.longitude = "longitude";
imageSeries.mapImages.template.propertyFields.latitude = "latitude";
imageSeries.mapImages.template.tooltipText = "{title}";
imageSeries.mapImages.template.propertyFields.url = "url";

let circle = imageSeries.mapImages.template.createChild(am4core.Circle);
circle.radius = 3;
circle.propertyFields.fill = "color";

let circle2 = imageSeries.mapImages.template.createChild(am4core.Circle);
circle2.radius = 3;
circle2.propertyFields.fill = "color";


circle2.events.on("inited", function(event){
  animateBullet(event.target);
})


function animateBullet(circle) {
    let animation = circle.animate([{ property: "scale", from: 1, to: 5 }, { property: "opacity", from: 1, to: 0 }], 1000, am4core.ease.circleOut);
    animation.events.on("animationended", function(event){
      animateBullet(event.target.object);
    })
}



let colorSet = new am4core.ColorSet();

imageSeries.data = [ {
  "title": "Brussels",
  "latitude": 50.8371,
  "longitude": 4.3676,
  "color":colorSet.next()
}]
    });
  }
}