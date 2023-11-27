
// user name display
const loggedkey=localStorage.getItem('loggedkey');
let welcomemsg=document.getElementById("welcomemsg")
welcomemsg.innerHTML=`<i class="fa-solid fa-user"></i> Welcome ${loggedkey}`
displayincomeexpense();
displayexpenseArray()
displayincomeArray()
// displaychart();

function gotoregister(){
    window.location='./register.html'
}
function logout(){
    
    window.location='./index.html';
  
}

function clearAll(){
   let res=confirm("Are you sure you want clear all data ?")
 if(res){
        let newobj=JSON.parse(localStorage.getItem(loggedkey));
        newobj.income=0;
        newobj.expense=0;  
        newobj.incomeArray=[];
        newobj.expenseArray=[];      
        localStorage.setItem(newobj.uname,JSON.stringify(newobj))   
        displayincomeexpense();
        // displaychart();
        document.getElementById("incomedetails").innerHTML='';
        document.getElementById("expensedetails").innerHTML='';
        
        alert("Cleared all data successfully")
        location.reload();
        }   


}

// Adding income Array

function addincomeArray(type,amt,bal,dt){
    
    let incomeobj={
        type:type,
        amt:amt,
        bal:bal,
        dt:dt
    }
    let newobj=JSON.parse(localStorage.getItem(loggedkey));
    
    newobj.incomeArray.push(incomeobj);
    
    localStorage.setItem(loggedkey,JSON.stringify(newobj));
    


}
// adding expense Array
function addexpenseArray(type,amt,bal,dt){
    
    let expenseobj={
        type:type,
        amt:amt,
        bal:bal,
        dt:dt
    }
    let newobj=JSON.parse(localStorage.getItem(loggedkey));
    
    newobj.expenseArray.push(expenseobj);
    
    localStorage.setItem(loggedkey,JSON.stringify(newobj));

}
// display incomeArray
function displayincomeArray(incomeArray){
    let newobj=JSON.parse(localStorage.getItem(loggedkey));
    let incomearray=newobj.incomeArray;
     let incomedetails=document.getElementById("incomedetails")
      incomedetails.innerHTML='';
    for(i of incomearray){
   
    let output=`<tr>
                <td>${i.type}</td>  
                 <td>+${i.amt}</td> 
                 <td>${i.bal}</td> 
                <td>${i.dt}</td>  
                 </tr>`
      incomedetails.innerHTML+=output ;         
    }
}

// display ExpenseArray
function displayexpenseArray(){
    let newobj=JSON.parse(localStorage.getItem(loggedkey));
    let expenseArray=newobj.expenseArray;
    let expensedetails=document.getElementById("expensedetails")
    expensedetails.innerHTML='';
    for(i of expenseArray){
   
    expensedetails.innerHTML+=`<tr>
                         <td>${i.type}</td>  
                         <td>-${i.amt}</td> 
                         <td>${i.bal}</td> 
                         <td>${i.dt}</td>  
    </tr>`
    }

}



function register(){
    email=document.getElementById("email").value
    uname=document.getElementById("uname").value
    passwd=document.getElementById("passwd").value
    console.log(email);
    if(email=='' || uname=='' || passwd==''){
        alert("Enter All Fields")
    }
    else{
        if(email in localStorage){
            alert("User email Already registered")
        }
        else{
            const userobj={
                    uname:uname,
                    passwd:passwd,
                    email:email,
                    income:0,
                    expense:0,
                    incomeArray:[],
                    expenseArray:[]

            }
            localStorage.setItem(uname,JSON.stringify(userobj))
            alert("User Registered Successfully")
            let modal=document.getElementById("exampleModal")
            window.location='./index.html';

        }
    }
}

// login
function login(event){
    event.preventDefault();
    let username=document.getElementById("username").value
    let password=document.getElementById("password").value

    if(username=='' || password==''){
        alert("Enter all fields")
    }
    else{
        if(username in localStorage){
            
            let newobj=JSON.parse(localStorage.getItem(username));
            console.log(newobj);
            if(password== newobj.passwd){
                localStorage.setItem('loggedobj',JSON.stringify(newobj))
                localStorage.setItem('loggedkey',username)
                window.location='./home.html'
            }
            else{
                alert("Wrong Password: login failed")
                document.getElementById("formlogin").reset()
            }
            

        }
        else{
            alert("User Does not exist, Please register")
        }
    }
}

// display income and expense
function displayincomeexpense(){
    let obj=JSON.parse(localStorage.getItem(loggedkey))
    
    let originalobj=JSON.parse(localStorage.getItem(obj.uname))
    let incomedisplay=document.getElementById("incomedisplay")
    let expensedisplay=document.getElementById("expensedisplay")
    incomedisplay.innerHTML=`Rs ${originalobj.income}/- `
    expensedisplay.innerHTML=`Rs ${originalobj.expense}/-`


}
// Add Income
function addIncome(event){
    event.preventDefault();
    let incometype=document.getElementById("incometype").value
     let incomeamt=document.getElementById("incomeamt").value
    if(incometype ==''||incomeamt==''){
        alert("Enter All Fields")
    }
    else{
        let newobj=JSON.parse(localStorage.getItem(loggedkey))

        newobj.income=newobj.income+parseFloat(incomeamt);
        let date=new Date().toISOString();
        console.log(date);   
        console.log(newobj);            
        localStorage.setItem(loggedkey,JSON.stringify(newobj))
        alert("Amount Added Successfully")
        displayincomeexpense();
        addincomeArray(incometype,incomeamt,newobj.income,date);
         displayincomeArray()
        document.getElementById("incomeform").reset();

    }


}
// Add Expense
function addExpense(event){
    event.preventDefault();
    let expensetype=document.getElementById("expensetype").value
    let expenseamt=document.getElementById("expenseamt").value
    if(expensetype==''|| expenseamt==''){
        alert("Enter All Fields")
    }
    else{
        let newobj=JSON.parse(localStorage.getItem(loggedkey))
        if(expenseamt >newobj.income){
            alert("Insufficient amount")
        }
        else{
            newobj.income=newobj.income-parseFloat(expenseamt)
            newobj.expense=newobj.expense+parseFloat(expenseamt)
            localStorage.setItem(newobj.uname,JSON.stringify(newobj))
            let date=new Date().toISOString();
            
            alert("expense added successfully")
            document.getElementById("expenseform").reset();
            displayincomeexpense();
            
            addexpenseArray(expensetype,expenseamt,newobj.income,date);
           
            displayexpenseArray();
            location.reload();
        }

    }
   
}

//display chart

function displaychart(){
    
    let newobj1=JSON.parse(localStorage.getItem(loggedkey))
    const expensearray=newobj1.expenseArray;
    let type=expensearray.map(x=>x.type);
    let values=expensearray.map(x=>x.amt);
    const mychart=document.getElementById("piechart").getContext('2d');
    const chart=new Chart(mychart,{
        type:"pie",
     data:{
            labels: type,
            datasets: [{        
            data: values,
            backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)',  'rgb(255, 205, 86)','black','green','grey','pink','purple'],
            }], 
          },
          options:{
            title:{
                display:true,
            }
          }
});
chart.update();
    }
    
    



