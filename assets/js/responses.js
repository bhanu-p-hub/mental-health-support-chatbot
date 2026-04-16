/**
 * MindCare AI - Response Engine
 * Comprehensive mental health support response library
 */

const MindCareAI = {

  // ── INTENT DETECTION ──────────────────────────────────────────────
  detectIntent(input) {
    const text = input.toLowerCase();

    // Crisis / Emergency
    if (/\b(suicid|kill myself|end my life|don'?t want to live|want to die|ending it|self.harm|cut myself|hurt myself|overdose|no reason to live)\b/.test(text)) {
      return 'crisis';
    }

    // Greetings
    if (/^(hi|hello|hey|good morning|good evening|good afternoon|howdy|yo|sup|hola)\b/.test(text.trim())) {
      return 'greeting';
    }

    // Farewell
    if (/\b(bye|goodbye|see you|take care|later|gotta go|cya|farewell)\b/.test(text)) {
      return 'farewell';
    }

    // Anxiety
    if (/\b(anxious|anxiety|panic|panic attack|worried|worry|nervous|overthinking|stress|stressed|racing thoughts|heart racing|cant breathe|breathing fast)\b/.test(text)) {
      return 'anxiety';
    }

    // Depression
    if (/\b(depressed|depression|sad|hopeless|empty|worthless|numb|unmotivated|no energy|tired all the time|can't get out of bed|don't care anymore|nothing matters)\b/.test(text)) {
      return 'depression';
    }

    // Loneliness
    if (/\b(lonely|alone|isolated|no friends|no one cares|no one understands|invisible|left out|abandoned)\b/.test(text)) {
      return 'loneliness';
    }

    // Anger
    if (/\b(angry|anger|furious|rage|mad|frustrated|irritated|fed up|can't stand|explode)\b/.test(text)) {
      return 'anger';
    }

    // Sleep
    if (/\b(can't sleep|insomnia|sleep|nightmares|tired|exhausted|rest|sleep problems|waking up)\b/.test(text)) {
      return 'sleep';
    }

    // Relationships
    if (/\b(relationship|breakup|broke up|partner|boyfriend|girlfriend|spouse|divorce|cheating|betrayed|heartbreak|love|family|toxic)\b/.test(text)) {
      return 'relationship';
    }

    // Grief / Loss
    if (/\b(grief|grieving|lost|loss|died|death|passed away|miss|missing|mourning|bereavement)\b/.test(text)) {
      return 'grief';
    }

    // Trauma / PTSD
    if (/\b(trauma|traumatic|ptsd|flashback|nightmare|abuse|abused|assault|accident|can't forget)\b/.test(text)) {
      return 'trauma';
    }

    // Self-esteem
    if (/\b(confidence|self.esteem|ugly|not good enough|hate myself|failure|loser|stupid|worthless|body image)\b/.test(text)) {
      return 'self_esteem';
    }

    // Work / Burnout
    if (/\b(work|job|boss|career|burnout|overwhelmed|deadline|pressure|fired|quit|workplace)\b/.test(text)) {
      return 'work_stress';
    }

    // Breathing / Techniques
    if (/\b(breathing|breathe|calm|relax|meditation|mindfulness|ground|grounding|exercise)\b/.test(text)) {
      return 'techniques';
    }

    // Thanks
    if (/\b(thank|thanks|appreciate|helpful|helped me|better now|feel better|that helps)\b/.test(text)) {
      return 'thanks';
    }

    // About the bot
    if (/\b(who are you|what are you|about you|your name|you a robot|are you ai|how do you work|are you real)\b/.test(text)) {
      return 'about';
    }

    // Professional help
    if (/\b(therapist|therapy|psychiatrist|counselor|counselling|professional help|see a doctor|medication)\b/.test(text)) {
      return 'professional';
    }

    // General feelings
    if (/\b(feel|feeling|felt|emotions|mood|okay|fine|not good|bad|terrible|horrible|awful|great|happy|better)\b/.test(text)) {
      return 'feelings';
    }

    return 'general';
  },

  // ── RESPONSE LIBRARY ──────────────────────────────────────────────
  responses: {

    crisis: [
      {
        text: `I hear you, and I'm really glad you reached out right now. What you're feeling is real and serious, and you deserve immediate support from someone trained to help. 💜

<div class="crisis-msg">
🚨 <strong>Please contact crisis support immediately:</strong><br>
• <strong>iCall (India):</strong> 9152987821<br>
• <strong>Vandrevala Foundation:</strong> 1860-2662-345 (24/7)<br>
• <strong>AASRA:</strong> 9820466627<br>
• <strong>International:</strong> Crisis Text Line — Text HOME to 741741
</div>

You don't have to go through this alone. Would you like to talk about what you're experiencing right now? I'm here with you.`,
        quickReplies: ["I need immediate help", "Tell me more about these resources", "I want to talk about how I feel"]
      }
    ],

    greeting: [
      {
        text: `Hello! Welcome to MindCare. 😊 I'm MindCare AI, your mental health support companion. 

I'm here to listen without judgment, help you explore your feelings, and guide you toward helpful coping strategies. This is a safe space — you can share anything on your mind.

<div class="highlight-box">How are you feeling today? You can describe your emotions in your own words, or use the mood tracker on the left to give me a quick sense of where you're at.</div>`,
        quickReplies: ["I'm feeling anxious", "I'm feeling low today", "I just need someone to talk to", "Tell me what you can help with"]
      },
      {
        text: `Hi there! I'm so glad you're here. 💜 I'm MindCare AI, your MindCare companion.

Whether you're dealing with stress, feeling overwhelmed, or just want someone to listen — I'm here for you. Every feeling you have is valid, and we'll work through it together.

What's on your mind today?`,
        quickReplies: ["I've been stressed lately", "I'm struggling with anxiety", "Feeling really down", "I just want to talk"]
      }
    ],

    farewell: [
      {
        text: `Take care of yourself — you matter more than you know. 💜 Remember, reaching out is always a sign of strength. I'll be here whenever you need to talk. 

<div class="highlight-box">Before you go: try to do one small kind thing for yourself today — even a 5-minute walk or listening to a favorite song counts.</div>

Goodbye for now. You've got this. 🌟`,
        quickReplies: []
      }
    ],

    anxiety: [
      {
        text: `I understand anxiety can be really overwhelming, and I want you to know that what you're experiencing is valid. Anxiety is one of the most common mental health challenges, and there are effective ways to manage it. 💙

<span class="section-heading">Let's start with something immediate:</span>

**Box Breathing (4-4-4-4 technique):**
<ul>
<li>Breathe IN slowly for 4 counts</li>
<li>HOLD for 4 counts</li>
<li>Breathe OUT for 4 counts</li>
<li>HOLD for 4 counts</li>
</ul>

<div class="highlight-box">Repeat this 4 times. It activates your parasympathetic nervous system and signals to your body that you're safe.</div>

Can you tell me more about what's triggering your anxiety? Understanding the source helps us find the right approach.`,
        quickReplies: ["Try the breathing exercise", "It comes from work/school", "It's social situations", "It's constant background anxiety", "What's grounding technique?"]
      },
      {
        text: `Anxiety is your nervous system trying to protect you — but sometimes it misfires and creates fear where there's no real threat. That's not weakness; it's biology. 💙

<span class="section-heading">The 5-4-3-2-1 Grounding Technique:</span>
<ul>
<li>👁️ Name <strong>5 things</strong> you can SEE</li>
<li>🤲 Name <strong>4 things</strong> you can TOUCH</li>
<li>👂 Name <strong>3 things</strong> you can HEAR</li>
<li>👃 Name <strong>2 things</strong> you can SMELL</li>
<li>👅 Name <strong>1 thing</strong> you can TASTE</li>
</ul>

This grounds you in the present moment and interrupts the anxiety spiral. Try it right now — what are 5 things you can see around you?`,
        quickReplies: ["I tried it, helped a little", "My heart is racing", "I can't focus on anything", "What else can I do?"]
      }
    ],

    depression: [
      {
        text: `I hear you, and I want you to know — depression is a real, medical condition, not a personal failing or weakness. Thank you for trusting me with how you're feeling. 💜

Depression can make even small tasks feel impossible, and that exhaustion is real. You're not lazy. You're not broken.

<span class="section-heading">A few gentle things that science shows can help:</span>
<ul>
<li>🌅 <strong>Sunlight exposure</strong> — even 10 minutes outside can affect your mood neurotransmitters</li>
<li>🚶 <strong>Gentle movement</strong> — a slow 10-min walk releases endorphins</li>
<li>🎵 <strong>Listen to music</strong> you loved before you felt this way</li>
<li>📝 <strong>Write one thing</strong> you're feeling — no filter needed</li>
</ul>

<div class="highlight-box">I want to ask — how long have you been feeling this way? And do you have any support around you — friends, family, or a counselor?</div>`,
        quickReplies: ["It's been weeks/months", "I have no support system", "I don't want to do anything", "I'm sleeping too much or too little", "I should see a professional"]
      }
    ],

    loneliness: [
      {
        text: `Feeling lonely, especially in a world full of people, is one of the most painful experiences there is. Your need for connection is deeply human, and I'm really sorry you're feeling this isolated. 🤍

I want you to know — right now, in this moment, you're not alone. I'm here with you.

<span class="section-heading">A few thoughts to gently explore:</span>
<ul>
<li>Are there any small communities (online or local) around things you enjoy?</li>
<li>Is there someone from your past you've been meaning to reconnect with?</li>
<li>Are there volunteer opportunities where you could be around others while also contributing?</li>
</ul>

<div class="highlight-box">Sometimes loneliness isn't about the number of people around us, but about the quality of our connections. It's okay if existing relationships feel unfulfilling too.</div>

What does your day-to-day social life look like right now?`,
        quickReplies: ["I feel disconnected even around people", "I've been isolating myself", "I moved to a new place", "How do I start connecting?"]
      }
    ],

    anger: [
      {
        text: `Anger is a completely valid emotion — it often signals that something feels unfair or threatens something important to you. It's not wrong to feel angry. What matters is how we work with it. 🔥

<span class="section-heading">Immediate de-escalation:</span>
<ul>
<li>🧊 Put your hands under cold water for 30 seconds (activates the dive reflex, slows heart rate)</li>
<li>🏃 Physical movement — jumping jacks, a brisk walk, shaking your hands out</li>
<li>😤 Take 3 slow, deep exhales — exhaling longer than inhaling activates calm</li>
<li>🖊️ Write out what you're angry about on paper</li>
</ul>

<div class="highlight-box">Once you're a bit calmer, we can look at what's underneath the anger — often there's hurt, fear, or unmet needs driving it.</div>

What happened that's making you angry?`,
        quickReplies: ["Someone treated me unfairly", "I keep losing my temper", "I'm angry at myself", "I feel like exploding", "Help me calm down now"]
      }
    ],

    sleep: [
      {
        text: `Sleep problems and mental health are deeply connected — poor sleep can worsen anxiety and depression, and mental health challenges can make sleep worse. It's a difficult cycle. 😴

<span class="section-heading">Evidence-based sleep hygiene tips:</span>
<ul>
<li>📱 <strong>No screens 45 mins before bed</strong> — blue light suppresses melatonin</li>
<li>🌡️ <strong>Keep your room cool</strong> — 65-68°F (18-20°C) is optimal</li>
<li>⏰ <strong>Same wake time every day</strong> — even weekends (anchors your circadian rhythm)</li>
<li>🛌 <strong>Bed is for sleep only</strong> — avoid working or watching TV in bed</li>
<li>🫖 <strong>No caffeine after 2pm</strong></li>
</ul>

<div class="highlight-box">If racing thoughts keep you awake, try the "cognitive shuffle" — randomly think of unconnected words and images (bicycle, ocean, lamppost...). This mimics the natural process of falling asleep.</div>

Are you struggling to fall asleep, stay asleep, or are you sleeping too much?`,
        quickReplies: ["Can't fall asleep", "I wake up multiple times", "Racing thoughts at night", "Sleeping too much but still tired", "I have nightmares"]
      }
    ],

    relationship: [
      {
        text: `Relationship pain is some of the deepest pain we can experience. Whether it's a breakup, a conflict, or feeling disconnected — your feelings make complete sense. 💔

<div class="highlight-box">Whatever you're going through, it's important to separate your sense of worth from the relationship outcome. You are whole, regardless of the status of any relationship.</div>

<span class="section-heading">Some questions to gently reflect on:</span>
<ul>
<li>What are you feeling most right now — sadness, anger, confusion, relief?</li>
<li>Do you have people around you who you can lean on?</li>
<li>Are you taking care of your basic needs — eating, sleeping, moving your body?</li>
</ul>

Would you like to share more about what's happening? I'm here to listen without judgment.`,
        quickReplies: ["I just went through a breakup", "My family is causing me pain", "I feel stuck in a toxic relationship", "I'm lonely in my relationship", "How do I set boundaries?"]
      }
    ],

    grief: [
      {
        text: `I'm so sorry for your loss. Grief is love with nowhere to go — and it's one of the most profound human experiences. Please be gentle with yourself. 🕊️

There is no "right way" to grieve, and there is no timeline. The stages of grief (denial, anger, bargaining, depression, acceptance) are not linear — you may cycle through them many times.

<div class="highlight-box">Your grief is a reflection of how much you cared. That love is real and it's sacred.</div>

<span class="section-heading">During grief, it's okay to:</span>
<ul>
<li>Feel nothing — emotional numbness is protective</li>
<li>Feel everything at once</li>
<li>Laugh and feel joy — that doesn't mean you care less</li>
<li>Ask for help</li>
<li>Take breaks from grieving</li>
</ul>

Would you like to tell me about who or what you've lost? I'm honored to listen.`,
        quickReplies: ["I lost someone close to me", "I'm grieving a relationship end", "I'm grieving a lost dream", "How do I cope day to day?"]
      }
    ],

    trauma: [
      {
        text: `Thank you for trusting me with something so significant. Trauma affects how our brains and bodies process safety, and the responses you're experiencing — flashbacks, hypervigilance, numbness — are your nervous system trying to protect you. You are not broken. 💜

<span class="section-heading">Important:</span> Trauma, especially complex trauma, significantly benefits from working with a trained therapist — particularly one trained in EMDR or trauma-focused CBT. What I can offer is support alongside professional care.

<div class="highlight-box">In moments of flashback or overwhelm, try the "Safe Space" technique: Close your eyes and vividly imagine a place where you felt completely safe. Engage all your senses — what do you see, hear, smell? Return to it whenever you feel unsafe.</div>

Are you currently working with a therapist? And would it be okay to share what you're comfortable sharing about what you've been through?`,
        quickReplies: ["I don't have a therapist", "I have a therapist but struggling", "I have intrusive thoughts", "I feel disconnected from myself", "How do I find trauma therapy?"]
      }
    ],

    self_esteem: [
      {
        text: `It takes courage to admit those feelings about yourself, and I want you to know — the inner critic is not the truth about you. Those harsh thoughts are often patterns learned early, not accurate reflections of who you are. 💙

<span class="section-heading">The inner critic challenge:</span>
When a harsh thought appears (e.g., "I'm such a failure"), try:
<ul>
<li>Notice it: "I'm having the thought that I'm a failure"</li>
<li>Don't fight it — just observe it like a passing cloud</li>
<li>Ask: "Would I speak to a friend this way?"</li>
<li>Replace: "I'm struggling with this right now, and that's human"</li>
</ul>

<div class="highlight-box">Self-compassion is not self-pity. It's treating yourself with the same kindness you'd offer to someone you love — and research shows it's powerfully linked to resilience and wellbeing.</div>

What specific thoughts about yourself are troubling you most?`,
        quickReplies: ["I feel like a failure", "I don't like how I look", "I feel like I'm not good enough", "I compare myself to others", "I'm afraid of what people think"]
      }
    ],

    work_stress: [
      {
        text: `Work stress and burnout are incredibly common — and when our professional life affects our mental health, it impacts everything else too. Your feelings about this are completely valid. 🧠

<span class="section-heading">Signs you might be experiencing burnout:</span>
<ul>
<li>Exhaustion that sleep doesn't fix</li>
<li>Cynicism or detachment from your work</li>
<li>Feeling ineffective or like nothing you do matters</li>
<li>Physical symptoms (headaches, getting sick more often)</li>
</ul>

<div class="highlight-box">Burnout requires actual recovery — not just a weekend off. Recovery means genuine psychological detachment from work during off-hours.</div>

<span class="section-heading">Boundaries that protect your wellbeing:</span>
<ul>
<li>Define "off hours" and protect them firmly</li>
<li>Take your full lunch break away from your desk</li>
<li>Say no to non-urgent requests when at capacity</li>
</ul>

What's the main source of your work stress right now?`,
        quickReplies: ["I feel overwhelmed by my workload", "My workplace is toxic", "I'm afraid of being fired", "I hate my job but can't leave", "Work-life balance is destroyed"]
      }
    ],

    techniques: [
      {
        text: `Excellent! Learning coping techniques is a powerful form of self-care. Here are some of the most evidence-based methods: 🧘

<span class="section-heading">🌬️ Breathing Techniques:</span>
<ul>
<li><strong>Box Breathing:</strong> 4 counts in, hold, out, hold</li>
<li><strong>4-7-8 Breathing:</strong> Inhale 4s, hold 7s, exhale 8s</li>
<li><strong>Physiological Sigh:</strong> Double inhale through nose + long exhale (fastest way to calm down)</li>
</ul>

<span class="section-heading">🌱 Grounding Techniques:</span>
<ul>
<li><strong>5-4-3-2-1 Senses</strong> (see above)</li>
<li><strong>Cold water on wrists/face</strong></li>
<li><strong>Name things in categories</strong> (e.g., 10 fruits, 8 animals)</li>
</ul>

<span class="section-heading">🧠 Cognitive Techniques:</span>
<ul>
<li><strong>Thought journaling</strong> — write the thought, evidence for & against it</li>
<li><strong>Cognitive reframing</strong> — "What's another way to look at this?"</li>
<li><strong>Worry time</strong> — schedule 15 mins to worry, then let it go</li>
</ul>

Which technique would you like to try right now?`,
        quickReplies: ["Guide me through box breathing", "Try the 5-4-3-2-1 technique", "Help me journal my thoughts", "Teach me mindfulness meditation"]
      }
    ],

    thanks: [
      {
        text: `I'm really glad this was helpful. 💜 You showed up for yourself today, and that takes strength — even when it doesn't feel like it.

<div class="highlight-box">Remember: progress isn't linear. There will be hard days, and that's okay. What matters is that you keep coming back to yourself with compassion.</div>

Is there anything else on your mind, or is there a coping strategy you'd like to practice before you go?`,
        quickReplies: ["I want to do a breathing exercise", "I'm good for now, thank you", "One more thing I want to share"]
      }
    ],

    about: [
      {
        text: `I'm MindCare AI — MindCare's AI mental health support companion. 🌟

I'm designed to provide empathetic, evidence-based emotional support for people navigating mental health challenges. I draw on principles from:
<ul>
<li>Cognitive Behavioral Therapy (CBT)</li>
<li>Dialectical Behavior Therapy (DBT)</li>
<li>Mindfulness-Based Stress Reduction (MBSR)</li>
<li>Acceptance and Commitment Therapy (ACT)</li>
</ul>

<div class="highlight-box">⚠️ <strong>Important:</strong> I am an AI, not a licensed therapist. I can offer support, coping strategies, and a listening presence — but I'm not a replacement for professional mental health care. If you're in crisis, please reach out to a crisis line or mental health professional.</div>

I'm here to listen, reflect, and support — without judgment, 24/7. What would you like to talk about?`,
        quickReplies: ["What can you help me with?", "I'm in crisis right now", "I want to talk about my feelings"]
      }
    ],

    professional: [
      {
        text: `Seeking professional help is one of the most courageous and self-aware things you can do. 🌟 Mental health professionals are trained to help in ways that I, as an AI, cannot fully replicate.

<span class="section-heading">Types of mental health professionals:</span>
<ul>
<li><strong>Psychiatrist</strong> — Medical doctor who can diagnose and prescribe medication</li>
<li><strong>Psychologist</strong> — PhD-level therapist specializing in assessment and therapy</li>
<li><strong>Licensed Therapist/Counselor</strong> — Provides talk therapy for a wide range of issues</li>
<li><strong>Social Worker</strong> — Often specializes in life challenges, trauma, family issues</li>
</ul>

<span class="section-heading">Finding help (India):</span>
<ul>
<li><strong>iCall:</strong> icallhelpline.org | 9152987821</li>
<li><strong>Vandrevala Foundation:</strong> vandrevalafoundation.com</li>
<li><strong>The Mind Clan:</strong> themindclan.com (online therapy)</li>
<li><strong>Wysa:</strong> wysa.io (free mental health app)</li>
</ul>

Would you like help preparing for your first therapy session?`,
        quickReplies: ["How do I prepare for therapy?", "I can't afford therapy", "Is online therapy effective?", "What does therapy feel like?"]
      }
    ],

    feelings: [
      {
        text: `Thank you for sharing that with me. Your feelings are completely valid — there are no "wrong" emotions, only experiences that need to be acknowledged and understood. 💬

I want to make sure I understand what you're going through. When you say you're feeling that way, can you help me understand a bit more?
<ul>
<li>How intense would you rate this feeling, on a scale of 1-10?</li>
<li>How long have you been feeling this way?</li>
<li>Is there something specific that triggered it, or has it been building up?</li>
</ul>

Take your time — there's no rush here. I'm fully present with you.`,
        quickReplies: ["It started recently", "It's been going on for a while", "I don't know what triggered it", "Everything feels heavy"]
      }
    ],

    general: [
      {
        text: `I'm here and I'm listening. 💜 It takes strength to reach out and talk about what you're going through.

To help me support you better, could you share a little more about what's on your mind? Sometimes just putting it into words — even imperfectly — can be the first step toward feeling lighter.

There's no right or wrong way to start. Just share what feels true to you right now.`,
        quickReplies: ["I'm feeling really overwhelmed", "I don't know where to start", "I've been having a hard time lately", "I just need someone to listen"]
      },
      {
        text: `I want to make sure I'm truly understanding what you're experiencing. Mental health is deeply personal, and every person's journey is unique. 🌱

Could you tell me more? For instance:
<ul>
<li>What does your day-to-day feel like right now?</li>
<li>When did things start feeling this way?</li>
<li>What are you hoping to get out of our conversation today?</li>
</ul>

Whatever you're comfortable sharing is perfectly fine.`,
        quickReplies: ["I want to feel better", "I need coping strategies", "I just need to vent", "Help me understand my emotions"]
      }
    ]
  },

  // ── GEMINI API CONFIGURATION ──────────────────────────────────────
  // Get a free API key from https://aistudio.google.com/app/apikey
  GEMINI_API_KEY: "AIzaSyCEaS0yPZGsEimkaFu5zR6K0R1W-kMxYz4",

  // ── GET RESPONSE ──────────────────────────────────────────────────
  async getResponse(userInput) {
    const intent = this.detectIntent(userInput);
    let apiResponseText = null;

    if (this.GEMINI_API_KEY && this.GEMINI_API_KEY !== "YOUR_GEMINI_API_KEY_HERE") {
      try {
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.GEMINI_API_KEY}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `You are MindCare AI, a compassionate mental health support AI companion. Your goal is to provide evidence-based, compassionate, and very helpful responses. Under no circumstances should you provide answers unrelated to the user's prompt or mental health support. Do not diagnose or prescribe medicine. Limit your response to 2 short paragraphs, keeping it warm and empathetic. If the user mentions crisis or suicide, tell them to seek immediate emergency support. User says: "${userInput}"`
              }]
            }]
          })
        });
        const data = await res.json();
        if (data.candidates && data.candidates[0].content.parts[0].text) {
          apiResponseText = data.candidates[0].content.parts[0].text;
          // Add some basic styling and formatting for HTML display
          apiResponseText = apiResponseText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
          apiResponseText = apiResponseText.replace(/\n\n/g, '<br><br>');
          apiResponseText = apiResponseText.replace(/\*/g, '•'); // basic bullet fix
        }
      } catch (err) {
        console.error("Gemini API Error:", err);
      }
    }

    // Static Fallback logic
    const responseSet = this.responses[intent] || this.responses.general;
    const fallbackResponse = responseSet[Math.floor(Math.random() * responseSet.length)];

    return {
      text: apiResponseText ? apiResponseText : fallbackResponse.text,
      quickReplies: fallbackResponse.quickReplies || [], // Keep quick replies from static intent matching
      intent: intent
    };
  },

  // ── AFFIRMATIONS ──────────────────────────────────────────────────
  affirmations: [
    "You are worthy of love and belonging",
    "Your feelings are valid",
    "Healing is not linear, and that's okay",
    "Asking for help is a sign of strength",
    "You don't have to be perfect to deserve support",
    "Small steps still move you forward",
    "You have survived every hard day so far",
    "It's okay to not be okay",
    "You matter more than you know",
    "Self-compassion is not weakness",
    "Every day is a new beginning",
    "You are not alone in this journey",
    "Your mental health matters",
    "Progress, not perfection",
    "Be kind to yourself today"
  ],

  getRandomAffirmation() {
    return this.affirmations[Math.floor(Math.random() * this.affirmations.length)];
  },

  // ── MOOD RESPONSES ──────────────────────────────────────────────────
  moodResponses: {
    '😊': "I'm glad you're feeling good today! 🌟 Even on good days, it can be helpful to check in with yourself and practice gratitude. What's been going well?",
    '😐': "Feeling neutral or just okay is completely valid. Sometimes that's where we live, and that's fine. Is there anything specific on your mind you'd like to explore?",
    '😔': "I'm sorry you're feeling down today. Please know you don't have to pretend to feel differently. Would you like to talk about what's weighing on you?",
    '😰': "It sounds like you're feeling anxious or overwhelmed. That's tough. Let's take this one breath at a time — would you like to try a short breathing exercise together?",
    '😠': "Feeling angry or frustrated is exhausting. Those emotions deserve acknowledgment too. Would you like to talk about what's happening?"
  }
};
