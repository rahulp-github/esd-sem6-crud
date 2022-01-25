var user_id = -1;

window.onload = async function loadData(){
    let res = await fetch("https://esd-sem6-crud.herokuapp.com/users",{
        method:"GET",
        headers:{
            "Content-Type":"application/json",
        }
    });
   let data = await res.json();
   const tbody = document.getElementById("tbody");
   for(var i = 0;i < data.length;i++){
   let tr = document.createElement('tr');
        let th = document.createElement('th');
        let td1 = document.createElement('td');
        let td2 = document.createElement('td');
        let td3 = document.createElement('td');
        let td4 = document.createElement('td');
        let td5 = document.createElement('td');
        th.setAttribute("scope","row");
        let btn1 = document.createElement('button');
        let btn2 = document.createElement('button');
        btn1.setAttribute("data-bs-toggle","modal");
        btn1.setAttribute("data-bs-target","#updateUser");
        btn1.setAttribute("id",`${data[i]._id}`);
        btn2.setAttribute("id",`${data[i]._id}`);
        btn1.classList.add("btn");
        btn2.classList.add("btn");
        btn1.className += " btn-success";
        btn2.className += " btn-danger";
        btn1.setAttribute("onclick","dynamic(this.id)");
        btn2.setAttribute("onclick","deleteUser(this.id)");
        td5.appendChild(btn1);
        td5.appendChild(btn2);
        th.appendChild(document.createTextNode(i+1));
        td1.appendChild(document.createTextNode(`${data[i].name}`));
        td2.appendChild(document.createTextNode(`${data[i].city}`));
        td3.appendChild(document.createTextNode(`${data[i].contact}`));
        td4.appendChild(document.createTextNode(`${data[i].email}`));
        btn1.appendChild(document.createTextNode("Update"));
        btn2.appendChild(document.createTextNode("Delete"));
        tr.appendChild(th);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tbody.appendChild(tr);
   }
}


function addNewUser(){
    const name = document.getElementById("name").value;
    const city = document.getElementById("city").value;
    const contact = document.getElementById("contact").value;
    const email = document.getElementById("email").value;
    const user = {name,city,contact,email};
    fetch("https://esd-sem6-crud.herokuapp.com/new_user",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(user)
    }).then(res1 => res1.json())
    .then(res2 => {
        console.log(res2);
        window.location.href = "index.html"
    });
    return false;
}

function updateUser(){
    const id = user_id;
    console.log("ID ",id);
    const name = document.getElementById("updated_name").value;
    const city = document.getElementById("updated_city").value;
    const contact = document.getElementById("updated_contact").value;
    const email = document.getElementById("updated_email").value;
    const user = {name,city,contact,email};
    console.table("User: ",user);
    fetch(`https://esd-sem6-crud.herokuapp.com/user/${id}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(user)
    }).then(res1 => res1.json())
    .then(res2 => {
        console.log(res2);
        window.location.href = "index.html";
    });
    return false;
}

function deleteUser(id){
    fetch(`https://esd-sem6-crud.herokuapp.com/user/${id}`,{
        method:"DELETE",
        headers:{
            "Content-Type":"application/json",
        }
    }).then(res1 => res1.json())
    .then(res2 => {
        console.log(res2);
        window.location.href = "index.html";
    });
}

async function dynamic(id){
    user_id = id;
    let res = await fetch(`https://esd-sem6-crud.herokuapp.com/user/${id}`);
    let data = await res.json();
    console.log(data);
    document.getElementById("updated_name").value = data.name;
    document.getElementById("updated_city").value = data.city;
    document.getElementById("updated_contact").value = data.contact;
    document.getElementById("updated_email").value = data.email;
 }