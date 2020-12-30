function questionHandler(event) {
    const ovalId = event.target.id
    const contestIndex = ovalId.split('_')[0]
    const candidateIndex = ovalId.split('_')[1]
    uncheckOtherCandidates(contestIndex, candidateIndex);
}

function uncheckOtherCandidatesRC(contestIndex, candidateIndex, rankIndex) {
    for (let c in ballot.contests[contestIndex].candidates) {
        if (c != candidateIndex) {
            const id = contestIndex + '_' + c + '_' + rankIndex
            document.getElementById(id).checked = false
            if (isWriteinCandidate(contestIndex, c)) {
                const writeinBox = document.getElementById(contestIndex + '_' + c + '_w')
                if (writeinBox.value !== '') {
                    //alert('Please note that the writein(s) for this contest has been deselected.')
                    writeinBox.value = ''
                }                
            }
        }
    }
}

function uncheckOtherCandidates(contestIndex, candidateIndex) {
    for (let i = 0; i < ballot.contests[contestIndex].candidates.length; i++) {
        if (i != candidateIndex) {
            const id = contestIndex + '_' + i
            document.getElementById(id).checked = false
            if (isWriteinCandidate(contestIndex, i)) {
                if (document.getElementById(id + '_w').value !== '') {
                    document.getElementById(id + '_w').value = ''
                    //alert('Please note that the writein(s) for this contest has been deselected.')
                } 
            }
        }
    }
}

function regularHandler(event) {
    const ovalId = event.target.id
    const split = ovalId.split('_')
    const contestIndex = split[0] 
    const candidateIndex = split[1]
    const voteMax = ballot.contests[contestIndex].voteFor
    const isWritein = isWriteinCandidate(contestIndex, candidateIndex)
    let howManySelected = 0
    for (let x = 0; x < ballot.contests[contestIndex].candidates.length; x++) {
        if (document.getElementById(contestIndex + "_" + x).checked == true && x != candidateIndex) {
            howManySelected++
        }
    }
    if (howManySelected >= voteMax) {
        if (voteMax === 1) {
            uncheckOtherCandidates(contestIndex, candidateIndex)
        } else {
            event.preventDefault()
            return
        }
    }
    if (isWritein) {
        const writeinBox = document.getElementById(ovalId + '_w');
        if (writeinBox.value === '') {
            const input = prompt('Please type the name of the write-in candidate you want to vote for:')
            if (input === null || input.trim() === '') {
                event.preventDefault()
                return
            } else {
                writeinBox.value = input.toUpperCase()
            }
        } else { // click is to deselect a writein oval so need to clear the writeinBox
            writeinBox.value = ''
            return
        }
    }
}

function isWriteinCandidate(contestIndex, candidateIndex) {
    return ballot.contests[contestIndex].candidates[candidateIndex].candidateCode.includes('writein');
}

function rankChoiceHandler(event) {
    const ovalId = event.target.id
    const split = ovalId.split('_')
    const contestIndex = split[0] 
    const candidateIndex = split[1]
    const rankIndex = split[2]
    const rankSelections = new Array()
    const candidateSelections = new Array()
    const isWritein = isWriteinCandidate(contestIndex, candidateIndex)
    let savedWriteinName = ''
    if (isWritein) {
        const writeinBox = document.getElementById(contestIndex + '_' + candidateIndex + '_w')
        if (writeinBox.value === '') {
            const input = prompt('Please type the name of the write-in candidate you want to vote for:')
            if (input === null || input.trim() === '') { // if invalid input
                event.preventDefault()
                return
            } else {
                writeinBox.value = input.toUpperCase()
            }
        } else { // there is already a writein name
            let isWriteinDeselection = true 
            for (let r in ballot.contests[contestIndex].candidates) {
                if (r != rankIndex) {
                    const id = contestIndex + '_' + candidateIndex + '_' + r
                    if (document.getElementById(id).checked) {
                        isWriteinDeselection = false
                        break
                    }                    
                }
            }
            if (isWriteinDeselection) {
                writeinBox.value = ''
            }
        }
    }  
    // check the oval's row (check if another rank was selected for the chosen candidate)
    for (let r in ballot.contests[contestIndex].candidates) {
        if (r != rankIndex && document.getElementById(contestIndex + '_' + candidateIndex + '_' + r).checked) {  
            rankSelections.push(contestIndex + '_' + candidateIndex + '_' + r)
            break
        }         
    }
    if (rankSelections.length > 0) { 
        document.getElementById(rankSelections[0]).checked = false
    }
    // check the oval's column (check if another candidate was selected for the chosen rank)
    for (let c in ballot.contests[contestIndex].candidates) {
        if (c != candidateIndex && document.getElementById(contestIndex + '_' + c + '_' + rankIndex).checked) {
            if (isWriteinCandidate(contestIndex, c)) {
                savedWriteinName = getCandidateName(contestIndex + '_' + c + '_w')
            }
            candidateSelections.push(contestIndex + '_' + c + '_' + rankIndex)
            break
        }
    }
    if (candidateSelections.length > 0) {
        uncheckOtherCandidatesRC(contestIndex, candidateIndex, rankIndex)
    }
    // if there was previously a selection in the same row and column, then ask the user to confirm their choice
    if (rankSelections.length > 0 && candidateSelections.length > 0) {
        const ordinal = choiceLabel((parseInt(rankIndex)+ 1))
        const selectedCandidateName = getCandidateName(ovalId)
        let otherCandidateName = getCandidateName(candidateSelections[0])
        if (savedWriteinName != '') {
            otherCandidateName = 'Write-in Candidate: ' + savedWriteinName
        }
        // const confirmed = confirm(`<p>You are trying to make a selection for ${ordinal} choice but \n${otherCandidateName}\n is already selected. Would you like change your ${ordinal} choice to: \n${selectedCandidateName}?<p>`)
        document.getElementById("modalText").innerHTML = `You are trying to make a selection for ${ordinal} choice but \n${otherCandidateName}\n is already selected. Would you like to change your ${ordinal} choice to: \n${selectedCandidateName}?`
        
        document.getElementById("yesButton").onclick = function() {modalAnswer(ovalId, candidateSelections, rankSelections, "Yes", savedWriteinName)}
        document.getElementById("noButton").onclick = function() {modalAnswer(ovalId, candidateSelections, rankSelections, "No", savedWriteinName)}
        document.getElementById(rankSelections[0]).checked = true
        document.getElementById(candidateSelections[0]).checked = true
        showModal()
        event.preventDefault()

        // if(confirmed) {
        //     for (let id of candidateSelections) {
        //         document.getElementById(id).checked = false
        //     }
        //     for (let id of rankSelections) {
        //         document.getElementById(id).checked = false
        //     }
        // } else {
        //     event.preventDefault()           
            // document.getElementById(rankSelections[0]).checked = true
            // document.getElementById(candidateSelections[0]).checked = true
        //     if (savedWriteinName != '') {
        //         const writeinBoxId = candidateSelections[0].split('_')[0] + candidateSelections[0].split('_')[1] + '_w'
        //         document.getElementById(writeinBoxId).value = savedWriteinName
        //     }
        // }           
    }     
}

function modalAnswer(ovalId, candidateSelections, rankSelections, answer, savedWriteinName) {
    if(answer == "Yes") {
        for (let id of candidateSelections) {
            document.getElementById(id).checked = false
        }
        for (let id of rankSelections) {
            document.getElementById(id).checked = false
        }
        document.getElementById(ovalId).checked = true;
    } else {
        document.getElementById(ovalId).checked = false
        document.getElementById(rankSelections[0]).checked = true
        document.getElementById(candidateSelections[0]).checked = true
        if (savedWriteinName != '') {
            const writeinBoxId = candidateSelections[0].split('_')[0] + candidateSelections[0].split('_')[1] + '_w'
            document.getElementById(writeinBoxId).value = savedWriteinName
        }
    }   
    hideModal()
    document.getElementById(ovalId).focus()
}

function showModal() {
    document.getElementById("modal").style = 'display:block;'
    document.getElementById("overlay").style = 'display:block;'
}
function hideModal() {
    document.getElementById("modal").style = 'display:none;'
    document.getElementById("overlay").style = 'display:none;'
}

function getCandidate(ovalId) {
    return ballot.contests[ovalId.split('_')[0]].candidates[ovalId.split('_')[1]]
}

// returns string with candidate's name + subtitle with all the html-text cleaned up (such as &quot; and <br>)
// takes 1 argument: a string for the candidate's ovalId
function getCandidateName(ovalId) {
    const candidate = getCandidate(ovalId)
    let name = ''
    if (candidate.candidateCode.includes('writein')) {
        const split = ovalId.split('_')
        const writeinBox = document.getElementById(split[0] + '_' + split[1] + '_w')
        name = 'Write-in Candidate: ' + writeinBox.value
    } else {
        const candidateName = candidate.candidateName.replace(/<br>/g, ' and ')
        const candidateSubtitle = candidate.candidateSubtitle.replace(/<br>/g, ' ')
        name = candidateName + ', ' + candidateSubtitle
    }
    if (name.includes('&quot;')) {
        name = name.replace(/&quot;/g, '"')
    }
    return name
}


