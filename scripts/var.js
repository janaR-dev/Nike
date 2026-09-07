let currentIndex = 0;

let colors = [
    "red",
    "blue",
    "yellow"
];

let body = document.body
, navbar = document.querySelector("nav.navbar")
, brand = document.querySelector(".navbar-brand img")
, logoIcon = document.querySelector(".logoIcon")

, prev = document.querySelector(".prev")
, next = document.querySelector(".next")
, slides = document.querySelectorAll(".sc-carousal-item")

, correctImg = document.querySelectorAll(".correctImg")
, sections = document.querySelectorAll("section")
, navLinks = document.querySelectorAll(".nav-item")

, latestContainer =
    document.querySelector("#Latest .products")
, featuredContainer =
    document.querySelector("#Featured .products")
   , 
    popupBox = document.querySelectorAll('.popup .box');   



