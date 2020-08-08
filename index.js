console.log('ready');
let items = localStorage.getItem('items');
let inc = localStorage.getItem('inc');
let exp = localStorage.getItem('exp');
let total = localStorage.getItem('total');
let Total = localStorage.getItem('Total')

if (Total) {
  Total = parseInt(Total)
  console.log(Total)
} else {
  localStorage.setItem('Total', 0)
  Total = 0
}

if (items) {
  items = JSON.parse(items);
  for (let i = 0; i < items.length; i++) {
    $('.collection').append(items[i]);
  }
} else {
  let arr = [];
  arr = JSON.stringify(arr);
  localStorage.setItem('items', arr);
}

if (inc) {
  $('#inc_amount').html(`$${parseInt(inc).toLocaleString()}`);
} else {
  localStorage.setItem('inc', '0');
}

if (exp) {
  $('#exp_amount').html(`$${parseInt(exp).toLocaleString()}`);
} else {
  localStorage.setItem('exp', '0');
}

if (total) {
  console.log('--total', total)
  if (parseInt(total) < 0) {
    $('#header').attr('class', 'red')
    $('#total_amount').html(`-$${Math.abs(parseInt(total)).toLocaleString()}`);
  } else {
    $('#total_amount').html(`$${parseInt(total).toLocaleString()}`);
  }
} else {
  localStorage.setItem('total', '0');
}

$('ion-icon').click((e) => {
  const action = $('.add__type').val();
  const description = $('.add__description').val();
  const value = $('.add__value').val();
  let type = '';
  let sign = '';
  let total = unLocale($('#total_amount').html().substr(1));
  console.log(total);
  if (action == 'inc') {
    type = 'income';
    sign = '+';
    let newVal =
      unLocale($('#inc_amount').html().substr(1)) + parseInt(value);
    let newTotal = newVal - unLocale($('#exp_amount').html().substr(1))
    localStorage.setItem('Total', newTotal)
    console.log('total ', localStorage.getItem('Total'))
    $('#inc_amount').html('$' + newVal.toLocaleString());
    $('#total_amount').html('$' + newTotal.toLocaleString());

    if (newTotal < 0) {
      newTotal = Math.abs(newTotal)
      $('#total_amount').html('-$' + newTotal.toLocaleString());
      $('#header').attr('class', 'red')
    } else {
      console.log('green')
      $('#total_amount').html('$' + newTotal.toLocaleString());
      $('#header').attr('class', 'green')
    }

    localStorage.setItem('inc', newVal);
    localStorage.setItem('total', newTotal);
    console.log('saved total ', localStorage.getItem('total'))
  } else {
    type = 'expense';
    sign = '-';
    const newVal = Math.abs(
      unLocale($('#exp_amount').html().substr(1)) + parseInt(value)
    );
    let newTotal = unLocale($('#inc_amount').html().substr(1)) - newVal
    localStorage.setItem('Total', newTotal)
    localStorage.setItem('total', newTotal);

    console.log('total ', localStorage.getItem('Total'))

    if (newTotal < 0) {
      newTotal = Math.abs(newTotal)
      $('#total_amount').html('-$' + newTotal.toLocaleString());
      $('#header').attr('class', 'red')
    } else {
      console.log('green')
      $('#total_amount').html('$' + newTotal.toLocaleString());
      $('#header').attr('class', 'green')
    }
    $('#exp_amount').html('$' + newVal.toLocaleString());

    localStorage.setItem('exp', newVal);

    console.log('saved total ', localStorage.getItem('total'))
  }

  const date = getTime();

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
    <p>${sign}$${parseInt(value).toLocaleString()}</p>
  </div>
</div>`;

  $('.collection').prepend(newItem);
  let arr = localStorage.getItem('items');
  arr = JSON.parse(arr);
  arr.push(newItem);
  arr = JSON.stringify(arr);
  localStorage.setItem('items', arr);

  $('.add__type').val('inc')
  $('.add__description').val('')
  $('.add__value').val('')
});

const unLocale = data => {
  return parseInt(data.replace(/[^0-9-.]/g, ''))
}

const getTime = () => {
  let date = new Date();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  let day = date.getDate();
  let month = months[date.getMonth()];
  return month + ' ' + day + ', ' + strTime;
};
