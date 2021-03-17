const rcRaceHtml = `
  <div class="selectionContest">
    <h2 id="contest_{CONTEST_INDEX}" class="contestName" tabindex="0" aria-label="{CONTEST_NAME} {CONTEST_SUBTITLE} {VOTING_INSTRUCTIONS}">{CONTEST_NAME}<br>{CONTEST_SUBTITLE}</h2>
    <p class="votingInstructions" aria-hidden="true">{VOTING_INSTRUCTIONS}</p>
    <div class="table">
      <div class="row header">
          <div class="cell" aria-hidden="true">Candidate</div>
          {RANKS}
      </div>
      {CANDIDATES}
    </div>
  </div>
`
const rRaceHtml = `
  <div class="selectionContest">
    <h2 id="contest_{CONTEST_INDEX}" class="contestName" tabindex="0" aria-label="{CONTEST_NAME} {CONTEST_SUBTITLE} {VOTING_INSTRUCTIONS}">{CONTEST_NAME}<br>{CONTEST_SUBTITLE}</h2>
    <p class="votingInstructions" aria-hidden="true">{VOTING_INSTRUCTIONS}</p>
    <div class="regCandidates">
      {CANDIDATES}
    </div>
  </div>
`
// no heading
const rcCandidateHtml = `
  <div class="row">
    <div class="cell" data-title="Candidate" aria-hidden="true">
      <div class="candidateName" aria-label="{CANDIDATE_NAME_ARIA}" aria-hidden="true">{CANDIDATE_NAME}</div>
      <span class="candidateSubtitle" aria-hidden="true">{CANDIDATE_SUBTITLE}</span>      
    </div>
    {OVALS}
  </div>
`
// heading
// const rcCandidateHtml = `
//   <div class="row">
//     <div class="cell" data-title="Candidate">
//       <h3 class="rcCandidateName" aria-label="{CANDIDATE_NAME_ARIA}">{CANDIDATE_NAME}</h3>
//       <span class="candidateSubtitle" aria-hidden="true">{CANDIDATE_SUBTITLE}</span>      
//     </div>
//     {OVALS}
//   </div>
// `

// no heading
const rcWriteinHtml = `
  <div class="row">
    <div class="cell" data-title="Candidate" aria-hidden="true">
      <div id="{WRITEIN_HEADER_ID}_wh" class="candidateName" aria-hidden="true">Write-in:</div>
      <div id="{WRITEIN_ID}_w" class="writeinName" aria-hidden="true"></div>
    </div>
    {OVALS}
  </div>
`
// heading
// const rcWriteinHtml = `
//   <div class="row">
//     <div class="cell" data-title="Candidate">
//       <h3 id="{WRITEIN_HEADER_ID}_wh" class="rcCandidateName" aria-label="Write-in:">Write-in:
//       <div id="{WRITEIN_ID}_w" class="writeinName" aria-hidden="true"></div>
//     </div>
//     {OVALS}
//   </div>
// `
const ovalHtml = `
  <label class="cell">
      <input id="{OVAL_ID}" type="checkbox" class="rcOval" aria-label="{OVAL_ARIA_LABEL}">
      <span class="rcCheckmark" aria-hidden="true"></span>
  </label>
`
// no heading
const candidateRegLine = `
  <div class="indivCandidate">
    <label class="container candidateLabel" id="label_{OVAL_ID}">
      <div class="candidateNameDiv" aria-hidden="true">
        <div class="candidateName" aria-label="{CANDIDATE_HEADER_ARIA}" aria-hidden="true">{CANDIDATE_NAME}</div>
        <span class="candidateSubtitle" aria-hidden="true">{CANDIDATE_SUBTITLE}</span>        
      </div>
      <input type="checkbox" id="{OVAL_ID}" class="regularRaceOval" aria-label="{CANDIDATE_ARIA_LABEL}">
      <span class="checkmark ballotCheckbox" aria-hidden="true"></span>           
    </label>
  </div>
`
// heading
// const candidateRegLine = `
//   <div class="indivCandidate">
//     <label class="container candidateLabel" id="label_{OVAL_ID}">
//       <div class="candidateNameDiv">
//         <h3 class="candidateName" aria-label="{CANDIDATE_HEADER_ARIA}">{CANDIDATE_NAME}</h3>
//         <span class="candidateSubtitle" aria-hidden="true">{CANDIDATE_SUBTITLE}</span>        
//       </div>
//       <input type="checkbox" id="{OVAL_ID}" class="regularRaceOval" aria-label="{CANDIDATE_ARIA_LABEL}">
//       <span class="checkmark ballotCheckbox" aria-hidden="true"></span>           
//     </label>
//   </div>
// `

// no heading
const candidateRegWriteIn = `
  <div class="indivCandidate">
    <label class="container candidateLabel" for="{OVAL_ID}">
      <div id="{OVAL_ID}_wh" class="candidateName" aria-hidden="true">Write-in:</div>
      <div id="{OVAL_ID}_w" class="writeinName" aria-hidden="true"></div>
      <input type="checkbox" id="{OVAL_ID}" class="regularRaceOval" aria-label="{WRITEIN_ARIA_LABEL}">
      <span class="checkmark ballotCheckbox" aria-hidden="true" ></span>
    </label>
  </div>
`
// heading
// const candidateRegWriteIn = `
//   <div class="indivCandidate">
//     <label class="container candidateLabel" for="{OVAL_ID}">
//       <h3 id="{OVAL_ID}_wh" class="candidateName" aria-label="Write-in">Write-in:</h3>
//       <div id="{OVAL_ID}_w" class="writeinName" aria-hidden="true"></div>
//       <input type="checkbox" id="{OVAL_ID}" class="regularRaceOval" aria-label="{WRITEIN_ARIA_LABEL}">
//       <span class="checkmark ballotCheckbox" aria-hidden="true" ></span>
//     </label>
//   </div>
// `
const qRaceHtml = `
  <div class="selectionContest">
    <div class="questionDiv">
      <h2 id="contest_{CONTEST_INDEX}" class="contestName" tabindex="0" aria-label="{CONTEST_NAME} {CONTEST_SUBTITLE} {VOTING_INSTRUCTIONS}">{CONTEST_NAME}<br>{CONTEST_SUBTITLE}</h2>
      <p class="votingInstructions" aria-label="true">{VOTING_INSTRUCTIONS}</p>
      <p class="question">{QUESTION_TEXT}</p>
      <div class="questionOptionsDiv">
        {QUESTION_OPTIONS}
      </div>
    </div>
  </div>
`
// no heading
const questionOption = `
  <div class="questionOption">
    <label class="container candidateLabel">      
      <div class="candidateName" aria-hidden="true">{CANDIDATE_NAME}</div>
      <input id="{OVAL_ID}" type="checkbox" class="questionRaceOval" aria-label="{OPTION_ARIA_LABEL}">
      <span class="checkmark ballotCheckbox" aria-hidden="true"></span>
    </label>
  </div>
`
// heading
// const questionOption = `
//   <div class="questionOption">
//     <label class="container candidateLabel">      
//       <h3 class="candidateName">{CANDIDATE_NAME}</h3>
//       <input id="{OVAL_ID}" type="checkbox" class="questionRaceOval" aria-label="{OPTION_ARIA_LABEL}">
//       <span class="checkmark ballotCheckbox" aria-hidden="true"></span>
//     </label>
//   </div>
// `

function buildRace(race, raceIndex) {
  if (race.contestType === 'RC') {
    return buildRankChoiceRace(race, raceIndex)
  } else if (race.contestType === 'Q') {
    return buildQuestionRace(race, raceIndex)
  } else {
    return buildRegRace(race, raceIndex)
  }
}

function buildRegRace(race, raceIndex) {
  let txt = rRaceHtml
    .replace(/{CONTEST_INDEX}/g, raceIndex)
    .replace(/{CONTEST_NAME}/g, race.contestName)
    .replace(/{CONTEST_SUBTITLE}/g, race.contestSubtitle)
    .replace(/{VOTING_INSTRUCTIONS}/g, race.votingInstructions)
    .replace(/{VOTE_LIMIT}/g, race.voteFor)
    .replace(/{CANDIDATES}/g, buildRegCandidates(race, raceIndex))
  // console.log(txt)
  return txt
}

function buildRegCandidates(race, raceIndex) {
  let txt = ''
  race.candidates.forEach((candidate, candidateIndex) => {

    if (candidate.candidateCode.includes('writein')) {
      txt += candidateRegWriteIn
        .replace(/{OVAL_ID}/g, raceIndex + '_' + candidateIndex)
        .replace(/{WRITEIN_ARIA_LABEL}/g, buildWriteinAriaLabel(raceIndex, candidateIndex))
    } else {
      txt += candidateRegLine
        .replace(/{CANDIDATE_HEADER_ARIA}/g, buildCandidateAriaLabel(raceIndex, candidateIndex))
        .replace(/{CANDIDATE_NAME}/g, candidate.candidateName)
        .replace(/{OVAL_ID}/g, raceIndex + '_' + candidateIndex)
        .replace(/{CANDIDATE_ARIA_LABEL}/g, buildCandidateAriaLabel(raceIndex, candidateIndex))
        .replace(/{CANDIDATE_SUBTITLE}/g, candidate.candidateSubtitle)
    }
  })
  return txt
}

function buildQuestionOptions(race, raceIndex) {
  let txt = ''
  race.candidates.forEach((candidate, candidateIndex) => {
      txt += questionOption
        .replace(/{CANDIDATE_NAME}/g, candidate.candidateName)
        .replace(/{OVAL_ID}/g, raceIndex + '_' + candidateIndex)
        .replace(/{OPTION_ARIA_LABEL}/g, buildOptionAriaLabel(raceIndex, candidateIndex))
  })
  return txt
}

function buildOptionAriaLabel(raceIndex, candidateIndex) {
  let txt = ''
  // txt += 'Race ' + (raceIndex+1) + ' of ' + ballot.contests.length + ' '
  // txt += 'This is a ballot question. '
  // txt += ballot.contests[raceIndex].contestName + '. '
  // txt += 'Option ' + (candidateIndex + 1) + ' of ' + ballot.contests[raceIndex].candidates.length + ': '
  txt += ballot.contests[raceIndex].candidates[candidateIndex].candidateName
  return txt
}

function buildQuestionRace(race, raceIndex) {
  let txt = qRaceHtml
    .replace(/{CONTEST_INDEX}/g, raceIndex)
    .replace(/{CONTEST_NAME}/g, race.contestName)
    .replace(/{CONTEST_SUBTITLE}/g, race.contestSubtitle)
    .replace(/{VOTING_INSTRUCTIONS}/g, race.votingInstructions)
    .replace(/{QUESTION_TEXT}/g, race.questionText.replace(/\\n/g, '<br>'))
    .replace(/{CONTEST_INDEX}/g, raceIndex)
    .replace(/{QUESTION_OPTIONS}/g, buildQuestionOptions(race, raceIndex))
  return txt
}

function buildRankChoiceRace(race, raceIndex) {
  let choices = race.candidates.length
  let cls = choiceClassName(choices)
  let txt = rcRaceHtml
    .replace(/{CONTEST_INDEX}/g, raceIndex)
    .replace(/{CONTEST_NAME}/g, race.contestName)
    .replace(/{CONTEST_SUBTITLE}/g, race.contestSubtitle)
    .replace(/{VOTING_INSTRUCTIONS}/g, race.votingInstructions)
    .replace(/{RANKS}/g, buildRankHeaders(race))
    .replace(/{CANDIDATES}/g, buildRcCandidates(race, raceIndex))
  return txt
}

function buildRankHeaders(race) {
  const headerHtml = `<div class="cell" aria-hidden="true">{RANK}<br>Choice</div>`;
  let html = '';
  let rank = 1;
  race.candidates.forEach(candidate => {
    html += headerHtml.replace('{RANK}', choiceLabel(rank));
    rank++;
  })
  return html;
}

function buildRcCandidates(race, contestIndex) {
  let html = '';
  race.candidates.forEach((candidate, candidateIndex) => {
    if (candidate.candidateCode.includes('writein')) {
      html += rcWriteinHtml.replace(/{WRITEIN_HEADER_ID}/g, `${contestIndex}_${candidateIndex}`)
                         .replace(/{WRITEIN_ID}/g, `${contestIndex}_${candidateIndex}`)
                         .replace(/{OVALS}/g, buildRcCandidateOvals(race, contestIndex, candidateIndex));
                   
    }
    else {
      html += rcCandidateHtml.replace(/{CANDIDATE_NAME}/g, candidate.candidateName)
                   .replace(/{CANDIDATE_NAME_ARIA}/g, candidateInfoString(contestIndex, candidateIndex))
                   .replace(/{CANDIDATE_SUBTITLE}/g, candidate.candidateSubtitle)
                   .replace(/{OVALS}/g, buildRcCandidateOvals(race, contestIndex, candidateIndex));
    }
  })
  return html;
}

function buildRcCandidateOvals(race, raceIndex, candidateIndex) {
  let html = '';
  if (race.candidates[candidateIndex].candidateCode.includes('writein')) {
    for (let rankIndex = 0; rankIndex < race.candidates.length; rankIndex++) {
      html += ovalHtml.replace(/{OVAL_ID}/g, `${raceIndex}_${candidateIndex}_${rankIndex}`)
                      .replace(/{OVAL_ARIA_LABEL}/g, `${choiceLabel(rankIndex+1)} choice Write-in`)
    }
  }
  else {
    // no heading
    for (let rankIndex = 0; rankIndex < race.candidates.length; rankIndex++) {
      html += ovalHtml.replace(/{OVAL_ID}/g, `${raceIndex}_${candidateIndex}_${rankIndex}`)
                      .replace(/{OVAL_ARIA_LABEL}/g, `${choiceLabel(rankIndex+1)} choice ${candidateInfoString(raceIndex, candidateIndex)}`)
    }
    // heading
    // for (let rankIndex = 0; rankIndex < race.candidates.length; rankIndex++) { 
    //   html += ovalHtml.replace('{OVAL_ID}', `${raceIndex}_${candidateIndex}_${rankIndex}`)
    //                   .replace('{OVAL_ARIA_LABEL}', `${choiceLabel(rankIndex+1)} choice ${shortenedName(raceIndex, candidateIndex)}`)
    // }
  }
  return html;
}





function choiceClassName(choices) {
  let cls
  if (choices < 4)
    cls = 'choices-2-3'
  else if (choices < 6)
    cls = 'choices-4-5'
  else if (choices < 8)
    cls = 'choices-6-7'
  else if (choices < 10)
    cls = 'choices-8-9'
  else
    cls = 'choices-10-plus'
  return cls
}

function choiceLabel(choice) {
  let lbl
  if (choice == 1)
    lbl = '1st'
  else if (choice == 2)
    lbl = '2nd'
  else if (choice == 3)
    lbl = '3rd'
  else
    lbl = choice + 'th'
  return lbl
}

// function buildHeaderRow(choices, cls) {
//   let cells = ''
//   for (let choice = 1; choice <= choices; choice++) {
//     cells += choiceHtml
//       .replace(/{ORDINAL}/g, choiceLabel(choice))
//       .replace(/{CLASS_NAME}/g, cls)
//   }
//   return headerRowHtml.replace('{CHOICES}', cells)
// }

// function buildCandidateRows(race, choices, raceIndex) {
//   let txt = ''
//   race.candidates.forEach((candidate, candidateIndex) => {
//     txt += candidateRowHtml
//       .replace('{CANDIDATE}', buildCandidateCell(race.contestCode, candidate, raceIndex, candidateIndex))
//       .replace('{OVALS}', buildOvalCells(race, choices, candidate, raceIndex, candidateIndex))
//   })
//   return txt
// }

// function buildCandidateCell(contestCode, candidate, raceIndex, candidateIndex) {
//   if (candidate.candidateCode.includes('writein'))
//     return writeinHtml.replace(/{INPUT_ID}/g, raceIndex + '_' + candidateIndex + '_w')
//   else
//     return candidateHtml.replace(/{CANDIDATE_NAME}/g, candidate.candidateName)
//                         .replace(/{CANDIDATE_SUBTITLE}/g, candidate.candidateSubtitle)
//                         .replace(/{CANDIDATE_ARIA_LABEL}/g, buildCandidateAriaLabel(raceIndex, candidateIndex))

// }

// function buildOvalCells(race, choices, candidate, raceIndex, candidateIndex) {
//   let txt = ''
//   for (let choice = 0; choice < choices; choice++) {
//     let ovalId = raceIndex + '_' + candidateIndex + '_' + choice
//     let lbl = candidateInfoString(raceIndex, candidateIndex)
//     if (candidate.candidateCode.includes('writein'))
//       lbl = 'Write-in'
//     lbl += ' ' + choiceLabel(choice+1) + ' choice'
//     txt += ovalHtml.replace(/{OVAL_ID}/g, ovalId).replace(/{OVAL_ARIA_LABEL}/g, lbl)
//   }
//   return txt
// }

// function contestInfoString(raceIndex) {
//     let txt = ''
//     txt += 'Race ' + (raceIndex+1) + ' of ' + ballot.contests.length + ': '
//     txt += ballot.contests[raceIndex].contestName + '. '
//     txt += ballot.contests[raceIndex].votingInstructions + '.'
//     return txt
// }

function candidateInfoString(raceIndex, candidateIndex) {
    let txt = ''
    const candidate = ballot.contests[raceIndex].candidates[candidateIndex]
    let candidateName = '';
    if (candidate.candidateCode.includes('writein')) {
      // const writeinId = raceIndex + "_" + candidateIndex + "_w";
      // console.log(document.getElementById(writeinId));
      candidateName = "Write-in:";
    }
    else {
      candidateName = candidate.candidateName.replace(/<br>/g, ' and ') + " - " + candidate.candidateSubtitle.replace(/<br>/g, ' ')
    }
    txt += candidateName;
    return txt
}

function shortenedName(raceIndex, candidateIndex) {
  const candidate = ballot.contests[raceIndex].candidates[candidateIndex]
  let split = candidate.candidateName.split('<br>')
  // return last names only when there is more than one candidate in the name, otherwise return the fullname
  if (split.length > 1) {
    let lastNames = new Array()
    for (let name of split) {
      lastNames.push(name.split(',')[0])
    }
    return lastNames.join(' and ')
  } else {
    return candidate.candidateName
  }
}

function buildCandidateAriaLabel(raceIndex, candidateIndex) {
    let txt = ''
    txt += candidateInfoString(raceIndex, candidateIndex)
    return txt
}

function buildWriteinAriaLabel(raceIndex, candidateIndex) {
    let txt = ''
    txt += 'Write-in'
    return txt
}

function fullNameAria(contestIndex, candidateIndex) {
  const candidate = ballot.contests[contestIndex].candidates[candidateIndex];
  const name = candidate.candidateName;
  const subtitle = candidate.candidateSubtitle;
  const aria = `${name} ${subtitle}`;
  return aria;
}

