ballot obj with the following properties {

#electionName: "Presidential"

##*electionName (string)*

electionDate: string

contests: array[contest]

contest obj with the following properties {

contestName: string

??? contestCode: string

contestType: string "RC" for rank choice, "R" for regular, and "Q" for question

rankedChoiceType: string for the state "ME" for Maine

voteFor: int for the number of maximum choices for a given contest

??? instructionCode: string

votingInstructions: string

??? pageIndex: int

candidates: array[candidate]

candidate obj with the following properties {

candidateName: string for the 

??? candidateCode: string

selected: int 0 for not selected, 1 for selected

ovals: array[point]

point obj with the following properties {

x: int for the x-coordinate

y: int for the y-coordinate

}

}			

}

pages: (array[page])

}
	

ballot obj with the following properties {
	electionName: string
	electionDate: string
	contests: array[contest]
		contest obj with the following properties {
			contestName: string 
			
			??? contestCode: string
			contestType: string "RC" for rank choice, "R" for regular, and "Q" for question
			rankedChoiceType: string for the state "ME" for Maine
			voteFor: int for the number of maximum choices for a given contest
			??? instructionCode: string
			votingInstructions: string
			??? pageIndex: int
			candidates: array[candidate]
				candidate obj with the following properties {
					candidateName: "John"
					
					??? candidateCode: string
					selected: int 0 for not selected, 1 for selected
					ovals: array[point]
						point obj with the following properties {
							x: int for the x-coordinate
							y: int for the y-coordinate
						}
				}			
		}
	pages: (array[page])
	}	
	
Thoughts:
	-ballot should allow straight party voting
		array[parties:
			party {
				partyName:
				partyImage:
				partyCode:
			}
		]
	-if straight-party voting, then each candidate would need a partyCode property
	
	-allow image support in case a question asks about a flag design
	
	-Many local races have question races such as " Should the following judges remain in office:"
		then smaller question races for each candidate (see 2020_Iowa_sample_ballot_(Scott_County).pdf)
		
	-Strings should allow emphasis or underlined programatically
	
	-massachusetts, michigan have very good-looking official ballots
	
	-have write-in below the line instead of before
	
	-other languages must have lang=es, etc programmed 
	
Software Goals, what is this program trying to do?
	- takes JSON input and generates HTML ballot from it using Javascript
	- the webpage ballot has to be accessible for the blind, visually impaired, mechanically impaired, etc.
	- allows voters to make selections on an electronic ballot
	- allows voters to verify the selections they voted for
	- After making selections and reviewing, the user will enter a password to 
	- generate a read-only PDF-UA (accessible PDF) that voters can then email to send in their vote
	- generate a QR-code that users can scan at the polling place to print their selections on the ballot
	
	

	