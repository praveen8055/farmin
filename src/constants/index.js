import {
  blackImg,
  blueImg,
  highlightFirstVideo,
  highlightFourthVideo,
  highlightSecondVideo,
  highlightThirdVideo,
  whiteImg,
  yellowImg,
  chilliimg,
  chilliimg2,
  chilliimg3,
} from "../utils";

export const navLists = ["Products", "Ourstory", "About", "Support"];

export const hightlightsSlides = [
  {
    id: 1,
    textLists: [
      "Authentic Spices",
      "From Soil to Spoon: The Old Way is Still the Best",
      
    ],
    video: highlightFirstVideo,
    videoDuration: 9,
  },
  {
    id: 2,
    textLists: ["Chilli Powder.",
      "Made for hot and spicy pickles.",
      "Customize according to your needs."
      
      ],
    video: highlightSecondVideo,
    videoDuration: 7,
  },
  {
    id: 3,
    textLists: [
      "Turmeric powder from our farms",
      "Coming soon..",
      ,
    ],
    video: highlightThirdVideo,
    videoDuration: 7,
  },
  {
    id: 4,
    textLists: ["Masala made from pure authentic spices.", "Coming soon..."],
    video: highlightFourthVideo,
    videoDuration: 7,
  },
];
export const products=[
  {
    id:1,
    name:"Chilli Powder",
    image:chilliimg,
    quantity:"1KG",
    description:"Authentic stone-ground spice from local farms. 100% natural, vibrant color & smoky heat for daily home cooking.",
    price:499,
    alt:"Traditional packet of Guntur chilli powder with women empowerment certification seal"
    

  },
  {
    id:2,
    name:"Chilli Powder",
    image:chilliimg2,
    quantity:"5KG",
    description:"Premium sun-dried chillies, handpicked for rich flavor. Ideal for family feasts—retains freshness for months",
   alt:"traditional chilli powder photo on spice packaging celebrating grandma's recipe legacy",
    price:2249
  },
  {
    id:3,
    name:"Chilli Powder",
    image:chilliimg3,
    quantity:"10KG",
    description:"High-intensity spice for chefs & restaurants. Authentic Telangana flavor with consistent, bold quality",
    alt:" pouch of hand-ground chilli powder showing telangana origin label",
    price:4199

  }
]

