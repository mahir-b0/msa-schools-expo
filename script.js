const items = {
    'Keffiyeh': 0,
    'Thai': 0,
    'Hoodie': 0,
    'MSA': 0
};

function startGame() {
    sessionStorage.clear();
    sessionStorage.setItem('balance', 100);
    for (let key in items) {
      sessionStorage.setItem(key, 0);
    }
    document.getElementById('intro').classList.add('hidden');
    document.getElementById('store').classList.remove('hidden');
    updateBalance();
}

function updateBalance() {
    document.getElementById('balance').textContent = sessionStorage.getItem('balance');
}

function buy(item, price) {
    const qtyInput = document.getElementById(item.toLowerCase() + 'Qty');
    const qty = parseInt(qtyInput.value);
    const balance = parseInt(sessionStorage.getItem('balance'));
    const total = price * qty;

    const newBalance = balance - total;
    // not enough money
    if (newBalance < 0 && qty > 0) {
      alert("get your money up!");
      return;
    }
    sessionStorage.setItem('balance', newBalance);

    const currentQty = parseInt(sessionStorage.getItem(item));

    // don't change no. of items if <0
    if (qty > 0) {
      sessionStorage.setItem(item, currentQty + qty);
    }

    updateBalance();

    // if msa is bought, finish game
    if (item === 'MSA') {
      const finalQty = parseInt(sessionStorage.getItem('MSA'));
      if (finalQty >= 1) {
        document.getElementById('store').classList.add('hidden');
        document.getElementById('win').classList.remove('hidden');
      }
    }
}