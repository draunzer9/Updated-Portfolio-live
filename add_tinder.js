const fs = require('fs');
let data = fs.readFileSync('data.js', 'utf8');
const newStudy = `  {
    id: "tinder-travel",
    title: "Tinder Travel MVP",
    subtitle: "Connecting Travelers Worldwide",
    tags: ["Product Pitch", "Social", "Growth"],
    filterCategory: "New Feature",
    metric: "30%",
    metricLabel: "Projected Match Lift",
    summary: "A comprehensive product pitch to introduce travel-based matching and itinerary planning within the Tinder ecosystem.",
    url: "/tinder.html",
    themeColor: "#FD3A73",
    themeSecondary: "#FF6584",
    image: "/assets/tinder.svg"
  }
];`;
data = data.replace('];', ',\n' + newStudy);
fs.writeFileSync('data.js', data);
console.log('Tinder added to data.js');
