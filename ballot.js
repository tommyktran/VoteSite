let activeWriteinOvalId = ''
let loadTimer = setInterval(initPage, 100)
const idHtmlTemplate = '{contestIndex}_{candidateIndex}_{rankIndex}'

// service worker for PWA
// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('/sw.js')
//     .then(reg => console.log('service worker registered'))
//     .catch(err => console.log('service worker not registered'))
// }

// function navigationType(){
//   var result;
//   var p;
//   if (window.performance.navigation) {
//       result=window.performance.navigation;
//       if (result==255){result=4} // 4 is my invention!
//   }

//   if (window.performance.getEntriesByType("navigation")){
//     p=window.performance.getEntriesByType("navigation")[0].type;

//     if (p=='navigate'){result=0}
//     if (p=='reload'){result=1}
//     if (p=='back_forward'){result=2}
//     if (p=='prerender'){result=3} //3 is my invention!
//   }
//   return result;
// }

function initPage() {
  if (document.readyState == 'complete') {

    clearInterval(loadTimer)

    // clears out all selections if page is refreshed
    // if (navigationType() == 1) {
    //   sessionStorage.clear()      
    // }
    // add the additional writeins into the ballot data:
    // addWriteinsToData();

    let elm = document.getElementById("contests")
    ballot.contests.forEach((race, index, contests) => {
      elm.insertAdjacentHTML("beforeend", buildRace(race, index))
    })
    //start running other javascript after page is rendered
    //document.querySelector('input[type="checkbox"]').focus() // places focus on the first oval on page

    let question = document.querySelectorAll('.questionRaceOval')
    question.forEach(checkbox => checkbox.addEventListener('click', questionHandler))

    let test_all = document.querySelectorAll('.regularRaceOval')
    test_all.forEach(checkbox => checkbox.addEventListener('click', regularHandler))

    let rc = document.querySelectorAll('.rcOval')
    rc.forEach(checkbox => checkbox.addEventListener('click', rankChoiceHandler))

    // let writeboxes = document.querySelectorAll('input[type="text"]')
    // writeboxes.forEach(writebox => writebox.addEventListener('focusout', textHandler))

    // let allOvals = document.querySelectorAll('input[type="checkbox"]')
    // allOvals.forEach(oval => oval.addEventListener('keydown', keypressHandler))

    // document.getElementById('reviewButton').addEventListener('click', reviewBtnHandler)

    document.getElementById('doneButton_AffidavitPage').addEventListener('click', (event) => {
      const passwordEle = document.getElementById('signedby');
      const password = 'vote123';
      if (passwordEle.value === password) {
        document.querySelector('main').innerHTML = `
          <div id="center">
            <h1 id="thankyouForVoting" style="text-align:center;font-family:arial;" tabindex="0">Thank you for voting!</h1>
          </div> 
        `;
        document.body.style.backgroundColor = "white";
        document.getElementById('thankyouForVoting').focus();
        document.getElementById('thankyouForVoting').scrollIntoView();      }
      else {
        showModal('pwModal', 'doneButton_AffidavitPage')
      }
    });

    reviewBtnHandler();

    document.getElementById('step1').focus();
    // document.querySelector("input").focus();


    


    

  }
}

function addWriteinsToData() {
  ballot.contests.forEach((contest, contestIndex) => {
    if (contest.contestType === 'R') {
      const voteForValue = contest.voteFor
      for (let i = 0; i < voteForValue; i++) {
        let newWriteinCandidate = {
          candidateName: '',
          candidateCode: 'writein' + '-' + i,
          selected: 0
        }
        contest.candidates.push(newWriteinCandidate)
      }
    }
  })
}

