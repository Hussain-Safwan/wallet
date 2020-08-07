console.log('ready')
let items = localStorage.getItem('items')
let inc = localStorage.getItem('inc')
let exp = localStorage.getItem('exp')
let total = localStorage.getItem('total')

if (items) {
  items = JSON.parse(items)
  for (let i=0; i<items.length; i++) {
    $('.collection').append(items[i])
  }
} else {
  let arr = []
  arr = JSON.stringify(arr)
  localStorage.setItem('items', arr) 
}

if (inc) {
  $('#inc_amount').html(`$${inc}`)
} else {
  localStorage.setItem('inc', '0')
}

if (exp) {
  $('#exp_amount').html(`$${exp}`)
} else {
  localStorage.setItem('exp', '0')
}

if (total) {
  $('#total_amount').html(`$${total}`)
} else {
  localStorage.setItem('total', '0')
}

$('ion-icon').click((e) => {
  const action = $('.add__type').val()
  const description = $('.add__description').val()
  const value = $('.add__value').val()
  let type = ''
  let sign = '' 
  let total = parseInt($('#total_amount').html().substr(1))
  console.log(total)
  if (action == 'inc') {
    type = 'income'
    sign = '+'
    const newVal = parseInt($('#inc_amount').html().substr(1)) + parseInt(value)
    const newTotal = total+parseInt(value)
    $('#inc_amount').html('$'+newVal)
    $('#total_amount').html('$'+newTotal)

    localStorage.setItem('inc', newVal)
    localStorage.setItem('total', newTotal)
  } else {
    type = 'expense'
    sign = '-'
    const newVal = Math.abs(parseInt($('#exp_amount').html().substr(1)) + parseInt(value))
    const newTotal = total - parseInt(value)
    $('#exp_amount').html('$'+newVal)
    $('#total_amount').html('$'+newTotal)

    localStorage.setItem('exp', newVal)
    localStorage.setItem('total', newTotal)
  }

  const date = getTime()
  console.log(date)

  const newItem = `<div class="item">
  <div class="item-description-time">
    <div class="item-description">
      <p>${description}</p>
    </div>
    <div class="item-time">
      <p>${date}</p>
    </div>
  </div>
  <div class="item-amount ${type}-amount">
    <p>${sign}$${value}</p>
  </div>
</div>`

 $('.collection').append(newItem)
let arr = localStorage.getItem('items')
arr = JSON.parse(arr)
arr.push(newItem)
arr = JSON.stringify(arr)
localStorage.setItem('items', arr)
})

const getTime = () => {
  let date = new Date()
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; 
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  let day = date.getDate()
  let month = months[date.getMonth()]
  return month + ' ' + day + ', ' + strTime;
}
