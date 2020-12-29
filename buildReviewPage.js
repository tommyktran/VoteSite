const selectedVote = `{CANDIDATE_NAME}`
const rankedVote = `{RANK} choice: {CANDIDATE_NAME}`
const reviewContestHtml = `
<a href="#contest_{REVIEW_ID}">
  <div class="reviewContestHeader">
    <h3>{CONTESTNAME}  (Vote for {VOTEFOR})</h3>
    <div class="reviewCandidates">
      {CANDIDATES}
    </div>
  </div>
</a>
`

function syncSelectedVotesToBallotData() {
    ballot.contests.forEach((contest, contestIndex) => {
        contest.candidates.forEach((candidate, candidateIndex) => {
            let elemId = contestIndex + '_' + candidateIndex
            if (candidate.candidateCode.includes('writein')) {
                candidate.candidateName = document.getElementById(elemId + '_w').value.toUpperCase()
            }
            if (contest.contestType === 'RC') {
                for (let rankIndex in contest.candidates) {
                    if (document.getElementById(elemId + '_' + rankIndex).checked) {
                        candidate.selected = parseInt(rankIndex) + 1
                    }
                }
            } else {
                if (document.getElementById(elemId).checked) {
                    candidate.selected = 1
                }
            }
        })
    })
    return ballot
}

function reviewBtnHandler(event) {
    syncSelectedVotesToBallotData();
    const reviewPage = document.getElementById("review")
    const selectionPage = document.getElementById('selection')
    const reviewBody = document.getElementById('reviewBody')
    selectionPage.style.display = 'none'
    reviewPage.style.display = 'block'
    ballot.contests.forEach((race, index, contests) => {
        reviewBody.insertAdjacentHTML("beforeend", buildReview(race, index))
    })
    const focusEle = document.getElementById('review')
    focusEle.scrollIntoView()
    const linkables = document.querySelectorAll('a')
    linkables.forEach(link => link.addEventListener('click', reviewBoxesHandler))
}

function doneAndCreatePdf() {
    syncSelectedVotesToBallotData()
    createBallotPdf(ballot)
}

function buildReview(race, index) {
    let text = reviewContestHtml
    text = text.replace(/{REVIEW_ID}/g, index)
    text = text.replace('{CONTESTNAME}', race.contestName)
    if (race.contestType === 'RC') {
        text = text.replace('Vote for {VOTEFOR}', 'Rank Choice')
    } else {
        text = text.replace('{VOTEFOR}', race.voteFor)
    }
    if (race.contestType === 'RC') {
        text = text.replace('{CANDIDATES}', buildReviewRankedVotes(race))
    } else {
        text = text.replace('{CANDIDATES}', buildReviewSelectedVotes(race))
    }
    return text;
}

function buildReviewSelectedVotes(race) {
    let text = ''
    race.candidates.forEach(candidate => {
        if (candidate.selected === 1) {
            text += selectedVote.replace('{CANDIDATE_NAME}', candidate.candidateName)
        }
    })
    if (text.trim() === '') {
        text += selectedVote;
        text = text.replace('{CANDIDATE_NAME}', '-------- No Selection --------')
    }
    return text
}

function buildReviewRankedVotes(race) {
    let text = ''
    for (let i = 1; i < race.candidates.length + 1; i++) {
        for (let j = 0; j < race.candidates.length; j++) {
            if (race.candidates[j].selected === i) {
                text += rankedVote
                text = text
                    .replace('{RANK}', choiceLabel(i))
                    .replace('{CANDIDATE_NAME}', race.candidates[j].candidateName)
            }
        }
    }
    if (text.trim() === '') {
        text += selectedVote
        text = text.replace('{CANDIDATE_NAME}', '-------- No Selection --------')
    }
    return text
}

function reviewBoxesHandler() {
    let reviewPage = document.getElementById("review")
    let selectionPage = document.getElementById('selection')
    selectionPage.style.display = 'block'
    reviewPage.style.display = 'none'
    const reviewBody = document.getElementById('reviewBody')
    reviewBody.innerHTML = ''
}

function backBtnHandler() {
    const reviewPage = document.getElementById("review")
    const selectionPage = document.getElementById('selection')
    const header = document.querySelector('header')
    reviewPage.style.display = 'none'
    selectionPage.style.display = 'block'   
    document.querySelector('input[type="checkbox"]').focus() // places focus on the first oval on page
    const reviewBody = document.getElementById('reviewBody')
    reviewBody.innerHTML = '';
    header.scrollIntoView();
}