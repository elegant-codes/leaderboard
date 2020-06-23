
const tbody = document.getElementById('tbody');
getDetails = ()=> {
  fetch('leaderboard.json')
    .then(res => res.json())
    .then(data => {
      console.log(data);
      let output = '';
      //this is a function for sorting based on a particular property
      //order can be desc or asc
      function dynamicsort(property,order) {
        var sort_order = 1;
        if(order === "desc"){
            sort_order = -1;
        }
        return function (a, b){
            // a should come before b in the sorted order
            if(a[property] < b[property]){
                    return -1 * sort_order;
            // a should come after b in the sorted order
            }else if(a[property] > b[property]){
                    return 1 * sort_order;
            // a and b are the same
            }else{
                    return 0 * sort_order;
            }
        }
      }

      data.sort(dynamicsort("point","desc"));
      let rank = 0;
      data.forEach(user => {
        rank += 1;
        if(rank === 1|| rank === 2 || rank===3){
          document.getElementById(`rank${rank}`).innerHTML = `
          <h1 class="rank${rank}">${rank}</h1>
          <div class="card-content">
              <h4 class="card-title">
                  ${user.name}
              </h4>
              <p class="">${user.username}</p>
              <p class="">${user.email}</p>
              <p class=""><span class="points">${user.point} points</span></p>`
        }else{
          output += ` <tr class="table-content">
          <td>${rank}</td>
          <td>${user.name}</td>
          <td>@${user.username}</td>
          <td>peterparker@mail.com</td>
          <td  class="points">${user.point}</td>
          <td class="share-via-social">
      		<a href="#"><i class="fab fa-facebook-f icon"></i></a>
		      <a href="#"><i class="fab fa-whatsapp icon"></i></a>
		      <a href="#"><i class="fab fa-twitter icon"></i></a>
		    </td>
        </tr>`;
        }
       
      });
      tbody.innerHTML += output;
    })
    .catch(err => console.log(err));   
}

const leaderboardData = getDetails();
console.log(leaderboardData);








//ASYNC
// async function getDetails(){
//   let res = fetch ('leaderboard.json');
//   let data = (await res).json();
//   return data
// }

// let leaderboardData ;

// getDetails().then(data => leaderboardData = data);



