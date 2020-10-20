
let title = document.getElementById("title");
let moneyelm = document.getElementById("money");
let msg = document.getElementById("msg");
let schoolbtn = document.getElementById("schoolbtn");
let carelm = document.getElementById("carelm");
let carelm2 = document.getElementById("carelm2");

let carparts = ["wheels","body","brakes","pedal","motor"];
let money = 10;
let items = {
    fish: 0,
    rice: 0,
    coal: 0,
    furn: 0
}
let starve = 10;
let rand;
let chance = false;
let carint = 0;

function actualRoom(a) {
    [].slice.call(document.getElementsByClassName('btn-wrap')).forEach(function(element) {
        element.style.display = "none";
    });
    document.getElementById(a).style.display = 'block';
}

function room(a) {
    switch (a) {
        case 'school':
            title.innerHTML = "School";
            if (Math.random() < .5) {
                msg.innerHTML = "You are now smart enough to work!";
                schoolbtn.innerHTML = "Go to work";
                schoolbtn.onclick = function () {
                    room('work');
                };
            } else {
                msg.innerHTML = "You failed the exam.";
            }
            actualRoom("school");
            break;
        case 'shop':
            carelm.innerHTML = "Buy car part: "+carparts[0]+" - $1";
            carelm.style.display = chance ? "block" : "none";
            chance = false;
            title.innerHTML = "Shop";
            msg.innerHTML = "The customer is always right.";
            actualRoom("shop");
            break;
        case 'groc':
            title.innerHTML = "Grocery store";
            msg.innerHTML = "Tasty snacks.";
            actualRoom("groc");
            break;
        case 'buy-fish':
            if (money >= 5) {
                money-=5;
                items.fish++;
                msg.innerHTML = "You purchased a fish.";
            } else {
                msg.innerHTML = "You cannot afford that!";
            }
            break;
        case 'buy-rice':
            if (money >= 2) {
                money -= 2;
                items.rice++;
                msg.innerHTML = "You purchased a bowl of rice.";
            } else {
                msg.innerHTML = "You cannot afford that!";
            }
            break;
        case 'buy-coal':
            if (money >= 4) {
                money -= 4;
                items.coal++;
                msg.innerHTML = "You purchased a bucket of coal.";
            } else {
                msg.innerHTML = "You cannot afford that!";
            }
            break;
        case 'buy-furn':
            if (money >= 20) {
                money -= 20;
                items.furn++;
                msg.innerHTML = "You purchased a furnace.";
            } else {
                msg.innerHTML = "You cannot afford that!";
            }
            break;
        case 'eat':
            title.innerHTML = "Picnic";
            msg.innerHTML = "You will starve in " + starve + " days.";
            actualRoom('eat');
            break;
        case 'eat-fish':
            if (items.fish) {
                if (items.furn) {
                    if (items.coal) {
                        items.fish--;
                        items.coal--;
                        starve+=4;
                        msg.innerHTML = "You will starve in " + starve + " days.";
                    } else {
                        msg.innerHTML = "You have no coal to fuel the furnace!";
                    }
                } else {
                    msg.innerHTML = "You have no furnace to cook fish!";
                }
            } else {
                msg.innerHTML = "You have no fish!";
            }
            setTimeout(function () {
                msg.innerHTML = "You will starve in " + starve + " days.";
            },1000)
            break;
        case 'eat-rice':
            if (items.rice) {
                items.rice--;
                starve++;
                msg.innerHTML = "You will starve in " + starve + " days.";
            } else {
                msg.innerHTML = "You have no rice!";
            }
            setTimeout(function () {
                msg.innerHTML = "You will starve in " + starve + " days.";
            },1000)
            break;
        case 'home':
            chance = (Math.random() > .67)&&carparts.length;
            title.innerHTML = "Home";
            msg.innerHTML = "Good morning!";
            actualRoom("home");
            break;
        case 'end':
            title.innerHTML = "Game over";
            msg.innerHTML = "You starved...";
            actualRoom("end");
            break;
        case 'work':
            title.innerHTML = "Work";
            rand = Math.floor(Math.random() * 6) + 1;
            money += rand;
            msg.innerHTML = "You earned $"+rand+" at work!";
            actualRoom("work");
            break;
        case 'car':
            if (money) {
                carelm.style.display = "none";
                money--;
                carparts.shift();
                carint++;
                msg.innerHTML = "You purchased a car part.";
                if (carint === 5) {
                    carelm2.style.display = "block";
                }
            } else {
                msg.innerHTML = "You cannot afford that!";
            }
            break;
        case 'car2':
            if (money > 4) {
                msg.innerHTML = "You win!";
                actualRoom("win");
            } else {
                msg.innerHTML = "You cannot afford that!";
                setTimeout(function () {
                    msg.innerHTML = "You will starve in " + starve + " days.";
                }, 1000)
            }
            break;
    }
    moneyelm.innerHTML = money;
}