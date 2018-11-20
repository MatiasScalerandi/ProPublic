//document.getElementById("senate_data").innerHTML = JSON.stringify(data,null,2);

/*var members = data.results[0].members.map(function(senador){
	 return "<tr><td><a href='"+senador.url+"'>"+senador.first_name+ " "+ senador.last_name+"</a></td><td>"+senador.party+"</td><td>"+senador.state+"</td><td>"+senador.seniority+"</td><td>"+senador.votes_with_party_pct+"</td></tr>"
}).join("");


document.getElementById("senate_data").innerHTML = "<tr><th>Names</th><th>Party</th><th>State</th><th>Seniority</th><th>Total Votes</th></tr>"
										 
document.getElementById("senate_data").innerHTML += members*/



var app = new Vue({  
  el: '#app',  
  data: {    
     senate :[],
	 filterSenate: [],
	 statesList: []
  }
}); 

$(function() {
	function getData (camara) { 
	
	fetch("https://api.propublica.org/congress/v1/113/"+camara+"/members.json",{
		  method: "GET",
		  headers: new Headers({
				"X-API-Key": 'ZylaIbq2XTkknA0tl7Ecyyh2bBLZJhcnTJl536d1'
			  })
		  }).then(function(response){
				 return response.json()
		  }).then(function(json){
		
		app.senate = json.results[0].members
		  
	}).then(function(){
		 app.statesList = filterOfState()
		filter()
		
	}).then(function(){ 
			checkbox()
	}).then(function(){
		all()
	}).catch(function(){
	console.log("error")
})
} 
  getData(document.getElementsByClassName("congress")[0].id)
   } )





function filter(){
	var filterMembers = [];
	var checked = Array.from(document.querySelectorAll('input[name=party]:checked')).map(elt => elt.value)
	var selected = document.getElementById("state").value
	checked.map(function(val){
		app.senate.map(function(senador){
	 		if(senador.party == val && (selected == senador.state || selected =="all")){
				filterMembers.push(senador)
			}
		})
	})
	
	app.filterSenate = filterMembers;
	

	
}

function checkbox (){
var checkbox = document.getElementsByClassName("party-checkbox")
for (i=0;i<checkbox.length; i++){
	checkbox[i].onclick = function(){
		filter()
	}
}
 }

 function all(){ 
document.getElementById("state").onchange = function(){
	filter()
}

 }


function filterOfState () { 
var listOfState = app.senate.map(function(senador){
	return senador.state 
})
var listOfStateFinal = [];
	for (i=0; i<listOfState.length;i++)
	{
		if(listOfStateFinal.indexOf(listOfState[i]) == -1)
		listOfStateFinal.push(listOfState[i]);
	}
	return listOfStateFinal.sort(); 
}


/*
function checkbox (){
var checkbox = document.getElementsByClassName("party-checkbox")
for (i=0;i<checkbox.length; i++){
	checkbox[i].onclick = function(){
		filter()
	}
}
 } 
 function all(){ 
document.getElementById("state").onchange = function(){
	filter()
}
var listOfState = data.results[0].members.map(function(senador){
	return senador.state 
})
 }


function filterOfState (listOfState) { 
var listOfStateFinal = [];
	for (i=0; i<listOfState.length;i++)
	{
		if(listOfStateFinal.indexOf(listOfState[i]) == -1)
		listOfStateFinal.push(listOfState[i]);
	}
	return listOfStateFinal; 
}


filterOfState(listOfState).sort().map(function(state){
	document.getElementById("state").innerHTML += "<option value='"+state+"'>"+state+"</option>" 
	//$("#state").append("<option>"+state+"</option>")
})

*/

/*function states(){
	var filterStates = [];
	var stateSelected = Array.from(document.querySelectorAll('select[name=state]')).map(elt => elt.value)
	all.map(function(sta){
		data.results[0].state.map(function(senador){
			if(senador.state ==sta) {
			filterStates.push(senador)
		}					  
								  })
	})
}

states()

var states = document.getElementById("state")
for (i=0;i<states.length; i++){
	states[i].onclick = function(){
		states()
	}
}
 
*/
	/*var table =filterMembers.map(function(senador){
	 return "<tr><td><a href='"+senador.url+"'>"+senador.first_name+ " "+ senador.last_name+"</a></td><td>"+senador.party+"</td><td>"+senador.state+"</td><td>"+senador.seniority+"</td><td>"+senador.votes_with_party_pct+"</td></tr>"
}).join("");*/

	//document.getElementById("senate_data").innerHTML = "<tr><th>Names</th><th>Party</th><th>State</th><th>Seniority</th><th>Total Votes</th></tr>"
										 
	//document.getElementById("senate_data").innerHTML += table