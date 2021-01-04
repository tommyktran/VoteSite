function submit() {
    if (document.getElementById('signedby').value === 'vote!') {
        document.documentElement.innerHTML = '<h1 style="text-align:center;font-family:arial;">Thank you for voting!</h1>';
    }
}