# Plan v2 — feature

- Trạng thái: approved
- Ngày tạo: 2026-08-05T15:05:00Z
- Thay đổi so với bản trước: Tra loi Q1-Q5: hero dung rotating tech-cards 3D, contact chi mailto/tel/LinkedIn (bo API /api/contact), EN-only ban dau, co Download CV, deploy Vercel. Plan approved, san sang build.
- Dựa trên SRS: v1

## Câu hỏi đã trả lời (xem chi tiết trong questions.json)

| ID | Câu hỏi (tóm tắt) | Trả lời |
|----|---|---|
| Q1 | Phong cách 3D hero | (C) Rotating tech-cards 3D |
| Q2 | Contact có cần backend? | Không — chỉ mailto/tel/LinkedIn |
| Q3 | Ngôn ngữ | EN-only ban đầu, translation-key-ready |
| Q4 | Download CV? | Có — /public/cv-nguyen-van-truong.pdf |
| Q5 | Deploy | Vercel |

Không còn câu hỏi blocksApproval=true đang mở → plan **approved**.

## Task: project-scaffold — Khởi tạo dự án Next.js 14 (App Router) + Tailwind + R3F base

**UI**
- RootLayout: default
- ThemeProvider (dark/light): light, dark, system

**Logic**
- Cấu hình tsconfig strict, eslint, prettier
- Setup Tailwind + shadcn/ui base tokens (color, spacing, typography)
- Cài react-three-fiber, @react-three/drei, three, framer-motion
- Setup cấu trúc thư mục: src/app, src/components/{ui,sections,three}, src/lib, src/data
- Tạo src/data/profile.ts chứa toàn bộ content trích từ CV (summary, skills, experience, education) dạng typed object — nguồn dữ liệu tĩnh duy nhất cho toàn site

**API**
- Không có

**Luồng chạy**
- npx create-next-app → cài dependencies → cấu hình Tailwind/shadcn → tạo data layer → verify build chạy local

**Non-functional**
- Responsive: mobile, tablet, desktop
- A11y: Cấu hình font/contrast base đạt AA ngay từ token gốc
- i18n: EN-only cho ban dau (Q3). To chuc text qua constant/data file (khong hardcode rai rac) de de chuyen sang i18n that (next-intl) sau nay, nhung KHONG setup i18n switch trong scope nay.
- Analytics: Setup Vercel Analytics (Q5 xac nhan deploy Vercel)
- Performance: Bật next/font, image optimization mặc định
- SEO: Tạo metadata mặc định (title, description, OG image placeholder)

**Phụ thuộc**: không có
**Câu hỏi liên quan**: Q3, Q5 (đã trả lời)

## Task: layout-navigation — Navbar, smooth-scroll section nav, footer

**UI**
- Navbar: idle, scrolled (compact), mobile-menu-open
- MobileMenuDrawer: closed, open
- Footer: default

**Logic**
- Active-section highlight dựa trên IntersectionObserver theo từng <section id>
- Smooth scroll tới section khi click nav item (scroll-behavior + focus management)
- Theme toggle (dark/light) lưu localStorage
- Toggle ngôn ngữ VI/EN nếu Q3 xác nhận song ngữ

**API**
- Không có

**Luồng chạy**
- Click nav item → scroll tới section tương ứng → nav item active cập nhật theo scroll position
- Mobile: tap hamburger → mở drawer → chọn mục → đóng drawer + scroll

**Non-functional**
- Responsive: mobile: hamburger menu, tablet/desktop: full nav bar
- A11y: nav là <nav aria-label='Main'>, hamburger có aria-expanded, focus trap trong drawer khi mở
- i18n: Nhãn menu qua translation key nếu song ngữ
- Analytics: event nav_click với section name
- Performance: —
- SEO: Dùng thẻ <nav>/<header>/<footer> ngữ nghĩa đúng chuẩn semantic HTML

**Phụ thuộc**: project-scaffold
**Câu hỏi liên quan**: Q3 (đã trả lời)

## Task: hero-3d-scene — Hero section với scene 3D (React Three Fiber) làm điểm nhấn chính

**UI**
- HeroSection: 3d-loading, 3d-loaded, 3d-fallback-static (reduced-motion / low-end / WebGL unsupported)
- Hero3DCanvas: idle-animation, on-hover/on-drag interaction
- CTAButtons (View Work / Contact / Download CV): default, hover, focus

**Logic**
- Q1 xac nhan: hero dung (C) Rotating tech-cards 3D - card logo React/Next/Vue/TypeScript/Zustand/Web3(wagmi)/Node xoay quanh 1 truc, dung @react-three/drei <Float> + instancing don gian, khong dung particle system hay avatar model
- Lazy-load Canvas 3D bằng next/dynamic (ssr:false) để không chặn TTI
- Kiểm tra prefers-reduced-motion và WebGL support → fallback ảnh/illustration tĩnh nếu không hỗ trợ
- Auto-rotate camera nhẹ khi idle; OrbitControls giới hạn góc xoay/zoom để tránh user bị 'lạc' trong scene

**API**
- Không có

**Luồng chạy**
- Load trang → hiện skeleton/loading nhẹ → Canvas 3D mount sau khi hydrate → nếu thiết bị yếu/không hỗ trợ WebGL → hiện ảnh tĩnh thay thế
- User kéo/hover scene → object phản hồi tương tác nhẹ (rotate theo con trỏ) → không chặn scroll trang

**Non-functional**
- Responsive: mobile: scene đơn giản hoá/giảm poly count hoặc thay bằng ảnh tĩnh để tiết kiệm pin/CPU, desktop: full interactive scene
- A11y: Canvas 3D có aria-hidden='true' + text content thật (h1/h2, CTA) tồn tại song song, không phụ thuộc 3D để truyền tải thông tin, Tôn trọng prefers-reduced-motion
- i18n: Text hero (tiêu đề, subtitle) qua translation key nếu song ngữ
- Analytics: event hero_cta_click theo từng CTA
- Performance: Giới hạn poly count, dùng instancing nếu nhiều object lặp, giới hạn devicePixelRatio, dispose geometry/material khi unmount
- SEO: Nội dung text hero phải render server-side (không phụ thuộc canvas) để crawler đọc được

**Phụ thuộc**: project-scaffold
**Câu hỏi liên quan**: Q1 (đã trả lời)

## Task: about-section — Section About/Summary (giới thiệu bản thân từ CV summary)

**UI**
- AboutSection: default, in-view (scroll-reveal animation)

**Logic**
- Render nội dung summary từ src/data/profile.ts
- Scroll-reveal animation bằng framer-motion whileInView (chạy 1 lần, tôn trọng reduced-motion)

**API**
- Không có

**Luồng chạy**
- User scroll tới section → nội dung fade/slide vào view

**Non-functional**
- Responsive: mobile: 1 cột, desktop: 2 cột (text + ảnh/illustration hoặc mini 3D icon)
- A11y: Heading hierarchy đúng thứ tự (h2 sau h1 của Hero)
- i18n: Text qua translation key nếu song ngữ
- Analytics: —
- Performance: —
- SEO: Text đầy đủ trong HTML, không render qua canvas/image

**Phụ thuộc**: project-scaffold

## Task: skills-section — Section Technical Skills (nhóm theo category) — có thể dùng 3D tag-cloud tuỳ Q1

**UI**
- SkillsSection: default
- SkillCategoryGroup (Languages/Frontend/State/Forms/API/Viz/Web3/Tools/Backend): default, hover
- SkillBadge: default, hover

**Logic**
- Group skills từ profile.ts theo đúng 9 nhóm trong CV (Languages, Frontend, State/Data, Forms, API/Realtime, Visualization/Maps, Web3, Tools, Backend Basics)
- Q1 xac nhan (C): data skill nay duoc tai su dung truc tiep cho hero-3d-scene (cung 1 danh sach tech de render card 3D)

**API**
- Không có

**Luồng chạy**
- User scroll tới section → các nhóm skill hiện dạng badge/grid, có thể filter theo category (tuỳ nice-to-have)

**Non-functional**
- Responsive: mobile: badge wrap tự do, desktop: grid theo cột cố định
- A11y: Badge có đủ contrast, không chỉ dựa vào màu để phân biệt category — kèm label text
- i18n: Tên category qua translation key nếu song ngữ; tên công nghệ giữ nguyên
- Analytics: —
- Performance: —
- SEO: —

**Phụ thuộc**: project-scaffold
**Câu hỏi liên quan**: Q1 (đã trả lời)

## Task: experience-timeline — Timeline kinh nghiệm làm việc (EKOTEK / Freelancer / VNPT Technology + các dự án con)

**UI**
- ExperienceTimeline: default
- TimelineItem (company + role + date range): collapsed, expanded
- ProjectCard (trong mỗi TimelineItem: AML, HRM, Taxi Admin, SANO, METAME, EC Platform, AVT, MARINER25, DX Modules...): default, hover

**Logic**
- Data model: Company → Role → date range → list Project { name, description, techStack[], highlights[] }
- Expand/collapse từng company để không dump toàn bộ text 1 lúc (CV khá dài — 3 công ty, ~9 dự án)
- Tech stack hiển thị dạng badge nhỏ, dùng chung SkillBadge component với skills-section

**API**
- Không có

**Luồng chạy**
- User scroll tới section → thấy timeline dạng dọc theo thời gian (mới nhất trước) → click 1 company/project để expand chi tiết

**Non-functional**
- Responsive: mobile: timeline 1 cột, line bên trái, desktop: timeline căn giữa hoặc zig-zag 2 bên
- A11y: Expand/collapse dùng button thật với aria-expanded, không chỉ div onClick
- i18n: Label UI (vd 'Xem thêm') qua translation key; nội dung mô tả dự án giữ nguyên văn CV hoặc dịch tuỳ Q3
- Analytics: event timeline_project_expand theo taskId dự án
- Performance: Virtualization không cần thiết vì data nhỏ (~9 project), nhưng tránh render ảnh nặng nếu có
- SEO: Toàn bộ nội dung dự án nằm trong DOM (không ẩn hoàn toàn khi collapsed — dùng CSS collapse, không unmount, để crawler đọc được)

**Phụ thuộc**: project-scaffold

## Task: education-contact-section — Section Education + Contact (form/liên hệ + social links + optional CV download)

**UI**
- EducationCard (Dai hoc Bach Khoa Ha Noi): default
- ContactSection: default
- SocialLinks (mailto, tel, LinkedIn): default, hover
- DownloadCVButton: default, hover

**Logic**
- Q2 xac nhan: KHONG dung form/backend. Chi render link mailto:truong8dt@gmail.com, tel:+84978803231, va LinkedIn href. Khong can Zod/API cho task nay.
- Q4 xac nhan: co Download CV - link toi file tinh /public/cv-nguyen-van-truong.pdf, track event download

**API**
- Không có

**Luồng chạy**
- User click email/phone/LinkedIn -> mo app tuong ung (mailto:/tel:/tab moi)
- User click Download CV -> tai file PDF tinh, khong goi API

**Non-functional**
- Responsive: mobile: form 1 cột full-width, desktop: form max-width căn giữa hoặc 2 cột (info + form)
- A11y: Mọi input có label thật, error message gắn aria-describedby, aria-live cho vùng thông báo success/error
- i18n: Label form, thông báo lỗi qua translation key nếu song ngữ
- Analytics: event cv_download_click, event social_link_click theo type (email/phone/linkedin)
- Performance: —
- SEO: Thông tin liên hệ (email/phone) xuất hiện dạng text thật trong HTML để phục vụ local SEO, không chỉ trong ảnh

**Phụ thuộc**: project-scaffold
**Câu hỏi liên quan**: Q2, Q4 (đã trả lời)

## Task: performance-a11y-3d — Hardening hiệu năng & khả năng tiếp cận riêng cho tầng 3D (toàn site)

**UI**
- PerfMonitor (dev-only, @react-three/drei Stats): dev-only, không render production
- WebGLFallbackNotice: shown-when-unsupported

**Logic**
- Đo FPS scene 3D trên thiết bị tầm trung, đặt ngưỡng chấp nhận được (>= 30fps mobile mid-range)
- Code-split toàn bộ code liên quan three.js ra khỏi bundle chính (dynamic import, không import three ở page khác)
- Dispose đúng geometry/material/texture khi component unmount để tránh leak khi navigate SPA
- Kiểm tra prefers-reduced-motion áp dụng nhất quán cho mọi animation (không chỉ hero)

**API**
- Không có

**Luồng chạy**
- Build production → chạy Lighthouse (mobile + desktop) → nếu LCP/TBT vượt ngưỡng do bundle 3D → tối ưu tiếp (giảm poly, giảm draw call, lazy hơn nữa)

**Non-functional**
- Responsive: Xác nhận scene 3D không làm layout shift trên mọi breakpoint
- A11y: Audit toàn site bằng axe/Lighthouse a11y, đảm bảo phần 3D không phá luồng tab/focus order
- i18n: —
- Analytics: —
- Performance: Target: Lighthouse Performance >= 85 mobile, LCP < 2.5s, bundle three.js tách riêng chunk và lazy-load
- SEO: Xác nhận toàn bộ text quan trọng (hero, about, experience, contact) không phụ thuộc JS 3D để crawl/index đúng

**Phụ thuộc**: hero-3d-scene
