//document.getElementById("house_data").innerHTML = JSON.stringify(data,null,2);

var members = data.results[0].members.map(function(house)){
		return "<tr><td><a href='"+house.url+"'>"+house.first_name+ " "+ house.last_name+"</a></td><td>"+house.party+"</td><td>"+house.state+"</td><td>"+house.seniority+"</td><td>"+house.votes_with_party_pct+"</td></tr>"
}).join("");

document.getElementById("house_data").innerHTML = "<tr><th>Names</th><th>Party</th><th>State</th><th>Seniority</th><th>Total Votes</th></tr>"
										 
document.getElementById("house_data").innerHTML += members
										 