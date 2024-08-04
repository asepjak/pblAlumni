document.addEventListener('DOMContentLoaded', function() {
    const chatForm = document.getElementById('chatForm');
    const messageInput = document.getElementById('messageInput');
    const chatMessages = document.getElementById('chatMessages');
    const topicButtons = document.querySelectorAll('.topic-btn');

    let currentTopic = 'seminar';

    topicButtons.forEach(button => {
      button.addEventListener('click', function() {
        currentTopic = this.dataset.topic;
        topicButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        chatMessages.innerHTML = ''; // Clear chat when changing topics
      });
    });

    chatForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const message = messageInput.value.trim();
      if (message) {
        addMessage('Anda', message);
        messageInput.value = '';
        // Simulate a response (you'd replace this with actual backend logic)
        setTimeout(() => {
          addMessage('Bot', `Ini adalah respon otomatis untuk topik ${currentTopic}.`);
        }, 1000);
      }
    });

    function addMessage(user, text) {
      const messageElement = document.createElement('div');
      messageElement.classList.add('message');
      messageElement.innerHTML = `
        <div class="user">${user}</div>
        <div class="text">${text}</div>
      `;
      chatMessages.appendChild(messageElement);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  });