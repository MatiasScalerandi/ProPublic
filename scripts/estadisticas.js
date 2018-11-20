

var app = new Vue({  
  el: '#app',  
  data: { 
	  senate: [],
     numeroDemocratas: 0,
	numeroRepublicanos: 0,
	numeroIndependents: 0,
	numeroTotal: 0,
	votosDemocratas: 0,
	votosRepublicanos: 0,
	votosIndependents: 0,
	votosTotal: 0,
	leastEngaged: [],
	mostEngaged: [],
	leastLoyal: [],
	mostLoyal: [],
	
  }
});

$(function() {
	
	function getData(camara){ 
	
	fetch("https://api.propublica.org/congress/v1/113/"+camara+"/members.json",{
		  method: "GET",
		  headers: new Headers({
				"X-API-Key": 'ZylaIbq2XTkknA0tl7Ecyyh2bBLZJhcnTJl536d1'
			  })
		  }).then(function(response){
				 return response.json()
		  }).then(function(json){
		
		app.senate = json.results[0].members
		estadisticas()
	}).catch(function(){
	console.log("error")
})
	}
	
	getData(document.getElementsByClassName("congress")[0].id)
})


/*var estadisticas = {
	numeroDemocratas: 0,
	numeroRepublicanos: 0,
	numeroIndependents: 0,
	numeroTotal: 0,
	votosDemocratas: 0,
	votosRepublicanos: 0,
	votosIndependents: 0,
	votosTotal: 0,
	leastEngaged: [],
	mostEngaged: [],
	leastLoyal: [],
	mostLoyal: [],
	
	
}*/
function estadisticas(){

app.senate.forEach(function(senador){
	if(senador.party == "D"){
		app.numeroDemocratas ++
	} else if(senador.party == "R"){
		app.numeroRepublicanos ++
	} else if(senador.party == "I"){
		app.numeroIndependents ++
	} 
})

app.numeroTotal = app.senate.length

function votosPorPartido(party){
	var sumaVotos= 0
	app.senate.forEach(function(senador){
		if(senador.party == party){
			sumaVotos += senador.votes_with_party_pct
		}
	})
	
	return sumaVotos
	
		
	
}

app.votosDemocratas = votosPorPartido("D")/app.numeroDemocratas

app.votosRepublicanos = votosPorPartido("R")/app.numeroRepublicanos

app.votosIndependents = votosPorPartido("I")/app.numeroIndependents

app.votosTotal = (votosPorPartido("D") + votosPorPartido("R") + votosPorPartido("I")) /app.numeroTotal

function leastLoyal(members){
	var porcentaje = parseInt(members.length * 0.1)
	var miembrosOrdenados = members.sort(function(a,b){
		var votosA = a.votes_with_party_pct
		var votosB = b.votes_with_party_pct
		return votosA - votosB
	})
	return miembrosOrdenados.slice(0, porcentaje)
} 

app.leastLoyal = leastLoyal(app.senate);

function mostLoyal(members){
	var porcentaje = parseInt(members.length * 0.1)
	var miembrosOrdenados = members.sort(function(a,b){
		var votosB = b.votes_with_party_pct
	    var votosA = a.votes_with_party_pct
		return votosB - votosA
	})
	return miembrosOrdenados.slice(0, porcentaje)
}
app.mostLoyal = mostLoyal(app.senate);
		
function leastEngaged(members){
	var porcentaje = parseInt (members.length * 0.1)
	var miembrosOrdenados = members.sort(function(a,b){
		var votosA = a.missed_votes_pct
		var votosB = b.missed_votes_pct
		return votosB - votosA
	})
	return miembrosOrdenados.slice(0, porcentaje)
}
app.leastEngaged = leastEngaged(app.senate);

function mostEngaged(members) {
	var porcentaje = parseInt (members.length * 0.1)
	var miembrosOrdenados = members.sort(function(a,b){
		var votosA = a.missed_votes_pct
		var votosB = b.missed_votes_pct
		return votosA - votosB
	})
	return miembrosOrdenados.slice(0, porcentaje)
}

app.mostEngaged = mostEngaged(app.senate);

}
/*document.getElementById("at_glance").innerHTML= "<tr><th>Party</th><th>No. of Reps.</th><th>% Voted w/ Party</th></tr><tr><td>Democrats</td><td>"+app.numeroDemocratas+"</td><td>"+app.votosDemocratas+"</td></tr><tr><td>Republicans</td><td>"+app.numeroRepublicanos+"</td><td>"+app.votosRepublicanos+"</td></tr><tr><td>Independents</td><td>"+app.numeroIndependents+"</td><td>"+app.votosIndependents+"</td></tr><tr><td>Total</td><td>"+app.numeroTotal+"</td><td>"+app.votosTotal+"</td></tr>"




if (document.getElementById("least_engaged") != null){
	document.getElementById("least_engaged").innerHTML="<tr><th>Name</th><th>No. Party Votes</th><th>% Party Votes</th></tr>" + app.leastEngaged.map(function(senador){
	return "<tr><td><a href='"+senador.url+"'>"+senador.first_name+" "+senador.last_name+"</a></td><td>"+senador.total_votes+"</td><td>"+senador.votes_with_party_pct+"</td></tr>"
}).join("")
}

if(document.getElementById("most_engaged") != null){
	document.getElementById("most_engaged").innerHTML="<tr><th>Name</th><th>No. Party Votes</th><th>% Party Votes</th></tr>" + app.mostEngaged.map(function(senador){  
	return"<tr><td><a href='"+senador.url+"'>"+senador.first_name+" "+senador.last_name+"</a></td><td>"+senador.total_votes+"</td><td>"+senador.votes_with_party_pct+"</td></tr>"
																				  }).join("")
}



if(document.getElementById("least_loyal") != null){ 
document.getElementById("least_loyal").innerHTML= "<tr><th>Name</th><th>No. Party Votes</th><th>% Party Votes</th></tr>" + app.leastLoyal.map(function(senador)
{ return "<tr><td><a href='"+senador.url+"'>"+senador.first_name+" "+senador.last_name+"</a></td><td>"+senador.total_votes+"</td><td>"+senador.votes_with_party_pct+"</td></tr>"
}).join("")  }

if(document.getElementById("most_loyal") != null) { 

document.getElementById("most_loyal").innerHTML= "<tr><th>Name</th><th>No. Party Votes</th><th>% Party Votes</th></tr>" + app.leastLoyal.map(function(senador)
{ return "<tr><td><a href='"+senador.url+"'>"+senador.first_name+" "+senador.last_name+"</a></td><td>"+senador.total_votes+"</td><td>"+senador.votes_with_party_pct+"</td></tr>"
}).join("")
	  }
	*/







	
	
	
	


