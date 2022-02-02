const avatarPath =
  "M23,25c0-0.1,0-0.2,0-0.3L20.6,12c-0.2-1.2-1.2-2.1-2.4-2.1H4.8c-1.2,0-2.2,0.9-2.4,2L0,24.7c0,0.1,0,0.2,0,0.3c0,0.1,0,0.2,0,0.3c0,1.3,1.1,2.4,2.4,2.4c1.2,0,2.2-0.8,2.4-2l1.5-9.5l0,30.2c0,1.3,1.1,2.4,2.4,2.4c1.3,0,2.4-1.1,2.4-2.4V31.5h0.6v14.9c0,1.3,1.1,2.4,2.4,2.4c1.3,0,2.4-1.1,2.4-2.4l0-30.2l1.5,9.5c0.2,1.2,1.2,2,2.4,2c1.3,0,2.4-1.1,2.4-2.4C23,25.2,23,25.1,23,25L23,25z M23,25";
const avatarHead =
  "M11.5,9.6c2.7,0,4.8-2.2,4.8-4.8c0-2.7-2.2-4.8-4.8-4.8C8.9,0,6.7,2.2,6.7,4.8C6.7,7.5,8.9,9.6,11.5,9.6L11.5,9.6z M11.5,9.6";
// we want to three frequency graphs that highlight the different budhet values

const container = document.getElementById("slide-content");
const MARGIN = { LEFT: 10, RIGHT: 10, TOP: 10, BOTTOM: 10 };
const WIDTH = container.clientWidth - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = container.clientHeight - MARGIN.TOP - MARGIN.BOTTOM;
const NUM_AVATARS = 60;
const colorPrimary = "#e89a41";
const colorGray = "#dbdbdb";

// netflix color - #e51813

const svg = d3
  .select("#slide-content")
  .append("svg")
  .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
  .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM);

// create a group element
const g = svg
  .append("g")
  .attr("transform", `translate(${MARGIN.LEFT},${MARGIN.TOP})`);

d3.json("data/data.json").then((data) => {
  data.forEach((d) => {
    d.reach = +d.reach;
    d.frequency = +d.frequency;
  });

  // will want to render a graph for each object in the array
  data.forEach((d, i) => render(d, i));
  //render(data);
});

const render = (data, idx) => {
  console.log(idx);
  const budgetG = g
    .append("g")
    .attr("transform", `translate(10,${idx * 230 + 30})`);
  const avatarG = budgetG
    .append("g")
    .attr("transform", "translate(20,40) scale(0.7)");
  //console.log(data[0].reach);
  const toFill = Math.floor((data.reach / 100) * NUM_AVATARS);
  const xRows = 15;

  const calcY = (i) => {
    if (i < 15) {
      return 0;
    } else if (i < 30) {
      return 1;
    } else if (i < 45) {
      return 2;
    } else if (i < 60) {
      return 3;
    }
  };
  for (let i = 0; i < NUM_AVATARS; i++) {
    avatarG
      .append("path")
      .attr("d", avatarPath)
      .attr("fill", i <= toFill ? colorPrimary : colorGray)
      .attr("transform", `translate(${(i % xRows) * 30},${calcY(i) * 60})`);
    avatarG
      .append("path")
      .attr("d", avatarHead)
      .attr("fill", i <= toFill ? colorPrimary : colorGray)
      .attr("transform", `translate(${(i % xRows) * 30},${calcY(i) * 60})`);
  }

  // append title here
  budgetG
    .append("text")
    .attr("font-weight", "bold")
    .text(`${data.title} | TARGETED AUDIENCE - ${data["targeted Audience"]}`);
  // line underneath title
  budgetG
    .append("line")
    .style("stroke", colorGray)
    .style("stroke-width", 2)
    .attr("x1", 0)
    .attr("y1", 15)
    .attr("x2", WIDTH)
    .attr("y2", 15);
  // reach box
  const reachRect = budgetG.append("g").attr("transform", `translate(380,40)`);
  reachRect
    .append("rect")
    .attr("width", 210)
    .attr("height", 160)
    .attr("fill", colorGray);
  reachRect
    .append("text")
    .attr("font-size", "2rem")
    .attr("text-anchor", "middle")
    .attr("fill", "black")
    .attr("x", 100)
    .attr("y", 50)
    .text("REACH");
  reachRect
    .append("text")
    .attr("x", 100)
    .attr("y", 90)
    .attr("font-size", "2rem")
    .attr("text-anchor", "middle")
    .attr("fill", "black")
    .attr("font-weight", "bold")
    .text(`${data.reach}%`);
  reachRect
    .append("text")
    .attr("x", 100)
    .attr("y", 120)
    .attr("font-size", "1rem")
    .attr("text-anchor", "middle")
    .attr("fill", "black")
    .text("AFTER 6 Months");
  // Frequency box
  const freqRect = budgetG.append("g").attr("transform", `translate(650,40)`);
  freqRect
    .append("rect")
    .attr("width", 210)
    .attr("height", 160)
    .attr("fill", colorGray);
  freqRect
    .append("text")
    .attr("font-size", "2rem")
    .attr("text-anchor", "middle")
    .attr("fill", "black")
    .attr("x", 100)
    .attr("y", 50)
    .text("Frequency");
  freqRect
    .append("text")
    .attr("x", 100)
    .attr("y", 90)
    .attr("font-size", "2rem")
    .attr("text-anchor", "middle")
    .attr("fill", "black")
    .attr("font-weight", "bold")
    .text(`${data.frequency}X`);
  freqRect
    .append("text")
    .attr("x", 100)
    .attr("y", 120)
    .attr("font-size", "1rem")
    .attr("text-anchor", "middle")
    .attr("fill", "black")
    .text("AFTER 6 Months");
};
