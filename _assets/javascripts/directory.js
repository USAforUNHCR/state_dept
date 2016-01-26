'use-strict'

var directoryData = [  
    {name: 'Brian Reich',
     organization: 'The Hive', 
     position: 'Project Director', 
     email: 'info@projecthive.nyc', 
     summary: 'The Hive is transforming the ways in which Americans engage with the refugee crisis. We are here as a special projects unit of USA for UNHCR. We’re changing the way Americans change the world.',
     needs: 'We can’t make change happen alone or over night – that is why we need you. We are bringing together the smartest and most innovative partners in the U.S. to help us reach, educate and engage American’s on today’s most pressing issue.',
     resources: 'We’re building knowledge about issues relating to refugees so that Americans will grow more committed to solving the refugee crisis. We’re using data science to identify and micro-target prospective supporters. And we’re developing strategic partnership opportunities for corporations and brands that change everything we know about philanthropy and advocacy.'
   }
]

var tableRow = {};

$(document).ready(function(){
  $('table').tablesorter();
  tableRow = $('.directory-row').detach();
  populateTable();
});

function populateTable(){
  for(var i = 0; i < directoryData.length ; i++){
    var row = buildRow(directoryData[i]);
    $('tbody').append(row);
    $("table").trigger("update"); 
    // set sorting column and direction, this will sort on the first and third column 
    var sorting = [[2,1],[0,0]]; 
    // sort on the first column 
    $("table").trigger("sorton",[sorting]); 
  }
}

function buildRow(data){
  var newRow = tableRow.clone();
  for(var property in data){
    if (data.hasOwnProperty(property)){
      newRow.find('.'+ property).html(data[property]);
      debugger;
    }
  }
  return newRow;
}