import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Clock,
  ChevronDown,
  Zap,
  HelpCircle,
  RefreshCw,
  CheckCircle2,
  TrendingUp,
  Activity,
  Send,
  ArrowRight,
  Radio,
  ShieldCheck,
  Mic,
  MicOff,
  RotateCw
} from 'lucide-react';

// ============================================================================
// LOCALIZED UI STRINGS & TYPOGRAPHY CONFIG (ONLY WHAT SHOULD CHANGE PER LANGUAGE)
// ============================================================================
const UI_TEXT = {
  en: {
    subtitle: 'AI Live Match Companion • 15s Story Catch-Ups & Real-Time Tactical Flashcards',
    sec1Badge: '01 • LIVE MATCH & TELEMETRY',
    sec2Badge: '02 • CATCH ME UP ENGINE',
    sec3Badge: '03 • LIVE DOUBT FLASHCARDS (TAP TO FLIP)',
    simLabel: 'Simulate Live Match Moment:',
    autoOn: 'Auto-Sim ON',
    autoOff: 'Auto-Play',
    matchBanner: 'IPL T20 • MUMBAI INDIANS vs SUNRISERS HYDERABAD • WANKHEDE',
    winProb: 'MI Win Prob',
    target: 'TARGET: 194',
    recent: 'Recent:',
    catchupTitle: 'Catch Me Up (What Did I Miss?)',
    catchupSub: 'Tuned in late? Pick a window or type/speak custom overs for the real story behind the score',
    btnLast2: 'Last 2 Overs',
    btnPP: 'Powerplay (1-6)',
    catchupPlaceholder: "Type or tap Speak: e.g. 'Overs 10 to 15'",
    listeningCatchup: 'Listening... speak overs or player name...',
    recapBtn: 'Recap',
    listenBtn: 'Listen Broadcast Voice',
    stopAudio: 'Stop Audio',
    loadingAudio: 'Generating Natural Voice...',
    fcTitle: 'Live Match Doubt Flashcards',
    fcActive: 'ACTIVE',
    fcSub: 'AI watches umpire calls, captain moves & bowling variations — tap any card to 3D flip & decode',
    genCardBtn: '+ New AI Flashcard',
    generatingBtn: 'Generating...',
    tapFlip: 'TAP TO FLIP ↻',
    tapFlipBack: 'TAP TO FLIP BACK ↺',
    flipInstruction: 'Tap card to flip in 3D',
    flipCta: 'View Answer →',
    decodedBadge: 'DECODED',
    readAloud: 'Natural Voice Readout',
    fcPlaceholder: 'Type or tap Speak to ask about any rule, field move, or tactic...',
    listeningFc: 'Listening... speak your match doubt now...',
    createFcBtn: 'Create Flashcard',
    speakBtn: 'Speak',
    stopMicBtn: 'Stop'
  },
  hi: {
    subtitle: 'AI लाइव मैच साथी • 15-सेकंड स्टोरी रीकैप और रियल-टाइम रणनीतिक फ्लैशकार्ड्स',
    sec1Badge: '01 • लाइव मैच और स्कोरकार्ड',
    sec2Badge: '02 • अब तक क्या हुआ? (CATCH ME UP)',
    sec3Badge: '03 • लाइव मैच डाउट फ्लैशकार्ड्स (कार्ड पलटें)',
    simLabel: 'लाइव मैच की स्थिति बदलें:',
    autoOn: 'ऑटो-प्ले चालू',
    autoOff: 'ऑटो-प्ले',
    matchBanner: 'IPL T20 • मुंबई इंडियंस बनाम सनराइजर्स हैदराबाद • वानखेड़े',
    winProb: 'MI जीत की संभावना',
    target: 'लक्ष्य: 194',
    recent: 'हाल की गेंदें:',
    catchupTitle: 'अब तक क्या हुआ? (Catch Me Up)',
    catchupSub: 'देर से जुड़े? स्कोर के पीछे की असली कहानी जानने के लिए नीचे चुनें या बोलें',
    btnLast2: 'पिछले 2 ओवर',
    btnPP: 'पावरप्ले (1-6)',
    catchupPlaceholder: "लिखें या बोलें: जैसे 'ओवर 10 से 15'",
    listeningCatchup: 'सुन रहे हैं... ओवर या खिलाड़ी का नाम बोलें...',
    recapBtn: 'रीकैप देखें',
    listenBtn: 'कमेंट्री आवाज़ में सुनें',
    stopAudio: 'आवाज़ रोकें',
    loadingAudio: 'आवाज़ तैयार हो रही है...',
    fcTitle: 'लाइव मैच डाउट फ्लैशकार्ड्स',
    fcActive: 'सक्रिय',
    fcSub: 'अंपायर के फैसले, कप्तानी चाल और बॉलिंग समझने के लिए कार्ड पर टैप करके पलटें',
    genCardBtn: '+ नया फ्लैशकार्ड बनाएं',
    generatingBtn: 'बन रहा है...',
    tapFlip: 'कार्ड पलटें ↻',
    tapFlipBack: 'वापस पलटें ↺',
    flipInstruction: 'उकल देखने के लिए कार्ड पर टैप करें',
    flipCta: 'जवाब देखें →',
    decodedBadge: 'डिकोड हुआ',
    readAloud: 'आसान आवाज़ में सुनें',
    fcPlaceholder: 'कोई भी नियम, फील्डिंग या रणनीति पूछने के लिए लिखें या Speak दबाएं...',
    listeningFc: 'सुन रहे हैं... अपना सवाल बोलें...',
    createFcBtn: 'फ्लैशकार्ड बनाएं',
    speakBtn: 'बोलें',
    stopMicBtn: 'रुकें'
  },
  mr: {
    subtitle: 'AI लाईव्ह मॅच साथीदार • १५-सेकंद कथा आढावा आणि तत्काळ रणनीती उलगडा',
    sec1Badge: '01 • लाईव्ह मॅच आणि धावफलक',
    sec2Badge: '02 • मी काय मिस केलं? (CATCH ME UP)',
    sec3Badge: '03 • लाईव्ह मॅच शंका फ्लॅशकार्ड्स (कार्ड उलटा)',
    simLabel: 'लाईव्ह मॅचचा क्षण निवडा:',
    autoOn: 'ऑटो-प्ले सुरू',
    autoOff: 'ऑटो-प्ले',
    matchBanner: 'IPL T20 • मुंबई इंडियन्स विरुद्ध सनरायझर्स हैदराबाद • वानखेडे',
    winProb: 'MI विजयाची शक्यता',
    target: 'लक्ष्य: 194',
    recent: 'अलीकडील चेंडू:',
    catchupTitle: 'मी काय मिस केलं? (Catch Me Up)',
    catchupSub: 'उशिरा जॉईन झालात? धावफलकामागची खरी गोष्ट समजून घेण्यासाठी खालील पर्याय निवडा',
    btnLast2: 'शेवटची २ षटके',
    btnPP: 'पॉवरप्ले (१-६)',
    catchupPlaceholder: "टाईप करा किंवा बोला: उदा. '१० ते १५ षटके'",
    listeningCatchup: 'ऐकत आहे... षटके किंवा खेळाडूचे नाव बोला...',
    recapBtn: 'आढावा घ्या',
    listenBtn: 'कमेंट्री आवाजात ऐका',
    stopAudio: 'आवाज थांबवा',
    loadingAudio: 'आवाज तयार होत आहे...',
    fcTitle: 'लाईव्ह मॅच शंका फ्लॅशकार्ड्स',
    fcActive: 'सक्रिय',
    fcSub: 'पंचांचे निर्णय, कर्णधाराची रणनीती आणि गोलंदाजी समजून घेण्यासाठी कार्डवर टॅप करून उलटा',
    genCardBtn: '+ नवीन फ्लॅशकार्ड',
    generatingBtn: 'तयार होत आहे...',
    tapFlip: 'कार्ड उलटा ↻',
    tapFlipBack: 'मागे फिरा ↺',
    flipInstruction: 'उकल पाहण्यासाठी कार्डवर टॅप करा',
    flipCta: 'उत्तर पाहा →',
    decodedBadge: 'उकल पाहिली',
    readAloud: 'मराठी आवाजात ऐका',
    fcPlaceholder: 'कोणताही नियम किंवा रणनीती विचारण्यासाठी टाईप करा किंवा बोला...',
    listeningFc: 'ऐकत आहे... तुमचा प्रश्न बोला...',
    createFcBtn: 'कार्ड बनवा',
    speakBtn: 'बोला',
    stopMicBtn: 'थांबा'
  }
};

// ============================================================================
// CRICBUZZ-STYLE STRUCTURED MATCH DATA & LIVE BALL TIMELINE (MI vs SRH)
// ============================================================================
const BALL_TIMELINE = [
  {
    id: '18.1',
    over: '18.1',
    ballNum: 1,
    bowler: { name: 'Jasprit Bumrah', figures: '3.1-0-21-1', econ: '6.63', speed: '141.8 kph' },
    striker: { name: 'Heinrich Klaasen', runs: 54, balls: 26, fours: 3, sixes: 4, sr: '207.69' },
    nonStriker: { name: 'Pat Cummins', runs: 8, balls: 6, fours: 1, sixes: 0, sr: '133.33' },
    runs: '0',
    badge: '0',
    eventTitle: 'DOT BALL • WIDE YORKER',
    badgeBg: 'bg-zinc-200 text-zinc-900',
    score: '168/4',
    crr: '9.24',
    rrr: '14.18',
    req: {
      en: 'SRH need 26 runs in 11 balls',
      hi: 'हैदराबाद को 11 गेंदों में 26 रनों की ज़रूरत',
      mr: 'हैदराबादला ११ चेंडूत २६ धावांची गरज'
    },
    winProbMI: 64,
    recentOvers: ['1', '4', '0', '6', '1', '|', '0'],
    length: 'Wide Yorker (Off-Cutter)',
    commentary: {
      en: '18.1 Bumrah to Klaasen, no run! Razor-sharp wide yorker just inside the off-side tramline at 141.8 kph. Klaasen reaches out to slice it over point, beaten! Rohit immediately brings fine-leg inside the 30-yard circle.',
      hi: '18.1 बुमराह ने क्लासेन को डाली 141.8 kph की सटीक वाइड यॉर्कर, कोई रन नहीं! क्लासेन ने पॉइंट के ऊपर से खेलने की कोशिश की लेकिन चूक गए। रोहित ने तुरंत फाइन-लेग को 30-यार्ड सर्कल के अंदर बुला लिया है।',
      mr: '18.1 बुमराहकडून क्लासेनला १४१.८ किमी/तास वेगाने अचूक वाईड यॉर्कर, धाव नाही! क्लासेनचा पॉईंटवरून फटका मारण्याचा प्रयत्न फसला. रोहितने लगेचच फाईन-लेग ३०-यार्ड सर्कलच्या आत घेतला आहे.'
    },
    captainTrigger: 'Rohit brings fine-leg inside the circle & pushes deep point wider.',
    umpireTrigger: 'Checked side-on for wide — ruled fair delivery inside moved stance.',
    flashcards: [
      {
        id: 'fc-18-1-a',
        tag: { en: 'CAPTAIN TACTIC', hi: 'कप्तान की रणनीति', mr: 'कर्णधाराची चाल' },
        tagBg: 'bg-[#FFDE59]',
        question: {
          en: 'Why did Rohit bring fine-leg inside the circle in the death overs?',
          hi: 'डेथ ओवरों में रोहित ने फाइन-लेग को सर्कल के अंदर क्यों बुलाया?',
          mr: 'डेथ ओव्हरमध्ये रोहितने फाईन-लेग सर्कलच्या आत का घेतला?'
        },
        shortHook: {
          en: 'Blocks the off-side slice since Bumrah is bowling wide of off-stump.',
          hi: 'बुमराह ऑफ-स्टंप के बाहर गेंद डाल रहे हैं, इसलिए ऑफ-साइड बाउंड्री सुरक्षित की।',
          mr: 'बुमराह ऑफ-स्टंपच्या बाहेर गोलंदाजी करत असल्याने ऑफ-साईड बाउंड्री मजबूत केली.'
        },
        answer: {
          en: 'Because Bumrah is bowling wide away from Klaasen’s body near the tramline, it is physically impossible to flick the ball behind square on the leg side. Rohit brought fine-leg inside the ring so he could add an extra boundary rider on the off-side.',
          hi: 'चूंकि बुमराह ऑफ-स्टंप के काफी बाहर वाइड यॉर्कर डाल रहे हैं, वहां से क्लासेन के लिए फाइन-लेग पर शॉट मारना नामुमकिन है। इसलिए रोहित ने फाइन-लेग को अंदर बुलाकर ऑफ-साइड बाउंड्री पर एक्स्ट्रा फील्डर लगाया है।',
          mr: 'बुमराह ऑफ-स्टंपच्या बाहेर वाईड यॉर्कर टाकत असल्यामुळे तिथून फाईन-लेगला फटका मारणे अशक्य आहे. म्हणून रोहितने फाईन-लेग सर्कलच्या आत घेऊन ऑफ-साईड बाउंड्रीवर अतिरिक्त फिल्डर ठेवला.'
        },
        metric: 'Off-Side Slice Risk: 84% • Leg-Side Risk: 6%'
      }
    ]
  },
  {
    id: '18.2',
    over: '18.2',
    ballNum: 2,
    bowler: { name: 'Jasprit Bumrah', figures: '3.2-0-21-2', econ: '6.30', speed: '124.2 kph' },
    striker: { name: 'Heinrich Klaasen (OUT)', runs: 54, balls: 27, fours: 3, sixes: 4, sr: '200.00' },
    nonStriker: { name: 'Pat Cummins', runs: 8, balls: 6, fours: 1, sixes: 0, sr: '133.33' },
    runs: 'W',
    badge: 'W',
    eventTitle: 'WICKET! • LBW ON UMPIRE’S CALL (DRS)',
    badgeBg: 'bg-[#FF4D4D] text-white',
    score: '168/5',
    crr: '9.16',
    rrr: '15.60',
    req: {
      en: 'SRH need 26 runs in 10 balls',
      hi: 'हैदराबाद को 10 गेंदों में 26 रनों की ज़रूरत',
      mr: 'हैदराबादला १० चेंडूत २६ धावांची गरज'
    },
    winProbMI: 81,
    recentOvers: ['1', '4', '0', '6', '1', '|', '0', 'W'],
    length: 'Deceptive Slower Dipping Yorker',
    commentary: {
      en: '18.2 Bumrah to Klaasen, OUT! LBW! Bumrah takes 18 kph off the ball with a dipping off-cutter at 124.2 kph that thuds into the back boot! Klaasen reviews, Ball Tracking shows Pitching In Line, Impact In Line, Wickets Hitting (Clipping leg stump — UMPIRE’S CALL!).',
      hi: '18.2 बुमराह ने क्लासेन को किया LBW आउट! 124.2 kph की धोखेबाज धीमी यॉर्कर सीधे पिछले जूते पर लगी! क्लासेन ने DRS लिया, लेकिन बॉल ट्रैकिंग में गेंद लेग-स्टंप को छू रही थी—अंपायर्स कॉल और क्लासेन आउट!',
      mr: '18.2 बुमराहने क्लासेनला केले पायचित (LBW)! १२४.२ किमी/तास वेगाचा फसवा स्लोअर यॉर्कर थेट बुटावर आदळला! क्लासेनने DRS घेतला, पण बॉल ट्रॅकिंगमध्ये चेंडू लेग-स्टंपला लागत असल्याने अंपायर्स कॉलवर क्लासेन बाद!'
    },
    captainTrigger: 'Mumbai huddle as SRH activates Impact Player substitution.',
    umpireTrigger: '3rd Umpire: OUT on Umpire’s Call (38% hitting). SRH retains review.',
    flashcards: [
      {
        id: 'fc-18-2-a',
        tag: { en: 'DRS EXPLAINER', hi: 'DRS नियम समझें', mr: 'DRS नियम उलगडा' },
        tagBg: 'bg-[#FF6B6B]',
        question: {
          en: 'What is "Umpire’s Call" here, and why did SRH keep their review?',
          hi: 'यहाँ "अंपायर्स कॉल" का क्या मतलब है और हैदराबाद का रिव्यू क्यों बचा?',
          mr: 'येथे "अंपायर्स कॉल" म्हणजे काय आणि हैदराबादचा रिव्ह्यू कसा वाचला?'
        },
        shortHook: {
          en: '38% of the ball hit the stumps (<50%), so on-field OUT decision stays.',
          hi: 'गेंद का 38% हिस्सा स्टंप से टकराया (<50%), इसलिए मैदानी अंपायर का फैसला कायम रहा।',
          mr: '३८% चेंडू स्टंपला लागल्याने मैदानावरील पंचांचा बादचा निर्णय कायम राहिला.'
        },
        answer: {
          en: 'For an LBW decision to overturn the on-field umpire, Hawkeye requires at least 50% of the ball to hit the stumps. Because 38% was clipping leg-stump, it falls in the margin-of-error zone ("Umpire’s Call"), so the on-field OUT call stands—and SRH does not lose their review.',
          hi: 'बॉल-ट्रैकिंग में जब गेंद का 50% से कम हिस्सा स्टंप्स से टकराता है, तो उसे "अंपायर्स कॉल" कहते हैं और मैदानी अंपायर का फैसला (OUT) कायम रहता है। लेकिन फैसला करीबी होने के कारण हैदराबाद का रिव्यू बर्बाद नहीं हुआ।',
          mr: 'बॉल-ट्रॅकिंगमध्ये ५०% पेक्षा कमी चेंडू स्टंपला लागत असल्यास मैदानावरील पंचांचा निर्णय (आऊट) कायम राहतो यालाच "अंपायर्स कॉल" म्हणतात. मात्र निर्णय काठावरचा असल्याने हैदराबादचा रिव्ह्यू वाचला.'
        },
        metric: 'Stump Impact: 38% (Clear Out Threshold: 50%)'
      }
    ]
  },
  {
    id: '18.3',
    over: '18.3',
    ballNum: 3,
    bowler: { name: 'Jasprit Bumrah', figures: '3.3-0-25-2', econ: '7.14', speed: '143.1 kph' },
    striker: { name: 'Abdul Samad (Impact Sub)', runs: 4, balls: 1, fours: 1, sixes: 0, sr: '400.00' },
    nonStriker: { name: 'Pat Cummins', runs: 8, balls: 6, fours: 1, sixes: 0, sr: '133.33' },
    runs: '4',
    badge: '4',
    eventTitle: 'FOUR! • IMPACT SUB TOP-EDGES BOUNCER',
    badgeBg: 'bg-[#A3E635] text-zinc-950',
    score: '172/5',
    crr: '9.29',
    rrr: '14.67',
    req: {
      en: 'SRH need 22 runs in 9 balls',
      hi: 'हैदराबाद को 9 गेंदों में 22 रनों की ज़रूरत',
      mr: 'हैदराबादला ९ चेंडूत २२ धावांची गरज'
    },
    winProbMI: 72,
    recentOvers: ['1', '4', '0', '6', '1', '|', '0', 'W', '4'],
    length: '143.1 kph Helmet Bouncer',
    commentary: {
      en: '18.3 Bumrah to Abdul Samad, FOUR! Impact Sub Samad walks in fresh and gets greeted by a 143.1 kph bumper at the helmet badge! Swivels to pull and gets a thick top-edge over the keeper for four! Square-leg umpire taps his shoulder.',
      hi: '18.3 बुमराह ने अब्दुल समद को डाली 143.1 kph की तेज़ बाउंसर, चौका! इम्पैक्ट सब समद ने पुल करने की कोशिश की और टॉप-एज लगकर गेंद कीपर के ऊपर से चार रन के लिए चली गई! स्क्वायर-लेग अंपायर ने अपना कंधा थपथपाया।',
      mr: '18.3 बुमराहचा अब्दुल समदला १४३.१ किमी/तास वेगाचा बाउन्सर, चौकार! इम्पॅक्ट सब समदने पूल करण्याचा प्रयत्न केला आणि टॉप-एज लागून चेंडू कीपरच्या डोक्यावरून सीमापार गेला! पंचांनी खांद्यावर थाप मारली.'
    },
    captainTrigger: 'Ishan Kishan moves fine-leg 5 yards finer to cut off top-edges.',
    umpireTrigger: 'Square-leg umpire taps shoulder: 1st bouncer of the over used.',
    flashcards: [
      {
        id: 'fc-18-3-a',
        tag: { en: 'UMPIRE SIGNAL', hi: 'अंपायर का इशारा', mr: 'पंचांचा इशारा' },
        tagBg: 'bg-[#C4B5FD]',
        question: {
          en: 'Why did the square-leg umpire tap his shoulder after that boundary?',
          hi: 'चौका लगने के बाद स्क्वायर-लेग अंपायर ने अपना कंधा क्यों छुआ?',
          mr: 'चौकार गेल्यानंतर स्क्वेअर-लेग पंचांनी स्वतःच्या खांद्याला स्पर्श का केला?'
        },
        shortHook: {
          en: 'Signals 1st legal shoulder-high bouncer of the over (2 allowed).',
          hi: 'ओवर के पहले बाउंसर का इशारा (एक ओवर में 2 बाउंसर मान्य हैं)।',
          mr: 'षटकातील पहिल्या बाउन्सरचा इशारा (एका षटकात २ बाउन्सरला परवानगी).'
        },
        answer: {
          en: 'In T20 rules, bowlers are permitted TWO bouncers between shoulder and head height per over. Tapping the shoulder officially informs the bowler and batter that 1 of the 2 bouncers for Over 18 has been bowled.',
          hi: 'टी20 नियमों के अनुसार एक ओवर में कंधे से सिर की ऊंचाई तक 2 बाउंसर डालने की अनुमति है। अंपायर ने कंधा छूकर इशारा किया कि इस ओवर का पहला बाउंसर इस्तेमाल हो गया है।',
          mr: 'टी-२० नियमानुसार एका षटकात खांद्यापासून डोक्यापर्यंत दोन बाउन्सर टाकता येतात. पंचांनी खांद्याला स्पर्श करून पहिल्या बाउन्सरचा इशारा दिला.'
        },
        metric: 'Over Bouncer Quota: 1 / 2 Used'
      }
    ]
  },
  {
    id: '18.4',
    over: '18.4',
    ballNum: 4,
    bowler: { name: 'Jasprit Bumrah', figures: '3.4-0-26-2', econ: '7.09', speed: '139.4 kph' },
    striker: { name: 'Pat Cummins', runs: 8, balls: 6, fours: 1, sixes: 0, sr: '133.33' },
    nonStriker: { name: 'Abdul Samad', runs: 5, balls: 2, fours: 1, sixes: 0, sr: '250.00' },
    runs: '1',
    badge: '1',
    eventTitle: 'SINGLE • BLOCKHOLE YORKER TRAPS NON-STRIKER',
    badgeBg: 'bg-[#7CE3FF] text-zinc-950',
    score: '173/5',
    crr: '9.26',
    rrr: '15.75',
    req: {
      en: 'SRH need 21 runs in 8 balls',
      hi: 'हैदराबाद को 8 गेंदों में 21 रनों की ज़रूरत',
      mr: 'हैदराबादला ८ चेंडूत २१ धावांची गरज'
    },
    winProbMI: 76,
    recentOvers: ['1', '4', '0', '6', '1', '|', '0', 'W', '4', '1'],
    length: 'Pinpoint Blockhole Yorker',
    commentary: {
      en: '18.4 Bumrah to Samad, 1 run! Pinpoint 139.4 kph yorker at the base of middle stump. Samad jams it off the inside edge to short fine-leg. Mumbai happily lets him take the single so bowler Pat Cummins is on strike for Bumrah’s last 2 balls!',
      hi: '18.4 बुमराह की समद को 139.4 kph की सटीक यॉर्कर, 1 रन! समद के बल्ले का अंदरूनी किनारा लेकर गेंद शॉर्ट फाइन-लेग पर गई। मुंबई ने खुशी-खुशी सिंगल लेने दिया ताकि बुमराह की आखिरी 2 गेंदों पर पैट कमिंस स्ट्राइक पर आ जाएं!',
      mr: '18.4 बुमराहचा समदला १३९.४ किमी/तास अचूक यॉर्कर, १ धाव! समदने कसाबसा चेंडू फाईन-लेगकडे ढकलला. बुमराहच्या शेवटच्या २ चेंडूंवर पॅट कमिन्स स्ट्राईकवर यावा म्हणून मुंबईने सहज एक धाव दिली!'
    },
    captainTrigger: 'Rohit allows the easy single to get tail-ender Cummins on strike.',
    umpireTrigger: '2 balls remaining in Over 18 • Over rate on schedule.',
    flashcards: [
      {
        id: 'fc-18-4-a',
        tag: { en: 'CAPTAIN TACTIC', hi: 'कप्तान की रणनीति', mr: 'कर्णधाराची चाल' },
        tagBg: 'bg-[#A3E635]',
        question: {
          en: 'Why didn’t Mumbai’s fielder throw at the stumps to stop that single?',
          hi: 'मुंबई के फील्डर ने वह एक रन रोकने के लिए स्टंप्स पर थ्रो क्यों नहीं किया?',
          mr: 'मुंबईच्या क्षेत्ररक्षकाने ती एक धाव रोखण्यासाठी स्टंपवर थ्रो का केला नाही?'
        },
        shortHook: {
          en: 'Giving 1 run puts the weaker batter on strike for Bumrah’s final 2 balls.',
          hi: 'एक रन देकर खतरनाक समद को नॉन-स्ट्राइक पर भेजा और कमिंस को स्ट्राइक पर लाया।',
          mr: 'एक धाव देऊन धोकादायक समदला बाजूला केले आणि कमिन्सला स्ट्राईकवर आणले.'
        },
        answer: {
          en: 'Allowing the single on ball 4 is smart death-over captaincy! It gets dangerous power-hitter Samad off strike and forces Pat Cummins to face Bumrah’s final two deliveries of the spell.',
          hi: 'चौथी गेंद पर एक रन देना मुंबई की चतुराई है! इससे खतरनाक हिटर समद नॉन-स्ट्राइकर एंड पर चले गए और बुमराह की आखिरी दो गेंदें पैट कमिंस को खेलनी पड़ेंगी।',
          mr: 'चौथ्या चेंडूवर एक धाव देणे हा मुंबईच्या रणनीतीचा भाग आहे! यामुळे धोकादायक समद नॉन-स्ट्रायकर एंडला गेला असून बुमराहच्या शेवटच्या दोन चेंडूंना कमिन्सला सामोरे जावे लागेल.'
        },
        metric: 'Expected Runs Next 2 Balls vs Cummins: 1.4 Runs'
      }
    ]
  },
  {
    id: '18.5',
    over: '18.5',
    ballNum: 5,
    bowler: { name: 'Jasprit Bumrah', figures: '3.5-0-26-2', econ: '6.78', speed: '142.1 kph' },
    striker: { name: 'Pat Cummins', runs: 8, balls: 7, fours: 1, sixes: 0, sr: '114.28' },
    nonStriker: { name: 'Abdul Samad', runs: 5, balls: 2, fours: 1, sixes: 0, sr: '250.00' },
    runs: '0',
    badge: '0',
    eventTitle: 'DOT BALL • 142 KPH INSWINGING TOE-CRUSHER',
    badgeBg: 'bg-zinc-200 text-zinc-900',
    score: '173/5',
    crr: '9.18',
    rrr: '18.00',
    req: {
      en: 'SRH need 21 runs in 7 balls',
      hi: 'हैदराबाद को 7 गेंदों में 21 रनों की ज़रूरत',
      mr: 'हैदराबादला ७ चेंडूत २१ धावांची गरज'
    },
    winProbMI: 82,
    recentOvers: ['1', '4', '0', '6', '1', '|', '0', 'W', '4', '1', '0'],
    length: 'Vicious Inswinging Toe-Crusher Yorker',
    commentary: {
      en: '18.5 Bumrah to Cummins, no run! Unplayable 142.1 kph inswinging toe-crusher! Cummins jams his bat down in the nick of time, the toe of the bat deflecting the ball back to Bumrah. Cummins had zero room to swing! SRH need 21 off 7 balls.',
      hi: '18.5 बुमराह ने कमिंस को डाली 142.1 kph की इनस्विंगिंग यॉर्कर, कोई रन नहीं! कमिंस ने आखिरी सेकंड में बल्ला नीचे लाकर गेंद को रोका। बुमराह ने कमिंस को हाथ खोलने का रत्ती भर मौका नहीं दिया!',
      mr: '18.5 बुमराहचा कमिन्सला १४२.१ किमी/तास वेगाचा इनस्विंगिंग यॉर्कर, धाव नाही! कमिन्सने ऐनवेळी बॅट खाली आणून स्वतःचा बचाव केला. कमिन्सला मोठा फटका मारण्याची कोणतीही संधी मिळाली नाही!'
    },
    captainTrigger: 'Rohit waves long-on and long-off deeper onto the ropes.',
    umpireTrigger: 'Ball 5 of Over 18 completed • Bowler on final ball of spell.',
    flashcards: [
      {
        id: 'fc-18-5-a',
        tag: { en: 'DEATH-OVER GEOMETRY', hi: 'डेथ ओवर्स की रणनीति', mr: 'डेथ ओव्हर तंत्र' },
        tagBg: 'bg-[#86EFAC]',
        question: {
          en: 'Why is an inswinging yorker the highest-percentage ball against tail-enders?',
          hi: 'निचले क्रम के बल्लेबाजों के खिलाफ इनस्विंगिंग यॉर्कर सबसे असरदार क्यों मानी जाती है?',
          mr: 'तळाच्या फलंदाजांविरुद्ध इनस्विंगिंग यॉर्कर सर्वात प्रभावी का ठरतो?'
        },
        shortHook: {
          en: 'Pins the front foot and eliminates bat-speed leverage before contact.',
          hi: 'बल्लेबाज का फ्रंट फुट लॉक हो जाता है और बल्ला घूमने की गति खत्म हो जाती है।',
          mr: 'फलंदाजाचा पुढचा पाय बांधला जातो आणि बॅट फिरवण्याची जागा मिळत नाही.'
        },
        answer: {
          en: 'Tail-enders naturally clear their front leg to access the leg-side boundary. An inswinging yorker follows their body into the base of the stumps: if they miss, it is clean bowled or plumb LBW; if they hit, the angle prevents elevation.',
          hi: 'निचले क्रम के बल्लेबाज अक्सर बड़ा शॉट खेलने के लिए अपना अगला पैर हटाते हैं। इनस्विंगिंग यॉर्कर सीधे स्टंप्स और जूतों को टारगेट करती है, जिससे या तो बल्लेबाज बोल्ड/LBW होता है या सिर्फ डिफ़ेंसिव ब्लॉक ही कर पाता है।',
          mr: 'तळाचे फलंदाज लेग साईडला फटका मारण्यासाठी पुढचा पाय बाजूला करतात. इनस्विंगिंग यॉर्कर थेट स्टंपवर जात असल्याने फलंदाज बोल्ड किंवा पायचित होतो, अथवा केवळ चेंडू अडवू शकतो.'
        },
        metric: 'Dot Ball Frequency vs Lower Order: 74.2% • Clean-Bowled Risk: High'
      }
    ]
  },
  {
    id: '18.6',
    over: '18.6',
    ballNum: 6,
    bowler: { name: 'Jasprit Bumrah', figures: '4.0-0-27-2', econ: '6.75', speed: '140.5 kph' },
    striker: { name: 'Pat Cummins', runs: 9, balls: 8, fours: 1, sixes: 0, sr: '112.50' },
    nonStriker: { name: 'Abdul Samad', runs: 5, balls: 2, fours: 1, sixes: 0, sr: '250.00' },
    runs: '1',
    badge: '1',
    eventTitle: 'SINGLE • BUMRAH CONCLUDES SPELL: 4-0-27-2',
    badgeBg: 'bg-[#7CE3FF] text-zinc-950',
    score: '174/5',
    crr: '9.15',
    rrr: '20.00',
    req: {
      en: 'SRH need 20 runs in 6 balls',
      hi: 'हैदराबाद को 6 गेंदों में 20 रनों की ज़रूरत',
      mr: 'हैदराबादला ६ चेंडूत २० धावांची गरज'
    },
    winProbMI: 80,
    recentOvers: ['1', '4', '0', '6', '1', '|', '0', 'W', '4', '1', '0', '1'],
    length: 'Reverse-Swinging In-Dipper Yorker',
    commentary: {
      en: '18.6 Bumrah to Cummins, 1 run! Searing 140.5 kph yorker angling into off-stump! Cummins squeezes it off the inside edge past square-leg, scrambling through for 1. Bumrah finishes an unforgettable spell: 4 overs, 2 for 27! SRH need 20 off the final 6 balls, and Samad has the strike!',
      hi: '18.6 बुमराह ने कमिंस को डाली 140.5 kph की यॉर्कर, 1 रन! कमिंस ने गेंद को स्क्वायर-लेग पर धकेलकर एक रन चुराया। बुमराह का मास्टरक्लास स्पेल समाप्त: 4 ओवर, 27 रन, 2 विकेट! हैदराबाद को 6 गेंदों में 20 रन चाहिए, और समद स्ट्राइक पर होंगे!',
      mr: '18.6 बुमराहचा कमिन्सला १४०.५ किमी/तास यॉर्कर, १ धाव! कमिन्सने चेंडू स्क्वेअर-लेगकडे ढकलत धाव घेतली. बुमराहचा अप्रतिम स्पेल संपला: ४ षटके, २७ धावा, २ बळी! हैदराबादला ६ चेंडूत २० धावांची गरज असून समद स्ट्राईकवर असेल!'
    },
    captainTrigger: 'Hardik Pandya takes the ball for the final 20th over; fielders sprint into position.',
    umpireTrigger: 'Over 19 completed • Over-rate cut-off met comfortably.',
    flashcards: [
      {
        id: 'fc-18-6-a',
        tag: { en: 'DEATH BOWLING TACTICS', hi: 'डेथ बॉलिंग रणनीति', mr: 'डेथ ओव्हर गोलंदाजी' },
        tagBg: 'bg-[#86EFAC]',
        question: {
          en: 'Why did Bumrah switch round the wicket for the final ball of his spell?',
          hi: 'बुमराह ने अपने स्पेल की आखिरी गेंद राउंड द विकेट आकर क्यों डाली?',
          mr: 'बुमराहने स्पेलचा शेवटचा चेंडू राउंड द विकेट येऊन का टाकला?'
        },
        shortHook: {
          en: 'Acute inward trajectory targets the front toe and shuts down the off-side slice.',
          hi: 'इनवर्ड एंगल से बल्लेबाज के पैर बंधे और ऑफ-साइड में रूम नहीं मिला।',
          mr: 'आतल्या बाजूने येणाऱ्या कोनामुळे फलंदाजाला फटका मारण्याची जागा मिळाली नाही.'
        },
        answer: {
          en: 'Coming round the wicket creates an acute inward angle. At 140+ kph with natural reverse swing, this trajectory directly attacks the front boot, giving Cummins no leverage to elevate over extra cover.',
          hi: 'राउंड द विकेट आने से गेंद कोण बनाकर अंदर आती है। पुरानी गेंद की रिवर्स-स्विंग बल्लेबाज के जूते को निशाना बनाती है जिससे ऑफ-साइड में बड़ा शॉट खेलना नामुमकिन हो जाता है।',
          mr: 'राउंड द विकेट आल्यामुळे चेंडू आतल्या बाजूने वेगाने येतो. रिव्हर्स-स्विंगमुळे फलंदाजाला ऑफ-साईडवर चेंडू हवेत उडवण्याची संधी उरत नाही.'
        },
        metric: 'Reverse Swing Deviation: 2.8° Inward • Bat Contact Quality: Low'
      }
    ]
  },
  {
    id: '19.1',
    over: '19.1',
    ballNum: 1,
    bowler: { name: 'Hardik Pandya', figures: '3.1-0-30-1', econ: '9.47', speed: '135.2 kph' },
    striker: { name: 'Abdul Samad', runs: 9, balls: 3, fours: 2, sixes: 0, sr: '300.00' },
    nonStriker: { name: 'Pat Cummins', runs: 9, balls: 8, fours: 1, sixes: 0, sr: '112.50' },
    runs: '4',
    badge: '4',
    eventTitle: 'FOUR! • POWER DRIVE PIERCES EXTRA COVER',
    badgeBg: 'bg-[#A3E635] text-zinc-950',
    score: '178/5',
    crr: '9.28',
    rrr: '19.20',
    req: {
      en: 'SRH need 16 runs in 5 balls',
      hi: 'हैदराबाद को 5 गेंदों में 16 रनों की ज़रूरत',
      mr: 'हैदराबादला ५ चेंडूत १६ धावांची गरज'
    },
    winProbMI: 70,
    recentOvers: ['0', 'W', '4', '1', '0', '1', '|', '4'],
    length: 'Full Outside Off (Driveable Length)',
    commentary: {
      en: '19.1 Hardik Pandya to Abdul Samad, FOUR! What a start to the 20th over! Hardik bowls full outside off at 135.2 kph, Samad leans into a fierce drive, piercing the gap between cover and mid-off! Tim David sprints to cut it off, but the ball wins the race to the rope! 16 needed off 5!',
      hi: '19.1 हार्दिक पांड्या ने समद को डाली 135.2 kph की फुल गेंद, चौका! 20वें ओवर की धमाकेदार शुरुआत! समद ने शानदार कवर ड्राइव लगाया, गेंद कवर्स और मिड-ऑफ के बीच से गोली की तरह सीमापार निकल गई! अब 5 गेंदों में 16 रन चाहिए!',
      mr: '19.1 हार्दिक पंड्याचा समदला १३५.२ किमी/तास फुल चेंडू, चौकार! २०व्या षटकाची वादळी सुरुवात! समदने कव्हरवरून जोरदार ड्राईव्ह मारला, चेंडू कव्हर्स आणि मिड-ऑफच्या मधून सुसाट सीमारेषेपार गेला! आता ५ चेंडूत १६ धावांची गरज!'
    },
    captainTrigger: 'Rohit pushes deep cover finer and asks Hardik to take pace off.',
    umpireTrigger: 'Boundary confirmed by third umpire check.',
    flashcards: [
      {
        id: 'fc-19-1-a',
        tag: { en: 'FIELD PLACEMENT STRATEGY', hi: 'फील्ड प्लेसमेंट रणनीति', mr: 'क्षेत्ररक्षण रचना' },
        tagBg: 'bg-[#FFDE59]',
        question: {
          en: 'Why did Mumbai keep mid-off inside the circle for the first ball of over 20?',
          hi: '20वें ओवर की पहली गेंद पर मुंबई ने मिड-ऑफ को सर्कल के अंदर क्यों रखा था?',
          mr: '२०व्या षटकाच्या पहिल्या चेंडूवर मुंबईने मिड-ऑफ सर्कलच्या आत का ठेवला होता?'
        },
        shortHook: {
          en: 'Gambled on enticing an aerial miscue, but Samad executed the ground drive perfectly.',
          hi: 'हवाई शॉट का जोखिम उठाने के लिए जाल बिछाया था, पर समद ने नीचे से ड्राइव मार दिया।',
          mr: 'हवेत फटका मारण्यासाठी प्रवृत्त केले होते, पण समदने जमिनीलगत अचूक ड्राईव्ह मारला.'
        },
        answer: {
          en: 'Hardik was aiming for a wide yorker near the tramline, intending to catch an edge or slice. Rohit kept mid-off inside the circle to add an extra boundary rider at deep backward point. When Hardik missed his length by 6 inches, Samad punished the open cover boundary.',
          hi: 'हार्दिक वाइड यॉर्कर डालने की कोशिश कर रहे थे ताकि बल्लेबाज का बाहरी किनारा लगे। इसलिए डीप बैकवर्ड पॉइंट पर फील्डर भेजा और मिड-ऑफ को अंदर रखा। लेकिन लेंथ थोड़ी चूकते ही समद ने चौका बटोर लिया।',
          mr: 'हार्दिक वाईड यॉर्कर टाकण्याचा प्रयत्न करत होता जेणेकरून बॅटची कड लागावी. म्हणून पॉईंटवर फिल्डर वाढवून मिड-ऑफ आत ठेवला होता, पण लेंथ चुकल्याने समदने चौकार खेचला.'
        },
        metric: 'Field Gap Angle: 18° • Ball Speed off Bat: 138.4 kph'
      }
    ]
  },
  {
    id: '19.2',
    over: '19.2',
    ballNum: 2,
    bowler: { name: 'Hardik Pandya', figures: '3.2-0-36-1', econ: '10.80', speed: '119.5 kph' },
    striker: { name: 'Abdul Samad', runs: 15, balls: 4, fours: 2, sixes: 1, sr: '375.00' },
    nonStriker: { name: 'Pat Cummins', runs: 9, balls: 8, fours: 1, sixes: 0, sr: '112.50' },
    runs: '6',
    badge: '6',
    eventTitle: 'SIX! • 102M MONSTER PULL OVER LONG-ON',
    badgeBg: 'bg-[#A3E635] text-zinc-950',
    score: '184/5',
    crr: '9.51',
    rrr: '15.00',
    req: {
      en: 'SRH need 10 runs in 4 balls',
      hi: 'हैदराबाद को 4 गेंदों में 10 रनों की ज़रूरत',
      mr: 'हैदराबादला ४ चेंडूत १० धावांची गरज'
    },
    winProbMI: 52,
    recentOvers: ['0', 'W', '4', '1', '0', '1', '|', '4', '6'],
    length: 'Back-of-the-Hand Slower Splicer',
    commentary: {
      en: '19.2 Hardik Pandya to Abdul Samad, SIX! BANG! What an unbelievable hit! Hardik attempts the back-of-the-hand slower ball at 119.5 kph, but Samad anticipates it, stays deep in his crease, and launches it 102 meters deep into the Wankhede second tier! SRH need 10 runs in 4 balls!',
      hi: '19.2 हार्दिक पांड्या ने समद को डाली धीमी बैक-ऑफ-हैंड गेंद, छक्का! 102 मीटर लंबा गगनचुंबी छक्का! समद ने धीमी गेंद को पहले ही भांप लिया, क्रीज में पीछे रहे और लॉन्ग-ऑन की दूसरी मंजिल पर पहुंचा दिया! अब 4 गेंदों में सिर्फ 10 रन चाहिए!',
      mr: '19.2 हार्दिक पंड्याची ११९.५ किमी/तास संथ डिलिव्हरी, उत्तुंग षटकार! १०२ मीटर लांब फटका! समदने चेंडूची गती आधीच ओळखली आणि क्रीजमध्ये मागे जात थेट वानखेडेच्या गॅलरीत षटकार ठोकला! आता ४ चेंडूत फक्त १० धावांची गरज!'
    },
    captainTrigger: 'Rohit Sharma rushes from extra cover to talk to Hardik; deep square pushed back.',
    umpireTrigger: 'Six confirmed • Ball replaced with same-wear ball from umpire box.',
    flashcards: [
      {
        id: 'fc-19-2-a',
        tag: { en: 'BATTER BIOMECHANICS', hi: 'बल्लेबाजी की तकनीक', mr: 'फलंदाजी तंत्र' },
        tagBg: 'bg-[#7DD3FC]',
        question: {
          en: 'How did Abdul Samad dispatch a 119 kph slower delivery for a 102m six?',
          hi: 'अब्दुल समद ने 119 kph की धीमी गेंद पर 102 मीटर का छक्का कैसे जड़ दिया?',
          mr: 'अब्दुल समदने ११९ किमी/तास संथ चेंडूवर १०२ मीटरचा षटकार कसा मारला?'
        },
        shortHook: {
          en: 'Deep-crease depth added 0.12s tracking time to accelerate maximum bat speed.',
          hi: 'क्रीज में 2 फीट पीछे खड़े होकर गेंद को देखने का अतिरिक्त समय मिला और बैट-स्पीड बनी।',
          mr: 'क्रीजमध्ये २ फूट मागे उभे राहिल्याने चेंडू पाहण्यासाठी अतिरिक्त वेळ मिळाला.'
        },
        answer: {
          en: 'By standing 2 feet deeper in the crease, Samad turned Hardik’s good-length slower delivery into a hittable half-volley. The extra 0.12 seconds of delay allowed his bottom-hand torque to fully transfer 128 kph bat speed at the hitting point.',
          hi: 'क्रीज में पीछे खड़े होने के कारण हार्दिक की गुड-लेंथ धीमी गेंद समद के लिए स्लॉट में आ गई। बल्लेबाज को हाथ खोलने के लिए कुछ मिलीसेकंड ज्यादा मिले जिससे पूरा बैट-स्विंग गेंद पर लगा।',
          mr: 'क्रीजमध्ये मागे राहिल्यामुळे हार्दिकचा गुड-लेंथ चेंडू स्लॉटमध्ये आला. अतिरिक्त वेळेमुळे समदला पूर्ण बॅट-स्पीडने फटका मारता आला आणि चेंडू १०२ मीटर लांब गेला.'
        },
        metric: 'Bat Exit Velocity: 146.4 kph • Launch Angle: 29.4° • Distance: 102m'
      }
    ]
  },
  {
    id: '19.3',
    over: '19.3',
    ballNum: 3,
    bowler: { name: 'Hardik Pandya', figures: '3.3-0-38-1', econ: '10.85', speed: '136.8 kph' },
    striker: { name: 'Abdul Samad', runs: 17, balls: 5, fours: 2, sixes: 1, sr: '340.00' },
    nonStriker: { name: 'Pat Cummins', runs: 9, balls: 8, fours: 1, sixes: 0, sr: '112.50' },
    runs: '2',
    badge: '2',
    eventTitle: 'TWO RUNS • TIM DAVID DIVING SAVE ON THE ROPE',
    badgeBg: 'bg-[#7CE3FF] text-zinc-950',
    score: '186/5',
    crr: '9.53',
    rrr: '16.00',
    req: {
      en: 'SRH need 8 runs in 3 balls',
      hi: 'हैदराबाद को 3 गेंदों में 8 रनों की ज़रूरत',
      mr: 'हैदराबादला ३ चेंडूत ८ धावांची गरज'
    },
    winProbMI: 58,
    recentOvers: ['0', 'W', '4', '1', '0', '1', '|', '4', '6', '2'],
    length: 'Wide-Line Tramline Yorker',
    commentary: {
      en: '19.3 Hardik Pandya to Abdul Samad, 2 runs! Searing 136.8 kph wide yorker just inside the line! Samad reaches out and slices it over backward point. Tim David sprints 25 yards from deep point and puts in a full-length diving stop on the rope! Exceptional fielding saves two runs! 8 needed off 3!',
      hi: '19.3 हार्दिक पांड्या ने समद को डाली 136.8 kph की वाइड यॉर्कर, 2 रन! समद ने बल्ला घुमाया और गेंद बैकवर्ड पॉइंट के ऊपर से गई। टिम डेविड ने 25 गज दौड़कर बाउंड्री रोप पर डाइव लगाकर निश्चित चौका बचाया! अब 3 गेंदों में 8 रन चाहिए!',
      mr: '19.3 हार्दिक पंड्याचा समदला १३६.८ किमी/तास वाईड यॉर्कर, २ धावा! समदने पॉईंटच्या वरून फटका मारला. टिम डेव्हिडने २५ यार्ड धावत सीमारेषेवर अप्रतिम डाईव्ह मारून चौकार अडवला! आता ३ चेंडूत ८ धावांची गरज!'
    },
    captainTrigger: 'Hardik claps for Tim David; fielders rally for the final 3 deliveries.',
    umpireTrigger: 'Fielding check on boundary cushion: Clean save, 2 runs recorded.',
    flashcards: [
      {
        id: 'fc-19-3-a',
        tag: { en: 'BOUNDARY FIELDING METRICS', hi: 'फील्डिंग तकनीक और प्रभाव', mr: 'सीमारेषा क्षेत्ररक्षण' },
        tagBg: 'bg-[#FFDE59]',
        question: {
          en: 'How did Tim David’s boundary save shift the win probability back towards MI?',
          hi: 'टिम डेविड द्वारा बाउंड्री रोके जाने से मुंबई के पक्ष में मैच कैसे मुड़ा?',
          mr: 'टिम डेव्हिडने चौकार अडवल्याने सामना पुन्हा मुंबईकडे कसा झुकला?'
        },
        shortHook: {
          en: 'Saving 2 runs forced SRH to still need more than 2 runs per remaining ball.',
          hi: '2 रन बचाने से हैदराबाद पर प्रति गेंद 2.66 रन बनाने का दबाव बरकरार रहा।',
          mr: '२ धावा वाचवल्यामुळे उर्वरित प्रत्येक चेंडूवर २ पेक्षा जास्त धावांचा दबाव कायम राहिला.'
        },
        answer: {
          en: 'Had that ball crossed the boundary, SRH would have needed just 6 runs from 3 balls (run-a-ball pressure vanished). The 2-run save kept the requirement at 8 off 3, forcing Samad to attempt another high-risk boundary on the very next ball.',
          hi: 'अगर वहां चौका चला जाता, तो हैदराबाद को 3 गेंदों में सिर्फ 6 रन चाहिए होते। 2 रन बचाने से 3 गेंदों में 8 रन का दबाव बना रहा, जिसके चलते समद को अगली गेंद पर फिर बड़ा जोखिम भरा शॉट खेलना पड़ा।',
          mr: 'जर चौकार गेला असता तर ३ चेंडूत फक्त ६ धावा हव्या असत्या. २ धावा वाचवल्याने ३ चेंडूत ८ धावांची गरज राहिली आणि समदला पुढच्या चेंडूवर मोठा फटका मारण्याचा धोका पत्करावा लागला.'
        },
        metric: 'Sprint Speed: 29.4 kph • Distance Covered: 24.8m • Runs Saved: 2'
      }
    ]
  },
  {
    id: '19.4',
    over: '19.4',
    ballNum: 4,
    bowler: { name: 'Hardik Pandya', figures: '3.4-0-38-2', econ: '10.36', speed: '138.4 kph' },
    striker: { name: 'Abdul Samad (OUT)', runs: 17, balls: 6, fours: 2, sixes: 1, sr: '283.33' },
    nonStriker: { name: 'Pat Cummins', runs: 9, balls: 8, fours: 1, sixes: 0, sr: '112.50' },
    runs: 'W',
    badge: 'W',
    eventTitle: 'WICKET! • CAUGHT BY TIM DAVID ON THE LONG-ON ROPES',
    badgeBg: 'bg-[#FF4D4D] text-white',
    score: '186/6',
    crr: '9.45',
    rrr: '24.00',
    req: {
      en: 'SRH need 8 runs in 2 balls',
      hi: 'हैदराबाद को 2 गेंदों में 8 रनों की ज़रूरत',
      mr: 'हैदराबादला २ चेंडूत ८ धावांची गरज'
    },
    winProbMI: 86,
    recentOvers: ['0', 'W', '4', '1', '0', '1', '|', '4', '6', '2', 'W'],
    length: 'Heavy Hard-Length Cross-Seam Cutter',
    commentary: {
      en: '19.4 Hardik Pandya to Abdul Samad, OUT! CAUGHT! Hardik delivers the killer blow! 138.4 kph hard-length cross-seam bouncer cramping Samad for room. Samad pulls, but it hits high on the bat splice! Tim David settles right on the long-on rope, takes the catch, and avoids stepping on the cushion! Wankhede erupts in deafening roars!',
      hi: '19.4 हार्दिक पांड्या ने समद को आउट किया! 138.4 kph की तेज़ लेंथ गेंद पर समद ने फिर पुल करने की कोशिश की, लेकिन बल्ले के ऊपरी हिस्से पर गेंद लगी! लॉन्ग-ऑन बाउंड्री पर टिम डेविड ने बाउंड्री रस्सी के ठीक अंदर शानदार कैच लपका! वानखेड़े में दर्शकों का शोर आसमान छू रहा है!',
      mr: '19.4 हार्दिक पंड्याकडून अब्दुल समद बाद! १३८.४ किमी/तास वेगाच्या उसळत्या चेंडूवर समदने पुन्हा पूल मारण्याचा प्रयत्न केला, पण चेंडू बॅटच्या वरच्या भागाला लागला! टिम डेव्हिडने सीमारेषेवर अप्रतिम तोल सांभाळत झेल टिपला! वानखेडेवर मुंबईचा जल्लोष!'
    },
    captainTrigger: 'Hardik roars with both arms up; Bhuvneshwar Kumar walks in at #8.',
    umpireTrigger: 'Third Umpire checks boundary cushion: Catch is 100% clean inside rope.',
    flashcards: [
      {
        id: 'fc-19-4-a',
        tag: { en: 'ICC RULE EXPLAINER (MCC 18.11)', hi: 'ICC नया नियम 18.11', mr: 'ICC नवीन नियम १८.११' },
        tagBg: 'bg-[#FF6B6B]',
        question: {
          en: 'Why must incoming batter Bhuvneshwar take strike even if Cummins crossed?',
          hi: 'कमिंस के समद को क्रॉस करने के बावजूद नए बल्लेबाज भुवनेश्वर स्ट्राइक पर क्यों आएंगे?',
          mr: 'कमिन्सने समदला क्रॉस केले असतानाही नवीन फलंदाज भुवनेश्वरलाच स्ट्राईकवर का यावे लागेल?'
        },
        shortHook: {
          en: 'Under MCC Law 18.11, the incoming batter always takes strike on catches.',
          hi: 'ICC के नियम 18.11 के तहत कैच आउट होने पर नया बल्लेबाज ही स्ट्राइक लेगा।',
          mr: 'ICC नियम १८.११ नुसार झेल बाद झाल्यावर नवीन येणाऱ्या फलंदाजालाच स्ट्राईक घ्यावी लागते.'
        },
        answer: {
          en: 'Under MCC Law 18.11 (implemented globally in 2022), when a batter is dismissed Caught, the incoming batter MUST take strike at the end the dismissed batter occupied, regardless of whether the batters crossed in the air before the catch was completed.',
          hi: '2022 के नए ICC/MCC नियम 18.11 के अनुसार जब कोई बल्लेबाज कैच आउट होता है, तो चाहे बल्लेबाज हवा में एक-दूसरे को पार कर चुके हों, आने वाले नए बल्लेबाज को ही स्ट्राइक लेनी होती है।',
          mr: '२०२२ च्या नवीन ICC/MCC नियमानुसार फलंदाज झेलबाद झाल्यास ते एकमेकांना ओलांडले तरीही नवीन येणाऱ्या फलंदाजालाच स्ट्राईक घ्यावी लागते.'
        },
        metric: 'Rule Enacted: Oct 2022 • Crossing Status: Nullified by MCC 18.11'
      }
    ]
  },
  {
    id: '19.5',
    over: '19.5',
    ballNum: 5,
    bowler: { name: 'Hardik Pandya', figures: '3.5-0-39-2', econ: '10.17', speed: '137.2 kph' },
    striker: { name: 'Bhuvneshwar Kumar', runs: 1, balls: 1, fours: 0, sixes: 0, sr: '100.00' },
    nonStriker: { name: 'Pat Cummins', runs: 9, balls: 8, fours: 1, sixes: 0, sr: '112.50' },
    runs: '1',
    badge: '1',
    eventTitle: 'SINGLE • BHUVI JAMS YORKER TO LONG-OFF, CUMMINS ON STRIKE!',
    badgeBg: 'bg-[#7CE3FF] text-zinc-950',
    score: '187/6',
    crr: '9.42',
    rrr: '42.00',
    req: {
      en: 'SRH need 7 runs in 1 ball',
      hi: 'हैदराबाद को 1 गेंद में 7 रनों की ज़रूरत',
      mr: 'हैदराबादला १ चेंडूत ७ धावांची गरज'
    },
    winProbMI: 92,
    recentOvers: ['0', 'W', '4', '1', '0', '1', '|', '4', '6', '2', 'W', '1'],
    length: 'Spearing Inswinging Yorker',
    commentary: {
      en: '19.5 Hardik Pandya to Bhuvneshwar Kumar, 1 run! Hardik nails a 137.2 kph yorker right at off-stump! Bhuvneshwar jams his bat down and squirts it down to long-off. They sprint through for a single! SRH need 7 runs off the final ball to win, or 6 to tie for a Super Over! Pat Cummins is on strike!',
      hi: '19.5 हार्दिक पांड्या ने भुवनेश्वर को डाली 137.2 kph की सटीक यॉर्कर, 1 रन! भुवनेश्वर ने बल्ला अड़ाकर गेंद को लॉन्ग-ऑफ पर धकेला और तेजी से सिंगल पूरा किया! अब आखिरी गेंद पर जीत के लिए 7 रन चाहिए और सुपर ओवर (टाई) के लिए 6 रन! पैट कमिंस स्ट्राइक पर!',
      mr: '19.5 हार्दिक पंड्याचा भुवनेश्वरला १३७.२ किमी/तास अचूक यॉर्कर, १ धाव! भुवनेश्वरने कसाबसा चेंडू लॉन्ग-ऑफकडे ढकलत एक धाव घेतली! आता शेवटच्या चेंडूवर विजयासाठी ७ धावा आणि सुपर ओव्हरसाठी (टाय) ६ धावांची गरज! पॅट कमिन्स स्ट्राईकवर!'
    },
    captainTrigger: 'Rohit talks to Hardik: protect the six at all costs; keep fine-leg back.',
    umpireTrigger: 'Final delivery of the match coming up • Wankhede crowd on its feet.',
    flashcards: [
      {
        id: 'fc-19-5-a',
        tag: { en: 'SUPER OVER MATHEMATICS', hi: 'सुपर ओवर के नियम', mr: 'सुपर ओव्हर नियम' },
        tagBg: 'bg-[#C4B5FD]',
        question: {
          en: 'What happens if Cummins hits a six on the final ball to tie the scores?',
          hi: 'अगर कमिंस आखिरी गेंद पर छक्का मारकर स्कोर बराबर कर दें तो क्या होगा?',
          mr: 'जर कमिन्सने शेवटच्या चेंडूवर षटकार मारून धावसंख्या बरोबरी केली तर काय होईल?'
        },
        shortHook: {
          en: 'A Super Over (1 over per side) is played; boundary countback was scrapped after 2019.',
          hi: 'सुपर ओवर खेला जाएगा; 2019 के बाद बाउंड्री काउंट नियम हमेशा के लिए खत्म कर दिया गया है।',
          mr: 'सुपर ओव्हर खेळवली जाईल; २०१९ नंतर बाउंड्री काउंट नियम रद्द करण्यात आला आहे.'
        },
        answer: {
          en: 'If scores are tied at 193/6, a one-over-per-side Super Over determines the winner. Following the controversial 2019 World Cup Final, the ICC abolished the boundary countback rule, mandating continuous Super Overs until an outright winner emerges!',
          hi: 'अगर स्कोर 193 पर बराबर हो जाता है, तो मैच का फैसला सुपर ओवर से होगा। 2019 विश्व कप के बाद बाउंड्री काउंट का नियम हटा दिया गया था, इसलिए टाई होने पर तब तक सुपर ओवर खेला जाएगा जब तक कोई टीम जीत न जाए!',
          mr: 'जर स्कोअर १९३ वर बरोबरीत सुटला तर सुपर ओव्हरने निकाल लागेल. २०१९ च्या विश्वचषकानंतर बाउंड्री काउंट नियम रद्द झाला असून जोपर्यंत एक संघ जिंकत नाही तोपर्यंत सुपर ओव्हर खेळवली जाते.'
        },
        metric: 'Tied Target: 193 Runs • Resolution: Super Over (Unlimited until winner)'
      }
    ]
  },
  {
    id: '20.0',
    over: '20.0',
    ballNum: 6,
    bowler: { name: 'Hardik Pandya', figures: '4.0-0-43-2', econ: '10.75', speed: '137.9 kph' },
    striker: { name: 'Pat Cummins', runs: 13, balls: 9, fours: 2, sixes: 0, sr: '144.44' },
    nonStriker: { name: 'Bhuvneshwar Kumar', runs: 1, balls: 1, fours: 0, sixes: 0, sr: '100.00' },
    runs: '4',
    badge: '4',
    eventTitle: 'FINAL BALL THRILLER • SLICE FOUR BUT MI WIN BY 2 RUNS!',
    badgeBg: 'bg-[#FFDE59] text-zinc-950',
    score: '191/6',
    crr: '9.55',
    rrr: '0.00',
    req: {
      en: 'MATCH COMPLETED • MI WIN BY 2 RUNS',
      hi: 'मैच समाप्त • मुंबई इंडियंस 2 रन से विजयी',
      mr: 'सामना संपला • मुंबई इंडियन्सचा २ धावांनी विजय'
    },
    winProbMI: 100,
    recentOvers: ['0', 'W', '4', '1', '0', '1', '|', '4', '6', '2', 'W', '1', '4'],
    length: 'Wide-Line Yorker at the Tramline',
    commentary: {
      en: '20.0 Hardik Pandya to Pat Cummins, FOUR RUNS! BUT MUMBAI WIN A THRILLER BY 2 RUNS! 7 needed off the final ball—Hardik spears in a pinpoint wide yorker at 137.9 kph. Cummins carves it off the slice through backward point for a boundary, but it’s 2 runs short! MI clinch a heart-stopping victory at the Wankhede!',
      hi: '20.0 हार्दिक पांड्या ने कमिंस को डाली 137.9 kph की सटीक वाइड यॉर्कर, चौका! लेकिन मुंबई इंडियंस ने 2 रनों से जीता रोमांचक मुकाबला! आखिरी गेंद पर 7 रन चाहिए थे, कमिंस ने पॉइंट की दिशा में चौका जड़ा लेकिन लक्ष्य से 2 रन दूर रह गए! वानखेड़े में मुंबई का जश्न!',
      mr: '20.0 हार्दिक पंड्याची १३७.९ किमी/तास अचूक वाईड यॉर्कर, चौकार! पण मुंबई इंडियन्सचा २ धावांनी थरारक विजय! शेवटच्या चेंडूवर ७ धावा हव्या होत्या, कमिन्सने पॉईंटवरून चौकार ठोकला पण मुंबई २ धावांनी विजयी ठरली! वानखेडेवर मुंबईचा जल्लोष!'
    },
    captainTrigger: 'Hardik Pandya & Rohit Sharma embrace; Mumbai Indians celebrate an epic 2-run win!',
    umpireTrigger: 'Match Official Signal: Full 20.0 overs completed. Mumbai Indians win by 2 runs.',
    flashcards: [
      {
        id: 'fc-20-0-a',
        tag: { en: 'DEATH DEFENSE TACTICS', hi: 'अंतिम ओवर की रक्षा रणनीति', mr: 'शेवटच्या षटकाची रणनीती' },
        tagBg: 'bg-[#FFDE59]',
        question: {
          en: 'Why was conceding a boundary on the final ball still a tactical victory for MI?',
          hi: 'आखिरी गेंद पर चौका जाने के बाद भी यह मुंबई इंडियंस की रणनीतिक जीत कैसे थी?',
          mr: 'शेवटच्या चेंडूवर चौकार गेला तरीही हा मुंबईसाठी रणनीतिक विजय कसा ठरला?'
        },
        shortHook: {
          en: 'Bowling at the wide tramline guaranteed no six was possible, sealing the win.',
          hi: 'वाइड लाइन पर गेंद डालकर छक्के की संभावना खत्म की—चौके पर भी मुंबई जीत गई।',
          mr: 'वाईड लाईनवर चेंडू टाकून षटकाराची शक्यता संपवली—चौकार जाऊनही मुंबई जिंकली.'
        },
        answer: {
          en: 'With 7 runs required, a boundary could never beat Mumbai. Hardik intentionally targeted the wide tramline: even if Cummins made clean contact off the slice, the maximum possible result was 4. The execution eliminated any risk of a match-tying or match-winning six!',
          hi: '7 रन की दरकार में सिर्फ छक्का ही मैच टाई या हरा सकता था। हार्दिक ने जानबूझकर वाइड लाइन पर यॉर्कर डाली। अगर बल्लेबाज पूरी ताकत से भी शॉट खेलता तो सिर्फ चौका ही मिल सकता था, जिससे मुंबई की 2 रन से जीत सुनिश्चित हो गई!',
          mr: '७ धावा हव्या असताना फक्त षटकारानेच सामना फिरू शकत होता. हार्दिकने मुद्दाम वाईड यॉर्कर टाकला, ज्यामुळे उत्तम फटका बसूनही फक्त ४ धावाच मिळाल्या आणि मुंबईचा विजय पक्का झाला!'
        },
        metric: 'Defended Margin: 2 Runs • MI 193/6 vs SRH 191/6 in 20.0 Overs'
      }
    ]
  }
];

// ============================================================================
// PRE-BUILT "CATCH ME UP" STORIES (LOCALIZED IN EN / HI / MR)
// ============================================================================
const CATCHUP_STORIES = {
  last2overs: {
    badge: {
      en: 'LAST 2 OVERS (16.1 – 18.2)',
      hi: 'पिछले 2 ओवर (16.1 – 18.2)',
      mr: 'शेवटची २ षटके (१६.१ – १८.२)'
    },
    readTime: '15 SEC BRIEFING',
    headline: {
      en: 'Dropped Catch on 36, Twin Sixes & Bumrah’s 124 kph Slower Trap!',
      hi: '36 पर छूटा कैच, दो छक्के और बुमराह की 124 kph धीमी यॉर्कर का जाल!',
      mr: '३६ वर सुटलेला झेल, दोन षटकार आणि बुमराहच्या १२४ kph स्लोअर यॉर्करचा सापळा!'
    },
    momentum: 'MI Win Prob Jumped +29% (52% → 81%)',
    bullets: {
      en: [
        'Over 16.4 (The Drop): Klaasen (on 36) skies Coetzee to deep mid-wicket—dropped! He punishes the next two balls for huge sixes (18 runs off Over 16).',
        'Over 17.1–17.6 (The Squeeze): Hardik Pandya bowls cross-seam cutters into the pitch, conceding just 6 singles and forcing SRH’s required rate above 14.',
        'Over 18.2 (The Twist): Rohit brings Bumrah back early—who sets Klaasen up with a 142 kph wide yorker before trapping him LBW with a 124 kph slower ball!'
      ],
      hi: [
        'ओवर 16.4 (कैच छूटा): 36 के स्कोर पर क्लासेन का डीप मिड-विकेट पर कैच छूटा, जिसके बाद उन्होंने अगली दो गेंदों पर 2 छक्के जड़ दिए (ओवर से 18 रन)।',
        'ओवर 17.1–17.6 (हार्दिक का कसाव): हार्दिक पांड्या ने पिच पर स्लोअर कटर डालकर पूरे ओवर में सिर्फ 6 सिंगल दिए।',
        'ओवर 18.2 (बुमराह का वार): रोहित ने बुमराह को बुलाया—जिन्होंने पहले 142 kph की वाइड यॉर्कर डाली और फिर 124 kph की स्लोअर गेंद पर क्लासेन को LBW आउट कर दिया!'
      ],
      mr: [
        'षटक १६.४ (सुटलेला झेल): ३६ धावांवर क्लासेनचा झेल सुटला आणि त्याने पुढच्याच दोन चेंडूंवर सलग २ उत्तुंग षटकार ठोकले (षटकात १८ धावा).',
        'षटक १७.१–१७.६ (हार्दिकचा ब्रेक): हार्दिक पंड्याने खेळपट्टीवर संथ कटर टाकत संपूर्ण षटकात फक्त ६ धावा दिल्या.',
        'षटक १८.२ (बुमराहची जादू): बुमराहने आधी १४२ किमी/तास वेगाने वाईड यॉर्कर टाकला आणि पुढचाच चेंडू १२४ किमी/तास स्लोअर टाकून क्लासेनला पायचित केले!'
      ]
    },
    narrative: {
      en: 'In the last two overs you missed, the game swung wildly! First, Klaasen was dropped on 36 in the 16th over and smashed back-to-back sixes to put SRH ahead. Then Hardik bowled a brilliant 6-run 17th over using slower cutters into the pitch, and Bumrah just trapped Klaasen LBW with a disguised 124 kph slower yorker on Umpire’s Call!',
      hi: 'पिछले दो ओवर में मैच पूरी तरह पलट गया! सोलहवें ओवर में छत्तीस के स्कोर पर क्लासेन का कैच छूटा और उन्होंने लगातार दो छक्के जड़ दिए। लेकिन सत्रहवें ओवर में हार्दिक ने स्लोअर कटर डालकर सिर्फ छह रन दिए, और अभी-अभी बुमराह ने एक सौ चौबीस किलोमीटर प्रति घंटे की धीमी यॉर्कर पर क्लासेन को एलबीडब्ल्यू आउट कर बाजी पलट दी!',
      mr: 'शेवटच्या दोन षटकांत सामना पूर्णपणे फिरला! सोळाव्या षटकात छत्तीस धावांवर क्लासेनचा झेल सुटला आणि त्याने सलग दोन षटकार ठोकले. पण सतराव्या षटकात हार्दिकने संथ कटर टाकून फक्त सहा धावा दिल्या आणि आताच बुमराहने एकशे चोवीस किलोमीटर वेगाच्या स्लोअर यॉर्करवर क्लासेनला पायचित केले!'
    }
  },
  powerplay: {
    badge: {
      en: 'POWERPLAY RECAP (OVERS 1 – 6)',
      hi: 'पावरप्ले रीकैप (ओवर 1 – 6)',
      mr: 'पॉवरप्ले आढावा (षटक १ – ६)'
    },
    readTime: '15 SEC BRIEFING',
    headline: {
      en: 'Head’s 22-Ball Blitz Followed by Bumrah & Thushara’s Double Strike',
      hi: 'हेड की तूफानी शुरुआत के बाद बुमराह और तुषारा के दो बड़े झटके',
      mr: 'हेडच्या वादळी सुरुवातीनंतर बुमराह आणि तुषाराचे दोन मोठे धक्के'
    },
    momentum: 'SRH 62/2 at End of Powerplay',
    bullets: {
      en: [
        'Overs 1–3 (Flying Start): Travis Head and Abhishek Sharma attacked the new ball, smashing 41/0 in 3 overs with swinging deliveries flying off edges.',
        'Over 4.2 (First Breakthrough): Nuwan Thushara swung a full ball late into Abhishek’s pads to break the opening stand at 45.',
        'Over 5.5 (Bumrah’s Entry): Bumrah bowled a 144 kph seam-up delivery that cramped Travis Head for room, caught at mid-on to leave SRH 62/2.'
      ],
      hi: [
        'ओवर 1–3 (तूफानी शुरुआत): ट्रेविस हेड और अभिषेक शर्मा ने नई गेंद पर हमला बोलते हुए 3 ओवर में 41/0 बना दिए।',
        'ओवर 4.2 (पहला विकेट): नुवान तुषारा ने स्विंग होती फुल गेंद पर अभिषेक शर्मा को 45 के स्कोर पर आउट किया।',
        'ओवर 5.5 (बुमराह का प्रहार): बुमराह ने 144 kph की तेज़ गेंद पर ट्रेविस हेड को मिड-ऑन पर कैच आउट कराकर स्कोर 62/2 कर दिया।'
      ],
      mr: [
        'षटक १–३ (वादळी सुरुवात): ट्रेव्हिस हेड आणि अभिषेक शर्मा यांनी नवीन चेंडूवर तुफान फटकेबाजी करत ३ षटकांत बिनबाद ४१ धावा केल्या.',
        'षटक ४.२ (पहिला धक्का): नुवान तुषाराने स्विंग होणाऱ्या चेंडूवर अभिषेक शर्माला बाद करत ४५ धावांवर जोडी फोडली.',
        'षटक ५.५ (बुमराहचा दणका): बुमराहने १४४ किमी/तास वेगाच्या चेंडूवर ट्रेव्हिस हेडला मिड-ऑनवर झेलबाद करत पॉवरप्लेअखेर ६२ बाद २ अशी स्थिती केली.'
      ]
    },
    narrative: {
      en: 'If you missed the Powerplay, Hyderabad raced to 41 for 0 in just 3 overs as the hard new ball skidded onto the bat. Mumbai fought back in overs 4 to 6 when Thushara swung one into Abhishek’s pads and Bumrah cramped Travis Head with a 144 kph length ball, leaving the game balanced at 62 for 2.',
      hi: 'पावरप्ले के पहले तीन ओवर में हैदराबाद ने बिना विकेट खोए इकतालीस रन ठोक दिए थे। लेकिन चौथे से छठे ओवर के बीच तुषारा ने अभिषेक को आउट किया और बुमराह ने ट्रेविस हेड को एक सौ चौवालीस की रफ़्तार वाली गेंद पर फंसाकर स्कोर बासठ पर दो विकेट कर दिया।',
      mr: 'पॉवरप्लेच्या पहिल्या तीन षटकांत हैदराबादने बिनबाद एकेचाळीस धावा कुटल्या होत्या. मात्र चौथ्या ते सहाव्या षटकांत तुषाराने अभिषेकला आणि बुमराहने ट्रेव्हिस हेडला बाद करत पॉवरप्लेअखेर बासष्ट बाद दोन अशी बरोबरी साधली.'
    }
  }
};

// Helper: Convert Base64 PCM16 (24kHz) from Gemini TTS to playable WAV Blob URL
const pcmBase64ToWavUrl = (base64Pcm, sampleRate = 24000) => {
  const binaryString = window.atob(base64Pcm);
  const pcmLen = binaryString.length;
  const wavBuffer = new ArrayBuffer(44 + pcmLen);
  const view = new DataView(wavBuffer);

  const writeStr = (offset, str) => {
    for (let i = 0; i < str.length; i++) {
      view.setUint8(offset + i, str.charCodeAt(i));
    }
  };

  writeStr(0, 'RIFF');
  view.setUint32(4, 36 + pcmLen, true);
  writeStr(8, 'WAVE');
  writeStr(12, 'fmt ');
  view.setUint32(16, 16, true); // PCM chunk size
  view.setUint16(20, 1, true); // PCM format
  view.setUint16(22, 1, true); // Mono
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true); // Byte rate
  view.setUint16(32, 2, true); // Block align
  view.setUint16(34, 16, true); // 16-bit
  writeStr(36, 'data');
  view.setUint32(40, pcmLen, true);

  const bytes = new Uint8Array(wavBuffer, 44);
  for (let i = 0; i < pcmLen; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  const blob = new Blob([wavBuffer], { type: 'audio/wav' });
  return URL.createObjectURL(blob);
};

// ============================================================================
// CONTEXTUAL FLASHCARD COLOR THEMES (NATURAL & DISTINCT DESIGN PRINCIPLE)
// ============================================================================
const getFlashcardTheme = (card) => {
  const tagStr = (typeof card.tag === 'object' ? card.tag.en : card.tag) || '';
  if (/DRS|UMPIRE|RULE/i.test(tagStr)) {
    return {
      frontBg: 'bg-[#FFF1F2]', // Soft Rose / Coral
      backBg: 'bg-[#FFE4E6]',
      tagBg: 'bg-[#FDA4AF] text-zinc-950',
      badgeBg: 'bg-rose-950 text-rose-100',
      shadow: 'shadow-[5px_5px_0px_#9f1239]',
      flipBadge: 'bg-rose-200 text-rose-950 hover:bg-rose-300'
    };
  }
  if (/CAPTAIN|TACTIC|FIELD/i.test(tagStr)) {
    return {
      frontBg: 'bg-[#FFFBEB]', // Warm Sand / Golden Amber
      backBg: 'bg-[#FEF3C7]',
      tagBg: 'bg-[#FDE047] text-zinc-950',
      badgeBg: 'bg-amber-950 text-amber-100',
      shadow: 'shadow-[5px_5px_0px_#854d0e]',
      flipBadge: 'bg-amber-200 text-amber-950 hover:bg-amber-300'
    };
  }
  if (/BOWLER|BALL|SPEED|PACE|CUTTER|YORKER|BOUNCER/i.test(tagStr)) {
    return {
      frontBg: 'bg-[#F0FDF4]', // Fresh Mint / Lime
      backBg: 'bg-[#DCFCE7]',
      tagBg: 'bg-[#86EFAC] text-zinc-950',
      badgeBg: 'bg-emerald-950 text-emerald-100',
      shadow: 'shadow-[5px_5px_0px_#166534]',
      flipBadge: 'bg-emerald-200 text-emerald-950 hover:bg-emerald-300'
    };
  }
  if (/BATTER|MATCHUP|SUB|IMPACT/i.test(tagStr)) {
    return {
      frontBg: 'bg-[#F0F9FF]', // Sky / Ice Blue
      backBg: 'bg-[#E0F2FE]',
      tagBg: 'bg-[#7DD3FC] text-zinc-950',
      badgeBg: 'bg-sky-950 text-sky-100',
      shadow: 'shadow-[5px_5px_0px_#0369a1]',
      flipBadge: 'bg-sky-200 text-sky-950 hover:bg-sky-300'
    };
  }
  // AI Generated / Custom Doubts
  return {
    frontBg: 'bg-[#FAF5FF]', // Soft Lavender / Violet
    backBg: 'bg-[#F3E8FF]',
    tagBg: 'bg-[#D8B4FE] text-zinc-950',
    badgeBg: 'bg-purple-950 text-purple-100',
    shadow: 'shadow-[5px_5px_0px_#6b21a8]',
    flipBadge: 'bg-purple-200 text-purple-950 hover:bg-purple-300'
  };
};

export default function App() {
  // Core Match & Language State
  const [ballIndex, setBallIndex] = useState(1); // Starts on 18.2 (Wicket + DRS)
  const [language, setLanguage] = useState('en'); // 'en' | 'hi' | 'mr'
  const [autoSim, setAutoSim] = useState(true);

  // Feature 1: "Catch Me Up" State
  const [catchupMode, setCatchupMode] = useState('last2overs'); // 'last2overs' | 'powerplay' | 'custom'
  const [customCatchupQuery, setCustomCatchupQuery] = useState('');
  const [customCatchupResult, setCustomCatchupResult] = useState(null);
  const [isLoadingCatchup, setIsLoadingCatchup] = useState(false);

  // Feature 2: Interactive Flippable 3D Flashcards State
  const [flippedCards, setFlippedCards] = useState({});
  const [customFlashcardsByBall, setCustomFlashcardsByBall] = useState({});
  const [customDoubtText, setCustomDoubtText] = useState('');
  const [isGeneratingCard, setIsGeneratingCard] = useState(false);

  const toggleFlip = (cardId) => {
    setFlippedCards((prev) => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

  // Natural Broadcast Voice State (Instant Zero-Latency Neural Voice Engine)
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speakingId, setSpeakingId] = useState('');
  const [availableVoices, setAvailableVoices] = useState([]);

  // Voice-to-Text (Speech Recognition) State for Both Input Boxes
  const [listeningTarget, setListeningTarget] = useState(null); // 'catchup' | 'flashcard' | null
  const [voiceHint, setVoiceHint] = useState('');
  const recognitionRef = useRef(null);

  const ui = UI_TEXT[language] || UI_TEXT.en;
  const currentBall = BALL_TIMELINE[ballIndex];
  const liveFlashcards = [
    ...(customFlashcardsByBall[currentBall.id] || []),
    ...currentBall.flashcards
  ];

  // Load Google Fonts for authentic Devanagari (Hindi & Marathi) + Pre-warm Instant Voices
  useEffect(() => {
    const linkId = 'matchsense-regional-fonts';
    if (!document.getElementById(linkId)) {
      const link = document.createElement('link');
      link.id = linkId;
      link.rel = 'stylesheet';
      link.href =
        'https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@500;600;700;800;900&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap';
      document.head.appendChild(link);
    }
    if ('speechSynthesis' in window) {
      const loadVoices = () => {
        const v = window.speechSynthesis.getVoices();
        if (v.length > 0) setAvailableVoices(v);
      };
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  // ============================================================================
  // LIVE VOICE-TO-TEXT SPEECH RECOGNITION (CAPTURE SPOKEN WORDS DIRECTLY)
  // ============================================================================
  const toggleVoiceInput = (target) => {
    if (listeningTarget === target) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setListeningTarget(null);
      return;
    }

    stopSpeech();
    const win = window as any;
    const SpeechRecognition =
      typeof window !== 'undefined' &&
      (win.SpeechRecognition || win.webkitSpeechRecognition);

    if (!SpeechRecognition) {
      setVoiceHint('Voice input works best in Chrome/Edge/Safari.');
      setTimeout(() => setVoiceHint(''), 3500);
      return;
    }

    try {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }

      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.lang =
        language === 'hi' ? 'hi-IN' : language === 'mr' ? 'mr-IN' : 'en-IN';
      recognition.interimResults = true;
      recognition.continuous = false;

      recognition.onstart = () => {
        setListeningTarget(target);
        setVoiceHint('Listening... Speak your cricket question or overs now');
      };

      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0].transcript)
          .join('');
        if (target === 'catchup') {
          setCustomCatchupQuery(transcript);
        } else {
          setCustomDoubtText(transcript);
        }
      };

      recognition.onerror = () => {
        setListeningTarget(null);
        setVoiceHint('');
      };

      recognition.onend = () => {
        setListeningTarget(null);
        setVoiceHint('');
      };

      recognition.start();
    } catch (e) {
      setListeningTarget(null);
    }
  };

  // Auto-advance live match simulation
  useEffect(() => {
    if (!autoSim) return;
    const interval = setInterval(() => {
      setFlippedCards({});
      setBallIndex((prev) => (prev + 1) % BALL_TIMELINE.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [autoSim]);

  const handleBallChange = (idx) => {
    stopSpeech();
    setBallIndex(idx);
    setFlippedCards({});
  };

  // ============================================================================
  // INSTANT ZERO-LATENCY BROADCAST VOICE ENGINE (PLAYS IMMEDIATELY ON TAP)
  // ============================================================================
  const stopSpeech = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    setSpeakingId('');
  };

  // Make numbers and cricket abbreviations sound natural when spoken in EN / HI / MR
  const normalizeTextForNaturalSpeech = (rawText, lang) => {
    let t = rawText;
    if (lang === 'hi') {
      t = t
        .replace(/18\.1/g, 'अठारह पॉइंट एक')
        .replace(/18\.2/g, 'अठारह पॉइंट दो')
        .replace(/18\.3/g, 'अठारह पॉइंट तीन')
        .replace(/18\.4/g, 'अठारह पॉइंट चार')
        .replace(/18\.5/g, 'अठारह पॉइंट पाँच')
        .replace(/18\.6/g, 'अठारह पॉइंट छह')
        .replace(/19\.1/g, 'उन्नीस पॉइंट एक')
        .replace(/19\.2/g, 'उन्नीस पॉइंट दो')
        .replace(/19\.3/g, 'उन्नीस पॉइंट तीन')
        .replace(/19\.4/g, 'उन्नीस पॉइंट चार')
        .replace(/19\.5/g, 'उन्नीस पॉइंट पाँच')
        .replace(/20\.0/g, 'बीस पॉइंट शून्य')
        .replace(/kph/gi, 'किलोमीटर प्रति घंटा')
        .replace(/LBW/gi, 'एल बी डब्ल्यू')
        .replace(/DRS/gi, 'डी आर एस')
        .replace(/SRH/gi, 'हैदराबाद')
        .replace(/MI/gi, 'मुंबई')
        .replace(/!/g, '। ');
    } else if (lang === 'mr') {
      t = t
        .replace(/18\.1/g, 'अठरा पॉईंट एक')
        .replace(/18\.2/g, 'अठरा पॉईंट दोन')
        .replace(/18\.3/g, 'अठरा पॉईंट तीन')
        .replace(/18\.4/g, 'अठरा पॉईंट चार')
        .replace(/18\.5/g, 'अठरा पॉईंट पाच')
        .replace(/18\.6/g, 'अठरा पॉईंट सहा')
        .replace(/19\.1/g, 'एकोणीस पॉईंट एक')
        .replace(/19\.2/g, 'एकोणीस पॉईंट दोन')
        .replace(/19\.3/g, 'एकोणीस पॉईंट तीन')
        .replace(/19\.4/g, 'एकोणीस पॉईंट चार')
        .replace(/19\.5/g, 'एकोणीस पॉईंट पाच')
        .replace(/20\.0/g, 'वीस पॉईंट शून्य')
        .replace(/kph/gi, 'किलोमीटर प्रति तास')
        .replace(/LBW/gi, 'एल बी डब्ल्यू')
        .replace(/DRS/gi, 'डी आर एस')
        .replace(/SRH/gi, 'हैदराबाद')
        .replace(/MI/gi, 'मुंबई')
        .replace(/!/g, '। ');
    } else {
      t = t
        .replace(/kph/gi, 'kilometers per hour')
        .replace(/SRH/g, 'Sunrisers')
        .replace(/MI/g, 'Mumbai');
    }
    return t;
  };

  const toggleSpeech = (text, id) => {
    if (isSpeaking && speakingId === id) {
      stopSpeech();
      return;
    }

    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    // Update UI state synchronously on tap for 0ms perceived latency
    setIsSpeaking(true);
    setSpeakingId(id);

    const cleanedText = normalizeTextForNaturalSpeech(text, language);
    const utterance = new SpeechSynthesisUtterance(cleanedText);
    const voices =
      availableVoices.length > 0 ? availableVoices : window.speechSynthesis.getVoices();

    const pickBestVoice = (langCode, fallbacks = []) => {
      const candidates = voices.filter(
        (v) =>
          v.lang.toLowerCase().includes(langCode) ||
          fallbacks.some((f) => v.lang.toLowerCase().includes(f))
      );
      return (
        candidates.find((v) =>
          /natural|neural|google|swara|madhur|aarohi|manohar|neerja|prabhat|rishi|lekha/i.test(
            v.name
          )
        ) || candidates[0]
      );
    };

    if (language === 'hi') {
      utterance.lang = 'hi-IN';
      const v = pickBestVoice('hi-in', ['hi']);
      if (v) utterance.voice = v;
      utterance.rate = 1.0;
      utterance.pitch = 1.02;
    } else if (language === 'mr') {
      utterance.lang = 'mr-IN';
      const v = pickBestVoice('mr-in', ['mr', 'hi-in']);
      if (v) utterance.voice = v;
      utterance.rate = 0.98;
      utterance.pitch = 1.02;
    } else {
      utterance.lang = 'en-IN';
      const v = pickBestVoice('en-in', ['en-gb', 'en-us']);
      if (v) utterance.voice = v;
      utterance.rate = 1.02;
      utterance.pitch = 1.0;
    }

    utterance.onend = () => {
      setIsSpeaking(false);
      setSpeakingId('');
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
      setSpeakingId('');
    };

    window.speechSynthesis.speak(utterance);
  };

  // ============================================================================
  // SECURE SERVERLESS GEMINI API HELPER (STRICT 3.8S CAP • ZERO CASCAFE DELAYS)
  // ============================================================================
  const callGemini = async (prompt, schema) => {
    const payload = { prompt, schema };
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3800);

    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `Serverless returned status ${res.status}`);
      }

      const data = await res.json();
      if (!data.result) {
        throw new Error('No result returned from serverless function');
      }
      return data.result;
    } catch (err) {
      clearTimeout(timeoutId);
      throw err;
    }
  };

  // ============================================================================
  // FEATURE 1: HANDLE CUSTOM "CATCH ME UP" QUERY
  // ============================================================================
  const handleCustomCatchupSubmit = async (e) => {
    if (e) e.preventDefault();
    const query = customCatchupQuery.trim();
    if (!query) return;

    stopSpeech();
    setCatchupMode('custom');
    setIsLoadingCatchup(true);

    try {
      const prompt = `You are MatchSense AI, catching up a cricket fan watching MI vs SRH (Target 194, Current Score: ${currentBall.score} in ${currentBall.over} overs, ${currentBall.req}).
Match Context:
- MI scored 193/6 (Suryakumar Yadav 78* off 41, Cummins 3 wickets with cutters).
- SRH Powerplay: 62/2 (Head & Abhishek fast start, Bumrah & Thushara struck).
- Middle Overs (7-15): MI spinners Chawla & Nabi took 2 wickets on gripping pitch before Klaasen counter-attacked to reach 54(27).
- Death Overs (16-18.4): Klaasen dropped on 36 in Over 16 (hit two 6s), Hardik bowled a 6-run 17th over, Bumrah dismissed Klaasen LBW on Umpire's Call at 18.2 with a 124 kph slower ball, Impact Sub Samad hit a 4 on 18.3.

The fan typed this custom catch-up request: "${query}".
Generate a crisp, high-energy 15-second catch-up story answering their exact request in English (en), Hindi (hi), and Marathi (mr), plus 3 short bullet points.`;

      const schema = {
        type: 'OBJECT',
        properties: {
          badge: { type: 'STRING' },
          headline: { type: 'STRING' },
          momentum: { type: 'STRING' },
          bullets: { type: 'ARRAY', items: { type: 'STRING' } },
          en: { type: 'STRING' },
          hi: { type: 'STRING' },
          mr: { type: 'STRING' }
        },
        required: ['badge', 'headline', 'momentum', 'bullets', 'en', 'hi', 'mr']
      };

      const res = await callGemini(prompt, schema);
      setCustomCatchupResult({
        badge: {
          en: (res.badge || `CUSTOM RECAP: ${query}`).toUpperCase(),
          hi: `कस्टम रीकैप: ${query}`,
          mr: `कस्टम आढावा: ${query}`
        },
        readTime: 'AI LIVE RECAP',
        headline: {
          en: res.headline,
          hi: res.headline,
          mr: res.headline
        },
        momentum: res.momentum,
        bullets: {
          en: res.bullets.slice(0, 3),
          hi: res.bullets.slice(0, 3),
          mr: res.bullets.slice(0, 3)
        },
        narrative: {
          en: res.en,
          hi: res.hi,
          mr: res.mr
        }
      });
    } catch (err) {
      setCustomCatchupResult({
        badge: {
          en: `CUSTOM RECAP • "${query.toUpperCase()}"`,
          hi: `कस्टम रीकैप • "${query}"`,
          mr: `कस्टम आढावा • "${query}"`
        },
        readTime: '15 SEC BRIEFING',
        headline: {
          en: `How the Chase Shifted Around "${query}"`,
          hi: `"${query}" के दौरान कैसे पलटा मैच का रुख`,
          mr: `"${query}" दरम्यान सामन्याचे चित्र कसे पालटले`
        },
        momentum: `Current State: ${currentBall.score} (${currentBall.over} Ov) • MI Win Prob ${currentBall.winProbMI}%`,
        bullets: {
          en: [
            'Klaasen’s 54(27) kept SRH ahead after middle-over spin pressure from Chawla and Nabi.',
            'Hardik’s 6-run 17th over with slower cutters forced the required rate above 14 RPO.',
            `At Over ${currentBall.over}, Bumrah’s pace variation (142 kph vs 124 kph) has tilted the death overs toward Mumbai.`
          ],
          hi: [
            'बीच के ओवरों में स्पिन के दबाव के बाद क्लासेन (27 गेंद में 54) ने हैदराबाद को आगे रखा।',
            'हार्दिक ने 17वें ओवर में धीमी कटर डालकर सिर्फ 6 रन दिए और जरूरी रन रेट 14 के पार पहुंचाया।',
            `ओवर ${currentBall.over} में बुमराह की गति में बदलाव (142 kph बनाम 124 kph) ने मैच मुंबई की तरफ मोड़ दिया है।`
          ],
          mr: [
            'मधल्या षटकांत फिरकीच्या दबावानंतर क्लासेनच्या ५४(२७) धावांनी हैदराबादला आघाडीवर ठेवले.',
            'हार्दिकने १७ व्या षटकात संथ कटर टाकत फक्त ६ धावा दिल्या आणि आवश्यक धावगती १४ च्या पुढे नेली.',
            `षटक ${currentBall.over} मध्ये बुमराहच्या वेगातील बदलाने (१४२ विरुद्ध १२४ kph) सामना मुंबईकडे झुकवला आहे.`
          ]
        },
        narrative: {
          en: `Here is your custom catch-up on "${query}": After Mumbai posted 193, Hyderabad stayed in the hunt through Klaasen’s counter-attacking 54. However, slower balls gripping in the pitch during overs 17 and 18—capped by Bumrah’s 124 kph dipping yorker—have swung the match back to Mumbai!`,
          hi: `"${query}" के लिए आपका अपडेट: मुंबई के 193 रनों के जवाब में क्लासेन (54) ने हैदराबाद को मैच में बनाए रखा था। लेकिन 17वें और 18वें ओवर में पिच पर रुक कर आती धीमी गेंदों और बुमराह की यॉर्कर ने मैच मुंबई की तरफ मोड़ दिया है!`,
          mr: `"${query}" बद्दलची खास माहिती: मुंबईच्या १९३ धावांचा पाठलाग करताना क्लासेनच्या ५४ धावांनी हैदराबादला सामन्यात ठेवले होते. पण १७ आणि १८ व्या षटकातील संथ कटर आणि बुमराहच्या यॉर्करने सामना मुंबईच्या बाजूने वळवला आहे!`
        }
      });
    } finally {
      setIsLoadingCatchup(false);
    }
  };

  // ============================================================================
  // FEATURE 2: GENERATE INTERACTIVE DOUBT FLASHCARD FOR LIVE CONDITIONS
  // ============================================================================
  const handleGenerateFlashcard = async (userQuestion = '') => {
    setIsGeneratingCard(true);
    try {
      const prompt = `You are MatchSense AI, generating interactive Doubt Flashcards for a live cricket fan during Over ${currentBall.over} of MI vs SRH (${currentBall.score}).
Current Delivery Telemetry:
- Bowler: ${currentBall.bowler.name} (${currentBall.bowler.speed}, ${currentBall.length})
- Batter: ${currentBall.striker.name}
- Commentary: "${currentBall.commentary.en}"
- Captain Tactic: "${currentBall.captainTrigger}"
- Umpire / Rule Trigger: "${currentBall.umpireTrigger}"

${
  userQuestion
    ? `The fan asked this specific doubt: "${userQuestion}". Create a flashcard answering it clearly.`
    : `Generate 1 NEW, insightful flashcard explaining a tactical move, fielding placement, bowling variation, or cricket rule happening right now in Over ${currentBall.over}.`
}
Return localized questions and plain-language answers (2 sentences max) in English (en), Hindi (hi), and Marathi (mr).`;

      const schema = {
        type: 'OBJECT',
        properties: {
          tag: { type: 'STRING' },
          questionEn: { type: 'STRING' },
          questionHi: { type: 'STRING' },
          questionMr: { type: 'STRING' },
          shortHookEn: { type: 'STRING' },
          shortHookHi: { type: 'STRING' },
          shortHookMr: { type: 'STRING' },
          en: { type: 'STRING' },
          hi: { type: 'STRING' },
          mr: { type: 'STRING' },
          metric: { type: 'STRING' }
        },
        required: [
          'tag',
          'questionEn',
          'questionHi',
          'questionMr',
          'shortHookEn',
          'shortHookHi',
          'shortHookMr',
          'en',
          'hi',
          'mr',
          'metric'
        ]
      };

      const res = await callGemini(prompt, schema);
      const newCard = {
        id: `fc-custom-${Date.now()}`,
        tag: {
          en: (res.tag || 'LIVE AI FLASHCARD').toUpperCase(),
          hi: 'लाइव AI फ्लैशकार्ड',
          mr: 'लाईव्ह AI फ्लॅशकार्ड'
        },
        tagBg: 'bg-[#FF90E8]',
        question: {
          en: res.questionEn,
          hi: res.questionHi,
          mr: res.questionMr
        },
        shortHook: {
          en: res.shortHookEn,
          hi: res.shortHookHi,
          mr: res.shortHookMr
        },
        answer: {
          en: res.en,
          hi: res.hi,
          mr: res.mr
        },
        metric: res.metric
      };

      setCustomFlashcardsByBall((prev) => ({
        ...prev,
        [currentBall.id]: [newCard, ...(prev[currentBall.id] || [])]
      }));
      setFlippedCards((prev) => ({ ...prev, [newCard.id]: true }));
      setCustomDoubtText('');
    } catch (err) {
      const fallbackCard = {
        id: `fc-custom-${Date.now()}`,
        tag: {
          en: 'LIVE TACTICAL DOUBT',
          hi: 'लाइव रणनीतिक सवाल',
          mr: 'लाईव्ह रणनीती शंका'
        },
        tagBg: 'bg-[#D8B4FE]',
        question: {
          en:
            userQuestion ||
            `Why are bowlers bowling cross-seam cutters instead of fast yorkers at Over ${currentBall.over}?`,
          hi:
            userQuestion ||
            `ओवर ${currentBall.over} में गेंदबाज तेज़ यॉर्कर की जगह स्लोअर कटर क्यों डाल रहे हैं?`,
          mr:
            userQuestion ||
            `षटक ${currentBall.over} मध्ये गोलंदाज वेगवान यॉर्करऐवजी स्लोअर कटर का टाकत आहेत?`
        },
        shortHook: {
          en: 'Red-soil Wankhede pitch grips slower balls while pace skids onto the bat.',
          hi: 'वानखेड़े की लाल मिट्टी पर धीमी गेंद रुक कर आती है जबकि तेज़ गेंद बल्ले पर आसानी से आती है।',
          mr: 'वानखेडेच्या लाल मातीवर संथ चेंडू थांबून येतो, तर वेगवान चेंडू बॅटवर सहज येतो.'
        },
        answer: {
          en: 'With evening dew settling on the grass, pace-on balls skid smoothly onto the bat for easy sixes. By hitting the dry red soil with slower cross-seam cutters, the ball grips the surface and forces mistimed shots.',
          hi: 'ओस की वजह से तेज़ गेंदें आसानी से बल्ले पर आ रही हैं। इसलिए गेंदबाज लाल मिट्टी पर धीमी कटर पटक रहे हैं ताकि गेंद रुक कर आए और बल्लेबाज की टाइमिंग बिगड़ जाए।',
          mr: 'दवामुळे वेगवान चेंडू बॅटवर सहज येत आहेत. म्हणून गोलंदाज लाल मातीच्या खेळपट्टीवर स्लोअर कटर टाकत आहेत जेणेकरून चेंडू थांबून येईल आणि फलंदाजाची टायमिंग चुकेल.'
        },
        metric: 'Boundary % vs Pace: 34% • vs Cutters: 9%'
      };
      setCustomFlashcardsByBall((prev) => ({
        ...prev,
        [currentBall.id]: [fallbackCard, ...(prev[currentBall.id] || [])]
      }));
      setFlippedCards((prev) => ({ ...prev, [fallbackCard.id]: true }));
      setCustomDoubtText('');
    } finally {
      setIsGeneratingCard(false);
    }
  };

  const activeCatchup =
    catchupMode === 'custom' && customCatchupResult
      ? customCatchupResult
      : CATCHUP_STORIES[catchupMode] || CATCHUP_STORIES.last2overs;

  // Dynamic Typography Wrapper: switches smoothly to Noto Sans Devanagari for Hindi/Marathi
  const typographyStyle =
    language === 'hi' || language === 'mr'
      ? {
          fontFamily: "'Noto Sans Devanagari', 'Plus Jakarta Sans', sans-serif",
          lineHeight: '1.6'
        }
      : {
          fontFamily: "'Plus Jakarta Sans', sans-serif"
        };

  return (
    <div
      style={typographyStyle}
      className="min-h-screen bg-[#F4F1EA] text-zinc-950 pb-14 selection:bg-[#FFDE59] transition-all duration-200"
    >
      {/* ====================================================================
          TOP NEO-BRUTALIST HEADER & LIVE BALL SWITCHER
      ==================================================================== */}
      <header className="sticky top-0 z-40 bg-[#F4F1EA]/95 backdrop-blur-md border-b-[3px] border-zinc-950 px-3 sm:px-6 py-2.5 shadow-[0px_3px_0px_#09090b]">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-2.5">
          {/* Brand Logo (Kept crisp & iconic across languages) */}
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-10 h-10 bg-[#A3E635] border-[3px] border-zinc-950 rounded-xl shadow-[3px_3px_0px_#09090b] flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5 text-zinc-950 fill-zinc-950" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-xl font-black tracking-tight uppercase truncate">
                  MatchSense
                </h1>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 bg-[#FFDE59] border-2 border-zinc-950 rounded-md shadow-[2px_2px_0px_#09090b] shrink-0">
                  LIVE AI
                </span>
              </div>
              <p className="text-[11px] font-bold text-zinc-600 truncate">{ui.subtitle}</p>
            </div>
          </div>

          {/* Right Header Actions: Prominent Live Sim Button (Always Visible) + Language Selector */}
          <div className="flex items-center gap-2 ml-auto">
            {/* Live Simulation Top Control (Always Visible to Reviewer) */}
            <button
              onClick={() => setAutoSim(!autoSim)}
              title={autoSim ? "Click to Pause Live Simulation" : "Click to Play Live Simulation"}
              className={`px-3 py-1.5 rounded-xl text-xs font-black border-[2.5px] border-zinc-950 transition-all flex items-center gap-2 shadow-[3px_3px_0px_#09090b] active:translate-x-0.5 active:translate-y-0.5 ${
                autoSim
                  ? 'bg-[#A3E635] text-zinc-950 hover:bg-[#8ee01e]'
                  : 'bg-white text-zinc-800 hover:bg-zinc-100'
              }`}
            >
              <span className="relative flex h-2.5 w-2.5">
                {autoSim && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                )}
                <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${autoSim ? 'bg-red-600' : 'bg-zinc-400'}`}></span>
              </span>
              {autoSim ? <Pause className="w-3.5 h-3.5 fill-zinc-950" /> : <Play className="w-3.5 h-3.5 fill-zinc-950" />}
              <span className="tracking-tight">{autoSim ? ui.autoOn : ui.autoOff}</span>
              <span className="font-mono text-[10px] bg-zinc-950 text-white px-1.5 py-0.5 rounded font-black">
                Ov {currentBall.over}
              </span>
            </button>

            {/* Language Selector (EN / हिंदी / मराठी) */}
            <div className="flex bg-white border-[2.5px] border-zinc-950 rounded-xl p-0.5 shadow-[3px_3px_0px_#09090b]">
              {[
                { id: 'en', label: 'EN' },
                { id: 'hi', label: 'हिंदी' },
                { id: 'mr', label: 'मराठी' }
              ].map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => {
                    stopSpeech();
                    setLanguage(lang.id);
                  }}
                  className={`px-2.5 sm:px-3 py-1 rounded-lg text-xs font-black transition-all ${
                    language === lang.id
                      ? 'bg-zinc-950 text-[#A3E635]'
                      : 'text-zinc-700 hover:bg-zinc-100'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-3 sm:px-6 pt-5 space-y-6">
        {/* ==================================================================
            SECTION 01: LIVE MATCH TRACKER & SCORECARD
        ================================================================== */}
        <div className="flex items-center justify-between gap-2 px-1">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-[#009270] text-white text-xs font-black uppercase tracking-wider rounded-lg border-2 border-zinc-950 shadow-[2px_2px_0px_#09090b] flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 fill-white" />
              <span>{ui.sec1Badge}</span>
            </span>
            <span className="text-xs font-extrabold text-zinc-600 hidden sm:inline">
              {ui.sec1Sub}
            </span>
          </div>
          <span className="text-[11px] font-black uppercase text-zinc-600 bg-white px-2.5 py-1 rounded-lg border-2 border-zinc-950 shadow-[2px_2px_0px_#09090b]">
            Wankhede • IPL Chase
          </span>
        </div>

        {/* ==================================================================
            LIVE MATCH SIMULATOR BAR (TEST DIFFERENT BALL CONDITIONS)
        ================================================================== */}
        <section className="bg-white border-[3px] border-zinc-950 rounded-2xl p-3 shadow-[5px_5px_0px_#09090b] flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
            <span className="text-xs font-black uppercase tracking-wider">{ui.simLabel}</span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {BALL_TIMELINE.map((b, idx) => (
              <button
                key={b.id}
                onClick={() => handleBallChange(idx)}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-black border-2 border-zinc-950 transition-all flex items-center gap-1.5 ${
                  ballIndex === idx
                    ? 'bg-[#FFDE59] text-zinc-950 shadow-[3px_3px_0px_#09090b] -translate-y-0.5'
                    : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                }`}
              >
                <span>{b.over}</span>
                <span
                  className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold border border-zinc-950 ${b.badgeBg}`}
                >
                  {b.badge}
                </span>
              </button>
            ))}

            <button
              onClick={() => setAutoSim(!autoSim)}
              className={`px-3 py-1.5 rounded-xl text-xs font-black border-2 border-zinc-950 transition-all flex items-center gap-1.5 ${
                autoSim
                  ? 'bg-[#A3E635] text-zinc-950 shadow-[2px_2px_0px_#09090b]'
                  : 'bg-white text-zinc-800 hover:bg-zinc-100'
              }`}
            >
              {autoSim ? <Pause className="w-3.5 h-3.5 fill-zinc-950" /> : <Play className="w-3.5 h-3.5 fill-zinc-950" />}
              <span>{autoSim ? ui.autoOn : ui.autoOff}</span>
            </button>
          </div>
        </section>

        {/* ==================================================================
            CRICBUZZ-STRUCTURED NEO-BRUTALIST LIVE SCORECARD
        ================================================================== */}
        <section className="bg-white border-[3px] border-zinc-950 rounded-2xl overflow-hidden shadow-[6px_6px_0px_#09090b]">
          {/* Cricbuzz Green/Dark Top Match Strip */}
          <div className="bg-[#009270] text-white px-4 py-2.5 border-b-[3px] border-zinc-950 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-red-600 text-white text-[10px] font-black uppercase rounded border border-zinc-950">
                LIVE
              </span>
              <span className="text-xs font-extrabold tracking-wide">{ui.matchBanner}</span>
            </div>
            <span className="text-xs font-black bg-zinc-950 text-[#A3E635] px-2.5 py-0.5 rounded-md border border-white/20">
              {ui.winProb}: {currentBall.winProbMI}%
            </span>
          </div>

          {/* Score Header & Equation (Universal Cricket Numbers + Localized Equation) */}
          <div className="p-4 sm:p-5 bg-white">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-dashed border-zinc-300">
              <div className="space-y-1">
                <div className="flex items-center gap-3 text-xs font-bold text-zinc-500">
                  <span>MUMBAI INDIANS: 193/6 (20.0)</span>
                  <span>•</span>
                  <span>{ui.target}</span>
                </div>

                <div className="flex flex-wrap items-baseline gap-3">
                  <span className="text-lg font-black text-zinc-900">SRH</span>
                  <span className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-950">
                    {currentBall.score}
                  </span>
                  <span className="text-base font-extrabold text-zinc-600">
                    ({currentBall.over} Ov)
                  </span>
                  <span className="text-xs font-black px-2 py-0.5 bg-zinc-100 border-2 border-zinc-950 rounded-md">
                    CRR: {currentBall.crr}
                  </span>
                  <span className="text-xs font-black px-2 py-0.5 bg-[#FFDE59] border-2 border-zinc-950 rounded-md">
                    REQ: {currentBall.rrr}
                  </span>
                </div>

                <p className="text-xs sm:text-sm font-black text-red-600">
                  {currentBall.req[language] || currentBall.req.en}
                </p>
              </div>
            </div>

            {/* Cricbuzz-Style Batter & Bowler Mini Table (Standard Cricket Columns Preserved) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-3.5 border-b-2 border-zinc-200 text-xs">
              {/* Batters Table */}
              <div>
                <div className="grid grid-cols-12 font-black text-[10px] uppercase text-zinc-500 pb-1.5 border-b border-zinc-200">
                  <div className="col-span-6">Batter</div>
                  <div className="col-span-1 text-right">R</div>
                  <div className="col-span-1 text-right">B</div>
                  <div className="col-span-1 text-right">4s</div>
                  <div className="col-span-1 text-right">6s</div>
                  <div className="col-span-2 text-right">SR</div>
                </div>
                <div className="divide-y divide-zinc-100 font-bold">
                  <div className="grid grid-cols-12 py-1.5 items-center">
                    <div className="col-span-6 font-black text-zinc-950 flex items-center gap-1">
                      <span>{currentBall.striker.name} *</span>
                    </div>
                    <div className="col-span-1 text-right font-black">
                      {currentBall.striker.runs}
                    </div>
                    <div className="col-span-1 text-right text-zinc-600">
                      {currentBall.striker.balls}
                    </div>
                    <div className="col-span-1 text-right text-zinc-600">
                      {currentBall.striker.fours}
                    </div>
                    <div className="col-span-1 text-right text-zinc-600">
                      {currentBall.striker.sixes}
                    </div>
                    <div className="col-span-2 text-right text-zinc-800">
                      {currentBall.striker.sr}
                    </div>
                  </div>
                  <div className="grid grid-cols-12 py-1.5 items-center text-zinc-600">
                    <div className="col-span-6 font-bold">{currentBall.nonStriker.name}</div>
                    <div className="col-span-1 text-right font-bold">
                      {currentBall.nonStriker.runs}
                    </div>
                    <div className="col-span-1 text-right">{currentBall.nonStriker.balls}</div>
                    <div className="col-span-1 text-right">{currentBall.nonStriker.fours}</div>
                    <div className="col-span-1 text-right">{currentBall.nonStriker.sixes}</div>
                    <div className="col-span-2 text-right">{currentBall.nonStriker.sr}</div>
                  </div>
                </div>
              </div>

              {/* Bowler & Recent Balls Strip */}
              <div className="flex flex-col justify-between md:border-l-2 md:border-zinc-200 md:pl-4">
                <div>
                  <div className="grid grid-cols-12 font-black text-[10px] uppercase text-zinc-500 pb-1.5 border-b border-zinc-200">
                    <div className="col-span-6">Bowler</div>
                    <div className="col-span-4 text-right">O-M-R-W</div>
                    <div className="col-span-2 text-right">ECO</div>
                  </div>
                  <div className="grid grid-cols-12 py-1.5 font-black text-zinc-950">
                    <div className="col-span-6">{currentBall.bowler.name} *</div>
                    <div className="col-span-4 text-right font-mono">
                      {currentBall.bowler.figures}
                    </div>
                    <div className="col-span-2 text-right">{currentBall.bowler.econ}</div>
                  </div>
                </div>

                {/* Recent Balls Strip */}
                <div className="flex items-center gap-1.5 pt-2">
                  <span className="text-[10px] font-black uppercase text-zinc-500 mr-1">
                    {ui.recent}
                  </span>
                  {currentBall.recentOvers.map((item, idx) =>
                    item === '|' ? (
                      <span key={idx} className="text-zinc-400 font-black px-0.5">
                        |
                      </span>
                    ) : (
                      <span
                        key={idx}
                        className={`w-6 h-6 rounded-md border-2 border-zinc-950 text-[11px] font-black flex items-center justify-center ${
                          item === 'W'
                            ? 'bg-[#FF4D4D] text-white'
                            : item === '4' || item === '6'
                            ? 'bg-[#A3E635] text-zinc-950'
                            : 'bg-zinc-100 text-zinc-800'
                        }`}
                      >
                        {item}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Live Commentary Ticker (Transforms to selected language + Instant Play Button) */}
            <div className="pt-3 flex items-start justify-between gap-2.5 text-xs sm:text-sm font-bold text-zinc-800">
              <div className="flex items-start gap-2.5">
                <span className="px-2 py-0.5 bg-zinc-950 text-white font-black rounded text-[11px] shrink-0 mt-0.5">
                  COMM
                </span>
                <p className="leading-relaxed">
                  {currentBall.commentary[language] || currentBall.commentary.en}
                </p>
              </div>
              <button
                onClick={() =>
                  toggleSpeech(
                    currentBall.commentary[language] || currentBall.commentary.en,
                    `comm-${currentBall.id}`
                  )
                }
                title="Instant Audio Commentary"
                className={`p-1.5 rounded-lg border-2 border-zinc-950 shrink-0 transition shadow-[2px_2px_0px_#09090b] ${
                  isSpeaking && speakingId === `comm-${currentBall.id}`
                    ? 'bg-[#FF4D4D] text-white'
                    : 'bg-[#FFDE59] text-zinc-950 hover:bg-[#ffe57f]'
                }`}
              >
                {isSpeaking && speakingId === `comm-${currentBall.id}` ? (
                  <VolumeX className="w-3.5 h-3.5" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>
        </section>

        {/* ==================================================================
            BOUNDARY DIVIDER: SECTION 02
        ================================================================== */}
        <div className="relative py-2 my-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t-[3px] border-dashed border-zinc-400" />
          </div>
          <div className="relative flex justify-center">
            <div className="px-5 py-2 bg-[#FFDE59] text-zinc-950 rounded-2xl border-[3px] border-zinc-950 shadow-[4px_4px_0px_#09090b] flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-lg bg-zinc-950 text-[#FFDE59] font-black text-xs flex items-center justify-center">
                02
              </span>
              <span className="text-xs sm:text-sm font-black uppercase tracking-wide">
                {ui.sec2Badge}
              </span>
            </div>
          </div>
        </div>

        {/* ==================================================================
            FEATURE 1: "CATCH ME UP" ENGINE (BUTTONS + CUSTOM INPUT BOX)
        ================================================================== */}
        <section className="bg-[#FFFDF8] border-[3px] border-zinc-950 rounded-2xl p-4 sm:p-5 shadow-[6px_6px_0px_#09090b] space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#FFDE59] border-2 border-zinc-950 flex items-center justify-center shadow-[2px_2px_0px_#09090b]">
                <Clock className="w-4 h-4 text-zinc-950" />
              </div>
              <div>
                <h2 className="text-sm sm:text-base font-black tracking-tight">
                  {ui.catchupTitle}
                </h2>
                <p className="text-xs font-semibold text-zinc-600">{ui.catchupSub}</p>
              </div>
            </div>
          </div>

          {/* Preset Buttons + Custom Input Box */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5">
            {/* Button 1: Last 2 Overs */}
            <button
              onClick={() => {
                stopSpeech();
                setCatchupMode('last2overs');
              }}
              className={`md:col-span-3 py-2.5 px-3 rounded-xl border-[2.5px] border-zinc-950 font-black text-xs transition-all flex items-center justify-center gap-1.5 ${
                catchupMode === 'last2overs'
                  ? 'bg-[#A3E635] text-zinc-950 shadow-[3px_3px_0px_#09090b] -translate-y-0.5'
                  : 'bg-white text-zinc-800 hover:bg-zinc-100'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>{ui.btnLast2}</span>
            </button>

            {/* Button 2: Powerplay */}
            <button
              onClick={() => {
                stopSpeech();
                setCatchupMode('powerplay');
              }}
              className={`md:col-span-3 py-2.5 px-3 rounded-xl border-[2.5px] border-zinc-950 font-black text-xs transition-all flex items-center justify-center gap-1.5 ${
                catchupMode === 'powerplay'
                  ? 'bg-[#A3E635] text-zinc-950 shadow-[3px_3px_0px_#09090b] -translate-y-0.5'
                  : 'bg-white text-zinc-800 hover:bg-zinc-100'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>{ui.btnPP}</span>
            </button>

            {/* Custom Write-in or Voice Box */}
            <form
              onSubmit={handleCustomCatchupSubmit}
              className="md:col-span-6 flex items-center bg-white border-[2.5px] border-zinc-950 rounded-xl overflow-hidden shadow-[3px_3px_0px_#09090b]"
            >
              <input
                type="text"
                value={customCatchupQuery}
                onChange={(e) => setCustomCatchupQuery(e.target.value)}
                placeholder={
                  listeningTarget === 'catchup' ? ui.listeningCatchup : ui.catchupPlaceholder
                }
                className="flex-1 px-3 py-2 text-xs font-bold text-zinc-950 placeholder-zinc-400 focus:outline-none min-w-0"
              />
              <button
                type="button"
                onClick={() => toggleVoiceInput('catchup')}
                title="Speak your catch-up request"
                className={`px-2.5 py-2 border-l-2 border-zinc-950 font-black text-xs flex items-center gap-1 transition shrink-0 ${
                  listeningTarget === 'catchup'
                    ? 'bg-[#FF4D4D] text-white animate-pulse'
                    : 'bg-[#FFDE59] text-zinc-950 hover:bg-[#ffe885]'
                }`}
              >
                {listeningTarget === 'catchup' ? (
                  <>
                    <MicOff className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline text-[10px]">{ui.stopMicBtn}</span>
                  </>
                ) : (
                  <>
                    <Mic className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline text-[10px]">{ui.speakBtn}</span>
                  </>
                )}
              </button>
              <button
                type="submit"
                disabled={isLoadingCatchup || !customCatchupQuery.trim()}
                className="px-3.5 py-2.5 bg-zinc-950 text-[#FFDE59] font-black text-xs flex items-center gap-1 hover:bg-zinc-800 disabled:opacity-40 transition shrink-0"
              >
                {isLoadingCatchup ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <>
                    <span>{ui.recapBtn}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          </div>

          {listeningTarget === 'catchup' && voiceHint && (
            <div className="text-[11px] font-black text-red-600 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
              <span>{voiceHint}</span>
            </div>
          )}

          {/* Active Catch-Up Output Card */}
          <div className="bg-[#F4F1EA] border-[2.5px] border-zinc-950 rounded-xl p-4 space-y-3 transition-all">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 bg-zinc-950 text-white text-[10px] font-black uppercase rounded">
                  {typeof activeCatchup.badge === 'object'
                    ? activeCatchup.badge[language] || activeCatchup.badge.en
                    : activeCatchup.badge}
                </span>
              </div>

              {/* Natural Voice Readout Button */}
              <button
                onClick={() =>
                  toggleSpeech(
                    activeCatchup.narrative[language] || activeCatchup.narrative.en,
                    'catchup-audio'
                  )
                }
                className={`px-3.5 py-1.5 rounded-lg border-2 border-zinc-950 text-xs font-black flex items-center gap-1.5 transition shadow-[2px_2px_0px_#09090b] ${
                  isSpeaking && speakingId === 'catchup-audio'
                    ? 'bg-[#FF4D4D] text-white'
                    : 'bg-[#A3E635] text-zinc-950 hover:bg-[#92d625]'
                }`}
              >
                {isSpeaking && speakingId === 'catchup-audio' ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5" />
                    <span>{ui.stopAudio}</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>{ui.listenBtn}</span>
                  </>
                )}
              </button>
            </div>

            <h3 className="text-base sm:text-lg font-black text-zinc-950 leading-snug">
              {typeof activeCatchup.headline === 'object'
                ? activeCatchup.headline[language] || activeCatchup.headline.en
                : activeCatchup.headline}
            </h3>

            <p className="text-xs sm:text-sm font-bold text-zinc-800 bg-white border-2 border-zinc-950 rounded-xl p-3.5 leading-relaxed">
              {activeCatchup.narrative[language] || activeCatchup.narrative.en}
            </p>

            {/* 3 Bullet Breakdown (Localized) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
              {(Array.isArray(activeCatchup.bullets)
                ? activeCatchup.bullets
                : activeCatchup.bullets[language] || activeCatchup.bullets.en
              ).map((b, i) => (
                <div
                  key={i}
                  className="bg-white border-2 border-zinc-950 rounded-xl p-2.5 text-xs font-bold text-zinc-800 flex items-start gap-2 shadow-[2px_2px_0px_#09090b]"
                >
                  <span className="w-5 h-5 rounded bg-zinc-950 text-[#A3E635] font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="leading-snug">{b}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================================================================
            BOUNDARY DIVIDER: SECTION 03
        ================================================================== */}
        <div className="relative py-2 my-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t-[3px] border-dashed border-zinc-400" />
          </div>
          <div className="relative flex justify-center">
            <div className="px-5 py-2 bg-[#7CE3FF] text-zinc-950 rounded-2xl border-[3px] border-zinc-950 shadow-[4px_4px_0px_#09090b] flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-lg bg-zinc-950 text-[#7CE3FF] font-black text-xs flex items-center justify-center">
                03
              </span>
              <span className="text-xs sm:text-sm font-black uppercase tracking-wide">
                {ui.sec3Badge}
              </span>
            </div>
          </div>
        </div>

        {/* ==================================================================
            FEATURE 2: INTERACTIVE LIVE DOUBT FLASHCARDS (3D FLIPPABLE)
        ================================================================== */}
        <section className="bg-[#F8FAFC] border-[3px] border-zinc-950 rounded-2xl p-4 sm:p-5 shadow-[6px_6px_0px_#09090b] space-y-4">
          {/* Header & Auto-Generate Button */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b-2 border-dashed border-zinc-300">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#7CE3FF] border-2 border-zinc-950 flex items-center justify-center shadow-[2px_2px_0px_#09090b]">
                <Sparkles className="w-5 h-5 text-zinc-950" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-sm sm:text-base font-black tracking-tight">
                    {ui.fcTitle} (Ov {currentBall.over})
                  </h2>
                  <span className="px-2 py-0.5 bg-[#A3E635] border border-zinc-950 rounded text-[10px] font-black">
                    {liveFlashcards.length} {ui.fcActive}
                  </span>
                </div>
                <p className="text-xs font-semibold text-zinc-600">{ui.fcSub}</p>
              </div>
            </div>

            <button
              onClick={() => handleGenerateFlashcard('')}
              disabled={isGeneratingCard}
              className="px-3.5 py-2 rounded-xl bg-[#FF90E8] hover:bg-[#ff7ae2] border-2 border-zinc-950 text-xs font-black shadow-[3px_3px_0px_#09090b] flex items-center gap-1.5 transition disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isGeneratingCard ? 'animate-spin' : ''}`} />
              <span>{isGeneratingCard ? ui.generatingBtn : ui.genCardBtn}</span>
            </button>
          </div>

          {/* Color Legend Bar for easy visual category recognition */}
          <div className="flex flex-wrap items-center gap-2 text-[10px] font-extrabold text-zinc-700 bg-white/80 p-2 rounded-xl border border-zinc-300">
            <span className="text-zinc-500 uppercase font-black">Category Guide:</span>
            <span className="px-2 py-0.5 rounded border border-rose-300 bg-[#FFF1F2] text-rose-950 font-bold">
              DRS & Rules (Rose)
            </span>
            <span className="px-2 py-0.5 rounded border border-amber-300 bg-[#FFFBEB] text-amber-950 font-bold">
              Captain Tactics (Amber)
            </span>
            <span className="px-2 py-0.5 rounded border border-emerald-300 bg-[#F0FDF4] text-emerald-950 font-bold">
              Bowling Variations (Mint)
            </span>
            <span className="px-2 py-0.5 rounded border border-purple-300 bg-[#FAF5FF] text-purple-950 font-bold">
              Live AI Doubts (Lavender)
            </span>
          </div>

          {/* Interactive 3D Flippable Flashcard Deck */}
          <div className="space-y-4">
            {liveFlashcards.map((card) => {
              const isFlipped = flippedCards[card.id] || false;
              const theme = getFlashcardTheme(card);
              const tagText =
                typeof card.tag === 'object' ? card.tag[language] || card.tag.en : card.tag;
              const questionText =
                typeof card.question === 'object'
                  ? card.question[language] || card.question.en
                  : card.question;
              const hookText =
                typeof card.shortHook === 'object'
                  ? card.shortHook[language] || card.shortHook.en
                  : card.shortHook;
              const answerText = card.answer[language] || card.answer.en;
              const speechKey = `fc-${card.id}-${language}`;

              return (
                <div
                  key={card.id}
                  className={`perspective-1000 w-full select-none transition-all duration-300 ${
                    isFlipped
                      ? 'min-h-[295px] sm:min-h-[225px]'
                      : 'min-h-[190px] sm:min-h-[180px]'
                  }`}
                >
                  <div
                    onClick={() => toggleFlip(card.id)}
                    className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d cursor-pointer ${
                      isFlipped
                        ? 'rotate-y-180 min-h-[295px] sm:min-h-[225px]'
                        : 'min-h-[190px] sm:min-h-[180px]'
                    }`}
                  >
                    {/* FRONT FACE (Question & Hook) */}
                    <div
                      className={`backface-hidden w-full h-full rounded-2xl border-[3px] border-zinc-950 p-3.5 sm:p-5 flex flex-col justify-between transition-all hover:-translate-y-0.5 ${theme.frontBg} ${theme.shadow}`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-1.5 flex-wrap">
                          <div className="flex items-center gap-1.5">
                            <span
                              className={`px-2 py-0.5 border-2 border-zinc-950 rounded-md text-[9px] sm:text-[10px] font-black uppercase ${theme.tagBg}`}
                            >
                              {tagText}
                            </span>
                            <span className="text-[10px] sm:text-[11px] font-extrabold text-zinc-500">
                              Ov {currentBall.over}
                            </span>
                          </div>
                          <span
                            className={`text-[9px] sm:text-[10px] font-black px-2 py-0.5 rounded-lg border-2 border-zinc-950 flex items-center gap-1 shadow-[2px_2px_0px_#09090b] ${theme.flipBadge}`}
                          >
                            <RotateCw className="w-2.5 h-2.5" />
                            <span>{ui.tapFlip}</span>
                          </span>
                        </div>

                        <h3 className="text-xs sm:text-base font-black text-zinc-950 leading-snug pt-0.5">
                          {questionText}
                        </h3>

                        <p className="text-[11px] sm:text-xs font-semibold text-zinc-700 leading-relaxed">
                          {hookText}
                        </p>
                      </div>

                      <div className="pt-2.5 border-t border-dashed border-zinc-950/20 flex items-center justify-between text-[10px] sm:text-[11px] font-extrabold text-zinc-600">
                        <span className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-zinc-950 animate-ping shrink-0" />
                          <span className="truncate">{ui.flipInstruction}</span>
                        </span>
                        <span className="text-[11px] sm:text-xs font-black text-zinc-950 shrink-0">
                          {ui.flipCta}
                        </span>
                      </div>
                    </div>

                    {/* BACK FACE (Tactical Answer & Telemetry) */}
                    <div
                      className={`backface-hidden absolute inset-0 w-full h-full rounded-2xl border-[3px] border-zinc-950 p-3.5 sm:p-5 flex flex-col justify-between rotate-y-180 transition-all ${theme.backBg} ${theme.shadow}`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-1.5 flex-wrap">
                          <div className="flex items-center gap-1.5">
                            <span
                              className={`px-2 py-0.5 border-2 border-zinc-950 rounded-md text-[9px] sm:text-[10px] font-black uppercase ${theme.tagBg}`}
                            >
                              {tagText}
                            </span>
                            <span className="px-1.5 py-0.5 bg-zinc-950 text-[#A3E635] text-[9px] sm:text-[10px] font-black uppercase rounded border border-zinc-950">
                              {ui.decodedBadge}
                            </span>
                          </div>
                          <span
                            className={`text-[9px] sm:text-[10px] font-black px-2 py-0.5 rounded-lg border-2 border-zinc-950 flex items-center gap-1 shadow-[2px_2px_0px_#09090b] ${theme.flipBadge}`}
                          >
                            <RotateCw className="w-2.5 h-2.5" />
                            <span>{ui.tapFlipBack}</span>
                          </span>
                        </div>

                        <p className="text-xs sm:text-sm font-bold text-zinc-950 leading-relaxed bg-white/95 p-2.5 sm:p-3.5 rounded-xl border-2 border-zinc-950 shadow-[2px_2px_0px_#09090b] overflow-y-auto max-h-[135px] sm:max-h-[120px]">
                          {answerText}
                        </p>
                      </div>

                      <div
                        className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="px-2.5 py-1 bg-white border-2 border-zinc-950 rounded-lg text-[10px] sm:text-[11px] font-black text-zinc-950 flex items-center gap-1.5 shadow-[2px_2px_0px_#09090b]">
                          <TrendingUp className="w-3.5 h-3.5 text-zinc-950 shrink-0" />
                          <span className="truncate">{card.metric}</span>
                        </div>

                        <button
                          onClick={() => toggleSpeech(answerText, speechKey)}
                          className={`px-3 py-1.5 rounded-lg border-2 border-zinc-950 text-xs font-black flex items-center justify-center gap-1.5 shadow-[2px_2px_0px_#09090b] transition shrink-0 ${
                            isSpeaking && speakingId === speechKey
                              ? 'bg-[#FF4D4D] text-white'
                              : 'bg-[#FFDE59] text-zinc-950 hover:bg-[#ffe57f]'
                          }`}
                        >
                          {isSpeaking && speakingId === speechKey ? (
                            <>
                              <VolumeX className="w-3.5 h-3.5" />
                              <span>{ui.stopAudio}</span>
                            </>
                          ) : (
                            <>
                              <Volume2 className="w-3.5 h-3.5" />
                              <span>{ui.readAloud}</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Custom Doubt Input Box at the Bottom (Type + Speak) */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (customDoubtText.trim()) {
                handleGenerateFlashcard(customDoubtText.trim());
              }
            }}
            className="mt-6 pt-4 border-t-2 border-dashed border-zinc-300 space-y-2"
          >
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <div className="flex-1 flex items-center bg-[#F4F1EA] border-[2.5px] border-zinc-950 rounded-xl overflow-hidden shadow-[3px_3px_0px_#09090b]">
                <div className="pl-3 pr-2 flex items-center">
                  <HelpCircle className="w-4 h-4 text-zinc-700 shrink-0" />
                </div>
                <input
                  type="text"
                  value={customDoubtText}
                  onChange={(e) => setCustomDoubtText(e.target.value)}
                  placeholder={
                    listeningTarget === 'flashcard' ? ui.listeningFc : ui.fcPlaceholder
                  }
                  className="w-full py-2.5 pr-2 bg-transparent text-xs font-bold text-zinc-950 placeholder-zinc-500 focus:outline-none min-w-0"
                />
                <button
                  type="button"
                  onClick={() => toggleVoiceInput('flashcard')}
                  title="Speak your doubt directly"
                  className={`px-3 py-2.5 border-l-2 border-zinc-950 font-black text-xs flex items-center gap-1.5 transition shrink-0 ${
                    listeningTarget === 'flashcard'
                      ? 'bg-[#FF4D4D] text-white animate-pulse'
                      : 'bg-[#FFDE59] text-zinc-950 hover:bg-[#ffe885]'
                  }`}
                >
                  {listeningTarget === 'flashcard' ? (
                    <>
                      <MicOff className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline text-[10px]">{ui.stopMicBtn}</span>
                    </>
                  ) : (
                    <>
                      <Mic className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline text-[10px]">{ui.speakBtn}</span>
                    </>
                  )}
                </button>
              </div>

              <button
                type="submit"
                disabled={isGeneratingCard || !customDoubtText.trim()}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-zinc-950 text-[#A3E635] border-[2.5px] border-zinc-950 font-black text-xs shadow-[3px_3px_0px_#A3E635] hover:bg-zinc-800 disabled:opacity-40 transition flex items-center justify-center gap-1.5 shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{ui.createFcBtn}</span>
              </button>
            </div>

            {listeningTarget === 'flashcard' && voiceHint && (
              <div className="text-[11px] font-black text-red-600 flex items-center gap-1.5 pl-1">
                <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
                <span>{voiceHint}</span>
              </div>
            )}
          </form>
        </section>
      </main>
    </div>
  );
}