const colors = [
  "#F75F00",
  "#EE4266",
  "#FFD800",
  "#7B99FA",
  "#EE2B47",
  "#81B214",
  "#9A60C1",
  "#CAD315",
  "#575151",
  "#62A388",
  "#404B69",
];

const getColorByKey = (key: number) => colors[key];

const getRandomColor = () => colors[Math.floor(Math.random() * 11)];

export { getRandomColor, getColorByKey };
