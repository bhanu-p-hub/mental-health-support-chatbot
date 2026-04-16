/**
 * MindCare Chat Engine
 * Handles all chatbot UI interactions
 */

document.addEventListener('DOMContentLoaded', () => {

  // ── DOM REFERENCES ───────────────────────────────────────────────
  const chatMessages = document.getElementById('chatMessages');
  const chatInput = document.getElementById('chatInput');
  const sendBtn = document.getElementById('sendBtn');
  const quickReplies = document.getElementById('quickReplies');
  const welcomeScreen = document.getElementById('welcomeScreen');
  const newChatBtn = document.getElementById('newChatBtn');
  const newChatBtnAlt = document.getElementById('newChatBtnAlt');
  const historyList = document.getElementById('historyList');
  const breathModal = document.getElementById('breathingModal');
  const settingsModal = document.getElementById('settingsModal');
  const miniMoodBtns = document.querySelectorAll('.mood-mini-btn');
  const moodRecorded = document.getElementById('moodRecorded');

  // ── STATE ────────────────────────────────────────────────────────
  let messageCount = 0;
  let breathInterval = null;
  let chatSessions = [];
  let currentSessionId = generateId();
  let userName = localStorage.getItem('mc_name') || 'You';

  // ── INIT ─────────────────────────────────────────────────────────
  loadSettings();
  loadHistory();
  setWellnessChart();
  initMoodMini();
  updateUserDisplay();

  // ── SEND MESSAGE ─────────────────────────────────────────────────
  function sendMessage(text) {
    const msg = text || chatInput.value.trim();
    if (!msg) return;

    // Hide welcome screen on first message
    if (welcomeScreen && messageCount === 0) {
      welcomeScreen.style.display = 'none';
    }

    // Add user message
    appendMessage('user', msg);
    chatInput.value = '';
    autoResizeTextarea();
    messageCount++;

    // Clear quick replies
    quickReplies.innerHTML = '';

    // Save to history
    if (messageCount === 1) saveNewSession(msg);

    // Show typing indicator
    const typingId = showTyping();

    // Call the async getResponse
    setTimeout(async () => {
      try {
        const response = await MindCareAI.getResponse(msg, historyList);
        removeTyping(typingId);
        appendBotMessage(response.text, response.quickReplies, response.intent);

        // If crisis, also open emergency contacts
        if (response.intent === 'crisis') highlightEmergency();
      } catch (err) {
        console.error("Chatbot error:", err);
        removeTyping(typingId);
        appendBotMessage("I'm sorry, I'm having trouble thinking right now. Please try again. 😔");
      }
    }, 500);
  }

  // ── APPEND USER MESSAGE ──────────────────────────────────────────
  function appendMessage(role, text) {
    const time = now();
    const initials = userName.charAt(0).toUpperCase();

    const el = document.createElement('div');
    el.className = `message ${role === 'user' ? 'user-message' : 'bot-message'}`;

    if (role === 'user') {
      el.innerHTML = `
        <div class="message-avatar user-av">${initials}</div>
        <div class="message-body">
          <span class="message-sender">You</span>
          <div class="message-bubble user-bubble">${escapeHtml(text)}</div>
          <span class="message-time">${time}</span>
        </div>`;
    }

    chatMessages.appendChild(el);
    scrollToBottom();
  }

  // ── APPEND BOT MESSAGE ───────────────────────────────────────────
  function appendBotMessage(text, chips = [], intent = '') {
    const time = now();

    const el = document.createElement('div');
    el.className = 'message bot-message';
    el.innerHTML = `
      <img class="message-avatar" src="assets/images/bot_avatar.png" alt="MindCare AI" onerror="this.style.background='linear-gradient(135deg,#7C3AED,#0EA5E9)';this.src='';">
      <div class="message-body">
        <span class="message-sender">MindCare AI</span>
        <div class="message-bubble bot-bubble">${text}</div>
        <span class="message-time">${time}</span>
      </div>`;

    chatMessages.appendChild(el);
    scrollToBottom();

    // Render quick reply chips
    if (chips && chips.length > 0) {
      renderQuickReplies(chips);
    }
  }

  // ── QUICK REPLIES ────────────────────────────────────────────────
  function renderQuickReplies(chips) {
    quickReplies.innerHTML = '';
    chips.forEach(chip => {
      const btn = document.createElement('button');
      btn.className = 'quick-reply-chip';
      btn.textContent = chip;
      btn.addEventListener('click', () => {
        sendMessage(chip);
      });
      quickReplies.appendChild(btn);
    });
  }

  // ── TYPING INDICATOR ─────────────────────────────────────────────
  function showTyping() {
    const id = 'typing-' + Date.now();
    const el = document.createElement('div');
    el.id = id;
    el.className = 'typing-indicator';
    el.innerHTML = `
      <img class="message-avatar" src="assets/images/bot_avatar.png" alt="MindCare AI" onerror="this.style.background='linear-gradient(135deg,#7C3AED,#0EA5E9)';this.src='';">
      <div class="typing-bubble">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>`;
    chatMessages.appendChild(el);
    scrollToBottom();
    return id;
  }

  function removeTyping(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
  }

  // ── QUICK PROMPTS ON WELCOME SCREEN ─────────────────────────────
  document.querySelectorAll('.quick-prompt-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      sendMessage(btn.dataset.prompt || btn.textContent);
    });
  });

  // ── KEY EVENTS ───────────────────────────────────────────────────
  chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  chatInput.addEventListener('input', autoResizeTextarea);

  function autoResizeTextarea() {
    chatInput.style.height = 'auto';
    chatInput.style.height = Math.min(chatInput.scrollHeight, 150) + 'px';
  }

  sendBtn.addEventListener('click', () => sendMessage());

  // ── NEW CHAT ─────────────────────────────────────────────────────
  function resetChat() {
    messageCount = 0;
    currentSessionId = generateId();
    chatMessages.innerHTML = '';
    quickReplies.innerHTML = '';
    chatInput.value = '';
    // Restore welcome screen
    const ws = buildWelcomeScreen();
    chatMessages.prepend(ws);
    welcomeScreen && (welcomeScreen.style.display = '');
    loadHistory();
  }

  newChatBtn.addEventListener('click', resetChat);
  if (newChatBtnAlt) newChatBtnAlt.addEventListener('click', resetChat);

  // ── HISTORY ──────────────────────────────────────────────────────
  function saveNewSession(firstMsg) {
    const sessions = JSON.parse(localStorage.getItem('mc_sessions') || '[]');
    sessions.unshift({ id: currentSessionId, preview: firstMsg.slice(0, 40), ts: Date.now() });
    if (sessions.length > 20) sessions.pop();
    localStorage.setItem('mc_sessions', JSON.stringify(sessions));
    loadHistory();
  }

  function loadHistory() {
    if (!historyList) return;
    const sessions = JSON.parse(localStorage.getItem('mc_sessions') || '[]');
    historyList.innerHTML = '';
    sessions.slice(0, 8).forEach(s => {
      const item = document.createElement('div');
      item.className = 'history-item' + (s.id === currentSessionId ? ' active' : '');
      item.innerHTML = `<span class="hi-icon">💬</span><span class="hi-text">${escapeHtml(s.preview)}</span>`;
      historyList.appendChild(item);
    });
    if (!sessions.length) {
      historyList.innerHTML = '<p style="font-size:12px;color:var(--text-muted);padding:4px 8px;">No previous chats</p>';
    }
  }

  // ── WELLNESS CHART (random data for demo) ───────────────────────
  function setWellnessChart() {
    const bars = document.querySelectorAll('.wellness-bar');
    const heights = [40, 55, 35, 70, 50, 65, 80];
    bars.forEach((bar, i) => {
      bar.style.height = heights[i] + '%';
    });
  }

  // ── MINI MOOD TRACKER ────────────────────────────────────────────
  function initMoodMini() {
    miniMoodBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        miniMoodBtns.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        moodRecorded.style.display = 'block';
        moodRecorded.textContent = '✅ Mood recorded!';

        setTimeout(() => {
          // Send mood to chat
          const emoji = btn.dataset.mood;
          const response = MindCareAI.moodResponses[emoji] || "Thank you for sharing how you feel.";
          sendMoodResponse(emoji, response);
        }, 800);
      });
    });
  }

  function sendMoodResponse(emoji, response) {
    if (welcomeScreen) welcomeScreen.style.display = 'none';
    appendMessage('user', `My current mood: ${emoji}`);
    const typingId = showTyping();
    setTimeout(() => {
      removeTyping(typingId);
      appendBotMessage(response, ["Tell me more", "I want to try coping techniques", "I'd like to talk about it"]);
      messageCount++;
    }, 1200);
  }

  // ── BREATHING EXERCISE ───────────────────────────────────────────
  window.openBreathing = function () {
    if (breathModal) breathModal.classList.add('active');
    startBreathing();
  };

  window.closeBreathing = function () {
    if (breathModal) breathModal.classList.remove('active');
    stopBreathing();
  };

  function startBreathing() {
    const circle = document.getElementById('breathCircle');
    const phaseEl = document.getElementById('breathPhase');
    const countEl = document.getElementById('breathCount');

    if (!circle) return;

    const phases = [
      { name: 'Inhale', duration: 4, class: 'inhale', instruction: 'Breathe in slowly through your nose...' },
      { name: 'Hold', duration: 4, class: '', instruction: 'Hold gently...' },
      { name: 'Exhale', duration: 4, class: 'exhale', instruction: 'Release slowly through your mouth...' },
      { name: 'Hold', duration: 4, class: '', instruction: 'Rest...' }
    ];

    let phaseIdx = 0;
    let count = phases[0].duration;

    function runPhase() {
      const phase = phases[phaseIdx];
      phaseEl.textContent = phase.name;
      countEl.textContent = count;
      document.getElementById('breathInstruction').textContent = phase.instruction;

      circle.classList.remove('inhale', 'exhale');
      if (phase.class) circle.classList.add(phase.class);
      circle.textContent = phase.name;
    }

    runPhase();

    breathInterval = setInterval(() => {
      count--;
      if (count < 0) {
        phaseIdx = (phaseIdx + 1) % phases.length;
        count = phases[phaseIdx].duration;
        runPhase();
      } else {
        countEl.textContent = count;
      }
    }, 1000);
  }

  function stopBreathing() {
    if (breathInterval) { clearInterval(breathInterval); breathInterval = null; }
  }

  // ── SETTINGS MODAL ───────────────────────────────────────────────
  window.openSettings = function () {
    if (settingsModal) settingsModal.classList.add('active');
  };

  window.closeSettings = function () {
    if (settingsModal) settingsModal.classList.remove('active');
  };

  document.getElementById('saveSettings')?.addEventListener('click', () => {
    const name = document.getElementById('settingName').value.trim();
    if (name) {
      userName = name;
      localStorage.setItem('mc_name', name);
      updateUserDisplay();
    }
    closeSettings();
  });

  function loadSettings() {
    const nameInput = document.getElementById('settingName');
    if (nameInput) nameInput.value = userName;
  }

  function updateUserDisplay() {
    const nameEl = document.getElementById('userDisplayName');
    const avatarEl = document.getElementById('userDisplayAvatar');
    if (nameEl) nameEl.textContent = userName;
    if (avatarEl) avatarEl.textContent = userName.charAt(0).toUpperCase();
  }

  // ── EMERGENCY HIGHLIGHT ──────────────────────────────────────────
  function highlightEmergency() {
    const card = document.querySelector('.emergency-card');
    if (card) {
      card.style.boxShadow = '0 0 20px rgba(239,68,68,0.4)';
      card.style.borderColor = 'rgba(239,68,68,0.5)';
      setTimeout(() => {
        card.style.boxShadow = '';
        card.style.borderColor = '';
      }, 4000);
    }
  }

  // ── WELCOME SCREEN (rebuild on new chat) ─────────────────────────
  function buildWelcomeScreen() {
    // Already in DOM – just return the existing one unhidden
    const ws = document.getElementById('welcomeScreen');
    if (ws) ws.style.display = '';
    return ws;
  }

  // ── MODAL CLOSE ON OVERLAY CLICK ────────────────────────────────
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('active');
        stopBreathing();
      }
    });
  });

  // ── UTILS ────────────────────────────────────────────────────────
  function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function now() {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  function generateId() {
    return Math.random().toString(36).substr(2, 9);
  }

  function escapeHtml(text) {
    const el = document.createElement('div');
    el.textContent = text;
    return el.innerHTML;
  }

  // ── GREET ON LOAD + URL PARAMS (?mood= / ?topic=) ────────────────
  const params = new URLSearchParams(window.location.search);
  const moodParam = params.get('mood');
  const topicParam = params.get('topic');

  const moodMap = {
    great: { emoji: '😊', msg: 'I am feeling good today! 😊' },
    neutral: { emoji: '😐', msg: 'I am feeling just okay today. 😐' },
    sad: { emoji: '😔', msg: 'I have been feeling down lately. 😔' },
    anxious: { emoji: '😰', msg: 'I have been feeling anxious and worried. 😰' },
    angry: { emoji: '😠', msg: 'I have been feeling really angry and frustrated. 😠' }
  };

  // Topic map – maps URL ?topic= value → a natural first message
  const topicMap = {
    anxiety: 'I want to understand and manage my anxiety better.',
    depression: 'I have been experiencing depression and want to learn more about it.',
    stress: 'I am dealing with a lot of stress and burnout. Can you help me?',
    trauma: 'I think I may be dealing with trauma or PTSD. Can we talk about it?',
    resilience: 'I want to learn how to build more resilience and bounce back from hard times.',
    sleep: 'I have been struggling with sleep problems. What can I do?',
    breathing: 'Can you guide me through a breathing exercise to help me calm down?',
    coping: 'I want to learn coping strategies to handle difficult emotions.',
    professional: 'I am thinking about seeing a therapist. Can you help me understand my options?'
  };

  setTimeout(() => {
    if (moodParam && moodMap[moodParam]) {
      // Mood-based entry from landing page mood check-in
      if (welcomeScreen) welcomeScreen.style.display = 'none';
      const { emoji, msg } = moodMap[moodParam];
      appendMessage('user', msg);
      messageCount++;
      const typingId = showTyping();
      setTimeout(() => {
        removeTyping(typingId);
        const moodReply = MindCareAI.moodResponses[emoji] ||
          'Thank you for sharing how you feel. Would you like to tell me more?';
        appendBotMessage(moodReply, ['Tell me more', 'I want coping techniques', 'I just need to talk']);
      }, 1200);

    } else if (topicParam && topicMap[topicParam]) {
      // Topic-based entry from resource cards / footer links
      if (welcomeScreen) welcomeScreen.style.display = 'none';
      const topicMsg = topicMap[topicParam];
      appendMessage('user', topicMsg);
      messageCount++;
      saveNewSession(topicMsg);
      const typingId = showTyping();
      setTimeout(() => {
        removeTyping(typingId);
        const resp = MindCareAI.getResponse(topicMsg);
        appendBotMessage(resp.text, resp.quickReplies, resp.intent);
      }, 1300);

    } else {
      // Default greeting
      const welcome = MindCareAI.getResponse('hello');
      appendBotMessage(welcome.text, welcome.quickReplies);
      messageCount++;
      if (welcomeScreen) welcomeScreen.style.display = 'none';
    }
  }, 800);
});
