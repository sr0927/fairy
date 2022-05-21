sign_btn = document.querySelector("#sign_btn");
setitem = document.querySelector("#item");
selecttime = document.querySelector("#time");
getitem3 = Array.from(document.querySelectorAll(".getitem3"))
getitem4 = Array.from(document.querySelectorAll(".getitem4"))
getitem5 = Array.from(document.querySelectorAll(".getitem5")) 
function clear(){
    for(i=0;i<getitem3.length;i++){
        getitem3[i].classList.remove("notTime");
    }
    for(i=0;i<getitem4.length;i++){
        getitem4[i].classList.remove("notTime");
    }
    for(i=0;i<getitem5.length;i++){
        getitem5[i].classList.remove("notTime");
    }
}
function notTime(list){
    for(i=0;i<list.length;i++){
        list[i].classList.add("notTime")
    }
}

setitem.addEventListener('click',(e)=>{
    clear();
    selecttime.value = "";
})
selecttime.addEventListener('click',(e)=>{
    itemValue = setitem.value;
    if(itemValue=="武器"){
        notTime(getitem4);
        notTime(getitem5);
    }else if(itemValue=="衣服"){
        notTime(getitem3);
        notTime(getitem5);
    }else if(itemValue=="附魔石"){
        notTime(getitem3);
        notTime(getitem4);
    }
})


sign_btn.addEventListener('click',(e)=>{
    e.preventDefault();
    var time = new Date();
    year = time.getFullYear();
    month = time.getMonth();
    date = time.getDate();
    time_h = time.getHours();
    time_m = time.getMinutes();
    time_s = time.getSeconds();
    time_ms = time.getMilliseconds();
    sign_time = year+"-"+month+"-"+date+" "+time_h+":"+time_m+":"+time_s
    
    let name = document.querySelector("#name").value;
    let line = document.querySelector("#line").value;
    let dc = document.querySelector("#dc").value;
    let selectItem = document.querySelector("#item").value;
    let itemQuantity = document.querySelector("#itemQuantity").value;
    let selectTime = document.querySelector("#time").value;

    
    if(name == "" || line == "" || dc == "" || selectItem == "" || itemQuantity == "" || selectTime == ""){
        swal({
            title: "登記失敗",
            text: "內容不可空白",
            icon: "error",
            button: "關閉",
        });
    }else{
        $.ajax({
            url: "https://script.google.com/macros/s/AKfycbxjoA7ZzKlA55hEOxde9yuDTWg_zwmytSTU1YXpSrYLaHILU0w3kcCXcHe1vvIfMcFw/exec",
            data: {
                "date": sign_time,
                "name": name,
                "line": line,
                "dc": dc,
                "selectItem": selectItem,
                "itemQuantity": itemQuantity,
                "selectTime":selectTime
            },
            success: function(response) {
            if(response == "成功"){
                swal({
                    title: "登記成功",
                    text: "已為您排入，請耐心等待",
                    icon: "success",
                    button: "關閉"
                })
                document.getElementById("name").value = null;
                document.getElementById("line").value = null;
                document.getElementById("dc").value = null;
                document.getElementById("item").value = null;
                document.getElementById("itemQuantity").value = null;
                document.getElementById("time").value = null;
            }else{
                swal({
                    title: "登記失敗",
                    icon: "error",
                    button: "關閉"
                })
            }
            },
        });
    }

})