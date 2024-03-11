 let totalAmount=document.getElementById('total-amount');
let userAmount=document.getElementById('user-amount');
const checkAmountButton=document.getElementById('check-amount');
const totalAmountButton=document.getElementById('total-amount-button');
const productTitle=document.getElementById('product-title');
const errorMsg=document.getElementById('budget-error');
const productTitleError=document.getElementById('product-title-error');
const productCostError=document.getElementById('product-cost-error');
const amount=document.getElementById('amount');
const expenditureValue=document.getElementById('expenditure-value');
const balanceAmount=document.getElementById('balance-amount');
const list=document.getElementById('list');
let tempAmount=0;
// body.preventDefault();
// setBudget

totalAmountButton.addEventListener('click',()=>{
    tempAmount = totalAmount.value;
    //empty or negative
    if(tempAmount==="" || tempAmount <0){
        errorMsg.classList.remove("hide")
}
    else{
        errorMsg.classList.add("hide");
        amount.innerHTML=tempAmount;
        balanceAmount.innerHTML=tempAmount-expenditureValue.innerHTML;
        totalAmount.value="";
    }
   } )
// func for edit del
const disableButton=(b)=>{
let editButtons=document.getElementsByClassName('edit');
Array.from(editButtons).forEach((button)=>{
    button.disabled=b;
    })
}

// modify
const modifyElement=(element,edit)=>{
    let parentDiv=element.parentElement;
    let currentBalanace=balanceAmount.innerHTML;
    let currentExpense=expenditureValue.innerHTML;
    let parentAmount=parentDiv.querySelector('.amount').innerHTML;
    if(edit){
        let parentText=parentDiv.querySelector('.product').innerHTML;
        productTitle.value=parentText;
        userAmount.value=parentAmount;
        disableButton(true);
    }
    balanceAmount.innerHTML=parseInt(currentBalanace)+parseInt(parentAmount);
    expenditureValue.innerHTML=parseInt(currentExpense)-parseInt(parentAmount);
    parentDiv.remove();
}
// create list
const listCreator=(expenseName,expenseAmount)=>{
    let li=document.createElement("div")
    li.classList.add("sublist-content","flex-space")
    list.appendChild(li);
    li.innerHTML=`<p class="product">${expenseName}</p><p class="amount">${expenseAmount}</p>`;
   
    let editButton=document.createElement("button");
    editButton.classList.add("fa-solid","fa-pen-to-square","edit");
    editButton.style.fontSize="24px";
    editButton.addEventListener("click",()=>{
        modifyElement(editButton,true);
    })

    let deleteButton=document.createElement("button");
    deleteButton.classList.add("fa-solid","fa-trash-can","delete");
    deleteButton.style.fontSize="24px";
    deleteButton.addEventListener("click",()=>{
        modifyElement(deleteButton);
    })
    li.appendChild(editButton);
    li.appendChild(deleteButton);   
    document.getElementById('list').appendChild(li);
}
// Add expense

checkAmountButton.addEventListener('click',()=>{
      if(!userAmount.value || !productTitle.value){
            productTitleError.classList.remove("hide");
             return false
        }
        disableButton(false);
        let expenditure=parseInt(userAmount.value);
        let sum=parseInt(expenditureValue.innerHTML)+expenditure;
        expenditureValue.innerHTML=sum;

        const totalBalance=tempAmount-sum;
        balanceAmount.innerText=totalBalance;
        listCreator(productTitle.value,userAmount.value);
        productTitle.value="";
        userAmount.value="";
    })
