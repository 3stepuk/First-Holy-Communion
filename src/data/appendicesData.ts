import { MassPart, StepByStepItem, PrayerItem, ReadinessItem, CatechismQA } from '../types';

export const APPENDIX_A_MASS_GUIDE: MassPart[] = [
  {
    part: 'Introductory Rites',
    whatHappens: 'Entrance, Sign of the Cross and greeting',
    howITakePart: 'Stand and join the procession hymn. Make the Sign of the Cross carefully and answer the greeting.'
  },
  {
    part: 'Introductory Rites',
    whatHappens: 'Penitential Act, Kyrie, Gloria and Collect',
    howITakePart: 'Acknowledge your sins, ask mercy, praise God and unite your prayer to the Collect.'
  },
  {
    part: 'Liturgy of the Word',
    whatHappens: 'Readings, psalm and Gospel',
    howITakePart: 'Listen for what God is saying. Join the psalm and Gospel acclamations.'
  },
  {
    part: 'Liturgy of the Word',
    whatHappens: 'Homily, Creed and Universal Prayer',
    howITakePart: 'Listen, profess the Catholic faith and pray for the Church and the world.'
  },
  {
    part: 'Liturgy of the Eucharist',
    whatHappens: 'Preparation of the gifts',
    howITakePart: 'Offer yourself and your whole life with the bread and wine placed on the altar.'
  },
  {
    part: 'Liturgy of the Eucharist',
    whatHappens: 'Eucharistic Prayer',
    howITakePart: 'Listen in reverent silence and unite yourself to the Church\'s thanksgiving and offering.'
  },
  {
    part: 'Liturgy of the Eucharist',
    whatHappens: 'Epiclesis and consecration',
    howITakePart: 'Kneel according to local practice. Adore Christ as the host and chalice are shown.'
  },
  {
    part: 'Liturgy of the Eucharist',
    whatHappens: 'Memorial, intercessions and doxology',
    howITakePart: 'Remember Christ\'s saving work, pray with the Church and answer the Great Amen.'
  },
  {
    part: 'Communion Rite',
    whatHappens: 'Our Father, Sign of Peace and Lamb of God',
    howITakePart: 'Pray for daily bread and forgiveness, offer peace soberly and ask the Lamb of God for mercy.'
  },
  {
    part: 'Communion Rite',
    whatHappens: 'Invitation and Holy Communion',
    howITakePart: 'Pray the act of humility, process reverently, receive if properly disposed and give thanks.'
  },
  {
    part: 'Concluding Rites',
    whatHappens: 'Blessing and dismissal',
    howITakePart: 'Receive the blessing and accept the mission to glorify God by your life.'
  }
];

export const APPENDIX_B_STEPS: StepByStepItem[] = [
  {
    step: 1,
    whatHappens: 'Prepare',
    whatIDo: 'Make a good Confession beforehand. Keep the Eucharistic fast. Pray and arrive in good time.'
  },
  {
    step: 2,
    whatHappens: 'Take part',
    whatIDo: 'Join the whole Mass with attention, responses, singing, silence and reverent posture.'
  },
  {
    step: 3,
    whatHappens: 'Adore',
    whatIDo: 'At the consecration and elevation, adore Jesus truly present in the Sacred Host and Precious Blood.'
  },
  {
    step: 4,
    whatHappens: 'Approach',
    whatIDo: 'Join the Communion procession calmly. Make the approved sign of reverence.'
  },
  {
    step: 5,
    whatHappens: 'Profess faith',
    whatIDo: 'When the minister says, "The Body of Christ," answer clearly, "Amen."'
  },
  {
    step: 6,
    whatHappens: 'Receive',
    whatIDo: 'Receive on the tongue or, where permitted, in the hand. Consume the Sacred Host immediately.'
  },
  {
    step: 7,
    whatHappens: 'Give thanks',
    whatIDo: 'Return quietly to your place. Adore, thank, offer and ask. Join the Prayer after Communion.'
  },
  {
    step: 8,
    whatHappens: 'Live the gift',
    whatIDo: 'Let friendship with Jesus shape your prayer, choices, service and love of neighbour.'
  }
];

export const APPENDIX_B_UNSURE_NOTE =
  'IF I AM UNSURE: I may remain in my place or approach with my arms crossed for a blessing if that is the parish practice. I should never receive merely because other people are receiving.';

export const APPENDIX_B_DIALOGUE = {
  minister: 'The Body of Christ.',
  childResponse: 'Amen.',
  childAction: 'Receives and consumes the Sacred Host immediately, then returns reverently to pray.'
};

export const APPENDIX_C_PRAYERS: PrayerItem[] = [
  {
    id: 'before-mass',
    title: 'Before Mass',
    category: 'before',
    prayer: 'Come, Holy Spirit. Open my mind to God\'s word, unite my heart to the offering of Jesus and prepare me to receive him with faith. Amen.'
  },
  {
    id: 'act-of-faith',
    title: 'Act of Faith',
    category: 'before',
    prayer: 'Lord Jesus Christ, I believe that you are truly, really and substantially present in the Blessed Sacrament: Body, Blood, Soul and Divinity.'
  },
  {
    id: 'act-of-adoration',
    title: 'Act of Adoration',
    category: 'before',
    prayer: 'My Lord and my God, I adore you with the angels and saints. You are my Creator, my Saviour and my King.'
  },
  {
    id: 'act-of-contrition',
    title: 'Act of Contrition',
    category: 'before',
    prayer: 'O my God, I am very sorry that I have sinned against you, and by the help of your grace I will not sin again. Amen.'
  },
  {
    id: 'act-of-humility',
    title: 'Act of Humility',
    category: 'before',
    prayer: 'Lord, I am not worthy that you should enter under my roof, but only say the word and my soul shall be healed.'
  },
  {
    id: 'act-of-desire',
    title: 'Act of Desire',
    category: 'before',
    prayer: 'Come, Lord Jesus. I long to receive you with faith and love. Take possession of my heart and make it entirely yours.'
  },
  {
    id: 'thanksgiving',
    title: 'Thanksgiving',
    category: 'after',
    prayer: 'Lord Jesus, I adore you and thank you for giving yourself to me. Keep me close to you and never let me be separated from you. Amen.'
  },
  {
    id: 'offering',
    title: 'Offering after Communion',
    category: 'after',
    prayer: 'Jesus, I offer you my body and soul, my thoughts and words, my work and play, my joys and sufferings. Use them for your glory.'
  },
  {
    id: 'petition',
    title: 'Petition after Communion',
    category: 'after',
    prayer: 'Merciful Jesus, bless my family, my parish, those who suffer and those who have asked for my prayers. Give us the grace to love you faithfully.'
  },
  {
    id: 'anima-christi',
    title: 'Anima Christi',
    category: 'after',
    prayer: 'Soul of Christ, sanctify me.\nBody of Christ, save me.\nBlood of Christ, inebriate me.\nWater from the side of Christ, wash me.\nPassion of Christ, strengthen me.\nO good Jesus, hear me.\nWithin your wounds hide me.\nPermit me not to be separated from you.\nFrom the wicked enemy defend me.\nAt the hour of my death call me,\nand bid me come to you,\nthat with your saints I may praise you\nfor ever and ever. Amen.'
  },
  {
    id: 'spiritual-communion',
    title: 'Spiritual Communion',
    category: 'spiritual',
    prayer: 'Lord Jesus, I believe that you are present in the Blessed Sacrament. Since I cannot receive you sacramentally now, come spiritually into my heart. Unite me to yourself and keep me faithful. Amen.',
    note: 'Spiritual Communion is a prayer of desire. It does not replace sacramental Communion or the Sunday obligation when a person is able to attend Mass.'
  }
];

export const APPENDIX_D_SUMMARY_CATECHISM: CatechismQA[] = [
  {
    id: 101,
    lessonId: 1,
    question: '1. Why did God make us?',
    answer: 'God made us to know him, love him and serve him in this life, and to be happy with him for ever in heaven.'
  },
  {
    id: 102,
    lessonId: 1,
    question: '2. What is sanctifying grace?',
    answer: 'Sanctifying grace is the gift that gives us a share in God\'s life and makes us his children.'
  },
  {
    id: 103,
    lessonId: 1,
    question: '3. What is the Holy Eucharist?',
    answer: 'The sacrament in which Jesus Christ is truly present, offered and received under the appearances of bread and wine.'
  },
  {
    id: 104,
    lessonId: 3,
    question: '4. When did Jesus institute the Eucharist?',
    answer: 'At the Last Supper, on the night before he died.'
  },
  {
    id: 105,
    lessonId: 3,
    question: '5. What did Jesus declare about the bread and wine?',
    answer: 'He declared the bread to be his Body and the wine to be his Blood.'
  },
  {
    id: 106,
    lessonId: 3,
    question: '6. Who can consecrate the Eucharist?',
    answer: 'A validly ordained bishop or priest.'
  },
  {
    id: 107,
    lessonId: 4,
    question: '7. Who is present in the Blessed Sacrament?',
    answer: 'Jesus Christ is truly, really and substantially present.'
  },
  {
    id: 108,
    lessonId: 4,
    question: '8. What of Christ is present?',
    answer: 'His Body, Blood, Soul and Divinity: the whole Christ.'
  },
  {
    id: 109,
    lessonId: 4,
    question: '9. Is the Eucharist merely a symbol?',
    answer: 'No. It is a sacramental sign in which Jesus himself is truly present.'
  },
  {
    id: 110,
    lessonId: 5,
    question: '10. What is transubstantiation?',
    answer: 'The change of the whole substance of bread and wine into the Body and Blood of Christ.'
  },
  {
    id: 111,
    lessonId: 5,
    question: '11. What remains after the consecration?',
    answer: 'The appearances of bread and wine remain.'
  },
  {
    id: 112,
    lessonId: 5,
    question: '12. How long does Christ remain present?',
    answer: 'As long as the Eucharistic appearances remain.'
  },
  {
    id: 113,
    lessonId: 5,
    question: '13. Is the whole Christ present under either species?',
    answer: 'Yes. The whole Christ is present under either species and in every part.'
  },
  {
    id: 114,
    lessonId: 6,
    question: '14. Why do we adore the Blessed Sacrament?',
    answer: 'Because Jesus Christ, true God and true man, is present.'
  },
  {
    id: 115,
    lessonId: 6,
    question: '15. Where is the Blessed Sacrament reserved?',
    answer: 'In the tabernacle.'
  },
  {
    id: 116,
    lessonId: 7,
    question: '16. What is the Mass?',
    answer: 'The sacrifice in which Christ makes present and offers sacramentally his one Sacrifice of the Cross.'
  },
  {
    id: 117,
    lessonId: 7,
    question: '17. Are Mass and Calvary one sacrifice?',
    answer: 'Yes. The victim and principal priest are the same; only the manner of offering differs.'
  },
  {
    id: 118,
    lessonId: 7,
    question: '18. Does Jesus die again at Mass?',
    answer: 'No. His one sacrifice is made present in an unbloody manner.'
  },
  {
    id: 119,
    lessonId: 7,
    question: '19. For what purposes is Mass offered?',
    answer: 'For adoration, thanksgiving, reparation and petition.'
  },
  {
    id: 120,
    lessonId: 8,
    question: '20. What are the two principal parts of Mass?',
    answer: 'The Liturgy of the Word and the Liturgy of the Eucharist.'
  },
  {
    id: 121,
    lessonId: 9,
    question: '21. How do the faithful participate?',
    answer: 'By faith, attention, prayer, responses, silence and offering themselves with Christ.'
  },
  {
    id: 122,
    lessonId: 10,
    question: '22. What must a child understand before First Communion?',
    answer: 'The child must distinguish the Body of Christ from ordinary food and receive with faith and devotion.'
  },
  {
    id: 123,
    lessonId: 10,
    question: '23. What must precede First Holy Communion?',
    answer: 'Proper preparation and sacramental Confession must precede it.'
  },
  {
    id: 124,
    lessonId: 10,
    question: '24. Who may receive Holy Communion worthily?',
    answer: 'A Catholic who is properly disposed and in the state of grace.'
  },
  {
    id: 125,
    lessonId: 10,
    question: '25. What must someone conscious of mortal sin do?',
    answer: 'Receive sacramental absolution before Holy Communion.'
  },
  {
    id: 126,
    lessonId: 10,
    question: '26. What is the Eucharistic fast?',
    answer: 'No food or drink for at least one hour before Communion, except water and medicine.'
  },
  {
    id: 127,
    lessonId: 11,
    question: '27. What does the minister say?',
    answer: 'The minister says, "The Body of Christ."'
  },
  {
    id: 128,
    lessonId: 11,
    question: '28. What does the communicant answer?',
    answer: 'The communicant answers, "Amen."'
  },
  {
    id: 129,
    lessonId: 12,
    question: '29. What is the chief fruit of Holy Communion?',
    answer: 'A closer union with Jesus Christ.'
  },
  {
    id: 130,
    lessonId: 12,
    question: '30. How should we live after Communion?',
    answer: 'In faithful worship, charity, frequent Confession, adoration and love of neighbour.'
  }
];

export const APPENDIX_E_READINESS: ReadinessItem[] = [
  {
    id: 'jesus-christ',
    area: 'Jesus Christ',
    whatReadinessLooksLike: 'The child knows that Jesus is the eternal Son of God made man, who died and rose for us.'
  },
  {
    id: 'real-presence',
    area: 'Real Presence',
    whatReadinessLooksLike: 'The child believes that the consecrated Eucharist is truly Jesus Christ, not ordinary bread or merely a symbol.'
  },
  {
    id: 'mass-sacrifice',
    area: 'Mass as sacrifice',
    whatReadinessLooksLike: 'The child understands simply that Mass makes present Christ\'s one Sacrifice of the Cross.'
  },
  {
    id: 'sacramental-disposition',
    area: 'Sacramental disposition',
    whatReadinessLooksLike: 'The child has made First Confession, understands the state of grace and knows to seek help when unsure.'
  },
  {
    id: 'eucharistic-fast',
    area: 'Eucharistic fast',
    whatReadinessLooksLike: 'The child can observe the one-hour fast with appropriate adult support.'
  },
  {
    id: 'practical-reception',
    area: 'Practical reception',
    whatReadinessLooksLike: 'The child can join the procession, make the approved sign of reverence, answer "Amen," receive and consume the host reverently.'
  },
  {
    id: 'prayer-thanksgiving',
    area: 'Prayer and thanksgiving',
    whatReadinessLooksLike: 'The child can take part in Mass and pray simply before and after Communion.'
  },
  {
    id: 'pastoral-judgement',
    area: 'Pastoral judgement',
    whatReadinessLooksLike: 'Parents, catechists and the parish priest have had a reasonable opportunity to support the child and make needed adaptations.'
  }
];

export const PASTORAL_PRINCIPLES = [
  {
    title: 'Faith before festivity',
    text: 'A child is preparing to receive Jesus Christ himself, not merely to take part in a family celebration.'
  },
  {
    title: 'Understanding according to capacity',
    text: 'A child need not use advanced theological language, but must distinguish the Body of Christ from ordinary food and receive with faith and devotion.'
  },
  {
    title: 'Confession first',
    text: 'Children who have reached the use of reason are to make sacramental Confession before First Holy Communion.'
  },
  {
    title: 'Reverence without fear',
    text: 'Worthy reception should be taught clearly without producing scrupulosity or making a child afraid of the merciful Lord.'
  },
  {
    title: 'Sunday worship',
    text: 'Preparation belongs within regular Sunday Mass, family prayer and the living practice of the parish.'
  }
];

export const HOW_TO_USE_BOOK = [
  'The twelve lessons should be arranged at a convenient time for parent and child or mentor and family.',
  'Each lesson presents one central truth, a short explanation, a question to talk about, five catechism questions and answers, a prayer and a practical action. Children should first answer in their own words and then learn the short formal answer.',
  'Practical directions for receiving Holy Communion must be rehearsed reverently and adapted to the approved practice of the parish. Parents should tell the parish priest well in advance about coeliac disease, swallowing difficulties, disability or another medical need; no one should improvise the Eucharistic elements or manner of reception.'
];

export const SOURCES_AND_REFERENCES = {
  scripture: 'Sacred Scripture. References are given throughout. Short quotations follow the English Standard Version - Catholic Edition.',
  ccc: 'Catechism of the Catholic Church. Nos. 1322-1419 on the Sacrament of the Eucharist, especially 1362-1381 on sacrifice and Real Presence and 1382-1405 on Communion and its fruits.',
  compendium: 'Compendium of the Catechism of the Catholic Church. Questions 271-294 on the Eucharist.',
  canonLaw: 'Code of Canon Law. Canons 897-923, especially 913-919 on children, disposition, Confession and the Eucharistic fast; canon 827 on catechetical publications.',
  girm: 'General Instruction of the Roman Missal. Current edition for England and Wales, especially nos. 28, 160-161 and 274.',
  deharbe: 'Joseph Deharbe, S.J.. A Full Catechism of the Catholic Religion, English translation by John Fander (London, 1863), especially pp. 259-277.',
  doctrinalStandard: 'Where local practice or terminology differs, the approved liturgical books, diocesan policy and the directions of the parish priest govern practical preparation. No text in this draft should be interpreted contrary to the Catechism of the Catholic Church or the competent ecclesiastical authority.'
};
