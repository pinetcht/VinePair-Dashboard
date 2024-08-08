# VinePair Audience Insights Dashboard
VinePair internal dashboard displaying trends for 65 different types of wines, beers, and spirits. Created with Amcharts, React.js, and Firebase Authentication.

# Features
1. Google Login for VinePair emails
2. Drop Down for Each Master Beverage Category
3. Weights Selection
4. Export Visible Series in Selected Time Range

## Login Page
* Google Sign-in for company emails (example@vinepair.com)
* Sign-in will not authorize non-VinePair emails
## Dashboard Page
### Headers
* Weighting defaults to OLD
* Beverage type and score options
<img alt="headers" src="./images/image4.png" width=70%>

* Weighting type is displayed underneath the displayed beverage and weighting

<img alt="bev and weights" src="./images/image7.png" width=40% style="margin-left:9%">


### Navigating The Chart
* Hover to view beverage and score for any given data point
<img alt="data tag" src="./images/image2.png" width=30%>

* To hide other beverages, click on the legend for that beverage. The line graph will drop from the chart.


<div style="display: flex; align-items: flex-start; margin-left:7%">
    <div style="margin-right: 10px;">
        <img src="./images/image1.png" alt="headers" width="50%">
        <p>Line graph hidden</p>
    </div>
    <div>
        <img src="./images/image8.png" alt="headers" width="50%">
        <p>Line graph displayed</p>
    </div>
</div>


* Hover over legend to emphasize the line graph


<div style="display: flex; flex-direction: column; align-items: center; margin-left: 10px;">
    <img src="./images/image3.png" alt="headers" width="78%">
    <p>“Rose” Hovered</p>
</div>
<div style="display: flex; flex-direction: column; align-items: center; margin-left: 10px;">
    <img src="./images/image11.png" alt="headers" width="78%">
    <p>“Rose” not hovered</p>
</div>


* Slide the bottom bar to adjust the time range

<div style="display: flex; flex-direction: column; align-items: center; margin-left: 10px;">
    <img src="./images/image10.png" alt="headers" width="78%">
</div>

* Slide the left bar to adjust the share-of-voice.



### Exporting
* The export button is the three dots (...) on the top right corner of the graph.
<div style="display: flex; flex-direction: column; align-items: center; margin-left: 10px;">
    <img src="./images/image9.png" alt="headers" width="60%">
</div>

* Export only exports visible line graphs within the time range of the bottom slider bar.

<div style="display: flex; flex-direction: column; align-items: center; margin-left: 10px;">
    <img src="./images/image5.png" alt="headers" width="60%">
    <p style="font-size:12px; text-align: center;">Chart only displays and exports Macro, Sour Gose, Radler, and Seltzer from Apr 2021 - June 2024</p>
</div>
