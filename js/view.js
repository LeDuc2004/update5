const view = {};
var dataUsername = "";
view.dataUser = (dataUser) => {
  dataUsername = dataUser;
};
view.setScreenActive = (screenName) => {
  switch (screenName) {
    case `registerPage`:
      document.getElementById("app1").innerHTML = conponent.registerPage;
      
      let registerForm = document.getElementById("registerForm");
      registerForm.addEventListener("submit", (e) => {
        e.preventDefault();

        let checkIdName = {
          idName: {
            Name:
              registerForm.firstName.value.charAt(0) +
              registerForm.lastName.value.charAt(0),
            email: registerForm.email.value,
            username: `${registerForm.firstName.value} ${registerForm.lastName.value}`,
          },
        };

        const data = {
          firstName: registerForm.firstName.value,
          lastName: registerForm.lastName.value,
          username: `${registerForm.firstName.value} ${registerForm.lastName.value}`,
          email: registerForm.email.value,
          password: registerForm.password.value,
          confirmPassword: registerForm.confirmPassword.value,
        };

        controller.register(data, checkIdName);
      });

      view.setErrorMessage = (id, content) => {
        document.getElementById(id).innerText = content;
      };
      let redirectLogin = document.getElementById("redirectLogin");
      redirectLogin.addEventListener("click", () => {
        view.setScreenActive("loginPage");
      });
      break;
    case "loginPage":
      
      document.getElementById("app1").innerHTML = conponent.loginPage;
      
      document.getElementById("body").style = "background-image: url(./imge/thumbnail.jpg);background-color: #3362fc;"
      
      let loginForm = document.getElementById("loginForm");
      loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const data = {
          email: loginForm.email.value,
          password: loginForm.password.value,
        };
        controller.login(data);
      });
      view.setErrorMessage = (id, content) => {
        document.getElementById(id).innerText = content;
      };
      let redirectRegister1 = document.getElementById("outregister");
      redirectRegister1.addEventListener("click", () => {
        localStorage.setItem("bothEmail","loichaocuazalo")
        view.setScreenActive("registerPage");
      });
      break;
    case "wellcomePage":
     document.getElementById("body").style = ""
      document.getElementById("app1").innerHTML = conponent.wellcomePage;
      

      model.getChat();
      model.getIdName();
      model.rederListFriend();


        

      let out = document.getElementById("tendn3");
      out.addEventListener("click", () => {
        auth.signOut();
        localStorage.setItem("signin","")
      });

      break;

    default:
      let app1 = document.getElementById("app1");
      app1.innerHTML = component.errorPage;
      break;
  }
};
view.renderList = (listChat) => {


  let result = ``;
  for (let i = 0; i < listChat.length; i++) {
    if (listChat[i].message.owner == firebase.auth().currentUser.email && listChat[i].message.content.iconhi == "undefined") {
      result += `

      <div class="ok" >
      <div class="contentMeCha">
      <div id="contentMe">
      <div class="contentMe">${listChat[i].message.content.text}</div>
      <div class="time">${listChat[i].message.time}</div>
      </div>
      </div>
      </div>

                `;
    } else if(listChat[i].message.owner != firebase.auth().currentUser.email && listChat[i].message.content.iconhi == "undefined"){
      result += `
       <div class="ok" >
       
       <div class="contentBotCha">
       <div id="contentBoss">
      <div class="contentBoss">${listChat[i].message.content.text}</div>
      <div class="time1">${listChat[i].message.time}</div>

      </div>
      </div>
      </div>
       `;
    }else if (listChat[i].message.owner == firebase.auth().currentUser.email && listChat[i].message.content.iconhi != "undefined") {
      result +=   `      <div class="ok" >
        <div class="contentMeCha">
        ${listChat[i].message.content.iconhi}
        </div>
      </div>`
    }else if (listChat[i].message.owner != firebase.auth().currentUser.email && listChat[i].message.content.iconhi != "undefined") {
      result +=   `      <div class="ok" >
      <div class="contentBotCha">
      ${listChat[i].message.content.iconhi}
      </div>
    </div>`
    }
  }

  document.getElementById("spaceChat1").innerHTML = result;

  let listChat1 = document.getElementById("spaceChat");
  listChat1.scrollTop = listChat1.scrollHeight;
};

view.renderIdName = (list) => {
  for (let i = 0; i < list.length; i++) {
    if (list[i].idName.email == firebase.auth().currentUser.email) {
      document.getElementById("idName").innerHTML = list[i].idName.Name;
      document.getElementById("namedn").innerHTML = list[i].idName.username;

      document.getElementById("yourselfidname").innerHTML = list[i].idName.Name;
      document.getElementById("yourselfname").innerHTML = list[i].idName.username;
      document.getElementById("yourselfemail").innerHTML = firebase.auth().currentUser.email;
      document.getElementById("yourselfidname1").innerHTML = list[i].idName.Name;
      document.getElementById("yourselfname1").innerHTML = list[i].idName.username;
      document.getElementById("yourselfemail1").innerHTML = firebase.auth().currentUser.email;



    }
  }
};
view.renderThemBan = (list, list1) => {
  let result = "";
  for (let i = 0; i < list.length; i++) {
    if (list[i].idName.email !== firebase.auth().currentUser.email) {
      result += `
      <div class="friend1">
      <div class="avatar" style="max-width:50px;width:20%;margin:11px 0px">${list[i].idName.Name.charAt(0)}</div>
      <div  style="display: flex;flex-direction: column;justify-content: center;width:80%;margin-left: 10px;">
      <div class="nameFriend1">${list[i].idName.username}</div>
      <div class="lastChat1">${list[i].idName.email}</div>
      </div>
      <div id="btnketban" onclick="thembanzochokhac(${i},'${
        list[i].idName.Name
      }','${list[i].idName.email}','${
        list[i].idName.username
      }')" ><div>kết bạn</div></div>
      </div>
      `;
    }
  }

  document.getElementById("listRecommet").innerHTML = result;

  let listchat = document.querySelectorAll(".lastChat");
  let listchat1 = document.querySelectorAll(".lastChat1");
  for (let i = 0; i < listchat1.length; i++) {
    for (let j = 0; j < listchat.length; j++) {
      if (
        listchat1[i].innerText
          .trim()
          .toLowerCase()
          .includes(listchat[j].innerText.trim().toLowerCase())
      ) {
        listchat1[i].parentElement.parentElement.style.display = "none";
      }
    }
  }
};
function thembanzochokhac(index, idname, email, username) {
  model.savethembanzochokhac = async () => {
    
 
      let checkIdName = {
        idName: {
          tenchunhan: auth.currentUser.displayName,
          currentEmail: auth.currentUser.email,
          Name: idname,
          email: email,
          username: username,
        },
      };

      try {
        let response1 = await firebase
          .firestore()
          .collection("idName")
          .doc("vGtlozg2ODnWYyeMp04E")
          .update({
            idNamechokhac:
              firebase.firestore.FieldValue.arrayUnion(checkIdName),
          });

        ShowInfoToast();
        model.rederListFriend();
      } catch (error) {}

      try {
        let response1 = await firebase
          .firestore()
          .collection("listMessage")
          .doc(`${auth.currentUser.email}${email}`)
          .set({
            message: firebase.firestore.FieldValue.arrayUnion(),
          });
      } catch (error) {}

    
  };
  model.getIdName();
  model.savethembanzochokhac();
}


view.rederListFriend = (result) => {
  let renderchokhac = ``;
  for (let i = 0; i < result.length; i++) {
    if (result[i].idName.currentEmail == auth.currentUser.email) {
      renderchokhac += ` <div id="friendnone${i}"  class="friend" onclick="takeInfoObj('${result[i].idName.email}',${i},'${result[i].idName.Name.charAt(0)}','${result[i].idName.username}')" >
        <div class="avatar" style="max-width:50px;width:20%;margin:11px 0px">${result[i].idName.Name.charAt(0)}</div>
        <div class="bonl"  style="display: flex;flex-direction: column;justify-content: center;width:80%;margin-left: 10px;">
        <div class="nameFriend">${result[i].idName.username}</div>
        <div class="lastChat">${result[i].idName.email}</div>
        </div>
        </div>
        
        `;
    }

    if (auth.currentUser.email == result[i].idName.email) {
      renderchokhac += `
          <div id="friendnone${i}" class="friend" onclick="takeInfoObj('${result[i].idName.currentEmail}',${i},'${result[i].idName.tenchunhan.charAt(0)}','${result[i].idName.tenchunhan}')">
          <div class="avatar" style="max-width:50px;width:20%;margin:11px 0px">${result[i].idName.tenchunhan.charAt(0)}</div>
          <div class="bonl"  style="display: flex;flex-direction: column;justify-content: center;width:80%;margin-left: 10px;">
          <div class="nameFriend">${result[i].idName.tenchunhan}</div>
          <div class="lastChat">${result[i].idName.currentEmail}</div>
          </div>
          </div>
          `;
    }
  }
  document.getElementById("listChating").innerHTML = renderchokhac;

    
 
  let arraylist =[]
document.querySelectorAll(".lastChat").forEach((e)=>{
  arraylist.push(e.innerText)
  
})



  document.querySelectorAll(".lastChat").forEach((e)=>{

  for (let i = 0; i < arraylist.length; i++) {
  if (e.innerText == arraylist[i] && e.innerText == arraylist[i+1]) {
   
        e.parentElement.parentElement.style.display ="none"
      
      
    
    
  }
    
  }
    
  })
 

};


