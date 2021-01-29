const selectedVote = `<div>{CANDIDATE_NAME}</div>`
const rankedVote = `<div>{RANK} choice: {CANDIDATE_NAME}</div>`
const noSelection = `<div class="reviewPageNoSelection">No Selection</div>`

// tommy's version of template without anchors
// const reviewContestHtml = `
// <div class="reviewDiv">  
//     <div class="reviewContestHeader">
//         <h3>{CONTESTNAME}  (Vote for {VOTEFOR})</h3>
//     </div>
//     <div class="reviewCandidates">
//         <center>{CANDIDATES}</center>
//     </div> 
// </div>
// `

//older template using anchors:
// const reviewContestHtml = `
// <div class="reviewContest">
//     <a href="#contest_{REVIEW_ID}">
//     <div class="reviewContestHeader">
//         <h3>{CONTESTNAME}  (Vote for {VOTEFOR})</h3>
//         <div class="reviewCandidates">
//         {CANDIDATES}
//         </div>
//     </div>
//     </a>
// </div>
// `

const reviewContestHtml = `
<div class="reviewContest">
    <div class="reviewContestHeader">
        <h3>{CONTESTNAME}  (Vote for {VOTEFOR})</h3>
    </div>
    <div class="reviewCandidates">
        {CANDIDATES}
    </div>
    <button id="review_contest_{REVIEW_ID}" class="reviewContestLink">Go to contest</a>
</div>
`
//<a href="index.html#contest_{REVIEW_ID}" id="review_contest_{REVIEW_ID}" class="reviewContestLink">Go to contest</a>

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
    // sessionStorage.setItem('data', JSON.stringify(ballot))
    // console.log('saving ballot data to sessionStorage')
    return ballot
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}


function reviewBtnHandler(event) {
    syncSelectedVotesToBallotData()
    sessionStorage.setItem('data', JSON.stringify(ballot))
    sessionStorage.removeItem('reviewLink');
    //alert(JSON.parse(sessionStorage.getItem('data')))
    //event.preventDefault()

    // syncSelectedVotesToBallotData()
    // const reviewPage = document.getElementById("reviewPage")
    // const selectionPage = document.getElementById('selection')
    // const reviewBody = document.querySelector('#reviewBody')
    // // selectionPage.style.display = 'none'
    // // reviewPage.style.display = 'block'
    // reviewBody.innerHTML = ''
    // ballot.contests.forEach((race, index, contests) => {
    //     reviewBody.insertAdjacentHTML("beforeend", buildReview(race, index))
    // })
    // //const focusEle = document.getElementById('reviewPage')
    // //focusEle.scrollIntoView()
    // // const linkables = document.querySelectorAll('a')
    // // linkables.forEach(link => link.addEventListener('click', reviewBoxesHandler))
    // const linkables = document.querySelectorAll('.reviewContestLink')
    // linkables.forEach(link => link.addEventListener('click', reviewBoxesHandler))
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
    console.dir(event.target.id);
    sessionStorage.setItem('reviewLink', event.target.id);
    location.href = './index.html'
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