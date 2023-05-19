/**
 
 * Created By  Anurag Sharma

 **/

let app = angular.module("myApp", []);
app.controller("postServiceCtrl", function ($scope, $http, $window) {

  $scope.postdata = function (usernameOrEmail, password) {
    // Creating Service
    let UName = document.getElementById(usernameOrEmail).value;
    let UPassword = document.getElementById(password).value;
    // let showerror = document.getElementById(errori);
    let IsError = true;
    if (UName === "") {
      return IsError = false;
    }
    if (UPassword === "") {
      return IsError = false;
    }


    let data = {
      username: UName,
      password: UPassword
    }
    // Call service
    if (IsError) {
      $http.post("http://localhost:8080/api/auth/signin", JSON.stringify(data))

        .then(
          // success callback

          function (response) {
            localStorage.setItem("someData", JSON.stringify(response.data))
            // authentication

            $window.location.href = 'Dashboard.html';
            let temp = response.data.username;
            console.log(response);
            // save token in cookis
            let token = response.data.accessToken;
            document.cookie = "access_token=" + token;
            localStorage.setItem("token", token);
            document.getElementById('errori').innerHTML = "Login Success"

            //   

          },
          // error callback 
          function (response) {
            console.log(response.data);

            let output =
              `
          <div class="alert alert-danger" role="alert">
          ${response.data.Message}
              <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
  </div>
          `
            document.getElementById('alert').innerHTML = output;
          }

        );
    }
  }
})
/////////////////////////////////////////////////////////////////////////



// Set name on dash baord 

let dashbaord = angular.module("dashbaord", []);
dashbaord.controller("dashbaordctrl", function ($scope, $http, $window) {

  // authentication
  var auth = localStorage.getItem("token");
  if (!auth) {
    $window.location.href = 'login.html';
  }

  // SET TIME
  var d = new Date();
  let n = d.toLocaleTimeString();
  document.getElementById('time').innerHTML = n
  // add food API


  // var url = document.location.search
  let UserName = JSON.parse(localStorage.getItem("someData"));
  $scope.username = UserName.username;
  console.log(UserName);


  $scope.addfood = function (foodnamee, foodtype, frate, ficon) {
    // Creating Service
    let foodname = document.getElementById(foodnamee).value;
    let foodtypee = document.getElementById(foodtype).value;
    let foodrate = document.getElementById(frate).value;
    // let foodicon = document.getElementById(ficon).value;
    // let error = document.getElementById('errorid')


    let data = {
      food_name: foodname,
      food_type: foodtypee,
      rate: foodrate
      // food_icon:foodicon
    }

    // Call service
    let token = localStorage.getItem("token");
    $http.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    $http.post("http://localhost:8080/api/auth/addfood", JSON.stringify(data))

      .then(
        // success callback
        function (response) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Food Added SuccesFully',
            showConfirmButton: false,
            timer: 2500
          })
          console.log("heloo", someData)
          let temp = response.data.username;
          console.log("hello", temp);
          // $window.location.href = '/Dashboard.html?'+temp;


        },

        // error callback
        function (response) {
          console.log("error - saved comment", response);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: '<a href="">Why do I have this issue?</a>'
          })

        }
      );

  }

  // Api To set History
  fetch("http://localhost:8080/api/auth/history").then(
    res => {
      res.json().then(
        data => {
          console.log("Hiii", data);
          if (data.length > 0) {

            var temp = "";
            data.forEach((itemData) => {
              temp += "<tr>";
              temp += "<td>" + itemData.order_id + "</td>";
              // temp += "<td>" + itemData.table_no + "</td>";
              // temp += "<td>" + '<a href="data-toggle="modal" data-target="#exampleModal" data-whatever="@fat"">'+itemData.table_no+'</a>' + "</td>";
              temp += "<td> <a <button type ='button' id=" + itemData.table_no + " onclick='updatee(" + itemData.table_no + ")'  data-toggle='modal' data-target='.bd-example-modal-lg'/>" + itemData.table_no + "</button></td>";
              // temp += "<td>  <button type ='button'   id=" + itemData.table_no + " onclick='updatee(" + itemData.table_no + ")  data-toggle='modal' data-target='#exampleModal' data-whatever='@fat'/>" + itemData.table_no + "</button></td>";
              temp += "<td>" + itemData.total_payment + "</td>";
              temp += "<td>" + itemData.created_date + "</td>";
              temp += "<td>" + itemData.wiater_name + "</td>";

            });
            document.getElementById('dhistory').innerHTML = temp;
          }
        }
      )
    }
  )

})


// function updatee(id) {


// }
/////////////////////////////////////////////////////////////////////////


// Settings API
// Add Table
let setting = angular.module("tables", []);
setting.controller("tablectrl", function ($scope, $http, $window) {


  // authentication
  var auth = localStorage.getItem("token");
  if (!auth) {
    $window.location.href = 'login.html';
  }
  $scope.sentdata = function (areaf, table_numberf, sittingf) {
    // Creating Service
    let tarea = document.getElementById(areaf).value;
    let tno = document.getElementById(table_numberf).value;
    let tsitting = document.getElementById(sittingf).value;




    let data = {
      area: tarea,
      table_no: tno,
      of_sitting: tsitting
    }
    // Call service
    let token = localStorage.getItem("token");
    $http.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    $http.post("http://localhost:8080/api/auth/addTable", JSON.stringify(data))

      .then(
        // success callback
        function (response) {
          let output2 =
            `
          <div class="alert alert-success" role="alert">
                   TAble Added SuccesFull
                   <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                   <span aria-hidden="true">&times;</span>
                 </button>
          </div>
          `
          document.getElementById('alerttabl').innerHTML = output2;
          console.log("heloo", someData)
          let temp = response.data.username;
          console.log("hello", temp);
          // $window.location.href = '/Dashboard.html?'+temp;


        },

        // error callback
        function (response) {
          // console.log("error - saved comment", response);
          let output =
            `
            <div class="alert alert-danger" role="alert">
           Somethis is Went Wrong Please try more..
           <button type="button" class="close" data-dismiss="alert" aria-label="Close">
           <span aria-hidden="true">&times;</span>
         </button>
            </div>
            `
          document.getElementById('alerttabl').innerHTML = output;

        }
      );

  }
  //  -----------------------------------------------------------------------------------------------


  // (2)
  // Integrate API for Get Roles 
  const batchTrack = document.getElementById("batchSelect");
  console.log({ batchTrack });
  const getPost = async () => {
    const response = await fetch("http://localhost:8080/api/auth/GetRole");
    const data = await response.json();
    console.log(data)
    return data;
  };

  const displayOption = async () => {
    const options = await getPost();
    for (option of options) {
      const newOption = document.createElement("option");
      newOption.text = option.name;
      batchTrack.appendChild(newOption);
    }
  };
  displayOption();

  //  --------------------------------------------------------------------------------------------------


  // // validation
  // const validateEmail = (emaildd) => {
  //   return emaildd.match(
  //     /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  //   );
  // };

  // const validate = () => {
  //   const $result = $('#result');
  //   const email = $('#emaildd').val();
  //   $result.text('');

  //   if (validateEmail(email)) {
  //    return true;

  //   } else {
  //     $result.text('* is not valid :(');
  //     $result.css('color', 'red');
  //   }
  //   return false;
  // }

  // $('#emaildd').on('input', validate);


  // -------------------------------------------------------------------------------------------------------

  // APi For Save User

  $scope.saveuser = function (username, batchSelect, emaildd, pnoid, countryid, cityid, shiftid, pass) {
    // Creating Service
    let Uname = document.getElementById(username).value;
    let uroles = document.getElementById(batchSelect).value;
    let Uemail = document.getElementById(emaildd).value;
    let uphone = document.getElementById(pnoid).value;
    let Ucountry = document.getElementById(countryid).value;
    let Ucity = document.getElementById(cityid).value;
    let Ushift = document.getElementById(shiftid).value;
    let upass = document.getElementById(pass).value;

    let emailid = document.getElementById(emaildd).value



    let IsError = true;
    if (Uname === "" || Uemail === "" || uphone === "" || Ucountry === "" || Ucity === "" || Ushift === "" || Ucity === "") {
      return IsError = false;
    }


    let data = {
      username: Uname,
      role: [uroles],
      email: Uemail,
      phone: uphone,
      country: Ucountry,
      city: Ucity,
      shift: Ushift,
      password: upass

    }
    const spinner = document.getElementById("spinner");

    // Call service
    if (IsError) {
      spinner.removeAttribute('hidden', '');
      $http.post("http://localhost:8080/api/auth/signup", JSON.stringify(data))

        .then(
          // success callback

          function (response) {
            console.log(response);

            let msg = response.data.message;
            spinner.setAttribute('hidden', '');
            let output =
              `
        <div class="alert alert-success" role="alert">
        ${response.data.message}
       <button type="button" class="close" data-dismiss="alert" aria-label="Close">
       <span aria-hidden="true">&times;</span>
     </button>
        </div>
        `
            document.getElementById('success').innerHTML = output;
            // $('#myform')[0].reset();
          },

          // error callback 
          function (response) {
            console.log(response.data);
            let msg2 = response.data.message;

            let output =
              `
            <div class="alert alert-danger" role="alert">
            ${response.data.message}
           <button type="button" class="close" data-dismiss="alert" aria-label="Close">
           <span aria-hidden="true">&times;</span>
         </button>
            </div>
            `
            document.getElementById('success').innerHTML = output;
            spinner.setAttribute('hidden', '');
            // spinner.setAttribute('hidden');
            // $('#myform')[0].reset();
          }

        );
    }

  }

  // Show all user API   http://localhost:8080/api/auth/getuser <i class="fa-solid fa-pen-to-square"></i>

  fetch("http://localhost:8080/api/auth/getuser").then(
    res => {
      res.json().then(
        data => {
          console.log("Hiii", data);
          if (data.length > 0) {

            var temp = "";
            data.forEach((itemData) => {
              temp += "<tr>";
              temp += "<td>" + itemData.id + "</td>";
              temp += "<td>" + itemData.username + "</td>";
              temp += "<td>" + itemData.email + "</td>";
              temp += "<td>" + itemData.phone + "</td>";
              temp += "<td>" + itemData.shift + "</td>";
              temp += "<td>" + itemData.roles[0].name + "</td>";
              temp += "<td class='btn'> <button type ='button' id=" + itemData.id + " onclick='update(" + itemData.id + ")' class='btn btn-info myBtn' data-toggle='modal' data-target='#exampleModal' data-whatever='@fat'/>" + "Update" + "</button></td>";

            });
            document.getElementById('data').innerHTML = temp;
          }
        }
      )
    }
  )

  // Api To set History
  fetch("http://localhost:8080/api/auth/history").then(
    res => {
      res.json().then(
        data => {
          console.log("Hiii", data);
          if (data.length > 0) {

            var temp = "";
            data.forEach((itemData) => {
              temp += "<tr>";
              temp += "<td>" + itemData.order_id + "</td>";
              temp += "<td>" + itemData.table_no + "</td>";
              temp += "<td>" + itemData.total_payment + "</td>";
              temp += "<td>" + itemData.created_date + "</td>";
              temp += "<td>" + itemData.wiater_name + "</td>";

            });
            document.getElementById('history').innerHTML = temp;
          }
        }
      )
    }
  )
})

// API FOR SET data in Update Form 
function update(id, $http, $scope) {

  fetch(`http://localhost:8080/api/auth/getuser/${id}`)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log("hiiii", data);
      // This is an array so we have to loop through it
      document.getElementById("shift").value = data.shift;
      document.getElementById("uid").value = data.id;
      document.getElementById("phonenum").value = data.phone;
      document.getElementById("uemail").value = data.email;

    });

  // Update User
  //     $http.put("http://localhost:8080/api/auth/updateuser/"+ id, JSON.stringify(data))

  //     .then(
  //       // success callback

  //       function (response) {
  //         console.log(response);
  //         // $window.location.href = '/login.html
  //         let output =
  //           `
  // <div class="alert alert-success" role="alert">
  // Update SuccesFull
  // <button type="button" class="close" data-dismiss="alert" aria-label="Close">
  // <span aria-hidden="true">&times;</span>
  // </button>
  // </div>
  // `
  //         document.getElementById('update').innerHTML = output;
  //       },

  //       // error callback 
  //       function (response) {
  //         console.log(response.data);
  //         let output =
  //           `
  // <div class="alert alert-danger" role="alert">
  // ${response.data.message}
  // <button type="button" class="close" data-dismiss="alert" aria-label="Close">
  // <span aria-hidden="true">&times;</span>
  // </button>
  // </div>
  // `
  //         document.getElementById('alerttabl').innerHTML = output;

  //       }

  //     );
  debugger;
  function updateuser(uemail, phonenum, shift) {
    // Creating Service
    let email = document.getElementById(uemail).value;
    let mno = document.getElementById(phonenum).value;
    let sift = document.getElementById(shift).value;

    // User Data
    let data = {
      email: email,
      shift: sift,
      phone: mno
    }
    debugger;
    // Call service
    fetch('http://localhost:8080/api/auth/adddata', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    })
      .then()
      .then()
      .catch(error => console.error('Error:', error));
  };

  // Show History API 



}

/////////////////////////////////////////////////////////////////////////

// Show tablesl

let showtabl = angular.module("showtables", []);
showtabl.controller("showtblcontrl", function ($scope, $http, $window) {


  // authentication
  var auth = localStorage.getItem("token");
  if (!auth) {
    $window.location.href = 'login.html';
  }

  fetch('http://localhost:8080/api/auth/showtables')
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log(data);
      // This is an array so we have to loop through it

      let output = '';
      debugger;
      data.forEach(function (character) {
        output += `
  
  
      <div class="col-3 mt-3">
  
    <div class="col">
    <div class="card cardtt" id="${character.id}"  text-center border-0" onclick="tablebyid(${character.id})">
    <div id="img${character.id}" class="mtimg"> <img class="image1" src="image/restro/waiter copy 5.png" height="35px" width="35px" alt=""></div>
    <small id="tid">${character.id}</small>
      <h6 class="" id="tableno">
      TABLE #${character.table_no}
      </h6>
     
    <div class="data imgwname " id="imgwname" ,character.waiter_name ><img src="image/restro/waiter.png" height="15px" width="15px" alt=""> ${character.waiter_name == null ? "" : character.waiter_name}</div>
     
    </div>
  
      <div class="card shadow-sm">
      </div>
    </div>
    </div>
   
    `;
        let table_status = character.table_status;
        console.log("Helooooo", table_status);
        if (table_status == true) {
          // $(".image1").attr("src","empty green.png");
        }
      });

      document.getElementById('output').innerHTML = output;
      console.log(document.getElementsByClassName('row').length);


      let cards = document.querySelectorAll('.card');

      for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener('click', event => {
          console.log("Hello", event);
        });

      }

    })
    .catch(function (err) {
      console.log(err);
    });



  // API For Fetch Data of Table Details
  // Show terrace

  fetch('http://localhost:8080/api/auth/terracedtls')
    .then(data => {
      if (!data.ok) {
        throw Error(data.status);
      }
      return data.json();
    }).then(update => {
      document.getElementById('terrace').innerHTML = update
      // {
      //

      // };
    }).catch(e => {
      console.log(e);
    });


  // Show lawn

  fetch('http://localhost:8080/api/auth/lawndtls')
    .then(data => {
      if (!data.ok) {
        throw Error(data.status);
      }
      return data.json();
    }).then(update => {
      document.getElementById('lawn').innerHTML = update
      // {
      //

      // };
    }).catch(e => {
      console.log(e);
    });


  // Show Garden

  fetch('http://localhost:8080/api/auth/gardendtls')
    .then(data => {
      if (!data.ok) {
        throw Error(data.status);
      }
      return data.json();
    }).then(update => {
      document.getElementById('garden').innerHTML = update
      // {
      //

      // };
    }).catch(e => {
      console.log(e);
    });


  // Show Empty

  fetch('http://localhost:8080/api/auth/empty')
    .then(data => {
      if (!data.ok) {
        throw Error(data.status);
      }
      return data.json();
    }).then(update => {
      document.getElementById('empty').innerHTML = update
      // {
      //

      // };
    }).catch(e => {
      console.log(e);
    });


  // Show Occupied

  fetch('http://localhost:8080/api/auth/occupied')
    .then(data => {
      if (!data.ok) {
        throw Error(data.status);
      }
      return data.json();
    }).then(update => {
      document.getElementById('occupied').innerHTML = update
      // {
      //

      // };
    }).catch(e => {
      console.log(e);
    });


  // Show terrace

  fetch('http://localhost:8080/api/auth/all')
    .then(data => {
      if (!data.ok) {
        throw Error(data.status);
      }
      return data.json();
    }).then(update => {
      document.getElementById('reserved').innerHTML = update
      // {
      //

      // };
    }).catch(e => {
      console.log(e);
    });

  // Add Guest Info API.......****


  $scope.guestsave = function (adults, childs, tablno, tblaria, wname, tableId) {
    // Creating Service
    debugger;
    let gadults = document.getElementById(adults).value;
    let gchilds = document.getElementById(childs).value;
    let gtableno = document.getElementById(tablno).value;
    let gtableara = document.getElementById(tblaria).value;
    let gwname = document.getElementById(wname).value;
    let table_Id = document.getElementById(tableId).value;


    // let showerror = document.getElementById(errori);

    let IsError = true;
    if (gadults === "" || gchilds === "" || gtableno === "" || gtableara === "" || gwname === "") {
      return IsError = false;
    }

    let data = {
      adults: gadults,
      childs: gchilds,
      table_num: gtableno,
      area: gtableara,
      waiter_name: gwname,
      table_id: table_Id

    }
    // Call service
    if (IsError) {
      $http.post("http://localhost:8080/api/auth/Saveguest", JSON.stringify(data))

        .then(
          // success callback

          function (response) {
            console.log("Hello", response);

            $window.location.href = 'foods.html?table_id=' + response.data.id + '&order_id=' + response.data.OrderId;

            let output =
              `
            <div class="alert alert-success" role="alert">
            Guest Details Submited SuccessFully
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
    </div>
            `
            document.getElementById('successb').innerHTML = output;
          },
          // error callback 
          function (response) {
            console.log(response.data);

            let output =
              `
              <div class="alert alert-danger" role="alert">
             Something is Went Wrong
                  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
      </div>
              `
            document.getElementById('successb').innerHTML = output;
          }

        );
    }
  }

}
);

// For change icon
window.onload = function demo() {
  console.log("Helloo");
  let len = document.getElementsByClassName('cardtt').length;
  for (let i = 0; i < len; i++) {
    let waiterName = document.getElementsByClassName('cardtt')[i].childNodes[7].innerText;

    if (waiterName == '') {
      console.log('Fail');
      document.getElementsByClassName('cardtt')[i].childNodes[1].childNodes[1].src = 'image/restro/waiter copy 5.png';
    }
    else {
      console.log('Pass');
      document.getElementsByClassName('cardtt')[i].childNodes[1].childNodes[1].src = 'image/restro/empty green.png';
    }
  }
  //If waiter name not exists
  // console.log(document.getElementsByClassName('cardtt')[0].childNodes[1].childNodes[1].src);
}
// ------------------------------------------------------------------------------------------------------------------------------


// Show Foods API
let showfood = angular.module("showfoods", []);
showfood.controller("foodscntrl", function ($scope, $http, $window) {

  var auth = localStorage.getItem("token")

  if (!auth) {
    $window.location.href = 'login.html';
  }

  fetch('http://localhost:8080/api/auth/showfoods')
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log(data);
      // This is an array so we have to loop through it
      let output = '';

      data.forEach(function (character) {
        output += `


    <div class="col-3 mt-3">

  <div class="col">
  <div class="card" id="cardshowtbl" onclick="Addfood(${character.food_id})" text-center border-0" data-toggle="modal" data-target="#modalContactForm">
 <div id="img" class="mt image2"> <img  src="image/restro/waiter copy 5.png" height="35px" width="35px" alt=""></div>
 <small id="fid">${character.food_id}</small>
    <h6 class="" id="foodid">
    ${character.food_name}
    </h6>
  </div>

    <div class="card shadow-sm">
    </div>
  </div>
  </div>
 
  `;
      });
      document.getElementById('output').innerHTML = output;

    })
    .catch(function (err) {
      console.log(err);
    });


})


// function convertToArray(){
//   var convertedIntoArray = [];
//   debugger;
//    $("#geoTable tr").each(function() {
//       var rowDataArray = [];
//       var actualData = $(this).find('td');
//       debugger;
//       if (actualData.length > 0) {
//          actualData.each(function() {
//             rowDataArray.push($(this).text());

//          });
//          debugger;
//          let id = "TD"+rowDataArray[0];
//             var value = parseInt(document.getElementById(id).value, 10);
//             rowDataArray.splice(3, 0,value);
//             rowDataArray.pop();
//          convertedIntoArray.push(rowDataArray);
//       }
//    });
//    console.log(convertedIntoArray);
//    const array = convertedIntoArray
//     var arrayToString = JSON.stringify(Object.assign({}, array));  // convert array to string
//     var stringToJsonObject = JSON.parse(arrayToString);  // convert string to json object
//     console.log(stringToJsonObject);
//   }



// gnout API CAll
function signout($window) {
  localStorage.clear();
  window.setTimeout(function () {
    window.location.reload();
  });
  $window.location.href = '/login.html';
}


// API FOR SET TABLENO AND AREA 

function tablebyid(id) {
  fetch(`http://localhost:8080/api/auth/table/${id}`)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log(data);
      // This is an array so we have to loop through it
      let output = '';
      debugger;
      document.getElementById("tblaria").value = data.area;
      document.getElementById("tablno").value = data.table_no;
      document.getElementById("tableID").value = data.id;
      let tableno = data.table_no;
      let witrname = data.waiter_name;
      console.log("annu", tableno);
      document.getElementById('tableno2').textContent = tableno;
      document.getElementById('waitername').textContent = witrname;
    });



  // Cheak waiters existancy
  // And open modal form when waiter not exist
  const waiterExist = document.getElementById(id).childNodes[7].innerText;
  console.log("Hello", waiterExist);
  if (waiterExist == '') {
    document.getElementById(id).setAttribute("data-toggle", "modal");
    document.getElementById(id).setAttribute("data-target", "#exampleModal");
    document.getElementById(id).setAttribute("data-whatever", "@fat");
    document.getElementById(c2nd).style.display = "none"
  }

  var htmlShow1 = document.getElementById("c2nd");
  var htmlShow2 = document.getElementById("1st");
  if (htmlShow1.style.display === "none") {
    htmlShow1.style.display = "block";
    htmlShow2.style.display = "none";


  } else {
    htmlShow1.style.display = "none";
    htmlShow2.style.display = "block";
  }
  // Show food for invoice
  debugger;
  fetch(`http://localhost:8080/api/auth/getfdata/${id}`).then(
    res => {
      res.json().then(
        response => {

          console.log(response);
          if (response.length > 0) {

            var temp = "";
            response.forEach((foods) => {
              temp += "<tr>";
              temp += "<td>" + foods.t_foodname + "</td>";
              temp += "<td>" + foods.t_fooftype + "</td>";
              temp += "<td>" + foods.t_qty + "</td>";
              temp += "<td>" + foods.t_rate + "</td>";
            });
            document.getElementById('response').innerHTML = temp;
          }
          var arr = response
          var newObj = arr.reduce((a, b) => Object.assign(a, b), {})
          let tid = newObj.t_teble_id;
          let tempid = newObj.temp_id;
          let orderid = newObj.order_id;
          document.getElementById('tableidd').value = tid
          document.getElementById('tempidd').value = tempid
          document.getElementById('orderidd').value = orderid
          console.log(newObj)
        }
      )
    }
  )

  // Add sum  of row
  var table = document.getElementById("response"), sumVal = 0;

  for (var i = 0; i < table.rows.length; i++) {
    sumVal = sumVal + parseInt(table.rows[i].cells[3].innerHTML * parseInt(table.rows[i].cells[2].innerHTML));
  }

  document.getElementById("invoicetotal").value = "Total Payment : $" + sumVal;
  console.log(sumVal);

  // Redirect from foods with pramameter orderID and TempID
  document.getElementById("myButton").onclick = function (tid, tempidd, orderidd) {
    window.location.href = "foods.html?orderid=" + orderidd + '&tempid=' + tempidd;

  };
}


debugger;

// Api to null waiter in tables  table
function doneorder() {

  let tbaleid = document.getElementById('tableidd').value
  console.log("Helllooo", tbaleid);
  let OEDERID = document.getElementById('orderidd').value


  const url = "http://localhost:8080/api/auth/utable/" + tbaleid;
  var headers = {}

  fetch(url, {
    method: "PUT",
    mode: 'cors',
    headers: headers,

  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.error)
      }
      return response.json();

    })
    .then(data => {
      document.getElementById('messages').value = data.messages;
      $window.location.href = 'login.html';
    })
    .catch(function (error) {
      document.getElementById('messages').value = error;
    });


  // Delete Request for temp table 
  const urll = "http://localhost:8080/api/auth/Deletetdata/" + OEDERID;
  var headers = {}

  fetch(urll, {
    method: "DELETE",
    mode: 'cors',
    headers: headers,

  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.error)
      }
      return response.json();

    })
    .then(data => {
      document.getElementById('messages').value = data.messages;
    })
    .catch(function (error) {
      document.getElementById('messages').value = error;
    });

}


// Api to set total payment in orderdataa
function updatepayment() {
  let total_payment = document.getElementById('invoicetotal').value
  console.log(total_payment);
  let totalp = total_payment
  let result = totalp.substring(17);
  console.log(result);
  let oreder_id = document.getElementById('orderidd').value;
  console.log(oreder_id);


  debugger;
  let data = {
    total_payment: result
  }
  debugger;
  // Call service
  fetch('http://localhost:8080/api/auth/updatepayment/' + oreder_id, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    }
  })
    .then(function (res) {
      debugger;
      return res.json();
    })
    .then(function (data) {
      console.log(data);
    })
};


// update password controller 
// First cheak the token

let updatepass = angular.module("password", []);
updatepass.controller("updatepasscntl", function ($scope, $http, $window) {


  let passlength = false;
  var minLength = 5;
  var maxLength = 16;
  $(document).ready(function () {
    $('#pass1').on('keydown keyup change', function () {
      var char = $(this).val();
      var charLength = $(this).val().length;
      if (charLength < minLength) {
        $('#divCheckPasswordMatch').text('Length is short, minimum ' + minLength + ' required.');
      } else if (charLength > maxLength) {
        $('#divCheckPasswordMatch').text('Length is not valid, maximum ' + maxLength + ' allowed.');
        $(this).val(char.substring(0, maxLength));
      } else {
        $('#divCheckPasswordMatch').text('');
        passlength = true;
      }
    });
  });



  let passmatch = false;
  $('#pass1, #pass2').on('keyup', function () {
    if ($('#pass1').val() == $('#pass2').val()) {
      $('#divCheckPasswordMatch').html('').css('color', 'red');
      return passmatch = true;
    }
    else
      $('#divCheckPasswordMatch').html('*Passwords do not match').css('color', 'red');
  });


  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const token = urlParams.get('token')
  console.log(token);
  let Upass1 = document.getElementById(pass1)
  let Upass2 = document.getElementById(pass2)
  let IsVerify = false;

  let IsError = true;
  if (Upass1 === "" || Upass2 === "") {
    return IsError = false;
  }
  if (IsError) {
    $http.post(`http://localhost:8080/api/auth/cheaktoken/${token}`)

      .then(
        // success callback

        function (response) {
          console.log(response);
          IsVerify = true;
        },

        // error callback 
        function (response) {
          console.log(response.data);
          let msg2 = response.data.message;
          IsVerify = false;
          $window.location.href = 'login.html';
        }

      );
  }
  // validation end

  $scope.updatepass = function (pass1, pass2) {
    // Creating Service
    let Upass1 = document.getElementById(pass1).value;
    let Upass2 = document.getElementById(pass2).value;
    let passcheak = false

    var pass1 = document.getElementById(pass1).value;
    var pass2 = document.getElementById(pass2).value;
    if (pass1 === pass2) {
      passcheak = true
      console.log("password match success")
    }


    let IsError = true;
    if (Upass1 === "" || Upass2 === "") {
      return IsError = false;
    }


    let data = {
      password: Upass1
    }

    debugger;
    // Call service
    if (IsVerify) {
      if (IsError) {
        if (passcheak) {
          if (passmatch) {
            $http.put("http://localhost:8080/api/auth/pass/" + token, JSON.stringify(data))

              .then(
                // success callback

                function (response) {
                  console.log(response);
                  // $window.location.href = '/login.html'
                  $window.location.href = 'Welcome.html?uname=' + response.data.username;
                  let output =
                    `
          <div class="alert alert-success" role="alert">
          Password Created SuccessFull
         <button type="button" class="close" data-dismiss="alert" aria-label="Close">
         <span aria-hidden="true">&times;</span>
       </button>
          </div>
          `
                  document.getElementById('alerttabl').innerHTML = output;
                },

                // error callback 
                function (response) {
                  console.log(response.data);
                  let output =
                    `
          <div class="alert alert-danger" role="alert">
          ${response.data.message}
         <button type="button" class="close" data-dismiss="alert" aria-label="Close">
         <span aria-hidden="true">&times;</span>
       </button>
          </div>
          `
                  document.getElementById('alerttabl').innerHTML = output;
                }

              );
          }
        }
      }
    }
    else {
      $window.location.href = 'login.html';
    }

  }
})

// API FOR SET food data in grid 


function Addfood(food_id) {

  fetch(`http://localhost:8080/api/auth/food/${food_id}`)

    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log(data);
      // This is an array so we have to loop through it
      let output = '';
      debugger;
      appendTableRow('geoTable', data.food_name, data.food_type, data.rate);
    });
}


function appendTableRow(tableName, name, unit, rate, $http) {

  let PTotal = 0;

  tableName = "#" + tableName;
  //<tr><td>name</td><td>value</td></tr>
  let result = name.replaceAll(' ', '');

  var tableRow = "<tr id=" + result + "> <td>$name <p  id=tempid" + name + " '>$tempfoodid</p> </td> <td>$unit</td> <td>$rate</td> <td id='TD" + result + rate + "'> <input type=button onclick='decrementValue(TD" + result + "," + rate + "," + name + " )' value='-' /><input type='text' class='auto' id=" + "TD" + result + " name='quantity' value='1' maxlength='2' max='10' size='1'  /><input type='button' onclick='incrementValue(TD" + result + "," + rate + "," + name + ")' value='+' /> <button type=button class='btnDelete' value=''> <i class='fa fa-trash' aria-hidden='true'></i> $qty</td></tr>";
  tableRow = tableRow.replace("$name", name);
  tableRow = tableRow.replace("$unit", unit);
  tableRow = tableRow.replace("$rate", rate);
  tableRow = tableRow.replace("$qty", '');

  debugger;

  var temId = "";
  // update record
  if ($("#" + result + "").length) {
    var a = document.getElementById('TD' + result).value;
    a = parseInt(a) + 1;
    document.getElementById('TD' + result).value = a;
    PTotal = PTotal + rate;
    let LastTotal = (document.getElementById('productTotal').value);
    if (LastTotal == "") {
      LastTotal = 0;
    }
    document.getElementById('productTotal').value = parseInt(LastTotal) + PTotal;
    debugger;
    let id = "TD" + result;
    var value = parseInt(document.getElementById(id).value, 10);
    document.getElementById('TD' + result + rate).value = value;

  }
  else {
    //Insert into temp table api 
    $(tableName).append(tableRow);
    PTotal = PTotal + rate;
    let LastTotal = (document.getElementById('productTotal').value);
    if (LastTotal == "") {
      LastTotal = 0;
    }
    document.getElementById('productTotal').value = parseInt(LastTotal) + PTotal;
    debugger;
    let id = "TD" + result;
    var value = parseInt(document.getElementById(id).value, 10);
    document.getElementById('TD' + result + rate).value = value;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const tableid = urlParams.get('table_id')
    const order_id = urlParams.get('order_id')

    debugger;
    let data = {
      t_foodname: name,
      t_fooftype: unit,
      t_qty: '1',
      t_rate: rate,
      t_teble_id: tableid,
      order_id: order_id

    }
    debugger;
    // Call service
    fetch('http://localhost:8080/api/auth/adddata', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    })
      .then(function (res) {
        debugger;
        return res.json();
      })
      .then(function (data) {
        console.log(data);
        // This is an array so we have to loop through it
        let output = '';
        debugger;
        temId = data.temp_id;
        console.log("Id", temId)
        document.getElementById("tempid" + name).innerHTML = temId;;
      })

    //tableRow = tableRow.replace("$tempfoodid", temId);
  };


}
debugger;
function incrementValue(inputid, rate, name) {
  debugger;
  var tempfId = document.getElementById("tempid" + name.id).innerHTML
  console.log("ji", tempfId);
  debugger;
  var totalvalue = document.getElementById("productTotal").value;
  let id = String(inputid.id);
  var value = parseInt(document.getElementById(id).value, 10);
  value = isNaN(value) ? 0 : value;
  if (value < 70) {
    document.getElementById("productTotal").value = parseInt(totalvalue) - (rate * value);
    value++;
    document.getElementById(id).value = value;
    //document.getElementById(id).value
    document.getElementById("productTotal").value = parseInt(document.getElementById("productTotal").value) + (rate * value);

    //  Api to update Food QTY ++++
    debugger;
    let data = {
      t_qty: value
    }
    debugger;
    // Call service
    fetch('http://localhost:8080/api/auth/updatef/' + tempfId, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    })
      .then(function (res) {
        debugger;
        return res.json();
      })
      .then(function (data) {
        console.log(data);
      })

  }

}
function decrementValue(inputid, rate, name) {
  debugger;
  var tempfIdm = document.getElementById("tempid" + name.id).innerHTML
  console.log("ji", tempfIdm);
  debugger;
  var totalvalue = document.getElementById("productTotal").value;
  let id = String(inputid.id);
  var value = parseInt(document.getElementById(id).value, 10);
  value = isNaN(value) ? 0 : value;
  if (value > 1) {
    value--;
    document.getElementById("productTotal").value = parseInt(totalvalue) - (rate * 1);

    // document.getElementById("productTotal").value=parseInt(document.getElementById("productTotal").value)-(rate*value);
    document.getElementById(id).value = value;

    //  Api to update Food QTY -----
    debugger;
    let data = {
      t_qty: value
    }
    debugger;
    // Call service
    fetch('http://localhost:8080/api/auth/updatef/' + tempfIdm, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    })
      .then(function (res) {
        debugger;
        return res.json();
      })
      .then(function (data) {
        console.log(data);
      })


  }

}


// Module and Controller For Welcome Page 
let welcome = angular.module("Wlcome", []);
welcome.controller("passcontroller", function ($scope, $http, $window) {

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const token = urlParams.get('uname')
  console.log(token);

  $scope.username = token

});

// Module and Controller For Forget password Page   

let forgotpass = angular.module("forgot", []);
forgotpass.controller("forgpasscontroller", function ($scope, $http, $window) {


  // cheak email 
  $scope.forgotpass = function (emailid) {
    let uemail = document.getElementById('emailid').value
    const spinner = document.getElementById("spinnerr");
    let IsError = true;
    if (uemail === "") {
      return IsError = false;
    }
    spinner.removeAttribute('hidden', '');
    if (IsError) {
      $http.post(`http://localhost:8080/api/auth/cheakmail/${uemail}`)

        .then(
          // success callback

          function (response) {
            console.log(response);
            IsVerify = true;
            spinner.setAttribute('hidden', '');
            let output =
              `
        <div class="alert alert-success" role="alert">
        ${response.data.message}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
</div>
        `
            document.getElementById('forgot').innerHTML = output;
            $window.location.href = 'welcomeForgot.html';

          },

          // error callback 
          function (response) {
            console.log("hello", response);
            IsVerify = false;
            let output =
              `
        <div class="alert alert-danger" role="alert">
        ${response.data.message}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
</div>
        `
            document.getElementById('forgot').innerHTML = output;
            spinner.setAttribute('hidden', '');
          }

        );
    }
  }
});

//  Module and controller for Forgot Password 

let formforgott = angular.module("formforgot", []);
formforgott.controller("forgotformcntl", function ($scope, $http, $window) {

  let passlength = false;
  var minLength = 5;
  var maxLength = 16;
  $(document).ready(function () {
    $('#password1').on('keydown keyup change', function () {
      var char = $(this).val();
      var charLength = $(this).val().length;
      if (charLength < minLength) {
        $('#divCheckPasswordMatch').text('Length is short, minimum ' + minLength + ' required.');
      } else if (charLength > maxLength) {
        $('#divCheckPasswordMatch').text('Length is not valid, maximum ' + maxLength + ' allowed.');
        $(this).val(char.substring(0, maxLength));
      } else {
        $('#divCheckPasswordMatch').text('');
        passlength = true;
      }
    });
  });



  let passmatch = false;
  $('#password1, #password2').on('keyup', function () {
    if ($('#password1').val() == $('#password2').val()) {
      $('#divCheckPasswordMatch').html('').css('color', 'red');
      return passmatch = true;
    }
    else
      $('#divCheckPasswordMatch').html('*Passwords do not match').css('color', 'red');
  });


  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const email = urlParams.get('email')
  console.log(email);

  $scope.forgotpass = function (password1, password2) {
    // Creating Service
    let pass1 = document.getElementById(password1).value;
    let pass2 = document.getElementById(password2).value;

    let IsError = true;
    if (pass1 === "" || pass2 === "") {
      return IsError = false;
    }
    let data = {
      password: pass1
    }

    // Call service
    debugger;
    if (IsError) {
      if (passmatch) {
        if (passlength) {
          $http.put("http://localhost:8080/api/auth/forgot/" + email, JSON.stringify(data))

            .then(
              // success callback

              function (response) {
                console.log(response);
                // $window.location.href = '/login.html'
                $window.location.href = 'forgotsuccess.html?uname=' + response.data.username;
                let output =
                  `
          <div class="alert alert-success" role="alert">
          Password Created SuccessFull
         <button type="button" class="close" data-dismiss="alert" aria-label="Close">
         <span aria-hidden="true">&times;</span>
       </button>
          </div>
          `
                document.getElementById('alerttabl').innerHTML = output;
              },

              // error callback 
              function (response) {
                console.log(response.data);
                let output =
                  `
          <div class="alert alert-danger" role="alert">
         Something is went Wrong
         <button type="button" class="close" data-dismiss="alert" aria-label="Close">
         <span aria-hidden="true">&times;</span>
       </button>
          </div>
          `
                document.getElementById('alerttabl').innerHTML = output;
              }

            );
        }
        else {
          $window.location.href = 'login.html';
        }
      }
    }
  }
})


// Module and controller for profil page
let profile = angular.module("profile", []);
profile.controller("profilecontrol", function ($scope, $http, $window) {
  let UserName = JSON.parse(localStorage.getItem("someData"));
  $scope.username = UserName.email;
  $scope.email = UserName.username;
  $scope.roles = UserName.roles;
  $scope.city = UserName.city;
  $scope.country = UserName.country;
  $scope.phone = UserName.phone;

})


// Module and Controller For forgot sucesss Page 
let forgotsucess = angular.module("success", []);
forgotsucess.controller("sucessforgot", function ($scope, $http, $window) {

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const token = urlParams.get('uname')
  console.log(token);

  $scope.username = token

});


// Find by tableNo 
function updatee(id) {
  fetch(`http://localhost:8080/api/auth/bytableno/${id}`).then(
    res => {
      res.json().then(
        response => {

          console.log(response);
          if (response.length > 0) {

            var temp = "";
            response.forEach((foods) => {
              temp += "<tr>";
              temp += "<td>" + foods.table_no + "</td>";
              temp += "<td>" + foods.order_id + "</td>";
              temp += "<td>" + foods.wiater_name + "</td>";
              temp += "<td>" + foods.total_payment + "</td>";
              temp += "<td>" + foods.created_date + "</td>";
            });
            document.getElementById('tbldataa').innerHTML = temp;
          }
          var arr = response
          var newObj = arr.reduce((a, b) => Object.assign(a, b), {})
          let tid = newObj.table_no;
          document.getElementById('tdr').innerHTML = tid
        }
      )
    }
  )
  // Add sum  of row
  var table = document.getElementById("teblett"), sumVal = 0;

  for (var i = 1; i < table.rows.length; i++) {
    sumVal = sumVal + parseInt(table.rows[i].cells[3].innerHTML * parseInt(table.rows[i].cells[2].innerHTML));
  }

  document.getElementById("tsaley").innerHTML = " $" + sumVal;
  console.log(sumVal);
}

function generate() {
  var doc = new jsPDF('p', 'pt', 'letter');
  var htmlstring = '';
  var tempVarToCheckPageHeight = 0;
  var pageHeight = 0;
  pageHeight = doc.internal.pageSize.height;
  specialElementHandlers = {
    // element with id of "bypass" - jQuery style selector  
    '#bypassme': function (element, renderer) {
      // true = "handled elsewhere, bypass text extraction"  
      return true
    }
  };
  let total = document.getElementById('invoicetotal').value
  let invoicen = document.getElementById('orderidd').value

  margins = {
    top: 120,
    bottom: 50,
    left: 40,
    right: 40,
    width: 500
  };
  var y = 20;
  doc.setLineWidth(2);
  doc.text(200, y = y + 10, "Invoice");
  doc.text(35, y = y + 30, total);
  doc.text(270, y = y + 5, "Invoice Number :");
  doc.text(400, y = y + 0, invoicen);
  doc.autoTable({
    html: '#tableinvoice',
    startY: 70,
    theme: 'grid',
    columnStyles: {
      0: {
        cellWidth: 100,
      },
      1: {
        cellWidth: 100,
      },
      2: {
        cellWidth: 100,
      },
      3: {
        cellWidth: 100,
      },
      4: {
        cellWidth: 100,
      }
    },
    styles: {
      minCellHeight: 30
    }

  })
  doc.save('Marks_Of_Students.pdf');
}


