let activeWriteinOvalId = ''

const idHtmlTemplate = '{contestIndex}_{candidateIndex}_{rankIndex}'


function navigationType(){

  var result;
  var p;

  if (window.performance.navigation) {
      result=window.performance.navigation;
      if (result==255){result=4} // 4 is my invention!
  }

  if (window.performance.getEntriesByType("navigation")){
     p=window.performance.getEntriesByType("navigation")[0].type;

     if (p=='navigate'){result=0}
     if (p=='reload'){result=1}
     if (p=='back_forward'){result=2}
     if (p=='prerender'){result=3} //3 is my invention!
  }
  return result;
}

// service worker for PWA
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js')
    //.then(reg => console.log('service worker registered'))
    //.catch(err => console.log('service worker not registered'))
}

function initPage() {
  if (document.readyState == 'complete') {
    if (navigationType() == 1) {
      sessionStorage.clear()      
    }

    clearInterval(loadTimer)

    // add the additional writeins into the ballot data:
    // addWriteinsToData();

    let elm = document.getElementById("contests")
    // console.log(ele)

    
    ballot.contests.forEach((race, index, contests) => {
      elm.insertAdjacentHTML("beforeend", buildRace(race, index))
    })


    //checks to see if there's alreay selection data saved in local storage. If so, then overwrite the ballot json data
    if (sessionStorage.getItem('data')) {
      console.log('found')
      ballot = JSON.parse(sessionStorage.getItem('data'))
      console.log('updating ballot with storageSession data')
      console.log(ballot)
      console.log('updating checkboxes with new data')
      ballot.contests.forEach((contest, contestIndex) => {
        if (contest.contestType === 'RC') {
          contest.candidates.forEach((candidate, candidateIndex) => {
            if (candidate.selected !== 0) {
              const ovalId = contestIndex + "_" + candidateIndex + "_" + (candidate.selected - 1)
              document.getElementById(ovalId).checked = true;

              if (candidate.candidateCode.includes("writein")) {
                console.log(contestIndex + "_" + candidateIndex + "_w")
                document.getElementById(contestIndex + "_" + candidateIndex + "_w").textContent = candidate.candidateName
              }
            }

          })
        } else {
          contest.candidates.forEach((candidate, candidateIndex) => {
            if (candidate.selected !== 0) {
              const ovalId = contestIndex + "_" + candidateIndex
              document.getElementById(ovalId).checked = true;

              if (candidate.candidateCode.includes("writein")) {
                console.log(contestIndex + "_" + candidateIndex + "_w")
                document.getElementById(contestIndex + "_" + candidateIndex + "_w").textContent = candidate.candidateName
              }
            }
          })
        }
      })
    }

    //start running other javascript after page is rendered
    //document.querySelector('input[type="checkbox"]').focus() // places focus on the first oval on page

    let question = document.querySelectorAll('.questionRaceOval')
    question.forEach(checkbox => checkbox.addEventListener('click', questionHandler))

    let test_all = document.querySelectorAll('.regularRaceOval')
    test_all.forEach(checkbox => checkbox.addEventListener('click', regularHandler))

    let rc = document.querySelectorAll('.rankChoiceRaceOval')
    rc.forEach(checkbox => checkbox.addEventListener('click', rankChoiceHandler))

    // let writeboxes = document.querySelectorAll('input[type="text"]')
    // writeboxes.forEach(writebox => writebox.addEventListener('focusout', textHandler))

    // let allOvals = document.querySelectorAll('input[type="checkbox"]')
    // allOvals.forEach(oval => oval.addEventListener('keydown', keypressHandler))

    document.getElementById('reviewButton').addEventListener('click', reviewBtnHandler)

    // live update for review section
    //reviewBtnHandler(event)


  }
}
