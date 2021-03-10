function submit() {
    if (document.getElementById('signedby').value === 'vote!') {
        document.documentElement.innerHTML = '<h1 id="thankyouForVoting" style="text-align:center;font-family:arial;">Thank you for voting!</h1>';
        document.getElementById('thankyouForVoting').scrollIntoView();
        document.getElementById('thankyouForVoting').focus();
    }
}