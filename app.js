const API = 'https://acme-users-api-rev.herokuapp.com/api';
const nav = document.querySelector('ul');

const dataPromise = Promise.all([
  axios.get(`${API}/products`),
  axios.get(`${API}/companies`)
])
.then( responses => {
  return {
    products: responses[0].data,
    companies: responses[1].data
  };
});

dataPromise.then( results => {
  renderNav(results);
  //renderTable(results);
});

const renderNav = (results)=> {
  //const { products, companies } = results;
  const products = results.products;
  const companies = results.companies;

  const html = `
    <li class='nav-item'>
      <a class='nav-link' href='#products'>
        Products (${ products.length })
      </a>
    </li>
    <li class='nav-item'>
      <a class='nav-link' href='#companies'>
        Companies (${ companies.length })
      </a>
    </li>
  `;
  nav.innerHTML = html;
};

window.addEventListener('hashchange', ()=> {
  const hash = window.location.hash.slice(1);
  dataPromise.then( results => {
    const products = results.products;
    const companies = results.companies;
    if(hash === 'companies'){
      console.log(companies);

    }
    else if (hash === 'products'){
      console.log(products);
    }
  })
});
