# DESIGN.md

> 像一份安静、可信的本地录音档案：内容透明，隐私边界清楚，审核信息一眼可查。

## 1. Visual Theme & Atmosphere

**Style**: Quiet Signal / 安静声迹
**Keywords**: 隐私优先、离线、清晰、可信、声波、留白、克制、可审计
**Tone**: 冷静而有人情味，像一台专注记录的随身设备 — NOT 霓虹 AI、营销浮夸、企业后台
**Feel**: 一段声音被收进磨砂纸质档案，青绿色细线标记它仍只属于用户。

**Interaction Tier**: L1 精致静态
**Dependencies**: CSS only；无追踪脚本、无动画框架、无 Cookie banner 需求

页面范围：

- `/`：产品说明与隐私主张
- `/privacy/`：Apple 必填隐私政策
- `/support/`：Apple 必填支持页面与真实联系方式
- `/beta/`：后续测试分发入口；首版默认不出现在主导航

## 2. Color Palette & Roles

```css
:root {
  --bg: #F4F7F5;
  --surface: #FFFFFF;
  --surface-alt: #EAF2EF;
  --surface-hover: #E1EEEA;

  --border: #CFDDD8;
  --border-hover: #76A99B;

  --text: #10241F;
  --text-secondary: #466059;
  --text-tertiary: #6B807A;

  --accent: #087F68;
  --accent-hover: #066653;

  --bg-rgb: 244, 247, 245;
  --accent-rgb: 8, 127, 104;

  --success: #087F68;
  --error: #B33A3A;
  --warning: #9A6717;
  --focus: #1268A8;
}
```

**Color Rules:**

- 所有颜色只通过 CSS 变量引用，页面组件中不硬编码颜色。
- 青绿只用于链接、关键状态与主操作；录音红色只作为极小语义标记。
- 隐私政策正文保持高对比，不使用低透明度文字。
- 页面背景与表面保持轻微冷暖差，避免纯白医疗感。

## 3. Typography Rules

**Font Stack:**

```css
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@500;600;700&family=Noto+Sans+SC:wght@400;500;600;700&display=swap');
```

| Role | Font | Size | Weight | Line Height | Letter Spacing |
|------|------|------|--------|-------------|----------------|
| Hero H1 | Manrope, Noto Sans SC | clamp(2.75rem, 7vw, 5.75rem) | 600 | 0.98 | -0.045em |
| Section H2 | Manrope, Noto Sans SC | clamp(1.75rem, 4vw, 3rem) | 600 | 1.12 | -0.025em |
| H3 | Manrope, Noto Sans SC | 1.125rem | 600 | 1.35 | -0.01em |
| Body | Noto Sans SC, sans-serif | 1rem | 400 | 1.8 | 0.01em |
| Label | Manrope, Noto Sans SC | 0.75rem | 700 | 1.4 | 0.12em |
| Mono/Code | ui-monospace, SFMono-Regular | 0.875rem | 500 | 1.6 | 0 |

**Typography Rules:**

- 中文隐私正文最大行宽 72ch，行高不低于 1.8。
- 英文产品名用 Manrope，中文内容用 Noto Sans SC。
- 标题不用全大写；仅状态标签允许有限 uppercase。
- **NEVER use**: Inter、Arial 作为首选字体；装饰性衬线；手写字体。

**Text Decoration:**

- Hero H1：不使用渐变和投影；以字距、尺寸与波形留白建立识别度。
- Section H2：不使用渐变和投影。
- 小节标签：使用短青绿底线，不使用荧光高亮。
- 正文：无任何投影或渐变。

## 4. Component Stylings

### Buttons

```css
.button {
  min-height: 46px;
  padding: 0.75rem 1.1rem;
  border: 1px solid var(--accent);
  border-radius: 999px;
  color: var(--surface);
  background: var(--accent);
  font: 700 0.9rem/1 Manrope, sans-serif;
  transition: transform 160ms ease, background 160ms ease, border-color 160ms ease;
}
.button:hover { background: var(--accent-hover); border-color: var(--accent-hover); transform: translateY(-1px); }
.button:active { transform: translateY(0) scale(0.98); }
.button:focus-visible { outline: 3px solid rgba(var(--accent-rgb), 0.24); outline-offset: 3px; }
.button:disabled { opacity: 0.45; cursor: not-allowed; transform: none; }
.button--secondary { color: var(--accent); background: transparent; }
.button--secondary:hover { color: var(--accent-hover); background: var(--surface-alt); }
```

### Cards

```css
.card {
  border: 1px solid var(--border);
  border-radius: 20px;
  background: var(--surface);
  padding: clamp(1.25rem, 3vw, 2rem);
  transition: border-color 160ms ease, transform 160ms ease, box-shadow 160ms ease;
}
.card:hover { border-color: var(--border-hover); transform: translateY(-2px); box-shadow: 0 14px 34px rgba(var(--accent-rgb), 0.08); }
.card:focus-within { outline: 3px solid rgba(var(--accent-rgb), 0.18); outline-offset: 3px; }
```

### Navigation

```css
.nav {
  position: sticky;
  top: 0;
  z-index: 20;
  border-bottom: 1px solid transparent;
  background: rgba(var(--bg-rgb), 0.94);
}
.nav--scrolled { border-color: var(--border); }
.nav a { color: var(--text-secondary); text-decoration: none; }
.nav a:hover, .nav a[aria-current='page'] { color: var(--accent); }
.nav a:focus-visible { outline: 2px solid var(--focus); outline-offset: 5px; border-radius: 4px; }
```

### Links

```css
a { color: var(--accent); text-underline-offset: 0.22em; text-decoration-thickness: 1px; }
a:hover { color: var(--accent-hover); text-decoration-thickness: 2px; }
a:active { opacity: 0.78; }
a:focus-visible { outline: 2px solid var(--focus); outline-offset: 3px; border-radius: 3px; }
```

### Tags / Badges

```css
.badge {
  display: inline-flex;
  align-items: center;
  min-height: 28px;
  padding: 0.3rem 0.65rem;
  border: 1px solid var(--border);
  border-radius: 999px;
  color: var(--accent);
  background: var(--surface-alt);
  font: 700 0.72rem/1 Manrope, sans-serif;
  letter-spacing: 0.08em;
}
```

### Legal content and contact rows

```css
.legal { max-width: 72ch; }
.legal h2 { margin-top: 3rem; scroll-margin-top: 6rem; }
.legal p, .legal li { color: var(--text-secondary); }
.contact-row { display: grid; grid-template-columns: 9rem 1fr; gap: 1rem; padding: 1rem 0; border-bottom: 1px solid var(--border); }
```

## 5. Layout Principles

**Container:**

- Max width: 1180px
- Padding: `clamp(1.25rem, 4vw, 3rem)`
- Narrow variant: 760px

**Spacing Scale:**

- Section padding: `clamp(4.5rem, 10vw, 8rem)`
- Component gap: `clamp(1rem, 2.5vw, 1.75rem)`
- Card internal padding: `clamp(1.25rem, 3vw, 2rem)`

**Grid:**

```css
.grid {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: clamp(1rem, 2.5vw, 1.75rem);
}
.hero-copy { grid-column: 1 / span 8; }
.hero-signal { grid-column: 9 / -1; }
.feature-main { grid-column: span 7; }
.feature-side { grid-column: span 5; }
```

签名布局是“声迹边栏”：Hero 右侧以纯 CSS 水平细线表示录音波形，线条逐渐收束为一枚本地锁定状态，不使用人物图库或抽象 AI 球体。

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat | 无阴影、细边框 | 导航、法律正文、页脚 |
| Subtle | `0 8px 22px rgba(var(--accent-rgb), .05)` | 功能卡片 |
| Elevated | `0 18px 48px rgba(var(--accent-rgb), .10)` | 仅 Hero 声迹卡与下载提示 |

不用玻璃拟态或大面积模糊。深度主要依靠表面色差和间距建立。

## 7. Animation & Interaction

**Motion Philosophy**: 页面像录音指示灯一样稳定，只在加载与操作反馈时轻微呼吸。
**Tier**: L1

### Dependencies

```html
<!-- CSS only; no animation runtime -->
```

### Entrance Animation

```css
@keyframes settle-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.hero-copy, .hero-signal { animation: settle-in 520ms cubic-bezier(.2,.8,.2,1) both; }
.hero-signal { animation-delay: 90ms; }
```

### Scroll Behavior

```js
const nav = document.querySelector('.nav');
const syncNav = () => nav?.classList.toggle('nav--scrolled', window.scrollY > 8);
addEventListener('scroll', syncNav, { passive: true });
syncNav();
```

### Hover & Focus States

```css
:where(a, button):focus-visible { outline-color: var(--focus); }
.signal-line { transition: transform 180ms ease, opacity 180ms ease; }
.hero-signal:hover .signal-line { transform: scaleX(1.025); opacity: 0.88; }
```

### Special Effects

声迹由 9 条不同长度的 CSS 线段组成，进入时依次落位；不循环播放，避免让隐私与支持页面显得躁动。

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
```

## 8. Do's and Don'ts

### Do

- 使用真实产品名 SonaScribe 声忆 AI 与真实功能边界。
- 隐私页面明确区分设备本地数据、模型下载网络元数据和未来可能新增的服务。
- 在每个页面页脚保持 Privacy、Support 与版本日期入口。
- 支持页展示真实可用的联系邮箱和预计回复时间。
- 中英文内容信息等价，默认跟随浏览器语言并允许手动切换。
- 法律文本显示“生效日期”和“最近更新日期”。

### Don't

- ❌ 不宣称“零网络”，因为模型下载会访问 CDN/OSS。
- ❌ 不宣称“绝不收集任何数据”，除非第三方 SDK 与未来购买验证均已核实。
- ❌ 不把测试 IPA/APK 放入公开 Git 仓库。
- ❌ 不在公开页面暴露测试设备 UDID、OSS 密钥或签名资料。
- ❌ 不使用虚构客户评价、下载量或媒体 Logo。
- ❌ 不使用 AI 大脑、机器人、发光球体等通用 AI 视觉。
- ❌ 不用自动播放音频、背景视频或持续波形动画。
- ❌ 不隐藏联系方式或用仅有表单而无邮箱的支持方式。
- ❌ 不让审核必需页面依赖 JavaScript 才能显示正文。
- ❌ 不在隐私政策中写入尚未实现的数据导出或账户删除能力。

## 9. Responsive Behavior

**Breakpoints:**

| Name | Width | Key Changes |
|------|-------|-------------|
| Desktop | > 1024px | 12 列网格，Hero 文案与声迹并排 |
| Tablet | 641–1024px | Hero 7/5 比例，卡片两列或单列混排 |
| Mobile | ≤ 640px | 单列；导航允许换行；法律目录变为普通列表 |

**Touch Targets:** minimum 44×44px
**Collapsing Strategy:** 所有网格折叠为单列；声迹移至标题下方；联系信息标签和值上下排列；正文不横向滚动。

```css
@media (max-width: 640px) {
  .grid { grid-template-columns: 1fr; }
  .hero-copy, .hero-signal, .feature-main, .feature-side { grid-column: 1; }
  .contact-row { grid-template-columns: 1fr; gap: 0.35rem; }
  .nav-inner { align-items: flex-start; flex-wrap: wrap; }
  .legal { overflow-wrap: anywhere; }
}
```
