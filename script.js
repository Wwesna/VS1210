function login(){
let log = $('#login').val()
let pas = $('#passw').val()


$.get('auth.php', {login: log, password: pas}, function (data){
let otvet = JSON.parse(data);
// если произошла ошибка
if ('error' in otvet){
alert(otvet['error', 'text'])
}else if ('user' in otvet){
alert('вы успешно авторизовались');
localStorage.setItem(`token`, otvet.user.token);
setTimeout(function(){
window.location.href =`http://217.71.129.139:5341/get.pokupki.php?token=${localStorage.getItem('token')}`;
}, 400);
}else{
alert('непредвиденная ошибка');
console.log(data);
}
})
}

function register(){
let log = $('#login').val();
let pas = $('#passw').val();
let pas2 = $('#passw2').val();

if (pas == pas2) {
$.get('register.php', {login: log, password:pas}, function(data){

let otvet = JSON.parse(data)
alert('пользователь успешно зарегистрирован');
setTimeout(function(){
window.location.href = 'http://217.71.129.139:5443/login.html';
}, 400);

});
}else{

alert('пароли не совпадают');
}
}


function postTovary(id){
let counts = $('#count').val(),
token_local = localStorage.getItem('token'),
json = {id:id, count:counts},
tovar = [json];
$.get('post.pokupki.php', {tovary:JSON.stringify(tovar),token:token_local,counts}, function(data){
let otvet2 = JSON.parse(data);

});
}
function kupit(){
$.get('post.pokupki.php')
}

function get_tovary(){
$.get('test.php',{}, function(data){
let otvet = JSON.parse(data);
if ('error' in otvet){
alert(otvet['error']['text'])
}
else if ('tovary' in otvet){
let tbody = $('#tabl')
let arr = otvet['tovary']

arr.forEach(function (item, i, arr){
let tr = $("<tr></tr>");
let td1 = $("<td></td>");
let td2 = $("<td></td>");
let td3 = $("<td></td>");
let td4 = $("<td></td>");

td1.text(row['ID'])
td2.text(item['title'])
td3.text(item['price'])
if (localStorage.hasOwnProperty('expired')){
let expired = localStorage['expired']
let current = Math.floor (Date.now()/1000)
if (expired > current){
td4.html('<button onclick = "kupit()">купить</button>')
}
}

tr.append(td1, td2 , td3 ,td4)
tbody.append(tr)
});
}else{
alert('непредвиденная ошибка')
console.log(data)
}
});
}


function logout() {
localStorage.removeItem('token')
localStorage.removeItem('expired')
window.location.href = "tovary.html"
}

