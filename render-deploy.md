# 🚀 Hướng Dẫn Deploy lên Render

## 📋 Điều kiện tiên quyết
- Tài khoản GitHub (đã có)
- Tài khoản Render (https://render.com)
- Repository DTDM2 trên GitHub

## 🔧 Cấu hình trên Render

### Bước 1: Kết nối GitHub
1. Vào https://render.com
2. Đăng nhập bằng GitHub
3. Cho phép Render truy cập repositories

### Bước 2: Tạo Web Service
1. Nhấp **"+ New"** → **"Web Service"**
2. Chọn repository **`DTDM2`**
3. Nhấp **"Connect"**

### Bước 3: Cấu hình Deploy
Render sẽ tự động phát hiện `render.yaml` và apply cấu hình:

| Tùy chọn | Giá trị |
|---------|--------|
| Name | `DTDM2` |
| Environment | `Node` |
| Build Command | `npm install` |
| Start Command | `npm start` |
| Instance Type | `Free` |
| Region | `Singapore` |

### Bước 4: Environment Variables
Render sẽ tự động lấy từ `render.yaml`, nhưng bạn có thể override:

```yaml
NODE_ENV=production
PORT=3000
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
ALLOWED_ORIGINS=*
ALLOWED_IPS=
```

### Bước 5: Deploy
1. Nhấp **"Create Web Service"**
2. Chờ build hoàn tất (2-3 phút)
3. Xem live URL: `https://dtdm2.onrender.com`

---

## 🔐 Tính Năng Bảo Mật

### 1. **HTTPS/SSL** ✅
- Tự động từ Render
- Bắt buộc HTTP → HTTPS redirect

### 2. **Rate Limiting** ✅
- 100 requests per IP per 15 minutes
- Chống DDoS cơ bản

### 3. **CORS** ✅
- Cho phép all origins (*)
- Có thể config trong `ALLOWED_ORIGINS`

### 4. **IP Whitelist** ✅
- Optional, config trong `ALLOWED_IPS`
- Tìm hiểu IP của bạn: https://whatismyipaddress.com

### 5. **Security Headers** ✅
```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000
Content-Security-Policy: default-src 'self'
```

### 6. **Load Balancer** ✅
- Render quản lý tự động
- Auto-scaling (trên paid plans)
- Health checks mỗi 5 phút

---

## 📊 Monitoring & Logs

### Xem Logs
1. Vào Web Service
2. Nhấp **"Logs"** tab
3. Xem real-time logs

### Xem Metrics
1. Nhấp **"Metrics"** tab
2. Xem CPU, Memory, Requests

### Xem Events
1. Nhấp **"Events"** tab
2. Xem lịch sử deploy

---

## 🔄 Auto Deploy

Render sẽ **tự động deploy** khi:
- Bạn push lên branch `main`
- Cập nhật `render.yaml`
- Cập nhật `package.json`

Không cần làm gì thêm!

---

## 📝 Cập Nhật Code

Để cập nhật app:

```bash
# Commit changes
git add .
git commit -m "Update app"

# Push to GitHub
git push origin main

# Render sẽ tự động deploy trong 1-2 phút
```

---

## 💾 Files Quan Trọng

- **`render.yaml`** - Cấu hình Render (build, env, headers, etc)
- **`.env.example`** - Mẫu Environment Variables
- **`server.js`** - Express app với security middleware
- **`package.json`** - Dependencies (express, rate-limit, cors)

---

## 🆘 Troubleshooting

### Build Fails
- Xem logs chi tiết trong **"Logs"** tab
- Kiểm tra `package.json` có lỗi syntax?
- Chạy `npm install` locally để test

### App Crashes
- Xem **"Events"** tab để xem khi nào crash
- Kiểm tra logs xem lỗi gì
- Đảm bảo `npm start` chạy được locally

### High CPU/Memory
- Reduce `RATE_LIMIT_MAX_REQUESTS`
- Downgrade paid plan
- Tối ưu code

### IP Whitelist Block
- Kiểm tra IP của bạn: https://whatismyipaddress.com
- Thêm vào `ALLOWED_IPS` environment variable
- Test: `curl -I https://dtdm2.onrender.com`

---

## 🚀 Next Steps

1. ✅ Push code to GitHub
2. ✅ Deploy on Render
3. 📊 Monitor metrics
4. 🔒 Configure custom domain (optional)
5. 🌐 Add Cloudflare for extra protection (optional)

---

## 📚 Tài Liệu

- Render Docs: https://render.com/docs
- Express.js: https://expressjs.com
- Rate Limiter: https://github.com/nfriedly/express-rate-limit
- CORS: https://github.com/expressjs/cors

---

**Good luck! 🎉**
