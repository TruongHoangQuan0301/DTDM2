# My Express App

Ứng dụng web đơn giản sử dụng Node.js + Express, sẵn sàng deploy lên Render.

## Cấu trúc project

```
my-express-app/
├── public/
│   └── index.html          # Trang chính
├── server.js               # Server Express
├── package.json            # Dependencies
├── .gitignore             # Git ignore
└── README.md              # File này
```

## Cài đặt và chạy locally

1. **Cài đặt dependencies:**
   ```bash
   npm install
   ```

2. **Chạy server:**
   ```bash
   npm start
   ```

3. **Truy cập ứng dụng:**
   Mở trình duyệt và vào: `http://localhost:3000`

## Deploy lên Render

### Bước 1: Chuẩn bị GitHub Repository
1. Tạo repository mới trên GitHub
2. Push project lên:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

### Bước 2: Tạo Web Service trên Render
1. Đăng nhập vào [render.com](https://render.com)
2. Click **New +** → **Web Service**
3. Chọn **Connect a repository** hoặc nhập URL repo
4. Chọn GitHub repo của bạn
5. Điền thông tin:
   - **Name:** my-express-app (hoặc tên khác)
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Node Version:** 18 (optional, có thể để mặc định)

### Bước 3: Cấu hình Environment Variables (nếu cần)
1. Trong phần **Environment**, thêm các biến nếu cần
2. Ứng dụng này không cần variables bắt buộc

### Bước 4: Deploy
1. Click **Create Web Service**
2. Render sẽ tự động build và deploy
3. Chờ khoảng 2-3 phút
4. Khi thấy "Your service is live", click vào URL để xem app

### Bước 5: Cập nhật ứng dụng
- Mỗi lần bạn push code lên GitHub, Render sẽ tự động build và deploy lại

## API Endpoints

- **GET /** - Trả về trang chính (index.html)
- **GET /api/hello** - API endpoint trả về JSON

## Ghi chú

- Port mặc định là 3000, nhưng Render sẽ set `PORT` environment variable tự động
- Ứng dụng sử dụng `process.env.PORT` để tương thích với Render
- Không cần Dockerfile, Render sẽ detect Node.js project tự động

## Troubleshooting

**Lỗi: "Build failed"**
- Kiểm tra file `package.json` có hợp lệ không
- Kiểm tra `server.js` không có syntax errors

**Lỗi: "Application crashed"**
- Xem logs trong Render dashboard
- Kiểm tra lại Start Command: `npm start`

**Port không đúng**
- Render sẽ tự động set PORT environment variable
- Ứng dụng này đã được cấu hình để dùng nó

---

Chúc bạn deploy thành công! 🎉
