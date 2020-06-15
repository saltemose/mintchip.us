export const fetchStocks = () => (
    $.ajax({
      method: 'GET',
      url: 'api/stocks'
    })
  );