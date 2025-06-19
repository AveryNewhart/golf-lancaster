<template>
  <footer>
    <div class="footer-content">
      Questions? Email me.
      <a href="mailto:newhartreeceavery@gmail.com" class="email-link">
        newhartreeceavery@gmail.com
      </a>
    </div>
  </footer>
</template>

<style scoped>
footer {
background-color: rgb(0, 35, 0);
border-top: 2px solid white;
padding: 1rem;
text-align: center;
}

.footer-content {
color: white;
font-size: 0.9rem;
}

.email-link {
color: white;
text-decoration: underline;
margin-left: 0.3rem;
}

.dark-mode footer {
background-color: #1a365d;
border-top-color: #2d3748;
}

.dark-mode .footer-content {
color: #e2e8f0;
}

.dark-mode .email-link {
color: #a0aec0;
}
</style>