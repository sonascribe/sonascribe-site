# SonaScribe Website Design System

> 一款安静、可信的本地 AI 录音工具。网站先展示真实工作界面，再解释隐私机制。

## 1. Visual Theme & Atmosphere

**Direction:** Product clarity / 本地声迹

**Keywords:** 本地处理、真实产品、克制、清晰、专业、可验证

**Tone:** 主流消费级效率工具，而不是概念型 AI Demo。
**Signature:** Hero 下方是一块依据真实 App 信息架构构建的产品界面舞台；内容从录音列表进入摘要、行动项和带时间戳的逐字稿。

交互等级为 L1：仅保留首屏进入、导航状态和控件反馈。无滚动特效、无装饰性 3D、无虚构数据。

## 2. Color Palette & Roles

```css
:root {
  --bg: #f7f7f8;
  --surface: #ffffff;
  --surface-soft: #f1f3f5;
  --surface-dark: #18212b;
  --border: #dfe3e7;
  --border-strong: #c9d0d7;
  --text: #18212b;
  --text-secondary: #5d6670;
  --text-muted: #7f8993;
  --accent: #416c8d;
  --accent-dark: #2f526d;
  --accent-soft: #e4edf3;
  --recording: #c64d48;
  --focus: #1769aa;
}
```

- 大面积使用中性灰白，低饱和灰蓝承担主操作和状态；绿色只保留在 App 图标中。
- 红色仅用于录音语义，不用于营销装饰。
- 所有颜色必须由变量引用；正文达到 WCAG AA 对比度。

## 3. Typography Rules

- 品牌与英文数字：Manrope，500–700。
- 中文正文：Noto Sans SC，400–700；系统字体回退。
- Hero：`clamp(2.45rem, 4.6vw, 3.75rem)`，行高 1.13，最大两行。
- Section H2：`clamp(1.8rem, 3.25vw, 2.75rem)`，行高 1.2。
- 正文：16–19px，中文行高不低于 1.7，正文最大宽度 68ch。
- 不使用渐变字、文字阴影、全大写长标题。

## 4. Component Styling

- **导航：** 68px，粘性，滚动后显示细边框和白色半透明表面。
- **按钮：** 44px 以上点击高度，12px 圆角；主按钮为实心青绿，次按钮为文字链接。
- **产品窗口：** 20px 圆角、1px 边框、柔和阴影；内部沿用移动 App 的录音、任务、我的三栏语义。
- **场景项：** 使用横向文字分隔，不制作五张同构卡片。
- **功能段落：** 交替使用文字与真实界面片段，图文比例约 5:7。
- **数据流：** 三个连续节点表达“声音 → 本地转写 → 本地整理”，网络下载单独位于边界外。
- 链接、按钮具备 hover、active、focus-visible；禁用态不只依赖颜色。

## 5. Layout Principles

- 内容宽度 1200px，页面留白 `clamp(1.25rem, 4vw, 3rem)`。
- Hero 为居中价值主张，下方产品界面横跨容器，避免左右两栏模板感。
- 主要内容按 12 栏网格；功能段落左右交替，但移动端统一为文字在前。
- Section 间距 `clamp(5rem, 10vw, 8rem)`，同组信息使用 20–32px 间距。
- 移动端 360px 起无横向滚动，触控目标至少 44×44px。

## 6. Depth & Elevation

- 导航与正文以边框和色差分层。
- 产品窗口使用唯一的明显阴影：`0 28px 80px rgba(20, 35, 31, .12)`。
- 内部面板只用细边框或浅底色，不做卡片层层嵌套。
- 不使用玻璃拟态、发光描边和大面积模糊。

## 7. Animation & Interaction

- 首屏文案与产品窗口分别在 480ms / 620ms 内淡入并上移 10px。
- 产品窗口标签切换可展示“AI 提炼 / 逐字稿”，用于解释真实功能；支持键盘和 ARIA 状态。
- 导航滚动状态与按钮反馈 160ms；不做循环动画。
- `prefers-reduced-motion` 下关闭动画和顺滑滚动。

## 8. Responsive Behavior

- ≥ 1024px：完整产品窗口、双栏功能段落、横向场景列表。
- 720–1023px：产品窗口缩减侧栏宽度，功能段落保持双栏但降低间距。
- < 720px：导航压缩；产品窗口隐藏录音侧栏，内容区独立显示；图文段落单列；场景列表 2×2。
- < 420px：Hero 42–48px；品牌中文副名隐藏；主要按钮占满可用宽度。

## 9. Content & Accessibility

- 首屏只承诺已实现的能力：本机录音、转写、AI 提炼、回听与导出。
- 不展示虚构评价、下载量、媒体 Logo、价格或上线平台按钮。
- 提供跳至正文链接、语义标题层级、可见焦点、装饰图形隐藏标签。
- 产品界面使用真实功能名称，但明确是网页中的界面预览，不伪装为可操作 App。
- Meta、Open Graph 和规范域名统一为 `sonascribe.xyz`。
