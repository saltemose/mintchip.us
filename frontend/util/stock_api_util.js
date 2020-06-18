export const fetchStock = (ticker) => (
  $.ajax({
    method: 'GET',
    url: `https://cloud.iexapis.com/stable/stock/${ticker}/batch?types=quote,news,company&token=${window.iexKey}`
  })
)

export const fetchStockIntraDayData = ticker => (
  $.ajax({
    method: 'GET',
    url: `https://cloud.iexapis.com/stable/stock/${ticker}/intraday-prices/?token=${window.iexKey}`
  })
);

export const fetchStockWeeklyData = ticker => (
  $.ajax({
    method: 'GET',
    url: `https://cloud.iexapis.com/stable/stock/${ticker}/chart/5dm?token=${window.iexKey}`
  })
);

export const fetchStockMonthlyData = ticker => (
  $.ajax({
    method: 'GET',
    url: `https://cloud.iexapis.com/stable/stock/${ticker}/chart/1mm?token=${window.iexKey}`
  })
);

export const fetchStock3MData = ticker => (
  $.ajax({
    method: 'GET',
    url: `https://cloud.iexapis.com/stable/stock/${ticker}/chart/3m?token=${window.iexKey}`
  })
)

export const fetchStock1YData = ticker => (
  $.ajax({
    method: 'GET',
    url: `https://cloud.iexapis.com/stable/stock/${ticker}/chart/1Y?token=${window.iexKey}`
  })
)

export const fetchStock5YData = ticker => (
  $.ajax({
    method: 'GET',
    url: `https://cloud.iexapis.com/stable/stock/${ticker}/chart/5Y?token=${window.iexKey}`
  })
)