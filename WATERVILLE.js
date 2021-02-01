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

let ballot = {
  contests: [
    {
      contestName: "President and Vice President",
      contestSubtitle: "",
      contestCode: "",
      contestType: "RC",
      voteFor: 1,
      votingInstructions: "Rank Choices by Preference",
      candidates: [{
        candidateName: "Biden, Joseph R.<br>Harris, Kamala D.",
        candidateSubtitle: "Democratic",
        candidateCode: "",
        selected: 0
      },
      {
        candidateName: 'De La Fuente, Roque &quot;Rocky&quot;<br>Richardson, Darcy G.',
        candidateSubtitle: "Alliance Party",
        candidateCode: "",
        selected: 0
      },
      {
        candidateName: "Hawkins, Howard<br>Walker, Angela Nicole",
        candidateSubtitle: "Green Independent",
        candidateCode: "",
        selected: 0
      },
      {
        candidateName: "Jorgensen, Jo<br>Cohen, Jeremy",
        candidateSubtitle: "Libertarian",
        candidateCode: "",
        selected: 0
      },
      {
        candidateName: "Trump, Donald J.<br>Pence, Michael R.",
        candidateSubtitle: "Republican",
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
      contestName: "United States Senator",
      contestSubtitle: "",
      contestCode: "",
      contestType: "RC",
      voteFor: 1,
      votingInstructions: "Rank Choices by Preference",
      candidates: [{
        candidateName: "Collins, Susan Margaret",
        candidateSubtitle: "Bangor<br>Republican",
        candidateCode: "",
        selected: 0
      },
      {
        candidateName: "Gideon, Sara I.",
        candidateSubtitle: "Freeport<br>Democratic",
        candidateCode: "",
        selected: 0
      },
      {
        candidateName: "Linn, Max Patrick",
        candidateSubtitle: "Bar Harbor<br>Independent",
        candidateCode: "",
        selected: 0
      },
      {
        candidateName: "Savage, Lisa",
        candidateSubtitle: "Solon<br>Independent",
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
      contestName: "State Senator",
      contestSubtitle: "District 16",
      contestCode: "",
      contestType: "R",
      voteFor: 1,
      votingInstructions: "Vote for One",
      candidates: [
        {
          candidateName: "Cyrway, Scott Wynn",
          candidateSubtitle: "Albion<br>Republican",
          candidateCode: "",
          selected: 0
        },
        {
          candidateName: "Koch, Hilary D.",
          candidateSubtitle: "Waterville<br>Democratic",
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
      contestName: "Representative to the Legislature",
      contestSubtitle: "District 110",
      contestCode: "",
      contestType: "R",
      voteFor: 1,
      votingInstructions: "Vote For One",
      candidates: [
        {
          candidateName: "Andre, Mark R.",
          candidateSubtitle: "Oakland<br>Unenrolled",
          candidateCode: "",
          selected: 0
        },
        {
          candidateName: "Madigan, Colleen M.",
          candidateSubtitle: "Waterville<br>Democratic",
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
      contestName: "Judge of Probate",
      contestSubtitle: "Kennebec County",
      contestCode: "",
      contestType: "R",
      voteFor: 1,
      votingInstructions: "Vote For One",
      candidates: [
        {
        candidateName: "Mitchell, Elizabeth H.",
        candidateSubtitle: "Vassalboro<br>Democratic",
        candidateCode: "",
        selected: 0
        },
        {
          candidateName: "Sullivan, Kevin P.",
          candidateSubtitle: "Gardiner<br>Republican",
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
      contestName: "Sheriff",
      contestSubtitle: "Kennebec County",
      contestCode: "",
      contestType: "",
      voteFor: 1,
      votingInstructions: "Vote For One",
      candidates: [
        {
          candidateName: "Mason, L. Kenneth, III",
          candidateSubtitle: "Readfield<br>Independent",
          candidateCode: "",
          selected: 0
        },
        {
          candidateName: "Sayers, Michael J.",
          candidateSubtitle: "Rome<br>Democratic",
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
      contestName: "County Commissioner",
      contestSubtitle: "Kennebec District 3",
      contestCode: "R",
      contestType: "",
      voteFor: 1,
      votingInstructions: "Vote For One",
      candidates: [
        {
          candidateName: "Jabar, George M., II",
          candidateSubtitle: "Waterville<br>Democratic",
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
      contestName: "Mayor",
      contestSubtitle: "Three Year Term",
      contestCode: "mayor",
      contestType: "R",
      voteFor: 1,
      votingInstructions: "Vote for One",
      candidates: [
        {
          candidateName: "Bofia, Phil E.",
          candidateSubtitle: "53 Pleasantdale Ave.",
          candidateCode: "",
          selected: 0
        },
        {
          candidateName: "Coeljo, J S.",
          candidateSubtitle: "40 Louise Ave.",
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