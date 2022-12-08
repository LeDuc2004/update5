
window.onload = () => {
  

  firebase.auth().onAuthStateChanged((user) => {
    
    if (user && localStorage.getItem("signin") == "id") {
      
      view.setScreenActive("wellcomePage");

      loadinglogin()
      document.getElementById("yourself").style.display = "none"
      model.getChat()
      document.getElementById("divlistban").style.display = ""
      upload()
      localStorage.setItem("bothEmail","loichaocuazalo")
      
     
    } else {
      
      document.getElementById("body").style = "background-image: url(./imge/thumbnail.jpg);background-color: #3362fc;"
      
      view.setScreenActive("loginPage");
      
      
    }
    
  });
  
  firebase
    .firestore()
    .collection("listMessage")
    .onSnapshot(() => {
      model.getChat()
      upload()
    });
    firebase
    .firestore()
    .collection("idName")
    .onSnapshot((docs) => {

      model.getIdName()
      upload()
    });
  firebase
    .firestore()
    .collection("idName")
    .doc("vGtlozg2ODnWYyeMp04E")
    .onSnapshot((doc) => {
      view.rederListFriend(doc.data().idNamechokhac);
      upload()
    });
};
