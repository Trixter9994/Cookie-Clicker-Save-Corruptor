var x = document.createElement("INPUT");
x.setAttribute("type", "text");
document.getElementById("app").appendChild(x);
var y = document.createElement("INPUT");
y.setAttribute("type", "text");
document.getElementById("CorruptLevel").appendChild(y);
var button = document.getElementById("button");
button.addEventListener('click', corrupt);

function corrupt() {
  var CL=parseInt(y.value);
  var endstr=x.value.slice(x.value.indexOf("%"),x.value.length);
  var saveID=x.value.slice(0,x.value.indexOf("%"));
  saveID=atob(saveID);
  //console.log(saveID)
  //decompile string
  saveID=saveID.split("|");
  for(var i=0;i<saveID.length;i++){
    saveID[i]=saveID[i].split(";");
    for(var j=0;j<saveID[i].length;j++){
      saveID[i][j]=saveID[i][j].split(",");
    }
  }
  //do stuff...
  for(var i=0;i<CL;i++){
    var l1=(Math.floor(Math.random()*(saveID.length-2))+2);
    var l2=Math.floor(Math.random()*saveID[l1].length);
    var l3=Math.floor(Math.random()*saveID[l1][l2].length);
    var l4=Math.floor(Math.random()*saveID[l1][l2][l3].length);
    (l4==0)?lr=Math.floor(Math.random()*9)+1:lr=Math.floor(Math.random()*10);//choose non-zero number for beginning
    //console.log(l1,l2,l3,l4);
    if (saveID[l1][l2][l3][l4]!=undefined&&isNaN(saveID[l1][l2][l3][l4])==false) {
      saveID[l1][l2][l3]=saveID[l1][l2][l3].slice(0,l4)+lr.toString()+saveID[l1][l2][l3].slice(l4+1,saveID[l1][l2][l3].length+1);
      //console.log(saveID[l1][l2][l3],saveID[l1][l2][l3][l4]);
    }
  } 
  //recompile string
  for(var i=0;i<saveID.length;i++){
    for(var j=0;j<saveID[i].length;j++){
      saveID[i][j]=saveID[i][j].join(",");
    }
    saveID[i]=saveID[i].join(";"); 
  }
  saveID=saveID.join("|");
  //convert to base64
  //console.log(saveID);
  saveID=btoa(saveID);
  saveID = saveID.slice(0,-2)+endstr;
  document.getElementById("result").innerHTML=saveID;
}