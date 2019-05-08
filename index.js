
var data = null;
var xhr = new XMLHttpRequest();
xhr.open('GET','./data.json',false);
xhr.onreadystatechange = function () {
    if( xhr.readyState == 4 && xhr.status == 200){
        data = JSON.parse(xhr.responseText);
    }
};
xhr.send();

var ulBox = document.getElementById('list_box');
var btns = document.getElementsByTagName('button');

function giveHtml(data) {
    var str = '';
    data.forEach((item,index,ary)=>{
        str +=`
                <li>
                    <div class="img_box">
                        <img src="${item.picImg}" alt="">
                    </div>
                    <div class="desc">${item.title}</div>
                    <div class="price">${item.price}</div>
                    <div class="price">${item.time}</div>
                    <div class="bot_box">
                        <div class="buyBtn">选购</div>
                        <div class="hot">${item.hot}</div>
                    </div>
                </li>
       `



    });
    ulBox.innerHTML = str;



}

giveHtml(data);
//var ary = ['time','price','hot']
var ary = [{key:'time',flag:1},{key:'price',flag:1},{key:'hot',flag:1}];
for (let i = 0; i<btns.length;i++){
    btns[i].onclick = function(){
        if(ary[i].flag === 1){
            data.sort((a,b)=>{
                return b[ary[i].key].replace(/-/g,'') -a[ary[i].key].replace(/-/g,'');
            });
            ary[i].flag = 2;
        }else{data.sort((a,b)=>{
            return a[ary[i].key].replace(/-/g,'') -b[ary[i].key].replace(/-/g,'');
        });
        ary[i].flag = 1;

        }
       // data.sort((a,b)=>{
            //return a[ary[i]].toString().replace(/-/g,'') - b[ary[i]].toString().replace(/-/g,'');
        //})
        giveHtml(data);
    }

}