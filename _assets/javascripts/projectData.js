angular.module('directoryApp').factory('projects', function(){
  
  var projects = [

    {
      id: 1,
      type: "headline",
      track: "Formal Education",
      title: "Blended Online and In-Person Education",
      partners: ["Investors", "Mentors", "Universities", "Jusoor", "IEE"]
    },

    {
      id: 2,
      type: "headline",
      track: "Formal Education",
      title: "Virtual Distance Teacher Training",
      partners: ["Varki Foundation"]
    },

    {
      id: 3,
      type: "headline",
      track: "Non-Formal Education",
      title: "Employment Platform",
      partners: ["Linkedin", "Google", "Microsoft"]
    },

    {
      id: 4,
      type: "headline",
      track: "Non-Formal Education",
      title: "Multinational Digital Content Offering",
      partners: ["LRNG", "Cousera", "Khan Academy", "Nafham"]
    },

    {
      id: 5,
      type: "headline",
      track: "Language",
      title: "Mobile Language Lab Application",
      partners: ["Pearson"]
    },

    {
      id: 6,
      type: "headline",
      track: "Language",
      title: "Refugee Resource Hub Application and Site",
      partners: ["Universities", "Google", "UNHCR"]
    }
  ]

  return projects;

});