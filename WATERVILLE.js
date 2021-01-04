// Regular Race:
// {
//   contestName: "",
//   contestSubtitle: "",
//   contestCode: "",
//   contestType: "",
//   voteFor: 1,
//   votingInstructions: "",
//   candidates: [{
// 	  candidateName: "",
// 	  candidateSubtitle: "",
// 	  candidateCode: "",
// 	  selected: 0
// 	},
// 	{
// 	  candidateName: "",
// 	  candidateSubtitle: "",
// 	  candidateCode: "",
// 	  selected: 0
// 	}
//   ]
// }

const ballot = {
  contests: [
    {
      contestName: "Representative to Congress",
      contestSubtitle: "District 1",
      contestCode: "",
      contestType: "RC",
      voteFor: 1,
      votingInstructions: "Rank Choices by Preference",
      candidates: [{
        candidateName: "Allen, Jay T.",
        candidateSubtitle: "Bristol<br>Republican",
        candidateCode: "",
        selected: 0
      },
      {
        candidateName: "Pingree, Chellie M.",
        candidateSubtitle: "North Haven<br>Democratic",
        candidateCode: "",
        selected: 0
      },
      {
        candidateName: "",
        candidateSubtitle: "",
        candidateCode: "writein",
        selected: 0
      }]
    },
    {
      contestName: "City Council",
      contestSubtitle: "Two Year Term",
      contestCode: "",
      contestType: "R",
      voteFor: 1,
      votingInstructions: "Vote for One",
      candidates: [
        {
          candidateName: "Klepach, Thomas Ethan",
          candidateSubtitle: "7 Sunset Ter.",
          candidateCode: "",
          selected: 0
        },
        {
          candidateName: "",
          candidateSubtitle: "",
          candidateCode: "writein",
          selected: 0
        }
      ]
    },
    {
      contestName: "Kennebec Water District Trustees",
      contestSubtitle: "Three Year Term",
      contestCode: "",
      contestType: "R",
      voteFor: 2,
      votingInstructions: "Vote for Two",
      candidates: [
        {
          candidateName: "Bruesewitz, Denise Ann",
          candidateSubtitle: "7 Sunset Ter",
          candidateCode: "",
          selected: 0
        },
        {
          candidateName: "Depre, Thomas Stephen",
          candidateSubtitle: "4 Carroll St.",
          candidateCode: "",
          selected: 0
        },
        {
          candidateName: "Whateley, Sarah Valerie",
          candidateSubtitle: "35 Forest Pk.",
          candidateCode: "",
          selected: 0
        },
        {
          candidateName: "",
          candidateSubtitle: "",
          candidateCode: "writein",
          selected: 0
        },
        {
          candidateName: "",
          candidateSubtitle: "",
          candidateCode: "writein",
          selected: 0
        }
      ]
    },
    {
      contestName: "Question 1",
      contestSubtitle: "",
      contestCode: "",
      contestType: "Q",
      questionText: "Shall the City of Waterville approve the Charter revision recommended by the Charter Commission? Vote Yes or No",
      voteFor: 1,
      votingInstructions: "Vote Yes or No",
      candidates: [
        {
          candidateName: "Yes",
          candidateCode: "",
          selected: 0
        },
        {
          candidateName: "No",
          candidateCode: "",
          selected: 0
        }
      ]
    },
    {
      contestName: "Question 2",
      contestSubtitle: "",
      contestCode: "",
      contestType: "Q",
      questionText: "Shall the City of Waterville approve the Charter revision recommended by the Charter Commission? Vote Yes or No",
      voteFor: 1,
      votingInstructions: "Vote Yes or No",
      candidates: [
        {
          candidateName: "Yes",
          candidateCode: "",
          selected: 0
        },
        {
          candidateName: "No",
          candidateCode: "",
          selected: 0
        }
      ]
    }
  ]
}