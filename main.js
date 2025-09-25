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
            wrapper.innerHTML = ""
            database.forEach(e => {
                let card = document.createElement('div')
                card.classList.add('card')
                card.innerHTML = `
            <img class="card-img" src="${e.photo}" alt="" />
            <h2 class="card-item">${e.title}</h2>
            <div class="card-info">
              <p class="card-reyting"> ⭐️ ${e.rating} </p>
            </div>
            <p class="card-sum">${e.monthly_payment}</p>
            <div class="card-bottom">
              <div class="card-price">
                <p class="discount">${e.old_price}</p>
                <p class="price">${e.price}</p>
              </div>
              <button id="icon${e.id}" class="icon-btn">
                <img src="./Button (1).png"/>
              </button>
            </div>
        `
                wrapper.append(card)

                // ✅ eventni to‘g‘ri qo‘ydik
                let iconBtn = card.querySelector(`#icon${e.id}`)
                iconBtn.addEventListener('click', () => countProduct(e))
            });
        }
        rendercard(data)

    } catch (e) {
        console.error(e + ' xatolik keldi');
    } finally {
        console.log('Done');
    }
}
getcard()

let btnAdd = document.querySelector('.addProduct').addEventListener('click', () => {
    let postProduct = async () => {
        try {
            let text = document.querySelector('.text')
            let title = text.value
            let number = document.querySelector('.number').value
            let old_price = document.querySelector('.oldPrice').value
            let monthly_payment = document.querySelector('.payment').value
            let catygory = document.querySelector('.catygory').value
            let rating = document.querySelector('.reyting').value
            let reviews = document.querySelector('.reviews').value
            let photo = document.querySelector('.photo').value

            await fetch('http://localhost:3001/products', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title,
                    number,
                    old_price,
                    monthly_payment,
                    catygory,
                    rating,
                    reviews,
                    photo
                })
            })
        } catch (e) {
            console.error(e);
        } finally {
            console.log('malumot keldi');
        }
    }
    postProduct()
})

function countProduct(product) {
    let saveProduct = JSON.parse(localStorage.getItem('product') || '[]')
    saveProduct.push(product)
    let uzunlik = localStorage.setItem("product", JSON.stringify(saveProduct))
    alert(`Maxsulot saqlandi: ${product.title}`)

    let basketCount = document.querySelector('.count-basket')
    basketCount.textContent = saveProduct.length

}
