function user(page){
    let request=new XMLHttpRequest();
    request.addEventListener('load', render);
    request.addEventListener('error',errorRender);
    request.open('GET','https://reqres.in/api/users?page='+page);
    request.send();
}
let currentPage=1;
let totalPages;

function render(){
    var fragment=document.createDocumentFragment();
    let response=this.responseText;
    let responseData=JSON.parse(response);
    responseData.data.forEach(item =>{
        let li=document.createElement('li');

        let images=document.createElement('img');
        images.src=item.avatar;


        let p=document.createElement('p');
        p.textContent=item.email;
       
        li.appendChild(p);
        li.appendChild(images);
        fragment.appendChild(li);
    });
        document.getElementById('ul').innerHTML='';
        document.getElementById('ul').appendChild(fragment);
        totalPages=responseData.total_pages;
}

function errorRender(){
    let p=document.createElement('p');
    p.textContent='service error';
    document.getElementById('divblock').appendChild(p);
}
document.getElementById('prev').addEventListener('click',function(){
    if(currentPage==1){
        return
    }
    if(currentPage-=1){
        user(currentPage);
    }
});
document.getElementById('next').addEventListener('click',function(){
    if(currentPage==totalPages){
        return
    }
    currentPage+=1;
    user(currentPage);
});

user(currentPage);
    