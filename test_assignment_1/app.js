const table = document.querySelector('#table');
const tableBody = table.querySelector('tbody');

const fetchData = async () => {
    const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1');
    return await response.json();
}

const createRow = (currency, index) => {
    const row = document.createElement('tr');

    if (currency.symbol === 'usdt') {
        row.classList.add('green');
    }

    if (index < 5) {
        row.classList.add('blue');
    }

    row.innerHTML = `
        <td>${currency.id}</td>
        <td>${currency.symbol}</td>
        <td>${currency.name}</td>
    `;

    return row;
}

const showLoader = () => {
    const loader = document.createElement('p');
    loader.classList.add('loader');
    loader.textContent = 'Loading...';
    table.classList.add('loading');
    document.body.append(loader);
}

const removeLoader = () => {
    const loader = document.querySelector('.loader');
    table.classList.remove('loading');
    loader.remove();
}

const renderData = async () => {
    try {
        showLoader();
        const data = await fetchData();

        data.forEach((currency, index) => {
            const row = createRow(currency, index);
            tableBody.appendChild(row);
        });
        removeLoader();
    } catch (error) {
        console.error('Error: ', error)
    }
}

renderData();