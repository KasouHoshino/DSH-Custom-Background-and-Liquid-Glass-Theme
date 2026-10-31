<div align="center">

<h1>DeepSeek Harness 自定义背景插件</h1>

**DeepSeek Harness Custom Background Plugin** · by [Nagisa](https://github.com/KasouHoshino) · `v1.1.0`

换主题 · 自定义背景 · HUD 液态玻璃材质

![version](https://img.shields.io/badge/version-1.1.0-4C6EF5?style=flat-square)
![platform](https://img.shields.io/badge/platform-DeepSeek_Harness-7C3AED?style=flat-square)
![i18n](https://img.shields.io/badge/i18n-10_languages-2EA44F?style=flat-square)
![material](https://img.shields.io/badge/material-liquid_glass-FE7EB8?style=flat-square)
![license](https://img.shields.io/badge/license-MIT-blue?style=flat-square)

[**简体中文**](#简体中文) · [English](#english)

</div>

---

## 简体中文

### 简介

一个 DeepSeek Harness 主题扩展：换上你自己的背景图或背景视频，再给整个界面铺一层参考 Apple iOS 设计风格的液态玻璃材质。

- **主题 + 自定义背景** —— 图片与视频都能当背景，GIF / 动态 WebP 保留动画
- **HUD 液态玻璃** —— 一套材质贯穿聊天、输入区、面板与弹层，由两个滑块统一驱动
- **10 种界面语言** —— 安装时选定，之后也能在设置里切换
- **内置诊断工具** —— 一组 <kbd>Alt</kbd> 快捷键，用于重新定位元素、排查材质冲突

### 支持的背景格式

| 兼容性 | 格式 |
| :-- | :-- |
| **支持** | PNG · JPEG / JPG · GIF · 静态 WebP · 动态 WebP · AVIF · H.264 编码的 MP4 · VP8 / VP9 的 WebM |
| **部分情况下支持** | MP4 + H.265 / HEVC · MOV / M4V · OGG · BMP · SVG |
| **不支持** | HEIC / HEIF · AVI · MKV · WMV · FLV · TIFF |

「部分情况下支持」取决于容器与编码的组合，能否播放还受运行环境影响。遇到加载不出来的素材，先转成「支持」一栏里的格式再试一次。

### 液态玻璃

参考 Apple iOS 的设计风格：一套材质贯穿大部分表面，全部由两个滑块驱动，调一处即全局统一。

| 区域 | 覆盖的表面 |
| :-- | :-- |
| **聊天** | 消息气泡、消息卡片、代码块（含标题行）、行内代码、标签条 |
| **输入区** | 输入框卡片、下方小组件、命令预览面板 |
| **面板** | 引导面板、侧边面板、滚动视图、终端屏幕 |
| **弹层** | 对话框、菜单、上下文提示气泡、文件预览卡片、工具卡片 |

### 安装

两种方式，任选其一。

#### 方式一：EXE 安装包

1. 从 Releases 下载 `dsh-custom-background-setup_by_Nagisa.exe` 并运行
2. 选择安装目录（默认 `%LOCALAPPDATA%\DSH\plugins\dsh-custom-background_by_Nagisa`）
3. 选择界面语言
4. 可选：勾选安装完成后自动重启 DSH

安装包是未签名的自解压程序，SmartScreen 可能提示一次，选择「更多信息 → 仍要运行」即可。全程不需要 Node、终端或手动复制文件。

#### 方式二：工作区安装

面向开发者，也可以让智能体直接把插件装进工作区。在插件目录执行：

```powershell
powershell -ExecutionPolicy Bypass -File .\install.ps1
```

然后重启 DSH。脚本会把插件以 `link:` 方式注册进当前 profile；重复执行是安全的 —— 配置被重置或目录被移动之后，重跑一遍即可修复。

卸载：

```powershell
powershell -ExecutionPolicy Bypass -File .\uninstall.ps1
```

> [!NOTE]
> 让 DeepSeek 自己去 GitHub 找仓库地址来完成安装的方式**尚未确认可用**。可以尝试，但有概率不工作 —— 失败时请改用上面两种方式。

> [!TIP]
> 装好了但界面没有变化？按 <kbd>Alt</kbd> + <kbd>Shift</kbd> + <kbd>G</kbd> 关掉插件全部材质再恢复，就能判断问题出在插件还是 DSH 本身。

### 诊断工具

DSH 更新后界面元素可能改名，用这组快捷键重新定位目标、查清材质画在哪：

| 快捷键 | 作用 |
| :-- | :-- |
| <kbd>Alt</kbd> + 点击 | 打印元素的类名链，用于重新定位目标 |
| <kbd>Alt</kbd> + <kbd>Shift</kbd> + <kbd>H</kbd> | 3 秒内抓取新插入的节点（悬浮提示一类） |
| <kbd>Alt</kbd> + <kbd>Shift</kbd> + <kbd>K</kbd> | 打印卡片内部谁在画背景 |
| <kbd>Alt</kbd> + <kbd>Shift</kbd> + <kbd>G</kbd> | 关闭 / 恢复插件全部材质，判断问题是否由插件造成 |

macOS 上 <kbd>Alt</kbd> 即 <kbd>Option</kbd> 键。

### 支持语言

简体中文 · 繁体中文 · English · 日本語 · 한국어 · Español · Français · Deutsch · Русский · Português

### 联系开发者

| 平台 | 地址 |
| :-- | :-- |
| Bilibili | [space.bilibili.com/2081483998](https://space.bilibili.com/2081483998) |
| Bilibili（备用） | [space.bilibili.com/1109324295](https://space.bilibili.com/1109324295) |
| X | [@Kasou_Hoshino](https://x.com/Kasou_Hoshino) |
| GitHub | [@KasouHoshino](https://github.com/KasouHoshino) |

---

## English

### Overview

A theme extension for DeepSeek Harness: set your own background image or video, then lay a liquid-glass material — inspired by Apple's iOS design — over the whole interface.

- **Theme + custom background** — images and videos both work; GIF and animated WebP keep their animation
- **HUD liquid glass** — one material across chat, input area, panels and overlays, driven by two sliders
- **10 interface languages** — pick one in the installer, switch it later in Settings
- **Built-in diagnostics** — a set of <kbd>Alt</kbd> shortcuts to re-target elements and isolate material conflicts

### Supported Background Formats

| Compatibility | Formats |
| :-- | :-- |
| **Supported** | PNG · JPEG / JPG · GIF · static WebP · animated WebP · AVIF · H.264-encoded MP4 · VP8 / VP9 WebM |
| **Partially supported** | MP4 + H.265 / HEVC · MOV / M4V · OGG · BMP · SVG |
| **Not supported** | HEIC / HEIF · AVI · MKV · WMV · FLV · TIFF |

"Partially supported" depends on the container / codec combination, and playback can also depend on the runtime environment. If a file refuses to load, transcode it to one of the formats in "Supported" first.

### Liquid Glass

Inspired by Apple's iOS design style: one material runs through most surfaces, and all of it is driven by two sliders — tune one place and everything stays consistent.

| Area | Surfaces |
| :-- | :-- |
| **Chat** | message bubbles, message cards, code blocks (including the header row), inline code, tag strip |
| **Input area** | input box card, the small widgets below it, command preview panel |
| **Panels** | onboarding panel, side panel, scroll view, terminal screen |
| **Overlays** | dialogs, menus, context tooltip bubbles, file preview cards, tool cards |

### Installation

Two methods — use either one.

#### Option 1: EXE installer

1. Download `dsh-custom-background-setup_by_Nagisa.exe` from Releases and run it
2. Choose an installation directory (default `%LOCALAPPDATA%\DSH\plugins\dsh-custom-background_by_Nagisa`)
3. Choose a language
4. Optionally tick "restart DSH when finished"

The installer is an unsigned self-extractor, so SmartScreen may ask once — choose "More info → Run anyway". No Node, no terminal, no copy-paste.

#### Option 2: Workspace installation

For developers, or to have the agent install the plugin into the workspace itself. From the plugin folder:

```powershell
powershell -ExecutionPolicy Bypass -File .\install.ps1
```

Then restart DSH. The script registers the plugin as a `link:` dependency in the current profile; re-running it is safe — it is also the fix after a profile reset or a moved folder.

To uninstall:

```powershell
powershell -ExecutionPolicy Bypass -File .\uninstall.ps1
```

> [!NOTE]
> Having DeepSeek look up the GitHub repository address and install from it **has not been confirmed to work**. You can try it, but there is a chance it won't — if it fails, use one of the two methods above.

> [!TIP]
> Installed but nothing changed? Press <kbd>Alt</kbd> + <kbd>Shift</kbd> + <kbd>G</kbd> to turn all of the plugin's materials off and back on — that tells a plugin-caused problem apart from DSH itself.

### Diagnostics

DSH updates can rename UI elements; use these shortcuts to re-target them and to see which element is painting a surface:

| Shortcut | What it does |
| :-- | :-- |
| <kbd>Alt</kbd> + click | prints the element's class-name chain, for re-targeting |
| <kbd>Alt</kbd> + <kbd>Shift</kbd> + <kbd>H</kbd> | captures newly inserted nodes within 3 seconds (hover tooltips and similar) |
| <kbd>Alt</kbd> + <kbd>Shift</kbd> + <kbd>K</kbd> | prints which element inside the card is painting the background |
| <kbd>Alt</kbd> + <kbd>Shift</kbd> + <kbd>G</kbd> | turns all of the plugin's materials off / back on, to tell whether the plugin is causing the problem |

On macOS, <kbd>Alt</kbd> is the <kbd>Option</kbd> key.

### Supported Languages

简体中文 · 繁体中文 · English · 日本語 · 한국어 · Español · Français · Deutsch · Русский · Português

### Developer Contact

| Platform | Link |
| :-- | :-- |
| Bilibili | [space.bilibili.com/2081483998](https://space.bilibili.com/2081483998) |
| Bilibili (backup) | [space.bilibili.com/1109324295](https://space.bilibili.com/1109324295) |
| X | [@Kasou_Hoshino](https://x.com/Kasou_Hoshino) |
| GitHub | [@KasouHoshino](https://github.com/KasouHoshino) |

---

## License

MIT — see [LICENSE](LICENSE).

技术细节与实现笔记见 [DEVELOPMENT.md](DEVELOPMENT.md) · Implementation notes live in [DEVELOPMENT.md](DEVELOPMENT.md).

<div align="center">

如果这个插件对你有帮助，欢迎给一个 ⭐
If it helps, a ⭐ goes a long way.

</div>
