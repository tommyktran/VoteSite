console.log('hi from sw_assets')

//sessionStorage.setItem('contestUrls', contestLinks);

const sw_assets = [
    './',
    './index.html',
    './review.html',
    './thankyou.html',
    './affidavitPage.html',
    './affidavitPage.js',
    './ballot.css',
    './ballot.js',
    './WATERVILLE.js',
    './buildSelectionPage.js',
    './ovalSelection.js',
    './buildReviewPage.js',
    './keyboard.js'
]

const numOfContests = ballot.contests.length;
for (let i = 0; i < numOfContests; i++) {
  sw_assets.push('./index.html#contest_' + i);
}

console.log(sw_assets);

