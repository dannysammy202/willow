const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const TOPIC_CATEGORIES = [
  'School', 'Everyday', 'Funny', 'Interesting', 'Deep', 'Flirty', 'Catch up', 'Check in',
  'Random', 'Debate', 'Hot takes', 'Nostalgic', 'Future', 'Nigerian life', 'Food', 'Music',
  'Movies & TV', 'Relationships', 'Childhood', 'Work & ambition', 'Faith', 'Dating', 'Friends',
  'Late night', 'Dreams', 'Money', 'Travel', 'Family', 'Personality', 'University & NYSC',
  'Career', 'Social media', 'Lifestyle'
];

const CONVERSATION_GAMES = [
  'Truth or Dare', 'Never Have I Ever', 'What Would You Do?', 'If You Had To Choose',
  'Who Is More Likely To?', 'How Well Do You Know Me?', 'Rank These', 'Agree or Disagree',
  'Red Flag, Green Flag or Depends?', 'Petty or Valid?'
];


const OPENER_AUDIENCES = ['New person', 'Crush', 'Dating', 'Friend'];
const OPENER_CATEGORIES = [
  'All', 'Casual', 'Funny', 'Flirty', 'Deep', 'Interesting', 'Playful', 'Random',
  'Check in', 'Reconnect', 'Late night', 'School', 'Work', 'Nigerian life', 'Music',
  'Movies & TV', 'Food', 'Weekend', 'Opinion', 'Childhood', 'Ambition', 'Travel'
];

const OPENER_BANK = {
  Casual: [
    'Random one, how has your day actually been?',
    'I just realised we have not properly gist today. What is going on with you?',
    'What has been taking most of your time lately?',
    'Quick one, what are you looking forward to this week?'
  ],
  Funny: [
    'I need to know, what is the most unserious thing you have done this week?',
    'Random question, what is one thing you do that would annoy you if somebody else did it?',
    'Be honest, what is your funniest excuse for replying late?',
    'I have a silly question for you. What food opinion would get you dragged immediately?'
  ],
  Flirty: [
    'I was trying to mind my business, then I thought of you. How is your day going?',
    'Quick question, are you always this easy to want to talk to?',
    'I need your opinion on something, but I feel like you might distract me first.',
    'What kind of conversation gets you talking for hours with someone you like?'
  ],
  Deep: [
    'Random but serious question, what has life been teaching you lately?',
    'What is something you understand about yourself now that you did not a year ago?',
    'I have been thinking about this. What does a good life look like to you personally?',
    'What is one thing you protect your peace from now without feeling guilty?'
  ],
  Interesting: [
    'I need a proper answer to this, what is something you could talk about for hours?',
    'What is one opinion you have that people usually disagree with?',
    'What is something you recently learnt that genuinely surprised you?',
    'What is one thing people assume about you and usually get wrong?'
  ],
  Playful: [
    'Let me test something, how competitive are you from 1 to 10?',
    'Pick one without overthinking, calls, texts or voice notes?',
    'I have a quick challenge for you, describe your current mood with one song.',
    'Choose your fighter, free food for a year or free flights for a year?'
  ],
  Random: [
    'Very random, what app do you open more than you should?',
    'Random thought, what is one purchase you will defend forever?',
    'No context, what is your current comfort food?',
    'Quick random one, what is something small that always improves your mood?'
  ],
  'Check in': [
    'You crossed my mind, so I wanted to check in. How are you doing properly?',
    'How has life been treating you this week?',
    'I know people ask “how are you” casually, but how are you actually doing?',
    'What has been taking most of your energy lately?'
  ],
  Reconnect: [
    'We have not properly talked in a while. What have I missed?',
    'I realised it has been a minute. How have you been?',
    'Long time. What has changed for you since we last properly talked?',
    'I refuse to let us become people who only react to each other’s stories. How are you?'
  ],
  'Late night': [
    'Late-night question, what has been on your mind lately?',
    'Since we are both awake, tell me something random about your day.',
    'What is your brain refusing to stop thinking about tonight?',
    'Night-time honesty, what is something you have been overthinking recently?'
  ],
  School: [
    'Quick school question, what subject used to stress you the most?',
    'Were you actually serious in school or were you there for the gist?',
    'What teacher from secondary school do you still remember clearly?',
    'What is one school memory that still makes you laugh?'
  ],
  Work: [
    'How is work treating you today, be honest?',
    'What part of your work do you enjoy more than you expected?',
    'If you could remove one thing from your workday permanently, what would it be?',
    'What has been the most satisfying thing you have worked on lately?'
  ],
  'Nigerian life': [
    'What part of Nigerian adulting deserves financial compensation?',
    'What is the most Lagos thing that has happened to you recently?',
    'Which Nigerian meal could you eat three days in a row without complaining?',
    'Be honest, what Nigerian habit do you complain about but still do yourself?'
  ],
  Music: [
    'Send me one song you have had on repeat lately.',
    'Who has been getting most of your listening time recently?',
    'What song instantly puts you in a better mood?',
    'If you had the aux right now, what are you playing first?'
  ],
  'Movies & TV': [
    'I need something to watch. What have you seen recently that is worth it?',
    'What show would you happily erase from your memory just to watch again?',
    'Which TV character would annoy you badly in real life?',
    'What is one film everybody loves that you do not rate?'
  ],
  Food: [
    'Important question, what food will always win you over?',
    'What is your go-to order when you do not know what to eat?',
    'What Nigerian food opinion are you willing to fight for?',
    'If food was already paid for, where are you eating tonight?'
  ],
  Weekend: [
    'What is your ideal weekend when nobody is disturbing you?',
    'What are you getting up to this weekend?',
    'Are you more stay-home weekend or outside weekend?',
    'If tomorrow was completely free, what would you do first?'
  ],
  Opinion: [
    'I need an unbiased opinion on something.',
    'Give me a hot take you stand by no matter what.',
    'What is something everybody seems to like that you do not understand?',
    'I need your verdict, is replying late disrespectful or does it depend?'
  ],
  Childhood: [
    'What childhood snack would still make you happy today?',
    'What cartoon did you take too seriously growing up?',
    'What did you think adulthood would be like when you were younger?',
    'What childhood game were you unnecessarily competitive about?'
  ],
  Ambition: [
    'What are you trying to get better at right now?',
    'What is one thing you want to have figured out in the next few years?',
    'If money was sorted, what would you spend most of your time doing?',
    'What is something you are quietly working towards?'
  ],
  Travel: [
    'If I gave you a free flight tonight, where are you going?',
    'What place in Nigeria do you still want to visit properly?',
    'Are you more beach trip, city break or quiet getaway?',
    'What is one place you visited that lived up to the hype?'
  ]
};

const INTENTS = [
  'Reply naturally', 'Keep it going', 'Apologise', 'Flirt', 'Reassure them',
  'Explain myself', 'Say no politely', 'Comfort them', 'Resolve argument'
];

const RELATIONSHIPS = ['Partner', 'Dating', 'Crush', 'Friend', 'Best friend', 'New friend', 'Sibling', 'Colleague', 'Group chat', 'Family'];
const VIBES = ['Natural', 'Chill', 'Playful', 'Warm', 'Funny', 'Smooth', 'Bold', 'Curious', 'Thoughtful', 'Flirty', 'Deep'];
const COUNTS = [5, 10, 15, 25, 30, 50];

const STARTER_BANK = {
  School: [
    'What was the one subject everybody in your class feared?',
    'Which teacher from secondary school do you still remember clearly?',
    'Were you the serious student, the gist person, or somewhere in between?',
    'What school rule made no sense to you?',
    'What is one school memory that still makes you laugh?',
    'Which classmate always seemed to know everything happening in school?',
    'Did you ever get punished for something the whole class did?',
    'What was your go-to excuse when you had not done an assignment?'
  ],
  'Nigerian life': [
    'What part of Nigerian adulting deserves compensation?',
    'What is the most Lagos thing that has happened to you recently?',
    'Which Nigerian phrase do you use more than you realise?',
    'What is one thing you thought adulthood in Nigeria would make easier?',
    'Which everyday Nigerian struggle has given you the funniest story?',
    'What small Nigerian convenience would you miss immediately if you moved abroad?',
    'What is your funniest danfo, keke, bus or ride-hailing story?',
    'What is one Nigerian habit you used to complain about but now understand?'
  ],
  Food: [
    'Which Nigerian meal do you never get tired of?',
    'What food opinion would get you dragged in a Nigerian group chat?',
    'If you had to eat one rice dish for a month, which one are you picking?',
    'What is the best late-night food after a long day?',
    'Which food place do you defend even when other people do not rate it?',
    'What meal reminds you most of home?',
    'What is one food combination you know people will judge you for?',
    'If you were hosting friends tonight, what food would you order first?'
  ],
  'Catch up': [
    'What has your week been giving so far?',
    'What has been taking most of your energy lately?',
    'What is something good that happened recently that I might have missed?',
    'What have you been spending most of your free time on lately?',
    'What are you looking forward to this week?',
    'What has changed for you since we last properly talked?',
    'What is one thing you wish you had more time for right now?'
  ],
  Everyday: [
    'What has been the best part of your day so far?',
    'What made you laugh today?',
    'What is one small thing you are looking forward to this week?',
    'What have you been listening to on repeat lately?',
    'What is one thing you have been procrastinating on?',
    'If you had the rest of today completely free, what would you do?',
    'What has been taking up most of your headspace lately?'
  ],
  Deep: [
    'What is something you understand about yourself now that you did not a year ago?',
    'What kind of life feels successful to you personally?',
    'What is one boundary you learnt the hard way?',
    'What is something you are still learning to let go of?',
    'What part of yourself do you think people misunderstand?',
    'What is one decision that changed you more than you expected?',
    'What do you value more now than you did five years ago?'
  ],
  Funny: [
    'What is the most unserious thing you have done recently?',
    'What is one lie you told as a child that was unnecessarily detailed?',
    'What is your funniest excuse for being late?',
    'What is one thing you do that would annoy you if somebody else did it?',
    'Which of your friends would survive least in a reality show?',
    'What is the funniest thing your family believes about you?'
  ],
  Faith: [
    'What is something God has been teaching you lately?',
    'Which Bible story hits differently for you now than it used to?',
    'What is one prayer you have seen answered in an unexpected way?',
    'What helps you stay grounded when life gets noisy?',
    'Which worship song has stayed with you recently?',
    'What part of your faith are you trying to grow in right now?'
  ],
  'University & NYSC': [
    'What was your most chaotic university memory?',
    'Which course or lecturer tested your patience the most?',
    'What did NYSC teach you about people?',
    'What is one thing nobody prepared you for after graduation?',
    'Were you the person who attended lectures early or arrived when attendance started?',
    'What university friendship surprised you by lasting this long?'
  ],
  Dating: [
    'What is one dating green flag people do not talk about enough?',
    'What is something small that instantly makes a date better?',
    'Would you rather talk every day or have more space but better conversations?',
    'What is one thing you think people overcomplicate about dating?',
    'What kind of effort matters most to you when you like someone?',
    'What is a harmless dating opinion you will defend?'
  ],
  Friends: [
    'What makes somebody feel easy to be friends with?',
    'Which friend knows the most random things about you?',
    'What is one friendship memory you still bring up every time?',
    'What quality do you value most in a close friend?',
    'What is one thing your friends always tease you about?',
    'Which type of friend are you in the group?'
  ],
  Money: [
    'What is something you will happily spend money on every time?',
    'What is one expense adulthood introduced that still annoys you?',
    'Would you rather earn more and work more, or earn enough and have more time?',
    'What is one money habit you are trying to improve?',
    'What purchase gave you the best value recently?',
    'What do you think is overpriced in Lagos right now?'
  ],
  Music: [
    'Which song have you overplayed recently?',
    'What artist always makes it into your playlists?',
    'Which Nigerian song takes you straight back to a specific period?',
    'What is one song you love but would struggle to explain why?',
    'If you had the aux for one hour, what are the first three songs?',
    'Which album do you wish you could hear again for the first time?'
  ],
  'Movies & TV': [
    'What show have you been recommending to everybody lately?',
    'Which TV character would annoy you in real life?',
    'What series ending still bothers you?',
    'What movie do you rewatch even though you already know every scene?',
    'Would you rather watch one great film or binge a whole season?',
    'Which Nollywood film or series surprised you recently?'
  ],
  Relationships: [
    'What makes you feel cared for without somebody saying much?',
    'What is something people should talk about earlier in relationships?',
    'What does consistency look like to you?',
    'What is one small thing that builds trust for you?',
    'What makes an apology feel sincere to you?',
    'What is one relationship lesson you had to learn yourself?'
  ],
  Family: [
    'Who in your family gives the funniest advice?',
    'What family tradition would you keep forever?',
    'What is one thing your family always argues about at gatherings?',
    'Which relative always has the latest gist?',
    'What food immediately makes you think of home?',
    'What is one thing you appreciate more about your family now?'
  ],
  Childhood: [
    'What childhood game did you take too seriously?',
    'What snack immediately takes you back to primary school?',
    'What did you think being an adult would be like?',
    'What was your favourite cartoon growing up?',
    'What is one childhood punishment that feels funny now?',
    'Which childhood friend do you still remember clearly?'
  ]
};

const GAME_STARTER_BANK = {
  'Truth or Dare': [
    'Truth: What is something you have wanted to ask me but never did?',
    'Dare: Send a voice note saying the first thing that comes to your mind.',
    'Truth: What is the pettiest reason you stopped talking to someone?',
    'Dare: Describe your current crush using only three words.',
    'Truth: What is one thing people assume about you that is wrong?'
  ],
  'Never Have I Ever': [
    'Never have I ever pretended to be asleep so I would not answer a call.',
    'Never have I ever blamed Lagos traffic when I had not left home yet.',
    'Never have I ever deleted a message because I sent it to the wrong person.',
    'Never have I ever gone somewhere mainly because of the food.',
    'Never have I ever muted a group chat because people were doing too much.'
  ],
  'What Would You Do?': [
    'What would you do if you received ₦5 million today but had to spend it within 24 hours?',
    'What would you do if your friend started dating someone you seriously disliked?',
    'What would you do if your boss accidentally sent you a message meant for someone else about you?',
    'What would you do if you woke up tomorrow with one year fully paid off work?'
  ],
  'If You Had To Choose': [
    'If you had to choose, unlimited data or never experiencing a power cut again?',
    'If you had to choose, free flights for life or free food at every restaurant?',
    'If you had to choose, know exactly what people think of you or never care what they think?',
    'If you had to choose, repeat secondary school or repeat your first year after graduation?'
  ],
  'Who Is More Likely To?': [
    'Who is more likely to disappear from the group chat for three weeks?',
    'Who is more likely to become famous unexpectedly?',
    'Who is more likely to start a business tomorrow?',
    'Who is more likely to spend the most on food in one weekend?',
    'Who is more likely to become the strict parent?'
  ],
  'How Well Do You Know Me?': [
    'What do you think I spend too much money on?',
    'What is my go-to comfort food?',
    'What kind of situation stresses me out fastest?',
    'What is something I always say I will do but keep postponing?',
    'What do you think I value most in a friendship?'
  ],
  'Rank These': [
    'Rank these: money, free time, love, peace of mind, career growth.',
    'Rank these Nigerian foods: jollof rice, fried rice, pounded yam, suya, shawarma.',
    'Rank these date ideas: dinner, beach, cinema, games night, stay-at-home date.',
    'Rank these: calls, voice notes, texts, video calls, seeing each other in person.'
  ],
  'Agree or Disagree': [
    'Agree or disagree: replying late is only rude when you are clearly online.',
    'Agree or disagree: your partner should be your best friend.',
    'Agree or disagree: people spend too much trying to impress others in Lagos.',
    'Agree or disagree: friendship breakups hurt more than relationship breakups.'
  ],
  'Red Flag, Green Flag or Depends?': [
    'They are close friends with their ex. Red flag, green flag or depends?',
    'They hate phone calls and only text. Red flag, green flag or depends?',
    'They are always busy but still check in consistently. Red flag, green flag or depends?',
    'They post everything about their relationship online. Red flag, green flag or depends?'
  ],
  'Petty or Valid?': [
    'Ignoring someone because they replied dry. Petty or valid?',
    'Removing someone from Close Friends after an argument. Petty or valid?',
    'Not inviting someone because they never invite you anywhere. Petty or valid?',
    'Refusing to double text after being left on read. Petty or valid?'
  ]
};

const PARTY_GAMES = {
  'Truth or Dare': {
    icon: 'T/D',
    description: 'Choose truth or dare on each turn.',
    truths: [
      'What is something you hoped nobody here would ever find out?',
      'Who here gave you the most surprising first impression?',
      'What is the pettiest reason you stopped talking to someone?',
      'What is one lie you told your parents growing up that worked?',
      'What is the most embarrassing thing you have done to impress someone?',
      'What is something people misunderstand about you?',
      'What is one thing you would change about your dating history?',
      'What is one compliment you still remember?'
    ],
    dares: [
      'Speak like a news presenter until your next turn.',
      'Give a 30-second acceptance speech for an award nobody wants.',
      'Recreate your most-used reaction without using your phone.',
      'Let another player choose a harmless pose for your next photo.',
      'Perform a dramatic reading of your last harmless text message.',
      'Let the group choose a harmless voice note for you to send.',
      'Dance for 20 seconds with no music.',
      'Say one nice thing about every player without repeating an adjective.'
    ]
  },
  'Never Have I Ever': { icon: 'NH', description: 'Confess, laugh and keep moving.', prompts: GAME_STARTER_BANK['Never Have I Ever'] },
  'What Would You Do?': { icon: 'WD', description: 'Choose what you would do in awkward situations.', prompts: GAME_STARTER_BANK['What Would You Do?'] },
  'If You Had To Choose': { icon: 'IF', description: 'Two options, one answer.', prompts: GAME_STARTER_BANK['If You Had To Choose'] },
  'Who Is More Likely To?': { icon: 'ML', description: 'Point at the person who fits best.', prompts: GAME_STARTER_BANK['Who Is More Likely To?'] },
  'How Well Do You Know Me?': { icon: 'KM', description: 'See who actually pays attention.', prompts: GAME_STARTER_BANK['How Well Do You Know Me?'] },
  'Rank These': { icon: '1–5', description: 'Put the options in your order.', prompts: GAME_STARTER_BANK['Rank These'] },
  'Agree or Disagree': { icon: 'A/D', description: 'Pick a side and explain yourself.', prompts: GAME_STARTER_BANK['Agree or Disagree'] },
  'Red Flag, Green Flag or Depends?': { icon: 'R/G', description: 'Judge the situation, then defend it.', prompts: GAME_STARTER_BANK['Red Flag, Green Flag or Depends?'] },
  'Petty or Valid?': { icon: 'P/V', description: 'Decide whether the reaction makes sense.', prompts: GAME_STARTER_BANK['Petty or Valid?'] },
  'Quickfire': {
    icon: 'QF', description: 'Answer fast. No long thinking.', prompts: [
      'Your go-to comfort food?', 'Calls or texts?', 'One thing you always overspend on?',
      'Jollof rice or fried rice?', 'Beach or house party?', 'One skill you wish you had immediately?',
      'Early morning or late night?', 'What app do you open too often?'
    ]
  },
  'Hot Seat': {
    icon: 'HS', description: 'One player answers, everybody listens.', prompts: [
      'What quality do you value most in a friendship?', 'Which phase of your life would you revisit for one day?',
      'What is a personal rule you refuse to break?', 'What is something you used to care about but no longer do?',
      'What is one risk you are glad you took?', 'What is one thing you want to get better at this year?'
    ]
  }
};

const state = {
  screen: 'reply',
  replyMode: 'screenshot',
  intent: 'Reply naturally',
  intentExpanded: false,
  screenshotData: null,
  screenshotFile: null,
  openerAudience: 'Friend',
  openerCategory: 'All',
  openerCount: 10,
  starterTab: 'browse',
  starterCategory: 'All topics',
  personalCategory: 'All topics',
  relationship: 'Friend',
  vibe: 'Natural',
  starterCount: 10,
  personalCount: 10,
  categoryTarget: 'browse',
  history: readJSON('willowHistory', []),
  textingStyle: localStorage.getItem('willowTextingStyle') || '',
  game: null,
  players: readJSON('willowPlayers', []),
  playerIndex: 0,
  gameRound: 1,
  gamePromptIndex: 0,
  truthOrDareType: null
};

function readJSON(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback)); }
  catch { return fallback; }
}

function escapeHtml(value = '') {
  return String(value).replace(/[&<>'"]/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
  }[char]));
}

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}


function openerPrompts(category, audience = 'Friend') {
  const audienceBase = {
    'New person': [
      'I realised we have not properly talked before, so let me start with this, what have you been into lately?',
      'I feel like there is a lot I do not know about you yet. What is something you always enjoy talking about?',
      'Quick one, what kind of person do your friends say you are?',
      'Let me skip the boring small talk, what has been the highlight of your week?'
    ],
    Crush: [
      'I was looking for an excuse to talk to you, so here I am. How is your day going?',
      'Random question, what kind of conversation makes you lose track of time?',
      'I feel like you have a story I have not heard yet. Tell me one.',
      'Be honest, what is the easiest way to get your attention?'
    ],
    Dating: [
      'I want to know you outside the usual small talk. What has been making you happy lately?',
      'What is one small thing that makes you feel cared for?',
      'Random one, what does a perfect low-key date look like to you?',
      'What is something you wish people asked you more often?'
    ],
    Friend: [
      'I need gist. What has been happening with you?',
      'Random one, what has made you laugh the most this week?',
      'What are you currently obsessed with that I need to know about?',
      'Tell me something I have somehow not heard yet.'
    ]
  };

  const labelled = (name, items) => items.map(text => ({ label: name, text }));
  if (category === 'All') {
    return shuffle([
      ...labelled(audience, audienceBase[audience] || audienceBase.Friend),
      ...OPENER_CATEGORIES.filter(name => name !== 'All').flatMap(name => labelled(name, OPENER_BANK[name] || []))
    ]);
  }

  const categoryItems = OPENER_BANK[category] || [];
  if (category === 'Casual') {
    return shuffle([
      ...labelled(category, categoryItems),
      ...labelled(audience, audienceBase[audience] || audienceBase.Friend)
    ]);
  }
  return shuffle(labelled(category, categoryItems));
}

function localFallbackOpeners(category, audience, count) {
  let pool = openerPrompts(category, audience);
  if (!pool.length) pool = openerPrompts('All', audience);
  const output = [];
  while (output.length < count) {
    const round = shuffle(pool);
    for (const item of round) {
      if (output.length >= count) break;
      output.push(item);
    }
  }
  return output.slice(0, count);
}

function normalPrompts(category) {
  if (STARTER_BANK[category]) return STARTER_BANK[category].map(text => ({ label: category, text }));
  const lower = category.toLowerCase();
  return [
    `What is one ${lower} opinion you will defend every time?`,
    `What is one ${lower} experience you still remember clearly?`,
    `What do you think people get wrong about ${lower}?`,
    `What is the funniest thing that has happened to you around ${lower}?`,
    `What is one thing about ${lower} you appreciate more now than before?`,
    `What is a ${lower} story you never get tired of telling?`,
    `What is one ${lower} choice you would make differently now?`,
    `What is your most unpopular ${lower} opinion?`
  ].map(text => ({ label: category, text }));
}

function promptsForCategory(category) {
  if (category === 'All topics') return shuffle(TOPIC_CATEGORIES.flatMap(normalPrompts));
  if (category === 'All games') return shuffle(CONVERSATION_GAMES.flatMap(name => (GAME_STARTER_BANK[name] || normalPrompts(name).map(x => x.text)).map(text => ({ label: name, text }))));
  if (CONVERSATION_GAMES.includes(category)) return (GAME_STARTER_BANK[category] || []).map(text => ({ label: category, text }));
  return normalPrompts(category);
}

function toast(message, duration = 2200) {
  const el = $('#toast');
  el.textContent = message;
  el.classList.add('show');
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => el.classList.remove('show'), duration);
}

function setLoading(show, message = 'Finding the right words...') {
  $('#loadingText').textContent = message;
  $('#loadingOverlay').hidden = !show;
}

function applyTheme(theme) {
  const next = theme === 'light' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  localStorage.setItem('willowTheme', next);
  $('meta[name="theme-color"]').setAttribute('content', next === 'dark' ? '#2B211B' : '#F6EFE4');
  $('#themeLight').classList.toggle('active', next === 'light');
  $('#themeDark').classList.toggle('active', next === 'dark');
}

function navigate(screen) {
  state.screen = screen;
  $$('.screen').forEach(el => el.classList.toggle('active', el.id === `screen-${screen}`));
  $$('[data-nav]').forEach(el => el.classList.toggle('active', el.dataset.nav === screen));
  window.scrollTo({ top: 0, behavior: 'instant' });
  if (screen === 'history') renderHistory();
}

function renderIntentChips() {
  const visible = state.intentExpanded ? INTENTS : INTENTS.slice(0, 3);
  $('#intentChips').innerHTML = visible.map(intent => `
    <button type="button" class="chip ${state.intent === intent ? 'active' : ''}" data-intent="${escapeHtml(intent)}">${escapeHtml(intent)}</button>
  `).join('');
  $('#intentToggle').textContent = state.intentExpanded ? 'Less' : 'More';
}

function renderCountGrid(selector, selected, dataName) {
  $(selector).innerHTML = COUNTS.map(count => `
    <button type="button" class="${selected === count ? 'active' : ''}" data-${dataName}="${count}">${count}</button>
  `).join('');
}

function renderRelationshipAndVibes() {
  $('#relationshipChips').innerHTML = RELATIONSHIPS.map(item => `<button type="button" class="chip ${state.relationship === item ? 'active' : ''}" data-relationship="${escapeHtml(item)}">${escapeHtml(item)}</button>`).join('');
  $('#vibeChips').innerHTML = VIBES.map(item => `<button type="button" class="chip ${state.vibe === item ? 'active' : ''}" data-vibe="${escapeHtml(item)}">${escapeHtml(item)}</button>`).join('');
}


function renderOpenerAudience() {
  $('#openerAudienceChips').innerHTML = OPENER_AUDIENCES.map(item => `
    <button type="button" class="chip ${state.openerAudience === item ? 'active' : ''}" data-opener-audience="${escapeHtml(item)}">${escapeHtml(item)}</button>
  `).join('');
}

function openerCard(item) {
  return `<article class="starter-card opener-card"><span class="result-label">${escapeHtml(item.label || 'Opener')}</span><p>${escapeHtml(item.text || item)}</p><button type="button" class="result-copy" data-copy="${encodeURIComponent(item.text || item)}"><span class="isax icon-copy button-icon" aria-hidden="true"></span><span>Copy</span></button></article>`;
}

function renderOpeners() {
  renderOpenerAudience();
  $('#openOpenerCategory').textContent = state.openerCategory;

  const pool = openerPrompts(state.openerCategory, state.openerAudience);
  const feature = pool[0] || { label: 'Casual', text: 'Random one, how has your day actually been?' };

  $('#openerFeature').innerHTML = `
    <span class="feature-category">${escapeHtml(feature.label)}</span>
    <div class="feature-question">${escapeHtml(feature.text)}</div>
    <div class="feature-actions">
      <button type="button" class="copy-feature" data-copy="${encodeURIComponent(feature.text)}" aria-label="Copy opener"><span class="isax icon-copy button-icon" aria-hidden="true"></span><span>Copy</span></button>
      <button type="button" class="next-feature" id="nextOpenerFeature" aria-label="Show next opener"><span>Next</span><span class="isax icon-arrow-right button-icon" aria-hidden="true"></span></button>
    </div>
  `;

  $('#openerMore').innerHTML = pool.slice(1, 5).map(openerCard).join('');
  renderCountGrid('#openerCounts', state.openerCount, 'opener-count');
}

function renderCategorySheet() {
  if (state.categoryTarget === 'opener') {
    $('#categoryTitle').textContent = 'Opener category';
    $('#categorySectionTitle').textContent = 'Opener style';
    $('#topicCategoryGrid').innerHTML = OPENER_CATEGORIES.map(item => `
      <button type="button" class="${state.openerCategory === item ? 'active' : ''}" data-category-choice="${escapeHtml(item)}">${escapeHtml(item)}</button>
    `).join('');
    return;
  }

  $('#categoryTitle').textContent = 'Conversation category';
  $('#categorySectionTitle').textContent = 'Normal conversation';
  const selected = state.categoryTarget === 'browse' ? state.starterCategory : state.personalCategory;
  $('#topicCategoryGrid').innerHTML = [
    `<button type="button" class="${selected === 'All topics' ? 'active' : ''}" data-category-choice="All topics">All</button>`,
    ...TOPIC_CATEGORIES.map(item => `<button type="button" class="${selected === item ? 'active' : ''}" data-category-choice="${escapeHtml(item)}">${escapeHtml(item)}</button>`)
  ].join('');
}

function renderStarterBrowse() {
  const quick = ['All topics', 'School', 'Everyday', 'Deep', 'Nigerian life'];
  $('#quickCategories').innerHTML = quick.map(item => `
    <button type="button" class="chip ${state.starterCategory === item ? 'active' : ''}" data-quick-category="${escapeHtml(item)}">${item === 'All topics' ? 'All' : escapeHtml(item)}</button>
  `).join('') + `<button type="button" class="chip" id="openCategorySheet">More</button>`;

  const pool = promptsForCategory(state.starterCategory);
  const feature = pool[0] || { label: state.starterCategory, text: 'What has your week been giving so far?' };
  $('#starterFeature').innerHTML = `
    <span class="feature-category">${escapeHtml(feature.label)}</span>
    <div class="feature-question">${escapeHtml(feature.text)}</div>
    <div class="feature-actions">
      <button type="button" class="copy-feature" data-copy="${encodeURIComponent(feature.text)}" aria-label="Copy starter"><span class="isax icon-copy button-icon" aria-hidden="true"></span><span>Copy</span></button>
      <button type="button" class="next-feature" id="nextFeature" aria-label="Show next starter"><span>Next</span><span class="isax icon-arrow-right button-icon" aria-hidden="true"></span></button>
    </div>
  `;

  $('#starterMore').innerHTML = pool.slice(1, 5).map(item => starterCard(item)).join('');
  renderCountGrid('#starterCounts', state.starterCount, 'starter-count');
}

function starterCard(item) {
  return `<article class="starter-card"><span class="result-label">${escapeHtml(item.label || 'Starter')}</span><p>${escapeHtml(item.text || item)}</p><button type="button" class="result-copy" data-copy="${encodeURIComponent(item.text || item)}"><span class="isax icon-copy button-icon" aria-hidden="true"></span><span>Copy</span></button></article>`;
}

function replyCard(item) {
  const label = item.label || 'Reply';
  const text = item.text || item;
  return `<article class="reply-card"><span class="result-label">${escapeHtml(label)}</span><p>${escapeHtml(text)}</p><button type="button" class="result-copy" data-copy="${encodeURIComponent(text)}"><span class="isax icon-copy button-icon" aria-hidden="true"></span><span>Copy</span></button></article>`;
}

function addHistory(type, label, preview) {
  state.history.unshift({ type, label, preview, time: Date.now() });
  state.history = state.history.slice(0, 40);
  localStorage.setItem('willowHistory', JSON.stringify(state.history));
}

function renderHistory() {
  const list = $('#historyList');
  $('#clearHistory').hidden = state.history.length === 0;
  if (!state.history.length) {
    list.innerHTML = '<div class="empty-state">No Willow history yet.</div>';
    return;
  }
  list.innerHTML = state.history.map(entry => {
    const date = new Date(entry.time || Date.now());
    return `<article class="history-card"><span class="result-label">${escapeHtml(entry.type)} · ${escapeHtml(date.toLocaleDateString('en-NG', { day: 'numeric', month: 'short' }))}</span><p>${escapeHtml(entry.label)}</p>${entry.preview ? `<p class="muted-copy" style="margin-top:8px">${escapeHtml(entry.preview)}</p>` : ''}</article>`;
  }).join('');
}

function renderGames() {
  const iconMap = {
    'Truth or Dare': 'icon-messages-2',
    'Never Have I Ever': 'icon-emoji-happy',
    'What Would You Do?': 'icon-message-question',
    'If You Had To Choose': 'icon-arrow-swap-horizontal',
    'Who Is More Likely To?': 'icon-people',
    'How Well Do You Know Me?': 'icon-heart',
    'Rank These': 'icon-ranking',
    'Agree or Disagree': 'icon-like-shapes',
    'Red Flag, Green Flag or Depends?': 'icon-flag',
    'Petty or Valid?': 'icon-judge',
    'Quickfire': 'icon-flash',
    'Hot Seat': 'icon-profile-2user'
  };
  $('#gameGrid').innerHTML = Object.entries(PARTY_GAMES).map(([name, game], index) => `
    <button type="button" class="game-card game-card--${(index % 4) + 1}" data-game="${escapeHtml(name)}">
      <span class="game-icon"><span class="isax ${iconMap[name] || 'icon-game'}" aria-hidden="true"></span></span>
      <span class="game-card-copy">
        <h3>${escapeHtml(name)}</h3>
        <p>${escapeHtml(game.description)}</p>
      </span>
      <span class="isax icon-arrow-right-3 game-arrow" aria-hidden="true"></span>
    </button>
  `).join('');
}

function renderPlayers() {
  $('#playerChips').innerHTML = state.players.length
    ? state.players.map((name, index) => `<button type="button" class="chip" data-remove-player="${index}">${escapeHtml(name)} ×</button>`).join('')
    : '<span class="muted-copy">No players added yet.</span>';
  $('#startGame').disabled = state.players.length < 2;
  localStorage.setItem('willowPlayers', JSON.stringify(state.players));
}

function openGameSetup(name) {
  state.game = name;
  state.truthOrDareType = null;
  $('#gameHome').hidden = true;
  $('#gamePlay').hidden = true;
  $('#gameSetup').hidden = false;
  $('#selectedGameLabel').textContent = name;
  renderPlayers();
}

function startPartyGame() {
  if (!state.game || state.players.length < 2) return;
  state.playerIndex = 0;
  state.gameRound = 1;
  state.gamePromptIndex = Math.floor(Math.random() * 5);
  state.truthOrDareType = null;
  $('#gameSetup').hidden = true;
  $('#gamePlay').hidden = false;
  renderPartyTurn();
}

function getPartyPrompt() {
  const game = PARTY_GAMES[state.game];
  if (!game) return '';
  if (state.game === 'Truth or Dare') {
    if (!state.truthOrDareType) return '';
    const array = state.truthOrDareType === 'truth' ? game.truths : game.dares;
    return array[state.gamePromptIndex % array.length];
  }
  const array = game.prompts || [];
  return array[state.gamePromptIndex % array.length] || '';
}

function renderPartyTurn() {
  const player = state.players[state.playerIndex % state.players.length];
  $('#turnLabel').textContent = `${player} is up`;
  $('#roundLabel').textContent = `Round ${state.gameRound}`;
  const choice = $('#truthDareChoice');
  const prompt = $('#gamePrompt');
  if (state.game === 'Truth or Dare' && !state.truthOrDareType) {
    choice.hidden = false;
    prompt.hidden = true;
  } else {
    choice.hidden = true;
    prompt.hidden = false;
    prompt.textContent = getPartyPrompt();
  }
}

function nextPartyPrompt(changePlayer = false) {
  const game = PARTY_GAMES[state.game];
  if (!game) return;
  if (changePlayer) {
    state.playerIndex = (state.playerIndex + 1) % state.players.length;
    if (state.playerIndex === 0) state.gameRound += 1;
  }
  state.gamePromptIndex += 1;
  state.truthOrDareType = null;
  renderPartyTurn();
}

async function fileToDataUrl(file) {
  return await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function compressScreenshot(file) {
  if (file.size <= 1.2 * 1024 * 1024) return fileToDataUrl(file);

  const sourceUrl = URL.createObjectURL(file);
  try {
    const image = await new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = sourceUrl;
    });

    const maxWidth = 1600;
    const scale = Math.min(1, maxWidth / image.naturalWidth);
    const width = Math.max(1, Math.round(image.naturalWidth * scale));
    const height = Math.max(1, Math.round(image.naturalHeight * scale));
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d', { alpha: false });
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, width, height);
    context.drawImage(image, 0, 0, width, height);
    return canvas.toDataURL('image/jpeg', 0.86);
  } finally {
    URL.revokeObjectURL(sourceUrl);
  }
}

async function callWillow(parts, timeoutMs = 30000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch('/api/reply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ parts }),
      signal: controller.signal
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      const error = new Error(data.error || 'Willow could not generate a response.');
      error.status = response.status;
      error.retryAfter = data.retryAfter;
      throw error;
    }

    const replies = Array.isArray(data.replies) ? data.replies : [];
    if (!replies.length) throw new Error('Willow did not receive usable options.');
    return replies;
  } catch (error) {
    if (error.name === 'AbortError') {
      const timeoutError = new Error('Willow took too long to respond. Try again.');
      timeoutError.status = 504;
      throw timeoutError;
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

function messageForError(error) {
  if (error.status === 429) return 'Willow has reached its current AI usage limit. Try again shortly.';
  if (error.status === 503 || error.status === 502) return 'Willow is under heavy demand right now. Try again shortly.';
  if (error.status === 405) return 'Willow needs a quick service refresh. Reload the app and try again.';
  if (error.status === 504) return 'Willow took too long to respond. Try again.';
  return error.message || 'Something went wrong. Try again.';
}

function currentReplyContext() {
  if (state.replyMode === 'message') return `${$('#messageInput').value.trim()}\nContext: ${$('#messageContext').value.trim()}`.trim();
  if (state.replyMode === 'context') return $('#contextInput').value.trim();
  return $('#screenshotContext').value.trim();
}

async function generateReplies() {
  const context = currentReplyContext();
  if (state.replyMode === 'screenshot' && !state.screenshotData && !context) {
    toast('Add a screenshot or some context first.');
    return;
  }
  if (state.replyMode === 'message' && !$('#messageInput').value.trim()) {
    toast('Paste the message first.');
    return;
  }
  if (state.replyMode === 'context' && !context) {
    toast('Tell Willow what happened first.');
    return;
  }

  const prompt = [
    'You are Willow, a messaging assistant. Write exactly five ready-to-send replies.',
    `Goal: ${state.intent}.`,
    `User context or message: ${context || 'Use the uploaded screenshot as the main context.'}`,
    `Saved texting style: ${state.textingStyle || 'Natural, concise, contemporary messaging.'}`,
    'The user lives in Nigeria. Use Nigerian English naturally when relevant. Use light Pidgin only when it genuinely fits the situation. Do not force slang.',
    'Keep each option meaningfully different. Avoid corporate language, therapy language, over-explaining, or sounding generated.',
    'Return JSON only in this exact shape: {"replies":[{"label":"Natural","text":"..."}]}'
  ].join('\n');

  const parts = [{ text: prompt }];
  if (state.replyMode === 'screenshot' && state.screenshotData) {
    const match = state.screenshotData.match(/^data:([^;]+);base64,(.+)$/);
    if (match) parts.push({ inlineData: { mimeType: match[1], data: match[2] } });
  }

  setLoading(true, 'Finding five replies...');
  try {
    const replies = await callWillow(parts);
    $('#replyResults').innerHTML = replies.slice(0, 5).map(replyCard).join('');
    addHistory('Reply', state.intent, context || 'Screenshot reply');
    setTimeout(() => $('#replyResults').scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
  } catch (error) {
    toast(messageForError(error), 3200);
  } finally {
    setLoading(false);
  }
}

function localFallbackStarters(category, count) {
  let pool = promptsForCategory(category);
  if (!pool.length) pool = promptsForCategory('All topics');
  const output = [];
  let round = 0;
  while (output.length < count) {
    const shuffled = shuffle(pool);
    for (const item of shuffled) {
      if (output.length >= count) break;
      const suffix = round === 0 ? '' : round === 1 ? ' What is the story behind your answer?' : ' Why?';
      output.push({ label: item.label, text: `${item.text}${suffix}` });
    }
    round += 1;
  }
  return output.slice(0, count);
}


async function generateOpeners() {
  const category = state.openerCategory;
  const audience = state.openerAudience;
  const count = state.openerCount;
  const chunks = [];
  for (let remaining = count; remaining > 0; remaining -= 10) chunks.push(Math.min(10, remaining));

  const generated = [];
  setLoading(true, `Generating ${count} openers...`);

  try {
    for (let index = 0; index < chunks.length; index += 1) {
      $('#loadingText').textContent = `Generating ${Math.min((index + 1) * 10, count)} of ${count}...`;
      const size = chunks[index];
      const prompt = [
        `Generate exactly ${size} ready-to-send conversation openers for a person in Nigeria.`,
        `Who the user is talking to: ${audience}.`,
        `Opener category: ${category}.`,
        category === 'All' ? 'Mix the opener styles naturally and label each result with its style.' : '',
        'These are OPENERS, not conversation starters for an already-running chat. Each result must work as the first message or the message that restarts a quiet chat.',
        'Write the exact message the user should send. Do not give advice, explanations, headings inside the message, or interview-style lists.',
        'Keep them natural, short enough for chat, socially aware and easy to reply to.',
        'Use Nigerian English naturally where it fits. Light Pidgin is fine only when it genuinely suits the line. Do not force slang or location references.',
        'Avoid repetitive “random question” phrasing. Vary the openings.',
        `This is batch ${index + 1} of ${chunks.length}. Avoid obvious repeats.`,
        'Return JSON only as {"replies":[{"label":"Casual","text":"..."}]}'
      ].filter(Boolean).join('\n');

      try {
        const batch = await callWillow([{ text: prompt }], 28000);
        generated.push(...batch);
      } catch (error) {
        if ([429, 502, 503, 504].includes(error.status)) break;
        throw error;
      }
    }

    let final = generated.slice(0, count);
    if (final.length < count) {
      final = [...final, ...localFallbackOpeners(category, audience, count - final.length)].slice(0, count);
      toast(generated.length ? 'Willow filled the rest from its saved opener pack.' : 'Using Willow’s saved opener pack.', 2800);
    }

    $('#openerResults').innerHTML = final.map(openerCard).join('');
    addHistory('Openers', `${audience} · ${category}`, `${count} openers`);
    setTimeout(() => $('#openerResults').scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
  } catch (error) {
    $('#openerResults').innerHTML = localFallbackOpeners(category, audience, count).map(openerCard).join('');
    toast('AI is unavailable, so Willow used its saved opener pack.', 3000);
  } finally {
    setLoading(false);
  }
}

async function generateStarters({ personalised = false } = {}) {
  const category = personalised ? state.personalCategory : state.starterCategory;
  const count = personalised ? state.personalCount : state.starterCount;
  const relationship = state.relationship;
  const vibe = state.vibe;
  const extraContext = $('#personalContext').value.trim();
  const isGame = category === 'All games' || CONVERSATION_GAMES.includes(category);

  const chunks = [];
  for (let remaining = count; remaining > 0; remaining -= 10) chunks.push(Math.min(10, remaining));
  const generated = [];
  setLoading(true, `Generating ${count} starters...`);

  try {
    for (let index = 0; index < chunks.length; index += 1) {
      $('#loadingText').textContent = `Generating ${Math.min((index + 1) * 10, count)} of ${count}...`;
      const size = chunks[index];
      const prompt = [
        `Generate exactly ${size} ${isGame ? 'conversation game prompts' : 'conversation starters'} for two people in Nigeria.`,
        `Category: ${category}.`,
        personalised ? `Relationship: ${relationship}. Vibe: ${vibe}. Extra context: ${extraContext || 'none'}.` : '',
        `This is batch ${index + 1} of ${chunks.length}. Make every prompt distinct from obvious common starter lists.`,
        'Use experiences familiar to people living in Nigeria where relevant, including school, family, work, money, transport, food, entertainment and everyday life. Do not force Nigeria into every line.',
        isGame ? 'Follow the selected game format exactly. If the category is All games, mix the supported game formats and label each one.' : 'Avoid interview-style questions. They should feel natural to send or ask.',
        'Return JSON only as {"replies":[{"label":"Category","text":"..."}]}'
      ].filter(Boolean).join('\n');

      try {
        const batch = await callWillow([{ text: prompt }], 28000);
        generated.push(...batch);
      } catch (error) {
        if ([429, 502, 503, 504].includes(error.status)) break;
        throw error;
      }
    }

    let final = generated.slice(0, count);
    if (final.length < count) {
      const fallback = localFallbackStarters(category, count - final.length);
      final = [...final, ...fallback].slice(0, count);
      toast(generated.length ? 'Willow filled the rest from its saved starter pack.' : 'Using Willow’s saved starter pack.', 2800);
    }

    const target = personalised ? $('#personalResults') : $('#freshResults');
    target.innerHTML = final.map(starterCard).join('');
    addHistory('Starters', category, personalised ? `${relationship} · ${vibe}` : `${count} prompts`);
    setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
  } catch (error) {
    const fallback = localFallbackStarters(category, count);
    const target = personalised ? $('#personalResults') : $('#freshResults');
    target.innerHTML = fallback.map(starterCard).join('');
    toast('AI is unavailable, so Willow used its saved starter pack.', 3000);
  } finally {
    setLoading(false);
  }
}

function openCategorySheet(target) {
  state.categoryTarget = target;
  renderCategorySheet();
  $('#categoryBackdrop').hidden = false;
  $('#categorySheet').hidden = false;
  document.documentElement.style.overflow = 'hidden';
}

function closeCategorySheet() {
  $('#categoryBackdrop').hidden = true;
  $('#categorySheet').hidden = true;
  document.documentElement.style.overflow = '';
}

function renderAll() {
  renderIntentChips();
  renderOpeners();
  renderStarterBrowse();
  renderCountGrid('#personalCounts', state.personalCount, 'personal-count');
  renderRelationshipAndVibes();
  $('#openPersonalCategory').textContent = state.personalCategory;
  renderHistory();
  renderGames();
  $('#textingStyle').value = state.textingStyle;
}

document.addEventListener('click', event => {
  const button = event.target.closest('button');
  if (!button) return;

  if (button.dataset.nav) {
    navigate(button.dataset.nav);
    return;
  }

  if (button.dataset.replyMode) {
    state.replyMode = button.dataset.replyMode;
    $$('[data-reply-mode]').forEach(el => el.classList.toggle('active', el === button));
    $$('.reply-panel').forEach(el => el.classList.toggle('active', el.id === `reply-panel-${state.replyMode}`));
    return;
  }

  if (button.dataset.intent) {
    state.intent = button.dataset.intent;
    renderIntentChips();
    return;
  }

  if (button.dataset.starterTab) {
    state.starterTab = button.dataset.starterTab;
    $$('[data-starter-tab]').forEach(el => el.classList.toggle('active', el === button));
    $('#starterBrowse').hidden = state.starterTab !== 'browse';
    $('#starterPersonalised').hidden = state.starterTab !== 'personalised';
    return;
  }

  if (button.dataset.quickCategory) {
    state.starterCategory = button.dataset.quickCategory;
    renderStarterBrowse();
    return;
  }

  if (button.dataset.categoryChoice) {
    const choice = button.dataset.categoryChoice;
    if (state.categoryTarget === 'opener') {
      state.openerCategory = choice;
      closeCategorySheet();
      renderOpeners();
      return;
    }
    if (state.categoryTarget === 'browse') state.starterCategory = choice;
    else state.personalCategory = choice;
    closeCategorySheet();
    renderStarterBrowse();
    $('#openPersonalCategory').textContent = state.personalCategory;
    return;
  }

  if (button.dataset.openerAudience) {
    state.openerAudience = button.dataset.openerAudience;
    renderOpeners();
    return;
  }

  if (button.dataset.openerCount) {
    state.openerCount = Number(button.dataset.openerCount);
    renderCountGrid('#openerCounts', state.openerCount, 'opener-count');
    return;
  }

  if (button.dataset.starterCount) {
    state.starterCount = Number(button.dataset.starterCount);
    renderCountGrid('#starterCounts', state.starterCount, 'starter-count');
    return;
  }

  if (button.dataset.personalCount) {
    state.personalCount = Number(button.dataset.personalCount);
    renderCountGrid('#personalCounts', state.personalCount, 'personal-count');
    return;
  }

  if (button.dataset.relationship) {
    state.relationship = button.dataset.relationship;
    renderRelationshipAndVibes();
    return;
  }

  if (button.dataset.vibe) {
    state.vibe = button.dataset.vibe;
    renderRelationshipAndVibes();
    return;
  }

  if (button.dataset.copy) {
    const text = decodeURIComponent(button.dataset.copy);
    navigator.clipboard.writeText(text).then(() => toast('Copied')).catch(() => toast('Copy failed'));
    return;
  }

  if (button.dataset.game) {
    openGameSetup(button.dataset.game);
    return;
  }

  if (button.dataset.removePlayer !== undefined) {
    state.players.splice(Number(button.dataset.removePlayer), 1);
    renderPlayers();
    return;
  }

  if (button.dataset.truthDare) {
    state.truthOrDareType = button.dataset.truthDare;
    renderPartyTurn();
  }
});

$('#intentToggle').addEventListener('click', () => {
  state.intentExpanded = !state.intentExpanded;
  renderIntentChips();
});

$('#screenshotInput').addEventListener('change', async event => {
  const file = event.target.files?.[0];
  if (!file) return;
  if (file.size > 10 * 1024 * 1024) {
    toast('Please use a screenshot under 10 MB.');
    event.target.value = '';
    return;
  }
  const allowed = ['image/png', 'image/jpeg', 'image/webp'];
  if (!allowed.includes(file.type)) {
    toast('Please use a PNG, JPG or WebP screenshot.');
    event.target.value = '';
    return;
  }
  state.screenshotFile = file;
  state.screenshotData = await compressScreenshot(file);
  $('#previewImage').src = state.screenshotData;
  $('#previewName').textContent = file.name;
  $('#previewSize').textContent = `${(file.size / 1024 / 1024).toFixed(1)} MB`;
  $('#uploadEmpty').hidden = true;
  $('#uploadPreview').hidden = false;
});

$('#removeScreenshot').addEventListener('click', event => {
  event.preventDefault();
  event.stopPropagation();
  state.screenshotFile = null;
  state.screenshotData = null;
  $('#screenshotInput').value = '';
  $('#uploadEmpty').hidden = false;
  $('#uploadPreview').hidden = true;
});

$('#generateReplies').addEventListener('click', generateReplies);
$('#generateOpeners').addEventListener('click', generateOpeners);
$('#openOpenerCategory').addEventListener('click', () => openCategorySheet('opener'));
$('#generateFresh').addEventListener('click', () => generateStarters({ personalised: false }));
$('#generatePersonalised').addEventListener('click', () => generateStarters({ personalised: true }));
$('#openPersonalCategory').addEventListener('click', () => openCategorySheet('personal'));
$('#closeCategorySheet').addEventListener('click', closeCategorySheet);
$('#categoryBackdrop').addEventListener('click', closeCategorySheet);

document.addEventListener('click', event => {
  if (event.target.closest('#openCategorySheet')) openCategorySheet('browse');

  if (event.target.closest('#nextOpenerFeature')) {
    const pool = openerPrompts(state.openerCategory, state.openerAudience);
    const next = pool[Math.floor(Math.random() * pool.length)];
    if (!next) return;
    $('#openerFeature').innerHTML = `
      <span class="feature-category">${escapeHtml(next.label)}</span>
      <div class="feature-question">${escapeHtml(next.text)}</div>
      <div class="feature-actions"><button type="button" class="copy-feature" data-copy="${encodeURIComponent(next.text)}"><span class="isax icon-copy button-icon" aria-hidden="true"></span><span>Copy</span></button><button type="button" class="next-feature" id="nextOpenerFeature"><span>Next</span><span class="isax icon-arrow-right button-icon" aria-hidden="true"></span></button></div>`;
    return;
  }

  if (event.target.closest('#nextFeature')) {
    const pool = shuffle(promptsForCategory(state.starterCategory));
    const next = pool[0];
    if (!next) return;
    $('#starterFeature').innerHTML = `
      <span class="feature-category">${escapeHtml(next.label)}</span>
      <div class="feature-question">${escapeHtml(next.text)}</div>
      <div class="feature-actions"><button type="button" class="copy-feature" data-copy="${encodeURIComponent(next.text)}"><span class="isax icon-copy button-icon" aria-hidden="true"></span><span>Copy</span></button><button type="button" class="next-feature" id="nextFeature"><span>Next</span><span class="isax icon-arrow-right button-icon" aria-hidden="true"></span></button></div>`;
  }
});

$('#themeLight').addEventListener('click', () => applyTheme('light'));
$('#themeDark').addEventListener('click', () => applyTheme('dark'));
$('#saveSettings').addEventListener('click', () => {
  state.textingStyle = $('#textingStyle').value.trim();
  localStorage.setItem('willowTextingStyle', state.textingStyle);
  toast('Style saved');
});

$('#clearHistory').addEventListener('click', () => {
  state.history = [];
  localStorage.removeItem('willowHistory');
  renderHistory();
  toast('History cleared');
});

$('#backToGames').addEventListener('click', () => {
  $('#gameSetup').hidden = true;
  $('#gamePlay').hidden = true;
  $('#gameHome').hidden = false;
});

function addPlayer() {
  const input = $('#playerName');
  const name = input.value.trim();
  if (!name) return;
  if (state.players.length >= 16) return toast('Maximum 16 players.');
  if (state.players.some(existing => existing.toLowerCase() === name.toLowerCase())) return toast('That player is already added.');
  state.players.push(name);
  input.value = '';
  renderPlayers();
  input.focus();
}

$('#addPlayer').addEventListener('click', addPlayer);
$('#playerName').addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    event.preventDefault();
    addPlayer();
  }
});
$('#startGame').addEventListener('click', startPartyGame);
$('#skipPrompt').addEventListener('click', () => nextPartyPrompt(false));
$('#nextTurn').addEventListener('click', () => nextPartyPrompt(true));

// Keep Willow fixed at mobile scale. Inputs stay at 16px so iOS Safari does not zoom on focus.
let lastTouchEnd = 0;
['gesturestart', 'gesturechange', 'gestureend'].forEach(type => {
  document.addEventListener(type, event => event.preventDefault(), { passive: false });
});
document.addEventListener('touchend', event => {
  const now = Date.now();
  if (now - lastTouchEnd <= 300) event.preventDefault();
  lastTouchEnd = now;
}, { passive: false });

const savedTheme = localStorage.getItem('willowTheme') || 'dark';
applyTheme(savedTheme);
renderAll();
renderPlayers();
navigate('reply');

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js?v=20261001-2').catch(() => {}));
}
