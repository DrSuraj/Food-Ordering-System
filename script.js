const container = document.getElementById("container"),
    loader = document.querySelector(".loader");

//First You have getMenu() Function..
let state = [];

let isMenu = false;

function getMenu() {
    fetch('https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json')
        .then(res => res.json())
        .then((data) => {

            container.style.display = "grid";
            loader.style.display = "none";
            data.forEach(ele => {
                state.push(ele);

                let card = document.createElement("div");
                card.id = `card${ele.id}`
                card.className = "card";
                card.innerHTML = `  <div class="photo">
            <img src="${ele.imgSrc}" alt="${ele.name}">
        </div>
        <div class="bottom flex">
            <div>
                <h3>${ele.name}</h3>
                <p>$${ele.price} /-<p>

            </div>
            <div class="add" onclick="add(${card.id})">
            <i class="fa-solid fa-plus"></i>
            </div>
        </div>
            `

                container.appendChild(card);

            });
        })
        .catch((err) => {
            console.log(err);
        });
}

function add(id) {
    console.log(id);
}

getMenu();





//Take Order Function 

function takeOrder() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            //you can resolve the promise and can send the data..
            //let's create the our data object ... 

            let order = {
                orders: []
            };
            //let's select the three Randome burgur..
            let x = 3;
            while (x-- > 0) {
                let index = parseInt(Math.random() * 1000);
                index = index % state.length;
                //this will push your three 
                order.orders.push(state[index]);
            }
            resolve(order);
        }, 2500);
    });
}




//orderPrep()

function orderPrep(obj) {

    //let's work on this order Preperation...

    return new Promise((resolve, reject) => {

        setTimeout(() => {
            obj.order_status = true;
            obj.paid = false;
            resolve(obj);
        }, 1500);
    });
}


//payOrder() 
function payOrder(obj) {
    //I've to write the function... pay order it returns promise..

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            obj.order_status = true;
            obj.paid = true;
            resolve(obj);
        }, 1000);
    });
}

const menu = document.querySelector(".menu");


//thankyouFnc()

function thankyouFnc(obj) {
    alert("Thankyou for eating with us today!")
}
let hemro= document.querySelector(".hero");

function toggleHero()
{   
   if(hemro.style.display=="none"){
    hemro.style.display="flex";
   }
   else hemro.style.display="none";
}

function showHero(){
    hemro.style.display="flex";
}

menu.addEventListener('click', (e) => {
    toggleHero();
    document.querySelector(".hand").style.display = "none";
    isMenu = true;
    takeOrder()
        .then((data) => {
            console.log("After Taking Order", data);
            return orderPrep(data);
        })
        .then((data) => {
            console.log("After Order Prep", data);
            return payOrder(data);
        })
        .then((data) => {
            console.log("After Payout", data);
            thankyouFnc(); //this will say thanks.. that's it..
        })
        .catch((err) => {
            console.log(err);
        })

})



