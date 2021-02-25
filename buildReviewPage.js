const selectedVote = `<div>{CANDIDATE_NAME}</div>`
const rankedVote = `<div>{RANK} choice: {CANDIDATE_NAME}</div>`
const noSelection = `<div class="reviewPageNoSelection">No Selection</div>`
const reviewContestHtml = `
    <div id="review_contest_{REVIEW_ID}" class="reviewContest" role="button" tabIndex="0" aria-labelledby="review_header_{REVIEW_ID},review_candidates_{REVIEW_ID}">
        <p id="review_header_{REVIEW_ID}" class="reviewContestHeader">{CONTESTNAME}  (Vote for {VOTEFOR})</p>
        <p id="review_candidates_{REVIEW_ID}" class="reviewCandidates">
            {CANDIDATES}
        </p>
    </div>   
`
function syncSelectedVotesToBallotData() {
    ballot.contests.forEach((contest, contestIndex) => {
        contest.candidates.forEach((candidate, candidateIndex) => {
            candidate.selected = 0
            let elemId = contestIndex + '_' + candidateIndex
            if (candidate.candidateCode.includes('writein')) {
                candidate.candidateName = document.getElementById(elemId + '_w').textContent.toUpperCase()
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

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}


function reviewBtnHandler(event) {
    syncSelectedVotesToBallotData();
    const reviewPage = document.getElementById("reviewPage")
    // const selectionPage = document.getElementById('selection')
    const reviewBody = document.querySelector('#reviewBody')
    // selectionPage.style.display = 'none'
    // reviewPage.style.display = 'block'
    reviewBody.innerHTML = ''
    ballot.contests.forEach((race, index, contests) => {
        reviewBody.insertAdjacentHTML("beforeend", buildReview(race, index))
    })
    // const focusEle = document.getElementById('reviewPage')
    // focusEle.scrollIntoView()
    
    const reviewContestClickables = document.querySelectorAll('.reviewContest')
    reviewContestClickables.forEach(contest => contest.addEventListener('click', reviewBoxesHandler))
    
    // adds keydown functionality when SPACEBAR or ENTER is pressed without screen-reader
    reviewContestClickables.forEach(contest => contest.addEventListener('keydown', e => {
        if (e.key === ' ' || e.key === 'Enter') {
            const contestId = e.target.id.replace('review_', '')
            document.getElementById(contestId).focus()
            document.getElementById(contestId).scrollIntoView()
        }
    }))
}

function doneAndCreatePdf() {
    syncSelectedVotesToBallotData()
    createBallotPdf(ballot)
}

function buildReview(race, raceIndex) {
    let text = reviewContestHtml
    text = text.replace(/{REVIEW_ID}/g, raceIndex)
    text = text.replace('{CONTESTNAME}', race.contestName)
    if (race.contestType === 'RC') {
        text = text.replace('Vote for {VOTEFOR}', 'Rank Choice')
    } else {
        text = text.replace('{VOTEFOR}', race.voteFor)
    }
    if (race.contestType === 'RC') {
        text = text.replace('{CANDIDATES}', buildReviewRankedVotes(race, raceIndex))
    } else {
        text = text.replace('{CANDIDATES}', buildReviewSelectedVotes(race, raceIndex))
    }
    return text;
}

function buildReviewSelectedVotes(race, raceIndex) {
    let text = ''
    race.candidates.forEach((candidate, candidateIndex) => {
        if (candidate.selected === 1) {
            if (candidate.candidateCode.includes("writein")) {
                text += selectedVote.replace('{CANDIDATE_NAME}', candidate.candidateName + ' (Write-in)')
            } else {
                text += selectedVote.replace('{CANDIDATE_NAME}', getCandidateName(raceIndex + '_' + candidateIndex))
            }            
        }
    })
    if (text.trim() === '') {
        text += noSelection
    }
    return text
}

function buildReviewRankedVotes(race, raceIndex) {
    let text = ''
    for (let i = 1; i < race.candidates.length + 1; i++) {
        for (let j = 0; j < race.candidates.length; j++) {
            if (race.candidates[j].selected === i) {
                text += rankedVote
                text = text
                    .replace('{RANK}', choiceLabel(i))
                    .replace('{CANDIDATE_NAME}', getCandidateName(raceIndex + '_' + j))
            }
        }
    }
    if (text.trim() === '') {
        text += noSelection
    }
    return text
}

function reviewBoxesHandler(event) {
    const contestId = this.id.replace('review_', '')
    document.getElementById(contestId).focus()
    document.getElementById(contestId).scrollIntoView()
    
    // const reviewPage = document.getElementById("reviewPage")
    //const selectionPage = document.getElementById('selection')
    // const reviewBody = document.getElementById('reviewBody')
    //selectionPage.style.display = 'block'
    // document.getElementById(event.target.id.replace('review_', '')).focus({preventScroll:false})
    // console.log(document.dispatchEvent(new KeyboardEvent('keypress', {'keyCode':32,'which':32})))

    // reviewPage.style.display = 'none'
    
    // reviewBody.innerHTML = ''

}

function backBtnHandler() {
    const reviewPage = document.getElementById("reviewPage")
    const selectionPage = document.getElementById('selection')
    const header = document.querySelector('header')
    reviewPage.style.display = 'none'
    selectionPage.style.display = 'block'   
    document.querySelector('input[type="checkbox"]').focus() // places focus on the first oval on page
    const reviewBody = document.getElementById('reviewBody')
    reviewBody.innerHTML = '';
    header.scrollIntoView();
}

