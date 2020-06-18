export const createDeposit = (deposit) => (
    $.ajax({
      method: 'POST',
      url: '/api/deposit',
      data: { deposit }
    })
  )