import {menuArray} from './data.js'

let orderingItems = document.getElementById('ordering-items')
let orderedItemList = document.getElementById('ordered-items-list')
let orderItem = document.getElementById('order-item')
let itemOrdered = []

document.addEventListener('click', (e) => {
    if(e.target.dataset.add) {
        addToOrderClick(e.target.dataset.add) 
    } else if (e.target.dataset.closemodal){
        orderModalHtml.style.display = 'none'
    } else if (e.target.dataset.remove){
        removeItem(e.target.dataset.remove)
    }
     
      
  }) 
function getOrderingItems(){
    let itemsHtml = ''
    menuArray.forEach(item => {
        itemsHtml += `
           <div class='menu-container'>
            <div class='menu-container-inner'>
                    <div class='food-image'>
                            <span > ${item.emoji} </span>
                    </div>
                    <div>
                            <span>
                                <h4> ${item.name} </h4> 
                            </span>
                            <p> ${item.ingredients} </p>
                            <h4 class='price'> $ ${item.price} </h4> 
                    </div>
                </div>
                <div class='add-btn' data-add="${item.id}">
                    + 
                </div>
           </div>
        `
      
    })
    orderingItems.innerHTML = itemsHtml
}

const addToOrderClick = (itemId) => {
    orderItem.style.display = 'block'
    let orderedItemsHtml = ``
       const targetItem = menuArray.filter((item) => {
        return itemId == item.id
       })[0]
       itemOrdered.push(targetItem)
       itemOrdered.forEach((item) => {
        orderedItemsHtml += `
                      <span class='span-list-item'>
                      <span>
                            <span>${item.name} </span> 
                            <span id="remove-item" data-remove=${item.id} style="font-size: 10px; 
                                    color:#BBBBBB;"
                            > remove </span>
                        </span
                          <span> $ ${item.price} </span>
                      </span> 
       ` 
     })
           getTotalPrice(itemOrdered)
     
       orderedItemList.innerHTML = orderedItemsHtml
       

    }
    
    const removeItem = (itemId) => {
        const removeTargetItem = itemOrdered.filter((item)=> {
            return itemId === item.id
        })
        if (removeTargetItem !== -1) {
            itemOrdered.splice(removeTargetItem, 1);
            updateOrderedItems();
            getTotalPrice(itemOrdered);
          }
    }

    const updateOrderedItems = () => {
        let orderedItemsHtml = '';
        if (itemOrdered.length == 0 ){
            orderedItemsHtml += `
            <div class="no-items">
              <span> No item on the List </span>
            </div>  
            `
          
        }
        itemOrdered.forEach((item) => {
          orderedItemsHtml += `
            <span class='span-list-item'>
              <span>
                <span>${item.name} </span> 
                <span id="remove-item" data-remove=${item.id} style="font-size: 10px; color:#BBBBBB;"> remove </span>
              </span>
              <span> $ ${item.price} </span>
            </span> 
          `;
        });
        orderedItemList.innerHTML = orderedItemsHtml;
      };
      

    const getTotalPrice = (items) => {
      
        let priceTotal = 0
        items.forEach((item) => {
           priceTotal += item.price
        })

        if(items.length == 0){
          document.getElementById('totalPrices').innerHTML = ''
          return;

        }
        document.getElementById('totalPrices').innerHTML = `
            <hr style="width:546px;"
            >
            <div class="total-price">
                <div class="total-price-text">
                   Total Price 
                </div>
                <div>
                $ ${priceTotal}
                </div>
            </div>
            <div class="complete-btn" id="complete-btn" > Complete Order </div>

        `
      document.getElementById('complete-btn').addEventListener('click', showModal)
      
      
        
    }


    let orderModalHtml = document.getElementById('order-modal')
    const showModal = () => {
          orderModalHtml.style.display = 'block'
          document.getElementById('pay-btn').addEventListener('click', handlePayment)
          
        }
        
            const handlePayment  = (e) => {
            const paymentForm = document.getElementById('payment-form');
            const Orderconfirmation = document.getElementById('order-confirmed')
            e.preventDefault();
            const paymentFormData = new FormData(paymentForm);
            const fullName = paymentFormData.get('fullName');
            const cvv = paymentFormData.get('cvv');
            const cardNumber = paymentFormData.get('cardNumber');
            Orderconfirmation.style.display = 'block';
            if (!fullName || !cvv || !cardNumber) {
                alert('Please fill in all the required fields.');
                return;
            } else {
            Orderconfirmation.innerHTML = `
               <p class="confirmation-text">
               Thanks! ${fullName}, Your Order has been confirmed
               </p>
            `
            setTimeout(function(){
                Orderconfirmation.style.display = 'none';
            }, 12000)
            orderModalHtml.style.display = 'none'
        }

        paymentForm.reset();
        }
           
           
           
            
        
        
    
    
        
        
    getOrderingItems()
  

    