let getcard = async () => {
    try {
        let modal = document.querySelector('.modal');
        let btn = document.querySelector('.btn-modal');
        let close = document.querySelector('.close');
        btn.addEventListener('click', () => {
            modal.classList.add('open');   // ✅ modal ochiladi
        });
        close.addEventListener('click', () => {
            modal.classList.remove('open'); // ✅ modal yopiladi
        });


        let res = await fetch('http://localhost:3001/products')
        let data = await res.json()
        function rendercard(database) {
            let wrapper = document.querySelector('.main-wrapper')
            database.forEach(e => {
                let card = document.createElement('div')
                card.classList.add('card')
                card.innerHTML = `
             <img class="card-img" src="./yog.png" alt="" />
            <h2 class="card-item">
              ${e.title}
            </h2>
            <div class="card-info">
              <p class="card-reyting"> ${e.rating} </p>
            </div>
            <p class="card-sum"> ${e.monthly_payment}</p>
            <div class="card-bottom">
              <div class="card-price">
                <p class="discount">${e.old_price}</p>
                <p class="price">${e.price}</p>
              </div>
              <img src="" alt="" />
            </div>
            `
                wrapper.append(card)
            });
        }
        rendercard(data)

    } catch (e) {
        console.log(e + ' xatolik keldi');

    } finally {
        console.log('Done');

    }
}
getcard()

let btnAdd = document.querySelector('.addProduct').addEventListener('click', () => {
    console.log('hello');

    let postProduct = async () => {
        let text = document.querySelector('.text')
        let title = text.value
        let postres = await fetch('http://localhost:3001/products', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title,
                
            })
        })
    }
    postProduct()
})
