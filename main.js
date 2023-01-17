
const title = document.getElementById('title');

const price = document.getElementById('price');
const taxe = document.getElementById('taxes');
const ads = document.getElementById('ads');

const count = document.getElementById('count');
const category = document.getElementById('category');
const total = document.getElementById('total');

const create = document.getElementById('create');

//display inputs div
const displayForm = document.getElementById('displayForm');

// mood of create/update btn 
let mood = 'create';

// variable that take id from update to use in create function
let tmp;

//mood to choose searching by Title/category 
let moodSearch = 'title';

// get total Price 
function getTotal() {
    if (price.value != '') {
        let result = +price.value + +taxe.value + +ads.value;
        total.innerHTML = result;
    }
    else {
        total.innerHTML = '0';
    }

}

displayForm.addEventListener('click', _ => {
    let inputs = document.querySelector('#inputs');
    inputs.classList.toggle('hide');
})


//create a new product
let products;
if (localStorage.product != null) {
    products = JSON.parse(localStorage.product);

}
else {
    products = [];
}

create.onclick = function () {
    let product = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxe: taxe.value,
        ads: ads.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase()

    };

    // add product "count" time 
    if (title.value != '' &&
        price.value != '' &&
        category.value != '' &&
        product.count < 100
    ) {
        if (mood === 'create') {
            if (product.count > 1) {
                for (let i = 0; i < product.count; i++) {
                    products.push(product);
                }
            }
            else {
                products.push(product);
            }
        }
        else {
            products[tmp] = product;
            mood = 'create';
            create.innerHTML = 'create';
            count.style.display = 'block';
        }

        localStorage.setItem('product', JSON.stringify(products));

        clearData();

    }

    showData();

}


function clearData() {
    title.value = '';
    price.value = '';
    taxe.value = '';
    ads.value = '';
    total.innerHTML = '';
    category.value = '';
    count.value = '';

}

// read data 
function showData() {
    getTotal();
    let table = '';
    for (let i = 0; i < products.length; i++) {
        table += `
                <tr> 
                    <td>${i + 1}</td> 
                    <td>${products[i].title} </td>
                    <td>${products[i].price}  </td>
                    <td>${products[i].taxe} </td>
                    <td>${products[i].ads} </td>
                    <td>${products[i].total} </td>
                    <td>${products[i].category} </td>
                    <td><button onclick="updateData(${i})" id="update" >update</button></td>
                    <td> <button onclick='deleteData(${i})' id="delete" >delete</button></td>
                </tr>` ;


    }

    document.querySelector('#tbody').innerHTML = table;

    // clear Data 
    if (products.length > 0) {
        document.getElementById('deleteAll').innerHTML =
            `<button id="clear" onclick="clearAll()">Delete All (${products.length})</button>
        `
    }
    else {
        document.getElementById('deleteAll').innerHTML = '';
    }
}

showData();

//Delete a product 
function deleteData(id) {
    products.splice(id, 1);

    // the new variables in localStorage
    localStorage.product = JSON.stringify(products);

    showData();

}


function clearAll() {
    localStorage.clear();
    products.splice(0);
    showData();
}


function updateData(id) {


    title.value = products[id].title;
    price.value = products[id].price;
    taxe.value = products[id].taxe;
    ads.value = products[id].ads;
    // on ne modifier pas le count 
    count.style.display = 'none';
    category.value = products[id].category;
    getTotal();
    create.innerHTML = 'Update';
    // change mood
    mood = 'update';

    tmp = id;

    window.scroll({
        top: 0,
        behavior: 'smooth'
    })

    let inputs = document.querySelector('#inputs');
    if (inputs.classList.contains('hide')) {
        inputs.classList.remove('hide')
    }

}


function getsearchMood(id) {

    if (id === 'searchByTitle') {
        moodSearch = 'title';

    }
    else {
        moodSearch = 'category';
    }
    let search = document.getElementById('search');
    search.focus();
    search.placeholder = `search By ${moodSearch}..`;

    search.value = '';
    showData();
}

function searchData(value) {
    let table = '';
    for (let i = 0; i < products.length; i++) {
        if (moodSearch === 'title') {

            if (products[i].title.includes(value.toLowerCase())) {

                table += `
                <tr> 
                    <td>${i + 1}</td> 
                    <td>${products[i].title} </td>
                    <td>${products[i].price}  </td>
                    <td>${products[i].taxe} </td>
                    <td>${products[i].ads} </td>
                    <td>${products[i].total} </td>
                    <td>${products[i].category} </td>
                    <td><button onclick="updateData(${i})" id="update" >update</button></td>
                    <td> <button onclick='deleteData(${i})' id="delete" >delete</button></td>
                </tr>` ;
            }

        }
        else {

            if (products[i].category.includes(value.toLowerCase())) {
                table += `
                <tr> 
                    <td>${i + 1}</td> 
                    <td>${products[i].title} </td>
                    <td>${products[i].price}  </td>
                    <td>${products[i].taxe} </td>
                    <td>${products[i].ads} </td>
                    <td>${products[i].total} </td>
                    <td>${products[i].category} </td>
                    <td><button onclick="updateData(${i})" id="update" >update</button></td>
                    <td> <button onclick='deleteData(${i})' id="delete" >delete</button></td>
                </tr>` ;
            }
        }
    }

    document.querySelector('#tbody').innerHTML = table;

}