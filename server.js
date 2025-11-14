const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// ============================================
// Security & Firewall Middleware
// ============================================

// 1. Trust proxy and Force HTTPS in production
app.set('trust proxy', 1);
app.use((req, res, next) => {
  // Check X-Forwarded-Proto header from proxy (Render uses this)
  if (process.env.NODE_ENV === 'production') {
    const isSecure = req.secure || req.get('x-forwarded-proto') === 'https';
    if (!isSecure && req.get('x-forwarded-proto') !== 'https') {
      return res.redirect(`https://${req.get('host')}${req.url}`);
    }
  }
  next();
});

// 2. IP Whitelist (if configured)
const allowedIPs = (process.env.ALLOWED_IPS || '').split(',').filter(Boolean);
if (allowedIPs.length > 0) {
  app.use((req, res, next) => {
    const clientIP = req.ip || req.connection.remoteAddress;
    console.log(`Request from IP: ${clientIP}`);
    if (!allowedIPs.includes(clientIP)) {
      console.warn(`Access denied for IP: ${clientIP}`);
      return res.status(403).json({ error: 'Access Denied' });
    }
    next();
  });
}

// 3. Rate Limiting
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || 900000),
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || 100),
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// 4. CORS Configuration
const cors = require('cors');
const allowedOrigins = (process.env.ALLOWED_ORIGINS || '*').split(',');
app.use(cors({
  origin: allowedOrigins.includes('*') ? '*' : allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  optionsSuccessStatus: 200
}));

// 5. Security Headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  // CSP cho phép tất cả (nếu bạn muốn strict hơn, thay đổi 'self' thành domain cụ thể)
  res.setHeader('Content-Security-Policy', "default-src 'self' 'unsafe-inline' 'unsafe-eval'");
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// 6. Request logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path} - IP: ${req.ip}`);
  next();
});

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API endpoint example
app.get('/api/hello', (req, res) => {
  res.json({
    message: 'Hello from Express API!',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
