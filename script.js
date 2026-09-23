/**
 * Portfolio Website Interactions
 * - Theme Switcher (Light/Dark mode) with LocalStorage persistence
 * - Mobile Navigation Toggle
 * - Scroll-triggered animations (Intersection Observer)
 * - Active navigation highlight on scroll
 * - Interactive Mock Contact Form
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. Theme Switcher (Dark / Light Mode)
  // ==========================================
  const themeToggleBtn = document.getElementById('theme-toggle');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

  // 保存されたテーマまたはOSの設定を取得
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  } else if (prefersDarkScheme.matches) {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
  }

  // ボタンクリックでテーマ切り替え
  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });

  // ==========================================
  // 2. Mobile Navigation Toggle
  // ==========================================
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('open');
      navMenu.classList.toggle('open');
    });

    // メニュー項目をクリックしたらメニューを閉じる
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('open');
        navMenu.classList.remove('open');
      });
    });
  }

  // ==========================================
  // 3. Scroll Fade-in Animation
  // ==========================================
  const fadeElements = document.querySelectorAll('.fade-in');

  const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // 一度表示されたら監視解除
      }
    });
  }, {
    root: null,
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  fadeElements.forEach(el => fadeObserver.observe(el));

  // ==========================================
  // 4. Active Nav Link on Scroll
  // ==========================================
  const sections = document.querySelectorAll('section[id]');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, {
    root: null,
    threshold: 0.3
  });

  sections.forEach(sec => sectionObserver.observe(sec));

  // ==========================================
  // 5. Contact Form Submission (Mock)
  // ==========================================
  const contactForm = document.getElementById('contact-form');
  const formNotice = document.getElementById('form-notice');

  if (contactForm && formNotice) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('.btn-submit');
      const originalText = submitBtn.innerHTML;

      // 送信中ステータス
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="spinner" viewBox="0 0 50 50" width="18" height="18" style="animation: spin 1s linear infinite;">
          <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-dasharray="31.415, 31.415"></circle>
        </svg>
        <span>送信中...</span>
      `;

      // 送信完了のシミュレーション（1秒後）
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;

        formNotice.className = 'form-notice success';
        formNotice.textContent = '✓ メッセージを受け付けました！ありがとうございます。（※現在はサンプルデモ動作です）';

        contactForm.reset();

        setTimeout(() => {
          formNotice.style.display = 'none';
        }, 5000);
      }, 1000);
    });
  }

  // ==========================================
  // 6. Project Detail Modal
  // ==========================================
  const projectData = {
    1: {
      title: '開発ライフサイクル全域を標準化する「AI駆動開発基盤」の策定・PoC',
      impact: '⚡ 工数約50%減 / 50名規模へ展開',
      tags: ['AI駆動開発 (AIDD)', 'VS Code', 'Codex', 'Antigravity', 'agent.md', 'Python', 'SharePoint'],
      body: `
        <h4>1. 開発の背景と課題</h4>
        <ul>
          <li>開発工程（要件定義・設計・実装・テスト・保守運用）や社内業務（依頼受付・エラー相談）において、担当者ごとの属人化や成果物の粒度のばらつきが発生していた。</li>
          <li>生成AIを個人のチャット相談にとどめず、50人規模の開発ユニット全体で組織的な開発スピード・品質を底上げするため、「誰がどの案件を担当しても均一かつ高品質な開発フローを再現できる標準化フレームワーク」が求められていた。</li>
        </ul>

        <h4>2. 解決策・アプローチ</h4>
        <ul>
          <li>開発の全フェーズに対応する特化型AIエージェント群（要件定義AI、設計AI、実装AI、テストAI、運用保守AI、依頼受付AI、エラー相談AIなど）を体系化。</li>
          <li><code>agent.md</code> や各種フォーマット・プロンプトテンプレートをSharePoint上で一元管理・共有し、開発者はVS Code環境等を用いてローカルで安全かつ高速に実行できる「AI駆動開発（AI-Driven Development）基盤」を構築。</li>
          <li>企画・PoC検証・実装・運用保守・改修、および開発ユニット全体への情報提供・利用促進までを一貫して一人で推進。</li>
        </ul>

        <h4>3. 使用技術・運用環境</h4>
        <ul>
          <li><strong>AI・コーディング環境:</strong> VS Code, Codex, Antigravity</li>
          <li><strong>エージェント・コンテキスト設計:</strong> <code>agent.md</code>（エージェント役割・前提定義）, プロンプトテンプレート群</li>
          <li><strong>補助スクリプト:</strong> Python（自動化・検証用スクリプト等）</li>
          <li><strong>共有・実行アーキテクチャ:</strong> SharePoint（社内テンプレートの一元配布・バージョン管理） × ローカル環境（セキュアなコード実行）</li>
          <li><strong>開発プロセス:</strong> AI駆動開発（AIDD）、仕様駆動開発（Spec-driven Development）</li>
        </ul>

        <h4>4. 工夫点・アピールポイント</h4>
        <ul>
          <li><strong>セキュアかつ現実的な配信・実行モデル:</strong> 社内標準のSharePointでテンプレートを一括管理しつつ、コード実行や機密データの取り扱いはローカル環境に閉じることで、運用の容易さとセキュリティを両立。</li>
          <li><strong>開発全工程を網羅する粒度の標準化:</strong> 単発のコード補完にとどまらず、「依頼受付」から「エラー相談」までカバー。どんな案件でもブレない粒度で要件定義書や設計書がアウトプットされるようルールを厳格化。</li>
          <li><strong>0→1のワンストップ推進力:</strong> ツール選定からPoC検証、現場フィードバックを受けた即時改修、勉強会・情報共有による社内浸透までを一人で完結。</li>
        </ul>

        <h4>5. 実績・もたらした成果</h4>
        <ul>
          <li><strong>開発工数の大幅カット（体感約50%減）:</strong> エラー相談AIや依頼受付AI、設計支援AIにより、開発者の調査時間や初動対応の工数を大幅に短縮。</li>
          <li><strong>ドキュメント・設計の品質均一化:</strong> 案件の規模や担当者のスキルに依存せず、常に一定水準以上の設計・テスト仕様書が生成される基盤を確立。</li>
          <li><strong>組織への横展開とAIトランスフォーメーション:</strong> 約50名の開発ユニット全体を対象とした情報提供・利用促進を進め、個人のノウハウを組織全体の開発資産へと昇華。</li>
        </ul>
      `
    },
    2: {
      title: 'Google Maps × 生成AIによるSNSコンテンツ量産・DB構築システム',
      impact: '⚡ 数時間作業 → 約1分に短縮',
      tags: ['Node.js', 'Puppeteer', 'Gemini 3.1 Pro', 'Notion API', 'Upsert'],
      body: `
        <h4>1. 開発の背景と課題</h4>
        <ul>
          <li>SNS（TikTok等）のエリア特化型アカウント運用において、店舗のリサーチ、最新情報の確認、台本作成、データベース入力に多大な人的コストがかかっていた。</li>
          <li>飲食店の情報の鮮度（営業時間や定休日の変更）を常に最新に保つ手作業のメンテナンスが限界だった。</li>
        </ul>

        <h4>2. 解決策・アプローチ</h4>
        <ul>
          <li>Node.jsを用いて、Google Mapsのスクレイピングから、Gemini 3.1 Pro（Google検索連携）による台本生成、Notionへのデータ格納までを一気通貫で行う完全自動化スクリプトを開発。</li>
        </ul>

        <h4>3. 使用技術</h4>
        <ul>
          <li><strong>バックエンド:</strong> Node.js</li>
          <li><strong>スクレイピング:</strong> Puppeteer（動的レンダリング・無限スクロール対応）</li>
          <li><strong>生成AI:</strong> Gemini API (gemini-3.1-pro-preview / Grounding with Google Search機能活用)</li>
          <li><strong>データベース:</strong> Notion API (Upsert処理実装)</li>
        </ul>

        <h4>4. 工夫点・アピールポイント</h4>
        <ul>
          <li><strong>AIのハルシネーション（嘘）対策:</strong> GeminiにGoogle検索ツールを付与し、最新のWeb情報をリアルタイムで取得させることで、正確な店舗情報（営業時間・住所・定休日など）を担保。</li>
          <li><strong>堅牢なエラーハンドリング:</strong> AIが指定外の形式（JSON配列など）で出力した際のエラーでシステムが止まらないよう、強制テキスト変換の防御処理を実装。</li>
          <li><strong>データの上書き更新（Upsert）:</strong> Notion APIで既存ページを検索し、すでにある店舗は重複を避けつつ最新のAI台本データに上書きするフローを構築。</li>
        </ul>

        <h4>5. 実績・もたらした成果</h4>
        <ul>
          <li><strong>作業時間:</strong> 20件の台本作成・登録作業を、数時間から「約1分（コマンド実行のみ）」に短縮。</li>
          <li><strong>コスト:</strong> 台本作成やデータ入力にかかる人件費をゼロに。APIの従量課金（1回数円）のみで、維持費ほぼゼロのコンテンツ量産体制を確立。</li>
        </ul>
      `
    },
    3: {
      title: 'OpenClawを用いた自律型AIエージェント構築',
      impact: '⚡ 複数サイト自律巡回・抽出',
      tags: ['OpenClaw', 'Local Gateway', 'Gemini 3.1 Pro', '自律型AI'],
      body: `
        <h4>1. 開発の背景と課題</h4>
        <ul>
          <li>通常のチャット型AIでは、1回の指示で1つの回答しか得られず、複数のWebサイトを横断して情報を収集・分析する複雑なリサーチ業務には限界があった。</li>
          <li>AI自身が考えて自律的にWebを巡回する「エージェント機能」をローカル環境で安全に動かすインフラが必要だった。</li>
        </ul>

        <h4>2. 解決策・アプローチ</h4>
        <ul>
          <li>OSSの『OpenClaw』を用いてローカルゲートウェイ（port: 18789）を構築。最高峰の推論能力を持つgemini-3.1-pro-previewをPrimaryモデルとして統合し、自律的にリサーチを行うAIエージェント環境を自力で構築。</li>
        </ul>

        <h4>3. 使用技術</h4>
        <ul>
          <li><strong>フレームワーク:</strong> OpenClaw (Local Gateway)</li>
          <li><strong>生成AI:</strong> Gemini API (gemini-3.1-pro-preview)</li>
          <li><strong>環境設定:</strong> JSON（エージェントおよびモデルのルーティング定義）</li>
        </ul>

        <h4>4. 工夫点・アピールポイント</h4>
        <ul>
          <li><strong>最新モデルの統合とトラブルシューティング:</strong> 公式ドキュメントが少ない中、APIのバージョンやエンドポイントの仕様変更に対応。エラーログから原因を推測し、設定ファイル（JSON）を適切に書き換えることでプレビュー版モデルの稼働に成功。</li>
          <li><strong>ローカルインフラの構築:</strong> 単なるAPIコールではなく、自身のPC内にAIエージェントを稼働させるためのローカルサーバー・ゲートウェイ環境を構築するインフラ・ネットワークの基礎知識を証明。</li>
        </ul>

        <h4>5. 実績・もたらした成果</h4>
        <ul>
          <li><strong>リサーチの自動化:</strong> AIに大まかな目標を与えるだけで、自律的に情報を集めてくる強力な基盤が完成。</li>
          <li><strong>複数サイト横断の情報収集ボット:</strong> 特定のアーティストのライブスケジュールやチケット情報など、複数サイトに散らばる情報を自律的に巡回・抽出し、一覧化するボットを構築。</li>
          <li><strong>技術的証明:</strong> 「AIを使うだけのユーザー」から「AIをシステムに組み込んでインフラを構築できるエンジニア」への進化を実現。</li>
        </ul>
      `
    },
    4: {
      title: 'エンタープライズ向け業務自動化（RPA / VBA）',
      impact: '⚡ 月数百時間削減 / エラー率0%',
      tags: ['UiPath', 'Excel VBA', 'RPA', '堅牢性設計'],
      body: `
        <h4>1. 開発の背景と課題</h4>
        <ul>
          <li>企業内において、手作業による反復的なデータ入力や複雑なエクセル処理が多く、ヒューマンエラーの発生や膨大な労働コストが課題となっていた。</li>
        </ul>

        <h4>2. 解決策・アプローチ</h4>
        <ul>
          <li>RPAツールやマクロを用いて、社内の定型業務やデータ連携プロセスを無人化・自動化するワークフローを設計・開発・保守。</li>
        </ul>

        <h4>3. 使用技術</h4>
        <ul>
          <li><strong>RPAツール:</strong> UiPath</li>
          <li><strong>スクリプト:</strong> Excel VBA</li>
        </ul>

        <h4>4. 工夫点・アピールポイント</h4>
        <ul>
          <li><strong>エンタープライズレベルの堅牢性:</strong> 個人開発とは異なり、「絶対に止まってはいけない」「エラーが起きたら担当者に通知する」といった、厳密な例外処理（エラーハンドリング）を組み込んだワークフロー設計を実施。</li>
          <li><strong>レガシーとモダンの橋渡し:</strong> レガシーな社内システムをVBAやUiPathで繋ぎ込み、業務を止めずに効率化を推進する要件定義から実装までをカバー。</li>
        </ul>

        <h4>5. 実績・もたらした成果</h4>
        <ul>
          <li><strong>圧倒的な工数削減:</strong> 月間数百時間におよぶ手作業を自動化し、人的コストの削減とデータ処理の完全無欠化（エラー率0%）に貢献。</li>
          <li><strong>開発基盤の確立:</strong> この「絶対にエラーで止めない」という実務での厳格な設計思想が、後のNode.jsやAIを用いた個人開発の安定性に直結。</li>
        </ul>
      `
    },
    5: {
      title: '特化型SNSメディアの立ち上げとグロース運用',
      impact: '⚡ 自動化基盤 × ニッチトップ戦略',
      tags: ['TikTok', 'Instagram', '自作自動化ツール', 'PdM思考'],
      body: `
        <h4>1. 開発の背景と課題</h4>
        <ul>
          <li>エンジニアとしての技術力を「コードを書くこと」で終わらせず、「直接的なビジネス価値（オーディエンス獲得・メディア収益）」に変換する実践の場が必要だった。</li>
          <li>属人的なコンテンツ制作では継続が難しいため、技術を用いた効率化が不可欠だった。</li>
        </ul>

        <h4>2. 解決策・アプローチ</h4>
        <ul>
          <li>ターゲットを明確に絞った特化型TikTokアカウントを複数立ち上げ、自作の自動化ツールを活用しながら企画・運用を実行。</li>
        </ul>

        <h4>3. 使用技術</h4>
        <ul>
          <li><strong>プラットフォーム:</strong> TikTok, Instagram</li>
          <li><strong>自動化基盤:</strong> 自作のNode.jsスクレイピングツール ＆ AI台本生成システム</li>
          <li><strong>分析・動画制作:</strong> アナリティクス分析, 各種動画編集ツール</li>
        </ul>

        <h4>4. 工夫点・アピールポイント</h4>
        <ul>
          <li><strong>技術とマーケティングの融合:</strong> リサーチや台本作成などの「労働集約的な裏方作業」は自作のシステム（Project 2）で完全自動化し、自身は「どんな切り口がバズるか」という企画やディレクションに100%リソースを集中する体制を構築。</li>
          <li><strong>ニッチトップ戦略:</strong> 自身の興味（City Pop系HIPHOP、サウナ、スノボ）と市場の需要を掛け合わせ、コアなファンがつく特化型メディアとして設計。</li>
        </ul>

        <h4>5. 実績・もたらした成果</h4>
        <ul>
          <li><strong>継続的なメディア運営:</strong> 通常なら途絶えがちなSNS運用を、システム化によって持続可能なビジネスモデルへと昇華。</li>
          <li><strong>フルスタックな証明:</strong> 要件定義から開発、さらには「作ったものをどうビジネスに活かすか」というマーケティング視点までを持つ、プロダクトマネージャー思考のエンジニアであることを証明。</li>
        </ul>
      `
    }
  };

  const modal = document.getElementById('project-modal');
  const modalImpact = document.getElementById('modal-impact');
  const modalTags = document.getElementById('modal-tags');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalCloseFooterBtn = document.getElementById('modal-close-footer-btn');
  const openModalBtns = document.querySelectorAll('.modal-open-btn');

  function openModal(projectId) {
    const data = projectData[projectId];
    if (!data) return;

    modalImpact.textContent = data.impact;
    modalTitle.textContent = data.title;
    
    // タグの生成
    modalTags.innerHTML = data.tags.map(t => `<span class="work-tag">${t}</span>`).join('');
    
    // 本文の挿入
    modalBody.innerHTML = data.body;

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // 背面スクロール停止
  }

  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const pid = btn.getAttribute('data-project');
      openModal(pid);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalCloseFooterBtn) modalCloseFooterBtn.addEventListener('click', closeModal);

  // 背景クリックで閉じる
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  // Escキーで閉じる
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeModal();
    }
  });
});

// スピナーアニメーション用のCSSキーフレームを動的挿入
const style = document.createElement('style');
style.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);
