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
        document.getElementById(`${contestIndex}_${candidateIndex}_${rankIndex}`).ariaLabel = `${choiceLabel(parseInt(rankIndex) + 1)} Write-in`;
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

// function rankChoiceHandler(event) {
//     const ovalId = event.target.id
//     const split = ovalId.split('_')
//     const contestIndex = split[0] 
//     const candidateIndex = split[1]
//     const rankIndex = split[2]
//     const rankSelections = new Array()
//     const candidateSelections = new Array()
//     const isWritein = isWriteinCandidate(contestIndex, candidateIndex)
//     let savedWriteinName = ''
//     if (isWritein) {
//         const writeinBox = document.getElementById(contestIndex + '_' + candidateIndex + '_w')
//         if (writeinBox.textContent === '') {
//             const input = prompt('Please type the name of the write-in candidate you want to vote for:')
//             if (input === null || input.trim() === '') { // if invalid input
//                 event.preventDefault()
//                 return
//             } else { // valid input
//                 addRcWriteInAria(writeinBox, input, contestIndex, candidateIndex);
//             }
//         } else { // there is already a writein name
//             let isWriteinDeselection = true 
//             for (let r in ballot.contests[contestIndex].candidates) {
//                 if (r != rankIndex) {
//                     const id = contestIndex + '_' + candidateIndex + '_' + r
//                     if (document.getElementById(id).checked) {
//                         isWriteinDeselection = false
//                         break
//                     }                    
//                 }
//             }
//             if (isWriteinDeselection) {
//                 writeinBox.textContent = ''
//                 for (let rankIndex in ballot.contests[contestIndex].candidates) {
//                     document.getElementById(`${contestIndex}_${candidateIndex}_${rankIndex}`).ariaLabel = `Write-in:`
//                 }
//             }
//         }
//     }  
//     // check the oval's row (check if another rank was selected for the chosen candidate)
//     for (let r in ballot.contests[contestIndex].candidates) {
//         if (r != rankIndex && document.getElementById(contestIndex + '_' + candidateIndex + '_' + r).checked) {  
//             rankSelections.push(contestIndex + '_' + candidateIndex + '_' + r)
//             break
//         }         
//     }
//     // check the oval's column (check if another candidate was selected for the chosen rank)
//     for (let c in ballot.contests[contestIndex].candidates) {
//         if (c != candidateIndex && document.getElementById(contestIndex + '_' + c + '_' + rankIndex).checked) {
//             if (isWriteinCandidate(contestIndex, c)) {
//                 savedWriteinName = getCandidateName(contestIndex + '_' + c + '_w')
//             }
//             candidateSelections.push(contestIndex + '_' + c + '_' + rankIndex)
//             break
//         }
//     }
//     // if there was previously a selection in the same row and column, then ask the user to confirm their choice
//     if (rankSelections.length > 0 && candidateSelections.length > 0) {
//         const ordinal = choiceLabel((parseInt(rankIndex)+ 1))
//         const selectedCandidateName = getCandidateName(ovalId)
//         let otherCandidateName = getCandidateName(candidateSelections[0])
//         if (savedWriteinName != '') {
//             otherCandidateName = savedWriteinName
//         }
//         document.getElementById("modalText").innerHTML = `You are trying to make a selection for ${ordinal} choice but \n${otherCandidateName}\n is already selected. Would you like to change your ${ordinal} choice to: \n${selectedCandidateName}?`
        
//         document.getElementById("yesButton").addEventListener('click', () => {modalAnswer(ovalId, candidateSelections, rankSelections, "Yes", savedWriteinName)})
//         document.getElementById("noButton").addEventListener('click', () => {modalAnswer(ovalId, candidateSelections, rankSelections, "No", savedWriteinName)})
//         document.getElementById(rankSelections[0]).checked = true
//         document.getElementById(candidateSelections[0]).checked = true
//         showModal()
//         document.getElementById("yesButton").focus()
//         event.preventDefault()
//     }
//     if (rankSelections.length > 0) { 
//         document.getElementById(rankSelections[0]).checked = false
//     }
//     if (candidateSelections.length > 0) {
//         uncheckOtherCandidatesRC(contestIndex, candidateIndex, rankIndex)
//     }
//     reviewBtnHandler();
// }


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
        console.log('need to show modal')
        let savedWriteinName = '';
        otherColSelections.forEach(oval => {
            if (isIdRcWriteinCandidate(oval)) {
                savedWriteinName = getCandidateName(oval)
                console.log(savedWriteinName)
            }
        const ordinal = choiceLabel((parseInt(rankIndex)+ 1))
        const selectedCandidateName = getCandidateName(ovalId)
        let otherCandidateName = getCandidateName(otherColSelections[0])
        if (savedWriteinName != '') {
            otherCandidateName = savedWriteinName
        }
        document.getElementById("modalText").innerHTML = `You are trying to make a selection for ${ordinal} choice but ${otherCandidateName} is already selected. Would you like to change your ${ordinal} choice to: ${selectedCandidateName}?`
        console.log(`You are trying to make a selection for ${ordinal} choice but \n${otherCandidateName}\n is already selected. Would you like to change your ${ordinal} choice to: \n${selectedCandidateName}?`)            
        document.getElementById("yesButton").addEventListener('click', () => {modalAnswer(ovalId, otherColSelections, otherRowSelections, "Yes", savedWriteinName)})
        document.getElementById("noButton").addEventListener('click', () => {modalAnswer(ovalId, otherColSelections, otherRowSelections, "No", savedWriteinName)})        
        event.preventDefault()
        showModal()
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
                writeinBox.textContent = ''
                for (let rankIndex in ballot.contests[contestIndex].candidates) {
                    document.getElementById(`${contestIndex}_${candidateIndex}_${rankIndex}`).ariaLabel = `Write-in:`
                }
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
    console.log('rowSelections', rowSelections);
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
    console.log('colSelections', colSelections);
    return colSelections;
}

function addRcWriteInAria(writeinBox, input, contestIndex, candidateIndex) {
    for (let rankIndex in ballot.contests[contestIndex].candidates) {
        document.getElementById(`${contestIndex}_${candidateIndex}_${rankIndex}`).ariaLabel = `Write-in: ${writeinBox.textContent}`;
    }
    writeinBox.textContent = input.toUpperCase();
    document.getElementById(`${contestIndex}_${candidateIndex}_wh`).ariaLabel = `Write-in: ${input.toUpperCase()}`; 

}

function modalAnswer(ovalId, candidateSelections, rankSelections, answer, savedWriteinName) {
    if (answer == "Yes") {
        for (let id of candidateSelections) {
            document.getElementById(id).checked = false
            if (isIdRcWriteinCandidate(id)) {
                const split = id.split('_');
                console.log(split)
                clearOutRcWriteinAria(split[0], split[1])
            }
        }
        for (let id of rankSelections) {
            document.getElementById(id).checked = false
        }
        document.getElementById(ovalId).checked = true;
    } else {
        console.dir([rankSelections, candidateSelections])

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
    hideModal()
    document.getElementById(ovalId).focus()
    // live update for review section
    reviewBtnHandler();
}

function showModal() {
    document.getElementById("modal").style = 'display:block;'
    document.getElementById("overlay").style = 'display:block;'

    // add all the elements inside modal which you want to make focusable
    const  focusableElements = ['button'];
    const modal = document.querySelector('#modal'); // select the modal by it's id

    const firstFocusableElement = modal.querySelectorAll(focusableElements)[0]; // get first element to be focused inside modal
    const focusableContent = modal.querySelectorAll(focusableElements);
    const lastFocusableElement = focusableContent[focusableContent.length - 1]; // get last element to be focused inside modal

    document.addEventListener('keydown', function(e) {
        let isTabPressed = e.key === 'Tab';
        let isEscPressed = e.key === 'Escape';
        if (!isTabPressed && !isEscPressed) return;
        if (e.shiftKey && isTabPressed) { // if shift key pressed for shift + tab combination
            if (document.activeElement === firstFocusableElement) {
            lastFocusableElement.focus(); // add focus for the last focusable element
            e.preventDefault();
            }
        }
        else if (isTabPressed && !isEscPressed ) {
            if (document.activeElement === lastFocusableElement) { // if focused has reached to last focusable element then focus first focusable element after pressing tab
                firstFocusableElement.focus(); // add focus for the first focusable element
                e.preventDefault();
            }
        } 
        else if (isEscPressed && !isTabPressed) {
            hideModal();
        }
    });
    firstFocusableElement.focus();
}
function hideModal() {
    document.getElementById("yesButton").removeEventListener('click', modalAnswer)
    document.getElementById("noButton").removeEventListener('click', modalAnswer)
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