function questionHandler(event) {
    const ovalId = event.target.id
    const contestIndex = ovalId.split('_')[0]
    const candidateIndex = ovalId.split('_')[1]
    uncheckOtherCandidates(contestIndex, candidateIndex);
    reviewBtnHandler();
}

function uncheckOtherCandidatesRC(contestIndex, candidateIndex, rankIndex) {
    for (let c in ballot.contests[contestIndex].candidates) {
        if (c != candidateIndex) {
            const id = contestIndex + '_' + c + '_' + rankIndex
            document.getElementById(id).checked = false
            if (isWriteinCandidate(contestIndex, c)) {
                const writeinBox = document.getElementById(contestIndex + '_' + c + '_w')
                if (writeinBox.textContent !== '') {
                    clearOutRcWriteinAria(contestIndex, c);
                }                
            }
        }
    }
}

function clearOutRcWriteinAria(contestIndex, candidateIndex) {
    // resets all the writein oval aria-labels for Rank Choice Contest
    for (let rankIndex in ballot.contests[contestIndex].candidates) {
        const ordinal = choiceLabel(parseInt(rankIndex) + 1)
        document.getElementById(`${contestIndex}_${candidateIndex}_${rankIndex}`).ariaLabel = `${ordinal} Choice Write-in`;
    }
    document.getElementById(`${contestIndex}_${candidateIndex}_w`).textContent = '';
    document.getElementById(`${contestIndex}_${candidateIndex}_wh`).ariaLabel = 'Write-in'    
}

function uncheckOtherCandidates(contestIndex, selectedCandidateIndex) {
    for (let candidateIndex = 0; candidateIndex < ballot.contests[contestIndex].candidates.length; candidateIndex++) {
        if (candidateIndex != selectedCandidateIndex) {
            const id = contestIndex + '_' + candidateIndex
            document.getElementById(id).checked = false
            if (isWriteinCandidate(contestIndex, candidateIndex)) {
                if (document.getElementById(id + '_w').textContent !== '') {
                    clearRegWriteinAria(id);
                } 
            }
        }
    }
}

function clearRegWriteinAria(id) {
    document.getElementById(`${id}_w`).textContent = '';
    document.getElementById(`${id}_wh`).ariaLabel = 'Write-in';
    document.getElementById(id).ariaLabel = 'Write-in';
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
    if (isWritein) {
        const writeinBox = document.getElementById(ovalId + '_w');
        if (writeinBox.textContent === '') {
            const input = prompt('Please type the name of the write-in candidate you want to vote for:')
            if (input === null || input.trim() === '') {
                // Recheck the ones that were previously checked
                event.preventDefault()
                return
            } else {
                addRegWriteinAria(writeinBox, input, ovalId);
            }
        } else { // click is to deselect a writein oval so need to clear the writeinBox
            clearRegWriteinAria(ovalId)
            // live update for review section
            reviewBtnHandler();
            return
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
    reviewBtnHandler();
}

function addRegWriteinAria(writeinBox, input, ovalId) {
    writeinBox.textContent = input.toUpperCase();
    document.getElementById(`${ovalId}_wh`).ariaLabel = `Write-in: ${writeinBox.textContent}`;
    document.getElementById(ovalId).ariaLabel = `Write-in: ${writeinBox.textContent}`;
}

function isWriteinCandidate(contestIndex, candidateIndex) {
    return ballot.contests[contestIndex].candidates[candidateIndex].candidateCode.includes('writein');
}

function isIdRcWriteinCandidate(id) {
    const split = id.split('_');
    const contestIndex = split[0];
    const candidateIndex = split[1];
    return ballot.contests[contestIndex].candidates[candidateIndex].candidateCode.includes('writein');
}

function rankChoiceHandler(event) {
    const ovalId = event.target.id
    const split = ovalId.split('_')
    const contestIndex = split[0];
    const candidateIndex = split[1];
    const rankIndex = split[2];
    const isWritein = isWriteinCandidate(contestIndex, candidateIndex)
    const otherRowSelections = otherSelectionsinRow(contestIndex, candidateIndex, rankIndex)
    const otherColSelections = otherSelectionsinCol(contestIndex, candidateIndex, rankIndex)



    // *** Start logic for modal ***
    // If there was previously a selection in the same row and column, then ask the user to confirm their choice by showing a modal. This will exit out of the current rankChoiceHandler
    if (otherRowSelections.length > 0 && otherColSelections.length > 0) {
        let savedWriteinName = '';
        otherColSelections.forEach(oval => {
            if (isIdRcWriteinCandidate(oval)) {
                savedWriteinName = getCandidateName(oval)
            }
        const ordinal = choiceLabel((parseInt(rankIndex)+ 1))
        const selectedCandidateName = getCandidateName(ovalId)
        let otherCandidateName = getCandidateName(otherColSelections[0])
        if (savedWriteinName != '') {
            otherCandidateName = savedWriteinName
        }
        document.getElementById("rcModalText").innerHTML = `You are trying to make a selection for ${ordinal} choice but ${otherCandidateName} is already selected. Would you like to change your ${ordinal} choice to: ${selectedCandidateName}?`
        document.getElementById("yesButton").addEventListener('click', () => {modalAnswer(ovalId, otherColSelections, otherRowSelections, "Yes", savedWriteinName)})
        document.getElementById("noButton").addEventListener('click', () => {modalAnswer(ovalId, otherColSelections, otherRowSelections, "No", savedWriteinName)})        
        event.preventDefault()
        showModal('rcModal', ovalId)
        document.getElementById("yesButton").focus()
        return;
        })
        return;    
    }
    // *** End logic for modal ***

    if (isWritein) {
        const writeinBox = document.getElementById(contestIndex + '_' + candidateIndex + '_w')
        if (writeinBox.textContent === '') {
            const input = prompt('Please type the name of the write-in candidate you want to vote for:')
            if (input === null || input.trim() === '') { // if invalid input
                event.preventDefault()
                return
            } else { // valid input
                addRcWriteInAria(writeinBox, input, contestIndex, candidateIndex);
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
                clearOutRcWriteinAria(contestIndex, candidateIndex)
            }
        }
    }
    if (otherRowSelections.length > 0) { 
        document.getElementById(otherRowSelections[0]).checked = false
    }
    if (otherColSelections.length > 0) {
        // will clear out write-in candidates and update all aria-labels
        uncheckOtherCandidatesRC(contestIndex, candidateIndex, rankIndex)
    }    
    reviewBtnHandler();
}


function otherSelectionsinRow(contestIndex, candidateIndex, rankIndex) {
    const rowSelections = [];
    const numOfRanks = ballot.contests[contestIndex].candidates.length;
    for (let rank = 0; rank < numOfRanks; rank++) {
        if (rank != rankIndex) {
            const id = `${contestIndex}_${candidateIndex}_${rank}`
            if (document.getElementById(id).checked) rowSelections.push(id);
        }
        else continue;
    }
    return rowSelections;
}

function otherSelectionsinCol(contestIndex, candidateIndex, rankIndex) {    
    const colSelections = [];
    const numOfCandidates = ballot.contests[contestIndex].candidates.length;
    for (let cand = 0; cand < numOfCandidates; cand++) {
        if (cand != candidateIndex) {
            const id = `${contestIndex}_${cand}_${rankIndex}`
            if (document.getElementById(id).checked) colSelections.push(id);
        }
        else continue;
    }
    return colSelections;
}

function addRcWriteInAria(writeinBox, input, contestIndex, candidateIndex) {    
    writeinBox.textContent = input.toUpperCase();
    for (let rankIndex in ballot.contests[contestIndex].candidates) {
        const ordinal = choiceLabel(parseInt(rankIndex) + 1)
        document.getElementById(`${contestIndex}_${candidateIndex}_${rankIndex}`).ariaLabel = `${ordinal} Choice Write-in: ${writeinBox.textContent}`;
    }
    document.getElementById(`${contestIndex}_${candidateIndex}_wh`).ariaLabel = `Write-in: ${input.toUpperCase()}`; 

}

function modalAnswer(ovalId, candidateSelections, rankSelections, answer, savedWriteinName) {
    if (answer == "Yes") {
        for (let id of candidateSelections) {
            document.getElementById(id).checked = false
            if (isIdRcWriteinCandidate(id)) {
                const split = id.split('_');
                clearOutRcWriteinAria(split[0], split[1])
            }
        }
        for (let id of rankSelections) {
            document.getElementById(id).checked = false
        }
        document.getElementById(ovalId).checked = true;
    } else {
        document.getElementById(ovalId).checked = false
        document.getElementById(rankSelections[0]).checked = true
        document.getElementById(candidateSelections[0]).checked = true
        // if (savedWriteinName != '') {
        //     console.log({savedWriteinName, candidateSelections, rankSelections});
        //     // const writeinBoxId = candidateSelections[0].split('_')[0] + candidateSelections[0].split('_')[1] + '_w'
        //     // document.getElementById(writeinBoxId).textContent = savedWriteinName
        //     // document.getElementById(ovalId).setAttribute('aria-label', `Write-in Candidate: ${savedWriteinName}`)
        // }
    }   
    hideModal('rcModal')
    document.getElementById(ovalId).focus()
    // live update for review section
    reviewBtnHandler();
}
function showModal(modalId, returnFocusEleId) {
    const modal = document.getElementById(modalId);
    modal.style = 'display:block;'
    document.getElementById("overlay").style = 'display:block;'

    // add all the elements inside modal which you want to make focusable
    const  focusableElements = ['button'];
    const firstFocusableElement = modal.querySelectorAll(focusableElements)[0]; // get first element to be focused inside modal  
    const focusableContent = modal.querySelectorAll(focusableElements);
    const lastFocusableElement = focusableContent[focusableContent.length - 1]; // get last element to be focused inside modal

    document.addEventListener('keydown', function modalKeyHandler(e) {
        let isTabPressed = e.key === 'Tab';
        let isEscPressed = e.key === 'Escape';
        if (!isTabPressed && !isEscPressed) return;
        if (e.shiftKey && isTabPressed) { // if shift key pressed for shift + tab combination
            if (document.activeElement === firstFocusableElement) {
            lastFocusableElement.focus(); // add focus for the last focusable element
            e.preventDefault();
            }
        }
        else if (isTabPressed && !isEscPressed) {
            if (document.activeElement === lastFocusableElement) { // if focused has reached to last focusable element then focus first focusable element after pressing tab
                firstFocusableElement.focus(); // add focus for the first focusable element
                e.preventDefault();
            }
        }
        else if (isEscPressed && !isTabPressed) {
            hideModal(modalId, returnFocusEleId);
            document.removeEventListener('keydown', modalKeyHandler);
        } 
    });
    firstFocusableElement.focus();    
}

function hideModal(modalId, returnFocusEleId) {
    document.getElementById("overlay").style = 'display:none;'
    if (modalId == 'rcModal') {
        recreateNode(document.getElementById("yesButton"));
        recreateNode(document.getElementById("noButton"));
        document.getElementById("rcModal").style = 'display:none;'
        document.getElementById("overlay").style = 'display:none;'
    }
    else if (modalId == 'pwModal') {
        document.getElementById("pwModal").style = 'display:none;'
        document.getElementById("overlay").style = 'display:none;'
    }
    document.getElementById(returnFocusEleId).focus();
    return;
}


// function hidePwModal() {
//     document.getElementById("pwModal").style = 'display:none;'
//     document.getElementById("overlay").style = 'display:none;'
// }

// function hideRcModal() {
//     recreateNode(document.getElementById("yesButton"));
//     recreateNode(document.getElementById("noButton"));
//     document.getElementById("rcModal").style = 'display:none;'
//     document.getElementById("overlay").style = 'display:none;'
// }

function recreateNode(el, withChildren) {
    if (withChildren) {
      el.parentNode.replaceChild(el.cloneNode(true), el);
    }
    else {
      var newEl = el.cloneNode(false);
      while (el.hasChildNodes()) newEl.appendChild(el.firstChild);
      el.parentNode.replaceChild(newEl, el);
    }
}

function getCandidate(ovalId) {
    return ballot.contests[ovalId.split('_')[0]].candidates[ovalId.split('_')[1]]
}

// returns string with candidate's name + subtitle with all the html-text cleaned up (such as &quot; and <br>)
// takes 1 argument: a string for the candidate's ovalId
function getCandidateName(ovalId) {
    const candidate = getCandidate(ovalId)
    const contestIndex = ovalId.split('_')[0]
    let name = ''
    if (candidate.candidateCode.includes('writein')) {
        const split = ovalId.split('_')
        const writeinBox = document.getElementById(split[0] + '_' + split[1] + '_w')
        name = 'Write-in: ' + writeinBox.textContent
    } else {
        name = candidate.candidateName.replace(/<br>/g, ' and ')
        if (ballot.contests[contestIndex].contestType === 'R') {
            name += ', ' + candidate.candidateSubtitle.replace(/<br>/g, ' ')
        }       
    }
    if (name.includes('&quot;')) {
        name = name.replace(/&quot;/g, '"')
    }
    return name
}