import { useEffect, useState } from "react";
import { useAuth } from "../components/AuthContext";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5plugins_exporting from "@amcharts/amcharts5/plugins/exporting";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5themes_Dark from "@amcharts/amcharts5/themes/Dark";
import axios from "axios";
import { convertToDateObject } from "./ConvertToDateObject";

const Graph = () => {
  const { selectedJson, setFormResponse, setGraphAlerts } = useAuth();
  const [fileUrl, setFileUrl] = useState("");

  useEffect(() => {
    // Fetch file from Digital Ocean Spaces
    let fileName = selectedJson; // input file from user selection
    const fetchFileUrl = async () => {
      // only fetch when user selects file; default json is 'OLD__.json'
      if (selectedJson !== "OLD__.json") {
        try {
          const response = await axios.get(
            `https://gandtweek.com/get-file?fileName=${fileName}`
          );
          const data = response.data;
          setFileUrl(data.url);
        } catch (error) {
          setGraphAlerts(`Error fetching file URL: ${error}`);
        }
      }
    };

    fetchFileUrl();
  }, [selectedJson]);

  useEffect(() => {
    //*****************************//
    // USER INPUTS: Export name
    // default filename is 'exported_' + input json filename
    let exportName = "";
    exportName = "exported_" + selectedJson; // change the slicing depending on input json filename
    //*****************************//

    let root = am5.Root.new("chartdiv", {});
    const myTheme = am5.Theme.new(root);
    myTheme.rule("Label").setAll({
      fontFamily: "azo-sans-web, sans-serif",
    });

    root.setThemes([
      am5themes_Animated.new(root),
      am5themes_Dark.new(root),
      myTheme,
    ]);

    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        maxTooltipDistance: 0,
        layout: root.verticalLayout,
      })
    );

    const loadData = async () => {
      try {
        // uses json file fetched from Digital Ocean Spaces
        const result = await am5.net.load(fileUrl);
        if (!result || !result.response) {
          throw new Error("Empty or invalid response received.");
        }

        var data = am5.JSONParser.parse(result.response);

        // convert months to datetime format
        data = data.map((item) => ({
          ...item,
          MONTH: convertToDateObject(item.MONTH),
        }));

        // create array of dict containing months
        const months = data.map((item) => ({ date: item.MONTH }));

        let xAxis = chart.xAxes.push(
          am5xy.DateAxis.new(root, {
            baseInterval: {
              timeUnit: "month",
              count: 1,
            },
            renderer: am5xy.AxisRendererX.new(root, {
              minorGridEnabled: true,
              minGridDistance: 100,
              minorLabelsEnabled: true,
            }),
            tooltip: am5.Tooltip.new(root, {}),
          })
        );

        xAxis.set("minorDateFormats", {
          month: "MMM",
        });

        let xRenderer = xAxis.get("renderer");
        xRenderer.labels.template.setAll({
          rotation: -45,
          centerY: am5.p50,
          textAlign: "left",
        });

        // Set data for the xAxis and series
        xAxis.data.setAll(months);

        // Create Y-axis
        let yAxis = chart.yAxes.push(
          am5xy.ValueAxis.new(root, {
            renderer: am5xy.AxisRendererY.new(root, {}),
          })
        );

        // Add a legend
        var legend = chart.children.push(
          am5.Legend.new(root, {
            centerX: am5.p50,
            x: am5.p50,
            nameField: "name",
            paddingRight: 15,
            layout: am5.GridLayout.new(root, {
              maxColumns: 10,
              minColumns: 2,
            }),
          })
        );

        // function to make one line of graph for each beverage
        function makeSeries(name) {
          // Create series
          let series = chart.series.push(
            am5xy.LineSeries.new(root, {
              name: name,
              xAxis: xAxis,
              yAxis: yAxis,
              valueYField: name,
              legendValueText: "{valueY}",
              valueXField: "date",
              tooltip: am5.Tooltip.new(root, {
                pointerOrientation: "horizontal",
                labelText: "{name}: {valueY}",
              }),
            })
          );

          // Actual bullet
          series.bullets.push(function () {
            var bulletCircle = am5.Circle.new(root, {
              radius: 3,
              stroke: series.get("fill"),
              strokeWidth: 1,
              fill: am5.color("#00FFFFFF"),
            });
            return am5.Bullet.new(root, {
              sprite: bulletCircle,
            });
          });

          // map each beverage into array of {date, score}
          const seriesData = data.map((item) => ({
            date: item.MONTH,
            [name]: item[name],
          }));

          series.data.setAll(seriesData);
          series.appear();
        }

        // make array of beverage names
        const beverages = Object.keys(data[0]).filter((key) => key !== "MONTH");
        beverages.forEach((beverage) => {
          makeSeries(beverage);
        });

        // Add X scrollbar
        var scrollbarX = am5xy.XYChartScrollbar.new(root, {
          orientation: "horizontal",
          height: 50,
        });
        chart.set("scrollbarX", scrollbarX);
        chart.bottomAxesContainer.children.push(scrollbarX);

        var startLabel = scrollbarX.startGrip.children.push(
          am5.Label.new(root, {
            isMeasured: false,
            width: 100,
            fill: am5.color("#ffffff"),
            centerX: 50,
            centerY: 30,
            x: am5.p50,
            y: 0,
            textAlign: "center",
            populateText: true,
          })
        );

        scrollbarX.on("start", function (position) {
          setTimeout(function () {
            startLabel.set(
              "text",
              root.dateFormatter.format(
                xAxis.positionToDate(position),
                "MM-yyyy"
              )
            );
          }, 50);
        });

        var endLabel = scrollbarX.endGrip.children.push(
          am5.Label.new(root, {
            isMeasured: false,
            width: 100,
            fill: am5.color("#ffffff"),
            centerX: 50,
            centerY: 30,
            x: am5.p50,
            y: 0,
            textAlign: "center",
            populateText: true,
          })
        );

        scrollbarX.on("end", function (position) {
          setTimeout(function () {
            endLabel.set(
              "text",
              root.dateFormatter.format(
                xAxis.positionToDate(position),
                "MM-yyyy"
              )
            );
          }, 50);
        });

        // Add Y scrollbar
        var scrollbarY = am5.Scrollbar.new(root, {
          orientation: "vertical",
        });
        chart.set("scrollbarY", scrollbarY);
        chart.leftAxesContainer.children.push(scrollbarY);

        // Add cursor
        chart.set(
          "cursor",
          am5xy.XYCursor.new(root, {
            behavior: "none",
          })
        );

        legend.data.setAll(chart.series.values);

        // HIGHLIGHT SERIES ON LEGEND HOVER FEATURE
        // When legend item container is hovered, dim all the series except the hovered one
        legend.itemContainers.template.events.on("pointerover", function (e) {
          var itemContainer = e.target;

          // As series list is data of a legend, dataContext is series
          var series = itemContainer.dataItem.dataContext;

          chart.series.each(function (chartSeries) {
            if (chartSeries != series) {
              chartSeries.strokes.template.setAll({
                strokeOpacity: 0.2,
                stroke: am5.color("#A6A6A6"),
              });
            } else {
              chartSeries.strokes.template.setAll({
                strokeWidth: 3,
              });
            }
          });
        });

        // When legend item container is unhovered, make all series as they are
        legend.itemContainers.template.events.on("pointerout", function (e) {
          var itemContainer = e.target;
          var series = itemContainer.dataItem.dataContext;

          chart.series.each(function (chartSeries) {
            chartSeries.strokes.template.setAll({
              strokeOpacity: 1,
              strokeWidth: 1,
              stroke: chartSeries.get("fill"),
            });
          });
        });

        legend.valueLabels.template.setAll({
          textAlign: "left",
          width: 60,
        });

        // set legend data after all the events are set on template
        legend.data.setAll(chart.series.values);

        // EXPORTING WITHIN X SCROLLBAR TIMEFRAME
        var exporting = am5plugins_exporting.Exporting.new(root, {
          menu: am5plugins_exporting.ExportingMenu.new(root, {}),
          dataSource: data,
          dateFields: ["MONTH"],
          dateFormat: "MM/yyyy",
          filePrefix: exportName,
        });

        exporting.events.on("dataprocessed", function (ev) {
          // filter for visible series
          let visible_bevs = [];
          chart.series.values.forEach(function (series) {
            if (series.get("visible")) {
              visible_bevs.push(series.get("name"));
            }
          });

          let startDate = xAxis.positionToDate(scrollbarX.get("start"));
          let endDate = xAxis.positionToDate(scrollbarX.get("end"));

          // Convert scrollbar's startDate and endDate to first day of the month
          startDate = new Date(
            startDate.getFullYear(),
            startDate.getMonth(),
            1
          );
          endDate = new Date(endDate.getFullYear(), endDate.getMonth(), 1);

          // filter visible series within time range for export
          let dataToBeProcessed = ev.data;
          const finalData = dataToBeProcessed
            .filter(
              (dataItem) =>
                dataItem.MONTH >= startDate && dataItem.MONTH <= endDate
            )
            .map((dataItem) => {
              let filteredItem = { MONTH: dataItem.MONTH };
              visible_bevs.forEach((bev) => {
                if (dataItem.hasOwnProperty(bev)) {
                  filteredItem[bev] = dataItem[bev];
                }
              });
              return filteredItem;
            });
          ev.data = finalData;
        });
      } catch (error) {
        setFormResponse("Error loading " + error);
      }
    };

    loadData();

    return () => {
      root.dispose();
    };
  }, [fileUrl]);

  return <div id="chartdiv" style={{ width: "100%", height: "100%" }}></div>;
};
export default Graph;
