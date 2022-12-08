function showPassword() {
  let password = document.getElementById("mk");
  let icon = document.getElementById("icon");
  if (password.type == "password") {
    password.type = "text";
    icon.classList.remove("fa-eye");
    icon.classList.add("fa-eye-slash");
  } else {
    password.type = "password";
    icon.classList.remove("fa-eye-slash");
    icon.classList.add("fa-eye");
  }
}

function showConfirmPassword() {
  let showConfirmPassword = document.getElementById("remk");
  let iconClose = document.getElementById("iconClose");
  if (showConfirmPassword.type == "password") {
    showConfirmPassword.type = "text";
    iconClose.classList.remove("fa-eye");
    iconClose.classList.add("fa-eye-slash");
  } else {
    showConfirmPassword.type = "password";
    iconClose.classList.remove("fa-eye-slash");
    iconClose.classList.add("fa-eye");
  }
}

const controller = {};
function validateEmail(email1) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email1);
}

controller.register = (data, dataid) => {
  data.firstName == "" || data.lastName == ""
    ? view.setErrorMessage("spantk", "* Vui lòng điền tên đăng nhập *")
    : view.setErrorMessage("spantk", "");
  data.email == ""
    ? view.setErrorMessage("spanemail", "* Vui lòng điền email *")
    : view.setErrorMessage("spanemail", "");
  data.password == ""
    ? view.setErrorMessage("spanmk", "* Vui lòng điền mật khẩu *")
    : view.setErrorMessage("spanmk", "");
  data.confirmPassword !== data.password
    ? view.setErrorMessage("spanremk", "* Mật khẩu nhập lại không đúng *")
    : view.setErrorMessage("spanremk", "");
  if (
    data.username !== "" &&
    data.email !== "" &&
    data.password !== "" &&
    data.confirmPassword !== ""
    && data.password == data.confirmPassword 
  ) {
    model.register(data, dataid);
  }
};

controller.login = (data) => {
  if (data.email == "") {

    view.setErrorMessage("spanemail1", "* Vui lòng điền email *");
  } else {
    view.setErrorMessage("spanemail1", "");
  }
  if (data.password == "") {
    view.setErrorMessage("spanmk", "* Vui lòng điền mật khẩu *");
  } else {
    view.setErrorMessage("spanmk", "");
  }
  if (data.password !== "" && validateEmail(data.email) == true) {
    model.login(data);
  }
};

function admin() {
  window.location.href = "admin.html";
}

function sign() {
  window.location.href = "index.html";
}
function login() {
  view.setScreenActive("loginPage");
}
function phimyeuthich() {
  window.location.href = "phimyeuthich.html";
}
function search() {
  let valueInput = document.getElementById("inputSearch").value;
  document.getElementById("phimhot").setAttribute("style", "display:none");
  let a = document.getElementById("carouselExampleInterval");
  a.setAttribute("style", "display:none");
  if (valueInput == "") {
    document
      .getElementById("phimhot")
      .setAttribute("style", "display:inline-flex");
    a.setAttribute("style", "display:block");
  }
  let txtSearch = valueInput.trim().toLowerCase();
  let listSunDOM = document.querySelectorAll(".sun");
  listSunDOM.forEach((item) => {
    if (item.innerText.toLowerCase().includes(txtSearch)) {
      item.setAttribute("style", "display:block");
    } else {
      item.setAttribute("style", "display:none");
    }
  });
}

  function btnChat(iconhi) {

    
    document.getElementById("tableIcon").style.display = "none";
    let valueInput = document.getElementById("infoInput").value;
  
    const node = document.createElement("div");
    node.classList.add("ok");
  
    const node1 = document.createElement("div");
    node1.classList.add("contentMeCha");
  
    const Time = document.createElement("div");
    Time.classList.add("time");
  
    const person = document.createElement("div");
    person.classList.add("nameperson");
  
    const node2 = document.createElement("div");
    node2.classList.add("contentMe");
  
    const node10 = document.createElement("div");
    node10.classList.add("contentBotCha");
  
    const node3 = document.createElement("div");
    node3.classList.add("contentBoss");
  
    const node4 = document.createElement("div");
    node4.classList.add("nameBoss");
  
  
    node1.appendChild(Time);
    node1.appendChild(person);
    node1.appendChild(node2);
    node.appendChild(node1);
    var textnode1 = document.createTextNode(`${valueInput}`);
    var textnameperson = document.createTextNode(
      `${auth.currentUser.displayName}`
    );
    person.appendChild(textnameperson);
    var texttime = document.createTextNode(`${new Date().toLocaleString()}`);
    Time.appendChild(texttime);
  
    node2.appendChild(textnode1);
    if (iconhi) {
      model.saveChat(
        valueInput,
        auth.currentUser.displayName,
        `${Math.random()}`,
        `${new Date().getHours()}:${new Date().getMinutes()}`,
        `${localStorage.getItem("bothEmail")}`,
        `${localStorage.getItem("bothEmailReverse")}`,
        iconhi,

      );
    }
    if (valueInput == "") {
    } else{
  
  
  
      model.saveChat(
        valueInput,
        auth.currentUser.displayName,
        `${Math.random()}`,
        `${new Date().getHours()}:${new Date().getMinutes()}`,
        `${localStorage.getItem("bothEmail")}`,
        `${localStorage.getItem("bothEmailReverse")}`,
        iconhi,

      );
    
      document.getElementById("infoInput").value = "";
    }
    
    model.getChat()
    let listChat = document.getElementById("spaceChat");
    listChat.scrollTop = listChat.scrollHeight;
}


document.addEventListener("keydown", (e) => {
  if(e.which == 13){

    btnChat()
    model.getChat()
  }

    });
// ... Tên người dùng và thông tin người dùng

function avatar() {
  document.querySelector("#taikhoan").style.display = "block";
}
function clickevw() {
  document.querySelector("#taikhoan").style.display = "none";
}
function signout() {
  document.getElementById("tableIcon").style.display = "none";
  localStorage.setItem("bothEmail","loichaocuazalo")
  localStorage.setItem("bothEmailReverse","loichaocuazalo")
  auth.signOut();
}
function tableIcon() {
  document.getElementById("tableIcon").style.display = "";
  document.getElementById("icon1111").style.display = "";
  document.getElementById("icon111").style.display = "none";
}
function tableIcon1() {
  document.getElementById("tableIcon").style.display = "none";
  document.getElementById("icon1111").style.display = "none";
  document.getElementById("icon111").style.display = "";
}
function innerInput() {
  document.getElementById("infoInput").value = `${
    document.getElementById("infoInput").value
  }😁`;
}
function innerInput1() {
  document.getElementById("infoInput").value = `${
    document.getElementById("infoInput").value
  }😂`;
}
function innerInput2() {
  document.getElementById("infoInput").value = `${
    document.getElementById("infoInput").value
  }😎`;
}
function innerInput3() {
  document.getElementById("infoInput").value = `${
    document.getElementById("infoInput").value
  }😍`;
}
function innerInput4() {
  document.getElementById("infoInput").value = `${
    document.getElementById("infoInput").value
  }😘`;
}
function innerInput5() {
  document.getElementById("infoInput").value = `${
    document.getElementById("infoInput").value
  }🥰`;
}
function innerInput6() {
  document.getElementById("infoInput").value = `${
    document.getElementById("infoInput").value
  }🥶`;
}
function innerInput7() {
  document.getElementById("infoInput").value = `${
    document.getElementById("infoInput").value
  }😡`;
}
function innerInput8() {
  document.getElementById("infoInput").value = `${
    document.getElementById("infoInput").value
  }🤢`;
}
function innerInput9() {
  document.getElementById("infoInput").value = `${
    document.getElementById("infoInput").value
  }😻`;
}
function innerInput10() {
  document.getElementById("infoInput").value = `${
    document.getElementById("infoInput").value
  }❤️`;
}
function innerInput11() {
  document.getElementById("infoInput").value = `${
    document.getElementById("infoInput").value
  }💕`;
}
function innerInput12() {
  document.getElementById("infoInput").value = `${
    document.getElementById("infoInput").value
  }💞`;
}
function innerInput13() {
  document.getElementById("infoInput").value = `${
    document.getElementById("infoInput").value
  }💓`;
}
function innerInput14() {
  document.getElementById("infoInput").value = `${
    document.getElementById("infoInput").value
  }🤮`;
}
function innerInput15() {
  document.getElementById("infoInput").value = `${
    document.getElementById("infoInput").value
  }🤧`;
}
function innerInput16() {
  document.getElementById("infoInput").value = `${
    document.getElementById("infoInput").value
  }😷`;
}
function innerInput17() {
  document.getElementById("infoInput").value = `${
    document.getElementById("infoInput").value
  }👌`;
}
function innerInput18() {
  document.getElementById("infoInput").value = `${
    document.getElementById("infoInput").value
  }👏`;
}
function innerInput19() {
  document.getElementById("infoInput").value = `${
    document.getElementById("infoInput").value
  }👋`;
}
function innerInput20() {
  document.getElementById("infoInput").value = `${
    document.getElementById("infoInput").value
  }🤟`;
}
function innerInput21() {
  document.getElementById("infoInput").value = `${
    document.getElementById("infoInput").value
  }👍`;
}
function innerInput22() {
  document.getElementById("infoInput").value = `${
    document.getElementById("infoInput").value
  }🫰`;
}
function innerInput23() {
  document.getElementById("infoInput").value = `${
    document.getElementById("infoInput").value
  }🪓`;
}
function innerInput24() {
  document.getElementById("infoInput").value = `${
    document.getElementById("infoInput").value
  }⚧️`;
}
function innerInput25() {
  document.getElementById("infoInput").value = `${
    document.getElementById("infoInput").value
  }🏆`;
}
function innerInput26() {
  document.getElementById("infoInput").value = `${
    document.getElementById("infoInput").value
  }💵`;
}
function innerInput27() {
  document.getElementById("infoInput").value = `${
    document.getElementById("infoInput").value
  }📂`;
}
function innerInput28() {
  document.getElementById("infoInput").value = `${
    document.getElementById("infoInput").value
  }😇`;
}
function innerInput29() {
  document.getElementById("infoInput").value = `${
    document.getElementById("infoInput").value
  }🩴`;
}
function innerInput30() {
  document.getElementById("infoInput").value = `${
    document.getElementById("infoInput").value
  }👟`;
}
function innerInput31() {
  document.getElementById("infoInput").value = `${
    document.getElementById("infoInput").value
  }💀`;
}
function innerInput32() {
  document.getElementById("infoInput").value = `${
    document.getElementById("infoInput").value
  }🏀`;
}
function innerInput33() {
  document.getElementById("infoInput").value = `${
    document.getElementById("infoInput").value
  }⚽`;
}
function innerInput34() {
  document.getElementById("infoInput").value = `${
    document.getElementById("infoInput").value
  }💍`;
}
function innerInput35() {
  document.getElementById("infoInput").value = `${
    document.getElementById("infoInput").value
  }🥳`;
}
function innerInput36() {
  document.getElementById("infoInput").value = `${
    document.getElementById("infoInput").value
  }🔪`;
}
function innerInput37() {
  document.getElementById("infoInput").value = `${
    document.getElementById("infoInput").value
  }🗡️`;
}
function innerInput38() {
  document.getElementById("infoInput").value = `${
    document.getElementById("infoInput").value
  }⚔️`;
}
function innerInput39() {
  document.getElementById("infoInput").value = `${
    document.getElementById("infoInput").value
  }🧀`;
}
function tableInfoSize() {
  document.getElementById("modal").style.display = "";
  document.querySelector("#modal__inner").style.display =""
  document.querySelector("#modal__inner1").style.display ="none"

}
function offTableInfo() {
  document.getElementById("modal").style.display = "none";
}
function blueborder1() {
  let valueInput = document.getElementById("blueborder1").value;
  document.getElementById("maybeyouknow").setAttribute("style", "display:none");
  if (valueInput == "") {
    document.getElementById("maybeyouknow").setAttribute("style", "display:");
  }
  let txtSearch = valueInput.trim().toLowerCase();
  let listSunDOM = document.querySelectorAll(".friend1");
  listSunDOM.forEach((item) => {


    if (item.innerText.trim().toLowerCase().includes(txtSearch)) {
      item.setAttribute("style", "display:");
    } else {
      item.setAttribute("style", "display:none");
    }
  });
}

function blueborder() {
  let valueInput = document.getElementById("blueborder").value;
  let txtSearch = valueInput.trim().toLowerCase();
  let listSunDOM = document.querySelectorAll(".nameFriend");
  listSunDOM.forEach((item) => {
    if (item.innerText.trim().toLowerCase().includes(txtSearch)) {
      item.parentElement.parentElement.style.display = "";
    } else {
      item.parentElement.parentElement.style.display = "none";
      
    }
  });
}
function takeInfoObj(email, i,name,nameuser) {

  $(window).resize(function(){
 
 
    var width = $(window).width();
  localStorage.setItem("width",`${width}`)
  
  
     
  }); 
  let width = Number(localStorage.getItem("width"))
document.getElementById("avatarcruser").innerHTML = auth.currentUser.displayName.charAt(0)
document.getElementById("avataruser").innerHTML = name
document.getElementById("vauser").innerHTML = nameuser


document.getElementById("namechati").innerHTML = nameuser
document.getElementById("emailchati").innerHTML = email
document.getElementById("titleavatar").innerHTML = name


    let getfriend = document.querySelectorAll(".friend");
  getfriend.forEach((item) => {
    item.setAttribute("style", "background-color:");
  });
  document.getElementById("friendnone" + i).style.backgroundColor = "#e8efff";

localStorage.setItem("bothEmail", `${email}${auth.currentUser.email}`)
localStorage.setItem("bothEmailReverse", `${auth.currentUser.email}${email}`)

model.getChat() 



   if ( width <= 800) {
    document.getElementById("table1").style.display = ""
    document.getElementById("divlistban").style.display = "none "
    
  }else{
    document.getElementById("table1").style.display = ""
    document.getElementById("divlistban").style.display = ""
  }
  
  if (Number(localStorage.getItem("width")) <= 800) {
    document.getElementById("table1").style.display = "none"
    document.getElementById("divlistban").style.display = ""
    
  }else{
    document.getElementById("table1").style.display = ""
    document.getElementById("divlistban").style.display = ""
  }

}

function upload() {
  if (Number(localStorage.getItem("width")) <= 800) {
    document.getElementById("table1").style.display = "none"
    document.getElementById("divlistban").style.display = ""
    
  }else{
    document.getElementById("table1").style.display = ""
    document.getElementById("divlistban").style.display = ""
  }
}








$(window).resize(function(){
 
 
  var width = $(window).width();
localStorage.setItem("width",`${width}`)


   
});






function okchat() {
  if (Number(localStorage.getItem("width")) < 800) {

    
 
  document.getElementById("table1").style.display = "none"
  document.getElementById("divlistban").style.display = ""
  document.getElementById("taikhoan").style.display = "none"
 }
}
function arowleft() {

  document.getElementById("table1").style.display ="none"
  document.getElementById("divlistban").style.display =""

}



function tranform() {
  
  if (Number(localStorage.getItem("width")) < 800 ) {

    document.getElementById("spaceChat1").setAttribute("style","padding-bottom:40px")
    document.getElementById("spaceChat1").lastElementChild.setAttribute("style","margin-bottom:45px")
  }
  let listChat = document.getElementById("spaceChat1");
  listChat.scrollTop = listChat.scrollHeight;
}
function loading() {
  document.getElementById("footerlistban").style.display = "none"
  document.getElementById("loading").style.display = ""
  

  setTimeout(() => {
  document.getElementById("loading").style.display = "none"
  
  }, 3000);
}
function loadinglogin() {
  
  document.getElementById("footerlistban").style.display = "none"
  document.getElementById("loadinglogin").style.display = ""
  

  setTimeout(() => {
  document.getElementById("loadinglogin").style.display = "none"
  
  }, 2000);
}
function loadingspace() {

  document.getElementById("loadingspace").style.display = ""
  

  setTimeout(() => {
  document.getElementById("loadingspace").style.display = "none"
  
  }, 2000);
}
function tronchat() {
  document.getElementById("listChating").style.display =""
  document.getElementById("yourself").style.display ="none"

}
function tronuser() {
  document.getElementById("listChating").style.display ="none"
  document.getElementById("yourself").style.display =""

}
function hosocuaban() {
  document.getElementById("modal").style.display =""
  document.querySelector("#modal__inner").style.display ="none"
  document.querySelector("#modal__inner1").style.display =""
  document.getElementById("taikhoan").style.display = "none"

}
function webpc1() {

  btnChat(`<div ><img style="width: 85px;height: 85px;" src="./imge/webpc (1).png" alt=""></div>`)
}
function webpc2() {
  btnChat(`<div ><img style="width: 85px;height: 85px;" src="./imge/webpc (2).png" alt=""></div>`)
}
function webpc3() {
  btnChat(`<div ><img style="width: 85px;height: 85px;" src="./imge/webpc.png" alt=""></div>`)
}






