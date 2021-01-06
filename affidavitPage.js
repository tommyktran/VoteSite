function submit() {
    if (document.getElementById('signedby').value === 'vote!') {
        document.documentElement.innerHTML = '<h1 style="text-align:center;font-family:arial;">Thank you for voting!</h1>';
    } else {
        document.querySelector('.tooltiptext').style = "visibility: visible; opacity: 1;"
        window.setTimeout(() => {
          document.querySelector('.tooltiptext').style = "visibility: visible; opacity: 1; animation: fade .3s forwards"
        }, 2500);
    }
}