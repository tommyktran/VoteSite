let activeWriteinOvalId = ''

let loadTimer = setInterval(initPage, 100)
const idHtmlTemplate = '{contestIndex}_{candidateIndex}_{rankIndex}'

function initPage() {
  if (document.readyState == 'complete') {
    clearInterval(loadTimer)

    // add the additional writeins into the ballot data:
    // addWriteinsToData();

    let elm = document.getElementById("contests")
    ballot.contests.forEach((race, index, contests) => {
      elm.insertAdjacentHTML("beforeend", buildRace(race, index))
    })
    //start running other javascript after page is rendered
    document.querySelector('input[type="checkbox"]').focus() // places focus on the first oval on page

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



  }
}
