# Plan v1 — feature

- Trạng thái: draft-pending-answers
- Ngày tạo: 2026-08-05T14:32:43Z
- Thay đổi so với bản trước: bản đầu tiên
- Dựa trên SRS: v1 (nguồn: CV, không phải SRS chuẩn — xem ghi chú đầu srs-v1.md)

## Câu hỏi đang mở

| ID | Câu hỏi | Gửi cho | Chặn duyệt? |
|----|---------|---------|-------------|
| Q1 | Phong cách 3D cho Hero: (A) particle/abstract network, (B) low-poly avatar/desk scene, (C) rotating tech-cards 3D | PM | **Có** |
| Q2 | Contact form cần gửi email thật (backend) hay chỉ mailto/social links? | BE | **Có** |
| Q3 | Ngôn ngữ: chỉ VI / chỉ EN / song ngữ VI-EN? | PM | Không |
| Q4 | Có cần nút Download CV (PDF) không? | PM | Không |
| Q5 | Deploy target: Vercel hay khác? | PM | Không |

## Task: project-scaffold — Khởi tạo dự án Next.js 14 (App Router) + Tailwind + R3F base

**UI**
- RootLayout: default
- ThemeProvider (dark/light): light, dark, system

**Logic**
- Cấu hình tsconfig strict, eslint, prettier
- Setup Tailwind + shadcn/ui base tokens
- Cài react-three-fiber, @react-three/drei, three, framer-motion
- Cấu trúc thư mục: src/app, src/components/{ui,sections,three}, src/lib, src/data
- Tạo src/data/profile.ts chứa content trích từ CV (nguồn dữ liệu tĩnh duy nhất)

**API**
- Không có

**Luồng chạy**
- create-next-app → cài dependencies → cấu hình Tailwind/shadcn → tạo data layer → verify build local

**Non-functional**
- Responsive: mobile, tablet, desktop
- A11y: cấu hình font/contrast base đạt AA từ token gốc
- i18n: setup base nếu Q3 chọn song ngữ, để placeholder nếu không
- Analytics: setup Vercel Analytics/Plausible (tuỳ Q5)
- Performance: bật next/font, image optimization mặc định
- SEO: metadata mặc định (title, description, OG image placeholder)

**Phụ thuộc**: không có
**Câu hỏi liên quan**: Q3, Q5

## Task: layout-navigation — Navbar, smooth-scroll section nav, footer

**UI**
- Navbar: idle, scrolled (compact), mobile-menu-open
- MobileMenuDrawer: closed, open
- Footer: default

**Logic**
- Active-section highlight qua IntersectionObserver theo từng section
- Smooth scroll khi click nav item, quản lý focus
- Theme toggle lưu localStorage
- Toggle ngôn ngữ VI/EN nếu Q3 xác nhận song ngữ

**API**
- Không có

**Luồng chạy**
- Click nav item → scroll tới section → nav item active cập nhật theo scroll
- Mobile: tap hamburger → mở drawer → chọn mục → đóng drawer + scroll

**Non-functional**
- Responsive: mobile hamburger menu; tablet/desktop full nav bar
- A11y: nav có aria-label, hamburger có aria-expanded, focus trap trong drawer
- i18n: nhãn menu qua translation key nếu song ngữ
- Analytics: event nav_click theo section
- Performance: —
- SEO: thẻ nav/header/footer semantic đúng chuẩn

**Phụ thuộc**: project-scaffold
**Câu hỏi liên quan**: Q3

## Task: hero-3d-scene — Hero section với scene 3D (React Three Fiber)

**UI**
- HeroSection: 3d-loading, 3d-loaded, 3d-fallback-static (reduced-motion/low-end/no WebGL)
- Hero3DCanvas: idle-animation, on-hover/on-drag interaction
- CTAButtons (View Work / Contact / Download CV): default, hover, focus

**Logic**
- Scene cụ thể phụ thuộc câu trả lời Q1
- Lazy-load Canvas bằng next/dynamic (ssr:false)
- Kiểm tra prefers-reduced-motion + WebGL support → fallback ảnh tĩnh
- Auto-rotate camera nhẹ khi idle; OrbitControls giới hạn góc/zoom

**API**
- Không có

**Luồng chạy**
- Load trang → skeleton nhẹ → Canvas mount sau hydrate → fallback ảnh tĩnh nếu thiết bị yếu
- User hover/kéo scene → object phản hồi nhẹ, không chặn scroll

**Non-functional**
- Responsive: mobile giảm poly/thay ảnh tĩnh; desktop full interactive
- A11y: Canvas aria-hidden, text thật (h1/h2/CTA) tồn tại song song; tôn trọng reduced-motion
- i18n: text hero qua translation key nếu song ngữ
- Analytics: event hero_cta_click theo CTA
- Performance: giới hạn poly count, instancing, giới hạn devicePixelRatio, dispose khi unmount
- SEO: text hero render server-side, không phụ thuộc canvas

**Phụ thuộc**: project-scaffold
**Câu hỏi liên quan**: Q1

## Task: about-section — Section About/Summary

**UI**
- AboutSection: default, in-view (scroll-reveal)

**Logic**
- Render summary từ src/data/profile.ts
- Scroll-reveal bằng framer-motion whileInView (1 lần, tôn trọng reduced-motion)

**API**
- Không có

**Luồng chạy**
- User scroll tới section → nội dung fade/slide vào view

**Non-functional**
- Responsive: mobile 1 cột; desktop 2 cột (text + ảnh/mini 3D icon)
- A11y: heading hierarchy đúng thứ tự
- i18n: text qua translation key nếu song ngữ
- Analytics: —
- Performance: —
- SEO: text đầy đủ trong HTML

**Phụ thuộc**: project-scaffold
**Câu hỏi liên quan**: không có

## Task: skills-section — Section Technical Skills

**UI**
- SkillsSection: default
- SkillCategoryGroup (9 nhóm theo CV): default, hover
- SkillBadge: default, hover

**Logic**
- Group skills theo đúng 9 nhóm trong CV
- Nếu Q1 = (C) rotating tech-cards → data này có thể tái dùng cho hero, cần Q1 trước khi finalize

**API**
- Không có

**Luồng chạy**
- User scroll tới section → skill hiện dạng badge/grid theo category

**Non-functional**
- Responsive: mobile badge wrap tự do; desktop grid cột cố định
- A11y: badge đủ contrast, không chỉ dựa màu để phân biệt category
- i18n: tên category qua translation key nếu song ngữ; tên công nghệ giữ nguyên
- Analytics: —
- Performance: —
- SEO: —

**Phụ thuộc**: project-scaffold
**Câu hỏi liên quan**: Q1

## Task: experience-timeline — Timeline kinh nghiệm làm việc

**UI**
- ExperienceTimeline: default
- TimelineItem (company + role + date range): collapsed, expanded
- ProjectCard (AML, HRM, Taxi Admin, SANO, METAME, EC Platform, AVT, MARINER25, DX Modules...): default, hover

**Logic**
- Data model: Company → Role → date range → Project { name, description, techStack[], highlights[] }
- Expand/collapse từng company (3 công ty, ~9 dự án — không dump hết 1 lúc)
- Tech stack dùng chung SkillBadge với skills-section

**API**
- Không có

**Luồng chạy**
- User scroll tới timeline (mới nhất trước) → click company/project để expand chi tiết

**Non-functional**
- Responsive: mobile 1 cột, line trái; desktop căn giữa hoặc zig-zag
- A11y: expand/collapse dùng button thật với aria-expanded
- i18n: label UI qua translation key nếu song ngữ; mô tả dự án giữ nguyên/dịch tuỳ Q3
- Analytics: event timeline_project_expand
- Performance: không cần virtualization (data nhỏ), tránh ảnh nặng
- SEO: nội dung nằm trong DOM kể cả khi collapsed (CSS collapse, không unmount)

**Phụ thuộc**: project-scaffold
**Câu hỏi liên quan**: không có

## Task: education-contact-section — Education + Contact

**UI**
- EducationCard (ĐH Bách Khoa Hà Nội): default
- ContactSection: idle, submitting, success, error
- ContactForm (nếu Q2 = cần backend): idle, validating, submitting, submitted, error
- SocialLinks (Email, Phone, LinkedIn): default, hover
- DownloadCVButton (nếu Q4 = có): default, hover

**Logic**
- Nếu Q2 = mailto/social-only: chỉ render link mailto:/tel:, không cần form/Zod/API
- Nếu Q2 = cần email thật: React Hook Form + Zod, submit qua Route Handler
- Nếu Q4 = có: link CV tĩnh trong /public + track download

**API**
- `POST /api/contact` — request: `{ name: string; email: string; message: string }`, response: `{ success: boolean; error?: string }` **(giả định — chưa xác nhận với BE qua Q2, mock: Route Handler trả success:true qua MSW handler trong lúc chờ trả lời)**

**Luồng chạy**
- Có form: điền → validate client (Zod) → submit → loading → success/error toast
- Chỉ social links: click email/phone/LinkedIn → mở app tương ứng

**Non-functional**
- Responsive: mobile form 1 cột full-width; desktop max-width căn giữa hoặc 2 cột
- A11y: label thật, error gắn aria-describedby, aria-live cho thông báo
- i18n: label form/lỗi qua translation key nếu song ngữ
- Analytics: event contact_submit_success / contact_submit_fail / cv_download_click
- Performance: —
- SEO: thông tin liên hệ dạng text thật trong HTML

**Phụ thuộc**: project-scaffold
**Câu hỏi liên quan**: Q2, Q4

## Task: performance-a11y-3d — Hardening hiệu năng & a11y cho tầng 3D

**UI**
- PerfMonitor (dev-only, drei Stats): dev-only, không render production
- WebGLFallbackNotice: shown-when-unsupported

**Logic**
- Đo FPS trên thiết bị tầm trung, ngưỡng >= 30fps mobile mid-range
- Code-split toàn bộ code three.js khỏi bundle chính
- Dispose geometry/material/texture khi unmount
- prefers-reduced-motion áp dụng nhất quán toàn site

**API**
- Không có

**Luồng chạy**
- Build production → Lighthouse (mobile + desktop) → tối ưu tiếp nếu LCP/TBT vượt ngưỡng

**Non-functional**
- Responsive: xác nhận scene 3D không gây layout shift ở mọi breakpoint
- A11y: audit toàn site bằng axe/Lighthouse, 3D không phá tab/focus order
- i18n: —
- Analytics: —
- Performance: Lighthouse >= 85 mobile, LCP < 2.5s, three.js tách chunk riêng + lazy-load
- SEO: text quan trọng không phụ thuộc JS 3D

**Phụ thuộc**: hero-3d-scene
**Câu hỏi liên quan**: không có
