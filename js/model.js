const model = {};
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDg0gdvCdB8EvQRDNfaG7kUthK36oLyHtQ",
  authDomain: "model-b08f0.firebaseapp.com",
  projectId: "model-b08f0",
  storageBucket: "model-b08f0.appspot.com",
  messagingSenderId: "110105994792",
  appId: "1:110105994792:web:b82888be0b7cefd8c7771d",
  measurementId: "G-CEB6MRKJHE",
  /* Firebase config */
});
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
model.register = async (data,dataid) => {
  try {
    
    let response = await auth.createUserWithEmailAndPassword(
      data.email,
      data.password
    );
    



    ShowSuccessToast()

    const idname = async () => {
      try {
        
          let response = await firebase
          .firestore()
          .collection("idName")
          .doc("ys6HyV83PZ04PW2PM7Pk")
          .update({
            idName: firebase.firestore.FieldValue.arrayUnion(dataid),
          });
        

      } catch (error) {
       
      }
    };
    
    idname(dataid);

    view.setScreenActive("loginPage");
    auth.currentUser.sendEmailVerification();
    await firebase.auth().currentUser.updateProfile({
      displayName: data.username,
      
    });


    view.dataUser(dataUser);
  } catch (error) {
    view.setErrorMessage("spanemail", "* Email đã được đăng ký trước đây rồi *")
  }
};
model.login = async (data) => {
  try {
    let response = await auth.signInWithEmailAndPassword(
      data.email,
      data.password
    );
    
    
    view.setScreenActive("wellcomePage");
    document.getElementById("yourself").style.display = "none"
    loadinglogin()

    localStorage.setItem("signin","id")
  } catch (error) {
    view.setErrorMessage("spanmk", "* Tài khoản hoặc mật khẩu không đúng *");
  }
};
model.saveChat = (data, dataname,mltime, time ,bothEmail,bothEmailReverse,iconhi) => {

  const firestoreQueries = async () => {

  let checkMassage = {
    message: {
      mltime,
      time: time,
      owner: firebase.auth().currentUser.email,
      content: {
        text: data,
        nameuser: dataname,
        iconhi:`${iconhi}`,
        
       
      },
    },
  };




     try {
      let response = await firebase
        .firestore()
        .collection("listMessage")
        .doc(bothEmail)
        .update({
          message: firebase.firestore.FieldValue.arrayUnion(checkMassage),
        });
    } catch (error) {
      try {
        let response = await firebase
          .firestore()
          .collection("listMessage")
          .doc(bothEmailReverse)
          .update({
            message: firebase.firestore.FieldValue.arrayUnion(checkMassage),
          });
      } catch (error) {
       
      }
    }
  
  };
  firestoreQueries();
  model.getChat()
  
};

model.getChat = async () => {
  if(localStorage.getItem("bothEmail") == "loichaocuazalo"){
    document.getElementById("table1").style.display = "none"
    document.getElementById("table").style.display = ""
  
  }else{
    document.getElementById("table1").style.display = ""
    document.getElementById("table").style.display = "none"
  }
  try {
    let response = await firebase
      .firestore()
      .collection("listMessage")
      .doc(`${localStorage.getItem("bothEmail")}`)
      .get();
    let result = response.data().message;

    view.renderList(result);
    
  } catch (error) {
    try {
      let response = await firebase
        .firestore()
        .collection("listMessage")
        .doc(`${localStorage.getItem("bothEmailReverse")}`)
        .get();
      let result = response.data().message;

      view.renderList(result);
    } catch (error) {
      
    }
  }
};



 




model.getIdName = async () => {
  try {
    let response = await firebase
      .firestore()
      .collection("idName")
      .doc("ys6HyV83PZ04PW2PM7Pk")
      .get();
    let result1 = response.data().idName;
    view.renderIdName(result1);
   view.renderThemBan(result1)
   
  } catch (error) {}
};

model.rederListFriend = async () => {
  try {
    let response = await firebase
      .firestore()
      .collection("idName")
      .doc("vGtlozg2ODnWYyeMp04E")
      .get();
    let result1 = response.data().idNamechokhac;
    view.rederListFriend(result1);
  
    
    


  } catch (error) {}
};

